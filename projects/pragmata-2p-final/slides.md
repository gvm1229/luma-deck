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
  <p class="prag-eyebrow">POTENUP 최종 프로젝트 | 최종 발표</p>
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

<p class="prag-slide-category">CO-OP DESIGN</p>

# 한 사람의 행동이 다른 사람의 다음 행동을 만듦

<div class="prag-dependency-route">
  <div v-click="1" class="prag-role-orbit hugh prag-cue-rise"><span>HUGH</span><strong>이동 · 사격 · 생존</strong><small>전장을 버티고 결과를 실행</small></div>
  <div v-click="3" class="prag-dependency-core prag-cue-rise"><strong>공동 목표</strong><span>혼자서는 완성할 수 없음</span></div>
  <div v-click="2" class="prag-role-orbit diana prag-cue-rise"><span>DIANA</span><strong>탐색 · 해킹 · 정화</strong><small>공략 조건과 진행 경로 생성</small></div>
</div>
<div v-click="4" class="prag-dependency-result prag-cue-evidence"><strong>상호의존 게임 루프</strong><span>Diana가 기회를 만들고 → Hugh가 실행하고 → 성공을 함께 확인</span></div>

<!--
[06:30-07:05]
두 플레이어가 같은 일을 반씩 하지 않습니다. 한 사람의 행동이 다른 사람의 다음 행동을 가능하게 합니다.
[발표 진행] Hugh → Diana → 공동 목표 → 결론 순서로 cue 진행.
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

<p class="prag-slide-category">NETWORK FOUNDATION</p>

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
[07:45-08:20]
두 플레이어의 입력은 서버가 판정하고, 확정된 결과를 양쪽 화면에 전달합니다. 이후 기술 사례는 이 구조 안에서 더 좋은 플레이 감각을 만든 선택입니다.
[발표 진행] Client → Server → World → 결론.
-->

---
layout: default
class: prag-core prag-stack-slide prag-no-card-emphasis
---

<p class="prag-slide-category">TECH STACK</p>

# 기술 스택과 개발 환경

<div class="prag-stack-grid">
  <div><span>ENGINE</span><strong>Unreal Engine 5.8</strong><p>C++로 핵심 규칙을 만들고 Blueprint로 플레이와 연출을 빠르게 연결.</p></div>
  <div><span>NETWORK</span><strong>한 플레이어가 서버를 겸함</strong><p>Listen Server 구조로 두 역할의 입력과 월드 결과를 한 기준에 맞춤.</p></div>
  <div><span>WORKFLOW</span><strong>Git · Docs · AI Rules</strong><p>브랜치, 문서, 자동 규칙으로 다섯 명의 작업을 하나의 빌드로 통합.</p></div>
</div>

<!--
[08:20-08:50]
Unreal Engine에서 C++와 Blueprint를 함께 사용했습니다. Git과 프로젝트 문서, 공통 규칙으로 다섯 명의 작업을 하나의 빌드로 연결했습니다.
-->

---
layout: default
class: prag-core prag-core-image
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
[08:50-09:40]
총구 방향만 따르면 자세나 가까운 벽 때문에 화면 중앙과 결과가 어긋날 수 있습니다. 서버가 카메라 방향으로 한 번의 선 판정, 즉 Line Trace를 수행해 처음 맞은 지점을 확정했습니다. 핵심은 보고 조준한 곳이 맞는다는 감각입니다.
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
  <figure class="prag-image-frame"><div class="prag-placeholder"><span>FINAL BUILD CAPTURE</span><strong>Diana 해킹으로 열린 진행 경로</strong><p>퍼즐 성공 결과와 문·전원·이동 경로의 변화가 함께 보이는 16:9 인게임 캡처</p></div><figcaption>해킹 결과가 UI 안에서 끝나지 않고 Hugh의 다음 행동을 가능하게 함.</figcaption></figure>
</div>

<!--
[09:40-10:20]
Diana의 스캔과 해킹은 화면 안에서 끝나지 않습니다. 성공 결과가 문, 전원, 이동 경로를 바꾸고 Hugh의 다음 행동을 가능하게 합니다.
[발표 진행] 찾기 → 해결 → 변화.
-->

---
layout: default
class: prag-map-elements prag-enemy-showcase
---

<p class="prag-slide-category">ENEMY DESIGN</p>

# 적 구성은 배운 협동을 다시 시험함

<div class="prag-centered-body prag-evidence-body"><div class="prag-player-layout">
  <figure class="prag-image-frame"><div class="prag-placeholder"><span>FINAL BUILD CAPTURE</span><strong>Walker 전투 화면</strong><p>Hugh의 공격과 Walker의 피격 반응이 함께 보이는 16:9 인게임 캡처</p></div><figcaption>Walker · 기본 전투 규칙 학습</figcaption></figure>
  <figure class="prag-image-frame"><div class="prag-placeholder"><span>FINAL BUILD CAPTURE</span><strong>오염 Executor 협동 전투</strong><p>Diana의 정화와 Hugh의 후속 공격이 한 장면에 보이는 16:9 인게임 캡처</p></div><figcaption>오염 적 · Diana의 정화까지 요구</figcaption></figure>
  <div class="prag-card"><h3>공통 Enemy 로직</h3><p>여러 적이 공유하는 기반 위에 행동과 역할 요구를 다르게 구성.</p></div>
</div></div>

<!--
[10:20-10:55]
적은 수만 늘리지 않았습니다. 공통 Enemy 로직을 기반으로 Walker, Watcher, Executor와 오염 변형을 구성하고, 뒤로 갈수록 앞에서 배운 협동을 함께 사용하게 했습니다.
-->

---
layout: default
class: prag-map-elements prag-level-showcase
---

<p class="prag-slide-category">LEVEL DESIGN</p>

# 레벨은 압박과 휴식의 리듬을 설계함

