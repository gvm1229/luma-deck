import { join } from 'node:path'
import { getHtmlArtifactDir, getMacDesktopArtifactDir } from './artifacts.js'
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

export interface PackageMacOptions {
  readonly project: string
  readonly name: string
  readonly skipBuild: boolean
}

export async function packageDeckForMac(options: PackageMacOptions): Promise<string> {
  if (process.platform !== 'darwin')
    throw new Error('macOS package는 macOS 환경에서만 생성/검증할 수 있음. Windows에서는 .dmg signing/notarization을 수행할 수 없음.')

  const project = await resolveDeckProject(options.project)
  const productName = options.name.trim() || project.name
  const htmlDir = getHtmlArtifactDir(project.name)
  const artifactDir = getMacDesktopArtifactDir(project.name)

  if (!options.skipBuild)
    await buildDeck({ project: project.name })

  const stage = await stageElectronDeck({
    projectName: project.name,
    productName,
    htmlDir,
    artifactDir,
    outputName: 'desktop-mac',
  })

  await writeElectronBuilderConfig(stage, {
    ...getBaseBuilderConfig(productName, stage.appDir, stage.outDir),
    mac: {
      target: [
        {
          target: 'dmg',
          arch: ['universal'],
        },
        {
          target: 'zip',
          arch: ['universal'],
        },
      ],
      category: 'public.app-category.productivity',
      artifactName: `${productName}.\${ext}`,
    },
  })

  await runElectronBuilder(stage.packageRoot, ['--mac', 'dmg', 'zip', '--universal'])
  await copyElectronPackageResult(stage)

  return join(stage.artifactDir, 'out', `${productName}.dmg`)
}

async function main(): Promise<void> {
  const args = parseFlags(process.argv.slice(2))
  const project = requireStringFlag(args, 'project', '사용법: pnpm deck:package:mac -- --project <name> --name <display name> [--skip-build]')
  const name = getStringFlag(args, 'name') ?? project
  const result = await packageDeckForMac({ project, name, skipBuild: args.flags.has('skip-build') })

  console.log(`macOS presentation package complete: ${result}`)
}

if (isMainModule(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
