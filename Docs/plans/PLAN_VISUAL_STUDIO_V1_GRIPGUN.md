# LumaDeck Visual Studio v1 — GripGun 발사 설명 프로토타입 계획

## 1. 결정 요약

현재 LumaDeck 저장소 안에 visual-first authoring core의 v1 vertical slice를 구현한다.

v1은 `Pragmata 2P`의 GripGun 발사 흐름을 15~30초 분량의 rich animation 장면으로 제작하며 다음 가설을 검증한다.

- Markdown을 직접 수정하지 않고 브라우저에서 텍스트·이미지·위치·크기·모션 preset 편집 가능
- 발표자 클릭 사이의 구간을 자동 재생하는 hybrid cue 모델 구현 가능
- 같은 scene document를 editor, standalone player, Slidev presenter, HTML/PDF export에서 재사용 가능
- 외부 LLM API 없이 deterministic operation만으로 반복 편집 가능
- 정지 스크린샷보다 기술 흐름과 정보 전달력이 높은 시각 설명 가능

v1은 `projects/pragmata-2p-beta/`와 `projects/pragmata-2p-final/`을 직접 재작성하지 않는다. 별도 prototype project에서 gate를 통과한 뒤 v2 계획을 작성하고, v2에서 `projects/pragmata-2p-final/` 통합 범위를 확정한다.

## 2. 용어 정정

사용자 표현인 `GripGun projectile`은 주제 식별용으로만 사용한다. 현재 구현은 projectile actor가 아니라 **server-authoritative hitscan**이다.

검증된 현재 흐름:

```text
Hugh local input
→ client fire intent 또는 authority 직접 호출
→ server combat/weapon/cooldown/ammo/reload gate
→ server ammo 소비·cooldown 갱신·필요 시 reload 시작
→ ammo와 cooldown snapshot의 별도 복제 경로
→ Player View Point에서 camera forward 방향 단일 Line Trace
→ 첫 blocking hit의 Actor/BoneName 획득
→ FPragmataDamageSpec 생성 및 receiver damage 적용
→ impact location/normal을 사용한 unreliable VFX multicast
```

근거:

- `[UNREAL]/Source/Pragmata_2P/Characters/HughCharacter.cpp:1171-1192,2289-2298`
- `[UNREAL]/Source/Pragmata_2P/Weapon/GripGun.cpp:45-106`
- `[UNREAL]/Source/Pragmata_2P/Weapon/WeaponBase.cpp:67-119`
- `[UNREAL]/Docs/Intent/Weapon/GripGun-PullTrigger.md:18-60`
- `projects/pragmata-2p-beta/AGENTS.md:16-20`
- `projects/pragmata-2p-beta/presentation-script.md:115-123`

표현 금지:

- 비행 projectile actor, projectile speed, gravity, ballistic lifetime
- muzzle-origin trace
- camera trace 뒤의 두 번째 corrective trace
- 구현이 확인되지 않은 muzzle flash 또는 tracer
- `NetMulticast, Unreliable` impact VFX의 전달 보장 표현
- `FHitResult`, `BoneName`, reload 상태 전체가 두 player에게 공유된다는 표현
- Blueprint CDO와 runtime을 확인하지 않은 고정 사거리·damage·배율
- 현재 코드와 불일치하는 reload pointer 보장 설명

## 3. 경로와 근거 우선순위

### 3.1 경로 별칭

| 별칭 | 현재 조사 경로 | 용도 |
| --- | --- | --- |
| `[LUMA]` | LumaDeck 저장소 root | v1 구현, 계획, 테스트 |
| `[BETA]` | `[LUMA]/projects/pragmata-2p-beta` | beta 발표의 시각 언어·서사·증거 |
| `[FINAL]` | `[LUMA]/projects/pragmata-2p-final` | v2의 최종 통합 대상 |
| `[UNREAL]` | `C:\Workspace\UnrealProjects\Pragmata_2P` | gameplay 사실 검증용 read-only reference |

`[UNREAL]` 절대 경로를 runtime config에 hardcode하지 않는다. 실행 환경에서는 사용자 제공 경로 또는 명시적 local config로 해석한다.

### 3.2 사실 우선순위

1. `[UNREAL]/Source/` 현재 C++ call path
2. 현재 Blueprint CDO와 PIE/runtime 관찰
3. `[UNREAL]/Docs/Intent/`, `Docs/KNOW_HOW.md`, `Docs/Systems/`
4. `[BETA]/slides.md`, `presentation-script.md`, `AGENTS.md`
5. 과거 presentation reference와 이미지 caption

문서와 코드가 다르면 코드를 우선하고 mismatch를 기록한다. 현재 확인된 mismatch:

- 일부 damage 문서는 unhacked weapon damage를 0.1배로 설명하지만 현재 C++ 기본값은 0.2배이며 Blueprint override 가능
- GripGun reload intent 문서는 요청 당시 pointer 보존을 설명하지만 현재 callback은 `WeaponInventory[0]`을 다시 조회

이 두 항목은 v1 audience-facing copy에서 확정 사실로 사용하지 않는다.

## 4. 불변 조건

