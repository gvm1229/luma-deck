import { describe, expect, it } from 'vitest'
import { getConnectorDrawing, resolveSlideElements } from '../../studio/src/scene-renderer.js'
import type { SceneSlide } from '../../src/studio/schema.js'

const transform = (x: number, y: number, width: number, height: number, zIndex = 1) => ({ x, y, width, height, rotation: 0, opacity: 1, zIndex })

describe('scene renderer geometry', () => {
  it('resolves nested group transforms and rotated connector anchors together', () => {
    const slide: SceneSlide = {
      id: 'slide', layoutId: 'test', presenterNotes: '', posterCueId: 'poster',
      elements: [
        { id: 'group', type: 'group', transform: { ...transform(100, 200, 1, 1), rotation: 90 }, style: { scale: 2 }, accessibilityLabel: 'group' },
        { id: 'nested', parentId: 'group', type: 'group', transform: { ...transform(10, 0, 1, 1), rotation: 90 }, style: { scale: .5 }, accessibilityLabel: 'nested group' },
        { id: 'source', parentId: 'nested', type: 'shape', transform: transform(10, 20, 50, 40), style: {}, accessibilityLabel: 'source' },
        { id: 'target', type: 'shape', transform: transform(300, 260, 80, 50), style: {}, accessibilityLabel: 'target' },
        { id: 'flow', type: 'connector', transform: transform(0, 0, 10, 10), connector: { from: { elementId: 'source', anchor: 'right' }, to: { elementId: 'target', anchor: 'left' } }, style: {}, accessibilityLabel: 'flow' },
      ],
      timeline: { duration: 1, cues: [{ id: 'poster', at: 0, mode: 'hold', label: 'poster' }], tracks: [] },
    }
    const elements = new Map(resolveSlideElements(slide).map(element => [element.id, element]))
    expect(elements.get('source')?.renderMatrix).toMatchObject({ a: -1, d: -1, tx: 90, ty: 200 })
    const flow = elements.get('flow')!
    const { renderMatrix, transform: flowTransform } = flow
    expect({ x: renderMatrix.c * flowTransform.height / 2 + renderMatrix.tx, y: renderMatrix.d * flowTransform.height / 2 + renderMatrix.ty }).toEqual({ x: 40, y: 180 })
    expect(flowTransform.width).toBeGreaterThan(80)
  })
})

describe('connector drawing', () => {
  it('keeps the head hidden until the stick reaches its final endpoint', () => {
    const nearlyComplete = getConnectorDrawing(640, 32, .99)
    const beforeComplete = getConnectorDrawing(640, 32, .9999)
    const complete = getConnectorDrawing(640, 32, 1)
    expect(nearlyComplete.headVisible).toBe(false)
    expect(beforeComplete.headVisible).toBe(false)
    expect(complete.headVisible).toBe(true)
    expect(complete.strokeWidth).toBe(6)
    expect(complete.headBase - (complete.stickX2 + complete.strokeWidth / 2)).toBe(complete.headGap)

    const tooShort = getConnectorDrawing(36, 32, 1)
    expect(tooShort.stickVisible).toBe(false)
    expect(tooShort.stickX2).toBe(0)
  })
})
