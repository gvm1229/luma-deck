import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createGripGunPresentationDeck } from '../src/studio/gripgun-deck.js'
import { serializeDeckDocument } from '../src/studio/deck.js'
import { createSlidevManifest, generateSlidevMarkdown } from '../src/studio/slidev-generator.js'

const target = resolve(process.cwd(), 'projects/pragmata-2p-gripgun-prototype/deck.luma.json')

await mkdir(dirname(target), { recursive: true })
const deck = createGripGunPresentationDeck()
await writeFile(target, serializeDeckDocument(deck), 'utf8')
await writeFile(resolve(process.cwd(), 'projects/pragmata-2p-gripgun-prototype/slidev-manifest.json'), `${JSON.stringify(createSlidevManifest(deck), null, 2)}\n`, 'utf8')
await writeFile(resolve(process.cwd(), 'projects/pragmata-2p-gripgun-prototype/slides.md'), generateSlidevMarkdown(deck), 'utf8')
console.log(`GripGun deck seed: ${target}`)
