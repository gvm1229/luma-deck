import { describe, expect, it } from 'vitest'
import { applySceneOperation } from '../../src/studio/operations.js'
import { createTestScene } from './scene.js'

describe('studio operations', () => {
  it('changes target text only', () => {
    const original = createTestScene()
    const next = applySceneOperation(original, { type: 'SetText', slideId: 'gripgun-flow', elementId: 'headline', text: '새 제목' })
    expect(next.slides[0].elements.find(element => element.id === 'headline')?.content).toBe('새 제목')
    expect(next.slides[0].elements.find(element => element.id === 'client')).toEqual(original.slides[0].elements.find(element => element.id === 'client'))
  })

  it('preserves unrelated assets when replacing asset', () => {
    const scene = createTestScene()
    const withAsset = structuredClone(scene)
    withAsset.assets.push({ id: 'alternate', src: 'assets/alternate.png', alt: 'alternate', fit: 'cover', focalPoint: { x: 0.5, y: 0.5 } })
    const next = applySceneOperation(withAsset, { type: 'ReplaceAsset', slideId: 'gripgun-flow', elementId: 'evidence', assetId: 'alternate' })
    expect(next.assets).toEqual(withAsset.assets)
    expect(next.slides[0].elements.find(element => element.id === 'evidence')?.assetId).toBe('alternate')
  })
})
