import { describe, expect, it } from 'vitest'
import { loadAssetUrlsFromDirectory, loadSceneFromDirectory, releaseAssetUrls, saveSceneToDirectory, type StudioDirectoryHandle, type StudioFileHandle } from '../../studio/src/file-access.js'
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
})
