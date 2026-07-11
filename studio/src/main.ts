import { createGripGunPresentationDeck } from '../../src/studio/gripgun-deck.js'
import { type SceneOperation } from '../../src/studio/operations.js'
import { migrateSceneDocument, type DeckDocumentV2 } from '../../src/studio/deck.js'
import { applyDeckHistory, applyDeckOperation, createDeckHistory, redoDeckHistory, undoDeckHistory, type DeckHistory } from '../../src/studio/deck-operations.js'
import { initialPresenterState, transitionPresenter, type PresenterState } from '../../src/studio/presenter-state.js'
import { createMotionPresetTracks, motionPresetNames, type MotionPresetName } from '../../src/studio/motion-presets.js'
import type { SceneAsset, SceneElement } from '../../src/studio/schema.js'
import { getNextCueTime, getPreviousCueTime } from '../../src/studio/timeline.js'
import { canUseDirectoryPicker, chooseProjectDirectory, copyAssetToDirectory, downloadDeck, loadAssetUrlsFromDirectory, loadDeckFromDirectory, releaseAssetUrls, saveDeckToDirectory, type StudioDirectoryHandle } from './file-access.js'
import { renderScene } from './scene-renderer.js'

const appRoot = document.querySelector<HTMLElement>('#app')
if (!appRoot)
  throw new Error('#app 없음')
const app = appRoot

let history: DeckHistory = createDeckHistory(createGripGunPresentationDeck())
let activeSlideId = history.present.slides[0].id
let presentMode = false
let presenterState: PresenterState = initialPresenterState(history.present)
let selectedId = 'headline'
let time = 0
let isPlaying = false
let directory: StudioDirectoryHandle | undefined
let animationFrame: number | undefined
let segmentEnd = 0
let previousFrameAt = 0
const assetUrls = new Map<string, string>()

app.innerHTML = `
  <header class="studio-header">
    <div><p class="studio-kicker">LUMADECK VISUAL STUDIO · V2</p><h1>GripGun Presentation</h1></div>
    <div class="studio-actions">
      <button data-action="open">폴더 열기</button>
      <button data-action="save" class="primary">저장</button>
      <button data-action="present">발표 모드</button>
      <button data-action="undo">되돌리기</button>
      <button data-action="redo">다시 실행</button>
    </div>
  </header>
  <section class="studio-shell">
    <aside class="studio-panel slides"><h2>Slides</h2><div class="slide-actions"><button data-action="add-slide">+</button><button data-action="duplicate-slide">복제</button><button data-action="delete-slide">삭제</button></div><div class="slide-actions"><button data-action="slide-up">↑</button><button data-action="slide-down">↓</button></div><div data-role="slides"></div></aside>
    <aside class="studio-panel layers"><h2>Layers</h2><div data-role="layers"></div></aside>
    <section class="studio-workspace">
      <div class="scene-frame"><div class="scene-canvas" data-role="canvas" tabindex="0"></div></div>
      <section class="timeline" aria-label="Timeline">
        <div class="timeline-controls"><button data-action="reset">처음</button><button data-action="play" class="primary">재생</button><button data-action="next">다음 cue</button><output data-role="time"></output></div>
        <input data-role="scrub" type="range" min="0" max="28" step="0.05" value="0" aria-label="Timeline scrub" />
        <div data-role="cues" class="cue-list"></div>
      </section>
    </section>
    <aside class="studio-panel inspector"><h2>Inspector</h2><div data-role="inspector"></div></aside>
  </section>
  <footer class="studio-status" data-role="status"></footer>
`

const canvas = required<HTMLElement>('[data-role="canvas"]')
const slidesPanel = required<HTMLElement>('[data-role="slides"]')
const layers = required<HTMLElement>('[data-role="layers"]')
const inspector = required<HTMLElement>('[data-role="inspector"]')
const cues = required<HTMLElement>('[data-role="cues"]')
const scrub = required<HTMLInputElement>('[data-role="scrub"]')
const timeOutput = required<HTMLOutputElement>('[data-role="time"]')
const status = required<HTMLElement>('[data-role="status"]')

