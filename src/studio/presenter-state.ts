import type { DeckDocumentV2 } from './deck.js'

export type PresenterPhase = 'hold' | 'playing'
export type PresenterEvent = 'enter' | 'next' | 'previous' | 'animationComplete' | 'leave'

export interface PresenterState {
  readonly slideIndex: number
  readonly cueIndex: number
  readonly phase: PresenterPhase
}

export interface PresenterOutput {
  readonly state: PresenterState
  readonly renderSlideId: string
  readonly renderTime: number
  readonly shouldPlayTo?: number
  readonly shouldNavigate: boolean
  readonly lockInput: boolean
}

export function initialPresenterState(deck: DeckDocumentV2): PresenterState {
  return { slideIndex: firstVisibleSlideIndex(deck), cueIndex: 0, phase: 'hold' }
}

export function presenterStateForSlide(deck: DeckDocumentV2, slideId: string): PresenterState {
  const index = deck.slides.filter(slide => !slide.hidden).findIndex(slide => slide.id === slideId)
  if (index < 0)
    throw new Error(`presenter: visible slide not found '${slideId}'`)
  return { slideIndex: index, cueIndex: 0, phase: 'hold' }
}

export function transitionPresenter(deck: DeckDocumentV2, state: PresenterState, event: PresenterEvent): PresenterOutput {
  const visible = deck.slides.filter(slide => !slide.hidden)
  if (!visible.length)
    throw new Error('presenter: visible slide required')
  const slideIndex = Math.min(Math.max(state.slideIndex, 0), visible.length - 1)
  const slide = visible[slideIndex]
  const cueIndex = Math.min(Math.max(state.cueIndex, 0), slide.timeline.cues.length - 1)
  const at = (index: number) => slide.timeline.cues[index]?.at ?? 0
  const output = (next: PresenterState, shouldNavigate = false, shouldPlayTo?: number): PresenterOutput => ({ renderSlideId: visible[next.slideIndex].id, renderTime: visible[next.slideIndex].timeline.cues[next.cueIndex]?.at ?? 0, state: next, shouldNavigate, shouldPlayTo, lockInput: next.phase === 'playing' })
  if (event === 'leave')
    return output({ slideIndex, cueIndex: 0, phase: 'hold' })
  if (event === 'enter') {
    if (slide.timeline.cues[0]?.mode === 'auto' && slide.timeline.cues.length > 1) {
      const next = { slideIndex, cueIndex: 1, phase: 'playing' as const }
      return { ...output(next, false, at(1)), renderTime: at(0) }
    }
    return output({ slideIndex, cueIndex: 0, phase: 'hold' })
  }
  if (event === 'previous') {
    const previous = Math.max(slideIndex - 1, 0)
    const previousSlide = visible[previous]
    return { state: { slideIndex: previous, cueIndex: 0, phase: 'hold' }, renderSlideId: previousSlide.id, renderTime: 0, shouldNavigate: previous !== slideIndex, lockInput: false }
  }
  if (event === 'animationComplete')
    return output({ slideIndex, cueIndex, phase: 'hold' })
  if (state.phase === 'playing')
    return output({ slideIndex, cueIndex, phase: 'playing' })
  if (cueIndex + 1 < slide.timeline.cues.length) {
    const next = { slideIndex, cueIndex: cueIndex + 1, phase: 'playing' as const }
    return { ...output(next, false, at(cueIndex + 1)), renderTime: at(cueIndex) }
  }
  const nextSlideIndex = Math.min(slideIndex + 1, visible.length - 1)
  return output({ slideIndex: nextSlideIndex, cueIndex: 0, phase: 'hold' }, nextSlideIndex !== slideIndex)
}

function firstVisibleSlideIndex(deck: DeckDocumentV2): number {
  const index = deck.slides.findIndex(slide => !slide.hidden)
  if (index < 0)
    throw new Error('presenter: visible slide required')
  return deck.slides.filter((_, candidate) => candidate < index && !deck.slides[candidate].hidden).length
}
