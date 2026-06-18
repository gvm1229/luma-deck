import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  getProjectInfo,
  isProjectNameLike,
  listProjects,
  resolveExistingProjectInput,
  resolveProjectFileTarget,
  resolveProjectTarget,
} from '../src/workspace/projects.js'

describe('project target resolution', () => {
  const cwd = resolve('/repo')

  it('places bare project names under projects/', () => {
    const target = resolveProjectTarget('my-deck', cwd)

    expect(target.dir).toBe(resolve('/repo/projects/my-deck'))
    expect(target.displayPath).toBe('projects/my-deck')
  })

  it('accepts explicit projects/ paths', () => {
    const target = resolveProjectTarget('projects/client-demo', cwd)

    expect(target.dir).toBe(resolve('/repo/projects/client-demo'))
    expect(target.displayPath).toBe('projects/client-demo')
  })

  it('rejects paths escaping projects/', () => {
    expect(() => resolveProjectTarget('../outside', cwd)).toThrow('밖으로 나갈 수 없음')
  })

  it('rejects absolute paths', () => {
    expect(() => resolveProjectTarget(resolve('/tmp/deck'), cwd)).toThrow('projects/')
  })

  it('resolves project files under projects/', () => {
    const target = resolveProjectFileTarget('my-deck', 'slides.md', cwd)

    expect(target.file).toBe(resolve('/repo/projects/my-deck/slides.md'))
    expect(target.fileDisplayPath).toBe('projects/my-deck/slides.md')
  })

  it('detects project-name-like inputs', () => {
    expect(isProjectNameLike('my-deck')).toBe(true)
    expect(isProjectNameLike('projects/my-deck')).toBe(true)
    expect(isProjectNameLike('examples/apple-basic.deck.json')).toBe(false)
    expect(isProjectNameLike('examples/apple-basic.slides.md')).toBe(false)
  })

  it('prefers explicit files when they exist', async () => {
    const dir = await mkWorkspace()

    try {
      await writeFile(join(dir, 'custom.deck.json'), '{}', 'utf8')

      await expect(resolveExistingProjectInput('custom.deck.json', 'deck.json', dir))
        .resolves
        .toBe(resolve(dir, 'custom.deck.json'))
    }
    finally {
      await rm(dir, { recursive: true, force: true })
    }
  })

  it('falls back to project files under projects/', async () => {
    const dir = await mkWorkspace()

    try {
      await mkdir(join(dir, 'projects', 'demo'), { recursive: true })
      await writeFile(join(dir, 'projects', 'demo', 'slides.md'), 'slides', 'utf8')

      await expect(resolveExistingProjectInput('demo', 'slides.md', dir))
        .resolves
        .toBe(resolve(dir, 'projects', 'demo', 'slides.md'))
    }
    finally {
      await rm(dir, { recursive: true, force: true })
    }
  })

  it('treats projects/name as a project directory, not an input file', async () => {
    const dir = await mkWorkspace()

    try {
      await mkdir(join(dir, 'projects', 'demo'), { recursive: true })
      await writeFile(join(dir, 'projects', 'demo', 'deck.json'), '{}', 'utf8')

      await expect(resolveExistingProjectInput('projects/demo', 'deck.json', dir))
        .resolves
        .toBe(resolve(dir, 'projects', 'demo', 'deck.json'))
    }
    finally {
      await rm(dir, { recursive: true, force: true })
    }
  })

  it('lists only project directories', async () => {
    const dir = await mkWorkspace()

    try {
      await mkdir(join(dir, 'projects', 'beta'), { recursive: true })
      await mkdir(join(dir, 'projects', 'alpha'), { recursive: true })
      await writeFile(join(dir, 'projects', 'not-a-project.txt'), 'ignore', 'utf8')

      await expect(listProjects(dir)).resolves.toEqual(['alpha', 'beta'])
    }
    finally {
      await rm(dir, { recursive: true, force: true })
    }
  })

  it('returns an empty list when projects directory is missing', async () => {
    const dir = await mkWorkspace()

    try {
      await expect(listProjects(dir)).resolves.toEqual([])
    }
    finally {
      await rm(dir, { recursive: true, force: true })
    }
  })

  it('reports project info and file existence', async () => {
    const dir = await mkWorkspace()

    try {
      await mkdir(join(dir, 'projects', 'demo', 'components'), { recursive: true })
      await mkdir(join(dir, 'projects', 'demo', 'styles'), { recursive: true })
      await writeFile(join(dir, 'projects', 'demo', 'deck.json'), '{}', 'utf8')

      const info = await getProjectInfo('demo', dir)

      expect(info.exists).toBe(true)
      expect(info.displayPath).toBe('projects/demo')
      expect(info.files.deck.exists).toBe(true)
      expect(info.files.slides.exists).toBe(false)
      expect(info.files.components.exists).toBe(true)
      expect(info.files.styles.exists).toBe(true)
      expect(info.files.dist.displayPath).toBe('projects/demo/dist')
    }
    finally {
      await rm(dir, { recursive: true, force: true })
    }
  })
})

async function mkWorkspace(): Promise<string> {
  return await mkdtemp(join(tmpdir(), 'lumadeck-workspace-'))
}