<div class="prag-centered-body prag-level-body"><div class="prag-focus-hero"><figure class="prag-image-frame"><div class="prag-placeholder"><span>FINAL BUILD CAPTURE</span><strong>완성된 레벨 진행 경로</strong><p>전투 → 탐색 → 휴식 → 보스전의 연결이 한눈에 읽히는 최종 레벨 캡처</p></div><figcaption>전투 → 탐색 → 휴식 → 보스전이 한 방향으로 이어지는 완성 경로.</figcaption></figure><div class="prag-focus-caption"><strong>필요한 순간에 배우고 사용</strong><span>공간이 다음 행동을 안내</span></div></div></div>

<!--
[10:55-11:25]
맵은 전투, 탐색, 휴식이 번갈아 나오도록 구성했습니다. 새 행동을 배운 뒤 곧바로 사용하고, 최종적으로 보스전까지 이어집니다.
-->

---
layout: default
class: prag-player-slide prag-ui-showcase
---

<p class="prag-slide-category">UI DESIGN</p>

# 역할별 UI는 다음 행동에 필요한 정보만 보여 줌

<div class="prag-centered-body prag-evidence-body"><div class="prag-player-layout"><figure class="prag-image-frame"><div class="prag-placeholder"><span>FINAL BUILD CAPTURE</span><strong>Hugh 전투 HUD</strong><p>체력·탄약·현재 무기와 전투 상태가 동시에 읽히는 최종 빌드 캡처</p></div><figcaption>Hugh · 체력, 탄약, 전투 상태</figcaption></figure><figure class="prag-image-frame"><div class="prag-placeholder"><span>FINAL BUILD CAPTURE</span><strong>Diana 협동 HUD</strong><p>해킹 대상·퍼즐·능력 상태가 동시에 읽히는 최종 빌드 캡처</p></div><figcaption>Diana · 해킹 대상, 퍼즐, 능력 상태</figcaption></figure><div class="prag-card"><h3>정보도 역할의 일부</h3><p>같은 화면을 복사하지 않고 각자의 판단에 필요한 정보에 집중.</p></div></div></div>

<!--
[11:25-11:55]
Hugh는 전투 판단, Diana는 대상과 능력 판단에 필요한 정보를 봅니다. UI도 역할 분담을 강화하는 게임 설계의 일부입니다.
-->

---
layout: default
class: prag-core prag-rules-slide
---

<p class="prag-slide-category">WORKFLOW</p>

# 코드 규칙과 피드백을 작업 환경에 고정함

<div class="prag-rule-grid">
  <div><span>01 · 시작부터 자동 적용</span><strong>편집기 코드 규칙</strong><p>.editorconfig로 인코딩·줄바꿈·들여쓰기 편차를 저장 전에 차단.</p></div>
  <div><span>02 · 사람과 AI가 함께 읽음</span><strong>13개 작업 지침</strong><p>코드·검증·안전·대형 에셋 기준을 같은 규칙으로 적용.</p></div>
  <div><span>03 · 피드백을 다음 작업에 반영</span><strong>Intent · KNOW_HOW</strong><p>발견한 문제와 선택 이유를 기록해 같은 실수를 반복하지 않음.</p></div>
</div>
<p class="prag-rule-loop">문제 발견 → 판단 기록 → 규칙 갱신 → 다음 작업에 자동 적용</p>

<!--
[11:55-12:30]
프로젝트 시작부터 editorconfig와 .agents 지침을 두었습니다. 사람과 AI가 작업할 때 같은 형식, 설계 의도, 검증 규칙을 자동으로 따르게 해 리뷰 이전의 편차를 줄였습니다.
-->

---
layout: default
class: prag-core prag-sleek-technical prag-flow-slide prag-history-slide
---

<p class="prag-slide-category">COLLABORATION</p>

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
[12:30-13:00]
대형 맵 에셋이 모든 Git 이력에 남아 저장소가 5GB 제한을 넘었습니다. 단순 삭제로는 해결되지 않았고, 한 번에 모든 branch를 강제로 바꾸면 팀원의 미반영 작업이 사라질 수 있었습니다. develop에서 정리 방식을 검증한 뒤 hojin 브랜치에 76단계 rebase를 시범 적용해 용량 감소와 작업 보존을 확인했고, 같은 원칙으로 팀 branch를 정리했습니다.
[Q&A 근거] 5GB·17,000여 에셋·76단계 rebase는 당시 작업자가 기록한 운영 수치이며, 절차 근거는 Docs/Operations/history-rewrite-team-runbook.md와 Docs/KNOW_HOW.md의 Large Asset Git Hygiene에 정리되어 있습니다.
[발표 진행] 5GB 문제 → 전체 이력 정화 → 안전한 시범 적용 → 검증 결과.
-->

---
layout: default
class: prag-core prag-core-image
---

<p class="prag-slide-category">COLLABORATION · RETROSPECTIVE</p>

# 설계와 기록을 같은 협업 흐름으로 연결

<div class="prag-core-image-layout">
  <figure class="prag-image-frame"><div class="prag-placeholder"><span>FINAL COLLABORATION CAPTURE</span><strong>Figma · Notion · Code Intent</strong><p>화면 설계, 작업 맥락, 구현 판단이 이어지는 협업 기록 화면 캡처</p></div><figcaption>설계안에서 구현·검증 기록까지 같은 맥락으로 이어지게 관리.</figcaption></figure>
  <div class="prag-core-notes">
    <div class="prag-card"><h3>Figma · 화면 설계</h3><p>역할별 HUD와 퍼즐 화면의 구조·상태를 먼저 맞춰 구현 기준을 정렬.</p></div>
    <div class="prag-card"><h3>Notion · 작업 맥락</h3><p>기획 의도, 역할 분담과 결정 사항을 공유해 작업 사이의 맥락을 유지.</p></div>
    <div class="prag-card"><h3>Code Intent · 검증 기록</h3><p>권한 경계와 검증 기준을 코드 가까이에 남겨 다음 변경도 같은 기준으로 확인.</p></div>
  </div>
