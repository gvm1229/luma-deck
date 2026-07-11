# LumaDeck Visual Studio v2 — Editable Presentation·Rich Motion 구현 계획

## 1. 결정

V2를 **Slidev와 유사한 다중 슬라이드 presentation editor**로 재정의한다.

V1은 scene document에 `slides[]`를 두었지만 editor와 Slidev adapter가 첫 slide만 사용한다. 따라서 V1은 presentation prototype이 아니라 single-scene editor spike로 판정한다.

근거:

- document model은 다중 slide 수용: `src/studio/schema.ts:60-77`
- editor는 `slides[0]` 고정: `studio/src/main.ts:58-60`
- prototype Slidev component도 `slides[0]` 고정: `projects/pragmata-2p-gripgun-prototype/components/LumaScene.vue:10-24`
- renderer는 text/image와 단순 horizontal path 중심: `studio/src/scene-renderer.ts:20-63`
- timeline은 scalar property와 4개 easing만 지원: `src/studio/timeline.ts:33-97`
- final deck은 현재 약 27장: `projects/pragmata-2p-final/slides.md:1-826`

V2의 두 축:

1. **Editable presentation**: slide 생성·복제·삭제·정렬·전환·발표·export를 브라우저에서 수행
2. **Information motion**: reference 영상처럼 한 번에 한 개념을 강조하고, 그래픽이 이동·연결·변형되며 설명의 인과를 보여주는 animation 제작

### 1.1 제품 tradeoff

V2는 arbitrary Slidev Markdown/Vue/CSS 편집을 포기하고, 통제된 `deck.luma.json` editor와 generated Slidev adapter를 선택한다. 이 선택은 browser direct editing과 deterministic animation을 가능하게 하지만 editor runtime과 Slidev runtime의 parity 검증 비용을 만든다. 따라서 V2는 P0 GripGun 6-slide vertical slice를 먼저 통과하고, final migration은 그 이후에만 허용한다.

Reference acceptance target:

- 사용자 제공 영상: https://youtube.com/shorts/kucqGt8Q2a8
- 구현 시작 전 reference를 2초 단위로 분석해 shot, composition, transition, emphasis, tempo를 `motion-reference-analysis.md`에 기록
- reference의 asset을 복제하지 않고 motion grammar와 정보 전달 밀도만 기준으로 사용

사용자가 V2 진입 기준 완료를 확인했다. 이 문서에 대한 별도 구현 명령 전까지 **계획 외 source·deck 수정 금지**.

## 2. 제품 목표

사용자가 Markdown/Vue/CSS를 열지 않고 다음 작업을 완료해야 한다.

```text
deck 열기
→ slide thumbnail 탐색
→ slide 추가·복제·삭제·정렬
→ canvas에서 내용·그래픽 직접 편집
→ timeline에서 animation 구성
→ 발표 모드로 전체 deck 재생
→ Slidev presenter / HTML / PDF export
```

V2 완료 시 GripGun은 한 장의 복잡한 scene이 아니라 6장 내외의 mini presentation으로 제공한다. 이후 같은 editor로 `projects/pragmata-2p-final/` 전체를 migration한다.

## 3. 비목표

- After Effects, Premiere, Figma 전체 기능 복제
- arbitrary Slidev Markdown/Vue/CSS의 무손실 양방향 round trip
- external LLM API 또는 API key
- cloud storage, multi-user collaboration
- Unreal project 수정
- reference 영상의 시각 asset 또는 frame 복제
- editor 안에서 유료 AI model 호출

Art generation이 필요하면 active Codex session의 image generation 결과를 일반 local asset으로 import한다. editor 자체는 AI provider를 알지 않는다.

## 4. UX 계약

### 4.1 기본 화면

