import type { SceneTrack } from './schema.js'

export const motionPresetNames = [
  'DrawRay',
  'ImpactPulse',
  'FocusRing',
  'StateHighlight',
  'IntentToServer',
  'ResultBroadcast',
  'CrossFadeEvidence',
] as const

export type MotionPresetName = typeof motionPresetNames[number]

export function createMotionPresetTracks(
  preset: MotionPresetName,
  elementId: string,
  startAt: number,
  duration = 0.7,
): readonly SceneTrack[] {
  const id = `preset-${elementId}-${preset.toLowerCase()}`
  const endAt = startAt + duration

  if (preset === 'DrawRay') {
    return [{ id, elementId, property: 'pathProgress', keyframes: [
      { at: startAt, value: 0, easing: 'linear' },
      { at: endAt, value: 1, easing: 'ease-out' },
    ] }]
  }

  if (preset === 'ImpactPulse' || preset === 'FocusRing') {
    return [{ id, elementId, property: 'style.scale', keyframes: [
      { at: startAt, value: 0.4, easing: 'ease-out' },
      { at: startAt + duration * 0.45, value: 1.25, easing: 'ease-out' },
      { at: endAt, value: 1, easing: 'ease-in' },
    ] }]
  }

  if (preset === 'StateHighlight') {
    return [{ id, elementId, property: 'style.borderColor', keyframes: [
      { at: startAt, value: '#93c5fd', easing: 'linear' },
      { at: endAt, value: '#2563eb', easing: 'linear' },
    ] }]
  }

  if (preset === 'IntentToServer' || preset === 'ResultBroadcast') {
    return [{ id, elementId, property: 'opacity', keyframes: [
      { at: startAt, value: 0, easing: 'linear' },
      { at: endAt, value: 1, easing: 'ease-out' },
    ] }]
  }

  return [{ id, elementId, property: 'opacity', keyframes: [
    { at: startAt, value: 0, easing: 'linear' },
    { at: endAt, value: 1, easing: 'ease-out' },
  ] }]
}