- 외부 LLM API, API key, 사용량 기반 AI 서비스 금지
- AI가 없어도 모든 v1 편집·저장·재생·export 가능
- 단순 편집은 deterministic document operation으로만 처리
- Slidev 역할을 predetermined layout, presenter mode, HTML/PDF export adapter로 제한
- Slidev Markdown을 canonical authoring format으로 사용하지 않음
- 재생 방식은 `click cue 사이 자동 재생`
- LumaDeck-owned code는 embedded/local Slidev checkout 밖에 작성
- `[UNREAL]` 저장소, Unreal asset, C++를 v1에서 수정하지 않음
- 기존 `[BETA]`, `[FINAL]` deck과 v1 prototype 격리
- 기존 untracked `pnpm-workspace.yaml`을 사용자 변경으로 간주하고 수정·stage 금지
- `projects/` deck source와 `.agents/work/` evidence는 Git commit 대상에서 제외
- `git reset --hard`, `git checkout --`, 사용자 변경 삭제 금지
- commit, push, publish, deploy는 별도 실행 권한이 있을 때만 수행

## 5. v1 범위

### 5.1 포함

- versioned scene document schema
- stable element/asset/cue/track ID
- text, image, shape, SVG/path element
- position, size, rotation, opacity, z-order, style
- asset reference와 focal point/fit metadata
- `SetText`, `MoveElement`, `ResizeElement`, `SetStyle`, `ReplaceAsset`, `ReorderElement`
- undo/redo와 load/save round trip
- play, pause, reset, scrub
- `auto`, `hold`, `click` cue
- keyframe interpolation과 easing
- canvas selection, text direct edit, drag, resize, layer panel, inspector
- 이미지 file picker 또는 drag/drop 교체
- GripGun 설명에 필요한 motion preset
- Slidev presenter event adapter
- standalone/Slidev/HTML/PDF 검증
- GripGun vertical slice scene

### 5.2 제외

- 범용 After Effects 대체
- multi-user cloud collaboration
- 외부 AI art generation
- audio narration editor와 waveform 편집
- arbitrary Vue/Markdown 완전 round trip
- 3D scene editor
- full video editor와 MP4 production pipeline
- 전체 beta/final deck migration
- Unreal gameplay 또는 asset 수정
- mobile authoring UI

## 6. v1 목표 구조

초기 저장소 규모에서는 monorepo 재편보다 작은 cohesive module 추가를 우선한다. 아래는 V1-00 feasibility spike 통과 후 확정할 후보 구조이며, 현재 root `package.json`에는 Vue/Vite/editor build가 direct dependency·script·DOM tsconfig로 정의되어 있지 않다.

```text
src/studio/
  schema.ts
  validator.ts
  serializer.ts
  operations.ts
  history.ts
  timeline.ts
  motion-presets.ts
  slidev-adapter.ts

studio/
  index.html
  src/
    main.ts
    App.vue
    components/
      SceneCanvas.vue
      LayerPanel.vue
      InspectorPanel.vue
      TimelinePanel.vue
      PlayerControls.vue

test/
  studio-schema.test.ts
  studio-operations.test.ts
  studio-history.test.ts
  studio-timeline.test.ts
  studio-serializer.test.ts
  studio-slidev-adapter.test.ts

projects/pragmata-2p-gripgun-prototype/
  scene.luma.json
  slides.md
  components/LumaScene.vue
  assets/
```

구조는 구현 전 repository convention 확인 후 조정 가능하다. 다음 경계는 변경 금지:

```text
Scene Document
├─ Editor operations
├─ Shared renderer/player
├─ Slidev presenter adapter
└─ Export snapshot selector
```

editor와 presenter가 별도 렌더러를 사용하지 않는다.

browser file I/O v1 계약:

- 지원 target은 local Chromium으로 고정
- `showDirectoryPicker`로 prototype directory handle을 받아 `scene.luma.json`과 `assets/`만 읽기·쓰기
- image replace 시 선택 file을 `assets/`로 copy하고 relative asset reference 갱신
- asset stable ID와 content hash 기록, MIME·확장자·용량 allowlist 검증
- resolved path가 선택한 prototype root 밖이거나 path traversal을 포함하면 거부
- 원본 asset overwrite 금지, 중복 파일은 content hash 기반 이름으로 추가
- scene JSON은 temporary sibling 작성 후 replace하는 atomic-save 패턴 사용
- asset copy 또는 scene save 실패 시 document operation rollback과 actionable error 표시
- 권한 거부·미지원 browser에서 silent failure 금지, JSON/asset bundle import·export fallback 제공
- 임의 경로 쓰기, local server의 unrestricted write endpoint, base64 asset inline 금지

## 7. scene document 최소 계약

```text
Deck
├─ schemaVersion
├─ viewport: 1920 × 1080 logical units
├─ assets[]
└─ slides[]
   ├─ id
   ├─ layoutId
   ├─ presenterNotes
   ├─ elements[]
   │  ├─ id/type
   │  ├─ transform
   │  ├─ style/content/assetId
   │  └─ accessibilityLabel
   └─ timeline
      ├─ duration
      ├─ cues[]
      └─ tracks[]/keyframes[]
```

