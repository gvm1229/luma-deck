import { validateSceneDocument, type SceneDocument } from './schema.js'

export function serializeSceneDocument(document: SceneDocument): string {
  return `${JSON.stringify(sortValue(document), null, 2)}\n`
}

export function parseSceneDocument(source: string): SceneDocument {
  return validateSceneDocument(JSON.parse(source) as unknown)
}

export function sceneSemanticEqual(left: SceneDocument, right: SceneDocument): boolean {
  return serializeSceneDocument(left) === serializeSceneDocument(right)
}

function sortValue(value: unknown): unknown {
  if (Array.isArray(value))
    return value.map(sortValue)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, sortValue(child)]))
  }
  return value
}
