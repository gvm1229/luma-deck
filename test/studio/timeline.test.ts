import { describe, expect, it } from 'vitest'
import { evaluateSlideAt, getNextCueTime, getPosterTime, getPreviousCueTime } from '../../src/studio/timeline.js'
import { createTestScene } from './scene.js'

describe('studio timeline', () => {
  it('is deterministic across replay evaluation', () => {
    const slide = createTestScene().slides[0]
    const first = evaluateSlideAt(slide, 11.8)
    for (let index = 0; index < 10; index += 1)
      expect(evaluateSlideAt(slide, 11.8)).toEqual(first)
  })

  it('finds cue boundaries and poster', () => {
    const slide = createTestScene().slides[0]
    expect(getNextCueTime(slide, 3)).toBe(7)
    expect(getPreviousCueTime(slide, 7)).toBe(3)
    expect(getPosterTime(slide)).toBe(25)
  })

  it('uses logical viewport in rendered scene data', () => {
    const document = createTestScene()
    expect(document.viewport).toEqual({ width: 1920, height: 1080 })
  })
})
