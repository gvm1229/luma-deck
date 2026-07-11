import { createMotionPresetTracks } from './motion-presets.js'
import type { SceneDocument, SceneElement, SceneSlide, SceneTrack } from './schema.js'

const title = (id: string, content: string, x: number, y: number, width: number, style: Record<string, string | number> = {}): SceneElement => ({
  id,
  type: 'text',
  transform: { x, y, width, height: 72, rotation: 0, opacity: 1, zIndex: 10 },
  content,
  style: { color: '#111827', fontSize: 42, fontWeight: 800, lineHeight: 1.15, ...style },
  accessibilityLabel: content,
})

const card = (id: string, content: string, x: number, y: number, width: number, height: number, style: Record<string, string | number> = {}, opacity = 1): SceneElement => ({
  id,
  type: 'shape',
  transform: { x, y, width, height, rotation: 0, opacity, zIndex: 4 },
  content,
  style: { background: '#ffffff', border: '2px solid #dbeafe', borderRadius: 24, color: '#1d4ed8', fontSize: 22, fontWeight: 750, ...style },
  accessibilityLabel: content,
})

export function createGripGunPrototypeScene(): SceneDocument {
  const tracks: SceneTrack[] = [
    ...createMotionPresetTracks('IntentToServer', 'intent', 3, 4),
    ...createMotionPresetTracks('StateHighlight', 'server', 3.8, 2.2),
    ...createMotionPresetTracks('DrawRay', 'ray', 7, 4),
    ...createMotionPresetTracks('ImpactPulse', 'impact', 10.2, 0.8),
    ...createMotionPresetTracks('FocusRing', 'hit', 10.2, 0.8),
    ...createMotionPresetTracks('ResultBroadcast', 'broadcast', 21, 4),
    ...createMotionPresetTracks('CrossFadeEvidence', 'evidence', 24.2, 0.8),
    { id: 'reveal-hit', elementId: 'hit', property: 'opacity', keyframes: [{ at: 7, value: 0, easing: 'linear' }, { at: 11, value: 1, easing: 'ease-out' }] },
    { id: 'reveal-impact', elementId: 'impact', property: 'opacity', keyframes: [{ at: 7, value: 0, easing: 'linear' }, { at: 11, value: 1, easing: 'ease-out' }] },
    { id: 'reveal-damage', elementId: 'damage', property: 'opacity', keyframes: [{ at: 11, value: 0, easing: 'linear' }, { at: 16, value: 1, easing: 'ease-out' }] },
  ]
  const slide: SceneSlide = {
    id: 'gripgun-flow',
    layoutId: 'visual-flow',
    presenterNotes: 'GripGun은 발사체를 생성하지 않는다. Hugh의 입력은 서버로 전달되고, 서버가 camera Player View Point 기준 단일 Line Trace로 첫 blocking hit를 확정한다. impact location/normal VFX multicast는 unreliable이므로 전달 보장으로 설명하지 않는다.',
    posterCueId: 'evidence',
    elements: [
      title('eyebrow', 'GRIPGUN · SERVER-AUTHORITATIVE HITSCAN', 96, 42, 1320, { color: '#2563eb', fontSize: 20, fontWeight: 800 }),
      title('headline', '총알이 날아가지 않는다. 서버가 한 번 판정한다.', 96, 108, 1500),
      title('subhead', 'Client intent → server validation → camera Line Trace → hit/damage → impact cue', 96, 192, 1400, { color: '#4b5563', fontSize: 24, fontWeight: 600 }),
      card('client', 'HUGH\nlocal fire intent', 120, 350, 260, 150, { background: '#eff6ff' }),
      card('server', 'SERVER\ncombat · weapon · cooldown · ammo', 530, 300, 360, 220, { background: '#f8fafc', border: '3px solid #2563eb' }),
      card('hit', 'FIRST\nblocking hit\nActor + BoneName', 1120, 350, 270, 150, { background: '#fefce8', border: '3px solid #f59e0b', color: '#92400e' }, 0),
      { id: 'intent', type: 'connector', transform: { x: 380, y: 405, width: 150, height: 30, rotation: 0, opacity: 0, zIndex: 7 }, content: 'intent →', style: { color: '#2563eb', fontSize: 30, fontWeight: 800, pathProgress: 1 }, accessibilityLabel: 'client intent flows to server' },
      { id: 'ray', type: 'path', transform: { x: 885, y: 420, width: 235, height: 12, rotation: 0, opacity: 1, zIndex: 8 }, content: '', style: { borderRadius: 99, pathProgress: 0 }, accessibilityLabel: 'camera line trace' },
      { id: 'impact', type: 'shape', transform: { x: 1375, y: 386, width: 76, height: 76, rotation: 0, opacity: 0, zIndex: 9 }, content: '×', style: { background: '#f97316', color: '#ffffff', borderRadius: 999, fontSize: 54, fontWeight: 800, scale: 0.4 }, accessibilityLabel: 'impact location and normal' },
      card('damage', 'FPragmataDamageSpec\nreceiver health update', 1030, 610, 360, 130, { background: '#f0fdf4', border: '2px solid #22c55e', color: '#166534' }, 0),
      card('broadcast', 'impact location + normal\nunreliable VFX multicast', 520, 610, 380, 130, { background: '#f5f3ff', border: '2px solid #8b5cf6', color: '#6d28d9' }, 0),
      { id: 'evidence', type: 'image', transform: { x: 1450, y: 280, width: 360, height: 202, rotation: 0, opacity: 0, zIndex: 20 }, assetId: 'beta-enemy-hit', style: { borderRadius: 20, boxShadow: '0 18px 42px rgba(15, 23, 42, .2)' }, accessibilityLabel: 'Pragmata beta enemy hit evidence' },
      title('fact-note', '표현 금지: physical projectile · muzzle trace · delivery guarantee', 96, 970, 1600, { color: '#6b7280', fontSize: 20, fontWeight: 650 }),
    ],
    timeline: {
      duration: 28,
      cues: [
        { id: 'intro', at: 0, mode: 'auto', label: 'hitscan' },
        { id: 'intent', at: 3, mode: 'click', label: 'client intent' },
        { id: 'trace', at: 7, mode: 'click', label: 'single trace' },
        { id: 'impact', at: 11, mode: 'click', label: 'hit result' },
        { id: 'damage', at: 16, mode: 'click', label: 'damage' },
        { id: 'broadcast', at: 21, mode: 'click', label: 'impact cue' },
        { id: 'evidence', at: 25, mode: 'hold', label: 'build evidence' },
      ],
      tracks,
    },
  }
  return {
    schemaVersion: 1,
    viewport: { width: 1920, height: 1080 },
    assets: [
      { id: 'beta-enemy-hit', src: '/projects/pragmata-2p-beta/images/slide-15-enemy-hit.png', alt: '현재 beta 빌드의 적 타격 화면', fit: 'cover', focalPoint: { x: 0.5, y: 0.5 } },
      { id: 'beta-hugh-hud', src: '/projects/pragmata-2p-beta/images/slide-14-hugh-hud-dark.png', alt: 'Hugh 조작 HUD 화면', fit: 'cover', focalPoint: { x: 0.5, y: 0.5 } },
      { id: 'beta-combat', src: '/projects/pragmata-2p-beta/images/slide-03-combat-explosion.png', alt: 'GripGun 전투 장면', fit: 'cover', focalPoint: { x: 0.5, y: 0.5 } },
      { id: 'beta-hugh', src: '/projects/pragmata-2p-beta/images/slide-12-hugh-player-character-front.png', alt: 'Hugh 플레이어 캐릭터', fit: 'contain', focalPoint: { x: 0.5, y: 0.5 } },
    ],
    slides: [slide],
  }
}
