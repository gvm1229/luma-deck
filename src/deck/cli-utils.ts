import { access, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { getProjectInfo } from '../workspace/projects.js'

export interface ParsedArgs {
  readonly flags: Map<string, string | boolean>
}

export interface DeckProject {
  readonly name: string
  readonly dir: string
  readonly slidesPath: string
}

export function parseFlags(argv: string[]): ParsedArgs {
  const flags = new Map<string, string | boolean>()

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index]

    if (!value || value === '--')
      continue

    if (!value.startsWith('--'))
      throw new Error(`지원하지 않는 인자: ${value}`)

    const [name, inlineValue] = value.slice(2).split('=', 2)

    if (inlineValue !== undefined) {
      flags.set(name, inlineValue)
      continue
    }

    const next = argv[index + 1]
    if (next && !next.startsWith('--')) {
      flags.set(name, next)
      index += 1
    }
    else {
      flags.set(name, true)
    }
  }

  return { flags }
}

export function getStringFlag(args: ParsedArgs, name: string): string | undefined {
  const value = args.flags.get(name)
  return typeof value === 'string' ? value : undefined
}

export function requireStringFlag(args: ParsedArgs, name: string, usage: string): string {
  const value = getStringFlag(args, name)

  if (!value)
    throw new Error(usage)

  return value
}

export async function resolveDeckProject(projectName: string): Promise<DeckProject> {
  const project = await getProjectInfo(projectName)

  if (!project.exists)
    throw new Error(`프로젝트를 찾을 수 없음: ${project.displayPath}`)

  if (!project.files.slides.exists)
    throw new Error(`slides.md를 찾을 수 없음: ${project.files.slides.displayPath}`)

  return {
    name: project.displayPath.replace(/^projects\//, ''),
    dir: project.dir,
    slidesPath: project.files.slides.path,
  }
}

export async function stripUtf8Bom(path: string): Promise<void> {
  const content = await readFile(path)

  if (content[0] !== 0xEF || content[1] !== 0xBB || content[2] !== 0xBF)
    return

  await writeFile(path, content.subarray(3))
}

export async function exists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  }
  catch {
    return false
  }
}

export function toAbsolutePath(path: string): string {
  return resolve(process.cwd(), path)
}

export function isMainModule(metaUrl: string): boolean {
  return process.argv[1] ? pathToFileURL(process.argv[1]).href === metaUrl : false
}

export function slugify(value: string): string {
  return value
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}