```text
┌ Deck toolbar: Open · Save · Present · Export ───────────────────┐
├──────────────┬──────────────────────────────────┬───────────────┤
│ Slides       │ Canvas                           │ Inspector     │
│ 01 thumbnail │ editable 16:9 stage              │ Design        │
│ 02 thumbnail │ selection / guides / groups      │ Animation     │
│ 03 thumbnail │                                  │ Notes         │
├──────────────┴──────────────────────────────────┴───────────────┤
│ Timeline: cues · tracks · keyframes · easing · playhead        │
└─────────────────────────────────────────────────────────────────┘
```

필수 UX:

- thumbnail click으로 active slide 변경
- drag로 slide 순서 변경
- add, duplicate, delete, undo/redo
- slide title, presenter notes, layout, transition 편집
- text/image/shape/path/group/connector 직접 조작
- timeline track 선택, keyframe 추가·이동·삭제
- animation preset 적용 후 keyframe 수동 편집
- Edit와 Present mode 분리
- Present mode에서 click: 현재 segment 자동 재생 → hold → 다음 click
- 마지막 cue 다음 click에서 다음 slide 이동
- previous slide 진입 시 deterministic start/hold state 복원

## 5. Canonical document v2

`scene.luma.json`을 `deck.luma.json`으로 승격한다. v1 loader는 migration을 통해 유지한다.

```text
DeckDocumentV2
├─ schemaVersion: 2
├─ metadata
├─ viewport
├─ themeTokens
├─ assets[]
└─ slides[]
   ├─ id / title / layoutId / transition
   ├─ presenterNotes / posterCueId
   ├─ elements[]
   │  ├─ text / image / shape / svg / path / connector / group
   │  ├─ transform / style / mask / parentId
   │  └─ accessibilityLabel
   └─ timeline
      ├─ duration / cues[]
      ├─ tracks[] / keyframes[]
      └─ cameraTrack
```

Schema 추가:

- deck metadata와 theme token
- slide title, transition, hidden flag
- group parent/child 관계
- anchor 기반 connector
- clip/mask
- transform origin
- camera frame
- keyframe interpolation: cubic-bezier, spring preset, step/hold
- scene-level reusable symbol은 V2 후반에만 검토

소유권과 ID contract:

- `DeckDocument.id`, `Slide.id`, `Asset.id`는 deck 전체에서 unique
- `Element.id`, `Track.id`, `Cue.id`는 owning `Slide.id` 안에서 unique
- element/track/connector reference는 항상 `{ slideId, elementId }` pair로 저장. cross-slide element reference 금지
- group/mask/connector target은 같은 slide에서만 허용. slide 삭제는 해당 slide 내부 reference와 track을 함께 제거하고 외부 dangling reference는 validator가 거부
- `AnimationIntent`는 `focus | route | transform | compare | evidence | impact | sequence` 중 하나 이상이며, 모든 preset/track group이 `purpose`와 reduced-motion fallback(`instant | fade | preserve`)을 가져야 함
- transform·anchor·mask·camera는 1920×1080 logical slide space를 사용. renderer만 CSS pixel로 scale 변환

검증 규칙:

- deck/slide/asset ID는 deck 전역 uniqueness, element/track/cue ID는 owning slide 범위 uniqueness
- cyclic group, orphan parent, invalid connector anchor 거부
- keyframe 정렬·범위·property type 검증
- slide 삭제 시 dangling reference 거부
- v1 → v2 migration idempotent
- load → save → load semantic equality
- reduced-motion evaluation은 같은 cue 의미와 poster state를 유지
- `migrate(v1Fixture)` canonical serialize 결과에 다시 `migrate`를 적용해 byte/semantic equality를 확인. 이미 V2인 document는 no-op

예정 경로:

- `src/studio/schema.ts`: V2 type·validator
- `src/studio/migrations.ts`: v1 → v2 migration
- `src/studio/presenter-state.ts`: pure deck navigation state machine
- `src/studio/serializer.ts`: canonical V2 JSON
- `test/studio/schema-v2.test.ts`: V2 fixture와 invalid graph
- `test/studio/presenter-state.test.ts`: navigation truth table

V1 migration contract:

