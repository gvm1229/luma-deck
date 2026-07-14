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

<img src="./images/slide-01-cover-final-build.png" alt="완성된 타이틀 화면 앞에 함께 앉아 있는 Hugh와 Diana" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />
<div style="position:absolute;inset:0;background:linear-gradient(90deg,rgb(243 244 246/.94) 0%,rgb(243 244 246/.72) 46%,rgb(243 244 246/.08) 100%);"></div>
<div class="prag-cover-copy">
  <p class="prag-eyebrow">POTENUP 최종 프로젝트 | 최종 발표</p>
  <h1><span class="prag-title">Pragmata 2P</span></h1>
  <p class="prag-subtitle">혼자 감당하던 전투와 해킹을<br>함께 해내는 재미로 확장한 2인 협동 액션 퍼즐</p>
  <div class="prag-tags"><span class="prag-tag"><b>팀 다이애나</b> · 정호진, 박준현, 안지성, 안민원, 윤제영</span><span class="prag-tag">최종 발표 · 2026.07.14</span></div>
</div>
<p class="prag-copyright-mark">PRAGMATA ©CAPCOM</p>

<!--
[00:00-00:20]
안녕하세요, 이번 프래그마타 프로젝트의 발표를 팀 다이애나를 대표해서 맡게 된 정호진입니다.
완성된 Pragmata 2P와, 더 재미있는 협동을 위해 어떤 설계와 기술을 선택했는지 보여드리겠습니다.
-->

---
layout: default
class: prag-core prag-solo-why
---

<p class="prag-slide-category">PROJECT OVERVIEW</p>

# 혼자 감당하던 전투와 해킹에서 협동 가능성을 봄

<div class="prag-solo-why-layout">
  <figure class="prag-image-frame"><img class="prag-img" src="./images/solo-do-all.gif" alt="원작에서 한 플레이어가 이동, 사격, 해킹을 동시에 수행하는 장면" /><figcaption>원작에서는 한 플레이어가 이동·사격·해킹을 한 화면에서 동시에 수행.</figcaption></figure>
  <div class="prag-solo-why-points">
    <div v-click="1" class="prag-card prag-cue-rise"><span>ORIGINAL</span><h3>한 사람이 모두 수행</h3><p>Hugh를 움직이고 사격하면서 Diana의 해킹까지 함께 조작.</p></div>
    <div v-click="2" class="prag-card prag-cue-rise"><span>POTENTIAL</span><h3>두 주인공에서 역할을 발견</h3><p>이미 다른 능력을 가진 두 인물을 실제 두 플레이어로 분리.</p></div>
    <div v-click="3" class="prag-card prag-cue-rise"><span>OUR WHY</span><h3>공동 성취를 만드는 협동</h3><p>부담만 나누지 않고 서로의 다음 행동을 만들어 주도록 확장.</p></div>
  </div>
</div>

<!--
[00:20-01:10]
Pragmata 원작에서는 한 플레이어가 Hugh를 움직이고 사격하면서 Diana의 해킹까지 한 화면에서 함께 조작합니다. 우리는 이것을 단순한 조작 부담으로만 보지 않았습니다. 이미 능력이 다른 두 주인공이 있기 때문에 실제 두 플레이어의 역할로 분리할 가능성이 분명했습니다. 네트워크와 역할 설계를 새로 배워야 하는 도전이었지만, 서로의 다음 행동을 만들어 주고 함께 성공하는 재미로 확장할 가치가 있다고 판단했습니다.
[발표 진행] 원작 구조 → 두 역할의 가능성 → 우리가 선택한 협동의 목적 순서로 cue 진행.
-->

---
layout: default
class: prag-showcase-overview
---

<p class="prag-slide-category">GAMEPLAY SHOWCASE</p>

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
[01:10-06:30]
접속, 역할 분담, 탐사, 협동 전투와 보스전까지 이어집니다. 기능의 수보다 서로의 행동이 어떻게 연결되는지 봐 주시면 됩니다.
[발표 진행] 네 관전 포인트를 차례로 cue 진행. 다섯 번째 cue에서 5분 편집본 재생. 10분 전체 영상은 질의응답 또는 별도 요청 시 사용.
-->

---
layout: default
class: prag-core prag-dependency
---

<p class="prag-slide-category">PROJECT PROCEDURE · MENTORING FEEDBACK</p>

# 한 사람의 행동이 다른 사람의 다음 행동을 만듦

<div class="prag-dependency-route">
  <div v-click="1" class="prag-role-orbit hugh prag-cue-rise"><span>HUGH</span><strong>이동 · 사격 · 생존</strong><small>전장을 버티고 결과를 실행</small></div>
  <div v-click="3" class="prag-dependency-core prag-cue-rise"><strong>공동 목표</strong><span>혼자서는 완성할 수 없음</span></div>
  <div v-click="2" class="prag-role-orbit diana prag-cue-rise"><span>DIANA</span><strong>탐색 · 해킹 · 정화</strong><small>공략 조건과 진행 경로 생성</small></div>
</div>
<div v-click="4" class="prag-dependency-result prag-cue-evidence"><strong>“재미를 추구하는 게임이어야 한다”</strong><span>이득우 교수 멘토링 피드백을 예상 플레이 시나리오와 상호의존 루프로 구체화</span></div>

<!--
[06:30-07:05]
이득우 교수 멘토링에서 가장 크게 받은 피드백은 기술보다 재미가 먼저 보여야 한다는 말이었습니다. 그래서 두 사람이 같은 일을 나누는 대신, 한 사람의 행동이 상대의 다음 행동을 만드는 상호의존 루프와 실제로 다투고 성공하는 예상 시나리오부터 설계했습니다.
[발표 진행] Hugh 역할 → Diana 역할 → 공동 목표 → 멘토 피드백과 설계 반영 순서로 cue 진행.
-->

---
layout: default
class: prag-core prag-coop-comic
---

<p class="prag-slide-category">CO-OP PLAY SCENARIO</p>

# 협동에서는 서로의 실수가 그대로 보임

<div class="prag-comic-grid prag-comic-two">
  <div v-click="1" class="prag-comic-panel prag-cue-rise"><div class="prag-comic-scene hugh"><span>H</span><i>!</i></div><p class="prag-speech left">“야, 좀 잘해 봐!”</p><small>전투와 해킹 타이밍이 어긋남</small></div>
  <div v-click="2" class="prag-comic-panel prag-cue-rise"><div class="prag-comic-scene diana"><span>D</span><i>×</i></div><p class="prag-speech right">“아, 왜 던져!”</p><small>서로의 실수가 그대로 보임</small></div>
</div>

<!--
[07:05-07:25]
협동에서는 서로의 실수가 바로 보이기 때문에 자연스럽게 다투기도 합니다. 전투와 해킹의 타이밍이 어긋나면 누구의 행동이 늦었는지도 선명하게 드러납니다.
[발표 진행] 첫 번째 갈등 장면과 두 번째 갈등 장면을 차례로 cue 진행.
-->

---
layout: default
class: prag-core prag-coop-comic
---

<p class="prag-slide-category">CO-OP PLAY SCENARIO</p>

# 다시 맞추고 함께 해내는 순간이 더 크게 남음

<div class="prag-comic-grid prag-comic-two">
  <div v-click="1" class="prag-comic-panel prag-cue-rise"><div class="prag-comic-scene sync"><span>H</span><b>→</b><span>D</span></div><p class="prag-speech left">“내가 버틸게. 지금 해킹!”</p><small>역할과 타이밍을 다시 조율</small></div>
  <div v-click="2" class="prag-comic-panel success prag-cue-rise"><div class="prag-comic-scene success"><span>H</span><i>★</i><span>D</span></div><p class="prag-speech right">“오, 해냈다! 나이스!”</p><small>공동 성공이 성취감으로 전환</small></div>
</div>
<div v-click="3" class="prag-comic-thesis prag-cue-evidence"><strong>우정 파괴에서 공동 성취로</strong><span>함께 해내는 순간을 주요 재미로 설계</span></div>

<!--
[07:25-07:45]
하지만 역할과 타이밍을 다시 맞추고 함께 성공하면 그 성취감은 혼자 해냈을 때보다 커집니다. 갈등 자체가 목적이 아니라, 실패를 대화와 협력으로 뒤집는 순간을 핵심 재미로 설계했습니다.
[발표 진행] 역할 조율 → 공동 성공 → 핵심 재미 순서로 cue 진행.
-->

---
layout: default
class: prag-core prag-sleek-technical prag-flow-slide
---

<p class="prag-slide-category">PROJECT PROCEDURE · GAME ARCHITECTURE</p>

# 입력·서버 판정·공유 월드를 한 방향으로 연결

<div class="prag-centered-body prag-server-body">
  <div class="prag-technical-strip">
    <div v-click="1" class="prag-tech-node prag-cue-rise"><span>01 · CLIENT LAYER</span><strong>Hugh·Diana 입력 · 로컬 UI</strong><small>행동 의도와 즉각적인 화면 반응</small></div>
    <i v-click="2" class="prag-tech-arrow"></i>
    <div v-click="2" class="prag-tech-node prag-cue-rise"><span>02 · AUTHORITY LAYER</span><strong>역할 · 전투 · 상호작용 판정</strong><small>Listen Server가 최종 상태를 확정</small></div>
    <i v-click="3" class="prag-tech-arrow"></i>
    <div v-click="3" class="prag-tech-node prag-cue-rise"><span>03 · REPLICATED WORLD</span><strong>Enemy · Prop · 진행 상태</strong><small>두 플레이어에게 같은 월드 결과 전달</small></div>
  </div>
  <div v-click="4" class="prag-dependency-result prag-cue-evidence"><strong>표시 계층</strong><span>확정 상태를 HUD ViewModel과 즉시 이벤트로 역할별 화면에 전달</span></div>
