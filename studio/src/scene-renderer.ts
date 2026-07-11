import { evaluateSlideAt } from '../../src/studio/timeline.js'
import type { SceneAnchor, SceneAsset, SceneDocument, SceneElement, SceneSlide, SceneTransform } from '../../src/studio/schema.js'

export interface SceneRenderOptions {
  readonly selectedId?: string
  readonly assetUrls?: ReadonlyMap<string, string>
  readonly onSelect?: (elementId: string, event: PointerEvent) => void
  readonly onTextCommit?: (elementId: string, text: string) => void
}

interface RenderState { readonly nodes: Map<string, HTMLElement>; options: SceneRenderOptions }
const states = new WeakMap<HTMLElement, RenderState>()

export function renderScene(root: HTMLElement, document: SceneDocument, slide: SceneSlide, time: number, options: SceneRenderOptions = {}): void {
  const renderedSlide = evaluateSlideAt(slide, time)
  const resolvedElements = resolveSlideElements(renderedSlide)
  const state = states.get(root) ?? { nodes: new Map<string, HTMLElement>(), options }
  state.options = options
  states.set(root, state)
  root.style.setProperty('--scene-width', String(document.viewport.width))
  root.style.setProperty('--scene-height', String(document.viewport.height))
  const remaining = new Set(state.nodes.keys())
  for (const element of resolvedElements) {
    let node = state.nodes.get(element.id)
    if (!node) {
      node = createElement(element, state)
      state.nodes.set(element.id, node)
    }
    updateElement(node, element, document.assets, document.viewport, state)
    root.append(node)
    remaining.delete(element.id)
  }
  for (const id of remaining) {
    state.nodes.get(id)?.remove()
    state.nodes.delete(id)
  }
}

/** group의 로컬 좌표와 connector endpoint를 화면 좌표로 한 번만 정규화한다 */
export function resolveSlideElements(slide: SceneSlide): readonly ResolvedElement[] {
  const source = new Map(slide.elements.map(element => [element.id, element]))
  const resolved = new Map<string, ResolvedElement>()
  const resolving = new Set<string>()
  const resolve = (element: SceneElement): ResolvedElement => {
    const existing = resolved.get(element.id)
    if (existing) return existing
    if (resolving.has(element.id)) return { ...element, renderMatrix: identityMatrix, childrenMatrix: identityMatrix }
    resolving.add(element.id)
    const parent = element.parentId ? source.get(element.parentId) : undefined
    const parentResolved = parent ? resolve(parent) : undefined
    const parentMatrix = parentResolved?.childrenMatrix ?? identityMatrix
    const ownScale = numericStyle(element.style.scale, 1)
    const matrix = multiplyMatrix(parentMatrix, localMatrix(element.transform, ownScale))
    const transform = {
      ...element.transform,
      opacity: (parentResolved?.transform.opacity ?? 1) * element.transform.opacity,
      zIndex: (parentResolved?.transform.zIndex ?? 0) + element.transform.zIndex,
    }
    const value: ResolvedElement = { ...element, transform, style: { ...element.style, scale: 1 }, renderMatrix: matrix, childrenMatrix: matrix }
    resolved.set(element.id, value)
    resolving.delete(element.id)
    return value
  }
  for (const element of slide.elements) resolve(element)
  for (const element of slide.elements) {
    const connector = resolved.get(element.id)
    if (!connector?.connector) continue
    const from = resolved.get(connector.connector.from.elementId)
    const to = resolved.get(connector.connector.to.elementId)
    if (!from || !to) continue
    const start = anchorPoint(from, connector.connector.from.anchor)
    const end = anchorPoint(to, connector.connector.to.anchor)
    const deltaX = end.x - start.x
    const deltaY = end.y - start.y
    const thickness = Math.max(8, connector.transform.height)
    resolved.set(connector.id, {
      ...connector,
      transform: {
        ...connector.transform,
        x: 0,
        y: 0,
        width: Math.hypot(deltaX, deltaY),
        height: thickness,
        rotation: 0,
      },
      renderMatrix: localMatrix({ ...connector.transform, x: start.x, y: start.y - thickness / 2, rotation: Math.atan2(deltaY, deltaX) * 180 / Math.PI }, 1),
      childrenMatrix: localMatrix({ ...connector.transform, x: start.x, y: start.y - thickness / 2, rotation: Math.atan2(deltaY, deltaX) * 180 / Math.PI }, 1),
    })
  }
  return slide.elements.map(element => resolved.get(element.id)!)
}

export interface Matrix { readonly a: number, readonly b: number, readonly c: number, readonly d: number, readonly tx: number, readonly ty: number }
export interface ResolvedElement extends SceneElement { readonly renderMatrix: Matrix, readonly childrenMatrix: Matrix }

const identityMatrix: Matrix = { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }

function localMatrix(transform: SceneTransform, scale: number): Matrix {
  const radians = transform.rotation * Math.PI / 180
  const cosine = Math.cos(radians) * scale
  const sine = Math.sin(radians) * scale
  return { a: cosine, b: sine, c: -sine, d: cosine, tx: transform.x, ty: transform.y }
}

function multiplyMatrix(left: Matrix, right: Matrix): Matrix {
  return {
    a: left.a * right.a + left.c * right.b,
    b: left.b * right.a + left.d * right.b,
    c: left.a * right.c + left.c * right.d,
    d: left.b * right.c + left.d * right.d,
    tx: left.a * right.tx + left.c * right.ty + left.tx,
    ty: left.b * right.tx + left.d * right.ty + left.ty,
  }
}

function numericStyle(value: string | number | undefined, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function anchorPoint(element: ResolvedElement, anchor: SceneAnchor): { x: number, y: number } {
  const { width, height } = element.transform
  const point = anchor === 'left' ? { x: 0, y: height / 2 }
    : anchor === 'right' ? { x: width, y: height / 2 }
      : anchor === 'top' ? { x: width / 2, y: 0 }
        : anchor === 'bottom' ? { x: width / 2, y: height }
          : { x: width / 2, y: height / 2 }
  return { x: element.renderMatrix.a * point.x + element.renderMatrix.c * point.y + element.renderMatrix.tx, y: element.renderMatrix.b * point.x + element.renderMatrix.d * point.y + element.renderMatrix.ty }
}

function createElement(element: SceneElement, state: RenderState): HTMLElement {
  const node = document.createElement('div')
  node.dataset.elementId = element.id
  node.addEventListener('pointerdown', event => state.options.onSelect?.(element.id, event))
  if (element.type === 'text') {
    node.addEventListener('dblclick', () => { node.contentEditable = 'true'; node.focus() })
    node.addEventListener('blur', () => {
      if (!node.isContentEditable) return
      node.contentEditable = 'false'
      state.options.onTextCommit?.(element.id, node.textContent ?? '')
    })
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') node.contentEditable = 'false'
    })
  }
  return node
}

function updateElement(node: HTMLElement, element: SceneElement, assets: readonly SceneAsset[], viewport: SceneDocument['viewport'], state: RenderState): void {
  node.className = `scene-element scene-element-${element.type}${element.id === state.options.selectedId ? ' is-selected' : ''}`
  node.setAttribute('aria-label', element.accessibilityLabel)
  const { transform } = element
  const matrix = (element as ResolvedElement).renderMatrix ?? localMatrix(transform, numericStyle(element.style.scale, 1))
  Object.assign(node.style, {
    left: `${(matrix.tx / viewport.width) * 100}%`, top: `${(matrix.ty / viewport.height) * 100}%`, width: `${(transform.width / viewport.width) * 100}%`, height: `${(transform.height / viewport.height) * 100}%`, opacity: String(transform.opacity), zIndex: String(transform.zIndex), transformOrigin: '0 0', transform: `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, 0, 0)`,
  })
  for (const [key, value] of Object.entries(element.style)) {
    if (key !== 'scale' && key !== 'pathProgress') node.style.setProperty(toCssProperty(key), String(value))
  }
  if (element.type === 'image') {
    const asset = assets.find(candidate => candidate.id === element.assetId)
    let image = node.querySelector('img')
    if (!asset) { node.textContent = `Missing asset: ${element.assetId ?? 'unknown'}`; node.classList.add('scene-asset-error') }
    else {
      if (!image) { image = document.createElement('img'); node.replaceChildren(image) }
      image.alt = asset.alt; image.src = state.options.assetUrls?.get(asset.id) ?? asset.src; image.style.objectFit = asset.fit
    }
  }
  else if (element.type === 'path' || element.type === 'connector') {
    let line = node.querySelector<HTMLElement>('.scene-path-line')
    if (!line) { line = document.createElement('div'); line.className = 'scene-path-line'; node.replaceChildren(line) }
    line.style.width = `${Number(element.style.pathProgress ?? 1) * 100}%`
    if (element.type === 'connector' && !node.querySelector('.scene-connector-arrow')) {
      const arrow = document.createElement('span')
      arrow.className = 'scene-connector-arrow'
      arrow.textContent = '›'
      node.append(arrow)
    }
  }
  else if (element.type === 'group') {
    node.replaceChildren()
  }
  else if (!node.isContentEditable) {
    if (node.textContent !== (element.content ?? '')) node.textContent = element.content ?? ''
  }
  node.querySelector('.scene-resize-handle')?.remove()
  if (element.id === state.options.selectedId) {
    const handle = document.createElement('button')
    handle.className = 'scene-resize-handle'; handle.type = 'button'; handle.dataset.resize = element.id; handle.ariaLabel = '크기 조절'
    node.append(handle)
  }
}

function toCssProperty(key: string): string { return key.replace(/[A-Z]/g, character => `-${character.toLowerCase()}`) }
