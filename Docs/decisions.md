# LumaDeck Decisions

## 2026-06-18: 프로젝트 이름

- Product display name: `LumaDeck`
- Repo/folder name: `luma-deck`
- Package name: `luma-deck`
- CLI command: `lumadeck`

## 2026-06-18: Slidev 활용 방식

결정:

- Slidev를 렌더링 엔진으로 활용
- 프로젝트 내부 `slidev/` 폴더에 checkout 배치
- `slidev/`는 Git에서 제외
- LumaDeck 코드는 Slidev 외부 wrapper/generator로 구현

이유:

- Slidev Markdown과 YAML frontmatter가 LLM 생성에 적합
- Slidev layout 선택이 frontmatter 기반이라 자동 레이아웃 결정과 잘 맞음
- Vue/Vite/UnoCSS 기반 확장이 가능
- dev/build/export 기능이 이미 존재

주의:

- Prompt interpretation, JSON schema, validation, semantic layout selection은 LumaDeck에서 직접 구현
- Slidev PPTX export는 이미지 기반

## 2026-06-18: Codex 기반 라이브 편집

결정:

- LumaDeck은 API key 기반 LLM provider를 직접 호출하지 않음
- 활성 Codex subscription/session이 deck 편집 지능 계층
- 사용자는 실행 중인 Slidev dev server를 보며 Codex에 편집 요청 가능
- AI 사용이 불가능한 경우에도 `slides.md`, `components/`, `styles/`를 직접 편집 가능

이유:

- 별도 API key 없이 사용 가능
- Slidev Markdown/Vue/CSS를 사람이 직접 고칠 수 있어 fallback 확보
- HTML/Vue 기반 rich animation을 Codex가 파일 단위로 점진 구현 가능

## 2026-06-18: Deck project 보관 위치

결정:

- 이 repository는 LumaDeck source repo
- 개별 deck 작업물은 모두 gitignored `projects/<name>/` 아래 단일 폴더에 보관
- `lumadeck init <name>`은 `projects/<name>/` 생성
- `lumadeck validate/render/dev/build <name>`은 `projects/<name>/deck.json` 또는 `projects/<name>/slides.md`를 자동 해석

이유:

- 개인/고객/실험 deck이 source repo history에 섞이는 문제 방지
- 새 AI 세션이 source 코드 변경과 deck 편집을 명확히 구분 가능
- 프로젝트 이름만으로 반복 작업 가능
