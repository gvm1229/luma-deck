# Visual Studio v2 — Pragmata 2P 최종 발표 계획 초안

## 1. 상태와 결정

이 문서는 V1 GripGun vertical slice의 정적 구현·export 검증을 바탕으로 작성한 **계획 초안**이다. V2 구현 시작 권한은 아직 없다. 아래의 external evidence와 사용자 구현 승인이 모두 충족되어야 한다.

V1에서 확인된 결과:

- 브라우저에서 Markdown 없이 text, image, position, size, style, z-order, motion preset을 편집한다.
- 동일 scene JSON을 editor, Slidev wrapper, HTML build, PDF poster state가 사용한다.
- GripGun은 projectile actor가 아닌 server-authoritative single Line Trace로 표현한다.
- 외부 LLM API와 API key를 사용하지 않는다.

V1 미해결 항목:

- Unreal PIE host layout, Blueprint CDO, runtime numeric evidence
- project-비숙련 사람 reviewer 3명의 9/9 이해도
- 실제 최종 deck 전체의 scene inventory, timing, asset provenance

## 2. V2 시작 bar

V2 implementation agent는 아래가 모두 true일 때만 source 편집을 시작한다.

- [ ] V1 automated test/typecheck/build/export 재실행 통과
- [ ] Unreal PIE 두 host layout과 Blueprint CDO evidence 저장
- [ ] runtime-only claim과 source claim 불일치 0건
- [ ] 사람 reviewer 3명 × 질문 3개 = 이해도 9/9
- [ ] 이 계획에 대한 사용자의 V2 구현 승인

bar가 미통과이면 final deck copy에 runtime-only 숫자·보장 표현을 추가하지 않는다. agent는 evidence를 기록하고 V2 계획을 보완할 수는 있으나 구현은 시작하지 않는다.

## 3. 목표와 범위

목표는 `projects/pragmata-2p-final/`을 18분 발표와 5분 이하 live demo에 맞는 visual-centric deck으로 완성하는 것이다. 각 핵심 설명은 정지 hold frame만 보아도 이해되고, presenter click 사이에는 짧은 자동 animation으로 인과를 보인다.

포함:

- 전체 final deck의 scene inventory와 visual migration
- 공식 평가 기준 5개와 필수 발표 구성 14개 coverage
- reusable motion preset, presenter recovery, HTML/PDF parity
- 실제 current-build evidence·asset attribution·speaker notes

제외:

- Unreal gameplay/asset/C++ 수정
- external LLM API, cloud collaboration, video-editor 범위
- evidence 없는 placeholder, 상업성/원작 IP 확장 claim

## 4. 평가 기준 coverage matrix

| 평가 항목 | final 주장 | 증거 | scene/hold frame | 검증 |
| --- | --- | --- | --- | --- |
| 기술적 완성도 (30) | 2P loop, authority, 예외 처리 | current build, source/runtime trace | gameplay flow, GripGun | 사실 표·PIE replay |
| 문제 해결 (30) | 선택 이유, 디버깅, 개선 | issue/commit/log, before-after | challenge → resolution | source link 100% |
| 협업 (25) | 역할, 규칙, conflict 해결 | Git/PR, Notion, intent docs | collaboration flow | attribution review |
| 문서·발표 (10) | 구조적·시각적 전달 | notes, cue sheet, capture | section transition | timing/accessibility |
| 구현 가능성 (5) | 반복 가능한 2P experience | package, recovery demo | demo close | offline recovery |

각 행은 최소 하나의 audience claim, source-of-truth, visual/live evidence, scene ID를 가져야 한다. 하나라도 없으면 claim 삭제 또는 capture task를 먼저 만든다.

## 5. 실행 순서

한 loop에는 dependency가 충족된 최소 task 하나만 수행한다. source 수정 전 `AGENTS.md`, active session, git status를 다시 확인한다.

### V2-01. evidence lock와 deck audit

- [ ] `[FINAL]` slides, notes, assets, timings을 machine-readable inventory로 수집
- [ ] 각 claim을 C++/BP CDO/PIE/doc/Git evidence에 연결
- [ ] placeholder, stale beta copy, duplicate script를 제거 대상 목록으로 분류
- [ ] Unreal runtime·human reviewer evidence를 provenance와 함께 ledger에 연결

통과: 모든 final claim에 source와 owner가 있고 unsupported claim 0건.

### V2-02. narrative·timing map

- [ ] 18:00 종료를 기준으로 section별 time budget 배정
- [ ] live demo window를 270초 이하로 고정
- [ ] `slides.md` notes를 timing/copy source-of-truth로 통일
- [ ] speaker-note timestamp 단조 증가와 overlap 검사기 작성

