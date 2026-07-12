---
theme: apple-basic
title: "Pragmata 2P 최종 발표"
fonts:
  sans: "Pretendard Variable"
  local: "Pretendard Variable"
  provider: none
info: |
  Pragmata 2P 협동 액션 퍼즐 기술 쇼케이스.
transition: none
layout: cover
class: prag-cover
---

<img src="./images/unreal-capture-title-background-16x9.png" alt="Hugh와 Diana가 함께 있는 최종 타이틀 맵" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />
<div style="position:absolute;inset:0;background:linear-gradient(90deg,rgb(243 244 246/.94) 0%,rgb(243 244 246/.72) 46%,rgb(243 244 246/.08) 100%);"></div>
<div class="prag-cover-copy">
  <p class="prag-eyebrow">POTENUP 최종 프로젝트 · TECHNICAL SHOWCASE</p>
  <h1><span class="prag-title">Pragmata 2P</span></h1>
  <p class="prag-subtitle">혼자 감당하던 전투와 해킹을<br>함께 해내는 재미로 확장한 2인 협동 액션 퍼즐</p>
  <div class="prag-tags"><span class="prag-tag"><b>팀 다이애나</b> · 정호진, 박준현, 안지성, 안민원, 윤제영</span><span class="prag-tag">최종 발표 · 2026.07.14</span></div>
</div>

<!--
[00:00-00:20]
완성된 Pragmata 2P와, 더 재미있는 협동을 위해 어떤 설계와 기술을 선택했는지 보여드리겠습니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# Pragmata를 처음 보는 분을 위한 30초

<div class="prag-core-image-layout">
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-04-project-goal-hugh-diana-summary.jpg" alt="Pragmata의 두 주인공 Hugh와 Diana" /><figcaption>Hugh는 전투와 이동, Diana는 탐색과 해킹을 담당하는 두 주인공.</figcaption></figure>
  <div class="prag-core-notes">
    <div class="prag-card"><h3>원작의 구조</h3><p>한 사람이 Hugh를 조작하면서 Diana의 능력까지 함께 사용.</p></div>
    <div class="prag-card"><h3>발견한 가능성</h3><p>이미 다른 능력을 가진 두 주인공을 실제 두 플레이어의 역할로 분리.</p></div>
    <div class="prag-card"><h3>우리의 확장</h3><p>싱글플레이의 복합 행동을 상호의존적인 2인 협동으로 재해석.</p></div>
  </div>
</div>

<!--
[00:20-00:55]
Pragmata는 Hugh가 전투하고 Diana가 해킹을 돕는 싱글플레이 게임입니다. 우리는 이미 다른 능력을 가진 두 주인공을 실제 두 명의 역할로 분리할 가능성을 보았습니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# 어려움을 나누는 대신, 서로를 필요하게 만들었음

<div class="prag-core-image-layout">
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-04-chaos-combat-hacking.png" alt="전투와 해킹을 동시에 처리하는 난전" /><figcaption>이동·사격·회피·해킹을 혼자 동시에 처리하는 상황.</figcaption></figure>
  <div class="prag-core-notes">
    <div class="prag-card"><h3>좋은 도전</h3><p>네트워크와 역할 설계까지 새로 배워야 했지만 확장 가치가 분명했음.</p></div>
    <div class="prag-card"><h3>재미의 기준</h3><p>한 명이 잘하는 게임이 아니라, 서로의 다음 행동을 만들어 주는 게임.</p></div>
    <div class="prag-card"><h3>공동 성취</h3><p>실패를 함께 조율하고 결국 함께 해냈을 때 남는 성취감.</p></div>
  </div>
</div>

<!--
[00:55-01:35]
단순히 난도를 낮추지 않았습니다. 한 사람의 행동이 다른 사람의 다음 행동을 가능하게 만들어, 함께 성공했을 때 더 큰 성취감을 주는 것을 목표로 삼았습니다.
-->

---
layout: default
class: prag-showcase-overview
---

# 완성된 협동 루프를 먼저 보여드리겠습니다