</div>
<p class="prag-project-boundary">비상업적 학습 목적의 팬 프로젝트 · 원작 IP와 추출 에셋의 권리는 원저작자에게 있음</p>

<!--
[13:00-13:15]
협업은 구현 단계에서만 시작하지 않았습니다. Figma에서 역할별 화면과 상태를 먼저 정렬하고, Notion에 기획 의도와 작업 맥락을 공유했습니다. 구현 뒤에는 Code Intent와 KNOW_HOW에 권한 경계와 검증 기준을 남겼습니다. 그래서 화면 설계, 작업 결정, 코드 변경이 서로 끊기지 않고 같은 맥락에서 이어질 수 있었습니다.
-->

---
layout: default
class: prag-core prag-team-ownership
---

<p class="prag-slide-category">TEAM OWNERSHIP</p>

# 다섯 명의 역할 분담

<div class="prag-team-role-grid">
  <div><div class="prag-role-card-head"><span>01</span><strong>정호진</strong></div><b>Diana · 서버 · 전체 기획/리드</b><p>카메라 Line Trace 상호작용 · Scan/OverDrive<br>추종 애니메이션 · 팀 체크포인트·복구 흐름</p></div>
  <div><div class="prag-role-card-head"><span>02</span><strong>박준현</strong></div><b>Hugh · 무기 · Walker/Watcher</b><p>이동·점프·호버·공격<br>GripGun · Shockwave · Decoy</p></div>
  <div><div class="prag-role-card-head"><span>03</span><strong>안지성</strong></div><b>Enemy 공통 로직 · Stasis Net</b><p>Executor · Tainted 적 · Sentinel 행동 고도화<br>전체 기획 · 레벨 디자인</p></div>
  <div><div class="prag-role-card-head"><span>04</span><strong>안민원</strong></div><b>맵 · 프롭 · Sentinel 기초</b><p>맵 에셋 추출·맵 제작<br>Item Box · Hack Node · Sentinel 기초 제작</p></div>
  <div><div class="prag-role-card-head"><span>05</span><strong>윤제영</strong></div><b>UI · 해킹 퍼즐</b><p>전체 Widget Blueprint 디자인·애니메이션<br>Enemy Hack · Map Hack 퍼즐 UI/로직</p></div>
</div>

<!--
[13:15-13:35]
다섯 명은 기능을 단순히 나눈 것이 아니라 플레이어, 적, 레벨, UI처럼 서로 연결되는 시스템을 각자 끝까지 책임졌습니다. 지금부터 각 멤버의 역할을 먼저 요약하고, 바로 다음 장에서 대표 성과와 트러블슈팅을 설명하겠습니다.
-->

---
layout: default
class: prag-member-summary-slide
---

<p class="prag-slide-category">MEMBER SUMMARY · 정호진</p>

# 정호진 · Diana의 시선과 서버 판정을 하나의 플레이로 연결

<div class="prag-member-summary-grid">
  <div><span>책임 영역</span><strong>Diana · 서버 · 전체 통합</strong><p>시선 기반 상호작용, Scan·OverDrive와 팀 체크포인트 흐름을 연결.</p></div>
  <div><span>대표 결과</span><strong>보이는 대상과 실제 서버 판정을 일치</strong><p>카메라 Line Trace와 서버 재검증으로 조준한 표면만 상호작용 대상으로 확정.</p></div>
  <div><span>기술·협업 역할</span><strong>프로젝트 리드 · 기획 · 애셋/재질</strong><p>에셋 추출과 재질 편집부터 서버·애니메이션 트러블슈팅까지 전체 통합을 책임.</p></div>
</div>

<!--
[13:35-13:50]
정호진은 Diana의 조작과 스킬, 캐릭터 표현, 서버 구조와 전체 통합을 담당했습니다. 최근에는 Diana 상호작용을 위치·각도 중심 판정에서 카메라 Line Trace로 전환하고, 클라이언트가 본 대상도 서버가 다시 같은 기준으로 검증하도록 정리했습니다. 기술 기능뿐 아니라 전체 기획과 팀 의사결정, 애셋 추출과 재질 편집까지 프로젝트가 하나의 빌드로 합쳐지는 경계를 책임졌습니다.
-->

---
layout: default
class: prag-member-focus-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 정호진</p>

# 정호진 · Diana 상호작용을 카메라 Line Trace로 전환

<div class="prag-member-focus-card">
  <span>성과 01 · CAMERA-RAY INTERACTION</span>
  <strong>화면 중앙의 실제 표면을 맞힌 경우에만 상호작용</strong>
  <p>대상의 중심점과 각도를 비교하던 방식 대신, Diana 카메라에서 최대 50m 범위의 Line Trace를 수행하고, POI별 거리 안에서 실제 노드·프롭 표면을 판정함.</p>
  <div class="prag-member-focus-proof"><b>VALIDATION FLOW</b><em>카메라 시선 → 첫 충돌 표면 → 거리·대상 검증 → 서버 상호작용</em></div>
</div>

<!--
[13:50-13:58]
기존에는 대상의 루트 위치가 화면 중앙과 가까운지를 비교했기 때문에, 큰 오브젝트의 엉뚱한 면을 보거나 가림막 너머를 조준해도 후보가 될 수 있었습니다. 이를 Diana 카메라에서 최대 50미터 범위의 Visibility Line Trace를 수행하는 방식으로 바꿨고, 실제 상호작용 거리는 POI별 metadata로 다시 제한했습니다. 첫 충돌이 실제 후보 또는 그 하위 표면인지 확인하고, 엘리베이터처럼 바닥과 퍼즐 노드가 겹친 예외는 바닥만 제외한 뒤 노드 표면을 다시 검사했습니다. 클라이언트가 표시한 포커스를 그대로 신뢰하지 않고 서버도 저장된 카메라 시선으로 같은 판정을 다시 수행합니다. 맵 해킹 노드는 조준으로 시작하지만 아이템 박스는 상호작용 입력을 유지해 의도하지 않은 자동 실행도 막았습니다.
-->

