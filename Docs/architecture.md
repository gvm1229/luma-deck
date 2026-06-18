# LumaDeck Architecture

## 목적

프롬프트를 입력받아 구조화된 발표 자료로 변환하고, Slidev를 사용해 HTML/Vue 기반 프레젠테이션으로 렌더링.

## 기본 파이프라인

```text
User prompt
-> LLM analysis
-> Deck JSON
-> schema validation
-> Slidev Markdown
-> project-local layouts/components/styles
-> Slidev dev/build/export
```

## Slidev 사용 방식

- Slidev는 `slidev/` 폴더에 embedded checkout으로 배치
- `slidev/`는 `.gitignore` 처리
- LumaDeck 소스는 `slidev/` 밖에 작성
- Slidev core 수정 대신 wrapper, adapter, generated Markdown, custom layout/component/style 우선

## 초기 설계 후보

```text
src/
  cli/
  generator/
  schema/
  slidev/
layouts/
components/
styles/
examples/
Docs/
slidev/                 # local-only
```

## 구현 대상

- `Deck JSON` schema
- LLM prompt-to-json 변환
- JSON validation
- JSON to Slidev Markdown 변환
- Slidev dev/build/export wrapper
- 예제 deck와 smoke test

## 주의점

- LLM 출력은 신뢰하지 말고 schema 검증 필요
- Slidev PPTX export는 이미지 기반이므로 편집 가능한 PowerPoint로 설명 금지
- embedded `slidev/`와 `.omx/`는 Git에 포함하지 않음
