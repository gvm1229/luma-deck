import { describe, expect, it } from 'vitest'
import { createGripGunPresentationDeck } from '../../src/studio/gripgun-deck.js'
import { createSlidevManifest, generateSlidevMarkdown } from '../../src/studio/slidev-generator.js'

describe('Slidev generator', () => {
  it('creates one visible route with matching click/poster/note metadata per deck slide', () => {
    const deck = createGripGunPresentationDeck()
    const manifest = createSlidevManifest(deck)
    expect(manifest).toHaveLength(6)
    expect(manifest.map(entry => entry.route)).toEqual([1, 2, 3, 4, 5, 6])
    expect(manifest.map(entry => entry.clicks)).toEqual([3, 3, 3, 3, 3, 2])
    expect(generateSlidevMarkdown(deck).match(/<LumaDeckSlide/g)).toHaveLength(6)
  })
})