통과: 마지막 timestamp `18:00`, demo ≤270초, overlap 0건.

### V2-03. scene inventory와 migration map

- [ ] final 모든 slide를 `keep / visual scene / static evidence / remove`로 분류
- [ ] beta 공통 내용과 final-only attribution을 분리
- [ ] 각 visual scene에 hold-frame message, cue count, poster cue, evidence asset 지정
- [ ] current-build foreground evidence와 title/Q&A background 보존 규칙 확인

통과: scene별 source, animation 목적, fallback hold frame, export poster가 모두 존재.

### V2-04. motion grammar 확장

- [ ] V1 `DrawRay`, `ImpactPulse`, `FocusRing`, `StateHighlight`, `IntentToServer`, `ResultBroadcast`, `CrossFadeEvidence` 재사용률 측정
- [ ] 두 scene 이상에서 쓰는 동작만 새 preset으로 추가
- [ ] diagram reveal, comparison swap, architecture route, demo handoff preset 후보 평가
- [ ] reduced motion과 keyboard presenter control 유지

통과: custom animation마다 정보 전달 목적이 있고 decorative-only motion 0건.

### V2-05. editor/runtime/export 확장

- [ ] 25장 이상 scene lazy load와 asset preload 검증
- [ ] previous/next/reset/emergency skip presenter recovery 추가
- [ ] schema migration/backward compatibility와 custom Vue escape hatch 경계 문서화
- [ ] offline HTML, PDF poster, font/media bundle parity 검증

통과: failure recovery가 rehearsed되고 export 누락/crop/font defect 0건.

### V2-06. final scene 제작

- [ ] 팀/개요/목표, user scenario, architecture, collaboration, troubleshooting, feedback, demo, reflection, attribution 순서 제작
- [ ] section당 최대 4장 원칙 적용
- [ ] 모든 image placeholder를 real evidence 또는 승인된 art로 교체
- [ ] caption, contrast, alt/accessibility label, source proof note 추가

통과: 평가 기준·필수 구성 coverage 100%, placeholder 0건, animation 없이도 scene 결론 이해.

### V2-07. rehearsal와 recovery

- [ ] 1920×1080, 1280×720 cue start/end visual regression
- [ ] editor/standalone/Slidev/HTML/PDF semantic parity 확인
- [ ] full presenter rehearsal 3회, demo recovery rehearsal 2회
- [ ] offline package, HTML, PDF, backup video recovery 순서 문서화

통과: 18분 내 3회 완료, cue skip/console error/unhandled rejection 0건, recovery rehearsal 성공.

## 6. 검증 matrix

| 영역 | 방법 | pass bar |
| --- | --- | --- |
| 사실 | claim → source/runtime evidence audit | unsupported claim 0 |
| 편집 | text/image/preset save-reopen | V1 time bar 유지 |
| animation | cue start/end captures, reset replay | state leakage/skip 0 |
| export | HTML local serve, PDF poster render | crop/font/asset defect 0 |
| 발표 | notes timing validator, rehearsal | 18:00, demo ≤270초 |
| 이해 | 비숙련 reviewer Q&A | 3명 9/9 |
| 접근성 | reduced motion, contrast, labels | hold frame readable |

## 7. ledger와 stop 조건

기록 위치:

```text
.agents/work/visual-studio-v2-pragmata-final/
  RUN_LOG.md
  CHECKPOINT.json
  evidence-index.md
  timing-report.json
  screenshots/
  rehearsal/
```

즉시 멈춤:

- source/runtime claim 모순
- Unreal 수정 또는 external LLM API 필요
- existing user change/active session conflict
- evidence 없는 숫자·asset·team attribution
- 같은 검증 실패 원인 3회 반복
- V2 scope 밖 generic video editor 필요

멈추면 마지막 성공 commit, 재현 명령, 제외한 claim, 필요한 사용자/Unreal 담당자 action을 checkpoint에 기록한다. acceptance bar를 낮추지 않는다.

## 8. V2 완료 정의

- official rubric와 필수 발표 구성 coverage 100%
- final claims/evidence/visual scene mapping 100%
- dynamic visual scene과 static hold frame 모두 정보 전달 가능
- runtime/human evidence 포함, placeholder 0건
- 18분 rehearsal, 5분 이하 demo, recovery path 검증
- editor/Slidev/HTML/PDF parity 및 visual regression 통과
- final approval 받은 build artifact와 presenter handoff 준비
