import { join } from 'node:path'
import { getHtmlArtifactDir, getWindowsDesktopArtifactDir } from './artifacts.js'
import { buildDeck } from './build.js'
import {
  getStringFlag,
  isMainModule,
  parseFlags,
  requireStringFlag,
  resolveDeckProject,
} from './cli-utils.js'
import {
  copyElectronPackageResult,
  getBaseBuilderConfig,
  runElectronBuilder,
  stageElectronDeck,
  writeElectronBuilderConfig,
} from './electron-package.js'

export interface PackageWinOptions {
  readonly project: string
  readonly name: string
  readonly skipBuild: boolean
}

export async function packageDeckForWindows(options: PackageWinOptions): Promise<string> {
  const project = await resolveDeckProject(options.project)
  const productName = options.name.trim() || project.name
  const htmlDir = getHtmlArtifactDir(project.name)
  const artifactDir = getWindowsDesktopArtifactDir(project.name)

  if (!options.skipBuild)
    await buildDeck({ project: project.name })

  const stage = await stageElectronDeck({
    projectName: project.name,
    productName,
    htmlDir,
    artifactDir,
    outputName: 'desktop-win',
  })

  await writeElectronBuilderConfig(stage, {
    ...getBaseBuilderConfig(productName, stage.appDir, stage.outDir),
    win: {
      target: [
        {
          target: 'portable',
          arch: ['x64'],
        },
      ],
      artifactName: `${productName}.\${ext}`,
    },
    portable: {
      artifactName: `${productName}.\${ext}`,
    },
  })

  await runElectronBuilder(stage.packageRoot, ['--win', 'portable', '--x64'])
  await copyElectronPackageResult(stage)

  return join(stage.artifactDir, 'out', `${productName}.exe`)
}

async function main(): Promise<void> {
  const args = parseFlags(process.argv.slice(2))
  const project = requireStringFlag(args, 'project', '사용법: pnpm deck:package:win -- --project <name> --name <display name> [--skip-build]')
  const name = getStringFlag(args, 'name') ?? project
  const result = await packageDeckForWindows({ project, name, skipBuild: args.flags.has('skip-build') })

  console.log(`Windows presentation package complete: ${result}`)
}

if (isMainModule(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