function currentSlide() {
  return history.present.slides.find(slide => slide.id === activeSlideId) ?? history.present.slides[0]
}

function selectedElement(): SceneElement | undefined {
  return currentSlide().elements.find(element => element.id === selectedId)
}

function redraw(): void {
  const slide = currentSlide()
  app.classList.toggle('is-present', presentMode)
  scrub.max = String(slide.timeline.duration)
  scrub.value = String(time)
  timeOutput.value = `${time.toFixed(1)}s / ${slide.timeline.duration}s`
  renderScene(canvas, sceneRuntimeDocument(), slide, time, {
    selectedId: presentMode ? undefined : selectedId,
    assetUrls,
    onSelect: onSelectElement,
    onTextCommit: (elementId, text) => commit({ type: 'SetText', slideId: slide.id, elementId, text }),
  })
  renderLayers()
  renderSlides()
  renderInspector()
  renderCues()
  status.textContent = `${presentMode ? 'PRESENT' : 'EDIT'} · ${canUseDirectoryPicker() ? 'Chromium local folder save ready' : '폴더 저장 미지원: JSON 다운로드 fallback'} · ${isPlaying ? 'cue 재생 중' : 'hold state'}`
}

function sceneRuntimeDocument() {
  return { schemaVersion: 1 as const, viewport: history.present.viewport, assets: history.present.assets, slides: history.present.slides }
}

function renderSlides(): void {
  slidesPanel.replaceChildren(...history.present.slides.map((slide, index) => {
    const button = document.createElement('button')
    button.className = `slide-item${slide.id === activeSlideId ? ' is-active' : ''}`
    button.textContent = slide.title
    button.onclick = () => { activeSlideId = slide.id; selectedId = slide.elements[0]?.id ?? ''; time = 0; redraw() }
    button.draggable = true
    button.ondragstart = event => event.dataTransfer?.setData('text/plain', slide.id)
    button.ondragover = event => event.preventDefault()
    button.ondrop = event => { event.preventDefault(); const source = event.dataTransfer?.getData('text/plain'); if (source && source !== slide.id) moveSlide(source, index) }
    return button
  }))
}

function renderLayers(): void {
  const ordered = [...currentSlide().elements].sort((left, right) => right.transform.zIndex - left.transform.zIndex)
  layers.replaceChildren(...ordered.map((element) => {
    const button = document.createElement('button')
    button.className = `layer-item${element.id === selectedId ? ' is-active' : ''}`
    button.textContent = `${element.type} · ${element.id}`
    button.onclick = () => { selectedId = element.id; redraw() }
    return button
  }))
}