<div class="prag-centered-body prag-showcase-body">
  <div class="prag-showcase-path">
    <div v-click="1" class="prag-cue-rise"><span>01</span><strong>접속과 역할</strong><small>방 코드 · Hugh / Diana</small></div>
    <div v-click="2" class="prag-cue-rise"><span>02</span><strong>협동 탐사</strong><small>발견 · 해킹 · 경로 변화</small></div>
    <div v-click="3" class="prag-cue-rise"><span>03</span><strong>협동 전투</strong><small>약점 생성 · 사격 · 정화</small></div>
    <div v-click="4" class="prag-cue-rise"><span>04</span><strong>후반 완주</strong><small>대규모 전투 · 보스전</small></div>
  </div>
  <p class="prag-showcase-hint">누가 다음 행동의 기회를 만드는지에 주목해 주세요.</p>
  <p v-click="5" class="prag-showcase-video-text prag-cue-rise">시연 영상</p>
</div>

<!--
[01:35-06:55]
접속, 역할 분담, 탐사, 협동 전투와 보스전까지 이어집니다. 기능의 수보다 서로의 행동이 어떻게 연결되는지 봐 주시면 됩니다.
[발표 진행] 네 관전 포인트를 차례로 cue 진행. 다섯 번째 cue에서 5분 편집본 재생. 10분 전체 영상은 질의응답 또는 별도 요청 시 사용.
-->

---
layout: default
class: prag-core prag-dependency
---

# 한 사람의 행동이 다른 사람의 다음 행동을 만듦

<div class="prag-dependency-route">
  <div v-click="1" class="prag-role-orbit hugh prag-cue-rise"><span>HUGH</span><strong>이동 · 사격 · 생존</strong><small>전장을 버티고 결과를 실행</small></div>
  <div v-click="3" class="prag-dependency-core prag-cue-rise"><strong>공동 목표</strong><span>혼자서는 완성할 수 없음</span></div>
  <div v-click="2" class="prag-role-orbit diana prag-cue-rise"><span>DIANA</span><strong>탐색 · 해킹 · 정화</strong><small>공략 조건과 진행 경로 생성</small></div>
</div>
<div v-click="4" class="prag-dependency-result prag-cue-evidence"><strong>상호의존 게임 루프</strong><span>Diana가 기회를 만들고 → Hugh가 실행하고 → 성공을 함께 확인</span></div>

<!--
[06:55-07:30]
두 플레이어가 같은 일을 반씩 하지 않습니다. 한 사람의 행동이 다른 사람의 다음 행동을 가능하게 합니다.
[발표 진행] Hugh → Diana → 공동 목표 → 결론 순서로 cue 진행.
-->

---
layout: default
class: prag-core prag-sleek-technical prag-flow-slide
---

# 완성된 구조는 서버가 하나의 결과를 확정함

<div class="prag-centered-body prag-server-body">
  <div class="prag-technical-strip">
    <div v-click="1" class="prag-tech-node prag-cue-rise"><span>01 · 입력 화면</span><strong>Hugh·Diana 조작</strong><small>행동 요청을 서버로 전달</small></div>
    <i v-click="2" class="prag-tech-arrow"></i>
    <div v-click="2" class="prag-tech-node prag-cue-rise"><span>02 · 판정 서버</span><strong>규칙·판정·상태 확정</strong><small>역할·전투·해킹의 단일 기준</small></div>
    <i v-click="3" class="prag-tech-arrow"></i>
    <div v-click="3" class="prag-tech-node prag-cue-rise"><span>03 · 공유 월드</span><strong>두 화면에 같은 결과</strong><small>확정된 상태를 양쪽에 전달</small></div>
  </div>
  <div v-click="4" class="prag-dependency-result prag-cue-evidence"><strong>공유되는 게임 규칙</strong><span>역할 · 전투 · 해킹 · 월드 상태를 서버 기준으로 연결</span></div>
</div>

