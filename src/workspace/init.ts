import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export interface InitWorkspaceOptions {
  readonly force?: boolean
  readonly projectName?: string
}

export async function initWorkspace(targetDir: string, options: InitWorkspaceOptions = {}): Promise<void> {
  await assertCanInitialize(targetDir, options)
  await mkdir(targetDir, { recursive: true })
  await mkdir(join(targetDir, 'components'), { recursive: true })
  await mkdir(join(targetDir, 'styles'), { recursive: true })

  await writeFile(join(targetDir, 'slides.md'), starterSlides(), 'utf8')
  await writeFile(join(targetDir, 'deck.json'), starterDeckJson(), 'utf8')
  await writeFile(join(targetDir, 'README.md'), starterReadme(options.projectName ?? 'this-project'), 'utf8')
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

- \`pnpm lumadeck dev <project>\`로 서버 실행
- \`slides.md\`, \`components/\`, \`styles/\` 편집
- Slidev hot reload로 즉시 확인
- \`pnpm lumadeck build <project>\`로 HTML 생성

---
layout: default
---

# Click Animation

<div class="grid grid-cols-2 gap-6">
  <MotionCard v-click>
    <h2 class="text-2xl font-bold">First idea</h2>
    <p class="opacity-70">Appears on click</p>
  </MotionCard>
  <MotionCard v-click>
    <h2 class="text-2xl font-bold">Second idea</h2>
    <p class="opacity-70">Reusable component + UnoCSS</p>
  </MotionCard>
</div>
`
}

function starterReadme(projectName: string): string {
  return `# ${projectName}

이 폴더는 gitignored LumaDeck authoring project.

## 실행

\`\`\`bash
pnpm lumadeck dev ${projectName}
pnpm lumadeck build ${projectName}
\`\`\`

## 편집 우선순위

1. \`slides.md\`
2. \`components/\`
3. \`styles/\`
4. \`uno.config.ts\`
5. \`deck.json\`, 초기 구조 재생성이 필요할 때만

\`slides.md\`, Vue components, styles가 실제 제작 source of truth.
\`deck.json\`에서 다시 render할 때는 기존 \`slides.md\`가 백업된 뒤 덮어쓰기됨.
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
