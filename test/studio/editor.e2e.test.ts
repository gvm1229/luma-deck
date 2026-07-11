import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, resolve } from 'node:path'
import { chromium } from 'playwright-chromium'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const root = resolve(process.cwd())
const types = new Map([
  ['.css', 'text/css'],
  ['.html', 'text/html'],
  ['.js', 'text/javascript'],
  ['.png', 'image/png'],
])
const server = createServer((request, response) => {
  const url = decodeURIComponent(request.url?.split('?')[0] ?? '/')
  const requestPath = url === '/' || url === '/studio/' ? '/studio/index.html' : url
  const path = resolve(root, `.${requestPath}`)
  if (!path.startsWith(root)) {
    response.writeHead(403)
    response.end('forbidden')
    return
  }
  readFile(path)
    .then((body) => {
      response.writeHead(200, { 'content-type': types.get(extname(path)) ?? 'application/octet-stream' })
      response.end(body)
    })
    .catch(() => {
      response.writeHead(404)
      response.end('not found')
    })
})

let url = ''

beforeAll(async () => {
  await new Promise<void>((resolveListen, rejectListen) => {
    server.once('error', rejectListen)
    server.listen(0, '127.0.0.1', () => {
      server.off('error', rejectListen)
      const address = server.address()
      if (!address || typeof address === 'string')
        return rejectListen(new Error('studio test server address 없음'))
      url = `http://127.0.0.1:${address.port}/studio/`
      resolveListen()
    })
  })
})

afterAll(async () => {
  await new Promise<void>((resolveClose, rejectClose) => server.close(error => error ? rejectClose(error) : resolveClose()))
})

describe('Visual Studio editor', () => {
  it('edits text and renders poster cue without browser errors', async () => {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } })
    const errors: string[] = []
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(url, { waitUntil: 'load' })
    await page.locator('[data-element-id="headline"]').waitFor()
    expect(await page.locator('[data-role="slides"] .slide-item').count()).toBe(6)
    await page.locator('[data-action="duplicate-slide"]').click()
    expect(await page.locator('[data-role="slides"] .slide-item').count()).toBe(7)
    await page.locator('[data-role="slides"] .slide-item').first().click()
    await page.locator('[data-action="delete-slide"]').click()
    expect(await page.locator('[data-role="slides"] .slide-item').count()).toBe(6)
    await page.locator('[data-element-id="headline"]').click()
    await page.locator('[data-field="text"]').fill('Server confirms one Line Trace')
    await page.locator('[data-field="text"]').press('Tab')
    expect(await page.locator('[data-element-id="headline"]').textContent()).toBe('Server confirms one Line Trace')
    await page.locator('[data-role="preset"]').selectOption('CrossFadeEvidence')
    await page.locator('[data-role="preset-duration"]').fill('0.5')
    await page.locator('[data-action="preset"]').click()
    expect(await page.locator('.track-row').count()).toBeGreaterThan(0)
    await page.locator('[data-role="slides"] .slide-item').last().click()
    await page.locator('.cue').last().click()
    expect(await page.locator('[data-element-id="evidence"]').evaluate(node => getComputedStyle(node).opacity)).toBe('1')
    await page.locator('[data-role="slides"] .slide-item').first().click()
    await page.locator('[data-action="present"]').click()
    expect(await page.locator('.studio-header').evaluate(node => getComputedStyle(node).display)).toBe('none')
    await page.waitForTimeout(600)
    expect(await page.locator('[data-element-id="hit"]').evaluate(node => getComputedStyle(node).opacity)).toBe('0')
    expect(await page.locator('.scene-connector-arrow').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).display === 'none'))).toBe(true)
    await page.waitForTimeout(1700)
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(2700)
    expect(await page.locator('.scene-connector-arrow').first().evaluate(node => getComputedStyle(node).display)).not.toBe('none')
    await page.keyboard.press('Escape')
    expect(await page.locator('.studio-header').evaluate(node => getComputedStyle(node).display)).not.toBe('none')
    expect(errors).toEqual([])
    await browser.close()
  }, 12_000)
})