<!--
[07:30-08:05]
두 플레이어의 입력은 서버가 판정하고, 확정된 결과를 양쪽 화면에 전달합니다. 이후 기술 사례는 이 구조 안에서 더 좋은 플레이 감각을 만든 선택입니다.
[발표 진행] Client → Server → World → 결론.
-->

---
layout: default
class: prag-core prag-stack-slide
---

# 기술 스택과 개발 환경

<div class="prag-stack-grid">
  <div><span>ENGINE</span><strong>Unreal Engine 5.8</strong><p>C++로 핵심 규칙을 만들고 Blueprint로 플레이와 연출을 빠르게 연결.</p></div>
  <div><span>NETWORK</span><strong>한 플레이어가 서버를 겸함</strong><p>Listen Server 구조로 두 역할의 입력과 월드 결과를 한 기준에 맞춤.</p></div>
  <div><span>WORKFLOW</span><strong>Git · Docs · AI Rules</strong><p>브랜치, 문서, 자동 규칙으로 다섯 명의 작업을 하나의 빌드로 통합.</p></div>
</div>

<!--
[08:05-08:35]
Unreal Engine에서 C++와 Blueprint를 함께 사용했습니다. Git과 프로젝트 문서, 공통 규칙으로 다섯 명의 작업을 하나의 빌드로 연결했습니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# 총은 카메라가 보는 곳을 정확히 맞혀야 함

<div class="prag-focus-hero prag-stacked-visual prag-gripgun-slide">
  <div class="prag-gripgun-flow" aria-label="GripGun의 직관적인 사격 흐름">
    <div v-click="1" class="prag-gripgun-node prag-gripgun-client"><span>CAMERA</span><strong>화면 중앙 조준점</strong></div>
    <div v-click="2" class="prag-gripgun-segment prag-gripgun-intent"><i></i><div class="prag-gripgun-node prag-gripgun-hit"><span>시선 판정</span><strong>처음 맞은 지점 확정</strong></div></div>
  </div>
  <div v-click="3" class="prag-focus-caption"><strong>보고 조준한 곳이 맞는다</strong><span>기술의 목적은 더 자연스러운 손맛</span></div>
  <figure class="prag-image-frame prag-gripgun-evidence">
    <img class="prag-img" src="./images/slide-08-camera-trace-illustration-v2.png" alt="플레이어 뒤 카메라 렌즈에서 중앙 조준점을 지나 첫 충돌 대상까지 이어지는 단일 시선 판정 일러스트" />
    <figcaption>서버가 카메라 방향을 한 번 검사해 처음 맞은 지점을 확정.</figcaption>
  </figure>
</div>

<!--
[08:35-09:25]
총구 방향만 따르면 자세나 가까운 벽 때문에 화면 중앙과 결과가 어긋날 수 있습니다. 서버가 카메라 방향으로 한 번의 선 판정, 즉 Line Trace를 수행해 처음 맞은 지점을 확정했습니다. 핵심은 보고 조준한 곳이 맞는다는 감각입니다.
[발표 진행] 화면 중앙 → 시선 판정 → 결론.
-->

---
layout: default
class: prag-core prag-core-image
---

# Diana의 행동은 실제 공간을 바꿈

<div class="prag-focus-hero prag-stacked-visual prag-stacked-three prag-sleek-technical">
  <div class="prag-technical-strip"><div v-click="1" class="prag-tech-node prag-cue-rise"><span>찾기</span><strong>장치 선택</strong></div><i v-click="2" class="prag-tech-arrow"></i><div v-click="2" class="prag-tech-node prag-cue-rise"><span>해결</span><strong>퍼즐 성공</strong></div><i v-click="3" class="prag-tech-arrow"></i><div v-click="3" class="prag-tech-node prag-cue-rise"><span>변화</span><strong>문 · 전원 · 경로</strong></div></div>
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-16-hacking-puzzle.png" alt="Diana의 해킹 퍼즐" /><figcaption>해킹 결과가 UI 안에서 끝나지 않고 Hugh의 다음 행동을 가능하게 함.</figcaption></figure>
</div>

