---
theme: apple-basic
title: "Pragmata 2P 최종 발표"
fonts:
  sans: "Pretendard Variable"
  local: "Pretendard Variable"
  provider: none
info: |
  POTENUP 최종 프로젝트 Pragmata 2P 기술 쇼케이스.
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
Pragmata의 두 주인공과 서로 다른 능력에서 2인 협동으로 확장할 가능성을 발견했습니다.
오늘은 완성된 게임과, 더 재미있는 플레이를 만들기 위해 어떤 기술적 선택을 했는지 보여드립니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# 왜 이 게임을 2인 협동으로 만들었는가

<div class="prag-core-image-layout">
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-04-chaos-combat-hacking.png" alt="전투와 해킹을 동시에 처리하는 원작의 난전" /><figcaption>혼자서는 이동·사격·회피·해킹을 동시에 감당해야 하는 상황.</figcaption></figure>
  <div class="prag-core-notes">
    <div class="prag-card"><h3>두 명의 주인공</h3><p>이미 서로 다른 능력을 가진 Hugh와 Diana는 역할 분리에 자연스럽게 어울렸음.</p></div>
    <div class="prag-card"><h3>좋은 도전</h3><p>네트워크와 역할 설계까지 배워야 했지만, 원작의 재미를 확장할 가치가 분명했음.</p></div>
    <div class="prag-card"><h3>우리의 선택</h3><p>복잡함을 줄이는 대신, 서로가 꼭 필요한 협동의 재미로 전환.</p></div>
  </div>
</div>

<!--
[00:20-01:10]
단순히 두 명이 같은 게임을 하는 것이 목표는 아니었습니다.
한 사람이 동시에 처리하던 부담을 서로 다른 역할로 나누면, 원작의 구조를 훼손하지 않고 새로운 협동의 재미로 확장할 수 있다고 보았습니다.
처음 접하는 네트워크 문제까지 감수해야 했지만, 그래서 더 배울 가치가 있는 도전이었습니다.
-->

---
layout: default
class: prag-core prag-dependency
---

# 각자의 역할이 맞물릴 때 게임이 더 재미있어짐

<div class="prag-dependency-route">
  <div v-click="1" class="prag-role-orbit hugh prag-cue-rise"><span>HUGH</span><strong>이동 · 사격 · 생존</strong><small>전장을 버티고 약점을 공격</small></div>
  <div v-click="3" class="prag-dependency-core prag-cue-rise"><strong>공동 목표</strong><span>혼자서는 완성할 수 없음</span></div>
  <div v-click="2" class="prag-role-orbit diana prag-cue-rise"><span>DIANA</span><strong>탐색 · 해킹 · 정화</strong><small>공략 조건과 진행 경로 생성</small></div>
</div>
<div v-click="4" class="prag-dependency-result prag-cue-evidence"><strong>상호의존 게임 루프</strong><span>Diana가 기회를 만들고 → Hugh가 실행하고 → 성공을 함께 확인</span></div>

<!--
[01:10-01:50]
두 플레이어가 같은 일을 반씩 하는 구조가 아닙니다. 한 사람의 행동이 다른 사람의 다음 행동을 가능하게 합니다.
핵심 메시지는 기술 그 자체가 아니라, 이 상호의존 관계가 게임을 더 재미있게 만든다는 것입니다.
[발표 진행] Hugh → Diana → 공동 목표 → 상호의존 결론 순서로 cue 진행.
-->

---
layout: default
class: prag-showcase-overview
---

# 영상에서 볼 네 가지 장면

<div class="prag-showcase-path">
  <div v-click="1" class="prag-cue-rise"><span>01</span><strong>접속과 역할</strong><small>RoomCode · Hugh / Diana</small></div>
  <div v-click="2" class="prag-cue-rise"><span>02</span><strong>협동 탐사</strong><small>장치 발견 · 해킹 · 경로 변화</small></div>
  <div v-click="3" class="prag-cue-rise"><span>03</span><strong>협동 전투</strong><small>약점 생성 · 사격 · 정화</small></div>
  <div v-click="4" class="prag-cue-rise"><span>04</span><strong>후반 완주</strong><small>대규모 전투 · 보스전</small></div>
