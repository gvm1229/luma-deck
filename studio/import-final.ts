import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { serializeDeckDocument } from '../src/studio/deck.js'
import { importSlidevMarkdown } from '../src/studio/slidev-importer.js'

const project = resolve(process.cwd(), 'projects/pragmata-2p-final')
const sourcePath = resolve(project, 'slides.md')
const result = importSlidevMarkdown(await readFile(sourcePath, 'utf8'))
const reportPath = resolve(project, '.lumadeck/import-report.json')
await mkdir(dirname(reportPath), { recursive: true })
await writeFile(reportPath, `${JSON.stringify(result.report, null, 2)}\n`, 'utf8')
await writeFile(resolve(project, 'deck.luma.json'), serializeDeckDocument(result.deck), 'utf8')
console.log(`Imported ${result.report.totalSlides} slides; ${result.report.issues.length} review items: ${reportPath}`)