<!--
[09:25-10:05]
Diana의 스캔과 해킹은 화면 안에서 끝나지 않습니다. 성공 결과가 문, 전원, 이동 경로를 바꾸고 Hugh의 다음 행동을 가능하게 합니다.
[발표 진행] 찾기 → 해결 → 변화.
-->

---
layout: default
class: prag-map-elements prag-enemy-showcase
---

# 적 구성은 배운 협동을 다시 시험함

<div class="prag-centered-body prag-evidence-body"><div class="prag-player-layout">
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-16-enemy-walker.png" alt="Walker 적" /><figcaption>Walker · 기본 전투 규칙 학습</figcaption></figure>
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-16-enemy-tainted-executor.png" alt="오염 Executor 적" /><figcaption>오염 적 · Diana의 정화까지 요구</figcaption></figure>
  <div class="prag-card"><h3>공통 Enemy 로직</h3><p>여러 적이 공유하는 기반 위에 행동과 역할 요구를 다르게 구성.</p></div>
</div></div>

<!--
[10:05-10:40]
적은 수만 늘리지 않았습니다. 공통 Enemy 로직을 기반으로 Walker, Watcher, Executor와 오염 변형을 구성하고, 뒤로 갈수록 앞에서 배운 협동을 함께 사용하게 했습니다.
-->

---
layout: default
class: prag-map-elements prag-level-showcase
---

# 레벨은 압박과 휴식의 리듬을 설계함

<div class="prag-centered-body prag-level-body"><div class="prag-focus-hero"><figure class="prag-image-frame"><img class="prag-img prag-img-contain" src="./images/slide-21-level-map-main-route.png" alt="최종 레벨 진행 경로" /><figcaption>전투 → 탐색 → 휴식 → 보스전이 한 방향으로 이어지는 완성 경로.</figcaption></figure><div class="prag-focus-caption"><strong>필요한 순간에 배우고 사용</strong><span>공간이 다음 행동을 안내</span></div></div></div>

<!--
[10:40-11:10]
맵은 전투, 탐색, 휴식이 번갈아 나오도록 구성했습니다. 새 행동을 배운 뒤 곧바로 사용하고, 최종적으로 보스전까지 이어집니다.
-->

---
layout: default
class: prag-player-slide prag-ui-showcase
---

# 역할별 UI는 다음 행동에 필요한 정보만 보여 줌

<div class="prag-centered-body prag-evidence-body"><div class="prag-player-layout"><figure class="prag-image-frame"><img class="prag-img" src="./images/unreal-capture-hugh-hud-start.png" alt="Hugh HUD" /><figcaption>Hugh · 체력, 탄약, 전투 상태</figcaption></figure><figure class="prag-image-frame"><img class="prag-img" src="./images/unreal-capture-diana-hud-start.png" alt="Diana HUD" /><figcaption>Diana · 해킹 대상, 퍼즐, 능력 상태</figcaption></figure><div class="prag-card"><h3>정보도 역할의 일부</h3><p>같은 화면을 복사하지 않고 각자의 판단에 필요한 정보에 집중.</p></div></div></div>

<!--
[11:10-11:40]
Hugh는 전투 판단, Diana는 대상과 능력 판단에 필요한 정보를 봅니다. UI도 역할 분담을 강화하는 게임 설계의 일부입니다.
-->

---
layout: default
class: prag-troubleshoot
---

# 트러블슈팅 1 · 에디터의 성공을 실제 빌드까지 이어 냄

<div class="prag-centered-body prag-package-body">
  <div class="prag-package-pipeline">
    <div><span>PIE</span><strong>에디터에서는 정상</strong><small>맵과 기능이 실행됨</small></div>
    <i>→</i>
    <div><span>패키징</span><strong>실행 파일 생성 중 실패</strong><small>맵 목록·간접 연결 에셋·손상 애니메이션 누락</small></div>
    <i>→</i>
    <div><span>원인 추적</span><strong>어디서 참조가 끊겼는지 확인</strong><small>포함할 맵·간접 연결·에셋 묶음 점검</small></div>
    <i>→</i>
    <div class="lesson"><span>RESULT</span><strong>실제 실행 빌드 완성</strong><small>에디터 밖에서도 전체 경로 검증</small></div>
  </div>
  <p class="prag-trouble-thesis">“에디터에서 된다”가 아니라 <b>배포된 빌드에서 끝까지 된다</b>를 완료 기준으로 삼음.</p>
