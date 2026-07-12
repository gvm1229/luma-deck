<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { lockShortcuts, onSlideEnter, onSlideLeave, useNav, useSlideContext } from '@slidev/client'
import { validateSceneDocument } from '../../../src/studio/schema'
import { clickCountToSceneTime, getPosterSceneTime } from '../../../src/studio/slidev-adapter'
import { renderScene } from '../../../studio/src/scene-renderer'
import betaEnemyHit from '../../pragmata-2p-beta/images/slide-15-enemy-hit.png'
import sceneJson from '../scene.luma.json'

const root = ref<HTMLElement>()
const scene = validateSceneDocument(sceneJson)
const slide = scene.slides[0]
const nav = useNav()
const { $clicks } = useSlideContext()
const assetUrls = new Map([['beta-enemy-hit', betaEnemyHit]])
let time = 0
let frame: number | undefined
let lastFrame = 0
let unlockShortcuts: (() => void) | undefined
let playing = false

function redraw() {
  if (root.value)
    renderScene(root.value, scene, slide, time, { assetUrls })
}

function stop() {
  if (frame !== undefined)
    cancelAnimationFrame(frame)
  frame = undefined
  unlockShortcuts?.()
  unlockShortcuts = undefined
  playing = false
}

function seek(nextTime: number) {
  stop()
  time = nextTime
  redraw()
}

function playTo(endTime: number) {
  stop()
  if (endTime <= time) {
    seek(endTime)
    return
  }
  playing = true
  unlockShortcuts = lockShortcuts()
  lastFrame = performance.now()
  const tick = (now: number) => {
    time = Math.min(time + (now - lastFrame) / 1000, endTime)
    lastFrame = now
    redraw()
    if (time >= endTime) {
      stop()
      redraw()
      return
    }
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

function syncClick(clicks: number) {
  const poster = getPosterSceneTime(slide, nav.isPrintMode.value, new URLSearchParams(location.search).has('lumadeckPoster'))
  if (poster !== undefined) {
    seek(poster)
    return
  }
  playTo(clickCountToSceneTime(slide, clicks))
}

function guardPointerDown(event: Event) {
  if (playing) {
    event.preventDefault()
    event.stopPropagation()
  }
}

function advanceOrGuard(event: Event) {
  if (playing) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  if (!nav.isPrintMode.value) {
    event.preventDefault()
    event.stopPropagation()
    void nav.next()
  }
}

watch($clicks, clicks => syncClick(clicks), { immediate: true })
onSlideEnter(() => syncClick($clicks.value))
onSlideLeave(() => seek(0))
onMounted(redraw)
onBeforeUnmount(stop)
</script>

<template>
  <div ref="root" class="luma-scene" @pointerdown.capture="guardPointerDown" @click.capture="advanceOrGuard" />
</template>

<style>
.slidev-layout.cover:has(.luma-scene) { height: 100%; padding: 0; }
.luma-scene { position: relative; width: 100%; height: 100%; overflow: hidden; background: #f8fafc; }
.luma-scene .scene-element { position: absolute; display: flex; align-items: center; justify-content: center; white-space: pre-line; text-align: center; user-select: none; }
.luma-scene .scene-element-text { justify-content: flex-start; text-align: left; white-space: pre-wrap; }
.luma-scene .scene-element-image { overflow: hidden; }
.luma-scene .scene-element-image img { width: 100%; height: 100%; display: block; }
.luma-scene .scene-element-path { justify-content: flex-start; }
.luma-scene .scene-path-line { height: 100%; min-width: 0; background: #2563eb; border-radius: 999px; box-shadow: 0 0 16px rgba(37, 99, 235, .55); }
</style>
