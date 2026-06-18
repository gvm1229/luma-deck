# LumaDeck Architecture

## 목적

Codex 세션 또는 사용자가 Slidev deck을 라이브로 편집하고, Slidev를 사용해 HTML/Vue 기반 프레젠테이션으로 렌더링.

## 기본 파이프라인

```text
Deck JSON
-> schema validation
-> Slidev Markdown
-> project-local layouts/components/styles
-> Slidev dev/build/export
```

Deck JSON은 초기 생성과 검증을 위한 선택적 시작점. 실제 제작 source of truth는 `projects/<name>/slides.md`, `projects/<name>/components/`, `projects/<name>/styles/`.

라이브 편집 파이프라인:

```text
User request
-> active Codex session edits project files
-> Slidev dev server hot reload
-> user reviews in browser
-> Slidev build outputs static HTML
```

## Slidev 사용 방식

- Slidev는 `slidev/` 폴더에 embedded checkout으로 배치
- `slidev/`는 `.gitignore` 처리
- LumaDeck 소스는 `slidev/` 밖에 작성
- Slidev core 수정 대신 wrapper, adapter, generated Markdown, custom layout/component/style 우선
- 개별 deck 프로젝트는 `projects/<name>/` 아래에 보관하고 Git에는 포함하지 않음
- LumaDeck은 API key 기반 LLM provider를 호출하지 않음. 활성 Codex 세션이 편집 지능 계층

## 초기 설계 후보

```text
src/
  cli/
  generator/
  schema/
  slidev/
  workspace/
examples/
Docs/
projects/               # local-only deck workspaces, gitignored
slidev/                 # local-only
```

## 구현 대상

- `Deck JSON` schema
- JSON validation
- JSON to Slidev Markdown 변환
- Slidev dev/build/export wrapper
- 예제 deck와 smoke test
- 프로젝트 이름 기반 `projects/<name>` 해석

## 주의점

- LLM 출력은 신뢰하지 말고 schema 검증 필요
- Slidev PPTX export는 이미지 기반이므로 편집 가능한 PowerPoint로 설명 금지
- embedded `slidev/`와 `.omx/`는 Git에 포함하지 않음
- `projects/`는 개인/고객/실험 deck을 담는 gitignored 작업 영역
- `examples/`는 source repo 예제이므로 일반 deck 작업 요청에서 수정하지 않음
