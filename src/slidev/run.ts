import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export type SlidevCommand = 'dev' | 'build' | 'export'

export async function runSlidev(command: SlidevCommand, entry: string, extraArgs: string[] = []): Promise<number> {
  const slidevBin = require.resolve('@slidev/cli/bin/slidev.mjs')
  const slidevArgs = getSlidevArgs(command, entry, extraArgs)

  const child = spawn(process.execPath, [slidevBin, ...slidevArgs], {
    stdio: 'inherit',
    shell: false,
  })

  return await new Promise((resolve, reject) => {
    child.on('error', reject)
    child.on('close', code => resolve(code ?? 1))
  })
}

export function getSlidevArgs(command: SlidevCommand, entry: string, extraArgs: string[] = []): string[] {
  const slidevExtraArgs = extraArgs.filter(arg => arg !== '--')

  return command === 'dev'
    ? [entry, ...slidevExtraArgs]
    : [command, entry, ...slidevExtraArgs]
}