- immutable fixture `test/studio/fixtures/v1-gripgun.scene.luma.json`을 기준으로 migration test
- reader는 `deck.luma.json`을 우선하고 없을 때만 `scene.luma.json`을 read-only migration input으로 사용
- migration은 원본 v1 file을 overwrite하지 않으며, 첫 save만 sibling `deck.luma.json` 생성

## 6. Rich motion 계약

### 6.1 목표 motion grammar

| Grammar | 정보 전달 목적 | 예시 |
| --- | --- | --- |
| Focus | 한 시점에 볼 대상 제한 | dim others, focus ring, camera push |
| Route | 원인→처리→결과 경로 표시 | intent pulse, connector draw, packet route |
| Transform | 상태 전환을 공간적으로 유지 | card morph, diagram node expand |
| Compare | 전후·client/server 차이 비교 | split, wipe, synchronized swap |
| Evidence | 개념에서 실제 화면으로 연결 | diagram→game capture crossfade |
| Impact | 사건 발생 순간 강조 | shock ring, hit flash, micro shake |
| Sequence | 복수 단계를 읽는 순서 제어 | stagger, number/count, progressive reveal |

### 6.2 engine capability

V2 minimum:

- opacity, position, scale, rotation, size, color
- transform origin과 grouped transform
- SVG path draw/trim, motion path
- connector endpoints와 anchor tracking
- clip reveal, wipe, mask
- camera pan/zoom/frame
- staggered child animation
- FLIP 기반 layout transition
- cubic-bezier와 named spring easing
- text block/word 단위 reveal
- cue별 hold frame

P0 GripGun-only minimum:

- text/image/shape/group/connector
- opacity/position/scale/rotation/path trim
- cue/hold, one slide transition, semantic preset purpose
- reduced-motion fade/instant fallback

camera/mask/FLIP/text-word reveal은 GripGun storyboard에 실제로 필요하다는 evidence가 있을 때 P1으로 추가한다.

후순위:

- freeform bezier curve editor
- particles와 physics simulation
- arbitrary SVG morph
- audio synchronization

원칙:

- 모든 animation은 `무엇을 이해시키는가` 필드 보유
- decorative-only motion은 scene당 1개 이하
- 한 cue의 primary focal point 1개
- 동일 의미는 동일 motion grammar 사용
- reduced-motion에서는 transform을 fade/instant state로 축약
- PDF poster는 animation이 없어도 결론 전달

예정 경로:

- `src/studio/timeline.ts`: typed interpolation과 camera evaluation
- `src/studio/motion-presets.ts`: semantic preset
- `src/studio/motion-compiler.ts`: preset → editable tracks
- `studio/src/scene-renderer.ts`: SVG/group/mask/camera render
- `studio/src/timeline-editor.ts`: track/keyframe editing
- `test/studio/motion-*.test.ts`: deterministic evaluation

## 7. Slidev 역할

Slidev는 authoring source가 아니라 presentation/export adapter로 유지한다.

```text
deck.luma.json
├─ Visual Studio editor
├─ standalone presenter
└─ generated Slidev wrapper
   ├─ presenter mode
   ├─ speaker notes
   ├─ HTML build
   └─ PDF poster export
```

V2 adapter 요구:

- scene slide 수만큼 Slidev route 생성
- `slideId`로 정확한 scene 선택. `slides[0]` 금지
- slide별 click count, notes, poster cue 생성
- current cue 완료 전 Slidev next 차단
- 마지막 cue에서만 next slide 허용
- previous/next/re-entry state deterministic reset
- Slidev core 수정 0건
- generated wrapper는 사람이 직접 편집할 source가 아님

Presenter state-machine contract:

