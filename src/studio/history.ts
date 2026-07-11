import { applySceneOperation, type SceneOperation } from './operations.js'
import type { SceneDocument } from './schema.js'

export interface SceneHistory {
  readonly past: readonly SceneDocument[]
  readonly present: SceneDocument
  readonly future: readonly SceneDocument[]
}

export function createSceneHistory(document: SceneDocument): SceneHistory {
  return { past: [], present: document, future: [] }
}

export function applyHistoryOperation(history: SceneHistory, operation: SceneOperation): SceneHistory {
  return { past: [...history.past, history.present], present: applySceneOperation(history.present, operation), future: [] }
}

export function undoSceneHistory(history: SceneHistory): SceneHistory {
  const previous = history.past.at(-1)
  if (!previous)
    return history
  return { past: history.past.slice(0, -1), present: previous, future: [history.present, ...history.future] }
}

export function redoSceneHistory(history: SceneHistory): SceneHistory {
  const next = history.future[0]
  if (!next)
    return history
  return { past: [...history.past, history.present], present: next, future: history.future.slice(1) }
}
