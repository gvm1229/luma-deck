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
    expect(geometry.get('damage-route')?.renderMatrix).toMatchObject({ tx: geometry.get('vfx-route')?.renderMatrix.tx, ty: geometry.get('vfx-route')?.renderMatrix.ty })
  })
})