</div>

<!--
[11:40-12:25]
PIE에서는 정상이어도 패키징 과정에서는 맵 목록, 간접 참조 에셋, 잘못된 애니메이션 참조 때문에 Cook이 실패했습니다. 참조 그래프를 단계별로 추적하고 실제 실행 빌드에서 전체 경로를 다시 검증했습니다.
-->

---
layout: default
class: prag-troubleshoot prag-trouble-race
---

# 트러블슈팅 2 · Diana의 자세가 상대 화면에서 어긋났음

<div class="prag-trouble-hero">
  <figure class="prag-image-frame"><img class="prag-img prag-img-contain" src="./images/slide-08-diana-title-animgraph.png" alt="Diana Animation Graph" /><figcaption>Diana 추종·애니메이션 상태가 네트워크 역할과 일치하도록 정리.</figcaption></figure>
  <div class="prag-trouble-answer"><span>보이는 문제</span><strong>따라오기는 하지만 자세가 늦거나 다르게 보임</strong><span>해결 기준</span><strong>판정·상태 전달·화면 표현을 따로 검증</strong><p>한 덩어리로 고치지 않고 멈춘 단계를 분리</p></div>
</div>

<!--
[12:25-13:05]
Diana의 Hugh 추종과 애니메이션은 역할 판정, 복제 도착, 화면 표현이 서로 다른 시점에 움직였습니다. 세 책임을 분리해 확인하면서 안정화했습니다.
-->

---
layout: default
class: prag-troubleshoot
---

# 트러블슈팅 3 · 과거 신호가 현재 퍼즐을 닫음

<div class="prag-centered-body prag-race-body">
  <div class="prag-race-timeline">
    <div><span>SESSION A</span><strong>완료 연출 예약</strong><small>잠시 뒤 UI를 닫는 timer</small></div>
    <i>→</i>
    <div><span>SESSION B</span><strong>새 대상 해킹 시작</strong><small>같은 HUD가 새 상태에 연결됨</small></div>
    <i class="danger">×</i>
    <div class="danger-card"><span>STALE CALLBACK</span><strong>A의 timer가 B를 종료</strong><small>시간차 때문에 재현이 어려운 race condition</small></div>
  </div>
  <div class="prag-race-solution"><strong>종료 전에 대상 일치 여부를 다시 확인</strong><span>오래된 callback은 현재 세션을 변경하지 못하게 차단</span></div>
</div>

<!--
[13:05-13:45]
이전 해킹의 완료 연출 timer가 남아 있는 동안 새 대상을 해킹하면, 오래된 callback이 새 UI까지 닫는 문제가 있었습니다. callback이 실행될 때 대상이 여전히 같은지 확인해 과거 세션이 현재 상태를 바꾸지 못하게 했습니다.
-->

---
layout: default
class: prag-core prag-rules-slide
---

# 코드 규칙과 피드백을 작업 환경에 고정함

<div class="prag-rule-grid">
  <div><span>01 · 시작부터 자동 적용</span><strong>편집기 코드 규칙</strong><p>.editorconfig로 인코딩·줄바꿈·들여쓰기 편차를 저장 전에 차단.</p></div>
  <div><span>02 · 사람과 AI가 함께 읽음</span><strong>13개 작업 지침</strong><p>코드·검증·안전·대형 에셋 기준을 같은 규칙으로 적용.</p></div>
  <div><span>03 · 피드백을 다음 작업에 반영</span><strong>Intent · KNOW_HOW</strong><p>발견한 문제와 선택 이유를 기록해 같은 실수를 반복하지 않음.</p></div>
</div>
<p class="prag-rule-loop">문제 발견 → 판단 기록 → 규칙 갱신 → 다음 작업에 자동 적용</p>

