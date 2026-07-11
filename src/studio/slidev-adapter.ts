import { getPosterTime } from './timeline.js'
import type { SceneSlide } from './schema.js'

export function clickCountToSceneTime(slide: SceneSlide, clicks: number): number {
  const index = Math.min(Math.max(clicks + 1, 0), slide.timeline.cues.length - 1)
  return slide.timeline.cues[index]?.at ?? 0
}

export function getSlidevClickCount(slide: SceneSlide): number {
  return Math.max(slide.timeline.cues.length - 1, 0)
}

export function getPosterSceneTime(slide: SceneSlide, isPrintMode: boolean, hasPosterQuery: boolean): number | undefined {
  return isPrintMode || hasPosterQuery ? getPosterTime(slide) : undefined
}
