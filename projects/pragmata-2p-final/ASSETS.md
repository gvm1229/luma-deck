# 로컬 이미지 백업

## 윤제영 UI 시연 GIF

다음 파일은 윤제영 담당 UI의 실제 동작을 보여 주는 로컬 전용 발표 자산이다. 용량 때문에 Git에는 포함하지 않으며, 원본은 `C:/Users/user/Downloads/윤제영/`에 보관한다.

- `images/yoon-hacking-ui.gif` ← `해킹 UI.gif`
- `images/yoon-map-puzzle-ui.gif` ← `맵 퍼즐 UI.gif`
- `images/yoon-weapon-ui.gif` ← `무기 UI.gif`
- `images/yoon-hacking-ui.mp4`, `images/yoon-map-puzzle-ui.mp4`, `images/yoon-weapon-ui.mp4`는 위 GIF를 H.264로 변환한 발표 재생본
- GIF·video 합성 레이어가 Slidev 스케일 환경에서 화면 밖 검은 블록을 만들 수 있어, 관객 화면에서는 MP4 프레임을 `LoopingMediaCanvas`에 그림
- 맵 퍼즐 재생본은 원본의 빈 프레임 구간을 제외하고 퍼즐 원형 UI가 보이는 `0.8–3.0초` 구간만 반복

## 원작 싱글플레이 구조 GIF

- `images/solo-do-all.gif` ← `C:/Users/user/Downloads/PRAGMATA/최종발표/solo_do_all.gif`
- 원작에서 한 플레이어가 이동·사격·해킹을 한 화면에서 동시에 수행하는 구조를 소개하는 로컬 전용 발표 자산
- 대용량 파일이므로 Git에는 포함하지 않고 수동 이미지 백업에 포함

## Figma 협업 보드

- `images/slide-collaboration-figma-board.png`: 초기 기획, 플레이 화면, 강화·고정·패시브 요소, 무기 파트와 맵 레벨 디자인을 한 화면에 정리한 Figma 협업 보드 캡처
- 사용자가 2026-07-14 제공한 원본이며 Git에는 포함하지 않고 수동 이미지 백업에 포함
- SHA-256: `DC2F7BACB69C4900193A6133F13EBC3B5BB715BC875D2EFD1F83F8B6826FB8BC`

## 최종 발표 표지

- `images/slide-01-cover-final-build.png`: 최종 타이틀 화면 앞에 함께 앉아 있는 Hugh와 Diana를 보여 주는 1번 슬라이드 표지 이미지
- 사용자가 2026-07-14 제공한 원본이며 Git에는 포함하지 않고 수동 이미지 백업에 포함
- SHA-256: `DF1E6C95F4F9FBCA9B0A7586F779CA1598F1230AD29EBAA91C40CFE5F5664B69`

## Diana 잠금 해제 전·후

- `images/slide-10-locks-all-active.png`: Diana 해킹 전 세 개의 잠금 장치가 모두 활성화된 상태
- `images/slide-10-lock-one-disabled.png`: Diana가 세 잠금 장치 중 하나를 해제한 상태
- 사용자가 2026-07-14 제공한 최종 빌드 캡처이며 Git에는 포함하지 않고 수동 이미지 백업에 포함
- SHA-256: `B0DC13B06DD5D7A19191666EAA93399E564E28982E7F4F52583D0D2ECC7F4150`, `95A0A2557FE39B5991718567330805F117EB0AA36390E72826ACFB8C2720301F`

## 레벨 난이도·압박 흐름 자료

- `images/slide-19-difficulty-combat-score-table.png`: 전투 구간 난이도 점수표
- `images/slide-19-difficulty-noncombat-score-table.png`: 비전투·휴식·해킹 구간 난이도 점수표
- `images/slide-20-flow-after-pressure-graph.png`: 조정 후 플레이 압박 흐름 그래프
- `images/slide-20-flow-after-difficulty-table.png`: 진행 순서에 따른 난이도 배열표
- 네 이미지는 레벨 설계 과정의 실제 분석 자료이며 Git에는 포함하지 않고 수동 이미지 백업에 포함

## 역할별 HUD

- `images/slide-14-hugh-hud.png`: 체력, 무기, 탄약과 전투 상태를 배치한 Hugh HUD 전체 화면
- `images/slide-14-diana-hud.png`: 해킹 대상, 진행도와 능력 상태를 크게 보여 주는 Diana HUD 전체 화면
- 사용자가 2026-07-14 제공한 UI 작업 캡처이며 Git에는 포함하지 않고 수동 이미지 백업에 포함
- SHA-256: `1C1F8213CDC4CABCA06AE239CCFED22CE723B6780D583E87ABB76F49B891163E`, `B9F2EF918F0E4BD3526748B5EC872DA6B653AD2DE5DCE337D6953C481C6A88C0`

## 오염 Executor 협동 전투

