# LumaDeck

LumaDeck는 프롬프트를 구조화된 발표 자료로 바꾸고, Slidev를 통해 HTML/Vue 기반 프레젠테이션으로 렌더링하는 도구.

```text
User prompt -> LLM analysis -> Deck JSON -> Slidev Markdown -> HTML/Vue presentation
```

## 현재 상태

MVP scaffold 구현 단계.

현재 완료된 것:

- TypeScript/Node ESM 프로젝트 scaffold
- `lumadeck` CLI 기본 명령
- Deck JSON schema와 validation
- Deck JSON -> Slidev Markdown 생성
- `@slidev/theme-apple-basic` 기반 예제
- UnoCSS 기반 Slidev styling 방향
- Vitest 테스트

아직 미구현:

- Codex live-editing guide
- 고급 animation component library
- visual QA 자동화
- HTML 배포 가이드
- `deck.json`과 수동 편집된 `slides.md` 차이 audit/sync

## 설치

```bash
pnpm install
pnpm build
pnpm test
```

## CLI 사용

```bash
pnpm lumadeck init my-deck
pnpm lumadeck validate examples/apple-basic.deck.json
pnpm lumadeck render examples/apple-basic.deck.json -o projects/my-deck/slides.md
pnpm lumadeck dev projects/my-deck/slides.md
pnpm lumadeck build projects/my-deck/slides.md
```

`init`은 항상 gitignored `/projects/` 아래에 작업 폴더 생성. 예: `pnpm lumadeck init my-deck` -> `projects/my-deck/`.

`render`는 기존 `slides.md`를 기본으로 덮어쓰지 않음. 덮어쓰려면 `--force` 사용.

## 편집 방식

LumaDeck의 source of truth는 하이브리드.

- `deck.json`: 초기 생성, 검증, 재생성용
- `slides.md`, `components/`, `styles/`: 실제 제작 소스

개별 deck 프로젝트는 source repo에 추적하지 않음. 모든 개인/고객/실험 deck은 `/projects/` 아래의 단일 폴더에 보관.

Codex subscription이 있으면 실행 중인 dev server를 보면서 현재 Codex 세션에 편집을 요청. AI를 사용할 수 없을 때는 같은 파일을 사람이 직접 수정.

## 핵심 방향

Slidev를 직접 수정하는 프로젝트가 아니라, Slidev 위에 얹는 생성기/래퍼로 개발.

```text
luma-deck/
  src/ 또는 packages/          # LumaDeck 소스
  generator/ 또는 src/generator/ # 프롬프트/JSON/Markdown 변환
  layouts/                    # LumaDeck용 Slidev layout
  components/                 # LumaDeck용 Slidev component
  styles/                     # LumaDeck용 style/design system
  examples/                   # 예제 deck
  Docs/                       # 문서
  slidev/                     # embedded Slidev checkout, gitignored
```

## Slidev 사용 방침

- `slidev/`는 로컬 전용 embedded checkout
- `.gitignore`에 포함
- LumaDeck 코드는 `slidev/` 밖에 작성
- Slidev 내부 변경보다 wrapper, adapter, layout, component, style 확장을 우선
- Slidev 버전/커밋은 문서에 기록
- MVP styling engine은 Slidev 기본 UnoCSS 사용

초기 참고 Slidev clone:

```text
C:\Users\user\Documents\slidev
commit a1609ffa877a4df90ad1bf34006a85f8281097ef
release v52.16.0
```

## 문서

- `AGENTS.md`: AI agent 진입점
- `.agents/directives/`: 세부 agent 규칙
- `Docs/architecture.md`: 구조와 설계 방향
- `Docs/decisions.md`: 결정 기록

## 개발 메모

아직 package manager와 scaffold는 확정 전. TypeScript/Node 기반으로 시작하고, Slidev 생태계와 맞추기 위해 `pnpm` 우선 검토.