- pure input: `{ activeSlideId, cueIndex, phase, hiddenSlides }`와 event `enter | next | previous | animationComplete | leave`
- pure output: `{ renderSlideId, renderTime, shouldPlayTo, shouldNavigate, lockInput }`
- `next`는 auto segment가 끝난 hold에서만 다음 click cue를 시작하며, 마지막 cue 이후에만 visible next slide로 이동
- `previous`와 re-entry는 selected slide의 cue 0 start state를 재현. hidden slide는 presenter navigation과 generated route에서 제외
- standalone presenter와 generated Slidev wrapper는 같은 state-machine output만 소비

Packaging/output contract:

```text
projects/<name>/deck.luma.json
→ generated .lumadeck/slidev-wrapper/
  ├─ slides.md
  ├─ components/LumaDeckSlide.vue
  ├─ assets/ (content-hash copy or Vite import manifest)
  └─ manifest.json (slideId, route, clicks, posterCueId, notes)
→ Slidev HTML build
→ PDF: slideId별 posterCueId hold frame 1개, 총 visible slide 수와 page 수 동일
```

generator는 original `slides.md`를 overwrite하지 않는다. packaging test는 wrapper `manifest.json`, built asset, HTML route, PDF page count와 poster cue mapping을 함께 검증한다.

기존 `slides.md` migration은 one-way importer로 한정한다.

- 지원: title, text, image, notes, frontmatter layout, basic positioning
- unsupported Vue/CSS는 static snapshot 또는 explicit escape-hatch element로 표시
- importer가 원본 `slides.md`를 overwrite하지 않음
- arbitrary round-trip을 약속하지 않음

예정 경로:

- `src/studio/slidev-adapter.ts`: deck navigation contract
- `src/studio/slidev-generator.ts`: wrapper generation
- `src/studio/slidev-importer.ts`: bounded one-way import
- `projects/pragmata-2p-gripgun-prototype/`: V2 multi-slide adapter fixture

## 8. GripGun V2 mini deck

V2 product acceptance deck은 6장으로 구성한다.

| Slide | 핵심 질문 | primary visual | motion |
| --- | --- | --- | --- |
| 1 | GripGun은 무엇을 하는가 | Hugh·reticle·enemy hero composition | P0 scale/position focus, title reveal; camera push는 storyboard evidence가 있을 때 P1 |
| 2 | projectile인가 | ghost projectile vs instant ray | projectile cancel, path draw |
| 3 | 누가 발사를 확정하는가 | client/server split | intent route, server gates stagger |
| 4 | hit는 어떻게 찾는가 | camera origin single trace | ray trim, first blocker impact |
| 5 | damage와 VFX는 어떻게 갈리는가 | damage route + VFX branch | branch morph, unreliable badge |
| 6 | 실제 게임에서 무엇이 보이는가 | current-build screenshot | diagram-to-evidence crossfade |

Deck bar:

- slide thumbnail 6개가 editor에 표시
- slide add/duplicate/reorder/delete가 실제 deck에 반영
- 전체 presentation을 first→last로 재생
- slide 사이 transition과 slide 내부 cue motion 구분
- reference와 side-by-side 검토 시 `focus`, `route`, `transform`, `impact`, `evidence` grammar 확인
- 한 장에 모든 logic을 쌓지 않음
- physical projectile 오표현 0건

## 9. Final deck migration

GripGun mini deck 통과 후 `projects/pragmata-2p-final/` 약 27장을 migration한다.

분류:

- `static`: 이미지 중심, 최소 reveal
- `explain`: architecture/gameplay rich motion
- `compare`: before/after 또는 host/client
- `evidence`: current-build capture 중심
- `demo`: live demo transition·recovery
- `section`: cover/Q&A/section marker

우선 rich-motion 대상:

- 핵심 협동 loop: `projects/pragmata-2p-final/slides.md:327-352`
- 방 접속과 역할 유지: `projects/pragmata-2p-final/slides.md:359-450`
- GripGun 결과: `projects/pragmata-2p-final/slides.md:521-546`
- hacking·cleanse·map interaction: `projects/pragmata-2p-final/slides.md:553-649`
- 전체 gameplay loop: `projects/pragmata-2p-final/slides.md:656-681`

