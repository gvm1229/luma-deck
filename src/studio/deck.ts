import { validateSceneDocument, type SceneAsset, type SceneDocument, type SceneSlide } from './schema.js'

export type SlideTransition = 'none' | 'fade' | 'push'

export type MotionPurpose = 'focus' | 'route' | 'transform' | 'compare' | 'evidence' | 'impact' | 'sequence'
export type ReducedMotionFallback = 'instant' | 'fade' | 'preserve'

export interface DeckSlide extends SceneSlide {
  readonly title: string
  readonly hidden: boolean
  readonly transition: SlideTransition
}

export interface DeckDocumentV2 {
  readonly schemaVersion: 2
  readonly id: string
  readonly metadata: { readonly title: string, readonly author?: string }
  readonly viewport: SceneDocument['viewport']
  readonly themeTokens: Record<string, string>
  readonly assets: readonly SceneAsset[]
  readonly slides: readonly DeckSlide[]
}

export function migrateSceneDocument(document: SceneDocument | DeckDocumentV2): DeckDocumentV2 {
  if (document.schemaVersion === 2)
    return validateDeckDocument(document)
  const source = validateSceneDocument(document)
  return validateDeckDocument({
    schemaVersion: 2,
    id: 'deck-gripgun',
    metadata: { title: 'GripGun Line Trace' },
    viewport: source.viewport,
    themeTokens: { canvas: '#f8fafc', accent: '#2563eb', ink: '#111827' },
    assets: source.assets,
    slides: source.slides.map((slide, index) => ({
      ...slide,
      title: index === 0 ? 'GripGun Line Trace' : `Slide ${index + 1}`,
      hidden: false,
      transition: 'fade',
    })),
  })
}

export function validateDeckDocument(input: unknown): DeckDocumentV2 {
  if (!input || typeof input !== 'object')
    throw new Error('deck: object required')
  const deck = input as DeckDocumentV2
  if (deck.schemaVersion !== 2 || !isId(deck.id) || !deck.metadata || typeof deck.metadata.title !== 'string' || !deck.metadata.title.trim())
    throw new Error('deck: invalid metadata')
  if (!deck.themeTokens || typeof deck.themeTokens !== 'object' || Array.isArray(deck.themeTokens))
    throw new Error('deck: invalid themeTokens')
  const seenSlideIds = new Set<string>()
  const seenAssetIds = new Set<string>()
  for (const asset of deck.assets) {
    if (seenAssetIds.has(asset.id))
      throw new Error(`deck.assets: duplicate id '${asset.id}'`)
    seenAssetIds.add(asset.id)
  }
  for (const slide of deck.slides) {
    if (seenSlideIds.has(slide.id))
      throw new Error(`deck.slides: duplicate id '${slide.id}'`)
    seenSlideIds.add(slide.id)
    if (!slide.title.trim() || !['none', 'fade', 'push'].includes(slide.transition) || typeof slide.hidden !== 'boolean')
      throw new Error(`deck.slides.${slide.id}: invalid v2 metadata`)
  }
  validateSceneDocument({ schemaVersion: 1, viewport: deck.viewport, assets: deck.assets, slides: deck.slides })
  return deck
}

export function serializeDeckDocument(deck: DeckDocumentV2): string {
  return `${JSON.stringify(sortValue(validateDeckDocument(deck)), null, 2)}\n`
}

export function parseDeckDocument(source: string): DeckDocumentV2 {
  const parsed = JSON.parse(source) as SceneDocument | DeckDocumentV2
  return parsed.schemaVersion === 2 ? validateDeckDocument(parsed) : migrateSceneDocument(parsed)
}

export function deckSemanticEqual(left: DeckDocumentV2, right: DeckDocumentV2): boolean {
  return serializeDeckDocument(left) === serializeDeckDocument(right)
}

function isId(value: unknown): value is string {
  return typeof value === 'string' && /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(value)
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
