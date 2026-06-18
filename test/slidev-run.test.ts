import { describe, expect, it } from 'vitest'
import { getSlidevArgs } from '../src/slidev/run.js'

describe('Slidev runner', () => {
  it('uses the default Slidev command for dev server', () => {
    expect(getSlidevArgs('dev', 'slides.md')).toEqual(['slides.md'])
  })

  it('passes build as a Slidev subcommand', () => {
    expect(getSlidevArgs('build', 'slides.md')).toEqual(['build', 'slides.md'])
  })

  it('forwards extra Slidev arguments', () => {
    expect(getSlidevArgs('dev', 'slides.md', ['--port', '3042'])).toEqual([
      'slides.md',
      '--port',
      '3042',
    ])
  })

  it('drops pnpm argument separator before forwarding Slidev arguments', () => {
    expect(getSlidevArgs('dev', 'slides.md', ['--', '--host', '127.0.0.1', '--port', '3040'])).toEqual([
      'slides.md',
      '--host',
      '127.0.0.1',
      '--port',
      '3040',
    ])
  })
})
