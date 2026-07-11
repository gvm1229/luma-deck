import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createGripGunPrototypeScene } from '../src/studio/gripgun-scene.js'
import { serializeSceneDocument } from '../src/studio/serializer.js'

const target = resolve(process.cwd(), 'projects/pragmata-2p-gripgun-prototype/scene.luma.json')

await mkdir(dirname(target), { recursive: true })
await writeFile(target, serializeSceneDocument(createGripGunPrototypeScene()), 'utf8')
console.log(`GripGun scene seed: ${target}`)