- `images/slide-11-tainted-executor-coop.png`: Hugh와 Diana가 오염 Executor를 함께 상대하는 최종 빌드 전투 화면
- 사용자가 2026-07-14 제공한 원본이며 Git에는 포함하지 않고 수동 이미지 백업에 포함
- 크기: `1346×781`
- SHA-256: `3CD70932DBD91FC5CF8B1650BBD6BC1DE3CB5F0EB1B12C3698BE60FE79DC4A3F`

## UnreelMCP Diana AnimGraph 결과

- `images/slide-08-diana-title-animgraph.png`: UnreelMCP로 Sequence Player, Layered Blend per Bone, RigidBody와 Output Pose를 연결한 Diana 타이틀 AnimGraph 결과
- 실제 Editor 자동화 성과를 먼저 보여 준 뒤 다음 Code Intent 슬라이드에서 자동화의 기술 부채와 통제 방식을 설명
- 크기: `2342×576`
- SHA-256: `3377414B4AE1068D69B6D5D1ACDB9F6A8026FEF9858DC91CA5C276966C0C63A2`

## 안민원 맵 성과

- `images/slide-minwon-map-start.png`: 추출 에셋으로 구성한 시작 구역, SHA-256 `CA6746B36388E3CF8476C8D6EE036CD4B0F9C1AF976E65DE8A60866063F9C344`
- `images/slide-minwon-locked-door-laser.png`: 잠금문과 레이저 트랩 배치, SHA-256 `BC713ECF9C5EF98704F87780CCB3294B46CDC0AF8A5523ACD6774EB2254A5759`
- `images/slide-minwon-platformer-stage.png`: 처음부터 끝까지 이어지는 플랫폼 구간, SHA-256 `D9F0F4DBA35001B5F89F8586D85AC0B6ADD36DFC988496C80EF716ADF2C48711`
- `images/slide-minwon-boss-map-navmesh.png`: Sentinel 보스전 공간과 이동 영역 구성, SHA-256 `275E9530287B2BC83038682BF2BE8A5E6D8742EB8606A271836B58B9EF83B0FE`
- 네 이미지는 `C:/Users/user/Downloads/안민원/`에서 복사한 실제 작업 결과이며 Git에는 포함하지 않고 수동 이미지 백업에 포함

## 체크포인트 업그레이드 UI

- `images/slide-gameflow-checkpoint-upgrade-ui.png`: 체크포인트 상호작용 시 열리는 Suit 업그레이드 UI. 탐색 재화를 성장 선택으로 연결하는 게임 흐름 설명에 사용
- 사용자가 2026-07-14 제공한 UI 작업 캡처이며 Git에는 포함하지 않고 수동 이미지 백업에 포함
- SHA-256: `71C5DC33C31C821754032C85C9FCA2EBE05ACA79AD80A417BFDC85EF6EE585C9`

## 안지성 공통 전투 규칙

- `images/slide-jiseong-shared-behavior-tree.png`: 여러 적이 공유하는 Behavior Tree. 감지·추적·공격·순찰·Territory 복귀 흐름을 한 번 구현하고 적별 공격 패턴만 확장한 구조
- 사용자가 2026-07-14 제공한 실제 Unreal Editor 캡처이며 Git에는 포함하지 않고 수동 이미지 백업에 포함
- SHA-256: `EDE572DD6F5888C7F60BB72D4F63DB992A2BBC1FA4AB0509CD93C0CB5030B837`

## 정호진 페어드 애니메이션

- `images/slide-hojin-paired-animation-airborne.png`: Hugh의 도약 상태에 맞춰 Diana가 함께 공중 상태를 유지하는 최종 빌드 장면
- 사용자가 2026-07-14 제공한 최종 빌드 캡처이며 Git에는 포함하지 않고 수동 이미지 백업에 포함
- SHA-256: `F9CF22559E42A521D45D5A0066D4871A7B0D43F48D820691A1A592758BEA63BD`

- `images/`는 Git에 포함하지 않음
- `slides.md`의 상대 경로를 유지한 채 별도 백업에서 복원
- 빌드 전 누락 이미지 확인 필요
- `images/slide-08-camera-trace-illustration.png`: 슬라이드 8 카메라 기준 단일 시선 판정 설명용 생성 일러스트. 수동 이미지 백업에 반드시 포함
- `images/slide-08-camera-trace-illustration-v2.png`: 슬라이드 8 최종 일러스트. 플레이어 뒤 카메라 렌즈를 단일 Line Trace의 정확한 시작점으로 명시함. 수동 이미지 백업에 반드시 포함
- `images/slide-08-camera-aim-reference.png`: 슬라이드 8 카메라 시선과 총구 방향 비교 이미지. 출처 영상 `눈에서 총알이 튀어나오는 FPS 게임의 사격 판정` (`https://youtu.be/kucqGt8Q2a8`), SHA-256 `DE2F36C532EA562B783DB250DA7AEA1EB1D5606083D76F0D9642225D4AF87E72`. 수동 이미지 백업에 반드시 포함