<!--
[13:45-14:20]
프로젝트 시작부터 editorconfig와 .agents 지침을 두었습니다. 사람과 AI가 작업할 때 같은 형식, 설계 의도, 검증 규칙을 자동으로 따르게 해 리뷰 이전의 편차를 줄였습니다.
-->

---
layout: default
class: prag-core prag-sleek-technical prag-flow-slide
---

# 협업 방식: 작업 병합

<div class="prag-history-cleanse">
  <div v-click="1" class="prag-cue-rise"><span>5GB 제한</span><strong>맵 에셋이 모든 이력에 남음</strong><small>파일 삭제만으로는 저장소 용량이 줄지 않음</small></div>
  <i v-click="2">→</i>
  <div v-click="2" class="prag-cue-rise"><span>17,000여 에셋</span><strong>모든 브랜치 이력에서 제거</strong><small>일괄 강제 갱신은 미반영 작업 손실 위험</small></div>
  <i v-click="3">→</i>
  <div v-click="3" class="prag-cue-rise"><span>단계적 시범 적용</span><strong>develop 검증 후 개인 브랜치 적용</strong><small>충돌을 피하지 않고 통제 가능한 단위로 축소</small></div>
</div>
<div class="prag-git-proof">
  <div><span>76단계 REBASE</span><strong>hojin 브랜치 시범 적용</strong></div>
  <div><span>39일간 통합</span><strong>26.06.04 시작 → 26.07.13 완료</strong></div>
  <div><span>최종 검증</span><strong>작업 보존 · 용량 감소 · rebase 성공</strong></div>
</div>

<!--
[14:20-15:05]
대형 맵 에셋이 모든 Git 이력에 남아 저장소가 5GB 제한을 넘었습니다. 단순 삭제로는 해결되지 않았고, 한 번에 모든 branch를 강제로 바꾸면 팀원의 미반영 작업이 사라질 수 있었습니다. develop에서 정리 방식을 검증한 뒤 hojin 브랜치에 76단계 rebase를 시범 적용해 용량 감소와 작업 보존을 확인했고, 같은 원칙으로 팀 branch를 정리했습니다.
[Q&A 근거] 5GB·17,000여 에셋·76단계 rebase는 당시 작업자가 기록한 운영 수치이며, 절차 근거는 Docs/Operations/history-rewrite-team-runbook.md와 Docs/KNOW_HOW.md의 Large Asset Git Hygiene에 정리되어 있습니다.
[발표 진행] 5GB 문제 → 전체 이력 정화 → 안전한 시범 적용 → 검증 결과.
-->

---
layout: default
class: prag-core prag-team-ownership
---

# 누가 무엇을 완성했는가

<div class="prag-centered-body prag-ownership-body"><div class="prag-ownership-grid">
  <div><strong>정호진</strong><span>PROJECT LEAD</span><p>Diana · 서버 · 애니메이션<br>에셋·재질 · Sentinel</p></div>
  <div><strong>박준현</strong><span>HUGH & WEAPONS</span><p>Hugh 이동·행동·무기<br>Walker · Watcher</p></div>
  <div><strong>안지성</strong><span>ENEMY & LEVEL</span><p>공통 Enemy 로직·오염 적<br>Stasis Net · 레벨</p></div>
  <div><strong>안민원</strong><span>MAP & PROPS</span><p>맵 에셋·맵 제작<br>Props · Sentinel</p></div>
  <div><strong>윤제영</strong><span>UI & PUZZLE</span><p>전체 WidgetBlueprint<br>UI 연출 · 해킹 퍼즐</p></div>
</div><p class="prag-ownership-thesis">플레이어 · 적 · 레벨 · UI를 각자 책임지고, 서버와 공통 규칙에서 하나의 플레이로 통합</p></div>

<!--
[15:05-15:55]
다섯 명은 기능을 단순 분배하지 않고, 플레이어·무기·적·레벨·UI처럼 서로 연결되는 시스템을 각자 책임졌습니다. 정호진은 Diana와 서버·통합, 박준현은 Hugh와 무기, 안지성은 적 공통 로직과 레벨, 안민원은 맵과 프롭, 윤제영은 전체 UI와 해킹 퍼즐을 완성했습니다.
-->

