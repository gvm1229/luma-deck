import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const port = Number.parseInt(process.env.PORT ?? '4173', 10)
const types = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
])

const server = createServer((request, response) => {
  let url: string
  try {
    url = decodeURIComponent(request.url?.split('?')[0] ?? '/')
  }
  catch {
    response.writeHead(400)
    response.end('bad request')
    return
  }
  const requestPath = url === '/' || url === '/studio/' ? '/studio/index.html' : url
  const path = resolve(root, `.${requestPath}`)
  const fromRoot = relative(root, path).replaceAll('\\', '/')
  const allowed = fromRoot === 'studio/index.html'
    || fromRoot === 'studio/src/styles.css'
    || fromRoot.startsWith('studio/dist/')
    || fromRoot === 'projects/pragmata-2p-beta/images/slide-15-enemy-hit.png'
  if (fromRoot.startsWith('..') || fromRoot === '' || !allowed) {
    response.writeHead(403)
    response.end('forbidden')
    return
  }
  readFile(path)
    .then((body) => {
      response.writeHead(200, { 'content-type': types.get(extname(path)) ?? 'application/octet-stream', 'cache-control': 'no-store' })
      response.end(body)
    })
    .catch(() => {
      response.writeHead(404)
      response.end('not found')
    })
})

server.listen(port, '127.0.0.1', () => {
  console.log(`LumaDeck Visual Studio: http://127.0.0.1:${port}/studio/`)
})
