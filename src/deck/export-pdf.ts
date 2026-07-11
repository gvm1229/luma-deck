import { createServer, type Server } from 'node:http'
import { readFile, mkdir, rm } from 'node:fs/promises'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { chromium, type Page } from 'playwright-chromium'
import { runSlidev } from '../slidev/run.js'
import { getPdfArtifactDir } from './artifacts.js'
import { buildDeck } from './build.js'
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
  readonly native?: boolean
}

export interface DeckPdfExportResult {
  readonly projectDir: string
  readonly slidesPath: string
  readonly outFile: string
}

const slideWidth = 1280
const slideHeight = 720

export async function exportDeckPdf(options: DeckPdfExportOptions): Promise<DeckPdfExportResult> {
  return options.native || options.withClicks
    ? await exportDeckPdfWithSlidev(options)
    : await exportDeckPdfWithScreenshots(options)
}

async function exportDeckPdfWithScreenshots(options: DeckPdfExportOptions): Promise<DeckPdfExportResult> {
  const project = await resolveDeckProject(options.project)
  const outDir = getPdfArtifactDir(project.name)
  const outFile = options.out ?? join(outDir, `${slugify(options.name ?? project.name)}.pdf`)
  const waitMs = parseWaitMs(options.wait)
  const slideNumbers = await getSlideNumbers(project.slidesPath, options.range)

  if (!options.out)
    await rm(outDir, { recursive: true, force: true })

  await mkdir(outDir, { recursive: true })
  await mkdir(dirname(outFile), { recursive: true })

  const buildResult = await buildDeck({ project: options.project })
  const server = await createStaticServer(buildResult.outDir)
  const address = server.address()

  if (!address || typeof address === 'string')
    throw new Error('PDF export 서버 주소를 확인할 수 없음')

  const baseUrl = `http://127.0.0.1:${address.port}`
  const browser = await chromium.launch({ headless: true })

  try {
    const capturePage = await browser.newPage({
      viewport: { width: slideWidth, height: slideHeight },
      deviceScaleFactor: 1,
    })
    const images: string[] = []

    for (const slide of slideNumbers) {
      await capturePage.goto(`${baseUrl}/${slide}?lumadeckPoster=1`, {
        waitUntil: options.waitUntil === 'networkidle' ? 'networkidle' : 'load',
        timeout: 120000,
      })
      await waitForSlideAssets(capturePage, waitMs)
      const screenshot = await capturePage.screenshot({
        type: 'jpeg',
        quality: 94,
        fullPage: false,
      })
      images.push(screenshot.toString('base64'))
    }

    const pdfPage = await browser.newPage({
      viewport: { width: slideWidth, height: slideHeight },
      deviceScaleFactor: 1,
    })
    await pdfPage.setContent(renderScreenshotPdfHtml(images), { waitUntil: 'load' })
    await pdfPage.pdf({
      path: outFile,
      width: `${slideWidth}px`,
      height: `${slideHeight}px`,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true,
    })
  }
  finally {
    await browser.close()
    await closeServer(server)
  }

  return {
    projectDir: project.dir,
    slidesPath: project.slidesPath,
    outFile,
  }
}

