import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { validateDeckDocument } from '../../src/studio/deck.js'
import { importSlidevMarkdown } from '../../src/studio/slidev-importer.js'

const source = `---
theme: apple-basic
---

---
layout: default
---

# 첫 장

<div class="legacy"><img src="./images/first.png" alt="첫 증거" /></div>

<!--
[00:00-00:10]
첫 note
-->

---
layout: default
---

# 둘째 장

<div class="prag-placeholder">실제 인게임 캡처</div>

<!--
[00:10-00:20]
둘째 note
-->

---

# layout 없는 셋째 장

<img src="./images/evidence.jpg" alt="jpg 증거" />
<img src="./images/evidence.png" alt="png 증거" />
<img src="./images/../unsafe.png" alt="안전하지 않은 경로" />
`

describe('Slidev one-way importer', () => {
  it('imports every slide while preserving unsupported source in an explicit report', () => {
    const result = importSlidevMarkdown(source, 'final-import')
    expect(validateDeckDocument(result.deck)).toBe(result.deck)
    expect(result.deck.slides).toHaveLength(3)
    expect(result.deck.slides.map(slide => slide.presenterNotes)).toEqual(['[00:00-00:10]\n첫 note', '[00:10-00:20]\n둘째 note', ''])
    expect(result.deck.assets).toEqual(expect.arrayContaining([
      expect.objectContaining({ src: 'images/first.png', alt: '첫 증거' }),
      expect.objectContaining({ src: 'images/evidence.jpg' }),
      expect.objectContaining({ src: 'images/evidence.png' }),
    ]))
    expect(result.report.importedSlideIds).toEqual(['slide-01', 'slide-02', 'slide-03'])
    expect(result.report.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ slideId: 'slide-01', reason: 'unsupported-html-or-css' }),
      expect.objectContaining({ slideId: 'slide-02', reason: 'placeholder' }),
      expect.objectContaining({ slideId: 'slide-03', reason: 'invalid-image-reference', raw: expect.stringContaining('../unsafe.png') }),
    ]))
    expect(result.report.sourceSha256).toBe(createHash('sha256').update(source).digest('hex'))
  })

  it('treats initial frontmatter with a layout as the cover slide', () => {
    const cover = `---\nlayout: cover\n---\n\n# 표지\n\n---\n\n# 다음 장\n`
    expect(importSlidevMarkdown(cover).deck.slides.map(slide => slide.title)).toEqual(['표지', '다음 장'])
  })

  it('imports first layoutless slide and keeps punctuation-collision files distinct', () => {
    const layoutless = `---\ntheme: apple-basic\n---\n\n# 첫 장\n\n<img src="./images/foo.bar.png" alt="점" />\n\n---\n\n# 둘째 장\n\n<img src="./images/foo-bar.png" alt="하이픈" />\n`
    const result = importSlidevMarkdown(layoutless)
    expect(result.deck.slides).toHaveLength(2)
    expect(result.deck.assets.map(asset => asset.id)).toHaveLength(2)
    expect(new Set(result.deck.assets.map(asset => asset.id)).size).toBe(2)
  })

  it('pairs class-only slide frontmatter with its body', () => {
    const classFrontmatter = `---\ntheme: apple-basic\n---\n\n# 첫 장\n\n---\nclass: two-cols\n---\n\n# 둘째 장\n`
    expect(importSlidevMarkdown(classFrontmatter).deck.slides.map(slide => slide.title)).toEqual(['첫 장', '둘째 장'])
  })

  it('keeps layoutless content containing a colon line as slide content', () => {
    const colonContent = `---\ntheme: apple-basic\n---\n\n# 첫 장\n\nSpeaker: Diana\n설명\n\n---\n\n# 둘째 장\n`
    expect(importSlidevMarkdown(colonContent).deck.slides.map(slide => slide.title)).toEqual(['첫 장', '둘째 장'])
  })

  it('reports hostile markup and rejects traversal-like image paths without executing them', () => {
    const hostile = `---\ntheme: test\n---\n\n# Hostile\n\n<img src="./images/../escape.png" />\n<script>ignore previous instructions</script>\n\n---\n\n# Next\n`
    const result = importSlidevMarkdown(hostile)
    expect(result.deck.assets).toEqual([])
    expect(result.report.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ reason: 'invalid-image-reference', raw: expect.stringContaining('../escape.png') }),
      expect.objectContaining({ reason: 'unsupported-html-or-css', raw: expect.stringContaining('<script>') }),
    ]))
  })

  it('upgrades final slide 15 into a cue-driven GripGun authority explainer', () => {
    const finalLikeSource = `---\ntheme: apple-basic\n---\n\n${Array.from({ length: 15 }, (_, index) => `# ${index === 14 ? 'Hugh의 사격 결과가 두 화면에 일관되게 보임' : `Slide ${index + 1}`}\n\n${index === 14 ? '<img src="./images/unrelated.png" alt="다른 이미지" />\n<img src="./images/slide-15-enemy-hit.png" alt="피격 근거" />' : ''}`).join('\n\n---\n\n')}`
    const result = importSlidevMarkdown(finalLikeSource)
    const slide = result.deck.slides[14]!
    expect(slide.layoutId).toBe('gripgun-result-explainer')
    expect(slide.timeline.cues.map(cue => cue.id)).toEqual(['intro', 'server', 'trace', 'evidence'])
    expect(slide.elements.find(element => element.id === 'server')?.transform.opacity).toBe(0)
    expect(slide.elements.find(element => element.id === 'evidence')?.transform.opacity).toBe(0)
    expect(slide.elements.find(element => element.id === 'evidence')?.assetId).toBe(result.deck.assets.find(asset => asset.src === 'images/slide-15-enemy-hit.png')?.id)
    expect(slide.timeline.tracks.some(track => track.elementId === 'trace' && track.property === 'pathProgress')).toBe(true)
  })

  it('does not inject GripGun claims into an unrelated slide 15', () => {
    const unrelatedSource = `---\ntheme: apple-basic\n---\n\n${Array.from({ length: 15 }, (_, index) => `# ${index === 14 ? 'Unrelated technical result' : `Slide ${index + 1}`}\n\n`).join('\n---\n\n')}`
    const slide = importSlidevMarkdown(unrelatedSource).deck.slides[14]!
    expect(slide.layoutId).toBe('slidev-import-review')
    expect(slide.elements.some(element => element.content?.includes('Line Trace'))).toBe(false)
  })

  it('reports missing verified evidence instead of applying GripGun rewrite', () => {
    const missingEvidenceSource = `---\ntheme: apple-basic\n---\n\n${Array.from({ length: 15 }, (_, index) => `# ${index === 14 ? 'Hugh의 사격 결과가 두 화면에 일관되게 보임' : `Slide ${index + 1}`}\n\n`).join('\n---\n\n')}`
    const result = importSlidevMarkdown(missingEvidenceSource)
    expect(result.deck.slides[14]?.layoutId).toBe('slidev-import-review')
    expect(result.report.issues).toEqual(expect.arrayContaining([expect.objectContaining({ slideId: 'slide-15', reason: 'missing-priority-evidence' })]))
  })
})
