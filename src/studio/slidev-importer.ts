import { createHash } from 'node:crypto'
import type { DeckDocumentV2, DeckSlide } from './deck.js'
import type { SceneAsset, SceneElement } from './schema.js'

export interface SlidevImportIssue {
  readonly slideId: string
  readonly sourceIndex: number
  readonly reason: 'unsupported-html-or-css' | 'placeholder' | 'invalid-image-reference'
  readonly raw: string
}

export interface SlidevImportReport {
  readonly sourceSha256: string
  readonly totalSlides: number
  readonly importedSlideIds: readonly string[]
  readonly issues: readonly SlidevImportIssue[]
}

export interface SlidevImportResult {
  readonly deck: DeckDocumentV2
  readonly report: SlidevImportReport
}

const imageTag = /<img\b[^>]*\bsrc=["']\.\/images\/([^"']+)["'][^>]*>/gi
const altAttribute = /\balt=["']([^"']*)["']/i
const notesComment = /<!--[\s\S]*?-->/g
const safeImageName = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,180}$/

export function importSlidevMarkdown(source: string, deckId = 'pragmata-2p-final'): SlidevImportResult {
  const blocks = getSlideBlocks(source)
  const assets: SceneAsset[] = []
  const seenAssets = new Set<string>()
  const slides: DeckSlide[] = []
  const issues: SlidevImportIssue[] = []

  for (const [index, body] of blocks.entries()) {
    const id = `slide-${String(index + 1).padStart(2, '0')}`
    const title = extractTitle(body) ?? `Slide ${index + 1}`
    const notes = extractNotes(body)
    const imageReferences = extractImages(body)
    const images = imageReferences.filter((image): image is { readonly fileName: string, readonly alt: string, readonly raw: string } => image.fileName !== undefined)
    for (const image of imageReferences.filter(image => image.fileName === undefined))
      issues.push({ slideId: id, sourceIndex: index + 1, reason: 'invalid-image-reference', raw: image.raw })
    for (const image of images) {
      const assetId = assetIdFor(image.fileName)
      if (!seenAssets.has(assetId)) {
        seenAssets.add(assetId)
        assets.push({ id: assetId, src: `images/${image.fileName}`, alt: image.alt || image.fileName, fit: 'cover', focalPoint: { x: .5, y: .5 } })
      }
    }
    const unsupported = stripNotes(body).replace(/^# .+$/m, '').trim()
    if (/<\/?[a-z][^>]*>/i.test(unsupported)) {
      issues.push({ slideId: id, sourceIndex: index + 1, reason: 'unsupported-html-or-css', raw: unsupported })
    }
    if (/prag-placeholder|placeholder|실제 인게임 캡처/i.test(unsupported))
      issues.push({ slideId: id, sourceIndex: index + 1, reason: 'placeholder', raw: unsupported })
    slides.push(createImportedSlide(id, title, notes, extractSummary(body), images.map(image => assetIdFor(image.fileName))))
  }

  const deck: DeckDocumentV2 = {
    schemaVersion: 2,
    id: deckId,
    metadata: { title: 'Pragmata 2P 최종 발표', author: '팀 다이애나' },
    viewport: { width: 1920, height: 1080 },
    themeTokens: { canvas: '#f8fafc', accent: '#2563eb', ink: '#111827' },
    assets,
    slides,
  }
  return {
    deck,
    report: {
      sourceSha256: createHash('sha256').update(source).digest('hex'),
      totalSlides: slides.length,
      importedSlideIds: slides.map(slide => slide.id),
      issues,
    },
  }
}

function getSlideBlocks(source: string): readonly string[] {
  const parts = source.split(/^---\r?$/m)
  const blocks: string[] = []
  const initial = parts[1]?.trim() ?? ''
  const initialIsSlide = isFrontmatter(initial) && /^layout:/m.test(initial)
  let index = initialIsSlide ? 1 : 2
  let seenSlide = false
  while (index < parts.length) {
    const part = parts[index]?.trim() ?? ''
    if (!part) { index += 1; continue }
    if (isFrontmatter(part)) {
      const body = parts[index + 1]?.trim() ?? ''
      if (body) blocks.push(body)
      seenSlide = true
      index += 2
      continue
    }
    if (seenSlide || !isFrontmatter(parts[index + 1]?.trim() ?? '') || !isCommentOnly(part)) blocks.push(part)
    index += 1
  }
  return blocks
}

function isFrontmatter(value: string): boolean {
  return Boolean(value) && /^[a-zA-Z][a-zA-Z0-9_-]*:\s*[^<\n]*(?:\r?\n(?:\s+.*|[a-zA-Z][a-zA-Z0-9_-]*:\s*.*))*$/.test(value)
}

function isCommentOnly(value: string): boolean {
  return value.replace(notesComment, '').trim() === ''
}

function createImportedSlide(id: string, title: string, notes: string, summary: string, imageIds: readonly string[]): DeckSlide {
  const elements: SceneElement[] = [
    textElement('eyebrow', `${id.replace('slide-', '')} · FINAL DECK`, 110, 62, 1100, 22, '#2563eb'),
    textElement('headline', title, 110, 120, 1100, 52, '#0f172a'),
    textElement('summary', summary || '원본 Slidev content를 import review 대상으로 보존함.', 110, 240, imageIds.length ? 700 : 1500, 25, '#475569'),
  ]
  imageIds.slice(0, 2).forEach((assetId, index) => elements.push({
    id: `image-${index + 1}`,
    type: 'image',
    assetId,
    transform: transform(imageIds.length === 1 ? 1080 : 930 + index * 440, 370, imageIds.length === 1 ? 680 : 390, 460, 4),
    style: { borderRadius: 28, boxShadow: '0 20px 50px rgba(15,23,42,.18)' },
    accessibilityLabel: assetId,
  }))
  return { id, title, hidden: false, transition: 'fade', layoutId: 'slidev-import-review', presenterNotes: notes, posterCueId: 'poster', elements, timeline: { duration: 4, cues: [{ id: 'intro', at: 0, mode: 'auto', label: 'imported content' }, { id: 'poster', at: 4, mode: 'hold', label: 'review hold' }], tracks: [] } }
}

function transform(x: number, y: number, width: number, height: number, zIndex: number) {
  return { x, y, width, height, rotation: 0, opacity: 1, zIndex }
}

function textElement(id: string, content: string, x: number, y: number, width: number, fontSize: number, color: string): SceneElement {
  return { id, type: 'text', content, transform: transform(x, y, width, 100, 10), style: { color, fontSize, fontWeight: 800, lineHeight: 1.15 }, accessibilityLabel: content }
}

function extractTitle(body: string): string | undefined {
  return /^#\s+(.+)$/m.exec(body)?.[1]?.replace(/<[^>]+>/g, '').trim()
}

function extractNotes(body: string): string {
  return [...body.matchAll(notesComment)].map(match => match[0].slice(4, -3).trim()).join('\n\n')
}

function stripNotes(body: string): string {
  return body.replace(notesComment, '')
}

function extractSummary(body: string): string {
  return stripNotes(body)
    .replace(/^#\s+.+$/m, '')
    .replace(/<img\b[^>]*>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 240)
}

function extractImages(body: string): readonly { readonly fileName?: string, readonly alt: string, readonly raw: string }[] {
  return [...body.matchAll(imageTag)].map((match) => ({ fileName: safeImageName.test(match[1]!) ? match[1] : undefined, alt: altAttribute.exec(match[0])?.[1] ?? '', raw: match[0] }))
}

function assetIdFor(fileName: string): string {
  return `asset-${createHash('sha256').update(fileName).digest('hex').slice(0, 16)}`
}