function renderInspector(): void {
  const element = selectedElement()
  if (!element) {
    inspector.textContent = '선택된 요소 없음'
    return
  }
  inspector.innerHTML = `
    <p class="inspector-id">${element.id}</p>
    ${element.type === 'text' ? `<label>Text<textarea data-field="text">${escapeHtml(element.content ?? '')}</textarea></label>` : ''}
    <div class="field-grid">
      ${numberField('x', element.transform.x)}${numberField('y', element.transform.y)}
      ${numberField('width', element.transform.width)}${numberField('height', element.transform.height)}
      ${numberField('opacity', element.transform.opacity, '0.05')}${numberField('rotation', element.transform.rotation)}
    </div>
    <label>색상<input data-style="color" value="${escapeHtml(String(element.style.color ?? '#111827'))}" /></label>
    <label>배경<input data-style="background" value="${escapeHtml(String(element.style.background ?? 'transparent'))}" /></label>
    ${element.type === 'image' ? '<label class="asset-replace">이미지 교체<input data-action="asset" type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" /></label>' : ''}
    <section class="motion-editor"><h3>Motion</h3><label>Preset<select data-role="preset">${motionPresetNames.map(name => `<option value="${name}">${name}</option>`).join('')}</select></label><label>Duration<input data-role="preset-duration" type="number" min="0.1" max="10" step="0.1" value="0.8" /></label><button data-action="preset">Preset 적용</button>${renderTrackEditor(element.id)}</section>
    <div class="reorder"><button data-action="up">앞으로</button><button data-action="down">뒤로</button></div>
  `
  for (const input of inspector.querySelectorAll<HTMLInputElement>('[data-field]')) {
    input.addEventListener('change', () => applyField(input.dataset.field ?? '', input.value))
  }
  for (const input of inspector.querySelectorAll<HTMLInputElement>('[data-style]')) {
    input.addEventListener('change', () => commit({ type: 'SetStyle', slideId: currentSlide().id, elementId: element.id, style: { [input.dataset.style ?? 'color']: input.value } }))
  }
  inspector.querySelector<HTMLTextAreaElement>('[data-field="text"]')?.addEventListener('change', (event) => {
    commit({ type: 'SetText', slideId: currentSlide().id, elementId: element.id, text: (event.target as HTMLTextAreaElement).value })
  })
  inspector.querySelector<HTMLInputElement>('[data-action="asset"]')?.addEventListener('change', async (event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file)
      await replaceAsset(file)
  })
  inspector.querySelector<HTMLButtonElement>('[data-action="up"]')?.addEventListener('click', () => reorder(1))
  inspector.querySelector<HTMLButtonElement>('[data-action="down"]')?.addEventListener('click', () => reorder(-1))
  for (const control of inspector.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select'))
    control.addEventListener('focus', stopPlayback)
  inspector.querySelector<HTMLButtonElement>('[data-action="preset"]')?.addEventListener('click', () => {
    const preset = inspector.querySelector<HTMLSelectElement>('[data-role="preset"]')?.value as MotionPresetName | undefined
    const duration = Number(inspector.querySelector<HTMLInputElement>('[data-role="preset-duration"]')?.value)
    if (preset && Number.isFinite(duration) && duration > 0)
      commit({ type: 'ApplyMotionPreset', slideId: currentSlide().id, elementId: element.id, preset, tracks: createMotionPresetTracks(preset, element.id, time, duration) })
  })
  for (const input of inspector.querySelectorAll<HTMLInputElement>('[data-track]')) {
    input.addEventListener('change', () => {
      const value = Number(input.value)
      if (Number.isFinite(value))
        commit({ type: 'SetTrackKeyframe', slideId: currentSlide().id, trackId: input.dataset.track ?? '', keyframeIndex: Number(input.dataset.keyframe ?? 0), [input.dataset.trackField === 'at' ? 'at' : 'value']: value })
    })
  }
}

function renderTrackEditor(elementId: string): string {
  const tracks = currentSlide().timeline.tracks.filter(track => track.elementId === elementId)
  if (tracks.length === 0)
    return '<p class="track-empty">적용된 track 없음</p>'
  return tracks.map((track) => {
    const index = track.keyframes.length - 1
    const keyframe = track.keyframes[index]
    if (typeof keyframe.value !== 'number')
      return `<p class="track-label">${escapeHtml(track.property)} · color/string</p>`
    return `<div class="track-row"><span>${escapeHtml(track.property)}</span><input data-track="${track.id}" data-keyframe="${index}" data-track-field="at" type="number" step="0.1" value="${keyframe.at}" /><input data-track="${track.id}" data-keyframe="${index}" data-track-field="value" type="number" step="0.05" value="${keyframe.value}" /></div>`
  }).join('')
}

function renderCues(): void {
  cues.replaceChildren(...currentSlide().timeline.cues.map((cue) => {
    const button = document.createElement('button')
    button.className = `cue${Math.abs(time - cue.at) < 0.05 ? ' is-current' : ''}`
    button.textContent = `${cue.at}s · ${cue.label}`
    button.onclick = () => seek(cue.at)
    return button
  }))
}

function numberField(field: string, value: number, step = '1'): string {
  return `<label>${field}<input data-field="${field}" type="number" step="${step}" value="${value}" /></label>`
}

