import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { resolveProjectTarget } from '../src/workspace/projects.js'

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
})