필수 validation:

- 중복 ID 거부
- 존재하지 않는 element/asset/cue 참조 거부
- 음수 duration과 역행 keyframe 거부
- viewport 밖 element는 warning 또는 명시적 overflow 허용 flag 요구
- unsupported element/preset/easing 거부
- schema version 누락 거부
- load → save → load 의미 동일성 보장

## 8. hybrid cue 재생 계약

```text
slide enter
→ intro 구간 자동 재생
→ 첫 click cue에서 정지
→ 발표자 click
→ 다음 cue까지 자동 재생
→ 마지막 cue에서 정지
→ 다음 click에 Slidev next slide
```

규칙:

- 자동 재생 중 입력은 queue하지 않고 현재 구간 완료 뒤 한 번만 처리하거나 명시적으로 무시
- 한 번의 presenter action은 최대 한 cue 구간만 진행
- slide leave/enter 시 timeline deterministically reset
- backward navigation 시 해당 slide의 지정 start state 복원
- editor scrub과 presenter playback의 같은 timestamp가 같은 visual state 생성
- PDF는 slide별 지정 `posterCueId` 또는 최종 hold state 사용
- reduced-motion mode는 cue 의미를 유지하며 duration을 축소하거나 즉시 상태 전환

## 9. GripGun vertical slice storyboard

총 목표 길이: 22~28초. 클릭 cue 5~7개. 각 hold state는 정지 infographic으로도 이해 가능해야 한다.

| 구간 | 시각 변화 | 전달할 사실 | 근거 |
| --- | --- | --- | --- |
| 0~3초 | Hugh, camera reticle, enemy 배치. ghost projectile에 X 표시 후 ray 강조 | 물리 projectile가 아닌 즉시 hit 판정 | `[UNREAL]/Weapon/GripGun.cpp:88-101` |
| 3~7초 | `client intent` pulse가 server boundary로 이동. combat/weapon/cooldown/ammo gate 순차 강조 | client는 의도 전달, server가 mutation 확정 | `HughCharacter.cpp:1171-1192,2289-2298`, `GripGun.cpp:45-70` |
| 7~11초 | camera origin에서 ray draw, 첫 blocker에서 정지 | Player View Point 기반 single trace | `GripGun.cpp:88-106` |
| 11~16초 | impact pulse, hit normal, Actor/BoneName callout | `FHitResult`가 damage input 제공 | `GripGun.cpp:103-118`, `WeaponBase.cpp:93-119` |
| 16~21초 | server damage flow를 간결한 3단 route로 전개 | DamageSpec → receiver → health | `[UNREAL]/Docs/Systems/Damage/damage-flow.md:23-59,99-117` |
| 21~25초 | server가 impact location/normal VFX cue를 두 viewport로 보내는 표현. unreliable badge 표시 | server hit 판정과 client impact presentation 분리 | `GripGun.h:44-48`, `GripGun.cpp:228-246` |
| 25~28초 | 실제 beta screenshot으로 전환, 결론 한 줄 | server hit 판정과 그에서 파생된 impact cue를 협동 화면에서 관찰 | `[BETA]/slides.md:521-546` |

초기 motion preset:

- `DrawRay`
- `ImpactPulse`
- `FocusRing`
- `StateHighlight`
- `IntentToServer`
- `ResultBroadcast`
- `CrossFadeEvidence`

시각 언어:

- `[BETA]`의 white/gray canvas와 blue accent 유지
- grid, HUD scanline, cyber gradient, decorative technical background 금지
- player-visible result 우선, class/RPC 이름은 proof label 또는 notes로 제한
- `slide-15-enemy-hit.png`를 foreground evidence로 재사용 가능
- ray/impact/weak-point overlay가 caption과 핵심 gameplay evidence를 가리지 않게 배치

## 10. 구현 TODO

각 checkbox를 atomic execution task로 취급한다. 실행 agent는 한 번에 dependency가 충족된 가장 작은 미완료 checkbox 하나만 선택한다. 상위 V1 번호 전체가 아니라 checkbox에 명시된 직접 dependency만 선행 조건으로 사용한다.

기본 dependency graph:

```text
V1-00 feasibility/evidence
├─ V1-01 schema → V1-02 operations/history → V1-05 editor
├─ V1-01 schema → V1-03 timeline → V1-04 renderer → V1-06 presets → V1-07 scene
└─ Slidev spike → V1-08 adapter → V1-09 export
V1-07 + V1-08 + V1-09 → V1-11 QA → V1-12 handoff
V1-10 runtime lane → runtime-only claim 또는 final audience-ready gate
```

### V1-00. preflight와 evidence lock