function applyField(field: string, rawValue: string): void {
  const element = selectedElement()
  if (!element)
    return
  if (field === 'text') {
    commit({ type: 'SetText', slideId: currentSlide().id, elementId: element.id, text: rawValue })
    return
  }
  const value = Number(rawValue)
  if (!Number.isFinite(value))
    return
  if (field === 'x' || field === 'y') {
    commit({ type: 'MoveElement', slideId: currentSlide().id, elementId: element.id, x: field === 'x' ? value : element.transform.x, y: field === 'y' ? value : element.transform.y })
  }
  else if (field === 'width' || field === 'height') {
    commit({ type: 'ResizeElement', slideId: currentSlide().id, elementId: element.id, width: field === 'width' ? value : element.transform.width, height: field === 'height' ? value : element.transform.height })
  }
  else if (field === 'opacity' || field === 'rotation') {
    commit({ type: 'SetTransform', slideId: currentSlide().id, elementId: element.id, transform: { [field]: value } })
  }
}

function commit(operation: SceneOperation): void {
  stopPlayback()
  try {
    history = applyDeckHistory(history, operation)
    redraw()
  }
  catch (error) {
    status.textContent = `변경 거부: ${error instanceof Error ? error.message : String(error)}`
  }
}

function reorder(delta: number): void {
  const element = selectedElement()
  if (element)
    commit({ type: 'ReorderElement', slideId: currentSlide().id, elementId: element.id, zIndex: element.transform.zIndex + delta })
}

function moveSlide(slideId: string, toIndex: number): void {
  history = applyDeckHistory(history, { type: 'MoveSlide', slideId, toIndex })
  redraw()
}

function onSelectElement(elementId: string, event: PointerEvent): void {
  event.stopPropagation()
  selectedId = elementId
  const element = selectedElement()
  if (!element)
    return
  const isResize = (event.target as HTMLElement).dataset.resize === elementId
  const start = toScenePoint(event)
  const startTransform = element.transform
  const move = (moveEvent: PointerEvent) => {
    const point = toScenePoint(moveEvent)
    const node = canvas.querySelector<HTMLElement>(`[data-element-id="${elementId}"]`)
    if (!node)
      return
    const width = isResize ? Math.max(40, startTransform.width + point.x - start.x) : startTransform.width
    const height = isResize ? Math.max(40, startTransform.height + point.y - start.y) : startTransform.height
    const x = isResize ? startTransform.x : startTransform.x + point.x - start.x
    const y = isResize ? startTransform.y : startTransform.y + point.y - start.y
    node.style.left = `${(x / history.present.viewport.width) * 100}%`
    node.style.top = `${(y / history.present.viewport.height) * 100}%`
    node.style.width = `${(width / history.present.viewport.width) * 100}%`
    node.style.height = `${(height / history.present.viewport.height) * 100}%`
  }
  const end = (endEvent: PointerEvent) => {
    window.removeEventListener('pointermove', move)
    const point = toScenePoint(endEvent)
    if (isResize) {
      commit({ type: 'ResizeElement', slideId: currentSlide().id, elementId, width: Math.max(40, startTransform.width + point.x - start.x), height: Math.max(40, startTransform.height + point.y - start.y) })
    }
    else {
      commit({ type: 'MoveElement', slideId: currentSlide().id, elementId, x: startTransform.x + point.x - start.x, y: startTransform.y + point.y - start.y })
    }
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', end, { once: true })
  redraw()
}

function toScenePoint(event: PointerEvent): { readonly x: number, readonly y: number } {
  const rect = canvas.getBoundingClientRect()
  return { x: (event.clientX - rect.left) * history.present.viewport.width / rect.width, y: (event.clientY - rect.top) * history.present.viewport.height / rect.height }
}

function seek(nextTime: number): void {
  stopPlayback()
  time = Math.min(Math.max(nextTime, 0), currentSlide().timeline.duration)
  redraw()
}

function playTo(endTime: number, onComplete?: () => void): void {
  stopPlayback()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    time = endTime
    redraw()
    onComplete?.()
    return
  }
  segmentEnd = endTime
  isPlaying = true
  previousFrameAt = performance.now()
  const tick = (now: number) => {
    const delta = (now - previousFrameAt) / 1000
    previousFrameAt = now
    time = Math.min(time + delta, segmentEnd)
    redraw()
    if (time >= segmentEnd) {
      isPlaying = false
      animationFrame = undefined
      redraw()
      onComplete?.()
      return
    }
    animationFrame = requestAnimationFrame(tick)
  }
  animationFrame = requestAnimationFrame(tick)
}

