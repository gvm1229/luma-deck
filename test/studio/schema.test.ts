import { describe, expect, it } from 'vitest'
import { validateSceneDocument, SceneValidationError } from '../../src/studio/schema.js'
import { createTestScene } from './scene.js'

describe('studio scene schema', () => {
  it('accepts GripGun scene', () => {
    expect(validateSceneDocument(createTestScene()).slides).toHaveLength(1)
  })

  it('rejects duplicate element IDs', () => {
    const scene = structuredClone(createTestScene())
    scene.slides[0].elements[1] = { ...scene.slides[0].elements[1], id: scene.slides[0].elements[0].id }
    expect(() => validateSceneDocument(scene)).toThrow(SceneValidationError)
  })

  it('rejects missing assets and descending keyframes', () => {
    const scene = structuredClone(createTestScene())
    scene.slides[0].elements[0] = { ...scene.slides[0].elements[0], assetId: 'missing' }
    expect(() => validateSceneDocument(scene)).toThrow('missing asset')

    const invalidTrack = structuredClone(createTestScene())
    invalidTrack.slides[0].timeline.tracks[0].keyframes = [
      { at: 3, value: 0, easing: 'linear' },
      { at: 2, value: 1, easing: 'linear' },
    ]
    expect(() => validateSceneDocument(invalidTrack)).toThrow('keyframes must be ordered')
  })

  it('rejects unsafe and unsupported style values', () => {
    const scene = structuredClone(createTestScene())
    scene.slides[0].elements[0].style = { background: 'url(https://example.com/asset.png)' }
    expect(() => validateSceneDocument(scene)).toThrow('unsafe style value')
  })
})
