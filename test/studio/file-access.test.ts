import { describe, expect, it } from 'vitest'
import { loadAssetUrlsFromDirectory, loadDeckFromDirectory, loadSceneFromDirectory, releaseAssetUrls, saveDeckToDirectory, saveSceneToDirectory, type StudioDirectoryHandle, type StudioFileHandle } from '../../studio/src/file-access.js'
import { migrateSceneDocument } from '../../src/studio/deck.js'
import { createTestScene } from './scene.js'

class MemoryFileHandle implements StudioFileHandle {
  constructor(readonly name: string, private value = '') {}

  async getFile(): Promise<File> {
    return new File([this.value], this.name, { type: this.name.endsWith('.png') ? 'image/png' : 'application/json' })
  }

  async createWritable(): Promise<{ write(data: string | Blob): Promise<void>, close(): Promise<void> }> {
    let pending = this.value
    return {
      write: async (data) => { pending = typeof data === 'string' ? data : await data.text() },
      close: async () => { this.value = pending },
    }
  }
}

class MemoryDirectory implements StudioDirectoryHandle {
  readonly files = new Map<string, MemoryFileHandle>()
  readonly directories = new Map<string, MemoryDirectory>()

  async getFileHandle(name: string, options?: { readonly create?: boolean }): Promise<StudioFileHandle> {
    const found = this.files.get(name)
    if (found)
      return found
    if (options?.create) {
      const created = new MemoryFileHandle(name)
      this.files.set(name, created)
      return created
    }
    throw new DOMException('not found', 'NotFoundError')
  }

  async getDirectoryHandle(name: string, options?: { readonly create?: boolean }): Promise<StudioDirectoryHandle> {
    const found = this.directories.get(name)
    if (found)
      return found
    if (options?.create) {
      const created = new MemoryDirectory()
      this.directories.set(name, created)
      return created
    }
    throw new DOMException('not found', 'NotFoundError')
  }
}

describe('studio file access', () => {
  it('saves, reloads, and rebuilds object URLs for stored assets', async () => {
    const directory = new MemoryDirectory()
    const scene = structuredClone(createTestScene())
    scene.assets[0].src = 'assets/evidence.png'
    const assets = await directory.getDirectoryHandle('assets', { create: true }) as MemoryDirectory
    assets.files.set('evidence.png', new MemoryFileHandle('evidence.png', 'png-data'))
    await saveSceneToDirectory(directory, scene)
    const loaded = await loadSceneFromDirectory(directory)
    const urls = await loadAssetUrlsFromDirectory(directory, loaded)
    expect(loaded).toEqual(scene)
    expect(urls.get('beta-enemy-hit')).toMatch(/^blob:/)
    releaseAssetUrls(urls)
  })

  it('loads imported legacy images from the project images directory', async () => {
    const directory = new MemoryDirectory()
    const scene = structuredClone(createTestScene())
    scene.assets[0].src = 'images/evidence.png'
    const images = await directory.getDirectoryHandle('images', { create: true }) as MemoryDirectory
    images.files.set('evidence.png', new MemoryFileHandle('evidence.png', 'png-data'))
    const urls = await loadAssetUrlsFromDirectory(directory, scene)
    expect(urls.get('beta-enemy-hit')).toMatch(/^blob:/)
    releaseAssetUrls(urls)
  })

  it('creates a V2 deck without overwriting the V1 scene and recovers from backup', async () => {
    const directory = new MemoryDirectory()
    const scene = createTestScene()
    await saveSceneToDirectory(directory, scene)
    const deck = migrateSceneDocument(scene)
    await saveDeckToDirectory(directory, deck)
    await saveDeckToDirectory(directory, deck)
    expect(await loadDeckFromDirectory(directory)).toEqual(deck)
    expect(await loadSceneFromDirectory(directory)).toEqual(scene)
    const files = directory.files
    files.set('deck.luma.json', new MemoryFileHandle('deck.luma.json', '{broken'))
    expect(await loadDeckFromDirectory(directory)).toEqual(deck)
  })

  it('recovers a valid temporary V2 document when initial commit is interrupted', async () => {
    const directory = new MemoryDirectory()
    const deck = migrateSceneDocument(createTestScene())
    directory.files.set('deck.luma.json.tmp', new MemoryFileHandle('deck.luma.json.tmp', JSON.stringify(deck)))
    expect(await loadDeckFromDirectory(directory)).toEqual(deck)
  })
})
