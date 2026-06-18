import { readFile } from 'node:fs/promises'
import { ZodError } from 'zod'
import { formatValidationError, parseDeck, type Deck } from './deck.js'

export async function readDeckFile(path: string): Promise<Deck> {
  let raw: string

  try {
    raw = await readFile(path, 'utf8')
  }
  catch (error) {
    throw new Error(`deck 파일을 읽을 수 없음: ${path}\n${formatUnknownError(error)}`)
  }

  let parsed: unknown

  try {
    parsed = JSON.parse(raw)
  }
  catch (error) {
    throw new Error(`deck JSON 파싱 실패: ${path}\n${formatUnknownError(error)}`)
  }

  try {
    return parseDeck(parsed)
  }
  catch (error) {
    if (error instanceof ZodError)
      throw new Error(`deck 검증 실패: ${path}\n${formatValidationError(error)}`)

    throw error
  }
}

function formatUnknownError(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}