모든 slide를 과도하게 animate하지 않는다. 평가 정보의 인과·비교·흐름을 설명하는 slide에 motion budget을 집중한다.

## 10. 구현 단계

각 checkbox는 agentic loop의 atomic parent task다. 이전 phase gate를 통과하기 전 다음 phase 금지.

### V2-00. reference·baseline lock

- [ ] reference 영상 2초 단위 shot/motion 분석
- [ ] V1 UX 실패를 reproducible baseline screenshot/video로 기록
- [ ] V2 GripGun 6-slide storyboard와 hold frame wireframe 작성
- [ ] final deck slide inventory와 migration classification 작성

통과:

- reference motion grammar 5개 이상 식별
- V1 single-page failure와 V2 target 차이를 visual comparison으로 설명
- 6개 slide 모두 message, cue, evidence, poster state 보유

### V2-01. document·migration·presenter state

- [ ] schema v2와 migration
- [ ] AddSlide, DuplicateSlide, DeleteSlide, MoveSlide, SetSlideMetadata
- [ ] deck-aware undo/redo
- [ ] slide-scoped selection·playhead state
- [ ] pure presenter navigation state machine과 truth table
- [ ] transactional save/recovery와 autosave policy

통과:

- 30-slide fixture load/save
- 정의된 20-step sequence(Add, Duplicate, Move, Delete, metadata 변경)를 전체 undo/redo
- operation 전후 비활성 slide의 canonical JSON SHA-256 hash 동일
- v1 fixture migration semantic preservation
- standalone/Slidev가 same input에서 same state-machine output 소비
- save는 temporary sibling write → validate → replace 순서. 실패/중단 뒤 valid previous deck 또는 recoverable temporary artifact 유지
- autosave는 local draft에 debounce 저장, explicit Save만 project file commit

### V2-02. editable presentation shell

- [ ] thumbnail rail
- [ ] slide CRUD·drag reorder
- [ ] canvas/inspector/notes/timeline panel
- [ ] Edit/Present mode
- [ ] keyboard navigation과 autosave status

통과:

- UI에서 6-slide deck 생성·정렬·저장·재열기
- Markdown/Vue/CSS 접근 0회
- active slide 전환 100ms 이내
- 27-slide thumbnail scroll과 선택 정상

### V2-03. retained renderer·P0 motion runtime

- [ ] keyed/retained renderer
- [ ] group, shape, connector, SVG path trim
- [ ] anchor tracking과 logical viewport scaling
- [ ] missing asset/font/error surface
- [ ] P0 reduced-motion runtime

통과:

- connector가 target 이동 중 anchor 유지
- group transform, connector anchor, path trim visual regression 통과
- playback 중 DOM 전체 재생성으로 인한 focus/flicker 0건
- 1920×1080, 1280×720 semantic parity
- P0 GripGun storyboard에 필요한 text/image/shape/group/connector와 path trim 지원

### V2-04. timeline editor·motion compiler

- [ ] track/keyframe UI
- [ ] keyframe add/move/delete
- [ ] cubic-bezier/spring/hold
- [ ] semantic preset → editable track compile
- [ ] path draw와 one slide transition
- [ ] camera/mask/FLIP/text reveal은 storyboard evidence가 있을 때 P1 incremental task로 추가

통과:

- preset 적용 후 개별 keyframe 수정 가능
- 같은 timestamp 20회 evaluation 결과 동일
- benchmark fixture, Chromium version, hardware, warmup 3회, measured window 60초 기록
- median ≥55 FPS, frame-time p95 ≤25ms
- `PerformanceObserver('longtask')` 기준 100ms 이상 long task 0회

### V2-05. deck presenter·Slidev adapter

- [ ] standalone multi-slide presenter
- [ ] cue→slide navigation state machine
- [ ] Slidev wrapper generation
- [ ] notes·presenter·poster export 연결
- [ ] generated wrapper/asset/PDF packaging manifest

통과:

