import { describe, expect, it } from 'vitest'
import { migrateSceneDocument } from '../../src/studio/deck.js'
import { initialPresenterState, presenterStateForSlide, transitionPresenter } from '../../src/studio/presenter-state.js'
import { createTestScene } from './scene.js'

describe('presenter state', () => {
  it('locks input during a cue and only advances a slide after its final cue', () => {
    const deck = migrateSceneDocument(createTestScene())
    const second = structuredClone(deck.slides[0])
    second.id = 'second'
    second.title = 'Second'
    const twoSlide = { ...deck, slides: [deck.slides[0], second] }
    let state = initialPresenterState(twoSlide)
    const first = transitionPresenter(twoSlide, state, 'next')
    expect(first.shouldPlayTo).toBe(3)
    expect(first.lockInput).toBe(true)
    expect(transitionPresenter(twoSlide, first.state, 'next').state).toEqual(first.state)
    state = transitionPresenter(twoSlide, first.state, 'animationComplete').state
    for (let index = 1; index < twoSlide.slides[0].timeline.cues.length - 1; index++)
      state = transitionPresenter(twoSlide, transitionPresenter(twoSlide, state, 'next').state, 'animationComplete').state
    const nextSlide = transitionPresenter(twoSlide, state, 'next')
    expect(nextSlide.shouldNavigate).toBe(true)
    expect(nextSlide.renderSlideId).toBe('second')
  })

  it('auto-plays the intro segment on enter and holds at the first click cue', () => {
    const deck = migrateSceneDocument(createTestScene())
    const entering = transitionPresenter(deck, initialPresenterState(deck), 'enter')
    expect(entering.renderTime).toBe(0)
    expect(entering.shouldPlayTo).toBe(3)
    expect(entering.lockInput).toBe(true)
    expect(transitionPresenter(deck, entering.state, 'animationComplete').state).toMatchObject({ cueIndex: 1, phase: 'hold' })
  })

  it('selects a visible deck slide by stable id', () => {
    const deck = migrateSceneDocument(createTestScene())
    const second = { ...structuredClone(deck.slides[0]), id: 'second', title: 'Second' }
    const twoSlide = { ...deck, slides: [deck.slides[0], second] }
    expect(presenterStateForSlide(twoSlide, 'second')).toMatchObject({ slideIndex: 1, cueIndex: 0 })
  })
})
