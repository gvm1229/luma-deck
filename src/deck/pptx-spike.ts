import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import JSZip from 'jszip'
import { getPptxMediaDiagnosticDir } from './artifacts.js'
import {
  getStringFlag,
  isMainModule,
  parseFlags,
  requireStringFlag,
  resolveDeckProject,
  slugify,
} from './cli-utils.js'

const require = createRequire(import.meta.url)
const PptxGenJS = require('pptxgenjs') as typeof import('pptxgenjs').default

interface GifReference {
  readonly slideNumber: number | undefined
  readonly path: string
  readonly label: string
}

export interface PptxSpikeResult {
  readonly pptxPath: string
  readonly reportPath: string
  readonly expectedGifCount: number
  readonly embeddedGifCount: number
}

export async function runPptxMovingMediaSpike(projectName: string, displayName?: string): Promise<PptxSpikeResult> {
  const project = await resolveDeckProject(projectName)
  const name = displayName?.trim() || project.name
  const outDir = getPptxMediaDiagnosticDir(project.name)
  const pptxPath = join(outDir, `${slugify(name) || 'presentation'}-moving-media-spike.pptx`)
  const reportPath = join(outDir, 'pptx-media-diagnostic-report.txt')
  const gifs = await findGifReferences(project.slidesPath, project.dir)

  await mkdir(outDir, { recursive: true })

  const pptx = new PptxGenJS()
  pptx.layout = 'LAYOUT_WIDE'
  pptx.author = 'LumaDeck'
  pptx.subject = 'Moving media feasibility spike'
  pptx.title = `${name} moving-media PPTX spike`
  pptx.company = 'LumaDeck'
  pptx.theme = {
    headFontFace: 'Aptos Display',
    bodyFontFace: 'Aptos',
  }

  const cover = pptx.addSlide()
  cover.background = { color: 'F3F4F6' }
  cover.addText('Moving-media PPTX feasibility spike', {
    x: 0.7,
    y: 0.6,
    w: 12,
    h: 0.5,
    fontFace: 'Aptos Display',
    fontSize: 28,
    bold: true,
    color: '111827',
  })
  cover.addText([
    { text: 'Purpose: ', options: { bold: true } },
    { text: 'prove whether PowerPoint can retain source GIF files as animated media. This is not Slidev native export.' },
  ], {
    x: 0.7,
    y: 1.3,
    w: 11.8,
    h: 0.7,
    fontSize: 15,
    color: '374151',
    breakLine: false,
    fit: 'shrink',
  })
  cover.addText(`Source GIF references found: ${gifs.length}`, {
    x: 0.7,
    y: 2.25,
    w: 6,
    h: 0.4,
    fontSize: 18,
    bold: true,
    color: '2563EB',
  })

  for (const gif of gifs) {
    const slide = pptx.addSlide()
    slide.background = { color: 'F9FAFB' }
    slide.addText(`Slide ${gif.slideNumber ?? '?'} / ${gif.label}`, {
      x: 0.45,
      y: 0.25,
      w: 12.45,
      h: 0.35,
      fontFace: 'Aptos Display',
      fontSize: 15,
      bold: true,
      color: '111827',
      fit: 'shrink',
    })
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.45,
      y: 0.72,
      w: 12.45,
      h: 6.02,
      fill: { color: 'FFFFFF', transparency: 4 },
      line: { color: 'CBD5E1', width: 1 },
    })
    slide.addImage({
      path: gif.path,
      x: 0.75,
      y: 0.92,
      w: 11.85,
      h: 5.62,
      sizing: { type: 'contain', x: 0.75, y: 0.92, w: 11.85, h: 5.62 },
    })
  }

  await pptx.writeFile({ fileName: pptxPath })

  const embeddedGifCount = await countEmbeddedGifs(pptxPath)
  const report = [
    `Internal PPTX media diagnostic: ${name}`,
    `PPTX: ${pptxPath}`,
    `Source GIF references: ${gifs.length}`,
    `Embedded .gif files in ppt/media: ${embeddedGifCount}`,
    '',
    'Conclusion:',
    embeddedGifCount === gifs.length
      ? 'PptxGenJS preserved the source GIF files inside the PPTX package. Playback still depends on the target PowerPoint version.'
      : 'The generated PPTX did not preserve every GIF as .gif media; treat moving-media PPTX as not viable without deeper PowerPoint-specific work.',
    '',
    'Limitations:',
    '- This diagnostic is not Slidev native PPTX export.',
    '- It does not convert external YouTube embeds into offline video.',
    '- It proves media packaging, not full Slidev layout parity.',
    '',
    'GIF references:',
    ...gifs.map(gif => `- slide ${gif.slideNumber ?? '?'}: ${gif.label}`),
    '',
  ].join('\n')

  await writeFile(reportPath, report)

  return {
    pptxPath,
    reportPath,
    expectedGifCount: gifs.length,
    embeddedGifCount,
  }
}

async function findGifReferences(slidesPath: string, projectDir: string): Promise<GifReference[]> {
  const markdown = await readFile(slidesPath, 'utf8')
  const matches = [...markdown.matchAll(/src=["']\.\/images\/([^"']+\.gif)["']/gi)]

  return matches.map((match) => {
    const label = match[1] ?? 'unknown.gif'
    const slideMatch = label.match(/slide-(\d+)/i)

    return {
      slideNumber: slideMatch?.[1] ? Number(slideMatch[1]) : undefined,
      path: join(projectDir, 'images', label),
      label,
    }
  })
}

async function countEmbeddedGifs(pptxPath: string): Promise<number> {
  const zip = await JSZip.loadAsync(await readFile(pptxPath))
  return Object.keys(zip.files).filter(name => /^ppt\/media\/.+\.gif$/i.test(name)).length
}

async function main(): Promise<void> {
  const args = parseFlags(process.argv.slice(2))
  const project = requireStringFlag(args, 'project', '사용법: pnpm deck:diagnose:pptx-media -- --project <name> [--name <display name>]')
  const result = await runPptxMovingMediaSpike(project, getStringFlag(args, 'name'))

  console.log(`PPTX media diagnostic complete: ${result.pptxPath}`)
  console.log(`Report: ${result.reportPath}`)
  console.log(`Embedded GIFs: ${result.embeddedGifCount}/${result.expectedGifCount}`)
}

if (isMainModule(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