</div>

<!--
[07:45-08:20]
입력과 UI는 각 플레이어에게 있지만, 역할·전투·상호작용의 결과는 서버가 확정합니다. 적, 맵 오브젝트와 진행 상태를 양쪽에 공유하고, 확정된 결과를 역할별 UI가 필요한 방식으로 보여 줍니다.
[Q&A 대응] 서버는 역할, 전투, 해킹과 월드 진행의 최종 상태를 소유합니다. 입력한 플레이어는 반응성을 위해 일부 표현을 먼저 보여 줄 수 있지만, 다른 플레이어와 공유되는 결과는 서버 확인 뒤에만 확정합니다.
[발표 진행] Client Layer → Authority Layer → Replicated World → 표시 계층.
-->

---
layout: default
class: prag-core prag-stack-slide prag-no-card-emphasis
---

<p class="prag-slide-category">PROJECT PROCEDURE · TECHNOLOGY</p>

# 세 가지 기술 경계를 나눠 협동 플레이를 완성

<div class="prag-stack-grid">
  <div><span>EDITOR AUTOMATION</span><strong>Unreal Engine 5.8</strong><p>5.8 기준의 Editor API를 활용해 UnreelMCP로 Blueprint·Widget·Map 작업을 반자동화.</p><small>반복 편집은 빠르게, 저장·컴파일·실행 검증은 사람이 확인</small></div>
  <div><span>RESPONSIBILITY SPLIT</span><strong>C++ 규칙 · Blueprint 표현</strong><p>복제·판정·검증은 C++에 두고, 레벨 배치·UI·애니메이션 연출은 Blueprint가 소유.</p><small>게임 규칙과 에셋 표현의 책임을 분리</small></div>
  <div><span>CO-OP AUTHORITY</span><strong>Listen Server · Replication</strong><p>두 플레이어가 빠르게 방을 만들고, 서버가 역할·전투·퍼즐 상태를 하나의 결과로 확정.</p><small>입력은 요청, 공유 결과는 서버 상태</small></div>
</div>
<p class="prag-choice-thesis">Editor 작업 · 런타임 규칙 · 네트워크 권한을 서로 다른 경계로 분리</p>

<!--
[08:20-08:40]
UE 5.8 기준의 Editor API는 UnreelMCP 자동화에 활용했습니다. 게임 규칙은 C++, 화면 표현은 Blueprint, 공유 결과는 서버가 맡도록 나눴습니다.
[Q&A 대응] UnreelMCP는 Editor 전용 도구이며 게임 실행 의존성에는 포함하지 않았습니다. Listen Server는 두 명이 빠르게 방을 만들고 역할을 나누는 목표에 맞췄고, 외부 게임 API 없이 LAN 세션 검색과 RoomCode 필터를 사용합니다.
-->

---
layout: default
class: prag-core prag-core-image prag-diana-lock-slide
---

<p class="prag-slide-category">GAMEPLAY ENGINEERING</p>

# 총은 카메라가 보는 곳을 정확히 맞혀야 함

<div class="prag-focus-hero prag-stacked-visual prag-gripgun-slide">
  <div class="prag-gripgun-flow" aria-label="GripGun의 직관적인 사격 흐름">
    <div v-click="1" class="prag-gripgun-node prag-gripgun-client"><span>CAMERA</span><strong>화면 중앙 조준점</strong></div>
    <div v-click="2" class="prag-gripgun-segment prag-gripgun-intent"><i></i><div class="prag-gripgun-node prag-gripgun-hit"><span>시선 판정</span><strong>처음 맞은 지점 확정</strong></div></div>
  </div>
  <div v-click="3" class="prag-focus-caption"><strong>보고 조준한 곳이 맞는다</strong><span>기술의 목적은 더 자연스러운 손맛</span></div>
  <figure class="prag-image-frame prag-gripgun-evidence">
    <img class="prag-img" src="./images/slide-08-camera-aim-reference.png" alt="카메라 조준선과 총구 방향이 서로 다른 위치에서 시작하는 비교 일러스트" />
    <figcaption>화면 중앙의 시선과 총구 방향이 어긋날 수 있음. <span class="prag-source">이미지 출처: <a href="https://youtu.be/kucqGt8Q2a8" target="_blank" rel="noreferrer">눈에서 총알이 튀어나오는 FPS 게임의 사격 판정</a></span></figcaption>
  </figure>
</div>

<!--
[08:40-09:23]
총구 방향만 따르면 자세나 가까운 벽 때문에 화면 중앙과 결과가 어긋날 수 있습니다. 서버가 카메라 방향으로 한 번의 선 판정, 즉 Line Trace를 수행해 처음 맞은 지점을 확정했습니다. 핵심은 보고 조준한 곳이 맞는다는 감각입니다.
[Q&A 대응] 실제 판정은 물리 투사체가 아니라 서버 카메라 위치와 시선 방향을 기준으로 한 단일 Line Trace입니다. 총구 섬광과 궤적은 시각 피드백이고, 첫 번째 blocking hit만 피해 판정에 사용해 화면 중앙과 결과가 어긋나는 보정용 이중 판정을 만들지 않았습니다.
[발표 진행] 화면 중앙 → 시선 판정 → 결론.
-->

---
layout: default
class: prag-core prag-core-image
---

<p class="prag-slide-category">DIANA GAMEPLAY</p>

# Diana의 행동은 실제 공간을 바꿈

<div class="prag-focus-hero prag-stacked-visual prag-stacked-three prag-sleek-technical">
  <div class="prag-technical-strip"><div v-click="1" class="prag-tech-node prag-cue-rise"><span>찾기</span><strong>장치 선택</strong></div><i v-click="2" class="prag-tech-arrow"></i><div v-click="2" class="prag-tech-node prag-cue-rise"><span>해결</span><strong>퍼즐 성공</strong></div><i v-click="3" class="prag-tech-arrow"></i><div v-click="3" class="prag-tech-node prag-cue-rise"><span>변화</span><strong>문 · 전원 · 경로</strong></div></div>
  <div class="prag-diana-lock-compare">
    <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-10-locks-all-active.png" alt="Diana가 해킹하기 전 세 개의 잠금 장치가 모두 활성화된 문" /><figcaption><strong>BEFORE</strong> 잠금 3개 활성 · 경로 차단</figcaption></figure>
    <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-10-lock-one-disabled.png" alt="Diana가 해킹해 세 잠금 장치 중 하나가 비활성화된 문" /><figcaption><strong>AFTER</strong> Diana가 잠금 1개 해제</figcaption></figure>
  </div>
</div>

<!--
[09:23-10:03]
Diana의 스캔과 해킹은 화면 안에서 끝나지 않습니다. 성공 결과가 문, 전원, 이동 경로를 바꾸고 Hugh의 다음 행동을 가능하게 합니다.
[Q&A 대응] 클라이언트의 포커스 표시는 안내 역할만 합니다. 실제 상호작용 요청이 오면 서버가 Diana의 카메라 시선으로 첫 표면을 다시 찾고, 대상 정보와 허용 거리를 확인한 뒤에만 상호작용을 실행합니다.
[발표 진행] 찾기 → 해결 → 변화.
-->

---
layout: default
class: prag-map-elements prag-enemy-showcase
---

<p class="prag-slide-category">ENEMY DESIGN</p>

# 적마다 서로 다른 협동 행동을 요구함

<div class="prag-centered-body prag-evidence-body"><div class="prag-player-layout">
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-05-walker-attack.png" alt="Hugh가 Walker의 공격에 대응하는 실제 전투 화면" /><figcaption>Walker · 기본 전투 규칙 학습</figcaption></figure>
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-11-tainted-executor-coop.png" alt="Hugh와 Diana가 오염 Executor를 함께 상대하는 최종 빌드 전투 화면" /><figcaption>오염 Executor · Diana의 정화까지 요구</figcaption></figure>
  <div class="prag-card"><h3>공통 Enemy 로직</h3><p>여러 적이 공유하는 기반 위에 행동과 역할 요구를 다르게 구성.</p></div>
</div></div>

<!--
[10:03-10:23]
적은 수만 늘리지 않았습니다. 공통 Enemy 로직을 기반으로 Walker, Watcher, Executor와 오염 변형을 구성하고, 뒤로 갈수록 앞에서 배운 협동을 함께 사용하게 했습니다.
[Q&A 대응] 피해, 약점과 상태 변화처럼 공통인 규칙은 공유하고, 탐지 범위·공격 패턴·정화 요구처럼 적의 역할을 만드는 행동만 개별화했습니다. 그래서 새 적을 추가해도 전투의 기본 규칙은 다시 만들지 않습니다.
-->

---
layout: default
class: prag-map-elements prag-level-analysis-slide
---

<p class="prag-slide-category">LEVEL DESIGN</p>

# 전투와 비전투 구간을 같은 난이도 척도로 비교

