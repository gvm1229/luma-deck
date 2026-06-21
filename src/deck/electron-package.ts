import { spawn } from 'node:child_process'
import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { slugify } from './cli-utils.js'

const require = createRequire(import.meta.url)

export interface ElectronStageOptions {
  readonly projectName: string
  readonly productName: string
  readonly htmlDir: string
  readonly artifactDir: string
  readonly outputName: string
}

export interface ElectronStageResult {
  readonly packageRoot: string
  readonly appDir: string
  readonly outDir: string
  readonly artifactDir: string
}

export async function stageElectronDeck(options: ElectronStageOptions): Promise<ElectronStageResult> {
  const packageRoot = join(tmpdir(), 'lumadeck-packages', slugify(options.projectName) || 'deck', options.outputName)
  const appDir = join(packageRoot, 'app')
  const deckDir = join(appDir, 'deck')
  const outDir = join(packageRoot, 'out')

  await rm(packageRoot, { recursive: true, force: true })
  await rm(options.artifactDir, { recursive: true, force: true })
  await mkdir(deckDir, { recursive: true })
  await cp(options.htmlDir, deckDir, { recursive: true })
  await writeFile(join(appDir, 'package.json'), JSON.stringify(getElectronPackage(options.productName), null, 2))
  await writeFile(join(appDir, 'main.cjs'), getElectronMainSource(options.productName))

  return {
    packageRoot,
    appDir,
    outDir,
    artifactDir: options.artifactDir,
  }
}

export async function writeElectronBuilderConfig(stage: ElectronStageResult, config: Record<string, unknown>): Promise<void> {
  await writeFile(join(stage.packageRoot, 'electron-builder.json'), JSON.stringify(config, null, 2))
}

export async function copyElectronPackageResult(stage: ElectronStageResult): Promise<void> {
  await mkdir(stage.artifactDir, { recursive: true })
  await cp(stage.appDir, join(stage.artifactDir, 'app'), { recursive: true })
  await cp(join(stage.packageRoot, 'electron-builder.json'), join(stage.artifactDir, 'electron-builder.json'))
  await cp(stage.outDir, join(stage.artifactDir, 'out'), { recursive: true })
}

export async function runElectronBuilder(packageRoot: string, args: readonly string[]): Promise<void> {
  const builderBin = require.resolve('electron-builder/cli.js')
  const child = spawn(process.execPath, [
    builderBin,
    '--config',
    join(packageRoot, 'electron-builder.json'),
    ...args,
  ], {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: false,
  })

  const code = await new Promise<number>((resolveCode, reject) => {
    child.on('error', reject)
    child.on('close', code => resolveCode(code ?? 1))
  })

  if (code !== 0)
    throw new Error(`electron-builder 실패: exit ${code}`)
}

export function getBaseBuilderConfig(productName: string, appDir: string, outDir: string): Record<string, unknown> {
  return {
    appId: `com.lumadeck.${slugify(productName) || 'presentation'}`,
    productName,
    asar: true,
    directories: {
      app: appDir,
      output: outDir,
    },
    files: ['**/*'],
  }
}

function getElectronPackage(productName: string): Record<string, unknown> {
  return {
    name: slugify(productName) || 'lumadeck-presentation',
    version: '0.1.0',
    private: true,
    main: 'main.cjs',
    productName,
    description: 'LumaDeck packaged presentation',
  }
}

function getElectronMainSource(productName: string): string {
  return String.raw`const { app, BrowserWindow, protocol, shell } = require('electron')
const fs = require('node:fs/promises')
const path = require('node:path')

const deckRoot = path.join(__dirname, 'deck')

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'lumadeck',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
])

app.setName(${JSON.stringify(productName)})

async function createWindow() {
  protocol.handle('lumadeck', async (request) => {
    const url = new URL(request.url)
    const relativePath = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)
    const target = path.normalize(path.join(deckRoot, relativePath.replace(/^\/+/, '')))

    if (!target.startsWith(deckRoot))
      return new Response('Not found', { status: 404 })

    try {
      const body = await fs.readFile(target)
      return new Response(body, {
        headers: {
          'content-type': getMimeType(path.extname(target)),
          'cache-control': 'no-store',
        },
      })
    }
    catch {
      if (path.extname(target))
        return new Response('Not found', { status: 404 })

      const body = await fs.readFile(path.join(deckRoot, 'index.html'))
      return new Response(body, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store',
        },
      })
    }
  })

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 960,
    minHeight: 540,
    backgroundColor: '#f3f4f6',
    title: ${JSON.stringify(productName)},
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  await win.loadURL('lumadeck://deck/index.html')
}

function getMimeType(extension) {
  switch (extension.toLowerCase()) {
    case '.html':
      return 'text/html; charset=utf-8'
    case '.js':
      return 'text/javascript; charset=utf-8'
    case '.css':
      return 'text/css; charset=utf-8'
    case '.json':
      return 'application/json; charset=utf-8'
    case '.svg':
      return 'image/svg+xml'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.gif':
      return 'image/gif'
    case '.webp':
      return 'image/webp'
    case '.woff':
      return 'font/woff'
    case '.woff2':
      return 'font/woff2'
    case '.ttf':
      return 'font/ttf'
    case '.mp4':
      return 'video/mp4'
    case '.webm':
      return 'video/webm'
    default:
      return 'application/octet-stream'
  }
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit())
`
}
