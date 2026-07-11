import { parseSceneDocument, serializeSceneDocument } from '../../src/studio/serializer.js'
import { migrateSceneDocument, parseDeckDocument, serializeDeckDocument, type DeckDocumentV2 } from '../../src/studio/deck.js'
import type { SlidevImportReport } from '../../src/studio/slidev-importer.js'
import type { SceneDocument } from '../../src/studio/schema.js'

interface WritableFile {
  write(data: string | Blob): Promise<void>
  close(): Promise<void>
}

export interface StudioFileHandle {
  readonly name: string
  getFile(): Promise<File>
  createWritable(options?: { readonly keepExistingData?: boolean }): Promise<WritableFile>
}

export interface StudioDirectoryHandle {
  getFileHandle(name: string, options?: { readonly create?: boolean }): Promise<StudioFileHandle>
  getDirectoryHandle(name: string, options?: { readonly create?: boolean }): Promise<StudioDirectoryHandle>
}

interface PickerWindow extends Window {
  showDirectoryPicker?: (options?: { readonly mode?: 'read' | 'readwrite' }) => Promise<StudioDirectoryHandle>
}

export function canUseDirectoryPicker(): boolean {
  return typeof (window as PickerWindow).showDirectoryPicker === 'function'
}

export async function chooseProjectDirectory(): Promise<StudioDirectoryHandle | undefined> {
  const picker = (window as PickerWindow).showDirectoryPicker
  if (!picker)
    return undefined
  try {
    return await picker({ mode: 'readwrite' })
  }
  catch (error) {
    if (isAbortError(error))
      return undefined
    throw error
  }
}

export async function saveSceneToDirectory(directory: StudioDirectoryHandle, document: SceneDocument): Promise<void> {
  const file = await directory.getFileHandle('scene.luma.json', { create: true })
  const writable = await file.createWritable({ keepExistingData: false })
  try {
    await writable.write(serializeSceneDocument(document))
  }
  finally {
    await writable.close()
  }
}

export async function loadSceneFromDirectory(directory: StudioDirectoryHandle): Promise<SceneDocument> {
  const file = await directory.getFileHandle('scene.luma.json')
  return parseSceneDocument(await (await file.getFile()).text())
}

/** V2 저장은 원본 V1 file을 덮지 않고 temp/backup을 남겨 recovery 가능하게 유지한다. */
export async function saveDeckToDirectory(directory: StudioDirectoryHandle, deck: DeckDocumentV2): Promise<void> {
  const source = serializeDeckDocument(deck)
  await writeText(directory, 'deck.luma.json.tmp', source)
  parseDeckDocument(await readText(directory, 'deck.luma.json.tmp'))
  try {
    await writeText(directory, 'deck.luma.json.bak', await readText(directory, 'deck.luma.json'))
  }
  catch (error) {
    if (!isNotFoundError(error))
      throw error
  }
  await writeText(directory, 'deck.luma.json', source)
}

export async function loadDeckFromDirectory(directory: StudioDirectoryHandle): Promise<DeckDocumentV2> {
  try {
    return parseDeckDocument(await readText(directory, 'deck.luma.json'))
  }
  catch (error) {
    if (!isNotFoundError(error)) {
      try {
        return parseDeckDocument(await readText(directory, 'deck.luma.json.bak'))
      }
      catch (backupError) {
        if (!isNotFoundError(backupError)) throw backupError
        try { return parseDeckDocument(await readText(directory, 'deck.luma.json.tmp')) }
        catch (temporaryError) { if (!isNotFoundError(temporaryError)) throw temporaryError; throw error }
      }
    }
    try { return parseDeckDocument(await readText(directory, 'deck.luma.json.tmp')) }
    catch (temporaryError) { if (!isNotFoundError(temporaryError)) throw temporaryError }
  }
  return migrateSceneDocument(await loadSceneFromDirectory(directory))
}

/** Legacy import report는 optional local metadata다. 없으면 일반 V2 deck으로 연다. */
export async function loadImportReportFromDirectory(directory: StudioDirectoryHandle): Promise<SlidevImportReport | undefined> {
  try {
    const metadata = await directory.getDirectoryHandle('.lumadeck')
    const parsed: unknown = JSON.parse(await readText(metadata, 'import-report.json'))
    return isSlidevImportReport(parsed) ? parsed : undefined
  }
  catch (error) {
    if (isNotFoundError(error) || error instanceof SyntaxError)
      return undefined
    throw error
  }
}