- [ ] root와 target subtree의 `AGENTS.md`/directive 재확인
- [ ] `git status --short --branch` 기록
- [ ] active-session manifest 충돌 검사
- [ ] `[UNREAL]` source revision과 branch 기록
- [ ] `[BETA]`, `[FINAL]` source snapshot hash 또는 file timestamp 기록
- [ ] GripGun claim table 작성
- [ ] current C++ default와 Blueprint CDO/runtime 값 구분
- [ ] root `package.json`/`tsconfig.json`과 lockfile에서 editor runtime·build 직접 의존성 확인
- [ ] 최소 browser UI spike로 DOM tsconfig, dev/build/test script, Chromium File System Access API 검증
- [ ] 실제 lockfile 버전의 Slidev presenter next interception과 PDF poster-state 주입 가능성 spike
- [ ] Slidev public API·source 근거와 fallback adapter boundary 기록
- [ ] plan 밖의 변경 금지 목록을 run log에 복사

통과 기준:

- 모든 audience-facing GripGun claim이 file:line 또는 runtime evidence에 연결
- fixed numeric value는 Blueprint CDO/runtime 검증 전 `unverified` 표시
- 기존 user change와 edit path overlap 0건
- editor stack의 direct dependency·script·DOM typecheck 구조 결정
- transitive Slidev dependency를 editor import에 직접 사용하지 않음. 필요 package는 direct dependency로 선언하고 license/security 검증
- directory open → text save → asset copy → reopen spike 성공
- Slidev click interception/PDF poster state 두 spike의 `GO` 또는 명시적 adapter fallback 승인

### V1-01. schema와 validator

- [ ] scene schema 정의
- [ ] runtime validator 구현
- [ ] ID/reference/duration/keyframe validation 구현
- [ ] schema version과 migration placeholder 정의
- [ ] valid/invalid fixture 작성

통과 기준:

- valid fixture 100% 통과
- duplicate ID, missing asset, missing element, negative duration, descending keyframe fixture 100% 실패
- error에 document path와 원인 포함

### V1-02. serializer와 deterministic operation

- [ ] canonical JSON serializer 구현
- [ ] `SetText`, `MoveElement`, `ResizeElement`, `SetStyle`, `ReplaceAsset`, `ReorderElement` 구현
- [ ] operation 범위 외 field 불변 검사
- [ ] undo/redo history 구현
- [ ] asset replace 시 fit/focal point 보존 정책 정의

통과 기준:

- load → save → load deep semantic equality
- operation 20개 연속 적용 후 전체 undo로 원본 복원
- 전체 redo로 최종 상태 복원
- `ReplaceAsset` diff가 target element와 asset manifest 범위에 한정

### V1-03. timeline engine

- [ ] play/pause/reset/scrub 구현
- [ ] `auto`, `hold`, `click` cue 구현
- [ ] numeric/color/opacity/transform/path progress interpolation 구현
- [ ] easing allowlist 구현
- [ ] reduced-motion transition 구현

통과 기준:

- 같은 document를 10회 reset/replay한 cue end state 동일
- 한 click이 정확히 한 구간만 진행
- 빠른 연속 click으로 cue skip 0건
- backward/forward navigation 후 state leakage 0건

### V1-04. shared renderer/player

- [ ] text/image/shape/SVG path renderer 구현
- [ ] logical viewport scale 구현
- [ ] z-order, clipping, opacity, transform 적용
- [ ] asset missing/error state 구현
- [ ] editor와 standalone player가 같은 renderer 사용

통과 기준:

- 1920×1080과 1280×720에서 aspect/layout 동일
- missing asset이 silent blank가 아닌 명시적 error surface로 표시
- browser console error/unhandled rejection 0건

### V1-05. browser direct editor

- [ ] canvas selection
- [ ] text double-click edit
- [ ] drag move와 handle resize
- [ ] layer panel과 z-order 변경
- [ ] inspector에서 style/opacity/rotation 편집
- [ ] file picker 또는 drag/drop image replace
- [ ] undo/redo UI
- [ ] save/reopen

통과 기준:

- Markdown/Vue/CSS를 열지 않고 text 변경 가능
- Markdown/Vue/CSS를 열지 않고 image 교체 가능
- image 교체 완료까지 file 선택 포함 3번 이하 interaction
- reload 후 변경 유지
- 선택하지 않은 element mutation 0건
- unsupported file format에 actionable error 표시

### V1-06. motion preset

- [ ] 7개 GripGun preset schema 정의
- [ ] preset parameter와 default duration/easing 정의
- [ ] `ApplyMotionPreset` operation 구현
- [ ] 적용 후 keyframe/parameter 수동 조정 허용

통과 기준:

- preset 적용과 기본 조정 90초 이내
- preset 삭제 시 unrelated track 불변
- preset 결과가 reduced-motion에서도 의미 유지

### V1-07. GripGun scene 제작

- [ ] storyboard의 각 cue 구현
- [ ] audience-facing Korean copy 작성
- [ ] presenter notes에 source proof와 uncertainty 기록
- [ ] beta screenshot evidence 연결
- [ ] projectile 오표현 checklist 수행

통과 기준:

- physical projectile flight 표현 0건
- muzzle trace와 corrective trace 표현 0건
- `client intent → server validation → single trace → hit/damage → impact presentation cue` 순서 일치
- hold frame만 순서대로 봐도 핵심 흐름 설명 가능
- current code와 충돌하는 reload pointer/damage multiplier claim 0건

### V1-08. Slidev adapter