- 6-slide first→last navigation 완주
- cue skip, early slide advance, re-entry leakage 0건
- standalone/Slidev cue end semantic parity
- HTML/PDF에서 6장 모두 존재
- PDF page count = visible slide count, 각 page `posterCueId` hold state와 manifest mapping 일치

### V2-06. GripGun reference-quality deck

- [ ] 6-slide visual 제작
- [ ] reference motion grammar 적용
- [ ] actual evidence asset 연결
- [ ] presenter notes와 uncertainty 기록

통과:

- 2명 평가자는 randomized/anonymous first→last recording만 보고 사전 정의된 answer key(6개 slide boundary, 5개 slide transition, 각 slide cue boundary)를 전부 정확히 식별
- 2명 평가자의 slide별 motion rubric이 각각 9/10 이상이며 0점 항목 없음. scorecard와 capture를 evidence로 저장
- technical claim mismatch 0건
- hold frame만 보아도 6단계 논리 이해

### V2-07. final deck migration

- [ ] 27-slide one-way migration
- [ ] 평가 기준 coverage mapping
- [ ] priority technical slide rich motion 적용
- [ ] notes/timing/demo recovery 통합

통과:

- `Docs/plans/PLAN_VISUAL_STUDIO_V1_GRIPGUN.md:14`의 POTENUP 평가 기준을 고정 source로 사용하고, `.agents/work/visual-studio-v2/rubric-coverage.json`에 `requirementId → slideId[] → evidence[]` 매핑 100% 기록
- placeholder 0건
- 전체 18:00, demo 270초 이하
- unsupported imported content가 silent loss 없이 표시

### V2-08. hardening·handoff

- [ ] performance·accessibility·offline 검증
- [ ] visual regression baseline
- [ ] crash/reload/save recovery
- [ ] user guide와 known limitation

통과:

- automated test/typecheck/build/export exit 0
- browser console error/unhandled rejection 0건
- visual must-fix defect 0건
- independent verifier GO

## 11. 검증 계획

### Unit

- schema graph/reference/migration
- deck operations와 history
- typed interpolation, easing, cue state
- preset compiler와 deterministic output
- Slidev click/slide routing

### Integration

- editor save → standalone presenter
- editor save → generated Slidev wrapper
- asset replace → HTML/PDF bundling
- slide reorder → notes/click/poster mapping 유지
- V1 document → V2 migration → save/reopen

### E2E

1. folder open
2. 6개 thumbnail 확인
3. slide duplicate·reorder
4. text/image 직접 편집
5. connector animation preset 적용
6. keyframe timing 수정
7. save/reopen
8. Present mode 완주
9. HTML/PDF export

### Visual

- reference video와 GripGun deck side-by-side motion rubric
- cue start/mid/end capture
- 1920×1080, 1280×720
- reduced-motion capture
- standalone/Slidev/HTML/PDF comparison

Visual pass rubric, 각 0~2점:

| 항목 | 0 | 1 | 2 |
| --- | --- | --- | --- |
| focal point | 불명확 | 부분적 | 매 순간 명확 |
| spatial continuity | 순간이동·혼란 | 일부 연결 | 이동·변형으로 인과 보존 |
| tempo | 느림/과속 | 불균일 | 설명 호흡과 일치 |
| information density | 과밀/공백 | 일부 과밀 | cue당 한 메시지 |
| visual polish | prototype 느낌 | 일부 완성 | reference급 일관성 |

총 10점 중 9점 이상, 0점 항목 없음. 최종 판정에는 사용자 visual acceptance 필수.

## 12. 성능 bar

측정 없는 추정 통과 금지.