export async function loadAssetUrlsFromDirectory(directory: StudioDirectoryHandle, scene: SceneDocument): Promise<Map<string, string>> {
  const urls = new Map<string, string>()
  const directories = new Map<string, StudioDirectoryHandle>()
  for (const asset of scene.assets) {
    const source = assetFileLocation(asset.src)
    if (!source)
      continue
    try {
      let assetDirectory = directories.get(source.directory)
      if (!assetDirectory) {
        assetDirectory = await directory.getDirectoryHandle(source.directory)
        directories.set(source.directory, assetDirectory)
      }
      urls.set(asset.id, URL.createObjectURL(await (await assetDirectory.getFileHandle(source.name)).getFile()))
    }
    catch (error) {
      if (!(error instanceof DOMException) || error.name !== 'NotFoundError')
        throw error
    }
  }
  return urls
}

export async function copyAssetToDirectory(directory: StudioDirectoryHandle, source: File): Promise<{ readonly src: string, readonly url: string }> {
  const extension = source.name.includes('.') ? source.name.slice(source.name.lastIndexOf('.')).toLowerCase() : ''
  if (!['.jpg', '.jpeg', '.png', '.svg', '.webp'].includes(extension) || !source.type.startsWith('image/'))
    throw new Error('지원하지 않는 이미지 형식: PNG, JPG, SVG, WEBP만 선택')
  if (source.size > 15 * 1024 * 1024)
    throw new Error('이미지 용량 제한: 15MB 이하')
  const baseName = source.name.slice(0, source.name.length - extension.length).replace(/[^a-zA-Z0-9_-]/g, '-').replace(/^[-.]+/, '')
  if (!baseName || baseName.includes('..'))
    throw new Error('안전하지 않은 파일 이름')
  const digest = await crypto.subtle.digest('SHA-256', await source.arrayBuffer())
  const suffix = [...new Uint8Array(digest)].slice(0, 8).map(value => value.toString(16).padStart(2, '0')).join('')
  const safeName = `${baseName}-${suffix}${extension}`
  const assets = await directory.getDirectoryHandle('assets', { create: true })
  let target: StudioFileHandle
  try {
    target = await assets.getFileHandle(safeName)
    return { src: `assets/${safeName}`, url: URL.createObjectURL(source) }
  }
  catch (error) {
    if (!(error instanceof DOMException) || error.name !== 'NotFoundError')
      throw error
    target = await assets.getFileHandle(safeName, { create: true })
  }
  const writable = await target.createWritable({ keepExistingData: false })
  try {
    await writable.write(source)
  }
  finally {
    await writable.close()
  }
  return { src: `assets/${safeName}`, url: URL.createObjectURL(source) }
}

export function downloadScene(scene: SceneDocument): void {
  const blob = new Blob([serializeSceneDocument(scene)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = globalThis.document.createElement('a')
  anchor.href = url
  anchor.download = 'scene.luma.json'
  anchor.click()
  URL.revokeObjectURL(url)
}

export function downloadDeck(deck: DeckDocumentV2): void {
  const blob = new Blob([serializeDeckDocument(deck)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = globalThis.document.createElement('a')
  anchor.href = url
  anchor.download = 'deck.luma.json'
  anchor.click()
  URL.revokeObjectURL(url)
}

export function releaseAssetUrls(urls: ReadonlyMap<string, string>): void {
  for (const url of urls.values()) {
    if (url.startsWith('blob:'))
      URL.revokeObjectURL(url)
  }
}

function assetFileLocation(source: string): { readonly directory: 'assets' | 'images', readonly name: string } | undefined {
  const match = /^(assets|images)\/([a-zA-Z0-9][a-zA-Z0-9._-]{0,180})$/.exec(source)
  return match ? { directory: match[1] as 'assets' | 'images', name: match[2]! } : undefined
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

function isNotFoundError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'NotFoundError'
}

function isSlidevImportReport(value: unknown): value is SlidevImportReport {
  if (!value || typeof value !== 'object')
    return false
  const report = value as Partial<SlidevImportReport>
  return typeof report.sourceSha256 === 'string'
    && typeof report.totalSlides === 'number'
    && Array.isArray(report.importedSlideIds)
    && Array.isArray(report.issues)
    && report.issues.every(issue => issue && typeof issue === 'object'
      && typeof (issue as { slideId?: unknown }).slideId === 'string'
      && typeof (issue as { reason?: unknown }).reason === 'string'
      && typeof (issue as { raw?: unknown }).raw === 'string')
}

async function writeText(directory: StudioDirectoryHandle, name: string, value: string): Promise<void> {
  const file = await directory.getFileHandle(name, { create: true })
  const writable = await file.createWritable({ keepExistingData: false })
  try {
    await writable.write(value)
  }
  finally {
    await writable.close()
  }
}

async function readText(directory: StudioDirectoryHandle, name: string): Promise<string> {
  return (await (await directory.getFileHandle(name)).getFile()).text()
}