---
layout: default
class: prag-member-focus-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 정호진</p>

# 정호진 · Diana 스킬과 팀 복구를 서버 상태로 통합

<div class="prag-member-focus-card">
  <span>성과 02 · SERVER GAMEPLAY FLOW</span>
  <strong>개인 스킬의 결과를 두 플레이어의 공통 상태로 확장</strong>
  <p>OverDrive 범위 해킹과 체크포인트 팀 리스폰·자원 복구를 서버에서 확정하고, 진행 연출과 HUD를 양쪽 화면에 동기화함.</p>
  <div class="prag-member-focus-proof"><b>NETWORK FLOW</b><em>Diana 요청 → 서버 검증 → 팀 상태 변경 → 양쪽 화면·HUD 반영</em></div>
</div>

<!--
[13:58-14:06]
최근 구현에서는 OverDrive의 범위 해킹과 연출, Cleanse 획득 잠금, 체크포인트의 팀 리스폰과 자원 복구를 각각 로컬 이벤트로 끝내지 않고 서버가 확정하는 공통 게임 상태로 연결했습니다. 체크포인트는 Hugh와 Diana의 위치·사망 상태·자원·업그레이드 세션까지 함께 복구하고, 진행 프롬프트와 HUD 결과를 두 화면에 맞춰 전달합니다. 이 구조 덕분에 Diana의 입력이 개인 화면의 효과가 아니라 실제 협동 루프의 상태 변화로 이어집니다.
-->

---
layout: default
class: prag-member-focus-slide prag-member-troubleshooting-slide
---

<p class="prag-slide-category">TROUBLESHOOTING · 정호진</p>

# 정호진 트러블슈팅 · 방장 역할에 따라 다른 결과가 보임

<div class="prag-member-troubleshooting-route">
  <div><span>문제</span><strong>방장 역할에 따라 캐릭터 배정과 애니메이션 결과가 달라짐</strong><p>Hugh가 방장일 때와 Diana가 방장일 때 원격 화면의 결과가 일치하지 않음.</p></div>
  <i>→</i>
  <div><span>판단</span><strong>역할 전달과 화면 표현 상태를 분리</strong><p>누가 어떤 캐릭터를 맡는지와 원격에서 무엇을 보여 줄지를 서로 다른 책임으로 정리.</p></div>
  <i>→</i>
  <div><span>해결</span><strong>두 방장 조합을 반복 검증해 같은 결과로 수렴</strong><p>Hugh 방장·Diana 방장 조합에서 배정과 애니메이션을 모두 확인.</p></div>
</div>

<!--
[14:06-14:18]
Diana는 Hugh에 붙어 보이는 캐릭터이면서 별도의 플레이어가 조작하는 역할입니다. 역할 선택 순서에 따라 캐릭터 배정과 원격 애니메이션 결과가 달라지는 문제를 역할 전달과 원격 표시 상태로 분리했습니다. 이후 Hugh와 Diana가 각각 방장인 두 조합을 반복 확인해 어느 쪽이 방장이든 같은 플레이가 보이도록 만들었습니다.
-->

---
layout: default
class: prag-member-summary-slide
---

<p class="prag-slide-category">MEMBER SUMMARY · 박준현</p>

# 박준현 · Hugh의 움직임과 무기를 하나의 전투로 연결

<div class="prag-member-summary-grid">
  <div><span>책임 영역</span><strong>Hugh 이동과 전투 행동</strong><p>이동·점프·호버·공격을 플레이어가 즉시 이해할 수 있는 조작으로 구성.</p></div>
  <div><span>대표 결과</span><strong>세 무기와 전투 피드백</strong><p>GripGun·Shockwave Gun·Decoy Generator를 적의 반응과 연결.</p></div>
  <div><span>확장 영역</span><strong>Walker · Watcher</strong><p>적 메시와 행동을 제작하고 Hugh의 무기와 맞물리는 전투 루프를 완성.</p></div>
</div>

<!--
[14:18-14:26]
박준현은 Hugh의 이동과 행동, 세 종류의 무기, Walker와 Watcher를 담당했습니다. 플레이어 조작에서 발사와 적 반응까지 이어지는 전투의 중심 축을 완성했습니다.
-->

---
layout: default
class: prag-member-focus-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 박준현</p>

# 박준현 · Hugh의 이동과 무기 행동을 연결

<div class="prag-member-focus-card">
  <span>성과 01 · HUGH PLAYER</span>
  <strong>이동·점프·호버 중에도 전투 행동이 자연스럽게 이어짐</strong>
  <p>공격과 재장전이 이동 상태를 끊지 않도록 Hugh의 조작, 애니메이션 이벤트와 무기 상태를 연결함.</p>
  <div class="prag-member-focus-proof"><b>PLAYER FLOW</b><em>이동·점프·호버 → 공격·재장전 → 즉시 조작 복귀</em></div>
</div>

<!--
[14:26-14:34]
첫 번째 성과는 Hugh의 이동과 무기 행동을 연결한 것입니다. 이동, 점프와 호버 중에도 공격과 재장전이 자연스럽게 이어지고, 동작이 끝난 뒤 즉시 조작으로 돌아오도록 상태와 애니메이션 이벤트를 구성했습니다.
-->

---
layout: default
class: prag-member-focus-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 박준현</p>

# 박준현 · 세 무기와 적의 반응을 연결

<div class="prag-member-focus-card">
  <span>성과 02 · COMBAT LOOP</span>
  <strong>무기의 차이가 Walker·Watcher의 피격과 행동 변화로 이어짐</strong>
  <p>GripGun·Shockwave Gun·Decoy Generator의 서로 다른 결과를 적의 반응과 연결해 전투 선택의 의미를 만듦.</p>
  <div class="prag-member-focus-proof"><b>COMBAT FLOW</b><em>무기 선택 → 발사 결과 → Walker·Watcher 반응</em></div>
