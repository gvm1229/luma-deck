import { isAbsolute, relative, resolve } from 'node:path'

export const projectsRootName = 'projects'

export interface ProjectTarget {
  readonly root: string
  readonly dir: string
  readonly displayPath: string
}

export function resolveProjectTarget(rawTarget: string, cwd = process.cwd()): ProjectTarget {
  if (isAbsolute(rawTarget))
    throw new Error(`프로젝트는 source repo 내부의 ${projectsRootName}/ 아래에 생성해야 함`)

  const root = resolve(cwd, projectsRootName)
  const normalizedTarget = normalizeSlashes(rawTarget)
  const withoutRootPrefix = normalizedTarget === projectsRootName
    ? ''
    : normalizedTarget.startsWith(`${projectsRootName}/`)
      ? normalizedTarget.slice(projectsRootName.length + 1)
      : normalizedTarget

  if (!withoutRootPrefix || withoutRootPrefix === '.')
    throw new Error('프로젝트 이름 또는 경로가 필요함')

  const dir = resolve(root, withoutRootPrefix)

  if (!isInside(root, dir))
    throw new Error(`프로젝트는 ${projectsRootName}/ 밖으로 나갈 수 없음: ${rawTarget}`)

  return {
    root,
    dir,
    displayPath: `${projectsRootName}/${normalizeSlashes(relative(root, dir))}`,
  }
}

function isInside(parent: string, child: string): boolean {
  const path = relative(parent, child)
  return path === '' || (!path.startsWith('..') && !isAbsolute(path))
}

function normalizeSlashes(value: string): string {
  return value.replace(/\\/g, '/').replace(/^\.?\//, '')
}
