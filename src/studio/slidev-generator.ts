import type { DeckDocumentV2 } from './deck.js'
import { getSlidevClickCount } from './slidev-adapter.js'

export interface SlidevManifestEntry {
  readonly slideId: string
  readonly route: number
  readonly clicks: number
  readonly posterCueId: string
  readonly notes: string
}

export function createSlidevManifest(deck: DeckDocumentV2): readonly SlidevManifestEntry[] {
  return deck.slides.filter(slide => !slide.hidden).map((slide, index) => ({ slideId: slide.id, route: index + 1, clicks: getSlidevClickCount(slide), posterCueId: slide.posterCueId, notes: slide.presenterNotes }))
}

export function generateSlidevMarkdown(deck: DeckDocumentV2): string {
  const entries = createSlidevManifest(deck)
  return entries.map((entry, index) => `${index === 0 ? '---\ntheme: apple-basic\ntitle: GripGun Line Trace Presentation\n' : ''}clicks: ${entry.clicks}\n---\n\n<LumaDeckSlide slide-id="${entry.slideId}" />\n\n<!-- ${entry.notes} -->`).join('\n---\n\n') + '\n'
}