<div class="prag-level-analysis-grid prag-level-score-grid">
  <figure><img src="./images/slide-19-difficulty-combat-score-table.png" alt="적 구성과 인원에 따라 전투 구간 난이도를 점수화한 표" /><figcaption><strong>전투 항목</strong><span>적 종류·오염 여부·인원에 따라 2–10점</span></figcaption></figure>
  <figure><img src="./images/slide-19-difficulty-noncombat-score-table.png" alt="휴식과 해킹 기믹 같은 비전투 구간 난이도를 점수화한 표" /><figcaption><strong>비전투 항목</strong><span>휴식·재정비와 해킹 기믹을 1–3점으로 환산</span></figcaption></figure>
</div>

<!--
[10:23-10:31]
전투만 감으로 배치하지 않고, 적 구성과 해킹·휴식 구간을 같은 난이도 점수로 환산해 서로 비교했습니다.
-->

---
layout: default
class: prag-map-elements prag-level-analysis-slide
---

<p class="prag-slide-category">LEVEL DESIGN</p>

# 압박의 높낮이를 조절해 플레이 흐름을 완성

<div class="prag-level-analysis-grid prag-level-flow-grid">
  <figure><img src="./images/slide-20-flow-after-difficulty-table.png" alt="레벨 진행 순서에 따른 구간별 난이도와 누적 난이도를 정리한 표" /><figcaption><strong>난이도 배열</strong><span>후반으로 갈수록 최고점은 높이고 회복 구간은 유지</span></figcaption></figure>
  <figure><img src="./images/slide-20-flow-after-pressure-graph.png" alt="전투와 휴식 구간을 번갈아 배치해 압박의 높낮이를 만든 플레이 흐름 그래프" /><figcaption><strong>플레이 흐름</strong><span>전투 뒤에는 휴식·재정비를 두어 압박을 환기</span></figcaption></figure>
</div>

<!--
[10:31-10:38]
점수를 진행 순서에 놓고 보니 초반은 단조로웠습니다. 전투의 최고점은 높이되 사이에 휴식과 재정비를 배치해 후반까지 리듬을 유지했습니다.
-->

---
layout: default
class: prag-core prag-upgrade-flow-slide
---

<p class="prag-slide-category">GAME FLOW · CHECKPOINT UPGRADE</p>

# 체크포인트에서 탐색 보상을 성장 선택으로 바꿈

<div class="prag-upgrade-flow-layout">
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-gameflow-checkpoint-upgrade-ui.png" alt="체크포인트 상호작용으로 열리는 Suit 업그레이드 UI" />
    <figcaption>체크포인트 상호작용 → 획득 재화 확인 → 원하는 능력 업그레이드</figcaption>
  </figure>
  <div class="prag-upgrade-flow-route">
    <div><span>01 · EXPLORE</span><strong>탐색으로 성장 재화 획득</strong><p>전투 경로 밖을 살펴보는 행동에도 분명한 보상을 부여.</p></div>
    <i>↓</i>
    <div><span>02 · CHOOSE</span><strong>체크포인트에서 강화 선택</strong><p>획득한 재화를 언제, 어디에 사용할지 플레이어가 직접 결정.</p></div>
    <i>↓</i>
    <div><span>03 · PREPARE</span><strong>다음 전투를 내 방식으로 준비</strong><p>성장 선택이 통제감과 커스터마이징 감각으로 이어짐.</p></div>
  </div>
</div>

<!--
[10:38-10:53]
체크포인트는 저장 지점으로만 두지 않았습니다. 탐색에서 얻은 재화를 업그레이드에 사용하고, 무엇을 먼저 강화할지 직접 선택하게 해 탐색 보상과 다음 전투 준비를 연결했습니다.
[Q&A 대응] 체크포인트에 상호작용하면 Suit 업그레이드 UI가 열리고, 보유 재화와 현재 레벨을 확인한 뒤 강화 또는 취소를 선택합니다. 이 구조의 목적은 플레이어가 탐색의 결과를 즉시 성장 선택으로 돌려받게 하는 것입니다.
-->

---
layout: default
class: prag-player-slide prag-ui-showcase
---

<p class="prag-slide-category">UI DESIGN</p>

# 역할별 UI는 다음 행동에 필요한 정보만 보여 줌

<div class="prag-centered-body prag-evidence-body"><div class="prag-player-layout"><figure class="prag-image-frame"><img class="prag-img" src="./images/slide-14-hugh-hud.png" alt="체력과 무기, 탄약과 전투 상태를 배치한 Hugh HUD 전체 화면" /><figcaption>Hugh · 체력, 탄약, 무기와 전투 상태</figcaption></figure><figure class="prag-image-frame"><img class="prag-img" src="./images/slide-14-diana-hud.png" alt="해킹 진행과 대상 상태를 크게 보여 주는 Diana HUD 전체 화면" /><figcaption>Diana · 해킹 대상, 진행도와 능력 상태</figcaption></figure><div class="prag-card"><h3>정보도 역할의 일부</h3><p>같은 화면을 복사하지 않고 각자의 판단에 필요한 정보에 집중.</p></div></div></div>

<!--
[10:53-11:08]
Hugh는 전투 판단, Diana는 대상과 능력 판단에 필요한 정보를 봅니다. UI도 역할 분담을 강화하는 게임 설계의 일부입니다.
[Q&A 대응] 모든 UI를 한 방식으로 강제하지는 않았습니다. 체력·자원처럼 공유 상태를 지속적으로 보여 주는 HUD는 ViewModel의 변경 알림을 사용하고, 조준점·적 체력처럼 즉시 반응해야 하는 일부 UI는 직접 이벤트로 갱신하는 혼합 구조입니다.
-->

---
layout: default
class: prag-core prag-rules-slide
---

<p class="prag-slide-category">WORKFLOW · CODE CONVENTION</p>

# 실제 코드 예시까지 규칙으로 고정해 편차를 줄임

<div class="prag-rule-grid">
  <div><span>01 · .EDITORCONFIG</span><strong>Unreal 접두 규칙 자동 검사</strong><p class="prag-code-sample"><code>AWeaponBase</code><code>UPragmataHUDViewModel</code><code>bIsAiming</code></p><small>A/U/F/E/T/b 규칙과 탭·줄바꿈을 지원 IDE의 작성 단계부터 검사</small></div>
  <div><span>02 · AI DIRECTIVES</span><strong>작업 종류에 맞는 규칙을 먼저 로드</strong><p class="prag-code-sample"><code>C++ → 02-unreal-code</code><code>Editor → 08-unreelmcp-tools</code></p><small>사람과 AI가 같은 권한 경계·안전 기준을 읽고 시작</small></div>
  <div><span>03 · VERIFICATION</span><strong>수정과 검증을 한 흐름으로 연결</strong><p class="prag-code-sample"><code>코드 경계 확인</code><code>Asset 저장 · 컴파일</code><code>PIE 실행 확인</code></p><small>자동화 성공과 실제 게임 동작 성공을 분리해 판정</small></div>
</div>
<p class="prag-rule-loop">형식 자동화 → 작업별 지침 → 실행 검증</p>

<!--
[11:08-11:33]
프로젝트 시작부터 편집기 규칙과 AI 작업 지침을 함께 두었습니다. 예를 들어 Actor는 A, UObject는 U, bool은 b로 시작하게 하고, C++ 작업과 Editor 작업은 서로 다른 지침을 먼저 읽게 했습니다. 마지막에는 저장과 컴파일, 실제 실행 확인을 나눠 자동화가 끝났다는 이유만으로 성공이라 판단하지 않았습니다.
[Q&A 대응] `.editorconfig`에는 AActor·UObject·Struct·Enum·Template·bool 접두 규칙과 탭·줄바꿈 기준이 있습니다. 작업 지침은 C++ 런타임 경계, UnreelMCP의 Editor 전용 사용, 대형 에셋 안전과 검증 절차를 구분합니다.
-->

---
layout: default
class: prag-core prag-sleek-technical prag-flow-slide prag-history-slide
---

<p class="prag-slide-category">COLLABORATION · GIT</p>

# 브랜치 역할과 커밋 단위를 먼저 고정

<div class="prag-git-strategy">
  <div v-click="1" class="prag-cue-rise"><span>PERSONAL BRANCH</span><strong>기능별 독립 작업</strong><small>각자의 변경과 검증을 완료한 뒤 통합 요청</small></div>
  <i v-click="2">→</i>
  <div v-click="2" class="prag-cue-rise"><span>DEVELOP</span><strong>팀 통합과 충돌 확인</strong><small>개인 브랜치를 직접 main에 합치지 않음</small></div>
  <i v-click="3">→</i>
  <div v-click="3" class="prag-cue-rise"><span>MAIN</span><strong>안정된 완성본</strong><small>통합·실행 검증을 통과한 상태만 유지</small></div>
</div>
<div class="prag-commit-policy">
  <div><span>한 커밋 = 한 관심사</span><code>feat: Hugh 이동 입력 처리 추가</code></div>
  <div><span>문제 해결은 원인을 드러냄</span><code>fix: 공격 판정 오류 수정</code></div>
  <p>한국어 Conventional Commits · 생성 파일 제외 · develop 직접 push 금지</p>
</div>

