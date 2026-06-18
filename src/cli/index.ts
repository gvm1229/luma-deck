#!/usr/bin/env node
import { access, mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { renderDeckToSlidevMarkdown } from '../generator/markdown.js'
import { readDeckFile } from '../schema/io.js'
import { runSlidev } from '../slidev/run.js'
import { initWorkspace } from '../workspace/init.js'

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
    return fail('사용법: lumadeck init <dir> [--force]')

  await initWorkspace(resolve(target), { force: args.flags.has('force') })
  console.log(`LumaDeck 작업 폴더 생성: ${target}`)
  return 0
}

async function handleValidate(args: ParsedArgs): Promise<number> {
  const input = args.positionals[0]

  if (!input)
    return fail('사용법: lumadeck validate <deck.json>')

  await readDeckFile(input)
  console.log(`deck 검증 완료: ${input}`)
  return 0
}

async function handleRender(args: ParsedArgs): Promise<number> {
  const input = args.positionals[0]
  const output = getStringFlag(args, 'output') ?? getStringFlag(args, 'o')

  if (!input || !output)
    return fail('사용법: lumadeck render <deck.json> -o <slides.md> [--force]')

  if (!args.flags.has('force') && await exists(output))
    return fail(`출력 파일이 이미 존재함: ${output}\n덮어쓰려면 --force 사용`)

  const deck = await readDeckFile(input)
  const markdown = renderDeckToSlidevMarkdown(deck, { sourcePath: input })

  await mkdir(dirname(resolve(output)), { recursive: true })
  await writeFile(output, markdown, 'utf8')
  console.log(`Slidev Markdown 생성: ${output}`)
  return 0
}

async function handleSlidev(command: 'dev' | 'build', args: ParsedArgs): Promise<number> {
  const entry = args.positionals[0]

  if (!entry)
    return fail(`사용법: lumadeck ${command} <slides.md>`)

  return await runSlidev(command, entry, args.positionals.slice(1))
}

function parseArgs(argv: string[]): ParsedArgs {
  const [command, ...rest] = argv
  const positionals: string[] = []
  const flags = new Map<string, string | boolean>()

  for (let index = 0; index < rest.length; index += 1) {
    const value = rest[index]

    if (value === undefined)
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
  lumadeck init <dir> [--force]
  lumadeck validate <deck.json>
  lumadeck render <deck.json> -o <slides.md> [--force]
  lumadeck generate <deck.json> -o <slides.md> [--force]
  lumadeck dev <slides.md>
  lumadeck build <slides.md>
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
