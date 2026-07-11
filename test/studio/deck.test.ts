import { describe, expect, it } from 'vitest'
import { deckSemanticEqual, migrateSceneDocument, parseDeckDocument, serializeDeckDocument, validateDeckDocument } from '../../src/studio/deck.js'
import { createGripGunPresentationDeck } from '../../src/studio/gripgun-deck.js'
import { evaluateSlideAt } from '../../src/studio/timeline.js'
import { resolveSlideElements } from '../../studio/src/scene-renderer.js'
import { createTestScene } from './scene.js'

describe('deck v2 migration', () => {
  it('migrates v1 without mutating it and is idempotent', () => {
    const v1 = createTestScene()
    const before = structuredClone(v1)
    const deck = migrateSceneDocument(v1)
    expect(v1).toEqual(before)
    expect(deck.schemaVersion).toBe(2)
    expect(deckSemanticEqual(migrateSceneDocument(deck), deck)).toBe(true)
    expect(deckSemanticEqual(parseDeckDocument(serializeDeckDocument(deck)), deck)).toBe(true)
  })

  it('allows equal element ids in separate slides but rejects duplicate deck slide ids', () => {
    const deck = migrateSceneDocument(createTestScene())
    const copy = structuredClone(deck)
    copy.slides.push({ ...copy.slides[0], id: 'second', title: 'Second' })
    expect(validateDeckDocument(copy).slides).toHaveLength(2)
    copy.slides[1] = { ...copy.slides[1], id: copy.slides[0].id }
    expect(() => validateDeckDocument(copy)).toThrow('duplicate id')
  })

  it('keeps unrevealed GripGun elements fully hidden until their cue', () => {
    const slide = createGripGunPresentationDeck().slides[0]
    const at = (time: number, id: string) => evaluateSlideAt(slide, time).elements.find(element => element.id === id)!
    expect(at(1, 'hero').transform.opacity).toBe(1)
    expect(at(1, 'client').transform.opacity).toBe(1)
    expect(at(1, 'server').transform.opacity).toBe(0)
    expect(at(1, 'hit').transform.opacity).toBe(0)
    expect(at(1, 'result').transform.opacity).toBe(0)
    expect(at(3, 'server').transform.opacity).toBe(1)
    expect(at(3, 'hit').transform.opacity).toBe(0)
    expect(at(3, 'ray').style.pathProgress).toBe(0)
  })

  it('focuses the server-authority client before the server and shares the damage/VFX origin', () => {
    const deck = createGripGunPresentationDeck()
    const authority = deck.slides.find(slide => slide.id === 'gripgun-3')!
    const authorityAt = (time: number, id: string) => evaluateSlideAt(authority, time).elements.find(element => element.id === id)!
    expect(authorityAt(1, 'client').transform.opacity).toBe(1)
    expect(authorityAt(1, 'server').transform.opacity).toBe(0)
    expect(authority.presenterNotes).toContain('클릭하여 다음 cue 진행')

    const damage = deck.slides.find(slide => slide.id === 'gripgun-5')!
    const geometry = new Map(resolveSlideElements(evaluateSlideAt(damage, 5.5)).map(element => [element.id, element]))
    const start = (id: string) => {
      const connector = geometry.get(id)!
      const matrix = connector.renderMatrix
      return { x: matrix.c * connector.transform.height / 2 + matrix.tx, y: matrix.d * connector.transform.height / 2 + matrix.ty }
    }
    expect(start('damage-route')).toEqual(start('vfx-route'))
  })

  it('anchors every connector stick center to its declared source edge', () => {
    const deck = createGripGunPresentationDeck()
    const point = (element: ReturnType<typeof resolveSlideElements>[number], x: number, y: number) => ({
      x: element.renderMatrix.a * x + element.renderMatrix.c * y + element.renderMatrix.tx,
      y: element.renderMatrix.b * x + element.renderMatrix.d * y + element.renderMatrix.ty,
    })
    const anchorPoint = (element: ReturnType<typeof resolveSlideElements>[number], anchor: 'left' | 'right' | 'top' | 'bottom' | 'center') => {
      const { width, height } = element.transform
      const local = anchor === 'left' ? [0, height / 2] : anchor === 'right' ? [width, height / 2] : anchor === 'top' ? [width / 2, 0] : anchor === 'bottom' ? [width / 2, height] : [width / 2, height / 2]
      return point(element, local[0], local[1])
    }
    for (const slide of deck.slides) {
      const geometry = new Map(resolveSlideElements(evaluateSlideAt(slide, slide.timeline.duration)).map(element => [element.id, element]))
      for (const connector of geometry.values()) {
        if (!connector.connector) continue
        const source = geometry.get(connector.connector.from.elementId)!
        const expected = anchorPoint(source, connector.connector.from.anchor)
        const actual = point(connector, 0, connector.transform.height / 2)
        expect(actual.x).toBeCloseTo(expected.x, 8)
        expect(actual.y).toBeCloseTo(expected.y, 8)
      }
    }
  })

  it('keeps every connector and its target hidden until the draw reaches the target', () => {
    const deck = createGripGunPresentationDeck()
    for (const slide of deck.slides) {
      const initial = new Map(evaluateSlideAt(slide, 0).elements.map(element => [element.id, element]))
      for (const connector of slide.elements.filter(element => element.type === 'connector')) {
        expect(initial.get(connector.id)?.transform.opacity).toBe(0)
        expect(initial.get(connector.id)?.style.pathProgress).toBe(0)
        const drawTrack = slide.timeline.tracks.find(track => track.elementId === connector.id && track.property === 'pathProgress')!
        const end = drawTrack.keyframes.at(-1)!.at
        const targetId = connector.connector!.to.elementId
        expect(evaluateSlideAt(slide, end - .01).elements.find(element => element.id === targetId)?.transform.opacity).toBe(0)
        expect(evaluateSlideAt(slide, end).elements.find(element => element.id === targetId)?.transform.opacity).toBe(1)
      }
    }
  })

  it('aligns the VFX reliability badge with its box and reveals it at the poster cue', () => {
    const damage = createGripGunPresentationDeck().slides.find(slide => slide.id === 'gripgun-5')!
    const atBadgeCue = new Map(evaluateSlideAt(damage, 6.8).elements.map(element => [element.id, element]))
    const badge = atBadgeCue.get('badge')!
    const vfx = atBadgeCue.get('vfx')!
    expect(badge.transform.opacity).toBe(1)
    expect(badge.transform.x).toBe(vfx.transform.x)
    expect(badge.transform.width).toBe(vfx.transform.width)
  })
})
