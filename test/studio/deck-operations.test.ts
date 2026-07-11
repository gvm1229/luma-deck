import { describe, expect, it } from 'vitest'
import { migrateSceneDocument } from '../../src/studio/deck.js'
import { applyDeckOperation, createDeckHistory, redoDeckHistory, undoDeckHistory } from '../../src/studio/deck-operations.js'
import { createTestScene } from './scene.js'

describe('deck operations', () => {
  it('duplicates, reorders, and restores slides with history', () => {
    const deck = migrateSceneDocument(createTestScene())
    const duplicate = applyDeckOperation(deck, { type: 'DuplicateSlide', slideId: 'gripgun-flow', id: 'copy', title: 'Copy' })
    expect(duplicate.slides.map(slide => slide.id)).toEqual(['gripgun-flow', 'copy'])
    const moved = applyDeckOperation(duplicate, { type: 'MoveSlide', slideId: 'copy', toIndex: 0 })
    expect(moved.slides[0].id).toBe('copy')
    const history = undoDeckHistory({ ...createDeckHistory(deck), past: [deck, duplicate], present: moved })
    expect(history.present.slides[0].id).toBe('gripgun-flow')
    expect(redoDeckHistory(history).present.slides[0].id).toBe('copy')
  })
})