</div>
<p class="prag-showcase-hint">누가 다음 행동의 기회를 만드는지에 주목해 주세요.</p>
<div v-click="5" class="prag-showcase-video-cue prag-cue-rise"><strong>시연 영상</strong></div>

<!--
[01:50-12:20]
영상을 보기 전에 최소한의 흐름만 짚겠습니다. 접속과 역할 선택, 협동 탐사, 약점과 사격이 연결되는 전투, 정화와 후반 전투까지 이어집니다.
기능의 개수보다 서로의 행동이 어떻게 이어지는지를 봐 주시면 됩니다.
[발표 진행] 네 개 장면을 차례로 cue 진행한 뒤 `시연 영상` cue에서 10분 영상 재생. 영상 종료 후 다음 슬라이드로 진행.
-->

---
layout: default
class: prag-core prag-coop-comic
---

# 협동에서는 서로의 실수가 그대로 보임

<div class="prag-comic-grid prag-comic-two">
  <div v-click="1" class="prag-comic-panel prag-cue-rise"><div class="prag-comic-scene hugh"><span>H</span><i>!</i></div><p class="prag-speech left">“야, 좀 잘해 봐!”</p><small>전투와 해킹 타이밍이 어긋남</small></div>
  <div v-click="2" class="prag-comic-panel prag-cue-rise"><div class="prag-comic-scene diana"><span>D</span><i>×</i></div><p class="prag-speech right">“아, 왜 던져!”</p><small>서로의 실수가 그대로 보임</small></div>
</div>

<!--
[12:20-12:40]
협동에서는 서로의 실수가 바로 보이기 때문에 자연스럽게 다투기도 합니다.
-->

---
layout: default
class: prag-core prag-coop-comic
---

# 다시 맞추고 함께 해내는 순간이 더 크게 남음

<div class="prag-comic-grid prag-comic-two">
  <div v-click="1" class="prag-comic-panel prag-cue-rise"><div class="prag-comic-scene sync"><span>H</span><b>→</b><span>D</span></div><p class="prag-speech left">“내가 버틸게. 지금 해킹!”</p><small>역할과 타이밍을 다시 조율</small></div>
  <div v-click="2" class="prag-comic-panel success prag-cue-rise"><div class="prag-comic-scene success"><span>H</span><i>★</i><span>D</span></div><p class="prag-speech right">“오, 해냈다! 나이스!”</p><small>공동 성공이 성취감으로 전환</small></div>
</div>
<div v-click="3" class="prag-comic-thesis prag-cue-evidence"><strong>우정 파괴에서 공동 성취로</strong><span>함께 해내는 순간을 주요 재미로 설계</span></div>

<!--
[12:40-13:05]
하지만 역할을 다시 맞추고 함께 성공하면 그 성취감은 혼자 해냈을 때보다 커집니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# 총은 카메라가 보는 곳을 정확히 맞혀야 함

<div class="prag-focus-hero prag-gripgun-slide">
  <figure class="prag-image-frame prag-gripgun-evidence">
    <img class="prag-img" src="./images/slide-15-enemy-hit.png" alt="카메라 조준점으로 적을 맞힌 실제 장면" />
    <div class="prag-gripgun-flow" aria-label="GripGun의 직관적인 사격 흐름">
      <div v-click="1" class="prag-gripgun-node prag-gripgun-client"><span>CAMERA</span><strong>화면 중앙 조준점</strong></div>
      <div v-click="2" class="prag-gripgun-segment prag-gripgun-intent"><i></i><div class="prag-gripgun-node prag-gripgun-hit"><span>LINE TRACE</span><strong>처음 맞은 지점 확정</strong></div></div>
    </div>
    <figcaption>총구 방향의 작은 오차보다 플레이어가 실제로 보고 조준한 지점을 우선.</figcaption>
  </figure>
  <div v-click="3" class="prag-focus-caption"><strong>보고 조준한 곳이 맞는다</strong><span>기술의 목적은 더 자연스러운 손맛</span></div>
