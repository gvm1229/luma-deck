<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { lockShortcuts, onSlideEnter, onSlideLeave, useNav, useSlideContext } from '@slidev/client'
import { parseDeckDocument } from '../../../src/studio/deck'
import { getPosterSceneTime, getSlidevInitialSceneTime } from '../../../src/studio/slidev-adapter'
import { presenterStateForSlide, transitionPresenter, type PresenterState } from '../../../src/studio/presenter-state'
import { renderScene } from '../../../studio/src/scene-renderer'
import betaEnemyHit from '../../pragmata-2p-beta/images/slide-15-enemy-hit.png'
import betaHughHud from '../../pragmata-2p-beta/images/slide-14-hugh-hud-dark.png'
import betaCombat from '../../pragmata-2p-beta/images/slide-03-combat-explosion.png'
import betaHugh from '../../pragmata-2p-beta/images/slide-12-hugh-player-character-front.png'
import deckJson from '../deck.luma.json'

const props = defineProps<{ slideId: string }>()
const root = ref<HTMLElement>()
const deck = parseDeckDocument(JSON.stringify(deckJson))
const slide = deck.slides.find(candidate => candidate.id === props.slideId)
if (!slide)
  throw new Error(`slide 없음: ${props.slideId}`)
const runtimeDocument = { schemaVersion: 1 as const, viewport: deck.viewport, assets: deck.assets, slides: deck.slides }
const nav = useNav()
const { $clicks } = useSlideContext()
const assetUrls = new Map([
  ['beta-enemy-hit', betaEnemyHit],
  ['beta-hugh-hud', betaHughHud],
  ['beta-combat', betaCombat],
  ['beta-hugh', betaHugh],
])
let time = 0
let frame: number | undefined
let lastFrame = 0
let unlockShortcuts: (() => void) | undefined
let playing = false
let state: PresenterState = presenterStateForSlide(deck, props.slideId)
let previousClicks = 0

function redraw() { if (root.value) renderScene(root.value, runtimeDocument, slide, time, { assetUrls }) }
function stop() { if (frame !== undefined) cancelAnimationFrame(frame); frame = undefined; unlockShortcuts?.(); unlockShortcuts = undefined; playing = false }
function seek(nextTime: number) { stop(); time = nextTime; redraw() }
function playTo(endTime: number, complete?: () => void) {
  stop()
  if (endTime <= time) { seek(endTime); complete?.(); return }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { seek(endTime); complete?.(); return }
  playing = true; unlockShortcuts = lockShortcuts(); lastFrame = performance.now()
  const tick = (now: number) => { time = Math.min(time + (now - lastFrame) / 1000, endTime); lastFrame = now; redraw(); if (time >= endTime) { stop(); redraw(); complete?.(); return }; frame = requestAnimationFrame(tick) }
  frame = requestAnimationFrame(tick)
}
function apply(event: 'enter' | 'next') {
  const output = transitionPresenter(deck, state, event)
  state = output.state
  time = output.renderTime
  redraw()
  if (output.shouldPlayTo !== undefined) playTo(output.shouldPlayTo, () => { state = transitionPresenter(deck, state, 'animationComplete').state; redraw() })
}
function syncClick(clicks: number) {
  const poster = getPosterSceneTime(slide, nav.isPrintMode.value, new URLSearchParams(location.search).has('lumadeckPoster'))
  if (poster !== undefined) return seek(poster)
  while (previousClicks < clicks) { previousClicks++; apply('next') }
}
function guard(event: Event) { if (playing) { event.preventDefault(); event.stopPropagation() } }
watch($clicks, clicks => syncClick(clicks))
function initializeScene() {
  previousClicks = 0
  state = presenterStateForSlide(deck, props.slideId)
  const initial = getSlidevInitialSceneTime(slide, nav.isPrintMode.value, new URLSearchParams(location.search).has('lumadeckPoster'))
  if (initial > 0) seek(initial)
  else apply('enter')
}
onSlideEnter(initializeScene)
onSlideLeave(() => { state = transitionPresenter(deck, state, 'leave').state; seek(0) })
onMounted(initializeScene)
onBeforeUnmount(stop)
</script>

<template><div ref="root" class="luma-scene" @pointerdown.capture="guard" /></template>

<style>
.slidev-layout.default:has(.luma-scene) { height: 100%; padding: 0; }
.luma-scene { position: relative; width: 100%; height: 100%; overflow: hidden; background: #f8fafc; }
.luma-scene .scene-element { position: absolute; display: flex; align-items: center; justify-content: center; white-space: pre-line; text-align: center; user-select: none; }
.luma-scene .scene-element-text { justify-content: flex-start; text-align: left; white-space: pre-wrap; }
.luma-scene .scene-element-image { overflow: hidden; }
.luma-scene .scene-element-image img { width: 100%; height: 100%; display: block; }
.luma-scene .scene-element-path, .luma-scene .scene-element-connector { justify-content: flex-start; overflow: visible; }
.luma-scene .scene-element-group { background: transparent !important; border: 0 !important; box-shadow: none !important; color: transparent !important; pointer-events: none; }
.luma-scene .scene-path-line { height: 100%; min-width: 0; overflow: hidden; background: #2563eb; border-radius: 9999px; clip-path: inset(0 round 9999px); box-shadow: 0 0 16px rgba(37, 99, 235, .55); }
.luma-scene .scene-connector-svg { width: 100%; height: 100%; overflow: visible; display: block; }
</style>