async function exportDeckPdfWithSlidev(options: DeckPdfExportOptions): Promise<DeckPdfExportResult> {
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

async function getSlideNumbers(slidesPath: string, range?: string): Promise<number[]> {
  const content = await readFile(slidesPath, 'utf8')
  const total = content
    .split(/\r?\n/)
    .filter(line => line.startsWith('# '))
    .length
  const allSlides = Array.from({ length: total }, (_, index) => index + 1)

  if (!range)
    return allSlides

  const selected = new Set<number>()
  for (const part of range.split(',')) {
    const [startRaw, endRaw] = part.split('-', 2)
    const start = Number.parseInt(startRaw ?? '', 10)
    const end = Number.parseInt(endRaw ?? startRaw ?? '', 10)

    if (!Number.isFinite(start) || !Number.isFinite(end))
      throw new Error(`지원하지 않는 PDF range: ${range}`)

    const boundedStart = Math.max(start, 1)
    const boundedEnd = Math.min(end, total)
    for (let slide = boundedStart; slide <= boundedEnd; slide += 1)
      selected.add(slide)
  }

  return [...selected].sort((a, b) => a - b)
}

async function waitForSlideAssets(page: Page, waitMs: number): Promise<void> {
  await page.evaluate(async () => {
    const pageDocument = (globalThis as { document?: { fonts?: { ready: Promise<void> } } }).document

    if (pageDocument?.fonts)
      await pageDocument.fonts.ready
  })
  await page.waitForFunction(() => {
    const pageDocument = (globalThis as {
      document?: {
        images: Iterable<{
          complete: boolean
          naturalWidth: number
          getBoundingClientRect: () => { width: number, height: number }
        }>
      }
    }).document
    const visibleImages = [...pageDocument?.images ?? []].filter((image) => {
      const rect = image.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0
    })
    return visibleImages.every(image => image.complete && image.naturalWidth > 0)
  }, undefined, { timeout: 120000 })
  await page.waitForTimeout(waitMs)
}

function renderScreenshotPdfHtml(images: readonly string[]): string {
  const pages = images
    .map(image => `<section class="page"><img src="data:image/jpeg;base64,${image}" /></section>`)
    .join('')

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
@page { size: ${slideWidth}px ${slideHeight}px; margin: 0; }
html, body { width: ${slideWidth}px; margin: 0; padding: 0; background: #f3f4f6; }
.page { width: ${slideWidth}px; height: ${slideHeight}px; margin: 0; padding: 0; page-break-after: always; break-after: page; overflow: hidden; }
.page:last-child { page-break-after: auto; break-after: auto; }
img { display: block; width: ${slideWidth}px; height: ${slideHeight}px; margin: 0; padding: 0; }
</style>
</head>
<body>${pages}</body>
</html>`
}

function parseWaitMs(value: string | undefined): number {
  const waitMs = Number.parseInt(value ?? '3000', 10)
  if (!Number.isFinite(waitMs) || waitMs < 0 || waitMs > 120000)
    throw new Error('PDF export wait은 0~120000ms 범위 필요')
  return waitMs
}

async function createStaticServer(rootDir: string): Promise<Server> {
  const root = resolve(rootDir)
  const types = new Map([
    ['.css', 'text/css'],
    ['.gif', 'image/gif'],
    ['.html', 'text/html'],
    ['.jpg', 'image/jpeg'],
    ['.js', 'text/javascript'],
    ['.jpeg', 'image/jpeg'],
    ['.png', 'image/png'],
    ['.webp', 'image/webp'],
    ['.woff2', 'font/woff2'],
  ])
  const server = createServer((request, response) => {
  let url: string
  try {
    url = decodeURIComponent(request.url?.split('?')[0] || '/')
  }
  catch {
    response.writeHead(400)
    response.end('bad request')
    return
  }
    const requestedPath = url === '/' ? '/index.html' : url
    let filePath = resolve(root, `.${requestedPath}`)

    const fromRoot = relative(root, filePath)
    if (fromRoot.startsWith('..') || fromRoot === '') {
      response.writeHead(403)
      response.end('forbidden')
      return
    }

    readFile(filePath)
      .catch(() => {
        filePath = join(root, 'index.html')
        return readFile(filePath)
      })
      .then((body) => {
        response.writeHead(200, {
          'content-type': types.get(extname(filePath)) ?? 'application/octet-stream',
        })
        response.end(body)
      })
      .catch(() => {
        response.writeHead(404)
        response.end('not found')
      })
  })

  return await new Promise((resolveServer, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject)
      resolveServer(server)
    })
  })
}

async function closeServer(server: Server): Promise<void> {
  await new Promise<void>((resolveClose, reject) => {
    server.close((error) => error ? reject(error) : resolveClose())
  })
}

async function main(): Promise<void> {
  const args = parseFlags(process.argv.slice(2))
  const project = requireStringFlag(args, 'project', '사용법: pnpm deck:export:pdf -- --project <name> [--name <display name>] [--out <file>] [--range <range>] [--wait <ms>] [--wait-until <state>] [--native] [--with-clicks]')
  const name = getStringFlag(args, 'name')
  const out = getStringFlag(args, 'out')
  const range = getStringFlag(args, 'range')
  const wait = getStringFlag(args, 'wait')
  const waitUntil = getStringFlag(args, 'wait-until')
  const native = args.flags.get('native') === true
  const withClicks = args.flags.get('with-clicks') === true
  const result = await exportDeckPdf({ project, name, out, range, wait, waitUntil, native, withClicks })

  console.log(`Deck PDF export complete: ${result.outFile}`)
}

if (isMainModule(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