---
layout: default
class: prag-final-thesis
---

# 목표를 완성된 플레이로 검증함

<div class="prag-final-proof">
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-16-enemy-sentinel-boss.png" alt="완성된 Sentinel 보스전" /><figcaption>방 코드 접속부터 역할 선택, 탐사, 전투, 정화와 보스전까지 완주.</figcaption></figure>
  <div class="prag-final-message"><strong>FINAL BUILD · 07.13</strong><p>Host Hugh ↔ Client Diana<br>Host Diana ↔ Client Hugh<br>접속·맵 이동·역할 유지<br>정화·후반 보스전 완주</p><small>두 역할 조합 · packaged build · 전체 플레이 경로 확인</small></div>
</div>

<!--
[15:55-16:25]
처음 세운 목표는 두 역할이 서로를 필요로 하는 완성된 플레이였습니다. 접속부터 역할 선택, 탐사, 전투, 정화와 보스전까지 하나의 빌드로 완주합니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# 완성 결과와 다음 프로젝트에 적용할 경계를 정리함

<div class="prag-core-image-layout">
  <figure class="prag-image-frame"><img class="prag-img prag-img-contain" src="./images/slide-ai-code-intent.png" alt="구현 의도와 검증 기준을 보존하는 Code Intent 문서" /><figcaption>구현 이유·권한·검증 기준까지 기록해 다음 변경의 출발점으로 사용.</figcaption></figure>
  <div class="prag-core-notes">
    <div class="prag-card"><h3>잘한 선택</h3><p>역할·레벨·기술을 하나의 재미 목표로 연결.</p></div>
    <div class="prag-card"><h3>가장 큰 비용</h3><p>뒤늦은 통합보다 Host·Client·패키지 검증을 더 일찍 반복해야 했음.</p></div>
    <div class="prag-card"><h3>다음 적용</h3><p>공통 Enemy·협동 상호작용·검증 문서를 새 콘텐츠의 기반으로 재사용.</p></div>
  </div>
</div>
<p class="prag-project-boundary">비상업적 학습 목적의 팬 프로젝트 · 원작 IP와 추출 에셋의 권리는 원저작자에게 있음</p>

<!--
[16:25-16:55]
완성 과정에서 가장 크게 배운 것은 문제를 푸는 방식입니다. 보이는 증상 하나를 권한, 복제, 표현 단계로 나누고, 그 판단을 문서와 규칙으로 남겼습니다.
-->

---
layout: default
class: prag-final-thesis
---

# 기술은 더 재미있는 협동을 만들기 위한 수단

<div class="prag-final-proof">
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-04-chaos-combat-hacking.png" alt="Hugh의 전투와 Diana의 해킹이 동시에 진행되는 협동 플레이" /><figcaption>한 사람의 행동이 다른 사람의 다음 기회를 만드는 완성된 협동 플레이.</figcaption></figure>
  <div class="prag-final-message"><strong>FUN FIRST</strong><p>역할 설계로 서로를 필요하게 만들고<br>레벨 디자인으로 배움과 긴장을 조절하고<br>기술로 같은 결과를 함께 경험하게 함</p></div>
</div>

<!--
[16:55-17:20]
기술을 많이 쓰는 것이 목표는 아니었습니다. 역할, 레벨, 네트워크 기술은 모두 더 직관적이고 재미있는 협동을 만들기 위한 수단이었습니다.
-->

---
layout: center
class: prag-closing
---

<p class="prag-closing-eyebrow">POTENUP 최종 프로젝트</p>

# <span class="prag-title">Q&A</span>

<p class="prag-qa-subtitle">함께 해내는 순간을 위해, 기술과 레벨을 하나로 설계했습니다.</p>

<!--
[17:20-17:35]
감사합니다. 질문 받겠습니다. 5분 시연 영상 포함 총 17분 35초, 약 7분 25초의 운영 여유를 확보합니다.
-->