<!--
[11:33-11:53]
각자 개인 브랜치에서 기능을 완성하고 develop에서 통합한 뒤, 검증된 상태만 main에 유지했습니다. 커밋은 한 가지 관심사만 담고 `feat`, `fix` 같은 유형과 짧은 한국어 설명으로 남겨 변경 목적을 바로 읽을 수 있게 했습니다.
[Q&A 대응] 개인 브랜치는 develop 기준으로 동기화하고 통합은 검토 경로를 거쳤습니다. 생성 파일과 캐시는 기록에서 제외했으며, 대규모 이력 정화처럼 일반 병합으로 해결할 수 없는 사례는 협업 규칙이 아니라 별도 트러블슈팅으로 다뤘습니다.
[발표 진행] 개인 작업 → develop 통합 → main 안정본 → 커밋 예시.
-->

---
layout: default
class: prag-core prag-core-image prag-collaboration-tool-slide prag-figma-slide
---

<p class="prag-slide-category">COLLABORATION 01 · FIGMA</p>

# Figma로 구현 전에 화면 상태를 합의

<div class="prag-core-image-layout">
  <figure class="prag-image-frame"><img class="prag-img" src="/images/slide-collaboration-figma-board.png" alt="초기 기획, 플레이 화면, 강화 요소, 무기 파트와 맵 레벨 디자인을 함께 정리한 Figma 협업 보드" /><figcaption>화면을 만들기 전에 정보 우선순위와 상태 전환부터 합의.</figcaption></figure>
  <div class="prag-core-notes prag-core-notes-single">
    <div class="prag-card"><h3>구현 전에 같은 화면을 봄</h3><p>역할별로 필요한 정보와 퍼즐의 상태 변화를 먼저 맞춰, 구현 뒤 구조를 다시 뜯는 일을 줄였습니다.</p></div>
  </div>
</div>

<!--
[11:53-12:03]
Figma에서 역할별 정보 우선순위와 퍼즐 상태를 구현 전에 합의해, UI와 게임 로직이 엇갈리는 일을 줄였습니다.
-->

---
layout: default
class: prag-core prag-core-image prag-collaboration-tool-slide prag-notion-slide
---

<p class="prag-slide-category">COLLABORATION 02 · NOTION</p>

# Notion으로 결정의 이유와 작업 맥락을 공유

<div class="prag-core-image-layout">
  <figure class="prag-image-frame"><img class="prag-img" src="/images/slide-07-notion-schedule.png" alt="Notion에 정리한 역할과 작업 상태" /><figcaption>담당 작업뿐 아니라 결정 배경과 다음 확인 사항까지 함께 공유.</figcaption></figure>
  <div class="prag-core-notes prag-core-notes-single">
    <div class="prag-card"><h3>무엇보다 왜를 남김</h3><p>기획 의도, 역할 분담과 결정 사항을 한곳에 모아 다른 사람이 이어받아도 맥락을 잃지 않게 했습니다.</p></div>
  </div>
</div>

<!--
[12:03-12:13]
Notion에는 할 일뿐 아니라 기능의 이유, 담당자와 다음 확인 사항을 남겨 작업이 이어져도 판단의 맥락을 유지했습니다.
-->

---
layout: default
class: prag-core prag-mcp-result-slide
---

<p class="prag-slide-category">TEAM TOOLING · EDITOR AUTOMATION</p>

# UnreelMCP로 팀의 반복 Editor 작업을 자동화

<div class="prag-mcp-result-layout">
  <figure class="prag-image-frame">
    <img class="prag-img" src="/images/slide-08-diana-title-animgraph.png" alt="UnreelMCP로 구성한 Diana 타이틀 애니메이션 AnimGraph" />
    <figcaption>Sequence Player → Layered Blend per Bone → RigidBody → Output Pose</figcaption>
  </figure>
  <div class="prag-mcp-result-summary">
    <span>반복 노드 생성·연결을 자동화</span>
    <strong>자동 생성 결과는 저장 · 컴파일 · Preview로 사람이 최종 검증</strong>
  </div>
</div>

<!--
[12:13-12:28]
UnreelMCP는 팀 전체가 반복적인 Editor 작업을 줄이는 데 사용한 제작 도구입니다. 이 화면은 자동화로 만든 Diana 타이틀 AnimGraph 결과이며, 노드 생성·연결을 빠르게 처리하되 저장·컴파일·Preview는 사람이 확인했습니다.
[Q&A 대응] UnreelMCP는 정호진이 개발한 Editor 전용 팀 도구이며 게임 실행 의존성에는 포함하지 않았습니다. Editor 자동화 결과는 그대로 신뢰하지 않고 Asset 저장, Blueprint 컴파일과 Preview Pose를 각각 확인했습니다.
-->

---
layout: default
class: prag-core prag-core-image prag-collaboration-tool-slide prag-code-intent-slide
---

<p class="prag-slide-category">COLLABORATION 03 · CODE INTENT</p>

# 자동화의 기술 부채를 Code Intent로 통제

<div class="prag-core-image-layout">
  <figure class="prag-image-frame"><img class="prag-img" src="/images/slide-ai-code-intent.png" alt="코드의 설계 의도와 검증 조건을 정리한 기록" /><figcaption>AI 자동화가 만든 결과에 권한 경계·검증 기준·변경 시 주의점을 다시 연결.</figcaption></figure>
  <div class="prag-core-notes prag-core-notes-single">
    <div class="prag-card prag-intent-debt"><span>빠른 제작</span><h3>AI + UnreelMCP</h3><p>Blueprint·Widget·Map 반복 편집을 반자동화해 제작 속도를 높였습니다.</p><i>↓</i><span>남은 기술 부채</span><h3>왜 이렇게 만들었는가?</h3><p>결과만 남으면 다음 수정이 권한 경계와 금지 조건을 지울 수 있었습니다.</p><i>↓</i><span>상환 장치</span><h3>Code Intent</h3><p>설계 이유·허용 범위·검증 근거를 코드 가까이에 보존했습니다.</p></div>
  </div>
</div>

<!--
[12:28-12:44]
하지만 방금 같은 자동화는 결과만 남으면 왜 그렇게 만들었는지가 사라집니다. 그래서 Code Intent에 책임, 금지 조건과 검증 근거를 남겨 다음 변경이 기존 의도를 지우지 않게 했습니다.
[Q&A 대응] UnreelMCP는 Blueprint·Widget·Map의 반복 편집을 돕되 저장·컴파일·PIE 검증은 별도로 확인합니다. Code Intent는 기능의 책임, 호출 관계, 서버와 클라이언트의 권한, Blueprint 연결, 근거와 불확실성을 함께 기록합니다.
-->

---
layout: default
class: prag-member-focus-slide prag-history-slide prag-no-card-emphasis
---

<p class="prag-slide-category">TEAM TROUBLESHOOTING · GIT HISTORY</p>

# 팀 트러블슈팅 · 5GB를 넘긴 Git 이력을 작업 손실 없이 정화

<div class="prag-history-cleanse">
  <div><span>문제 · 5GB 제한</span><strong>17,000여 맵 에셋이 모든 이력에 남음</strong><small>현재 파일만 삭제해도 과거 object 때문에 저장소 용량은 줄지 않음</small></div>
  <i>→</i>
  <div><span>제약 · 작업 손실</span><strong>전 브랜치 강제 갱신은 팀 작업을 끊음</strong><small>미반영 변경 손실·원격 분리·재클론 위험을 함께 통제해야 함</small></div>
  <i>→</i>
  <div><span>해결 · 단계적 검증</span><strong>develop 시범 후 개인 브랜치를 순차 정화</strong><small>hojin 브랜치 76단계 rebase로 작업 보존과 용량 감소를 먼저 검증</small></div>
</div>
<div class="prag-git-proof">
  <div><span>PURGE SCOPE</span><strong>모든 브랜치 · 모든 history</strong></div>
  <div><span>RISK CONTROL</span><strong>개인 작업 보존 후 순차 적용</strong></div>
  <div><span>VERIFIED RESULT</span><strong>용량 감소 · rebase 성공 · 작업 유지</strong></div>
</div>

<!--
[12:44-12:59]
이 문제는 개인 성과가 아니라 팀 전체의 협업 트러블슈팅입니다. 5GB 제한을 넘긴 17,000여 에셋을 모든 이력에서 지우되, 각자의 작업을 보존하기 위해 브랜치별로 검증하며 순차 적용했습니다.
[Q&A 대응] develop에서 삭제 결과를 먼저 확인하고 hojin 브랜치에 76단계 rebase를 적용해 용량 감소와 작업 보존을 검증했습니다. 그 결과를 기준으로 나머지 브랜치도 같은 정화 절차를 적용할 수 있었습니다.
-->

---
layout: default
class: prag-core prag-team-ownership
---

<p class="prag-slide-category">TEAM OWNERSHIP</p>

# 다섯 명의 역할 분담

