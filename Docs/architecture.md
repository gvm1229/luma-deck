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

패키징 파이프라인:

```text
Slidev Markdown
-> Slidev static HTML build
-> Electron app staging
-> lumadeck:// protocol로 HTML/assets 로드
-> platform package (.exe, .dmg, .zip)
```

## Slidev 사용 방식

- Slidev는 `slidev/` 폴더에 embedded checkout으로 배치
- `slidev/`는 `.gitignore` 처리
- LumaDeck 소스는 `slidev/` 밖에 작성
- Slidev core 수정 대신 wrapper, adapter, generated Markdown, custom layout/component/style 우선
- 개별 deck 프로젝트는 `projects/<name>/` 아래에 보관하고 Git에는 포함하지 않음
- LumaDeck은 API key 기반 LLM provider를 호출하지 않음. 활성 Codex 세션이 편집 지능 계층

## Source와 산출물 경계

- `projects/<name>/`는 deck source 전용
- `projects/<name>/slides.md`, `components/`, `styles/`, `images/`, `references/`, `uno.config.ts`가 실제 편집 대상
- HTML build, visual review, desktop package, PPTX 진단 결과, log, backup은 `artifacts/<name>/` 아래에 둠
- `artifacts/`는 local-only이며 Git에 포함하지 않음
- root `backup/`, `dist/`, `node_modules/`, embedded `slidev/`도 Git에 포함하지 않음

## Electron 패키징 구조

LumaDeck desktop package는 Slidev를 fork하지 않고 완성된 static HTML deck을 Electron shell 안에 넣는다.

- `deck:build`가 Slidev HTML 산출물을 생성
- packaging command가 HTML 산출물을 임시 Electron app으로 staging
- Electron main process가 `lumadeck://deck/index.html`을 등록
- renderer는 일반 브라우저처럼 Slidev SPA를 실행
- 외부 링크와 YouTube iframe은 Electron shell 밖의 web URL로 유지

`index.html`을 직접 double-click하는 방식은 신뢰할 수 없다. Slidev build는 ES module, lazy chunk, asset path를 사용하므로 `file://` origin에서 CORS와 module loading 문제가 생길 수 있다. Electron package는 custom protocol을 secure origin처럼 다루게 해 이 문제를 피한다.

Windows 배포:

- primary artifact는 portable `.exe`
- 설치 없이 실행 가능
- 코드 서명 인증서가 없으면 Windows trust prompt는 완전히 제거할 수 없음

macOS 배포:

- primary share artifact는 `.dmg`
- `.dmg` 내부에서 사용자가 `.app` bundle을 실행하거나 Applications로 이동
- `.zip`은 fallback 또는 update 용도
- 신뢰 가능한 공개 배포에는 Apple Developer ID signing과 notarization 필요
- macOS signing/notarization은 macOS 환경에서 검증해야 함

## 내부 진단: PPTX moving media

`deck:pptx-spike`는 user-facing export가 아니다. 이 명령은 PowerPoint 파일 안에 원본 GIF가 `.gif` media로 보존되는지만 확인하는 내부 진단 도구다.

- 목적: 향후 PPTX export 가능성 판단을 위한 media compatibility 증거 수집
- 확인 대상: source GIF가 PPTX package의 `ppt/media/*.gif`로 남는지
- 하지 않는 일: Slidev layout 재현, click state 변환, editable slide 생성, YouTube iframe offline 변환
- 일반 배포 산출물로 사용하지 않음

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
