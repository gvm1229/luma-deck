import { applySceneOperation, type SceneOperation } from './operations.js'
import { validateDeckDocument, type DeckDocumentV2, type DeckSlide } from './deck.js'

export type DeckOperation = SceneOperation
  | { readonly type: 'AddSlide', readonly slide: DeckSlide, readonly index?: number }
  | { readonly type: 'DuplicateSlide', readonly slideId: string, readonly id: string, readonly title: string }
  | { readonly type: 'DeleteSlide', readonly slideId: string }
  | { readonly type: 'MoveSlide', readonly slideId: string, readonly toIndex: number }
  | { readonly type: 'SetSlideMetadata', readonly slideId: string, readonly title?: string, readonly hidden?: boolean, readonly transition?: DeckSlide['transition'], readonly presenterNotes?: string }

export interface DeckHistory {
  readonly past: readonly DeckDocumentV2[]
  readonly present: DeckDocumentV2
  readonly future: readonly DeckDocumentV2[]
}

export function createDeckHistory(deck: DeckDocumentV2): DeckHistory {
  return { past: [], present: deck, future: [] }
}

export function applyDeckHistory(history: DeckHistory, operation: DeckOperation): DeckHistory {
  return { past: [...history.past, history.present], present: applyDeckOperation(history.present, operation), future: [] }
}

export function undoDeckHistory(history: DeckHistory): DeckHistory {
  const previous = history.past.at(-1)
  return previous ? { past: history.past.slice(0, -1), present: previous, future: [history.present, ...history.future] } : history
}

export function redoDeckHistory(history: DeckHistory): DeckHistory {
  const next = history.future[0]
  return next ? { past: [...history.past, history.present], present: next, future: history.future.slice(1) } : history
}

export function applyDeckOperation(deck: DeckDocumentV2, operation: DeckOperation): DeckDocumentV2 {
  const next = structuredClone(deck) as DeckDocumentV2
  const slides = [...next.slides]
  if (operation.type === 'AddSlide') {
    const index = Math.min(Math.max(operation.index ?? slides.length, 0), slides.length)
    slides.splice(index, 0, operation.slide)
    return validateDeckDocument({ ...next, slides })
  }
  const index = slides.findIndex(slide => slide.id === operation.slideId)
  if (index < 0)
    throw new Error(`slide not found: ${operation.slideId}`)
  if (operation.type === 'DuplicateSlide') {
    const copy = { ...structuredClone(slides[index]), id: operation.id, title: operation.title }
    slides.splice(index + 1, 0, copy)
    return validateDeckDocument({ ...next, slides })
  }
  if (operation.type === 'DeleteSlide') {
    if (slides.length === 1)
      throw new Error('마지막 slide는 삭제할 수 없음')
    slides.splice(index, 1)
    return validateDeckDocument({ ...next, slides })
  }
  if (operation.type === 'MoveSlide') {
    const [slide] = slides.splice(index, 1)
    slides.splice(Math.min(Math.max(operation.toIndex, 0), slides.length), 0, slide)
    return validateDeckDocument({ ...next, slides })
  }
  if (operation.type === 'SetSlideMetadata') {
    slides[index] = { ...slides[index], ...(operation.title === undefined ? {} : { title: operation.title }), ...(operation.hidden === undefined ? {} : { hidden: operation.hidden }), ...(operation.transition === undefined ? {} : { transition: operation.transition }), ...(operation.presenterNotes === undefined ? {} : { presenterNotes: operation.presenterNotes }) }
    return validateDeckDocument({ ...next, slides })
  }
  const scene = applySceneOperation({ schemaVersion: 1, viewport: next.viewport, assets: next.assets, slides }, operation)
  return validateDeckDocument({ ...next, assets: scene.assets, slides: scene.slides as DeckSlide[] })
}
