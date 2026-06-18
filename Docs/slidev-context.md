# Slidev Context Map

## 목적

Deck 편집 전 Slidev의 내장 기능을 먼저 찾기 위한 capability map.

원칙:

- Slidev Markdown/frontmatter/layout/component 기능 우선
- UnoCSS utility와 shortcuts 우선
- Typography는 Pretendard 우선
- custom Vue/CSS는 Slidev-native 기능으로 부족할 때 추가
- Slidev core 수정 금지, 사용자가 명시 요청한 경우만 예외

## 참조 우선순위

1. `slidev/` checkout, 존재할 때
2. `C:\Users\user\Documents\slidev` local reference clone
3. 공식 문서: https://sli.dev
4. 공식 source: https://github.com/slidevjs/slidev
5. package docs, release notes

## 작업 전 Capability Pass

Deck 작업 전 다음을 짧게 수행:

1. 요청을 Slidev 기능 영역으로 분류
2. 아래 라우팅 맵에서 관련 문서 확인
3. 내장 syntax/layout/component/config로 가능한지 판단
4. 필요한 경우에만 `projects/<name>/components/`, `styles/`, `uno.config.ts` 확장
5. `pnpm lumadeck dev <name>` 또는 `pnpm lumadeck build <name>` 기준으로 검증

## 라우팅 맵

| 요청 유형 | 먼저 볼 문서 | 로컬 경로 |
| --- | --- | --- |
| Markdown syntax, frontmatter, notes | https://sli.dev/guide/syntax | `docs/guide/syntax.md` |
| Built-in layouts | https://sli.dev/builtin/layouts | `docs/builtin/layouts.md`, `docs/guide/layout.md` |
| Built-in components | https://sli.dev/builtin/components | `docs/builtin/components.md`, `docs/guide/component.md` |
| Clicks, reveal, step animation | https://sli.dev/guide/animations | `docs/guide/animations.md`, `docs/features/click-marker.md` |
| Code animation | https://sli.dev/features/shiki-magic-move | `docs/features/shiki-magic-move.md` |
| UnoCSS config | https://sli.dev/custom/config-unocss | `docs/custom/config-unocss.md` |
| UnoCSS shortcuts | https://sli.dev/custom/config-shortcuts | `docs/custom/config-shortcuts.md` |
| Fonts | https://sli.dev/custom/config-fonts | `docs/custom/config-fonts.md` |
| Slide-local style | https://sli.dev/features/slide-scope-style | `docs/features/slide-scope-style.md` |
| Directory structure | https://sli.dev/custom/directory-structure | `docs/custom/directory-structure.md` |
| Global layers | https://sli.dev/features/global-layers | `docs/features/global-layers.md` |
| Importing slides | https://sli.dev/features/importing-slides | `docs/features/importing-slides.md` |
| Import snippets | https://sli.dev/features/import-snippet | `docs/features/import-snippet.md` |
| Twoslash code | https://sli.dev/features/twoslash | `docs/features/twoslash.md` |
| Monaco editor/run/write | https://sli.dev/features/monaco-editor | `docs/features/monaco-editor.md`, `docs/features/monaco-run.md`, `docs/features/monaco-write.md` |
| Mermaid diagrams | https://sli.dev/features/mermaid | `docs/features/mermaid.md`, `docs/custom/config-mermaid.md` |
| PlantUML diagrams | https://sli.dev/features/plantuml | `docs/features/plantuml.md` |
| Icons | https://sli.dev/features/icons | `docs/features/icons.md` |
| Rough marker | https://sli.dev/features/rough-marker | `docs/features/rough-marker.md` |
| Drawing | https://sli.dev/features/drawing | `docs/features/drawing.md` |
| Draggable elements | https://sli.dev/features/draggable | `docs/features/draggable.md` |
| Timer | https://sli.dev/features/timer | `docs/features/timer.md` |
| Remote access | https://sli.dev/features/remote-access | `docs/features/remote-access.md` |
| Recording | https://sli.dev/features/recording | `docs/features/recording.md` |
| CLI/dev/build/export | https://sli.dev/builtin/cli | `docs/builtin/cli.md`, `docs/guide/exporting.md` |
| Hosting | https://sli.dev/guide/hosting | `docs/guide/hosting.md` |
| Vite/Vue/config extension | https://sli.dev/custom/config-vite | `docs/custom/config-vite.md`, `docs/custom/config-vue.md` |
| Parser/routes/highlighter | https://sli.dev/custom/config-parser | `docs/custom/config-parser.md`, `docs/custom/config-routes.md`, `docs/custom/config-highlighter.md` |

## Deck 편집 기준

- 일반 내용/구조: `slides.md`
- 반복 UI: `components/*.vue`
- deck 전역 style: `styles/index.css`
- 기본 font: `Pretendard Variable`
- utility shortcuts/presets: `uno.config.ts`
- source repo 예제나 `src/`는 사용자가 source 변경을 요청한 경우만 수정

## 자주 놓치는 기능

- `v-click`, click marker, click range로 단계적 reveal 구성
- `Shiki Magic Move`로 코드 변경 애니메이션 구성
- built-in components로 TOC, arrow, counter, code, link, note류 구성
- Mermaid/PlantUML로 diagram을 이미지 없이 유지
- global layers로 deck 공통 배경, footer, progress, overlay 구성
- slide scope style로 특정 slide 전용 CSS 격리
- Monaco 기능으로 live coding 또는 interactive code slide 구성
- remote access, drawing, recording은 발표 운영 기능으로 별도 검토
