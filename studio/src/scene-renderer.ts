import { evaluateSlideAt } from '../../src/studio/timeline.js'
import type { SceneAsset, SceneDocument, SceneElement, SceneSlide } from '../../src/studio/schema.js'

export interface SceneRenderOptions {
  readonly selectedId?: string
  readonly assetUrls?: ReadonlyMap<string, string>
  readonly onSelect?: (elementId: string, event: PointerEvent) => void
  readonly onTextCommit?: (elementId: string, text: string) => void
}

export function renderScene(root: HTMLElement, document: SceneDocument, slide: SceneSlide, time: number, options: SceneRenderOptions = {}): void {
  const renderedSlide = evaluateSlideAt(slide, time)
  root.replaceChildren()
  root.style.setProperty('--scene-width', String(document.viewport.width))
  root.style.setProperty('--scene-height', String(document.viewport.height))
  for (const element of renderedSlide.elements)
    root.append(renderElement(element, document.assets, document.viewport, options))
}

function renderElement(element: SceneElement, assets: readonly SceneAsset[], viewport: SceneDocument['viewport'], options: SceneRenderOptions): HTMLElement {
  const node = document.createElement('div')
  node.className = `scene-element scene-element-${element.type}${element.id === options.selectedId ? ' is-selected' : ''}`
  node.dataset.elementId = element.id
  node.setAttribute('aria-label', element.accessibilityLabel)
  const { transform } = element
  Object.assign(node.style, {
    left: `${(transform.x / viewport.width) * 100}%`,
    top: `${(transform.y / viewport.height) * 100}%`,
    width: `${(transform.width / viewport.width) * 100}%`,
    height: `${(transform.height / viewport.height) * 100}%`,
    opacity: String(transform.opacity),
    zIndex: String(transform.zIndex),
    transform: `rotate(${transform.rotation}deg) scale(${element.style.scale ?? 1})`,
  })
  for (const [key, value] of Object.entries(element.style)) {
    if (key === 'scale' || key === 'pathProgress')
      continue
    node.style.setProperty(toCssProperty(key), String(value))
  }
  node.addEventListener('pointerdown', (event) => options.onSelect?.(element.id, event))

  if (element.type === 'image') {
    const asset = assets.find(candidate => candidate.id === element.assetId)
    if (!asset) {
      node.classList.add('scene-asset-error')
      node.textContent = `Missing asset: ${element.assetId ?? 'unknown'}`
      return node
    }
    const image = document.createElement('img')
    image.alt = asset.alt
    image.src = options.assetUrls?.get(asset.id) ?? asset.src
    image.style.objectFit = asset.fit
    node.append(image)
  }
  else if (element.type === 'path') {
    const line = document.createElement('div')
    line.className = 'scene-path-line'
    line.style.width = `${Number(element.style.pathProgress ?? 1) * 100}%`
    node.append(line)
  }
  else {
    node.textContent = element.content ?? ''
    if (element.type === 'text') {
      node.addEventListener('dblclick', () => {
        node.contentEditable = 'true'
        node.focus()
      })
      node.addEventListener('blur', () => {
        if (!node.isContentEditable)
          return
        node.contentEditable = 'false'
        options.onTextCommit?.(element.id, node.textContent ?? '')
      })
      node.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          node.contentEditable = 'false'
          node.textContent = element.content ?? ''
        }
      })
    }
  }

  if (element.id === options.selectedId) {
    const handle = document.createElement('button')
    handle.className = 'scene-resize-handle'
    handle.type = 'button'
    handle.dataset.resize = element.id
    handle.ariaLabel = '크기 조절'
    node.append(handle)
  }
  return node
}

function toCssProperty(key: string): string {
  return key.replace(/[A-Z]/g, character => `-${character.toLowerCase()}`)
}
