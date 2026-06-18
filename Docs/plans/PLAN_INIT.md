# LumaDeck MVP 초기 구현 계획

## 요약

- 목표: Codex 세션이 Slidev deck을 직접 수정하고, 사용자는 실행 중인 웹 서버에서 즉시 확인하는 라이브 발표 제작 환경 구축
- 최종 산출물: `@slidev/theme-apple-basic` + UnoCSS 기반 rich animation HTML slide deck
- AI 전략: API key 없음. LumaDeck은 LLM API를 호출하지 않고, Codex subscription/active session을 제작 파트너로 사용
- GitHub: local scaffold 완료 후 `origin`을 `https://github.com/gvm1229/luma-deck.git`로 연결해 initial commit/push
- 문서 산출물: 구현 시작 시 `Docs/plans/PLAN_INIT.md` 생성 후 이 계획과 동일한 내용 기록
- 개별 LumaDeck 작업 프로젝트는 source repo에 추적하지 않고 gitignored `/projects/` 아래 단일 폴더에 보관

## 핵심 구현

- TypeScript/Node ESM + `pnpm` scaffold 구성
- 의존성:
  - `@slidev/cli`
  - `@slidev/theme-apple-basic`
  - `zod`
  - `tsx`
  - `typescript`
  - `vitest`
- Tailwind CSS는 MVP에서 사용하지 않음
- UnoCSS는 Slidev 기본 styling engine으로 유지하고, LumaDeck 전체 MVP의 utility styling 기준으로 사용
- `lumadeck` CLI:
  - `lumadeck init <name>`: gitignored `projects/<name>/` 아래 Slidev 작업 폴더 생성
  - `lumadeck validate <project|deck.json>`: Deck JSON 검증
  - `lumadeck render <project|deck.json> [-o slides.md]`: 사람이 편집 가능한 초기 Slidev Markdown 생성
  - `lumadeck dev <project|slides.md>`: Slidev dev server 실행
  - `lumadeck build <project|slides.md>`: HTML 정적 빌드 생성
- `render`는 기존 파일을 기본으로 덮어쓰지 않음. 덮어쓰기는 명시적 `--force` 필요

## 생성 결과와 편집 모델

- `lumadeck render` 결과는 최종 디자인이 아니라 좋은 초안:
  - `theme: apple-basic` frontmatter 포함
  - `intro`, `section`, `image-right`, `bullets`, `quote`, `fact`, `3-images`, `image` 등 Apple Basic layout 사용
  - 제목, 본문, 이미지, 인용, speaker notes를 읽기 쉬운 Slidev Markdown으로 출력
  - 기본 click syntax 정도만 사용하고, 복잡한 custom animation은 이후 편집 단계에서 구현
- source of truth는 하이브리드:
  - `deck.json`: 초기 생성/검증/재생성용
  - `slides.md`, `components/`, `styles/`: 실제 제작 소스
- 사용자는 두 방식 모두 가능:
  - AI 사용: Codex 세션에 “3번 슬라이드에 비교 애니메이션 추가”처럼 요청
  - 수동 fallback: `slides.md`, `components/`, `styles/` 직접 편집
- AI subscription이 없어도 Slidev Markdown + Vue + UnoCSS 파일을 직접 수정해 계속 제작 가능

## UnoCSS/Styling 설계

- UnoCSS를 LumaDeck MVP의 단일 utility styling engine으로 사용
- 사용자는 Tailwind와 유사한 utility class 감각으로 작성:
  - `flex`, `grid`, `text-5xl`, `font-bold`, `mt-8`, `opacity-80`, `rounded-xl` 등
- `lumadeck init`이 deck 폴더에 생성:
  - `slides.md`
  - `components/`
  - `styles/index.css`
  - 필요 시 `uno.config.ts`
- 반복 스타일은 UnoCSS shortcuts로 정의:
  - 예: `slide-title`, `slide-kicker`, `glass-panel`, `motion-card`
- rich animation은 우선순위:
  - Slidev click syntax
  - UnoCSS utility/shortcuts
  - `styles/index.css` custom keyframes
  - 재사용 Vue components

## 라이브 작업 흐름

- 초기 생성:
  - `lumadeck init my-deck`
  - `lumadeck render my-deck --force`
- 라이브 편집:
  - `lumadeck dev my-deck`
  - 브라우저에서 Slidev 확인
  - Codex 또는 사용자가 `slides.md`, `components/`, `styles/` 수정
  - Slidev hot reload로 즉시 확인
- 최종 빌드:
  - `lumadeck build my-deck`
  - HTML 정적 산출물 생성

## 테스트 계획

- schema:
  - 유효한 Apple Basic deck 통과
  - 필수 필드 누락 실패
  - 지원하지 않는 layout 실패
- generator:
  - `theme: apple-basic` 포함 검증
  - 주요 Apple Basic layout별 Markdown 생성 검증
  - overwrite 보호 검증
- CLI:
  - `init`, `validate`, `render`, `dev/build` command wiring 검증
- styling:
  - 생성된 deck이 Slidev/UnoCSS 기본 utility class로 렌더 가능한지 확인
  - `styles/index.css`와 optional `uno.config.ts` 구조 검증
- smoke:
  - `pnpm build`
  - `pnpm test`
  - `pnpm lumadeck render examples/apple-basic.deck.json -o examples/apple-basic.slides.md`

## 완료 후 다음 단계

- `Docs/plans/PLAN_INIT.md`를 기준으로 구현 이력 갱신
- Codex live-editing guide 추가:
  - 슬라이드 번호/제목 기준 edit targeting
  - 변경 요청 예시
  - 수동 편집 fallback 문서
- 새 세션은 `Docs/live-editing-guide.md`를 우선 참고해 deck project와 source repo 작업을 구분
- rich animation layer 확장:
  - Slidev click syntax 패턴
  - UnoCSS shortcuts
  - reusable Vue animation components
- visual QA:
  - Playwright screenshot smoke test
  - 주요 layout별 desktop/mobile 확인
- export/배포:
  - HTML 정적 빌드 산출물 경로 문서화
  - GitHub Pages 또는 정적 호스팅 가이드
- 선택적 sync:
  - 수동/Codex 편집 후 `deck.json`과 `slides.md` 차이를 요약하는 audit 명령 검토

## 참고와 가정

- GitHub repo: [gvm1229/luma-deck](https://github.com/gvm1229/luma-deck)
- Apple Basic theme: [`@slidev/theme-apple-basic`](https://github.com/slidevjs/themes/tree/main/packages/theme-apple-basic)
- Slidev UnoCSS config: [Slidev UnoCSS docs](https://sli.dev/custom/config-unocss)
- Slidev directory/style structure: [Slidev directory structure](https://sli.dev/custom/directory-structure)
- 현재 폴더는 아직 Git 저장소가 아니므로 initial git setup과 push는 구현 단계에서 수행