</div>

<!--
[13:05-14:20]
대표 사례는 총의 발사입니다. 총구에서 그대로 쏘면 가까운 벽이나 애니메이션 자세 때문에 화면 중앙과 결과가 어긋날 수 있습니다.
그래서 카메라가 보는 방향으로 한 번의 Line Trace를 수행했습니다. 목적은 단순합니다. 보고 조준한 곳이 맞아야 재미있습니다.
[발표 진행] CAMERA → LINE TRACE → 결론 순서로 cue 진행.
-->

---
layout: default
class: prag-core prag-core-image
---

# Diana의 해킹은 다음 행동과 공간을 바꿈

<div class="prag-focus-hero prag-sleek-technical">
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-16-hacking-puzzle.png" alt="Diana의 해킹 퍼즐" /><div class="prag-technical-strip"><div v-click="1" class="prag-tech-node prag-cue-rise"><span>찾기</span><strong>화면 앞 장치 선택</strong></div><i v-click="2" class="prag-tech-arrow"></i><div v-click="2" class="prag-tech-node prag-cue-rise"><span>확인</span><strong>상호작용 가능 여부</strong></div><i v-click="3" class="prag-tech-arrow"></i><div v-click="3" class="prag-tech-node prag-cue-rise"><span>변화</span><strong>문 · 전원 · 이동 경로</strong></div></div><figcaption>해킹은 UI 안에서 끝나지 않고 실제 월드와 Hugh의 다음 행동을 바꿈.</figcaption></figure>
</div>

<!--
[14:20-15:10]
Diana의 해킹은 미니게임 하나로 끝나지 않습니다. 화면 앞의 올바른 장치를 고르고, 성공하면 문과 전원, 이동 경로가 실제로 변합니다.
‘찾기, 확인, 월드 변화’라는 인과만 짧게 설명합니다.
-->

---
layout: default
class: prag-map-elements
---

# 레벨은 압박과 휴식의 리듬을 설계함

<div class="prag-focus-hero"><figure class="prag-image-frame"><img class="prag-img prag-img-contain" src="./images/slide-21-level-map-main-route.png" alt="최종 레벨 진행 경로" /><figcaption>전투 → 탐색 → 휴식 → 보스전이 한 방향으로 자연스럽게 이어짐.</figcaption></figure><div class="prag-focus-caption"><strong>필요한 순간에 배우고 사용</strong><span>공간이 다음 행동을 안내</span></div></div>

<!--
[15:10-15:35]
맵은 전투와 탐색, 휴식이 번갈아 나오도록 구성해 다음 목표와 감정의 리듬을 만들었습니다.
-->

---
layout: default
class: prag-map-elements
---

# 새로운 적은 배운 협동을 다시 시험함

<div class="prag-focus-hero"><figure class="prag-image-frame"><img class="prag-img" src="./images/slide-16-enemy-tainted-executor.png" alt="정화가 필요한 오염 Executor" /><figcaption>오염 상태는 기존 공격만 반복하지 않고 Diana의 정화를 함께 사용하게 함.</figcaption></figure><div class="prag-focus-caption"><strong>압박 → 발견 → 해결</strong><span>적 구성이 협동 판단을 요구</span></div></div>

<!--
[15:35-16:00]
오염된 Executor는 단순히 체력이 높은 적이 아니라, 앞에서 배운 정화를 전투에 다시 사용하게 만드는 시험입니다.
-->

---
layout: default
class: prag-troubleshoot
---

# 트러블슈팅 · 내 화면의 정상은 완료가 아니었음

<div class="prag-trouble-hero">
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-15-enemy-hit.png" alt="두 플레이어가 같은 전투 결과를 보는 화면" /><figcaption>상대 화면에서만 조준 손과 이동 애니메이션이 달라 보였던 문제.</figcaption></figure>
  <div class="prag-trouble-answer"><span>원인</span><strong>보이는 상태가 로컬에만 있었음</strong><span>해결</span><strong>원격 화면에도 필요한 상태를 전달</strong><p>게임 규칙과 화면 표현을 함께 검증</p></div>
