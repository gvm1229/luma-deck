import { describe, expect, it } from 'vitest'
import { clickCountToSceneTime, getPosterSceneTime, getSlidevClickCount } from '../../src/studio/slidev-adapter.js'
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
})
