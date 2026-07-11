import type { EasingName, SceneDocument, SceneElement, SceneSlide, SceneTrack } from './schema.js'

export function clampTimelineTime(slide: SceneSlide, time: number): number {
  return Math.min(Math.max(time, 0), slide.timeline.duration)
}

export function getCueTimes(slide: SceneSlide): readonly number[] {
  return slide.timeline.cues.map(cue => cue.at)
}

export function getNextCueTime(slide: SceneSlide, currentTime: number): number | undefined {
  return getCueTimes(slide).find(cueAt => cueAt > currentTime + 0.001)
}

export function getPreviousCueTime(slide: SceneSlide, currentTime: number): number {
  return [...getCueTimes(slide)].reverse().find(cueAt => cueAt < currentTime - 0.001) ?? 0
}

export function getCueAt(slide: SceneSlide, time: number) {
  return slide.timeline.cues.find(cue => Math.abs(cue.at - time) < 0.001)
}

export function evaluateSlideAt(slide: SceneSlide, time: number): SceneSlide {
  const clampedTime = clampTimelineTime(slide, time)
  const elements = slide.elements.map(element => evaluateElementAt(element, slide.timeline.tracks, clampedTime))
  return { ...slide, elements }
}

export function getPosterTime(slide: SceneSlide): number {
  return slide.timeline.cues.find(cue => cue.id === slide.posterCueId)?.at ?? slide.timeline.duration
}

function evaluateElementAt(element: SceneElement, tracks: readonly SceneTrack[], time: number): SceneElement {
  const next = structuredClone(element) as SceneElement
  for (const track of tracks.filter(candidate => candidate.elementId === element.id))
    applyTrack(next, track, time)
  return next
}

function applyTrack(element: SceneElement, track: SceneTrack, time: number): void {
  const value = interpolateTrack(track, time)
  if (value === undefined)
    return
  if (track.property.startsWith('style.')) {
    const key = track.property.slice('style.'.length)
    ;(element.style as Record<string, string | number>)[key] = value
    return
  }
  if (track.property === 'pathProgress') {
    ;(element.style as Record<string, string | number>).pathProgress = value
    return
  }
  const numericValue = Number(value)
  if (track.property === 'x') {
    ;(element.transform as { x: number }).x = numericValue
  }
  else if (track.property === 'y') {
    ;(element.transform as { y: number }).y = numericValue
  }
  else if (track.property === 'width') {
    ;(element.transform as { width: number }).width = numericValue
  }
  else if (track.property === 'height') {
    ;(element.transform as { height: number }).height = numericValue
  }
  else if (track.property === 'rotation') {
    ;(element.transform as { rotation: number }).rotation = numericValue
  }
  else if (track.property === 'opacity') {
    ;(element.transform as { opacity: number }).opacity = numericValue
  }
}

function interpolateTrack(track: SceneTrack, time: number): string | number | undefined {
  const frames = track.keyframes
  if (time <= frames[0].at)
    return frames[0].value
  if (time >= frames.at(-1)!.at)
    return frames.at(-1)!.value
  const laterIndex = frames.findIndex(frame => frame.at >= time)
  const later = frames[laterIndex]
  const earlier = frames[laterIndex - 1]
  if (typeof earlier.value !== 'number' || typeof later.value !== 'number')
    return earlier.value
  const rawProgress = (time - earlier.at) / (later.at - earlier.at)
  const progress = ease(rawProgress, later.easing)
  return earlier.value + (later.value - earlier.value) * progress
}

function ease(progress: number, easing: EasingName): number {
  if (easing === 'ease-in')
    return progress * progress
  if (easing === 'ease-out')
    return 1 - (1 - progress) * (1 - progress)
  if (easing === 'ease-in-out')
    return progress < 0.5 ? 2 * progress * progress : 1 - ((-2 * progress + 2) ** 2) / 2
  return progress
}
