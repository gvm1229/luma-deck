import { describe, expect, it } from 'vitest'
import { clickCountToSceneTime, getPosterSceneTime, getSlidevClickCount, getSlidevInitialSceneTime } from '../../src/studio/slidev-adapter.js'
import { createTestScene } from './scene.js'

describe('studio Slidev adapter', () => {
  it('maps click state to one cue state', () => {
    const slide = createTestScene().slides[0]
    expect(getSlidevClickCount(slide)).toBe(6)
    expect(clickCountToSceneTime(slide, 0)).toBe(3)
    expect(clickCountToSceneTime(slide, 3)).toBe(16)
    expect(clickCountToSceneTime(slide, 99)).toBe(25)
  })

  it('uses poster time in print or poster capture', () => {
    const slide = createTestScene().slides[0]
    expect(getPosterSceneTime(slide, true, false)).toBe(25)
    expect(getPosterSceneTime(slide, false, true)).toBe(25)
    expect(getPosterSceneTime(slide, false, false)).toBeUndefined()
  })

  it('initializes the Slidev wrapper at poster time when poster output is requested', () => {
    const slide = createTestScene().slides[0]
    expect(getSlidevInitialSceneTime(slide, true, false)).toBe(25)
    expect(getSlidevInitialSceneTime(slide, false, true)).toBe(25)
    expect(getSlidevInitialSceneTime(slide, false, false)).toBeUndefined()

    const zeroPoster = { ...slide, timeline: { ...slide.timeline, cues: [{ ...slide.timeline.cues[0], id: 'poster', at: 0, mode: 'hold' as const }] }, posterCueId: 'poster' }
    expect(getSlidevInitialSceneTime(zeroPoster, true, false)).toBe(0)
  })
})
