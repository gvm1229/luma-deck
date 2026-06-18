import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { renderDeckToSlidevMarkdown } from '../src/generator/markdown.js'
import type { Deck } from '../src/schema/deck.js'
import { initWorkspace } from '../src/workspace/init.js'

describe('Slidev Markdown generator', () => {
  it('renders apple-basic frontmatter and layouts', () => {
    const deck: Deck = {
      title: 'Demo',
      theme: 'apple-basic',
      slides: [
        {
          layout: 'intro',
          title: 'Demo',
          subtitle: 'Hello',
        },
        {
          layout: 'bullets',
          title: 'Points',
          body: ['One', 'Two'],
        },
        {
          layout: 'quote',
          quote: 'Make it live',
          attribution: 'LumaDeck',
        },
      ],
    }

    const markdown = renderDeckToSlidevMarkdown(deck)

    expect(markdown).toContain('theme: apple-basic')
    expect(markdown).toContain('layout: intro')
    expect(markdown).toContain('layout: bullets')
    expect(markdown).toContain('- One')
    expect(markdown).toContain('> Make it live')
    expect(markdown).not.toContain('---\n\n---')
  })

  it('initializes a deck workspace', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'lumadeck-'))

    try {
      await initWorkspace(dir)
      const slides = await readFile(join(dir, 'slides.md'), 'utf8')
      const styles = await readFile(join(dir, 'styles', 'index.css'), 'utf8')

      expect(slides).toContain('theme: apple-basic')
      expect(styles).toContain('.motion-card')
    }
    finally {
      await rm(dir, { recursive: true, force: true })
    }
  })

  it('does not initialize into a non-empty directory without force', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'lumadeck-'))

    try {
      await writeFile(join(dir, 'existing.txt'), 'content', 'utf8')
      await expect(initWorkspace(dir)).rejects.toThrow('대상 폴더가 비어 있지 않음')
    }
    finally {
      await rm(dir, { recursive: true, force: true })
    }
  })
})
