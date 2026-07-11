export const sceneElementTypes = ['text', 'image', 'shape', 'path'] as const
export const cueModes = ['auto', 'hold', 'click'] as const
export const easingNames = ['linear', 'ease-in', 'ease-out', 'ease-in-out'] as const
const allowedStyleKeys = new Set(['background', 'border', 'borderColor', 'borderRadius', 'boxShadow', 'color', 'fontSize', 'fontWeight', 'lineHeight', 'pathProgress', 'scale'])
const allowedTrackProperties = new Set(['x', 'y', 'width', 'height', 'rotation', 'opacity', 'pathProgress'])
const betaEvidenceSource = '/projects/pragmata-2p-beta/images/slide-15-enemy-hit.png'

export type SceneElementType = typeof sceneElementTypes[number]
export type CueMode = typeof cueModes[number]
export type EasingName = typeof easingNames[number]

export interface SceneTransform {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly rotation: number
  readonly opacity: number
  readonly zIndex: number
}

export interface SceneElement {
  readonly id: string
  readonly type: SceneElementType
  readonly transform: SceneTransform
  readonly content?: string
  readonly assetId?: string
  readonly style: Record<string, string | number>
  readonly accessibilityLabel: string
}

export interface SceneAsset {
  readonly id: string
  readonly src: string
  readonly alt: string
  readonly fit: 'cover' | 'contain'
  readonly focalPoint: { readonly x: number, readonly y: number }
}

export interface SceneCue {
  readonly id: string
  readonly at: number
  readonly mode: CueMode
  readonly label: string
}

export interface SceneKeyframe {
  readonly at: number
  readonly value: number | string
  readonly easing: EasingName
}

export interface SceneTrack {
  readonly id: string
  readonly elementId: string
  readonly property: 'x' | 'y' | 'width' | 'height' | 'rotation' | 'opacity' | 'pathProgress' | `style.${string}`
  readonly keyframes: readonly SceneKeyframe[]
}

export interface SceneSlide {
  readonly id: string
  readonly layoutId: string
  readonly presenterNotes: string
  readonly posterCueId: string
  readonly elements: readonly SceneElement[]
  readonly timeline: {
    readonly duration: number
    readonly cues: readonly SceneCue[]
    readonly tracks: readonly SceneTrack[]
  }
}

export interface SceneDocument {
  readonly schemaVersion: 1
  readonly viewport: { readonly width: number, readonly height: number }
  readonly assets: readonly SceneAsset[]
  readonly slides: readonly SceneSlide[]
}

export class SceneValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SceneValidationError'
  }
}

