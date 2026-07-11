import { describe, expect, it } from 'vitest'
import { applyHistoryOperation, createSceneHistory, redoSceneHistory, undoSceneHistory } from '../../src/studio/history.js'
import { createTestScene } from './scene.js'

describe('studio history', () => {
  it('restores original and final state across 20 operations', () => {
    let history = createSceneHistory(createTestScene())
    for (let index = 0; index < 20; index += 1)
      history = applyHistoryOperation(history, { type: 'MoveElement', slideId: 'gripgun-flow', elementId: 'client', x: 120 + index, y: 350 })
    const finalX = history.present.slides[0].elements.find(element => element.id === 'client')?.transform.x
    for (let index = 0; index < 20; index += 1)
      history = undoSceneHistory(history)
    expect(history.present.slides[0].elements.find(element => element.id === 'client')?.transform.x).toBe(120)
    for (let index = 0; index < 20; index += 1)
      history = redoSceneHistory(history)
    expect(history.present.slides[0].elements.find(element => element.id === 'client')?.transform.x).toBe(finalX)
  })
})
