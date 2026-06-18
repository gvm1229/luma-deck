import { copyFile, mkdir, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, resolve } from 'node:path'

export interface WriteRenderOutputOptions {
  readonly force?: boolean
  readonly now?: Date
}

export interface WriteRenderOutputResult {
  readonly outputPath: string
  readonly backupPath?: string
}

export async function writeRenderOutput(outputPath: string, content: string, options: WriteRenderOutputOptions = {}): Promise<WriteRenderOutputResult> {
  const absoluteOutputPath = resolve(outputPath)
  const backupPath = options.force && await fileExists(absoluteOutputPath)
    ? getBackupPath(absoluteOutputPath, options.now ?? new Date())
    : undefined

  await mkdir(dirname(absoluteOutputPath), { recursive: true })

  if (backupPath)
    await copyFile(absoluteOutputPath, backupPath)

  await writeFile(absoluteOutputPath, content, 'utf8')

  return {
    outputPath: absoluteOutputPath,
    backupPath,
  }
}

export function getBackupPath(outputPath: string, date: Date): string {
  const extension = extname(outputPath)
  const basePath = extension
    ? outputPath.slice(0, -extension.length)
    : outputPath

  return `${basePath}.backup.${formatBackupTimestamp(date)}${extension}`
}

function formatBackupTimestamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

async function fileExists(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isFile()
  }
  catch {
    return false
  }
}
