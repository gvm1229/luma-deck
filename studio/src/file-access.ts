import { parseSceneDocument, serializeSceneDocument } from '../../src/studio/serializer.js'
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

export async function loadAssetUrlsFromDirectory(directory: StudioDirectoryHandle, scene: SceneDocument): Promise<Map<string, string>> {
  const urls = new Map<string, string>()
  let assets: StudioDirectoryHandle
  try {
    assets = await directory.getDirectoryHandle('assets')
  }
  catch (error) {
    if (error instanceof DOMException && error.name === 'NotFoundError')
      return urls
    throw error
  }
  for (const asset of scene.assets) {
    const name = assetFileName(asset.src)
    if (!name)
      continue
    try {
      urls.set(asset.id, URL.createObjectURL(await (await assets.getFileHandle(name)).getFile()))
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

export function releaseAssetUrls(urls: ReadonlyMap<string, string>): void {
  for (const url of urls.values()) {
    if (url.startsWith('blob:'))
      URL.revokeObjectURL(url)
  }
}

function assetFileName(source: string): string | undefined {
  const match = /^assets\/([a-zA-Z0-9][a-zA-Z0-9._-]{0,180})$/.exec(source)
  return match?.[1]
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}