- fixture: 27 visible slides, 100 local assets, 1920×1080 logical viewport. asset byte total과 browser/OS/CPU/GPU/RAM을 report에 기록
- Chromium stable에서 cold open 5회와 warm open 20회 실행. warm p95: 27-slide open ≤2초
- active slide switch와 timeline scrub을 각각 100회 실행. p95 ≤100ms / ≤50ms
- 60초 playback을 warmup 3회 뒤 5회 측정. median ≥55 FPS, frame-time p95 ≤25ms
- `PerformanceObserver('longtask')` 기록에서 100ms 이상 event 0건
- save 20회 p95 ≤1초, 강제 write failure test에서 previous valid deck 또는 recovery file 존재
- HTML first slide offline load 5회 성공

## 13. 위험과 완화

| 위험 | 영향 | 완화 |
| --- | --- | --- |
| generic editor 범위 폭증 | animation 품질 저하 | GripGun 6-slide에 필요한 capability만 추가 |
| V1 DOM full redraw | flicker·성능·편집 상태 손실 | keyed/retained renderer를 V2-03 gate로 지정 |
| Slidev navigation 충돌 | cue skip·slide 조기 이동 | 명시적 deck state machine과 adapter integration test |
| rich motion이 장식화 | 정보 전달 저하 | animation purpose, focal point, hold frame 필수 |
| Markdown import 기대 과다 | content 손실 | bounded one-way importer와 unsupported 표시 |
| final deck migration 조기 시작 | platform defect 확산 | GripGun 6-slide acceptance 전 migration 금지 |
| reference 해석 차이 | 사용자 기대 불일치 | V2-00 reference breakdown과 V2-06 사용자 visual gate |

## 13.1 Ralplan consensus record

| 순서 | 역할 | 판정 | 반영 |
| --- | --- | --- | --- |
| 1 | Architect | REVISE | schema ownership, pure presenter state machine, packaging, transactional save, P0 scope, benchmark contract 추가 |
| 2 | Critic | REVISE | ID scope, P0/P1 mask conflict, visual/rubric/performance measurement, consensus audit 보완 |
| 3 | Architect | APPROVE | File System Access API는 atomic rename 대신 temp/backup recovery protocol으로 구현 |
| 4 | Critic | REVISE | P0 camera, anonymous visual answer key, migration idempotence contract 보완 필요 |
| 5 | Architect | APPROVE | P0 camera, anonymous visual answer key, migration idempotence/no-op 보완 확인 |
| 6 | Critic | APPROVE | scope, testability, verification contract clean |

## 14. Agentic 실행 계약

```text
1. AGENTS/directives/status/session 확인
2. 현재 phase의 최소 미완료 task 선택
3. acceptance command와 visual artifact 선언
4. 구현
5. focused unit/integration test
6. browser visual capture
7. 별도 reviewer/verifier 판정
8. evidence ledger 갱신
9. phase gate 통과 시 다음 task
```

실행 ledger:

```text
.agents/work/visual-studio-v2/
  CHECKPOINT.json
  RUN_LOG.md
  motion-reference-analysis.md
  deck-inventory.md
  screenshots/
  performance/
  exports/
```

즉시 중단:

- external LLM API 필요
- Unreal project 수정 필요
- user/active-session change 충돌
- reference-quality 달성을 위해 V2 비목표 기능 필요
- 같은 원인 검증 3회 연속 실패
- source claim과 runtime evidence 모순
- final migration 전에 GripGun acceptance 실패

## 15. 구현 승인 경계

이 문서는 계획 산출물이다.

- 허용: 계획 review·수정, read-only 조사
- 금지: `src/`, `studio/`, `test/`, `projects/` 구현 변경
- 시작 조건: 사용자가 이 계획을 기준으로 V2 구현을 명시적으로 지시

## 16. 완료 정의

V2 구현 완료는 다음을 모두 의미한다.

- single-scene page가 아닌 editable multi-slide presentation
- browser에서 slide·content·motion 편집 가능
- reference급 motion grammar를 사용한 GripGun 6-slide deck
- deck 전체 presenter navigation과 Slidev/HTML/PDF export
- final 약 27-slide deck migration과 평가 기준 coverage
- visual·technical·performance·accessibility gate 통과
- user visual acceptance와 independent verifier GO