<div class="prag-team-role-grid">
  <div><div class="prag-role-card-head"><span>01</span><strong>정호진</strong></div><ul><li>Diana 플레이어·스킬·애니메이션</li><li>서버·복제·애니메이션 트러블슈팅</li><li>에셋 추출·재질 편집</li><li>전체 기획·프로젝트 리드</li></ul></div>
  <div><div class="prag-role-card-head"><span>02</span><strong>박준현</strong></div><ul><li>Hugh 이동·점프·호버·공격</li><li>GripGun·Shockwave·Decoy</li><li>Walker·Watcher 메시·행동</li></ul></div>
  <div><div class="prag-role-card-head"><span>03</span><strong>안지성</strong></div><ul><li>Executor·오염 적·Enemy 공통 로직</li><li>Sentinel 보스 행동 고도화</li><li>Stasis Net</li><li>전체 기획·레벨 디자인</li></ul></div>
  <div><div class="prag-role-card-head"><span>04</span><strong>안민원</strong></div><ul><li>맵 에셋 추출·맵 제작</li><li>Item Box·Hack Node 등 맵 프롭</li><li>Sentinel 보스 기초 제작</li></ul></div>
  <div><div class="prag-role-card-head"><span>05</span><strong>윤제영</strong></div><ul><li>전체 Widget Blueprint</li><li>UI 디자인·애니메이션</li><li>적 해킹 퍼즐 UI·로직</li><li>맵 해킹 퍼즐 UI·로직</li></ul></div>
</div>

<!--
[12:59-13:19]
저는 Diana와 서버 통합을 맡았습니다. 준현님은 Hugh와 무기, 지성님은 적 공통 로직과 레벨, 민원님은 맵과 프롭, 제영님은 UI와 퍼즐을 책임졌습니다.
-->

---
layout: default
class: prag-member-summary-slide
---

<p class="prag-slide-category">MEMBER SUMMARY · 정호진</p>

# 정호진 · Diana의 시선과 서버 판정을 하나의 플레이로 연결

<div class="prag-member-summary-grid">
  <div><span>책임 영역</span><strong>Diana · 서버 · 전체 통합</strong><ul><li>Diana 상호작용, Scan, OverDrive 스킬 구현</li><li>Diana가 Hugh의 움직임을 추종하도록 설정</li><li>체크포인트·팀 리스폰·HUD 상태 연결</li></ul></div>
  <div><span>대표 결과</span><strong>Hugh 움직임을 따르는 Diana 페어드 애니메이션</strong><ul><li>Hugh의 점프·호버·이동 상태에 Diana 동작 연결</li><li>Diana 머리카락 물리 적용</li><li>Diana 얼굴 애니메이션 적용</li></ul></div>
  <div><span>기술·협업 역할</span><strong>프로젝트 리드 · 전체 기획</strong><ul><li>팀 공용 UnreelMCP 개발·공유</li><li>서버·복제·애니메이션 문제 해결</li><li>통합 일정과 최종 검증 기준 관리</li></ul></div>
</div>

<!--
[13:19-13:28]
저는 Diana·서버·전체 통합을 맡아 시선 기반 상호작용과 협동 상태를 연결했습니다. UnreelMCP는 제 개인 기능이 아니라, 팀의 반복 Editor 작업을 돕기 위해 만든 공용 도구입니다.
-->

---
layout: default
class: prag-member-focus-slide prag-paired-animation-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 정호진</p>

# 정호진 · Hugh의 움직임에 Diana의 동작을 자연스럽게 연결

<div class="prag-paired-animation-layout">
  <figure class="prag-image-frame prag-paired-animation-frame"><img class="prag-img" src="./images/slide-hojin-paired-animation-airborne.png" alt="Hugh의 점프 동작에 맞춰 Diana가 함께 공중에 떠 있는 장면" /><figcaption>Hugh의 도약 상태에 맞춰 Diana의 추종 위치와 공중 동작을 함께 연결</figcaption></figure>
  <div class="prag-paired-animation-copy">
    <span>성과 01 · PAIRED ANIMATION</span>
    <strong>두 플레이어를 따로 움직이는 모델이 아니라 하나의 협동 행동으로 보이게 함</strong>
    <p>Hugh의 이동 상태를 기준으로 Diana의 추종·공중 상태와 애니메이션을 맞춰, 점프와 호버에서도 두 캐릭터가 분리되어 보이지 않게 구성함.</p>
    <div class="prag-paired-animation-flow"><div><b>HUGH</b><small>점프 · 호버 · 이동</small></div><i>→</i><div><b>PAIRED STATE</b><small>추종 위치 · 공중 상태</small></div><i>→</i><div><b>DIANA</b><small>자연스러운 동작 표현</small></div></div>
  </div>
</div>

<!--
[13:28-13:38]
협동 게임에서는 두 캐릭터가 각자 움직이기만 하면 함께 행동한다는 감각이 약해집니다. Hugh의 점프와 호버 같은 이동 상태에 Diana의 추종 위치와 공중 동작을 연결해, 두 플레이어가 하나의 협동 행동 안에 있는 것처럼 보이도록 만들었습니다.
[Q&A 대응] 왼쪽은 Hugh의 도약에 맞춰 Diana가 함께 공중 상태를 유지하는 실제 최종 빌드 장면입니다. 핵심은 단순 위치 부착이 아니라 이동 상태 변화에 맞춰 추종 위치·공중 여부·애니메이션 표현을 함께 맞추는 것입니다.
-->

---
layout: default
class: prag-member-focus-slide prag-member-troubleshooting-slide
---

<p class="prag-slide-category">TROUBLESHOOTING · 정호진</p>

# 정호진 트러블슈팅 · 역할 조합마다 달라지던 원격 Hugh 애니메이션

<div class="prag-member-troubleshooting-route">
  <div><span>문제</span><strong>같은 Hugh가 역할 조합에 따라 다르게 보임</strong><p>위치는 맞았지만 Diana가 Host인 조합에서 원격 Hugh의 달리기는 느려지고, 조준·호버 Pose도 어긋났음.</p></div>
  <i>→</i>
  <div><span>원인</span><strong>예측 입력·서버 이동·원격 화면은 서로 다른 시점을 봄</strong><p>한 값을 모두가 공유하면 소유자의 즉시 반응과 다른 화면의 정확한 표현 중 하나가 깨질 수 있었음.</p></div>
  <i>→</i>
  <div><span>해결</span><strong>입력 의도와 원격 표현용 상태를 분리</strong><p>소유자는 입력 예측을 유지하고, 원격 화면은 서버가 확정한 상태와 실제 이동 속도로 애니메이션을 재생.</p></div>
</div>
<div class="prag-troubleshooting-context"><span>TECHNICAL CONTEXT</span><strong>SavedMove로 입력 전달 · 서버 AnimState는 원격에만 복제 · AnimBP는 실제 Velocity/Acceleration 사용</strong></div>

<!--
[13:38-13:51]
두 명이 같은 Hugh를 보더라도 네트워크 역할에 따라 읽는 데이터의 시점이 달랐습니다. 그래서 소유 플레이어의 입력 예측은 유지하되, 원격 화면은 서버가 확정한 상태와 실제 이동 속도로 애니메이션을 재생하도록 분리했습니다. 이로써 Host 역할을 바꿔도 달리기·조준·호버가 같은 방식으로 보이게 했습니다.
[Q&A 대응] aim·run·hover 입력은 UPragmataHughMovementComponent의 SavedMove custom flag로 서버 이동 갱신에 전달합니다. 서버는 FHughReplicatedAnimState를 COND_SkipOwner로 원격 simulated proxy에만 복제해 소유자 예측을 덮지 않습니다. AnimBP locomotion은 intent 기반 속도가 아니라 CharacterMovement의 실제 velocity와 acceleration을 읽어 braking과 network smoothing 중에도 자연스럽게 감속합니다. Host Hugh/Client Diana와 Host Diana/Client Hugh 양방향 역할 조합을 별도로 검증해야 합니다.
-->

---
layout: default
class: prag-member-summary-slide
---

<p class="prag-slide-category">MEMBER SUMMARY · 박준현</p>

# 박준현 · Hugh의 움직임과 무기를 하나의 전투로 연결

<div class="prag-member-summary-grid">
  <div><span>책임 영역</span><strong>Hugh 이동과 전투 행동</strong><ul><li>Hugh의 이동, 점프, 호버 동작 구현</li><li>조준·공격·무기 교체 입력 연결</li><li>연속 이동과 단발 행동의 애니메이션 연결</li></ul></div>
  <div><span>대표 결과</span><strong>세 무기와 서로 다른 전투 감각</strong><ul><li>GripGun의 카메라 기준 즉발 사격 구현</li><li>Shockwave Gun의 범위 공격 구현</li><li>Decoy Generator의 투척·적 유인 기능 구현</li></ul></div>
  <div><span>확장 영역</span><strong>Walker · Watcher</strong><ul><li>Walker와 Watcher의 메시를 게임에 적용</li><li>적 탐지와 공격 행동 구성</li><li>Hugh 무기와 적 피격 반응 연결</li></ul></div>
</div>

<!--
[13:51-14:00]
준현님은 Hugh 이동·무기와 두 적을 맡아 전투 중심을 완성했습니다.
-->

---
layout: default
class: prag-member-focus-slide prag-member-text-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 박준현</p>

# 박준현 · 자연스러운 이동과 전투 반응을 연결

<div class="prag-member-explanation-route">
  <div><span>연속 동작</span><strong>이동·점프·호버는 Animation Blueprint가 담당</strong><p>속도, 공중 여부, 조준 상태를 계속 읽어 이동 중의 자세가 자연스럽게 이어지도록 구성.</p></div>
  <i>→</i>
  <div><span>단발 행동</span><strong>공격·무기 교체는 코드 이벤트로 즉시 실행</strong><p>순간 반응이 필요한 행동은 별도 이벤트로 처리해 입력 지연 없이 필요한 애니메이션을 재생.</p></div>
  <i>→</i>
  <div><span>조작 복귀</span><strong>행동이 끝나면 이동 상태로 자연스럽게 돌아감</strong><p>공격 이후에도 이동·점프·호버 입력이 끊기지 않아 전투 중 조작감을 유지.</p></div>