function stopPlayback(): void {
  if (animationFrame !== undefined)
    cancelAnimationFrame(animationFrame)
  animationFrame = undefined
  isPlaying = false
}

function nextCue(): void {
  if (isPlaying)
    return
  if (presentMode) {
    const output = transitionPresenter(history.present, presenterState, 'next')
    presenterState = output.state
    activeSlideId = output.renderSlideId
    if (output.shouldPlayTo !== undefined) {
      seek(output.renderTime)
      playTo(output.shouldPlayTo, () => {
        presenterState = transitionPresenter(history.present, presenterState, 'animationComplete').state
        redraw()
      })
    }
    else {
      time = output.renderTime
      redraw()
    }
    return
  }
  const next = getNextCueTime(currentSlide(), time)
  if (next !== undefined)
    playTo(next)
}

async function openDirectory(): Promise<void> {
  try {
    directory = await chooseProjectDirectory()
    if (!directory)
      return
    releaseAssetUrls(assetUrls)
    assetUrls.clear()
    const loadedDeck = await loadDeckFromDirectory(directory)
    for (const [id, url] of await loadAssetUrlsFromDirectory(directory, { schemaVersion: 1, viewport: loadedDeck.viewport, assets: loadedDeck.assets, slides: loadedDeck.slides }))
      assetUrls.set(id, url)
    history = createDeckHistory(loadedDeck)
    activeSlideId = loadedDeck.slides.find(slide => !slide.hidden)?.id ?? loadedDeck.slides[0].id
    presenterState = initialPresenterState(loadedDeck)
    selectedId = currentSlide().elements[0]?.id ?? ''
    time = 0
    redraw()
  }
  catch (error) {
    status.textContent = `폴더 열기 실패: ${error instanceof Error ? error.message : String(error)}`
  }
}

async function save(): Promise<void> {
  try {
    if (!directory)
      directory = await chooseProjectDirectory()
    if (directory) {
      await saveDeckToDirectory(directory, history.present)
      status.textContent = 'deck.luma.json 저장 완료'
    }
    else {
      downloadDeck(history.present)
      status.textContent = '폴더 저장 미지원: deck.luma.json 다운로드 완료'
    }
  }
  catch (error) {
    status.textContent = `저장 실패: ${error instanceof Error ? error.message : String(error)}`
  }
}

async function replaceAsset(file: File): Promise<void> {
  const element = selectedElement()
  if (!element)
    return
  try {
    if (!directory)
      directory = await chooseProjectDirectory()
    if (!directory)
      throw new Error('이미지 교체 전 project folder 선택 필요')
    const id = `asset-${crypto.randomUUID()}`
    const copied = await copyAssetToDirectory(directory, file)
    const next = structuredClone(history.present) as DeckDocumentV2
    const asset: SceneAsset = { id, src: copied.src, alt: file.name, fit: 'cover', focalPoint: { x: 0.5, y: 0.5 } }
    const nextWithAsset = { ...next, assets: [...next.assets, asset] }
    history = { past: [...history.past, history.present], present: applyDeckOperation(nextWithAsset, { type: 'ReplaceAsset', slideId: currentSlide().id, elementId: element.id, assetId: id }), future: [] }
    assetUrls.set(id, copied.url)
    redraw()
  }
  catch (error) {
    status.textContent = `이미지 교체 실패: ${error instanceof Error ? error.message : String(error)}`
  }
}

