import { describe, expect, it } from 'vitest'
import { parseSceneDocument, sceneSemanticEqual, serializeSceneDocument } from '../../src/studio/serializer.js'
import { createTestScene } from './scene.js'

describe('studio serializer', () => {
  it('preserves scene semantics through load save load', () => {
    const original = createTestScene()
    const roundTrip = parseSceneDocument(serializeSceneDocument(original))
    expect(sceneSemanticEqual(original, roundTrip)).toBe(true)
  })
})
