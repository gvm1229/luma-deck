import { rm } from 'node:fs/promises'
import { runSlidev } from '../slidev/run.js'
import { getHtmlArtifactDir } from './artifacts.js'
import {
  getStringFlag,
  isMainModule,
  parseFlags,
  requireStringFlag,
  resolveDeckProject,
  stripUtf8Bom,
} from './cli-utils.js'
import { moveSlidevRuntimeCache } from './runtime-cache.js'

export interface DeckBuildOptions {
  readonly project: string
  readonly out?: string
}

export interface DeckBuildResult {
  readonly projectDir: string
  readonly slidesPath: string
  readonly outDir: string
}

export async function buildDeck(options: DeckBuildOptions): Promise<DeckBuildResult> {
  const project = await resolveDeckProject(options.project)
  const outDir = options.out ?? getHtmlArtifactDir(project.name)

  await stripUtf8Bom(project.slidesPath)
  await rm(outDir, { recursive: true, force: true })

  const code = await runSlidev('build', project.slidesPath, [
    '--base',
    './',
    '--out',
    outDir,
  ])

  if (code !== 0)
    throw new Error(`Slidev build 실패: exit ${code}`)

  await moveSlidevRuntimeCache(project.dir, project.name)

  return {
    projectDir: project.dir,
    slidesPath: project.slidesPath,
    outDir,
  }
}

async function main(): Promise<void> {
  const args = parseFlags(process.argv.slice(2))
  const project = requireStringFlag(args, 'project', '사용법: pnpm deck:build -- --project <name> [--out <dir>]')
  const out = getStringFlag(args, 'out')
  const result = await buildDeck({ project, out })

  console.log(`Deck HTML build complete: ${result.outDir}`)
}

if (isMainModule(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