- [ ] generated Slidev wrapper slide 정의
- [ ] Slidev next action을 scene cue 우선 처리에 연결
- [ ] 마지막 cue 다음 action만 next slide로 전달
- [ ] presenter notes 전달
- [ ] slide re-entry reset

통과 기준:

- standalone과 Slidev의 cue end screenshot pixel/semantic parity
- presenter mode에서 click skip 0건
- scene 마지막 전 slide advance 0건
- lockfile의 Slidev 버전 기준 public API 또는 LumaDeck wrapper만 사용
- embedded Slidev core 수정 0건
- public integration이 불가능하면 standalone 성공으로 대체하지 않고 blocker 기록

### V1-09. HTML/PDF export

- [ ] HTML build에서 scene asset bundling 확인
- [ ] slide별 `posterCueId` 선택 구현
- [ ] PDF가 animation 중간 frame이 아닌 지정 hold state 사용
- [ ] font/media offline loading 확인

통과 기준:

- HTML build 성공 및 offline local serve 재생 성공
- PDF export 성공
- PDF에서 GripGun 핵심 결론과 ray/hit 관계 보존
- missing font, missing asset, unexpected crop 0건

### V1-10. factual runtime verification lane

Unreal Editor/PIE 검증은 별도 수동 또는 승인된 Unreal 작업 lane에서 수행한다. LumaDeck agent가 `[UNREAL]` 파일을 수정하지 않는다.

- [ ] Hugh host / Diana client 사격
- [ ] Diana host / Hugh client 사격
- [ ] client fire 1회당 server shot 1회 관찰
- [ ] first blocker hit 관찰
- [ ] ammo -1과 양쪽 snapshot 관찰
- [ ] Actor/BoneName과 health delta 기록
- [ ] miss 시 damage/impact 없음 확인
- [ ] cooldown spam 차단 확인
- [ ] 0 ammo reload → 1 ammo → one-shot replenish chain 확인
- [ ] impact VFX 양쪽 관찰 여부 기록
- [ ] BP CDO의 range/damage/cooldown/ammo/impact asset 확인

통과 기준:

- 양 host layout에서 authority flow 재현
- slide claim과 runtime evidence 불일치 0건
- unreliable multicast는 관찰 결과로만 기록하고 전달 보장으로 표현하지 않음

외부 의존성 처리:

- 현재 agent가 Unreal Editor/PIE를 실행할 권한·환경이 없으면 `waiting_external_runtime`으로 checkpoint하고 상위 루프를 무기한 대기하지 않음
- runtime-only 숫자·Blueprint asset·host-layout claim을 v1 scene에서 제외하면 static C++ 흐름 검증으로 v2 **계획 초안**까지 진행 가능
- 해당 claim을 사용하거나 v2 final deck을 audience-ready로 판정하기 전에는 반드시 이 lane을 resume하고 통과
- 대기 사유, 필요한 수동 절차, 결과 제공 위치, claim 제외 여부를 `CHECKPOINT.json`에 기록

### V1-11. visual QA와 usability test

- [ ] 1920×1080 editor/player capture
- [ ] 1280×720 presenter capture
- [ ] cue별 start/end screenshot
- [ ] reset/replay comparison
- [ ] HTML/PDF comparison
- [ ] text edit, asset replace, preset apply 시간 측정
- [ ] 서로 독립된 project-비숙련 reviewer session/agent 이해도 확인
- [ ] 사람 비숙련 reviewer test가 가능하면 별도 기록

must-fix defect:

- overflow, clipping, letterbox, visible misalignment
- 낮은 contrast, 불분명한 callout 연결
- background/evidence/caption 가림
- cue skip 또는 잘못된 intermediate state
- export asset/font 누락
- connector/arrow stacking defect
- console error 또는 unhandled rejection

### V1-12. handoff 정리

- [ ] architecture와 operation contract 문서화
- [ ] known limitation과 deferred scope 기록
- [ ] test/visual/runtime evidence index 작성
- [ ] v1 gate scorecard 작성
- [ ] independent verifier verdict 기록
- [ ] `V2_DRAFT_READY` scorecard 통과 시 v2 plan draft 자동 생성

## 11. agentic 실행 계약

### 11.1 반복 루프

```text
1. 지침·status·session conflict 확인
2. 가장 작은 미완료 TODO 하나 선택
3. acceptance test와 edit path 선언
4. 최소 구현
5. focused test
6. visual 변경이면 browser visual review
7. 별도 reviewer/verifier pass
8. evidence와 결과 기록
9. gate 통과 시 다음 TODO
10. 실패 시 같은 TODO 안에서 원인 수정
```

실행 ledger 기본 위치:

```text
.agents/work/visual-studio-v1-gripgun/
  RUN_LOG.md
  CHECKPOINT.json
  test-results/
  screenshots/
  browser-console/
  performance/
  export/
  rubric/
```

`CHECKPOINT.json` 최소 필드:

```json
{
  "activeTodo": "V1-00",
  "status": "pending",
  "attempt": 0,
  "lastVerifiedCommit": null,
  "evidence": [],
  "blockers": []
}
```