</div>

<!--
[14:34-14:42]
두 번째 성과는 세 무기의 차이를 적의 반응으로 이어지게 만든 것입니다. GripGun, Shockwave Gun과 Decoy Generator가 서로 다른 방식으로 Walker와 Watcher의 피격과 행동을 바꾸도록 연결했습니다.
-->

---
layout: default
class: prag-member-focus-slide prag-member-troubleshooting-slide
---

<p class="prag-slide-category">TROUBLESHOOTING · 박준현</p>

# 박준현 트러블슈팅 · 무기 동작이 하체 움직임을 끊음

<div class="prag-member-troubleshooting-route">
  <div><span>문제</span><strong>이동·호버 중 무기 동작이 하체 애니메이션을 덮어씀</strong><p>공격이나 재장전 때 이동감이 끊겨 조작과 화면이 따로 보임.</p></div>
  <i>→</i>
  <div><span>판단</span><strong>상체 무기 동작과 하체 이동의 책임을 분리</strong><p>전신 애니메이션 교체 대신 두 영역을 동시에 재생하는 구조가 필요함.</p></div>
  <i>→</i>
  <div><span>해결</span><strong>Layered Blend와 이벤트로 타이밍을 연결</strong><p>AnimNotify·Delegate로 재장전과 획득 적용 시점까지 화면 동작과 맞춤.</p></div>
</div>

<!--
[14:42-14:54]
이동과 호버 중 무기 동작이 하체 움직임을 덮어써 조작감이 끊겨 보였습니다. 상체 무기 동작과 하체 이동을 Layered Blend로 분리하고, 재장전과 무기 획득의 실제 적용 시점은 AnimNotify와 Delegate로 연결해 조작과 화면 피드백의 타이밍을 맞췄습니다.
-->

---
layout: default
class: prag-member-summary-slide
---

<p class="prag-slide-category">MEMBER SUMMARY · 안지성</p>

# 안지성 · 여러 적이 공유하는 전투 규칙을 설계

<div class="prag-member-summary-grid">
  <div><span>책임 영역</span><strong>공통 Enemy 로직</strong><p>피해·약점·AI Territory처럼 모든 적이 재사용하는 전투 기반을 설계.</p></div>
  <div><span>대표 결과</span><strong>Executor·오염 적·Sentinel 행동 고도화</strong><p>Tainted Walker·Tainted Executor와 Sentinel을 같은 공통 규칙 위에서 다른 압박으로 확장.</p></div>
  <div><span>확장 영역</span><strong>Stasis Net · 기획 · 레벨 디자인</strong><p>무기와 적, 공간이 함께 작동하도록 전투의 난이도와 배치를 조정.</p></div>
</div>

<!--
[14:54-15:02]
안지성은 Executor와 오염 적, 여러 적이 공유하는 Enemy 로직, Sentinel 행동 고도화, Stasis Net과 레벨 디자인을 담당했습니다. 적마다 표현은 달라도 피해와 약점, 영역 행동은 같은 규칙을 재사용하도록 구성했습니다.
-->

---
layout: default
class: prag-member-focus-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 안지성</p>

# 안지성 · 적이 늘어나도 공통 전투 규칙을 유지

<div class="prag-member-focus-card">
  <span>성과 01 · ENEMY FOUNDATION</span>
  <strong>서로 다른 적이 같은 피해·약점·상태 흐름을 재사용</strong>
  <p>Executor·Tainted Walker·Tainted Executor와 Sentinel 행동 고도화를 공통 Enemy 규칙 위에서 확장함.</p>
  <div class="prag-member-focus-proof"><b>SHARED RULE</b><em>공통 피해·약점·상태 → 적별 메시·행동·압박으로 확장</em></div>
</div>

<!--
[15:02-15:10]
첫 번째 성과는 적 종류가 늘어나도 공통 전투 규칙을 유지한 것입니다. Executor와 오염 적, Sentinel의 표현과 행동은 달라도 피해, 약점과 상태 흐름은 같은 기반을 재사용하도록 설계했습니다.
-->

---
layout: default
class: prag-member-focus-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 안지성</p>

# 안지성 · Stasis Net과 레벨 압박을 연결

<div class="prag-member-focus-card">
  <span>성과 02 · WEAPON & LEVEL</span>
  <strong>적을 잠시 멈추는 선택이 공간을 돌파하는 협동 전략이 됨</strong>
  <p>Stasis Net의 행동 제어와 적 배치·이동 공간을 함께 조정해 전투에서 역할을 나눌 선택지를 확장함.</p>
  <div class="prag-member-focus-proof"><b>TACTICAL FLOW</b><em>적 행동 제어 → 안전 구간 확보 → 역할 분담·공간 돌파</em></div>
</div>

<!--
[15:10-15:18]
두 번째 성과는 Stasis Net과 레벨의 압박을 연결한 것입니다. 적을 잠시 멈추는 기능만 만드는 데서 끝내지 않고, 적 배치와 이동 공간을 함께 조정해 두 플레이어가 역할을 나눠 돌파할 선택지로 만들었습니다.
-->

---
layout: default
class: prag-member-focus-slide prag-member-troubleshooting-slide
---

<p class="prag-slide-category">TROUBLESHOOTING · 안지성</p>

# 안지성 트러블슈팅 · 영역 경계에서 상태가 반복 전환됨

<div class="prag-member-troubleshooting-route">
  <div><span>문제</span><strong>경계에서 귀환과 대기 상태가 빠르게 반복됨</strong><p>적이 Territory 선을 오가며 움직임이 흔들리고 추적 판단이 불안정해짐.</p></div>
  <i>→</i>
  <div><span>판단</span><strong>같은 경계값으로 이탈과 복귀를 모두 판단함</strong><p>선을 한 번 넘자마자 상태가 다시 바뀌는 전환 진동이 발생함.</p></div>
  <i>→</i>
  <div><span>해결</span><strong>경계 안쪽 여유 거리까지 귀환을 유지</strong><p>안정 구간에 도달한 뒤에만 추적을 재개해 상태 전환을 고정함.</p></div>
