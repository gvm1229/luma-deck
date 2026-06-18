import { stat } from 'node:fs/promises'
import { isAbsolute, relative, resolve } from 'node:path'

export const projectsRootName = 'projects'

export interface ProjectTarget {
  readonly root: string
  readonly dir: string
  readonly displayPath: string
}

export interface ProjectFileTarget extends ProjectTarget {
  readonly file: string
  readonly fileDisplayPath: string
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

export function resolveProjectFileTarget(rawTarget: string, filename: string, cwd = process.cwd()): ProjectFileTarget {
  const project = resolveProjectTarget(rawTarget, cwd)
  const file = resolve(project.dir, filename)

  return {
    ...project,
    file,
    fileDisplayPath: `${project.displayPath}/${filename}`,
  }
}

export async function resolveExistingProjectInput(rawInput: string, filename: string, cwd = process.cwd()): Promise<string> {
  const explicitPath = resolve(cwd, rawInput)

  if (await isFile(explicitPath))
    return explicitPath

  const projectFile = resolveProjectFileTarget(rawInput, filename, cwd)

  if (await isFile(projectFile.file))
    return projectFile.file

  throw new Error(`입력 파일을 찾을 수 없음: ${rawInput}\n직접 경로 또는 ${projectFile.fileDisplayPath} 확인 필요`)
}

export function isProjectNameLike(rawInput: string): boolean {
  if (isAbsolute(rawInput))
    return false

  const normalized = normalizeSlashes(rawInput)
  return !normalized.endsWith('.json') && !normalized.endsWith('.md')
}

function isInside(parent: string, child: string): boolean {
  const path = relative(parent, child)
  return path === '' || (!path.startsWith('..') && !isAbsolute(path))
}

function normalizeSlashes(value: string): string {
  return value.replace(/\\/g, '/').replace(/^\.?\//, '')
}

async function isFile(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isFile()
  }
  catch {
    return false
  }
}
