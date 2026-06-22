import { mkdir, rename, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { getRuntimeCacheArtifactDir } from './artifacts.js'
import { exists } from './cli-utils.js'

export async function restoreSlidevRuntimeCache(projectDir: string, projectName: string): Promise<void> {
  const source = join(getRuntimeCacheArtifactDir(projectName), 'node_modules')
  const target = join(projectDir, 'node_modules')

  if (await exists(target) || !await exists(source))
    return

  await rename(source, target)
}

export async function moveSlidevRuntimeCache(projectDir: string, projectName: string): Promise<void> {
  const source = join(projectDir, 'node_modules')

  if (!await exists(source))
    return

  const cacheRoot = getRuntimeCacheArtifactDir(projectName)
  const target = join(cacheRoot, 'node_modules')

  await rm(cacheRoot, { recursive: true, force: true })
  await mkdir(cacheRoot, { recursive: true })
  await rename(source, target)
}
