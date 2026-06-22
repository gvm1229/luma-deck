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
import { moveSlidevRuntimeCache } from './runtime-cache.js'

export interface DeckPdfExportOptions {
  readonly project: string
  readonly name?: string
  readonly out?: string
  readonly range?: string
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

  const exportArgs = [
    '--format',
    'pdf',
    '--output',
    outFile,
    '--timeout',
    '120000',
    '--wait',
    '1000',
    '--wait-until',
    'none',
  ]

  if (options.range)
    exportArgs.push('--range', options.range)

  if (options.withClicks)
    exportArgs.push('--with-clicks')

  const code = await runSlidev('export', project.slidesPath, exportArgs)

  if (code !== 0)
    throw new Error(`Slidev PDF export 실패: exit ${code}`)

  await moveSlidevRuntimeCache(project.dir, project.name)

  return {
    projectDir: project.dir,
    slidesPath: project.slidesPath,
    outFile,
  }
}

async function main(): Promise<void> {
  const args = parseFlags(process.argv.slice(2))
  const project = requireStringFlag(args, 'project', '사용법: pnpm deck:export:pdf -- --project <name> [--name <display name>] [--out <file>] [--range <range>] [--with-clicks]')
  const name = getStringFlag(args, 'name')
  const out = getStringFlag(args, 'out')
  const range = getStringFlag(args, 'range')
  const withClicks = args.flags.get('with-clicks') === true
  const result = await exportDeckPdf({ project, name, out, range, withClicks })

  console.log(`Deck PDF export complete: ${result.outFile}`)
}

if (isMainModule(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