export function validateSceneDocument(input: unknown): SceneDocument {
  if (!input || typeof input !== 'object')
    throw new SceneValidationError('document: object required')
  const document = input as SceneDocument
  if (document.schemaVersion !== 1)
    throw new SceneValidationError('schemaVersion: expected 1')
  assertPositive(document.viewport?.width, 'viewport.width')
  assertPositive(document.viewport?.height, 'viewport.height')
  if (!Array.isArray(document.assets) || !Array.isArray(document.slides) || document.slides.length === 0 || document.assets.length > 200 || document.slides.length > 100)
    throw new SceneValidationError('assets/slides: arrays required and slides cannot be empty')
  const seen = new Set<string>()
  const add = (id: string, path: string): void => {
    if (seen.has(id))
      throw new SceneValidationError(`${path}: duplicate id '${id}'`)
    seen.add(id)
  }

  for (const asset of document.assets) {
    assertId(asset.id, `assets.${asset.id}.id`)
    if (!asset.src || !['cover', 'contain'].includes(asset.fit) || typeof asset.alt !== 'string' || asset.alt.length > 240 || !isSafeAssetSource(asset.src))
      throw new SceneValidationError(`assets.${asset.id}: invalid src or fit`)
    assertRange(asset.focalPoint.x, 0, 1, `assets.${asset.id}.focalPoint.x`)
    assertRange(asset.focalPoint.y, 0, 1, `assets.${asset.id}.focalPoint.y`)
    add(asset.id, `assets.${asset.id}`)
  }

  for (const slide of document.slides) {
    assertId(slide.id, `slides.${slide.id}.id`)
    if (!slide.layoutId || slide.layoutId.length > 80 || typeof slide.presenterNotes !== 'string' || slide.presenterNotes.length > 4000 || !slide.timeline || !Array.isArray(slide.elements) || !Array.isArray(slide.timeline.cues) || !Array.isArray(slide.timeline.tracks) || slide.elements.length > 500 || slide.timeline.cues.length > 100 || slide.timeline.tracks.length > 1000)
      throw new SceneValidationError(`slides.${slide.id}: invalid structure`)
    assertPositive(slide.timeline.duration, `slides.${slide.id}.timeline.duration`)
    add(slide.id, `slides.${slide.id}`)
    const elementIds = new Set<string>()
    const cueIds = new Set<string>()
    const assetIds = new Set(document.assets.map(asset => asset.id))

    for (const element of slide.elements) {
      assertId(element.id, `slides.${slide.id}.elements.id`)
      if (!sceneElementTypes.includes(element.type) || !element.accessibilityLabel || !element.style)
        throw new SceneValidationError(`slides.${slide.id}.elements.${element.id}: invalid element`)
      if (typeof element.content !== 'undefined' && (typeof element.content !== 'string' || element.content.length > 4000))
        throw new SceneValidationError(`slides.${slide.id}.elements.${element.id}.content: invalid text`)
      if (element.type === 'image' && !element.assetId)
        throw new SceneValidationError(`slides.${slide.id}.elements.${element.id}.assetId: image asset required`)
      assertFinite(element.transform.x, `slides.${slide.id}.elements.${element.id}.transform.x`)
      assertFinite(element.transform.y, `slides.${slide.id}.elements.${element.id}.transform.y`)
      if (typeof element.style !== 'object' || Array.isArray(element.style) || Object.keys(element.style).length > 20)
        throw new SceneValidationError(`slides.${slide.id}.elements.${element.id}.style: invalid object`)
      for (const [key, value] of Object.entries(element.style)) {
        if (!allowedStyleKeys.has(key) || !['string', 'number'].includes(typeof value))
          throw new SceneValidationError(`slides.${slide.id}.elements.${element.id}.style.${key}: unsupported style`)
        if (typeof value === 'string' && !isSafeStyleValue(value))
          throw new SceneValidationError(`slides.${slide.id}.elements.${element.id}.style.${key}: unsafe style value`)
      }
      assertPositive(element.transform.width, `slides.${slide.id}.elements.${element.id}.transform.width`)
      assertPositive(element.transform.height, `slides.${slide.id}.elements.${element.id}.transform.height`)
      assertRange(element.transform.opacity, 0, 1, `slides.${slide.id}.elements.${element.id}.transform.opacity`)
      assertFinite(element.transform.rotation, `slides.${slide.id}.elements.${element.id}.transform.rotation`)
      if (!Number.isInteger(element.transform.zIndex) || Math.abs(element.transform.zIndex) > 10000)
        throw new SceneValidationError(`slides.${slide.id}.elements.${element.id}.transform.zIndex: bounded integer required`)
      if (elementIds.has(element.id))
        throw new SceneValidationError(`slides.${slide.id}.elements.${element.id}: duplicate id`)
      elementIds.add(element.id)
      if (element.assetId && !assetIds.has(element.assetId))
        throw new SceneValidationError(`slides.${slide.id}.elements.${element.id}.assetId: missing asset '${element.assetId}'`)
    }

    let previousCueAt = -1
    for (const cue of slide.timeline.cues) {
      assertId(cue.id, `slides.${slide.id}.timeline.cues.id`)
      if (!cueModes.includes(cue.mode) || !cue.label)
        throw new SceneValidationError(`slides.${slide.id}.timeline.cues.${cue.id}: invalid cue`)
      if (cueIds.has(cue.id))
        throw new SceneValidationError(`slides.${slide.id}.timeline.cues.${cue.id}: duplicate id`)
      cueIds.add(cue.id)
      if (cue.at < previousCueAt || cue.at > slide.timeline.duration)
        throw new SceneValidationError(`slides.${slide.id}.timeline.cues.${cue.id}.at: cue must be ordered and within duration`)
      previousCueAt = cue.at
    }

    if (!cueIds.has(slide.posterCueId))
      throw new SceneValidationError(`slides.${slide.id}.posterCueId: missing cue '${slide.posterCueId}'`)

    for (const track of slide.timeline.tracks) {
      assertId(track.id, `slides.${slide.id}.timeline.tracks.id`)
      if (!track.property || !Array.isArray(track.keyframes) || track.keyframes.length === 0 || track.keyframes.length > 100 || (!allowedTrackProperties.has(track.property) && (!track.property.startsWith('style.') || !allowedStyleKeys.has(track.property.slice('style.'.length)))))
        throw new SceneValidationError(`slides.${slide.id}.timeline.tracks.${track.id}: invalid track`)
      if (!elementIds.has(track.elementId))
        throw new SceneValidationError(`slides.${slide.id}.timeline.tracks.${track.id}.elementId: missing element '${track.elementId}'`)
      let previousKeyframeAt = -1
      for (const keyframe of track.keyframes) {
        if (!easingNames.includes(keyframe.easing) || !['number', 'string'].includes(typeof keyframe.value))
          throw new SceneValidationError(`slides.${slide.id}.timeline.tracks.${track.id}: invalid keyframe`)
        if (typeof keyframe.value === 'string' && (!track.property.startsWith('style.') || !isSafeStyleValue(keyframe.value)))
          throw new SceneValidationError(`slides.${slide.id}.timeline.tracks.${track.id}: unsafe string keyframe`)
        if (keyframe.at < previousKeyframeAt || keyframe.at > slide.timeline.duration)
          throw new SceneValidationError(`slides.${slide.id}.timeline.tracks.${track.id}: keyframes must be ordered and within duration`)
        previousKeyframeAt = keyframe.at
      }
    }
  }

  return document
}

function assertId(value: unknown, path: string): asserts value is string {
  if (typeof value !== 'string' || !/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(value))
    throw new SceneValidationError(`${path}: valid ID required`)
}

function assertPositive(value: unknown, path: string): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0)
    throw new SceneValidationError(`${path}: positive number required`)
}

function assertFinite(value: unknown, path: string): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new SceneValidationError(`${path}: finite number required`)
}

function assertRange(value: unknown, minimum: number, maximum: number, path: string): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < minimum || value > maximum)
    throw new SceneValidationError(`${path}: number in ${minimum}..${maximum} required`)
}

function isSafeAssetSource(source: string): boolean {
  return /^assets\/[a-zA-Z0-9][a-zA-Z0-9._-]{0,180}$/.test(source) || source === betaEvidenceSource
}

function isSafeStyleValue(value: string): boolean {
  return value.length <= 240 && !/url\s*\(|expression\s*\(|javascript:/i.test(value)
}
