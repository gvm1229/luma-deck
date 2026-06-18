import { describe, expect, it } from 'vitest'
import { deckSchema } from '../src/schema/deck.js'

describe('deck schema', () => {
  it('validates an apple-basic deck', () => {
    const result = deckSchema.safeParse({
      title: 'Demo',
      slides: [
        {
          layout: 'intro',
          title: 'Demo',
        },
      ],
    })

    expect(result.success).toBe(true)
    expect(result.success && result.data.theme).toBe('apple-basic')
  })

  it('rejects a deck without slides', () => {
    const result = deckSchema.safeParse({
      title: 'Demo',
      slides: [],
    })

    expect(result.success).toBe(false)
  })

  it('rejects unsupported layouts', () => {
    const result = deckSchema.safeParse({
      title: 'Demo',
      slides: [
        {
          layout: 'unknown',
          title: 'Demo',
        },
      ],
    })

    expect(result.success).toBe(false)
  })
})
