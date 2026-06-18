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
