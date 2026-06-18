import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export interface InitWorkspaceOptions {
  readonly force?: boolean
}

export async function initWorkspace(targetDir: string, options: InitWorkspaceOptions = {}): Promise<void> {
  await assertCanInitialize(targetDir, options)
  await mkdir(targetDir, { recursive: true })
  await mkdir(join(targetDir, 'components'), { recursive: true })
  await mkdir(join(targetDir, 'styles'), { recursive: true })

  await writeFile(join(targetDir, 'slides.md'), starterSlides(), 'utf8')
  await writeFile(join(targetDir, 'deck.json'), starterDeckJson(), 'utf8')
  await writeFile(join(targetDir, 'styles', 'index.css'), starterStyles(), 'utf8')
  await writeFile(join(targetDir, 'uno.config.ts'), starterUnoConfig(), 'utf8')
  await writeFile(join(targetDir, 'components', 'MotionCard.vue'), starterMotionCard(), 'utf8')
}

async function assertCanInitialize(targetDir: string, options: InitWorkspaceOptions): Promise<void> {
  try {
    const entries = await readdir(targetDir)

    if (entries.length > 0 && !options.force)
      throw new Error(`대상 폴더가 비어 있지 않음: ${targetDir}\n덮어쓰려면 --force 사용`)
  }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT')
      return

    throw error
  }
}

function starterSlides(): string {
  return `---
theme: apple-basic
title: "LumaDeck"
info: |
  LumaDeck live authoring workspace.
---

# LumaDeck

AI와 수동 편집을 모두 지원하는 Slidev deck

---
layout: section
---

# Live Editing

Codex 또는 사용자가 이 파일을 직접 수정

---
layout: bullets
---

# Workflow

- \`lumadeck dev slides.md\`로 서버 실행
- \`slides.md\`, \`components/\`, \`styles/\` 편집
- Slidev hot reload로 즉시 확인
- \`lumadeck build slides.md\`로 HTML 생성
`
}

function starterDeckJson(): string {
  return `${JSON.stringify({
    title: 'LumaDeck',
    subtitle: 'Live Slidev authoring with Codex',
    author: 'LumaDeck',
    theme: 'apple-basic',
    slides: [
      {
        layout: 'intro',
        title: 'LumaDeck',
        subtitle: 'AI와 수동 편집을 모두 지원하는 Slidev deck',
      },
      {
        layout: 'bullets',
        title: 'Workflow',
        body: [
          'Codex 세션에 편집 요청',
          'slides.md, components/, styles/ 직접 수정 가능',
          'Slidev dev server에서 즉시 확인',
        ],
      },
    ],
  }, null, 2)}\n`
}

function starterStyles(): string {
  return `.slide-title {
  letter-spacing: -0.02em;
}

.motion-card {
  border: 1px solid rgb(255 255 255 / 0.16);
  border-radius: 24px;
  padding: 1.25rem;
  background: rgb(255 255 255 / 0.08);
  backdrop-filter: blur(18px);
  transition: transform 240ms ease, opacity 240ms ease;
}

.motion-card:hover {
  transform: translateY(-4px);
}
`
}

function starterUnoConfig(): string {
  return `import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    'slide-title': 'text-5xl font-bold leading-tight',
    'slide-kicker': 'text-sm uppercase tracking-widest opacity-70',
    'glass-panel': 'rounded-2xl bg-white/10 backdrop-blur border border-white/15',
    'motion-card': 'transition duration-300 ease-out hover:-translate-y-1',
  },
})
`
}

function starterMotionCard(): string {
  return `<template>
  <div class="motion-card">
    <slot />
  </div>
</template>
`
}
