import { createGripGunPrototypeScene } from '../../src/studio/gripgun-scene.js'
import { createSceneHistory, applyHistoryOperation, redoSceneHistory, undoSceneHistory, type SceneHistory } from '../../src/studio/history.js'
import { applySceneOperation, type SceneOperation } from '../../src/studio/operations.js'
import { createMotionPresetTracks, motionPresetNames, type MotionPresetName } from '../../src/studio/motion-presets.js'
import type { SceneAsset, SceneDocument, SceneElement } from '../../src/studio/schema.js'
import { getNextCueTime, getPreviousCueTime } from '../../src/studio/timeline.js'
import { canUseDirectoryPicker, chooseProjectDirectory, copyAssetToDirectory, downloadScene, loadAssetUrlsFromDirectory, loadSceneFromDirectory, releaseAssetUrls, saveSceneToDirectory, type StudioDirectoryHandle } from './file-access.js'
import { renderScene } from './scene-renderer.js'

const appRoot = document.querySelector<HTMLElement>('#app')
if (!appRoot)
  throw new Error('#app 없음')
const app = appRoot

let history: SceneHistory = createSceneHistory(createGripGunPrototypeScene())
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
    <div><p class="studio-kicker">LUMADECK VISUAL STUDIO · V1</p><h1>GripGun Line Trace</h1></div>
    <div class="studio-actions">
      <button data-action="open">폴더 열기</button>
      <button data-action="save" class="primary">저장</button>
      <button data-action="undo">되돌리기</button>
      <button data-action="redo">다시 실행</button>
    </div>
  </header>
  <section class="studio-shell">
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
const layers = required<HTMLElement>('[data-role="layers"]')
const inspector = required<HTMLElement>('[data-role="inspector"]')
const cues = required<HTMLElement>('[data-role="cues"]')
const scrub = required<HTMLInputElement>('[data-role="scrub"]')
const timeOutput = required<HTMLOutputElement>('[data-role="time"]')
const status = required<HTMLElement>('[data-role="status"]')

function currentSlide() {
  return history.present.slides[0]
}

function selectedElement(): SceneElement | undefined {
  return currentSlide().elements.find(element => element.id === selectedId)
}

function redraw(): void {
  const slide = currentSlide()
  scrub.max = String(slide.timeline.duration)
  scrub.value = String(time)
  timeOutput.value = `${time.toFixed(1)}s / ${slide.timeline.duration}s`
  renderScene(canvas, history.present, slide, time, {
    selectedId,
    assetUrls,
    onSelect: onSelectElement,
    onTextCommit: (elementId, text) => commit({ type: 'SetText', slideId: slide.id, elementId, text }),
  })
  renderLayers()
  renderInspector()
  renderCues()
  status.textContent = `${canUseDirectoryPicker() ? 'Chromium local folder save ready' : '폴더 저장 미지원: JSON 다운로드 fallback'} · ${isPlaying ? 'cue 재생 중' : 'hold state'}`
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
    history = applyHistoryOperation(history, operation)
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

function playTo(endTime: number): void {
  stopPlayback()
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
    const loadedScene = await loadSceneFromDirectory(directory)
    for (const [id, url] of await loadAssetUrlsFromDirectory(directory, loadedScene))
      assetUrls.set(id, url)
    history = createSceneHistory(loadedScene)
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
      await saveSceneToDirectory(directory, history.present)
      status.textContent = 'scene.luma.json 저장 완료'
    }
    else {
      downloadScene(history.present)
      status.textContent = '폴더 저장 미지원: scene.luma.json 다운로드 완료'
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
    const next = structuredClone(history.present) as SceneDocument
    const asset: SceneAsset = { id, src: copied.src, alt: file.name, fit: 'cover', focalPoint: { x: 0.5, y: 0.5 } }
    ;(next.assets as SceneAsset[]).push(asset)
    history = { past: [...history.past, history.present], present: applySceneOperation(next, { type: 'ReplaceAsset', slideId: currentSlide().id, elementId: element.id, assetId: id }), future: [] }
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
  if (action === 'undo') { history = undoSceneHistory(history); redraw() }
  if (action === 'redo') { history = redoSceneHistory(history); redraw() }
  if (action === 'reset') seek(0)
  if (action === 'play') playTo(currentSlide().timeline.duration)
  if (action === 'next') nextCue()
})
scrub.addEventListener('input', () => seek(Number(scrub.value)))
window.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
    event.preventDefault()
    history = event.shiftKey ? redoSceneHistory(history) : undoSceneHistory(history)
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
requestAnimationFrame(() => playTo(3))
window.addEventListener('beforeunload', () => releaseAssetUrls(assetUrls))
