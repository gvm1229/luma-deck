import { z } from 'zod'

export const slideLayouts = [
  'intro',
  'intro-image',
  'intro-image-right',
  'default',
  'image-right',
  'bullets',
  'section',
  'statement',
  'fact',
  'quote',
  '3-images',
  'image',
  'end',
] as const

export const slideLayoutSchema = z.enum(slideLayouts)

export const deckSlideSchema = z.object({
  layout: slideLayoutSchema.optional().default('default'),
  title: z.string().trim().min(1).optional(),
  subtitle: z.string().trim().min(1).optional(),
  body: z.union([z.string(), z.array(z.string().trim().min(1)).min(1)]).optional(),
  image: z.string().trim().min(1).optional(),
  images: z.array(z.string().trim().min(1)).min(1).max(3).optional(),
  quote: z.string().trim().min(1).optional(),
  attribution: z.string().trim().min(1).optional(),
  notes: z.string().trim().min(1).optional(),
})

export const deckSchema = z.object({
  title: z.string().trim().min(1),
  subtitle: z.string().trim().min(1).optional(),
  author: z.string().trim().min(1).optional(),
  theme: z.literal('apple-basic').optional().default('apple-basic'),
  slides: z.array(deckSlideSchema).min(1),
})

export type Deck = z.infer<typeof deckSchema>
export type DeckSlide = z.infer<typeof deckSlideSchema>
export type SlideLayout = z.infer<typeof slideLayoutSchema>

export function parseDeck(input: unknown): Deck {
  return deckSchema.parse(input)
}

export function formatValidationError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'deck'
      return `${path}: ${issue.message}`
    })
    .join('\n')
}
