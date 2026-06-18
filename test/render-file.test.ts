import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getBackupPath, writeRenderOutput } from '../src/generator/render-file.js'

describe('render file output', () => {
  it('builds timestamped backup paths beside the output file', () => {
    const backupPath = getBackupPath('slides.md', new Date('2026-06-18T01:02:03.004Z'))

    expect(backupPath).toBe('slides.backup.20260618T010203Z.md')
  })

  it('backs up existing output when force is used', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'lumadeck-render-'))
    const output = join(dir, 'slides.md')

    try {
      await writeRenderOutput(output, 'old slides')
      const result = await writeRenderOutput(output, 'new slides', {
        force: true,
        now: new Date('2026-06-18T01:02:03.004Z'),
      })

      expect(result.backupPath).toBe(join(dir, 'slides.backup.20260618T010203Z.md'))
      await expect(readFile(result.backupPath!, 'utf8')).resolves.toBe('old slides')
      await expect(readFile(output, 'utf8')).resolves.toBe('new slides')
    }
    finally {
      await rm(dir, { recursive: true, force: true })
    }
  })

  it('does not create a backup for new output files', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'lumadeck-render-'))
    const output = join(dir, 'slides.md')

    try {
      const result = await writeRenderOutput(output, 'new slides', {
        force: true,
        now: new Date('2026-06-18T01:02:03.004Z'),
      })
      const files = await readdir(dir)

      expect(result.backupPath).toBeUndefined()
      expect(files).toEqual(['slides.md'])
    }
    finally {
      await rm(dir, { recursive: true, force: true })
    }
  })
})
