import { mkdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { runSlidev } from '../slidev/run.js'
import { getPdfArtifactDir } from './artifacts.js'
import {
  getStringFlag,
  isMainModule,
  parseFlags,
  requireStringFlag,
  resolveDeckProject,
  slugify,
  stripUtf8Bom,
} from './cli-utils.js'
import { moveSlidevRuntimeCache, restoreSlidevRuntimeCache } from './runtime-cache.js'

export interface DeckPdfExportOptions {
  readonly project: string
  readonly name?: string
  readonly out?: string
  readonly range?: string
  readonly wait?: string
  readonly waitUntil?: string
  readonly withClicks?: boolean
}

export interface DeckPdfExportResult {
  readonly projectDir: string
  readonly slidesPath: string
  readonly outFile: string
}

export async function exportDeckPdf(options: DeckPdfExportOptions): Promise<DeckPdfExportResult> {
  const project = await resolveDeckProject(options.project)
  const outDir = getPdfArtifactDir(project.name)
  const outFile = options.out ?? join(outDir, `${slugify(options.name ?? project.name)}.pdf`)

  await stripUtf8Bom(project.slidesPath)

  if (!options.out)
    await rm(outDir, { recursive: true, force: true })

  await mkdir(outDir, { recursive: true })
  await restoreSlidevRuntimeCache(project.dir, project.name)

  const exportArgs = [
    '--format',
    'pdf',
    '--output',
    outFile,
    '--timeout',
    '120000',
    '--wait',
    options.wait ?? '3000',
    '--wait-until',
    options.waitUntil ?? 'load',
  ]

  if (options.range)
    exportArgs.push('--range', options.range)

  if (options.withClicks)
    exportArgs.push('--with-clicks')

  let code = 1
  try {
    code = await runSlidev('export', project.slidesPath, exportArgs)
  }
  finally {
    await moveSlidevRuntimeCache(project.dir, project.name)
  }

  if (code !== 0)
    throw new Error(`Slidev PDF export 실패: exit ${code}`)

  return {
    projectDir: project.dir,
    slidesPath: project.slidesPath,
    outFile,
  }
}

async function main(): Promise<void> {
  const args = parseFlags(process.argv.slice(2))
  const project = requireStringFlag(args, 'project', '사용법: pnpm deck:export:pdf -- --project <name> [--name <display name>] [--out <file>] [--range <range>] [--wait <ms>] [--wait-until <state>] [--with-clicks]')
  const name = getStringFlag(args, 'name')
  const out = getStringFlag(args, 'out')
  const range = getStringFlag(args, 'range')
  const wait = getStringFlag(args, 'wait')
  const waitUntil = getStringFlag(args, 'wait-until')
  const withClicks = args.flags.get('with-clicks') === true
  const result = await exportDeckPdf({ project, name, out, range, wait, waitUntil, withClicks })

  console.log(`Deck PDF export complete: ${result.outFile}`)
}

if (isMainModule(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
