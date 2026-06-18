#!/usr/bin/env node
import { access } from 'node:fs/promises'
import { writeRenderOutput } from '../generator/render-file.js'
import { renderDeckToSlidevMarkdown } from '../generator/markdown.js'
import { readDeckFile } from '../schema/io.js'
import { runSlidev } from '../slidev/run.js'
import { initWorkspace } from '../workspace/init.js'
import {
  getProjectInfo,
  isProjectNameLike,
  listProjects,
  resolveExistingProjectInput,
  resolveProjectFileTarget,
  resolveProjectTarget,
} from '../workspace/projects.js'

interface ParsedArgs {
  readonly command?: string
  readonly positionals: string[]
  readonly flags: Map<string, string | boolean>
}

async function main(argv: string[]): Promise<number> {
  const args = parseArgs(argv)

  switch (args.command) {
    case 'init':
      return await handleInit(args)
    case 'list':
      return await handleList()
    case 'info':
      return await handleInfo(args)
    case 'validate':
      return await handleValidate(args)
    case 'render':
    case 'generate':
      return await handleRender(args)
    case 'dev':
    case 'build':
      return await handleSlidev(args.command, args)
    case 'help':
    case undefined:
      printHelp()
      return args.command ? 0 : 1
    default:
      console.error(`알 수 없는 명령: ${args.command}`)
      printHelp()
      return 1
  }
}

async function handleInit(args: ParsedArgs): Promise<number> {
  const target = args.positionals[0]

  if (!target)
    return fail('사용법: lumadeck init <name> [--force]')

  const project = resolveProjectTarget(target)

  await initWorkspace(project.dir, { force: args.flags.has('force'), projectName: project.displayPath.replace(/^projects\//, '') })
  console.log(`LumaDeck 작업 폴더 생성: ${project.displayPath}`)
  return 0
}

async function handleList(): Promise<number> {
  const projects = await listProjects()

  if (projects.length === 0) {
    console.log('LumaDeck 프로젝트가 없음')
    return 0
  }

  for (const project of projects)
    console.log(project)

  return 0
}

async function handleInfo(args: ParsedArgs): Promise<number> {
  const target = args.positionals[0]

  if (!target)
    return fail('사용법: lumadeck info <project>')

  const info = await getProjectInfo(target)

  console.log(`Project: ${info.displayPath}`)
  console.log(`Exists: ${formatBoolean(info.exists)}`)
  console.log(`deck.json: ${formatInfoPath(info.files.deck)}`)
  console.log(`slides.md: ${formatInfoPath(info.files.slides)}`)
  console.log(`components/: ${formatInfoPath(info.files.components)}`)
  console.log(`styles/: ${formatInfoPath(info.files.styles)}`)
  console.log(`dist/: ${formatInfoPath(info.files.dist)}`)

  return info.exists ? 0 : 1
}

async function handleValidate(args: ParsedArgs): Promise<number> {
  const input = args.positionals[0]

  if (!input)
    return fail('사용법: lumadeck validate <project|deck.json>')

  const deckPath = await resolveExistingProjectInput(input, 'deck.json')

  await readDeckFile(deckPath)
  console.log(`deck 검증 완료: ${deckPath}`)
  return 0
}

async function handleRender(args: ParsedArgs): Promise<number> {
  const input = args.positionals[0]
  const output = getStringFlag(args, 'output') ?? getStringFlag(args, 'o') ?? getDefaultRenderOutput(input)

  if (!input || !output)
    return fail('사용법: lumadeck render <project|deck.json> [-o <slides.md>] [--force]')

  if (!args.flags.has('force') && await exists(output))
    return fail(`출력 파일이 이미 존재함: ${output}\n덮어쓰려면 --force 사용`)

  const deckPath = await resolveExistingProjectInput(input, 'deck.json')
  const deck = await readDeckFile(deckPath)
  const markdown = renderDeckToSlidevMarkdown(deck, { sourcePath: deckPath })
  const result = await writeRenderOutput(output, markdown, { force: args.flags.has('force') })

  if (result.backupPath)
    console.log(`기존 slides 백업 생성: ${result.backupPath}`)

  console.log(`Slidev Markdown 생성: ${result.outputPath}`)
  return 0
}

async function handleSlidev(command: 'dev' | 'build', args: ParsedArgs): Promise<number> {
  const entry = args.positionals[0]

  if (!entry)
    return fail(`사용법: lumadeck ${command} <project|slides.md>`)

  const entryPath = await resolveExistingProjectInput(entry, 'slides.md')

  return await runSlidev(command, entryPath, [
    ...args.positionals.slice(1),
    ...formatFlags(args.flags),
  ])
}

function parseArgs(argv: string[]): ParsedArgs {
  const [command, ...rest] = argv
  const positionals: string[] = []
  const flags = new Map<string, string | boolean>()

  for (let index = 0; index < rest.length; index += 1) {
    const value = rest[index]

    if (value === undefined)
      continue

    if (value === '--')
      continue

    if (value.startsWith('--')) {
      const [name, inlineValue] = value.slice(2).split('=', 2)

      if (inlineValue !== undefined) {
        flags.set(name, inlineValue)
        continue
      }

      const next = rest[index + 1]
      if (next && !next.startsWith('-')) {
        flags.set(name, next)
        index += 1
      }
      else {
        flags.set(name, true)
      }
      continue
    }

    if (value.startsWith('-') && value.length > 1) {
      const name = value.slice(1)
      const next = rest[index + 1]

      if (next && !next.startsWith('-')) {
        flags.set(name, next)
        index += 1
      }
      else {
        flags.set(name, true)
      }
      continue
    }

    positionals.push(value)
  }

  return { command, positionals, flags }
}

function getStringFlag(args: ParsedArgs, name: string): string | undefined {
  const value = args.flags.get(name)
  return typeof value === 'string' ? value : undefined
}

function getDefaultRenderOutput(input?: string): string | undefined {
  if (!input || !isProjectNameLike(input))
    return undefined

  return resolveProjectFileTarget(input, 'slides.md').file
}

function formatInfoPath(path: { readonly displayPath: string, readonly exists: boolean }): string {
  return `${path.displayPath} (${formatBoolean(path.exists)})`
}

function formatBoolean(value: boolean): string {
  return value ? 'yes' : 'no'
}

function formatFlags(flags: Map<string, string | boolean>): string[] {
  const formatted: string[] = []

  for (const [name, value] of flags) {
    const prefix = name.length === 1 ? '-' : '--'
    formatted.push(`${prefix}${name}`)

    if (typeof value === 'string')
      formatted.push(value)
  }

  return formatted
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  }
  catch {
    return false
  }
}

function fail(message: string): number {
  console.error(message)
  return 1
}

function printHelp(): void {
  console.log(`LumaDeck

사용법:
  lumadeck init <name> [--force]
  lumadeck list
  lumadeck info <project>
  lumadeck validate <project|deck.json>
  lumadeck render <project|deck.json> [-o <slides.md>] [--force]
  lumadeck generate <project|deck.json> [-o <slides.md>] [--force]
  lumadeck dev <project|slides.md>
  lumadeck build <project|slides.md>

프로젝트는 항상 gitignored projects/ 아래에 생성됨.
예: lumadeck init my-deck -> projects/my-deck
예: lumadeck dev my-deck -> projects/my-deck/slides.md
`)
}

main(process.argv.slice(2))
  .then((code) => {
    process.exitCode = code
  })
  .catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