`status`는 `pending | in_progress | passed | failed | waiting_external_runtime | waiting_human_review | blocked`만 허용한다. waiting 상태는 필요 evidence, 수행 가능 주체, 재개 조건, evidence 저장 위치, 대기 중 수행 가능 task, audience copy fallback을 함께 기록한다. 필수 static claim을 줄여 다음 TODO로 진행할 수 있는지 먼저 판정하고, 불가능할 때만 `blocked`로 전환해 사용자 결정을 요청한다.

각 atomic task는 ledger에 다음을 남긴다.

```text
taskId
parentTodo
dependsOn[]
editPaths[]
acceptanceCommand
expectedArtifact
rollbackBoundary
verifier
```

### 11.2 자율 진행 허용 범위

- 읽기 전용 repository 조사
- 계획에 명시된 `[LUMA]/src`, `studio`, `test` 구현
- 격리된 `projects/pragmata-2p-gripgun-prototype/` 수정
- focused test/typecheck/build
- local browser preview와 screenshot
- `.agents/work/` evidence 갱신
- acceptance criterion을 만족시키기 위한 좁은 fix

### 11.3 즉시 중단 조건

- 외부 LLM API 또는 유료 AI service 필요
- `[UNREAL]` 수정 필요
- `[BETA]`/`[FINAL]` established design 제거 필요
- 기존 user change 또는 active session과 path conflict
- dependency license/security/runtime 조건 미충족
- 동일 원인 검증 3회 연속 실패
- v1 범위 밖 범용 video/editor 기능 필요
- source와 runtime evidence가 서로 모순되어 audience claim 확정 불가
- destructive Git, push, publish, deploy 필요

중단 시 blocker, 재현 명령, 마지막 성공 evidence, 필요한 사용자 결정을 기록한다. acceptance criterion을 임의 완화하지 않는다.

### 11.4 rollback 규칙

- 시작 전 status와 diff 기록
- agent가 만든 patch만 되돌림
- user-owned untracked/dirty file 유지
- prototype과 기존 deck 분리 유지
- checkpoint commit은 실행 프롬프트가 commit을 허용한 경우에만 생성
- Slidev adapter 실패를 standalone v1 성공으로 대체 금지

## 12. v1 검증 계획

### 12.1 자동 검증

| 영역 | 검증 | 통과 기준 |
| --- | --- | --- |
| schema | valid/invalid fixture | 기대 결과 100% |
| serializer | round trip | semantic diff 0건 |
| operations | target-scoped mutation | unrelated diff 0건 |
| history | 20-step undo/redo | 원본/최종 복원 |
| timeline | cue/reset/replay | 10회 동일 state |
| adapter | presenter input routing | cue skip 0건 |
| build | typecheck/test/build | exit code 0 |

### 12.2 통합 검증

- editor에서 만든 scene을 standalone player에서 재생
- 같은 scene을 Slidev presenter에서 재생
- HTML build를 local static server에서 재생
- PDF poster state render
- 네 surface의 copy, asset, alignment, cue end state 비교

### 12.3 시각 검증

viewport:

- 1920×1080 primary
- 1280×720 secondary

필수 증거:

- 각 cue start/end screenshot
- reset 전후 같은 cue comparison
- editor/player/Slidev/HTML comparison
- PDF rendered page
- browser console log
- image replace 전후 JSON diff

### 12.4 성능 검증

측정 환경을 함께 기록한다.

- 10초 이상 scene playback median 50 FPS 이상
- 100ms 이상 main-thread stall 0회
- edit action 후 visual response 100ms 이내
- cue transition 중 console error/unhandled rejection 0건

성능 기준을 측정 도구 없이 추정 통과 처리하지 않는다.

### 12.5 이해도 검증

서로 독립된 project-비숙련 reviewer session/agent 3개가 source code를 보지 않고 scene capture와 audience copy만 보고 다음을 설명할 수 있어야 한다.

1. 누가 사격을 요청하는가
2. 누가 hit와 damage를 확정하는가
3. server의 impact presentation cue가 각 client에서 어떻게 표시되며, 왜 전달 보장으로 표현하면 안 되는가

3개 질문 중 reviewer별 3개 모두 정답, 전체 9/9를 v1 내부 bar로 사용한다. 사람 reviewer 3명 test는 v2 final rehearsal 전 필수 bar로 옮기고, 가용한 시점에 조기 실시한다.

## 13. v2 진입 bar

아래 13.1~13.5는 `V2_DRAFT_READY` bar다. 모두 통과하면 agent가 v2 implementation plan 초안을 자동 작성한다.

### 13.1 기능 bar

- [ ] text/image/move/resize/style/z-order 편집을 AI·Markdown 없이 완료
- [ ] undo/redo/save/reopen 완료
- [ ] hybrid cue 재생이 editor/standalone/Slidev/HTML에서 동일
- [ ] HTML/PDF export 성공
- [ ] raw Vue/CSS 수정 없이 GripGun scene 제작 완료

### 13.2 기술 정확성 bar

- [ ] 모든 GripGun claim이 C++ 또는 runtime evidence에 연결
- [ ] physical projectile, muzzle trace, second corrective trace 오표현 0건
- [ ] C++ default/BP CDO/runtime 값 혼동 0건
- [ ] current code와 stale docs 충돌 claim 0건
- [ ] Unreal repo 수정 0건