</div>
<div class="prag-member-explanation-context"><span>HUGH PLAYER FLOW</span><strong>연속 상태는 Animation Blueprint · 즉시 행동은 코드 이벤트 · 종료 뒤 이동 상태로 복귀</strong></div>

<!--
[14:00-14:10]
준현님은 계속 변하는 이동 상태와 한 번에 실행되는 행동을 같은 방식으로 처리하지 않았습니다. 이동·점프·호버는 Animation Blueprint가 이어서 표현하고, 공격과 무기 교체는 코드 이벤트로 즉시 실행한 뒤 다시 이동 상태로 돌아오게 했습니다. 그래서 전투 중에도 조작이 끊기는 느낌을 줄였습니다.
-->

---
layout: default
class: prag-member-focus-slide prag-member-troubleshooting-slide
---

<p class="prag-slide-category">TROUBLESHOOTING · 박준현</p>

# 박준현 트러블슈팅 · 무기와 적의 직접 의존성을 분리

<div class="prag-member-troubleshooting-route">
  <div><span>문제</span><strong>무기가 특정 Enemy 클래스를 직접 호출</strong><p>새 적이 추가될 때마다 무기 코드도 함께 수정해야 해, 무기와 적이 서로 강하게 묶였음.</p></div>
  <i>→</i>
  <div><span>판단</span><strong>무기는 “맞았다”는 사실까지만 책임</strong><p>피격 연출과 반응은 맞은 대상이 선택해야 새로운 적을 추가해도 무기 구현을 건드리지 않음.</p></div>
  <i>→</i>
  <div><span>해결</span><strong>Damage Interface로 피해와 충돌 정보만 전달</strong><p>각 적이 자신의 HitReact와 Niagara를 결정해, 같은 무기가 서로 다른 적과 오브젝트에 재사용됨.</p></div>
</div>
<div class="prag-troubleshooting-context"><span>TECHNICAL CONTEXT</span><strong>Damage Interface · FHitResult · 대상이 소유하는 HitReact · 대상이 소유하는 Niagara Impact</strong></div>

<!--
[14:10-14:23]
무기가 특정 적의 피격 함수와 이펙트를 직접 호출하면 새 적이 늘 때마다 무기 코드도 바뀝니다. 무기는 피해와 충돌 정보만 인터페이스로 전달하고, 피격 반응과 이펙트는 맞은 적이 스스로 처리하게 분리했습니다.
[Q&A 대응] 공격자는 Damage Interface를 통해 피해량과 FHitResult만 전달합니다. 대상은 자신의 HitReact와 Niagara 피격 이펙트를 선택해 재생하므로 새로운 Enemy나 피격 가능한 오브젝트를 추가해도 무기 구현을 수정하지 않습니다.
-->

---
layout: default
class: prag-member-summary-slide
---

<p class="prag-slide-category">MEMBER SUMMARY · 안지성</p>

# 안지성 · 전투가 자연스럽게 시작하고 끝나는 Territory 흐름을 설계

<div class="prag-member-summary-grid">
  <div><span>책임 영역</span><strong>Territory 기반 전투 흐름</strong><ul><li>플레이어 진입을 전투 상태 전환의 시작점으로 설계</li><li>AI 감지·등장 연출·추적·전투 종료의 책임 분리</li><li>문·엘리베이터 등 맵 기믹의 봉쇄와 해제 연결</li></ul></div>
  <div><span>대표 결과</span><strong>적·연출·맵을 하나의 전투 경험으로 연결</strong><ul><li>Executor·오염 적·Sentinel이 공통 전투 규칙을 재사용</li><li>적 활성화 뒤 AI 타깃 설정과 추적을 일관되게 시작</li><li>모든 적 처치 뒤 탐험으로 돌아가는 종료 흐름 구현</li></ul></div>
  <div><span>확장 영역</span><strong>Stasis Net · 기획 · 레벨</strong><ul><li>적의 행동을 제어하는 Stasis Net 구현</li><li>전투 난이도와 적 배치·구역 흐름 조정</li><li>전체 게임 기획과 레벨 설계 참여</li></ul></div>
</div>

<!--
[14:23-14:32]
지성님은 적 AI만 따로 두지 않고, 플레이어 진입부터 전투 시작·추적·맵 봉쇄·처치 후 해제까지 이어지는 Territory 전투 흐름을 맡았습니다. 이 흐름 위에 여러 적의 공통 전투 규칙과 Stasis Net, 레벨 설계를 연결했습니다.
-->

---
layout: default
class: prag-member-focus-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 안지성</p>

# 안지성 · Territory를 전투 상태 전환의 시작점으로 설계

<div class="prag-member-evidence-layout">
  <figure class="prag-image-frame prag-jiseong-territory-frame"><img class="prag-img" src="./images/slide-jiseong-territory-flow.png" alt="Territory 진입부터 전투 종료까지 이어지는 전투 흐름" /><figcaption>Territory 전투 흐름 · 진입 감지 → 적 활성화 → 타깃 설정·추적 → 처치 후 봉쇄 해제</figcaption></figure>
  <div class="prag-member-focus-card">
    <span>성과 01 · TERRITORY COMBAT FLOW</span>
    <strong>전투가 갑자기 시작되거나 끝나지 않도록 전 과정을 연결</strong>
    <p>Territory가 플레이어 진입, 선택 기믹 승인과 등장 연출 뒤 적 활성화·타깃 설정을 맡고, 마지막 적 처치 뒤에는 문·엘리베이터 봉쇄를 해제함.</p>
    <div class="prag-member-focus-proof"><b>RESPONSIBILITY</b><em>AI Perception은 감지, Territory는 전투 개시·종료를 맡아 공통 Behavior Tree가 여러 적에 재사용되도록 구성</em></div>
  </div>
</div>

<!--
[14:32-14:42]
지성님은 영역 진입을 단순 Trigger가 아니라 전투 상태 전환의 시작점으로 설계했습니다. Territory가 진입과 기믹·연출 뒤 적을 활성화하고 타깃을 지정합니다. 전투가 끝나면 같은 Territory가 문과 엘리베이터를 다시 열어 탐험으로 연결합니다.
[Q&A 대응] 일반 타깃 획득은 AI Perception이 맡습니다. 다만 등장 직후에는 Perception 기록이 없어도 Territory가 영역 안 플레이어를 서버에서 검증해 즉시 타깃으로 지정합니다. 공통 Tree의 `NoTarget`, `OnTarget`, `Chase`, `Attack`, `ReturnHome`, `Patrol` 분기에 적별 공격 Task와 패턴 선택만 연결해 Executor·오염 적·Sentinel이 같은 판단 흐름을 재사용합니다.
-->

---
layout: default
class: prag-member-focus-slide prag-member-troubleshooting-slide
---

<p class="prag-slide-category">TROUBLESHOOTING · 안지성</p>

# 안지성 트러블슈팅 · 경계에서 반복되던 AI 상태 전환을 안정화

<div class="prag-member-troubleshooting-evidence-layout">
  <figure class="prag-image-frame prag-jiseong-boundary-frame"><img class="prag-img" src="./images/slide-jiseong-territory-boundary-troubleshooting.png" alt="Territory 경계에서 적의 상태가 반복 전환되는 현상" /><figcaption>경계 부근에서 상태 입력이 흔들리며 AI가 복귀·추적을 반복하던 실제 상황</figcaption></figure>
  <div class="prag-member-troubleshooting-copy">
    <div class="prag-member-troubleshooting-route">
      <div><span>문제</span><strong>경계에서 적이 복귀와 추적을 반복</strong><p>ReturnHome과 NoAttack이 빠르게 바뀌며 Behavior Tree가 Root로 계속 돌아가고, 적의 반응이 끊겨 보였음.</p></div>
      <div><span>원인</span><strong>“영역 안” 입력이 경계에서 흔들림</strong><p>보조 충돌까지 Overlap을 만들면서, Root Capsule이 미세하게 움직일 때마다 bInsideTerritory가 true와 false를 오갔음.</p></div>
      <div><span>해결</span><strong>판정 대상을 줄이고 재진입에 여유 거리 적용</strong><p>Root Capsule만 판정하고, 나가면 즉시 복귀하되 추적 재개는 일정 거리 안쪽까지 들어온 뒤에만 허용.</p></div>
    </div>
    <div class="prag-troubleshooting-context"><span>TECHNICAL CONTEXT</span><strong>Root Capsule 판정 · Re-entry Margin · Blackboard Observer Abort 유지</strong></div>
  </div>
</div>

<!--
[14:42-14:55]
Territory 경계에서는 적이 복귀와 추적을 반복하며 행동 트리가 계속 처음으로 돌아갔습니다. 원인은 트리 구조가 아니라, 보조 충돌까지 포함한 영역 판정이 경계에서 흔들린 것이었습니다. Root Capsule만 판정하고 재진입에는 여유 거리를 두어 상태 입력을 안정화했습니다.
[Q&A 대응] `bInsideTerritory`는 밖으로 나가면 즉시 false가 되지만, ReturnHome 중 재진입은 `ReentryMargin`을 통과해야 true가 됩니다. Blackboard의 Observer Abort = Both는 유지해 안정적으로 재진입한 경우에는 Chase로 즉시 전환합니다. StateTree 성능 비교를 수행한 것은 아니며, 기존 Blackboard·Decorator·Task를 살리는 쪽이 이 사례의 변경 비용에 적절했습니다.
-->