app.addEventListener('click', (event) => {
  const action = (event.target as HTMLElement).dataset.action
  if (action === 'open') void openDirectory()
  if (action === 'save') void save()
  if (action === 'present') {
    presentMode = !presentMode
    if (!presentMode) { stopPlayback(); redraw(); return }
    presenterState = initialPresenterState(history.present)
    const entering = transitionPresenter(history.present, presenterState, 'enter')
    presenterState = entering.state
    activeSlideId = entering.renderSlideId
    time = entering.renderTime
    redraw()
    if (presentMode && entering.shouldPlayTo !== undefined) playTo(entering.shouldPlayTo, () => {
      presenterState = transitionPresenter(history.present, presenterState, 'animationComplete').state
      redraw()
    })
  }
  if (action === 'undo') { history = undoDeckHistory(history); activeSlideId = currentSlide().id; redraw() }
  if (action === 'redo') { history = redoDeckHistory(history); activeSlideId = currentSlide().id; redraw() }
  if (action === 'add-slide') {
    const source = structuredClone(currentSlide())
    const id = `slide-${crypto.randomUUID().slice(0, 8)}`
    const copy = { ...source, id, title: '새 Slide', presenterNotes: '', timeline: { ...source.timeline, cues: source.timeline.cues.map(cue => ({ ...cue })) } }
    history = applyDeckHistory(history, { type: 'AddSlide', slide: copy, index: history.present.slides.findIndex(slide => slide.id === activeSlideId) + 1 })
    activeSlideId = id; selectedId = copy.elements[0]?.id ?? ''; time = 0; redraw()
  }
  if (action === 'duplicate-slide') {
    const id = `slide-${crypto.randomUUID().slice(0, 8)}`
    history = applyDeckHistory(history, { type: 'DuplicateSlide', slideId: activeSlideId, id, title: `${currentSlide().title} 복제` })
    activeSlideId = id; time = 0; redraw()
  }
  if (action === 'delete-slide') {
    const index = history.present.slides.findIndex(slide => slide.id === activeSlideId)
    history = applyDeckHistory(history, { type: 'DeleteSlide', slideId: activeSlideId })
    activeSlideId = history.present.slides[Math.max(0, index - 1)].id; selectedId = currentSlide().elements[0]?.id ?? ''; time = 0; redraw()
  }
  if (action === 'slide-up') moveSlide(activeSlideId, Math.max(0, history.present.slides.findIndex(slide => slide.id === activeSlideId) - 1))
  if (action === 'slide-down') moveSlide(activeSlideId, Math.min(history.present.slides.length - 1, history.present.slides.findIndex(slide => slide.id === activeSlideId) + 1))
  if (action === 'reset') seek(0)
  if (action === 'play') playTo(currentSlide().timeline.duration)
  if (action === 'next') nextCue()
})
scrub.addEventListener('input', () => seek(Number(scrub.value)))
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && presentMode) {
    stopPlayback()
    presentMode = false
    redraw()
    return
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
    event.preventDefault()
    history = event.shiftKey ? redoDeckHistory(history) : undoDeckHistory(history)
    redraw()
    return
  }
  if (isPlaying && [' ', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
    event.preventDefault()
    return
  }
  if (event.key === ' ' || event.key === 'ArrowRight') {
    event.preventDefault()
    nextCue()
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    if (presentMode) {
      const previous = transitionPresenter(history.present, presenterState, 'previous')
      presenterState = previous.state
      activeSlideId = previous.renderSlideId
      time = previous.renderTime
      redraw()
      return
    }
    seek(getPreviousCueTime(currentSlide(), time))
  }
})

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function required<T extends Element>(selector: string): T {
  const found = app.querySelector<T>(selector)
  if (!found)
    throw new Error(`${selector} 없음`)
  return found
}

redraw()
window.addEventListener('beforeunload', () => releaseAssetUrls(assetUrls))