</div>

<!--
[15:18-15:30]
적이 Territory 경계에서 귀환과 대기 상태를 반복하던 원인은 같은 경계값으로 이탈과 복귀를 모두 판단했기 때문입니다. 경계 안쪽의 여유 거리까지 귀환 상태를 유지한 뒤에만 추적을 재개하도록 바꿔 상태 전환 진동을 제거했습니다.
-->

---
layout: default
class: prag-member-summary-slide
---

<p class="prag-slide-category">MEMBER SUMMARY · 안민원</p>

# 안민원 · 대형 에셋을 길을 읽을 수 있는 레벨로 구성

<div class="prag-member-summary-grid">
  <div><span>책임 영역</span><strong>맵 에셋 추출과 맵 제작</strong><p>대규모 원본 에셋을 실제 플레이 가능한 연구 시설 공간으로 재구성.</p></div>
  <div><span>대표 결과</span><strong>탐사와 전투가 이어지는 진행 경로</strong><p>통로·배관·문·랜드마크를 배치해 다음 목표와 이동 방향을 읽게 만듦.</p></div>
  <div><span>확장 영역</span><strong>Item Box · Hack Node · Sentinel 기초</strong><p>맵 프롭과 Sentinel 기초 제작을 플레이 흐름에 연결하고 보스 전투 공간을 구성.</p></div>
</div>

<!--
[15:30-15:38]
안민원은 맵 에셋 추출과 맵 제작, Item Box와 Hack Node 같은 프롭, Sentinel 보스의 기초 제작을 담당했습니다. 대형 에셋을 단순히 배치하지 않고 목표 지점과 이동 경로가 읽히는 레벨로 재구성했습니다.
-->

---
layout: default
class: prag-member-focus-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 안민원</p>

# 안민원 · 모듈형 에셋을 읽히는 진행 동선으로 구성

<div class="prag-member-focus-card">
  <span>성과 01 · LEVEL DESIGN</span>
  <strong>반복되는 연구 시설에서도 다음 목표와 이동 방향이 읽힘</strong>
  <p>통로·배관·문을 조합하고 색상 랜드마크를 배치해 대형 공간을 실제 플레이 가능한 진행 경로로 재구성함.</p>
  <div class="prag-member-focus-proof"><b>LEVEL FLOW</b><em>모듈형 에셋 → 색상 랜드마크 → 탐사 방향·목표 인지</em></div>
</div>

<!--
[15:38-15:46]
첫 번째 성과는 반복되는 모듈형 에셋을 읽히는 진행 동선으로 만든 것입니다. 통로, 배관과 문을 조합하고 색상 랜드마크를 배치해 대형 연구 시설 안에서도 다음 목표와 이동 방향을 읽을 수 있게 구성했습니다.
-->

---
layout: default
class: prag-member-focus-slide
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 안민원</p>

# 안민원 · 프롭과 Sentinel 기초를 플레이 공간에 연결

<div class="prag-member-focus-card">
  <span>성과 02 · WORLD BUILDING</span>
  <strong>탐사·상호작용·보스 전투가 한 공간 흐름으로 이어짐</strong>
  <p>Item Box·Hack Node와 Sentinel 기초를 레벨에 배치해 공간이 장식이 아니라 실제 플레이 규칙을 전달하도록 구성함.</p>
  <div class="prag-member-focus-proof"><b>WORLD FLOW</b><em>탐사 → 프롭 상호작용 → Sentinel 보스 전투 공간</em></div>
</div>

<!--
[15:46-15:54]
두 번째 성과는 맵 프롭과 Sentinel 기초를 플레이 공간에 연결한 것입니다. Item Box와 Hack Node, Sentinel 기초를 실제 진행 경로에 배치해 탐사와 상호작용, 보스 전투가 하나의 공간 흐름으로 이어지게 만들었습니다.
-->

---
layout: default
class: prag-member-focus-slide prag-member-troubleshooting-slide
---

<p class="prag-slide-category">TROUBLESHOOTING · 안민원</p>

# 안민원 트러블슈팅 · 에디터의 맵이 패키지에서 사라짐

<div class="prag-member-troubleshooting-route">
  <div><span>문제</span><strong>에디터에서 보이던 맵과 에셋이 최종 빌드에서 누락됨</strong><p>작업 화면의 정상 표시만으로 패키징 포함 여부를 보장할 수 없었음.</p></div>
  <i>→</i>
  <div><span>판단</span><strong>실제 플레이 경로와 런타임 참조를 따로 추적</strong><p>항상 필요한 맵과 상황에 따라 불러오는 에셋의 포함 규칙이 다름.</p></div>
  <i>→</i>
  <div><span>해결</span><strong>MapsToCook과 필요한 cook label을 명시</strong><p>패키지 빌드에서 맵 진입과 런타임 에셋 로드를 직접 검증함.</p></div>
</div>

<!--
[15:54-16:06]
에디터에서 정상적으로 보이던 맵과 에셋도 패키징 목록에 없으면 최종 빌드에서 누락될 수 있었습니다. 실제 플레이 경로의 맵은 MapsToCook에 명시하고, 런타임에서 불러오는 에셋은 필요한 항목만 cook label로 관리해 패키지에서도 맵과 상호작용 에셋이 그대로 열리는지 검증했습니다.
-->

---
layout: default
class: prag-member-summary-slide
---

<p class="prag-slide-category">MEMBER SUMMARY · 윤제영</p>

# 윤제영 · UI를 다음 행동이 읽히는 플레이 흐름으로 연결