</div>

<!--
[16:00-16:50]
서버 작업은 이 한 가지 교훈으로 요약하겠습니다. 내 화면에서는 정상이어도 상대 화면에서는 조준 손이나 이동 애니메이션이 다르게 보였습니다.
보이는 상태까지 상대에게 전달하고 양쪽 화면을 함께 확인하면서 해결했습니다.
-->

---
layout: default
class: prag-troubleshoot
---

# 트러블슈팅 · 실패를 단계로 나누면 원인이 보였음

<div class="prag-lesson-pair">
  <div><strong>주소가 :0</strong><p>접속 실패를 검색 → 포트 준비 → 맵 이동으로 나눠 추적</p></div>
  <div><strong>아직 없는 무기</strong><p>복제 도착 전의 null을 오류가 아닌 정상 상태로 처리</p></div>
</div>
<p class="prag-trouble-thesis">“실패했다”가 아니라 <b>어느 단계에서 멈췄는가</b>를 질문함.</p>

<!--
[16:50-17:30]
다른 문제들도 세부 구현보다 배운 방식을 말씀드리겠습니다. 접속 실패는 단계별로 나눴고, 복제 전 null은 정상적인 시간차로 받아들였습니다.
-->

---
layout: default
class: prag-player-slide
---

# 역할별 HUD는 협동에 필요한 정보만 보여 줌

<div class="prag-player-layout"><figure class="prag-image-frame"><img class="prag-img" src="./images/unreal-capture-hugh-hud-start.png" alt="Hugh HUD" /><figcaption>Hugh · 체력, 탄약, 전투 상태</figcaption></figure><figure class="prag-image-frame"><img class="prag-img" src="./images/unreal-capture-diana-hud-start.png" alt="Diana HUD" /><figcaption>Diana · 해킹 대상, 퍼즐, 정화 상태</figcaption></figure><div class="prag-card"><h3>정보도 역할의 일부</h3><p>두 사람에게 같은 화면을 복사하지 않고, 각자 다음 행동을 결정하는 정보에 집중.</p></div></div>

<!--
[17:30-18:10]
HUD는 기술 구조를 보여 주기 위한 화면이 아니라 협동을 돕는 정보 설계입니다. Hugh는 전투 판단, Diana는 대상과 능력 판단에 필요한 정보를 봅니다.
-->

---
layout: default
class: prag-tools-showcase
---

# 반복 작업은 도구화하고, 의도는 문서로 고정

<div class="prag-tools-grid">
  <figure class="prag-image-frame"><img class="prag-img prag-img-contain" src="./images/slide-28-asset-extractor-tool-screenshot.png" alt="에셋 추출 도구" /><figcaption>반복 에셋 작업 자동화</figcaption></figure>
  <figure class="prag-image-frame"><img class="prag-img prag-img-contain" src="./images/slide-ai-code-intent.png" alt="Code Intent 문서" /><figcaption>AI 자동화가 지켜야 할 설계 의도 기록</figcaption></figure>
  <div class="prag-card"><h3>도구의 목적</h3><p>사람은 플레이의 재미와 설계 판단에 집중하고, 반복 작업과 맥락 유실을 줄임.</p></div>
</div>

<!--
[18:10-18:50]
Unreal Editor 연결 도구와 에셋 파이프라인으로 반복 작업을 줄였고, Code Intent 문서로 자동화가 설계 의도를 벗어나지 않게 했습니다.
도구 자체보다 사람이 재미를 판단할 시간을 확보했다는 결과가 중요합니다.
-->

---
layout: default
class: prag-team-final
---

# 정호진 · Diana 플레이와 전체 통합

<div class="prag-contribution-solo"><figure class="prag-image-frame"><img class="prag-img" src="./images/unreal-capture-diana-ready-recovery.png" alt="완성된 Diana 플레이" /></figure><div><strong>DIANA · INTEGRATION</strong><p>탐색·해킹·정화 플레이와 팀 결과물을 최종 흐름으로 연결</p></div></div>