### 13.3 품질 bar

- [ ] automated test/typecheck/build 모두 통과
- [ ] visual must-fix defect 0건
- [ ] console error/unhandled rejection 0건
- [ ] 성능 기준 통과
- [ ] understanding test 9/9

### 13.4 편집 효율 bar

- [ ] text 변경 30초 이내
- [ ] image 교체 60초 이내
- [ ] 기존 motion preset 적용·조정 90초 이내
- [ ] operation 결과가 target 범위에 한정

### 13.5 handoff bar

- [ ] architecture/operation/cue 계약 문서화
- [ ] known limitation/deferred scope 기록
- [ ] evidence index 완성
- [ ] independent verifier가 `GO` 판정
- [ ] runtime-only claim은 검증 evidence가 없으면 v1 scene·v2 계획에서 명시적으로 제외 또는 `waiting_external_runtime` 표시

한 항목이라도 실패하면 v2 구현 범위를 추가하지 않고 v1 결함을 수정하거나 v1 범위를 재승인받는다. 객관 gate와 independent verifier `GO`가 모두 만족되면 agent는 사용자의 추가 승인 없이 v2 계획 초안을 자동 생성한다. v2 구현 시작은 사용자 승인을 받을 때까지 금지한다.

`V2_IMPLEMENTATION_READY`는 별도 bar다.

- [ ] V1-10 Unreal runtime lane 통과
- [ ] 사람 project-비숙련 reviewer 3명 이해도 9/9
- [ ] v2 계획에 대한 사용자 구현 승인

## 14. 최종 발표 평가 기준 crosswalk