---
layout: default
class: prag-member-summary-slide
---

<p class="prag-slide-category">MEMBER SUMMARY · 안민원</p>

# 안민원 · 시작부터 보스전까지 맵 흐름을 연결

<div class="prag-member-summary-grid">
  <div><span>책임 영역</span><strong>맵 에셋 추출과 공간 제작</strong><ul><li>연구 시설 맵 에셋을 추출하고 정리</li><li>통로·배관·문을 조합해 플레이 공간 제작</li><li>탐사·전투·휴식이 이어지는 구역 구성</li></ul></div>
  <div><span>대표 결과</span><strong>처음부터 끝까지 이어지는 흐름</strong><ul><li>시작 구역·함정·플랫폼 구간 제작</li><li>탐사·전투·퍼즐 공간을 순서대로 연결</li><li>Sentinel 보스전 전용 공간 구성</li></ul></div>
  <div><span>확장 영역</span><strong>맵 프롭 · Sentinel 기초</strong><ul><li>Item Box와 Hack Node 같은 맵 프롭 제작</li><li>문·엘리베이터·조명 오브젝트 배치</li><li>Sentinel 보스의 기초 형태 제작</li></ul></div>
</div>

<!--
[14:55-15:04]
민원님은 맵 에셋과 프롭, Sentinel 보스 기초를 맡아 시작부터 보스전까지 공간 흐름을 연결했습니다.
-->

---
layout: default
class: prag-member-focus-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 안민원</p>

# 안민원 · 시작 구역부터 보스전까지 하나의 맵으로 연결

<div class="prag-minwon-gallery">
  <figure><img src="/images/slide-minwon-map-start.png" alt="추출 에셋으로 구성한 시작 구역" /><figcaption>01 · 시작 구역</figcaption></figure>
  <figure><img src="/images/slide-minwon-locked-door-laser.png" alt="잠금문과 레이저 트랩이 배치된 구간" /><figcaption>02 · 잠금문·레이저 트랩</figcaption></figure>
  <figure><img src="/images/slide-minwon-platformer-stage.png" alt="처음부터 끝까지 이어지는 플랫폼 구간" /><figcaption>03 · 플랫폼 구간</figcaption></figure>
  <figure><img src="/images/slide-minwon-boss-map-navmesh.png" alt="Sentinel 보스전 공간과 이동 영역" /><figcaption>04 · 보스전 공간</figcaption></figure>
</div>
<p class="prag-minwon-thesis">추출한 에셋을 재구성해 시작 구역 · 함정 · 플랫폼 · 보스전을 하나의 흐름으로 완성</p>

<!--
[15:04-15:16]
민원님은 추출한 맵 에셋을 재구성해 시작 구역에서 함정과 플랫폼을 거쳐 보스전까지 흐름이 끊기지 않도록 공간을 완성했습니다.
[Q&A 대응] 플레이 순서가 시작부터 끝까지 이어지도록 맵 구역과 프롭, 전투 공간을 연결한 성과입니다. 보스전 공간에서는 NavMesh까지 구성해 전투 이동 범위를 확보했습니다.
-->

---
layout: default
class: prag-member-focus-slide prag-member-troubleshooting-slide
---

<p class="prag-slide-category">TROUBLESHOOTING · 안민원</p>

# 안민원 트러블슈팅 · 보스 엘리베이터의 다단계 진행을 하나로 연결

<div class="prag-member-troubleshooting-route">
  <div><span>문제</span><strong>퍼즐·이동·전투가 서로 다른 시점에 완료됨</strong><p>이동이 끝나기 전 다음 퍼즐이 열리거나, 전투가 끝나기 전 진행이 넘어가면 순서와 맵 잠금이 무너질 수 있었음.</p></div>
  <i>→</i>
  <div><span>판단</span><strong>각 완료 신호를 하나의 Stage 상태가 순서대로 받아야 함</strong><p>퍼즐 완료, 엘리베이터 이동 종료, 적 처치 완료를 분리한 채 연결해 진행 Actor가 다음 단계의 시작을 결정.</p></div>
  <i>→</i>
  <div><span>해결</span><strong>전투 종료를 확인한 뒤에만 다음 퍼즐을 재활성화</strong><p>Territory의 전투 해제 신호를 받은 뒤 Stage를 완료하고, 그때만 다음 이동과 퍼즐을 열도록 구성.</p></div>
</div>
<div class="prag-troubleshooting-context"><span>TECHNICAL CONTEXT</span><strong>WaitingForPuzzle → Moving → WaitingForCombat → Completed · Puzzle Delegate · Territory Combat Lock · Puzzle Reset</strong></div>

<!--
[15:16-15:29]
퍼즐·이동·전투의 완료 시점이 달라 순서가 꼬였습니다. 하나의 진행 상태가 세 신호를 순서대로 받아 전투 뒤에만 다음 퍼즐을 열었습니다.
[Q&A 대응] ABossRouteElevator는 WaitingForPuzzle, Moving, WaitingForCombat, Completed 상태를 가집니다. 연결된 퍼즐의 완료 delegate로 이동을 시작하고, 전투 Stage에서는 MonsterTerritoryActor가 마지막 적을 판정합니다. Territory가 SetTerritoryCombatLocked(false)로 잠금을 해제하면 NotifyCombatCleared가 엘리베이터에 완료를 전달하고, ResetPuzzleForNextAttempt가 퍼즐 상태와 연출을 되돌려 다음 Stage를 엽니다. Stage State와 Index, 퍼즐 가능 여부도 복제해 양쪽 화면의 진행을 맞춥니다.
-->

---
layout: default
class: prag-member-summary-slide
---

<p class="prag-slide-category">MEMBER SUMMARY · 윤제영</p>

# 윤제영 · UI를 다음 행동이 읽히는 플레이 흐름으로 연결

<div class="prag-member-summary-grid">
  <div><span>책임 영역</span><strong>전체 Widget Blueprint</strong><ul><li>HUD·해킹 퍼즐·무기 UI Widget Blueprint 제작</li><li>UI 디자인과 위젯 애니메이션 적용</li><li>Hugh·Diana 역할별 정보 표현 규칙 구성</li></ul></div>
  <div><span>대표 결과</span><strong>다음 행동이 읽히는 UI</strong><ul><li>적 해킹 UI로 공격 기회를 만드는 과정 표현</li><li>맵 퍼즐 UI로 이동 경로가 열리는 과정 표현</li><li>무기 UI로 선택한 장비와 상태 전달</li></ul></div>
  <div><span>기술 선택</span><strong>MVVM · ViewModel · FieldNotify</strong><ul><li>게임 로직과 화면 상태를 분리</li><li>값이 바뀔 때만 UI에 변경 알림 전달</li><li>게임 기능 완성 전에도 UI를 독립 테스트</li></ul></div>
</div>

<!--
[15:29-15:38]
제영님은 전체 UI와 퍼즐을 맡아 정보를 다음 행동으로 연결하고 독립 테스트 기반을 만들었습니다.
-->

---
layout: default
class: prag-member-feature prag-ui-results-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 윤제영</p>

# 윤제영 · 세 UI를 플레이의 다음 행동으로 연결

<div class="prag-ui-results-grid">
  <figure class="prag-ui-result-card"><LoopingMediaCanvas class="prag-ui-gif" kind="hacking" aria-label="적 해킹 퍼즐 UI 플레이 화면" /><figcaption><span>01 · 적 해킹</span><strong>Hugh의 공격 기회 생성</strong></figcaption></figure>
  <figure class="prag-ui-result-card"><LoopingMediaCanvas class="prag-ui-gif" kind="map-puzzle" aria-label="맵 해킹 퍼즐 UI 플레이 화면" /><figcaption><span>02 · 맵 퍼즐</span><strong>다음 이동 경로 개방</strong></figcaption></figure>
  <figure class="prag-ui-result-card"><LoopingMediaCanvas class="prag-ui-gif" kind="weapon" aria-label="Hugh 무기 선택 UI 플레이 화면" /><figcaption><span>03 · 무기 UI</span><strong>전투 중 선택 상태 전달</strong></figcaption></figure>
</div>

<!--
[15:38-15:50]
적 해킹은 공격 기회, 맵 퍼즐은 경로, 무기 UI는 전투 선택을 알려 줍니다.
[Q&A 대응] HUD는 UMVVMViewModelBase 기반 ViewModel이 HP, Boost, OverDrive, 재화와 해킹 상태를 FieldNotify 값으로 제공해 게임 로직 없이도 독립 테스트할 수 있게 했습니다. 대신 ViewModel 보일러플레이트와 바인딩 수명주기 관리 비용이 늘어, 일부 즉시 반응 UI에는 직접 이벤트를 함께 사용했습니다.
-->

---
layout: default
class: prag-core prag-currency-troubleshoot
---

<p class="prag-slide-category">TROUBLESHOOTING · 윤제영</p>