<!--
[18:50-19:15] Diana 플레이와 통합 기여를 한 문장으로 소개.
-->

---
layout: default
class: prag-team-final
---

# 박준현 · Hugh 조작과 전투의 손맛

<div class="prag-contribution-solo"><figure class="prag-image-frame"><img class="prag-img" src="./images/slide-29-unreal-import-hugh-result.png" alt="Hugh 전투 캐릭터" /></figure><div><strong>HUGH · COMBAT</strong><p>이동·조준·무기·피격 반응으로 직접 조작하는 전투 경험 완성</p></div></div>

<!-- [19:15-19:40] Hugh 조작과 전투 기여를 한 문장으로 소개. -->

---
layout: default
class: prag-team-final
---

# 안지성 · Executor와 전투 압박

<div class="prag-contribution-solo"><figure class="prag-image-frame"><img class="prag-img" src="./images/slide-35-unreal-import-executor-result.png" alt="Executor 적 캐릭터" /></figure><div><strong>EXECUTOR · ENCOUNTER</strong><p>적 구성과 전투 리듬으로 중반 이후의 긴장과 대응 판단 강화</p></div></div>

<!-- [19:40-20:05] Executor와 전투 리듬 기여를 한 문장으로 소개. -->

---
layout: default
class: prag-team-final
---

# 안민원 · 맵 구성과 보스전 공간

<div class="prag-contribution-solo"><figure class="prag-image-frame"><img class="prag-img" src="./images/slide-21-level-map-main-route.png" alt="완성된 레벨 맵" /></figure><div><strong>LEVEL · BOSS ARENA</strong><p>탐사·전투·휴식·보스전이 자연스럽게 이어지는 플레이 공간 구성</p></div></div>

<!-- [20:05-20:30] 맵과 보스전 공간 기여를 한 문장으로 소개. -->

---
layout: default
class: prag-team-final
---

# 윤제영 · 해킹 UI와 전투 피드백

<div class="prag-contribution-solo"><figure class="prag-image-frame"><img class="prag-img" src="./images/slide-13-hacking-ui.png" alt="Diana 해킹 UI" /></figure><div><strong>HACKING UI · FEEDBACK</strong><p>퍼즐 상태와 약점·피격 결과를 즉시 읽을 수 있는 시각 피드백 완성</p></div></div>

<!-- [20:30-20:55] 해킹 UI와 전투 피드백 기여를 한 문장으로 소개. -->

---
layout: default
class: prag-final-thesis
---

# 기술은 더 재미있는 협동을 만들기 위한 수단

<div class="prag-final-proof">
  <figure class="prag-image-frame"><img class="prag-img" src="./images/slide-16-enemy-sentinel-boss.png" alt="완성된 후반 보스전" /><figcaption>RoomCode 접속부터 역할 선택, 탐사, 전투, 정화와 보스전까지 완주 가능한 최종 빌드.</figcaption></figure>
  <div class="prag-final-message"><strong>FUN FIRST</strong><p>역할 설계로 서로를 필요하게 만들고<br>레벨 디자인으로 배움과 긴장을 조절하고<br>네트워크 기술로 같은 결과를 함께 경험하게 함</p></div>
</div>

<!--
[20:55-21:40]
저희는 기술을 많이 쓰는 것 자체를 목표로 삼지 않았습니다. 역할 설계, 레벨 디자인, 네트워크 판정은 모두 더 직관적이고 재미있는 협동을 만들기 위한 수단이었습니다.
Pragmata가 가진 가능성을 2인 협동으로 확장했고, 접속부터 보스전까지 완주 가능한 게임으로 완성했습니다.
-->

---
layout: center
class: prag-closing
---

# <span class="prag-title">Q&A</span>

<p class="prag-qa-subtitle">함께 해내는 순간을 위해, 기술과 레벨을 하나로 설계했습니다.</p>

<!--
[21:40-22:00]
감사합니다. 질문 받겠습니다. 약 2분의 운영 여유를 남깁니다.
-->