공식 원본: [POTENUP | 최종 프로젝트 평가](https://app.notion.com/p/35909c484bff80939ac8c2ea7f86e1f7), 2026-06-12 조회본.

최종 발표는 beta와 같은 평가 기준과 자료 구성을 사용한다.

| 평가 항목 | 배점 | 최종 덱에서 필요한 주장 | 필요한 증거 |
| --- | ---: | --- | --- |
| 기술적 완성도 | 30 | 핵심 협동 loop, server authority, architecture, 예외 대응, 기술 이해 | current build gameplay, architecture flow, 반복 실행 결과 |
| 문제 해결 능력 | 30 | 기술 선택 이유, 대안 비교, troubleshooting, feedback 반영, 기술적 도전 | before/after, issue/PR, 검증 로그, GripGun authority boundary |
| 협업 능력 | 25 | 역할 분담, code/style 규칙, Git/PR, conflict 해결, 문서화 | commit/PR/asset history, Notion, Code Intent, 팀별 attribution |
| 문서 및 발표 | 10 | 체계적 구조, 시각 전달, 논리적 흐름, Q&A 준비 | visual-first deck, cue sheet, evidence map, 예상 질문 |
| 서비스 구현 가능성 | 5 | 반복 가능한 packaged build와 2P 협동 가치 | package 실행, demo recovery, 사용자 가치 설명 |

### 14.1 프로젝트 적용 원칙

아래는 공식 평가 문구가 아니라 Pragmata 2P 팬 프로젝트에 대한 적용 원칙이다.

- commercial expansion, monetization, original IP 확장 claim 금지
- 서비스 구현 가능성은 `학습 목적의 완성 가능한 2P 협동 경험`, `패키지 재현성`, `기술 구조의 확장 가능성`으로 답변
- 원작 asset attribution과 비상업적 학습 목적 명시

발표 자료 필수 구성 crosswalk:

1. 팀 구성과 역할
2. 프로젝트 개요, 선정 배경, 기획 의도, 목표
3. 기술 환경, stack, 협업 tool
4. 협업 노력과 문서화
5. 수행 절차, 일정, 기술 선택, 구현 방법
6. 사용자 scenario와 service flow
7. architecture와 책임 경계
8. 성능 개선과 troubleshooting
9. feedback 적용·보완
10. 기대 효과와 제한된 확장 가능성
11. 5분 이내 demo
12. 완성도 평가, 잘한 점, 아쉬운 점, 개선점
13. final-only 팀원 attribution
14. IP/asset attribution

근태 점수는 발표 slide content가 아니라 별도 운영 평가이므로 deck coverage 대상에서 제외한다.

## 15. v2 계획 작성 기준

v2의 목표는 feature 수 증가가 아니라 `[FINAL]` 전체를 rich-animation, visual-centric 최종 발표로 완성하는 것이다.

v2 계획 작성 전 다음 순서로 crosswalk를 완성한다.

```text
평가 기준
→ audience claim
→ source-of-truth
→ visual/live evidence
→ slide/scene 위치
→ motion grammar/preset
→ 필요한 editor/runtime 기능
→ acceptance test
```

### 15.1 content와 평가 coverage

- 공식 평가 항목 5개와 필수 구성 14개 coverage 100%
- 각 항목에 최소 1개 claim, 1개 source, 1개 visual/live evidence, 1개 slide/demo 위치
- section별 최대 4장 제약 준수
- final demo 5분 이내
- 전체 발표 18분 target과 final deck의 `[10:50-15:20]` demo window 정합화
- speaker-note 구간 start/end가 단조 증가하고 의도하지 않은 overlap 0건
- demo duration 270초 이하, 전체 마지막 timestamp `18:00`
- beta/final title, metadata, timing, notes를 final 기준으로 통일
- `slides.md` notes를 timing/copy source of truth로 정하고 stale script 중복 제거 또는 notes에서 생성
- machine-readable timing report/validator로 위 기준 검증

### 15.2 scene inventory와 preset 재사용

- final deck 전체 motion grammar inventory
- v1 preset으로 해결 가능한 scene 비율 측정
- custom behavior가 필요한 scene 목록과 이유
- 새 preset은 최소 2개 scene에서 재사용 가능한 경우 우선
- pause/hold frame이 정적 infographic으로도 읽히는지 확인

### 15.3 migration

- `[BETA]` 공통 gameplay/technical content와 `[FINAL]` final-only attribution 분리
- cover, interior decorative background, Q&A background 보존
- current-build foreground evidence mapping 보존
- placeholder 0건을 final 목표로 설정. 증거가 없으면 claim 제거 또는 실제 capture 선행
- GIF 참조 금지와 static evidence 정책 유지
- `deck.json` scaffold가 아니라 `slides.md`/향후 scene document를 실제 source로 취급

### 15.4 runtime과 editor 확장

- 25장 이상 deck에서 timeline/editor 성능
- scene lazy load와 asset preload
- presenter failure recovery, reset, previous/next, emergency skip
- offline HTML reliability
- PDF poster state와 HTML parity
- font/media packaging
- schema migration과 backward compatibility
- custom Vue/Markdown escape hatch의 손실 경계

### 15.5 접근성과 정보 전달

- keyboard presenter control
- reduced motion
- contrast와 caption
- semantic alt/accessibility label
- animation 없이도 결론을 이해하는 fallback
- 비숙련 audience의 정보 이해도 비교

### 15.6 evidence와 운영

- current build screenshot/video provenance
- numeric claim의 C++/Blueprint CDO/runtime evidence
- Git/PR/asset history 기반 team contribution
- asset license와 attribution
- visual regression baseline
- backup video와 live demo fallback
- 발표 당일 package/HTML/PDF recovery 절차
- V1-10 Unreal runtime lane 완료 및 사람 비숙련 reviewer 3명 이해도 9/9

## 16. v2 계획 산출물

v1 gate 통과 후 agent는 다음 파일을 draft할 수 있다.

```text
Docs/plans/PLAN_VISUAL_STUDIO_V2_PRAGMATA_FINAL.md
```

필수 포함:

- v1 measured result와 unresolved limitation
- official rubric coverage matrix
- final deck scene inventory
- migration map
- motion preset roadmap
- editor/runtime/export changes
- verification matrix
- final rehearsal와 recovery plan
- explicit scope, dependencies, risks, stop conditions

v2 계획 작성은 허용하되 v2 구현은 사용자 승인 전 시작하지 않는다.

## 17. 완료 정의

이 계획 문서의 완료는 v1 구현 완료가 아니다. 다음 조건을 만족한 실행 가능한 handoff 문서 상태를 의미한다.

- v1 scope와 non-goal 명확화
- GripGun 실제 구현과 storyboard 정합화
- ordered TODO와 testable acceptance criterion 포함
- agentic loop, evidence ledger, stop/rollback 규칙 포함
- v1 verification plan 포함
- v2 진입 bar 포함
- 최종 발표 공식 평가 기준 crosswalk 포함
- v2 계획 작성 기준과 산출물 정의 포함

## 18. 참고 근거

### LumaDeck와 deck

- `README.md:27-32,68-77`
- `Docs/architecture.md:7-27,39-56`
- `Docs/slidev-context.md`
- `projects/pragmata-2p-beta/AGENTS.md`
- `projects/pragmata-2p-beta/slides.md:46-102,112-178,221-351,521-546,656-724`
- `projects/pragmata-2p-beta/presentation-script.md:115-123`
- `projects/pragmata-2p-final/AGENTS.md`
- `projects/pragmata-2p-final/slides.md`

### Pragmata 2P

- `[UNREAL]/Source/Pragmata_2P/Characters/HughCharacter.cpp:1171-1192,2170-2232,2289-2298`
- `[UNREAL]/Source/Pragmata_2P/Weapon/GripGun.h:12-48`
- `[UNREAL]/Source/Pragmata_2P/Weapon/GripGun.cpp:15-246`
- `[UNREAL]/Source/Pragmata_2P/Weapon/WeaponBase.cpp:67-140`
- `[UNREAL]/Docs/Intent/Weapon/GripGun-PullTrigger.md`
- `[UNREAL]/Docs/Systems/Damage/damage-flow.md`
- `[UNREAL]/Docs/KNOW_HOW.md:983-1016,1059-1099,1187-1191`

### 공식 평가 기준

- [POTENUP | 최종 프로젝트 평가](https://app.notion.com/p/35909c484bff80939ac8c2ea7f86e1f7)
