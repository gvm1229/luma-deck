# LumaDeck Live Editing Guide

## 목적

새 AI 세션이 LumaDeck source repo와 개별 deck 프로젝트를 구분하고, 실행 중인 Slidev deck을 안전하게 편집하기 위한 기준.

## 핵심 규칙

- 이 repo는 LumaDeck source repo
- 개별 deck 프로젝트는 gitignored `projects/<name>/` 아래에만 보관
- 사용자가 프로젝트 이름만 말하면 `projects/<name>/`로 해석
- 일반 deck 작업에서는 `examples/`, `src/`, `Docs/`를 수정하지 않음
- API key 또는 외부 LLM provider 설정을 만들지 않음
- 활성 Codex 세션이 사용자의 자연어 요청을 파일 변경으로 바꾸는 편집자 역할

## 새 프로젝트 시작

```bash
pnpm lumadeck init my-deck
pnpm lumadeck dev my-deck
```

필요하면 `deck.json`에서 `slides.md` 재생성:

```bash
pnpm lumadeck render my-deck --force
pnpm lumadeck dev my-deck
```

프로젝트 이름 shorthand:

| 명령 | 해석 |
| --- | --- |
| `pnpm lumadeck validate my-deck` | `projects/my-deck/deck.json` |
| `pnpm lumadeck render my-deck` | `projects/my-deck/deck.json` -> `projects/my-deck/slides.md` |
| `pnpm lumadeck dev my-deck` | `projects/my-deck/slides.md` |
| `pnpm lumadeck build my-deck` | `projects/my-deck/slides.md` |

## Deck 편집 우선순위

1. `projects/<name>/slides.md`
2. `projects/<name>/components/`
3. `projects/<name>/styles/`
4. `projects/<name>/uno.config.ts`
5. `projects/<name>/deck.json`, 초기 구조를 다시 생성해야 할 때만

`deck.json`은 시작점과 검증용. 실제 제작 source of truth는 `slides.md`, Vue components, styles.

## 라이브 편집 절차

1. 대상 프로젝트 확인: `projects/<name>/`
2. dev server 실행 또는 기존 실행 상태 확인: `pnpm lumadeck dev <name>`
3. `Docs/slidev-context.md`로 Slidev capability pass 수행
4. 사용자 요청을 slide 번호, title, 또는 인접 content 기준으로 매핑
5. `slides.md`와 필요한 component/style만 수정
6. 필요에 따라 `pnpm lumadeck build <name>` 또는 focused check 실행
7. source repo 파일을 바꾼 경우에만 `pnpm build`, `pnpm test`

## Styling 기준

- MVP styling engine은 Slidev 기본 UnoCSS
- Tailwind CSS는 사용하지 않음
- 기본 typography는 Pretendard
- `slides.md` frontmatter의 `fonts.sans`는 `Pretendard Variable` 유지
- project global style은 `pretendard/dist/web/variable/pretendardvariable.css`를 import
- Tailwind와 유사한 utility class 감각으로 작성 가능
- 반복 스타일은 `uno.config.ts` shortcuts 또는 `styles/index.css`에 정리
- rich animation 우선순위:
  - Slidev click syntax
  - UnoCSS utility/shortcuts
  - CSS keyframes/transitions
  - reusable Vue components

## Slidev 기능 활용 요청 예시

Codex에게 deck 편집을 요청할 때는 Slidev 기능 검토를 함께 요구하면 좋음.

- "Slidev 기능을 먼저 확인하고 4번 슬라이드에 단계별 click animation 추가"
- "Monaco 또는 Shiki 기능이 맞는지 판단해서 코드 데모 슬라이드 개선"
- "Mermaid/PlantUML 중 적절한 방식으로 아키텍처 다이어그램 추가"
- "built-in layout과 Apple Basic theme를 유지하면서 비교 슬라이드 구성"
- "global layer나 slide-scope style이 맞는지 확인하고 footer 추가"

수동 편집 fallback:

- Slidev capability map: `Docs/slidev-context.md`
- 공식 Slidev docs: https://sli.dev
- Apple Basic theme: https://github.com/slidevjs/themes/tree/main/packages/theme-apple-basic

## 주의

- `projects/`는 gitignored이므로 deck 변경을 commit 대상으로 보지 않음
- 개인/고객 자료, 이미지, export 산출물은 source repo에 올리지 않음
- Slidev PPTX export는 이미지 기반. 편집 가능한 PowerPoint로 설명하지 않음
- embedded `slidev/` checkout은 reference/runtime용. 직접 수정하지 않음