<div class="prag-member-summary-grid">
  <div><span>책임 영역</span><strong>전체 Widget Blueprint</strong><p>HUD와 화면별 위젯의 디자인·애니메이션·상태 표현을 일관된 규칙으로 제작.</p></div>
  <div><span>대표 결과</span><strong>적 해킹 · 맵 퍼즐 · 무기 UI</strong><p>전투 기회, 이동 경로, 무기 선택을 플레이어가 즉시 이해하도록 시각화.</p></div>
  <div><span>기술 선택</span><strong>MVVM · ViewModel · FieldNotify</strong><p>게임 로직과 UI를 분리해 기능 완성 전에도 화면을 독립적으로 테스트할 수 있게 구성.</p></div>
</div>

<!--
[16:06-16:14]
윤제영은 모든 Widget Blueprint와 UI 디자인·애니메이션, 적 해킹과 맵 해킹 퍼즐 로직을 담당했습니다. UI가 게임 로직 완성을 기다리지 않도록 MVVM 경계를 도입한 것이 기술적 핵심입니다.
-->

---
layout: default
class: prag-ui-overview
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 윤제영</p>

# 윤제영 · MVVM으로 UI를 게임 로직에서 분리

<div class="prag-ui-overview-layout">
  <div class="prag-ui-overview-route">
    <div v-click="1" class="prag-cue-rise"><span>문제</span><strong>게임 로직을 기다리는 UI</strong><small>직접 참조 구조에서는 기능이 준비될 때까지 화면 테스트도 함께 지연.</small></div>
    <i>→</i>
    <div v-click="2" class="prag-cue-rise"><span>선택</span><strong>UMVVMViewModelBase</strong><small>게임 상태를 화면이 사용할 값으로 변환하는 ViewModel 계층을 도입.</small></div>
    <i>→</i>
    <div v-click="3" class="prag-cue-rise"><span>결과</span><strong>FieldNotify 바인딩</strong><small>값이 바뀔 때만 Widget Blueprint에 알려 독립 테스트 가능.</small></div>
  </div>
  <div v-click="4" class="prag-ui-mvvm-summary prag-cue-evidence">
    <div><span>WHY · MVVM</span><strong>게임 로직 없이 UI를 단독 테스트</strong><small>로직 구현을 기다리느라 UI 작업이 지연된 경험에서 출발. MVC식 직접 참조 대신 화면 상태를 분리.</small></div>
    <div><span>HOW · FIELDNOTIFY</span><strong>UMVVMViewModelBase → Widget Blueprint</strong><small>HP·Boost·OverDrive·재화·해킹 상태를 값으로 변환하고, 변경 시 바인딩된 UI에 알림.</small></div>
    <div><span>TRADE-OFF</span><strong>결합도 감소 ↔ 코드 작성량 증가</strong><small>독립 테스트를 얻은 대신 ViewModel 보일러플레이트와 수동 바인딩 생명주기 관리 비용을 감수.</small></div>
  </div>
</div>

<!--
[16:14-16:29]
MVVM을 선택한 첫 번째 이유는 게임 로직이 준비되지 않아 UI 작업까지 지연됐던 경험을 반복하지 않기 위해서였습니다. HUD가 캐릭터나 퍼즐 컴포넌트를 매 프레임 직접 조회하는 결합 대신, UMVVMViewModelBase 기반 ViewModel이 HP, Boost, OverDrive, 재화와 해킹 상태를 FieldNotify 값으로 바꾸고 Widget Blueprint가 해당 값에 바인딩되도록 구현했습니다. FieldNotify는 broadcast와 비슷하게 보이지만 ViewModel 속성 갱신에 초점을 둡니다. 독립 테스트를 얻은 대신 ViewModel 코드와 수동 바인딩 생명주기 관리가 늘어나는 비용을 감수했습니다.
[발표 진행] 문제 → ViewModel 선택 → FieldNotify 결과 → 선택 이유·구현·비용 순서로 cue 진행.
-->

---
layout: default
class: prag-member-feature
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 윤제영</p>

# 윤제영 · 적 해킹 퍼즐을 플레이 가능한 UI로 완성

<div class="prag-ui-showcase portrait">
  <figure class="prag-image-frame prag-ui-gif-frame"><LoopingMediaCanvas class="prag-ui-gif" kind="hacking" aria-label="적 해킹 퍼즐 UI 플레이 화면" /><figcaption>적의 방어를 해제하는 해킹 퍼즐 · 실제 게임 동작</figcaption></figure>
  <aside class="prag-ui-showcase-copy"><span>01 · ENEMY HACKING</span><strong>퍼즐 입력을 전투의 다음 행동으로 연결</strong><p>Diana가 퍼즐을 해결하면 Hugh가 공격할 기회를 얻음.</p></aside>
</div>

<!--
[16:29-16:37]
첫 번째 성과는 적 해킹 퍼즐 UI입니다. Diana가 적의 방어 구조를 읽고 퍼즐을 해결하면 Hugh가 공격할 기회를 얻습니다. UI를 장식이 아니라 두 역할을 연결하는 실제 플레이 규칙으로 만들었습니다.
[발표 진행] GIF가 보여 주는 입력과 완료 결과를 짧게 설명합니다.
-->

---
layout: default
class: prag-member-feature
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 윤제영</p>

# 윤제영 · 맵 해킹 퍼즐로 탐색 경로를 직접 바꿈

<div class="prag-ui-showcase portrait">
  <figure class="prag-image-frame prag-ui-gif-frame"><LoopingMediaCanvas class="prag-ui-gif" kind="map-puzzle" aria-label="맵 해킹 퍼즐 UI 플레이 화면" /><figcaption>잠긴 경로와 장치를 여는 맵 해킹 퍼즐 · 실제 게임 동작</figcaption></figure>
  <aside class="prag-ui-showcase-copy"><span>02 · MAP HACKING</span><strong>화면 안의 선택이 레벨의 변화로 이어짐</strong><p>Diana의 해킹이 두 플레이어가 이동할 다음 길을 만듦.</p></aside>
</div>

