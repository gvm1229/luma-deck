import { readdir, stat } from 'node:fs/promises'
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

export interface ProjectInfo extends ProjectTarget {
  readonly exists: boolean
  readonly files: {
    readonly deck: ProjectInfoPath
    readonly slides: ProjectInfoPath
    readonly components: ProjectInfoPath
    readonly styles: ProjectInfoPath
    readonly dist: ProjectInfoPath
  }
}

export interface ProjectInfoPath {
  readonly path: string
  readonly displayPath: string
  readonly exists: boolean
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

export async function listProjects(cwd = process.cwd()): Promise<string[]> {
  const root = resolve(cwd, projectsRootName)

  try {
    const entries = await readdir(root, { withFileTypes: true })
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort((left, right) => left.localeCompare(right))
  }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT')
      return []

    throw error
  }
}

export async function getProjectInfo(rawTarget: string, cwd = process.cwd()): Promise<ProjectInfo> {
  const project = resolveProjectTarget(rawTarget, cwd)

  return {
    ...project,
    exists: await isDirectory(project.dir),
    files: {
      deck: await getProjectInfoPath(project, 'deck.json'),
      slides: await getProjectInfoPath(project, 'slides.md'),
      components: await getProjectInfoPath(project, 'components'),
      styles: await getProjectInfoPath(project, 'styles'),
      dist: await getProjectInfoPath(project, 'dist'),
    },
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

async function getProjectInfoPath(project: ProjectTarget, name: string): Promise<ProjectInfoPath> {
  const path = resolve(project.dir, name)

  return {
    path,
    displayPath: `${project.displayPath}/${name}`,
    exists: await exists(path),
  }
}

async function isFile(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isFile()
  }
  catch {
    return false
  }
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isDirectory()
  }
  catch {
    return false
  }
}

async function exists(path: string): Promise<boolean> {
  try {
    await stat(path)
    return true
  }
  catch {
    return false
  }
}