# 윤제영 트러블슈팅 · 연속 재화 획득을 한 번에 읽히게 표시

<div class="prag-currency-flow">
  <div v-click="1" class="prag-currency-stage problem prag-cue-rise">
    <span>BEFORE · 연속 획득</span>
    <div class="prag-currency-drops"><b>+20</b><b>+15</b><b>+30</b></div>
    <strong>팝업과 총액이 세 번 연속 변경</strong>
    <small>정보가 너무 빠르게 겹쳐 증가량을 읽기 어려움</small>
  </div>
  <i v-click="2" class="prag-currency-arrow prag-cue-rise">→</i>
  <div v-click="2" class="prag-currency-stage buffer prag-cue-rise">
    <span>BUFFER · 1.0초</span>
    <div class="prag-currency-timer"><i></i><b>20 + 15 + 30</b></div>
    <strong>첫 획득부터 증가량을 누적</strong>
    <small>짧은 시간의 획득을 하나의 피드백 단위로 묶음</small>
  </div>
  <i v-click="3" class="prag-currency-arrow prag-cue-rise">→</i>
  <div v-click="3" class="prag-currency-stage result prag-cue-rise">
    <span>AFTER · UI EVENT 1회</span>
    <div class="prag-currency-single"><b>+65</b><em>LUNA FILAMENT</em></div>
    <strong>합산된 팝업을 한 번만 재생</strong>
    <small>획득 연출 중에는 기존 총액을 유지</small>
  </div>
</div>

<div v-click="4" class="prag-currency-total prag-cue-evidence">
  <span>팝업 종료</span><strong>기존 120</strong><i>→</i><strong>최종 185</strong><p>정보량은 유지하고, 보여 주는 횟수와 순서를 정리</p>
</div>

<div v-click="4" class="prag-troubleshooting-context prag-cue-evidence"><span>TECHNICAL CONTEXT</span><strong>1.0s Merge Window · Pending Delta · UI Event Once · Final Total Commit</strong></div>

<!--
[15:50-16:03]
재화를 연속 획득하면 팝업과 총액이 너무 빠르게 겹쳤습니다. 첫 획득부터 1초 동안 증가량을 모아 한 번만 보여 주고, 팝업이 끝날 때 최종 총액을 반영했습니다.
[Q&A 대응] 게임의 재화 총액은 서버에서 즉시 확정·복제하고, UI 표현만 1초 merge window에서 delta를 합산합니다. ULunaFilamentWidget은 Pending Total을 보관해 팝업 종료 뒤 표시 총액을 반영합니다.
[발표 진행] 중첩 문제 → 1초 합산 → 한 번의 팝업 → 최종 총액 순서로 cue 진행.
-->

---
layout: default
class: prag-core prag-team-review-slide
---

<p class="prag-slide-category">TEAM RETROSPECTIVE · WHAT WENT WELL</p>

# 팀이 잘한 점: 혼자 하던 게임을 함께 해내는 재미로 확장

<div class="prag-team-review-grid">
  <div><span>01 · 출발점</span><strong>한 화면에서 혼자 하던 전투·해킹을 역할로 나눔</strong><p>Hugh는 전투를 열고, Diana는 해킹과 지원으로 다음 행동의 기회를 만듦.</p></div>
  <div><span>02 · 상호의존</span><strong>한 명만 잘해서는 진행하기 어렵게 설계</strong><p>전투·퍼즐·Territory와 역할별 UI가 서로의 행동을 기다리고 이어받도록 연결.</p></div>
  <div><span>03 · 달성한 재미</span><strong>실패는 조율하고, 성공은 함께 가져가는 협동 경험</strong><p>예상 플레이 시나리오처럼 서로 말하며 맞춰 가고, 결국 공동 성공의 성취감으로 돌아오게 함.</p></div>
</div>

<!--
[16:03-16:15]
이 프로젝트를 시작한 이유는 원작의 두 주인공이 혼자 감당하던 전투와 해킹을, 서로 의지해야 해낼 수 있는 2인 협동 경험으로 확장할 수 있다고 봤기 때문입니다. Hugh가 기회를 열고 Diana가 그 기회를 이어 주도록 설계했고, 한 명의 실수는 둘이 조율해 넘기며 성공은 함께 가져가게 했습니다. 우리가 목표로 한 “함께 해냈다”는 재미를 실제 플레이 루프에 담아낸 점이 가장 잘한 부분입니다.
-->

---
layout: default
class: prag-core prag-team-review-slide
---

<p class="prag-slide-category">TEAM RETROSPECTIVE · LIMITATIONS</p>

# 팀의 아쉬운 점: 완성 뒤에 더 선명해진 한계

<div class="prag-team-review-grid">
  <div><span>01 · 첫 플레이</span><strong>역할별 정보량이 한꺼번에 많음</strong><p>처음 접하는 플레이어는 전투·해킹·상태 UI를 동시에 익혀야 함.</p></div>
  <div><span>02 · 네트워크 검증</span><strong>2인 LAN 환경에 집중</strong><p>지연·재접속·장시간 세션을 더 넓은 조건에서 검증할 여지가 남음.</p></div>
  <div><span>03 · 에셋 운영</span><strong>대형 에셋이 협업 비용을 키움</strong><p>이력 정화로 해결했지만 초기에 저장 정책을 고정하지 못함.</p></div>
</div>

<!--
[16:15-16:27]
아쉬운 점은 첫 플레이 정보량, 제한된 네트워크 검증과 늦게 정한 대형 에셋 정책입니다.
-->

---
layout: default
class: prag-core prag-team-review-slide
---

<p class="prag-slide-category">TEAM RETROSPECTIVE · NEXT IMPROVEMENT</p>

# 다음 프로젝트에서 보완할 점: 원격 연결과 UI 구조의 완성도

<div class="prag-team-review-grid">
  <div><span>01 · 원격 연결</span><strong>Listen Server의 원격 접속 경로까지 검증</strong><p>이번에는 LAN 환경의 세션 연결에 집중했습니다. 다음에는 인터넷 환경의 초대·접속·이탈·재접속까지 검증 범위를 넓혀야 합니다.</p></div>
  <div><span>02 · UI 아키텍처</span><strong>MVVM을 HUD 전체와 퍼즐 UI까지 일관되게 적용</strong><p>ViewModel·FieldNotify를 적용했지만 일부 UI는 Widget이 게임 로직과 직접 연결되는 MVC식 흐름이 남았습니다. 상태 전달 경계를 더 명확히 해야 합니다.</p></div>
  <div><span>03 · 에셋 파이프라인</span><strong>대형 파일 저장 정책을 시작부터 분리</strong><p>코드 이력과 바이너리 에셋의 보관·배포 경계를 초기에 고정해, 협업 중 저장소 정화가 필요한 상황을 줄여야 합니다.</p></div>
</div>

<!--
[16:27-16:39]
다음 프로젝트에서는 Listen Server를 LAN 안에서만 확인하는 데 그치지 않고, 원격 접속과 이탈·재접속까지 검증하겠습니다. UI는 ViewModel과 FieldNotify를 이미 사용했지만, 일부 화면에 남은 직접 연결을 줄여 MVVM의 경계를 일관되게 가져가겠습니다. 마지막으로 대형 에셋은 코드 이력과 처음부터 분리하겠습니다.
-->

---
layout: default
class: prag-core prag-applicability-slide
---

<p class="prag-slide-category">PROJECT OUTLOOK · APPLICABILITY</p>

# 배포 한계는 분명하지만, 확장 가능한 구조를 남김

<div class="prag-applicability-grid">
  <div><span>현재 한계</span><strong>학습 목적의 클론 프로젝트</strong><p>기존 상업용 게임 에셋을 일부 활용해 외부 배포와 직접적인 수익화에는 제약이 있음.</p></div>
  <div><span>전환 조건</span><strong>모든 추출 리소스를 적법한 에셋으로 교체</strong><p>캐릭터·적·맵·애니메이션·재질을 자체 제작 또는 라이선스 리소스로 전환.</p></div>
  <div><span>업데이트 방향</span><strong>전투·해킹·보스 콘텐츠 확장</strong><p>몬스터 종류, 전투 구역, 해킹 기믹과 보스 패턴을 같은 기반 위에 추가.</p></div>
</div>

<div class="prag-applicability-foundation"><strong>재사용 가능한 기반</strong><span>Territory 기반 전투 흐름 · 보스 HUD · 맵 기믹 연동 구조</span></div>

<!--
[16:39-16:59]
원작 에셋을 활용한 학습용 클론이라 외부 배포와 수익화에는 한계가 있습니다. 모든 추출 리소스를 적법한 에셋으로 교체하면 검증한 전투·HUD·맵 기믹 구조를 재사용할 수 있습니다.
-->

---
layout: cover
class: prag-cover prag-close
---

<p class="prag-closing-eyebrow">POTENUP 최종 프로젝트</p>

# <span class="prag-title">Q&A</span>

<p class="prag-qa-subtitle">함께 해내는 순간을 위해, 기술과 레벨을 하나로 설계했습니다.</p>
<p class="prag-copyright-mark">PRAGMATA ©CAPCOM</p>

<!--
[16:59 이후 · Q&A]
감사합니다. 질문 받겠습니다. 시연 영상을 포함한 본문은 약 16분 59초이며, 18분 제한 안에 약 1분의 운영 여유를 확보합니다.
-->