<!--
[16:37-16:45]
두 번째는 맵 해킹 퍼즐 UI입니다. 퍼즐을 풀었다는 화면 안의 결과가 끝이 아니라, 잠긴 문과 장치 그리고 두 플레이어의 다음 이동 경로를 실제로 바꿉니다. 따라서 관객도 UI와 레벨 변화의 관계를 바로 이해할 수 있습니다.
[발표 진행] 퍼즐 완료와 레벨 상태 변화의 관계를 설명합니다.
-->

---
layout: default
class: prag-member-feature
---

<p class="prag-slide-category">MEMBER ACHIEVEMENT · 윤제영</p>

# 윤제영 · 무기 UI로 전투 선택을 즉시 읽게 만듦

<div class="prag-ui-showcase landscape">
  <figure class="prag-image-frame prag-ui-gif-frame"><LoopingMediaCanvas class="prag-ui-gif" kind="weapon" aria-label="Hugh 무기 선택 UI 플레이 화면" /><figcaption>무기 선택·교체·현재 상태를 한 화면에 전달 · 실제 게임 동작</figcaption></figure>
  <aside class="prag-ui-showcase-copy"><span>03 · WEAPON UI</span><strong>전투를 멈추지 않고 다음 무기를 선택</strong><p>상황에 맞는 무기를 고르는 시간을 줄여 전투 흐름을 유지함.</p></aside>
</div>

<!--
[16:45-16:53]
세 번째는 무기 UI입니다. 전투 중에도 보유 무기와 현재 선택 상태를 빠르게 비교하고 교체 결과를 바로 확인할 수 있습니다. 플레이어가 메뉴를 해석하는 데 시간을 쓰지 않고 다음 행동을 선택하도록 만드는 것이 목표였습니다.
[발표 진행] 무기 선택과 교체 결과가 즉시 읽히는 지점을 설명합니다.
-->

---
layout: default
class: prag-core prag-currency-troubleshoot
---

<p class="prag-slide-category">TROUBLESHOOTING · 윤제영</p>

# 윤제영 트러블슈팅 1 · 연속 재화 획득을 읽기 쉬운 피드백으로 묶음

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

<!--
[16:53-17:05]
짧은 시간에 Luna Filament를 여러 번 얻으면 팝업과 총액이 계속 바뀌어 실제 증가량을 읽기 어려웠습니다. 첫 획득부터 1초 동안 증가량을 모아 UI 이벤트를 한 번만 전달하고, 연출이 끝난 뒤 최종 총액을 반영했습니다. 정보는 그대로 유지하면서 사용자가 읽어야 하는 순서를 명확하게 만들었습니다.
[발표 진행] 중첩 문제 → 1초 합산 → 한 번의 팝업 → 최종 총액 순서로 cue 진행.
-->

---
layout: default
class: prag-core prag-gauge-troubleshoot
---

<p class="prag-slide-category">TROUBLESHOOTING · 윤제영</p>

# 윤제영 트러블슈팅 2 · 화면이 달라도 게이지는 같은 상태를 가리킴

<div class="prag-gauge-flow">
  <div v-click="1" class="prag-gauge-stage problem prag-cue-rise">
    <span>BEFORE · FIXED PIXEL</span>
    <div class="prag-gauge-viewport wide"><i></i><b></b><em>16:9</em></div>
    <div class="prag-gauge-viewport narrow"><i></i><b></b><em>STRETCH</em></div>
    <strong>채움과 잔상 위치가 서로 어긋남</strong>
    <small>해상도와 Anchor가 달라지면 같은 수치도 다르게 보임</small>
  </div>
  <i v-click="2" class="prag-gauge-arrow prag-cue-rise">→</i>
  <div v-click="2" class="prag-gauge-stage measure prag-cue-rise">
    <span>MEASURE · RUNTIME</span>
    <div class="prag-gauge-formula"><b>CachedGeometry</b><i>×</i><b>실제 트랙 너비</b></div>
    <strong>현재 화면의 실제 크기를 기준으로 계산</strong>
    <small>고정 좌표가 아니라 Widget이 차지한 공간을 사용</small>
  </div>
  <i v-click="3" class="prag-gauge-arrow prag-cue-rise">→</i>
  <div v-click="3" class="prag-gauge-stage result prag-cue-rise">
    <span>AFTER · SAME VALUE</span>
    <div class="prag-gauge-track"><i></i><b></b><em></em></div>
    <strong>채움·잔상·현재선이 같은 기준에 정렬</strong>
    <small>화면 비율이 달라도 동일한 게임 상태를 전달</small>
  </div>
</div>

<div v-click="4" class="prag-gauge-trail prag-cue-evidence">
  <span>BOOST 감소</span><div class="prag-gauge-trail-bar"><i></i><b></b></div><strong>잔상을 잠시 유지</strong><i>→</i><strong>현재 값까지 보간</strong><p>얼마나 감소했는지 즉시 읽을 수 있음</p>
</div>

<!--
[17:05-17:17]
HP와 Boost 게이지에 고정 픽셀 좌표를 쓰면 해상도나 Stretch Anchor가 달라질 때 채움 영역과 잔상 위치가 어긋났습니다. Widget의 CachedGeometry와 실제 트랙 너비를 기준으로 채움, 잔상, 현재 위치선을 다시 계산했습니다. Boost가 감소하면 잔상을 잠시 남긴 뒤 현재 값까지 보간해 감소량도 바로 읽을 수 있게 했습니다.
[발표 진행] 고정 픽셀 문제 → 실제 크기 측정 → 정렬된 결과 → Boost 잔상 보간 순서로 cue 진행.
-->

---
layout: cover
class: prag-cover prag-close
---

<p class="prag-closing-eyebrow">POTENUP 최종 프로젝트</p>

# <span class="prag-title">Q&A</span>

<p class="prag-qa-subtitle">함께 해내는 순간을 위해, 기술과 레벨을 하나로 설계했습니다.</p>

<!--
[17:17 이후 · Q&A]
감사합니다. 질문 받겠습니다. 5분 시연 영상 포함 본문 약 17분, 약 8분의 운영 여유를 확보합니다.
-->
