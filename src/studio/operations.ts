import { validateSceneDocument, type SceneDocument, type SceneElement, type SceneTrack } from './schema.js'

export type SceneOperation =
  | { readonly type: 'SetText', readonly slideId: string, readonly elementId: string, readonly text: string }
  | { readonly type: 'MoveElement', readonly slideId: string, readonly elementId: string, readonly x: number, readonly y: number }
  | { readonly type: 'ResizeElement', readonly slideId: string, readonly elementId: string, readonly width: number, readonly height: number }
  | { readonly type: 'SetTransform', readonly slideId: string, readonly elementId: string, readonly transform: Partial<SceneElement['transform']> }
  | { readonly type: 'SetStyle', readonly slideId: string, readonly elementId: string, readonly style: Record<string, string | number> }
  | { readonly type: 'ReplaceAsset', readonly slideId: string, readonly elementId: string, readonly assetId: string }
  | { readonly type: 'ReorderElement', readonly slideId: string, readonly elementId: string, readonly zIndex: number }
  | { readonly type: 'ApplyMotionPreset', readonly slideId: string, readonly elementId: string, readonly preset: string, readonly tracks: readonly SceneTrack[] }
  | { readonly type: 'SetTrackKeyframe', readonly slideId: string, readonly trackId: string, readonly keyframeIndex: number, readonly at?: number, readonly value?: number | string }

export function applySceneOperation(document: SceneDocument, operation: SceneOperation): SceneDocument {
  const next = structuredClone(document) as SceneDocument
  const slideIndex = next.slides.findIndex(slide => slide.id === operation.slideId)
  if (slideIndex < 0)
    throw new Error(`slide not found: ${operation.slideId}`)
  const slide = next.slides[slideIndex]
  if (operation.type === 'SetTrackKeyframe') {
    const trackIndex = slide.timeline.tracks.findIndex(track => track.id === operation.trackId)
    if (trackIndex < 0)
      throw new Error(`track not found: ${operation.trackId}`)
    const track = slide.timeline.tracks[trackIndex]
    const keyframe = track.keyframes[operation.keyframeIndex]
    if (!keyframe)
      throw new Error(`keyframe not found: ${operation.trackId}.${operation.keyframeIndex}`)
    const keyframes = [...track.keyframes]
    keyframes[operation.keyframeIndex] = { ...keyframe, ...(operation.at === undefined ? {} : { at: operation.at }), ...(operation.value === undefined ? {} : { value: operation.value }) }
    const tracks = [...slide.timeline.tracks]
    tracks[trackIndex] = { ...track, keyframes }
    const slides = [...next.slides]
    slides[slideIndex] = { ...slide, timeline: { ...slide.timeline, tracks } }
    return validateSceneDocument({ ...next, slides })
  }
  const elementIndex = slide.elements.findIndex(element => element.id === operation.elementId)
  if (elementIndex < 0)
    throw new Error(`element not found: ${operation.elementId}`)
  const element = slide.elements[elementIndex]

  let replacement: SceneElement
  switch (operation.type) {
    case 'SetText':
      replacement = { ...element, content: operation.text }
      break
    case 'MoveElement':
      replacement = { ...element, transform: { ...element.transform, x: operation.x, y: operation.y } }
      break
    case 'ResizeElement':
      replacement = { ...element, transform: { ...element.transform, width: operation.width, height: operation.height } }
      break
    case 'SetTransform':
      replacement = { ...element, transform: { ...element.transform, ...operation.transform } }
      break
    case 'SetStyle':
      replacement = { ...element, style: { ...element.style, ...operation.style } }
      break
    case 'ReplaceAsset':
      if (!next.assets.some(asset => asset.id === operation.assetId))
        throw new Error(`asset not found: ${operation.assetId}`)
      replacement = { ...element, assetId: operation.assetId }
      break
    case 'ReorderElement':
      replacement = { ...element, transform: { ...element.transform, zIndex: operation.zIndex } }
      break
    case 'ApplyMotionPreset': {
      const tracks = [...slide.timeline.tracks.filter(track => !track.id.startsWith(`preset-${operation.elementId}-`)), ...operation.tracks]
      const slides = [...next.slides]
      slides[slideIndex] = { ...slide, timeline: { ...slide.timeline, tracks } }
      return validateSceneDocument({ ...next, slides })
    }
  }

  const elements = [...slide.elements]
  elements[elementIndex] = replacement
  const slides = [...next.slides]
  slides[slideIndex] = { ...slide, elements }
  return validateSceneDocument({ ...next, slides })
}
