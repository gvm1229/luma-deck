---
theme: apple-basic
title: "팀 다이애나 최종 팀 프로젝트"
fonts:
  sans: "Pretendard Variable"
  local: "Pretendard Variable"
  provider: none
info: |
  Pragmata 기반 Unreal Engine 5 2인 협동 액션 퍼즐 프로젝트 기획 발표.
transition: none
layout: cover
class: prag-cover
---

<p class="prag-eyebrow">원티드 포텐업 게임개발 과정 최종 팀 프로젝트</p>

# <span class="prag-title">Pragmata 2P</span>

<p class="prag-subtitle">
Pragmata의 Hugh와 Diana 플레이를 분리해 2인 협동 액션 퍼즐 게임으로 재해석하는 학습용 프로젝트
</p>

<div class="prag-tags">
  <span class="prag-tag"><b>팀 다이애나</b>: 정호진, 박준현, 안지성, 안민원, 윤제영</span>
  <span class="prag-tag">개발 기간: 2026.06.08 - 2026.07.14</span>
</div>

<!--
[종료 목표 00:20]

시간: 20초

팀 다이애나 대표 발표자: 정호진.
기획 방향: Pragmata를 2인 협동 플레이 게임으로 재해석·확장.
슬라이드는 이미지 중심 구성. 화면의 이미지와 텍스트로 분위기와 방향을 보여주고, 핵심 내용은 구두 설명.
-->


---
layout: default
class: prag-agenda
---

# 발표 흐름

<div class="prag-agenda-list">
  <div class="prag-agenda-item">
    <span>01</span>
    <p>프로젝트명 및 한 줄 소개</p>
  </div>
  <div class="prag-agenda-item">
    <span>02</span>
    <p>프로젝트 주제 / 목표 / 기획 의도</p>
  </div>
  <div class="prag-agenda-item">
    <span>03</span>
    <p>사용자 관점의 재미와 가치</p>
  </div>
  <div class="prag-agenda-item">
    <span>04</span>
    <p>개발 기간 안에서 가능한 제작 범위</p>
  </div>
  <div class="prag-agenda-item">
    <span>05</span>
    <p>주요 기능과 추가 기능 구분</p>
  </div>
  <div class="prag-agenda-item">
    <span>06</span>
    <p>멘토링까지 구현할 핵심 기능</p>
  </div>
  <div class="prag-agenda-item">
    <span>07</span>
    <p>팀원 역할과 협업 방식</p>
  </div>
  <div class="prag-agenda-item">
    <span>08</span>
    <p>기대 효과와 확장 가능성</p>
  </div>
</div>

<!--
[종료 목표 00:40]

시간: 20초

발표의 큰 축은 두 가지.
먼저 기획의 적절성, 주제와 재미의 명확성 설명. 이어서 기간 안에 만들 수 있는 범위와 협업 계획 제시.
모든 항목은 기획 발표 평가 기준에 맞춰 정리.
-->


---
layout: default
class: prag-guide-fit
---

# 기획 발표 평가 대응

<div class="prag-rubric-grid">
  <div class="prag-card">
    <span>30점</span>
    <h3>기획의 적절성</h3>
    <p>원작의 싱글 플레이 경험을 2인 역할 분리 협동으로 재해석.</p>
  </div>
  <div class="prag-card">
    <span>30점</span>
    <h3>필수 기능 설계</h3>
    <p>전투, 해킹, 세션, 레벨 진행을 최소 구현 범위와 추가 기능으로 구분 관리.</p>
  </div>
  <div class="prag-card">
    <span>20점</span>
    <h3>팀워크와 역할</h3>
    <p>호진(Diana / 서버 / 에셋), 준현(Hugh), 지성(레벨 / Executor), 민원(맵), 제영(UI)으로 분담 및 공유.</p>
  </div>
  <div class="prag-card">
    <span>20점</span>
    <h3>사용자 가치</h3>
    <p>서로 다른 화면과 역할을 가진 두 사람이 함께 문제를 해결하는 재미 창출.</p>
  </div>
</div>

<!--
[종료 목표 01:00]

시간: 20초

이번 발표의 핵심 기준은 구체성과 실현 가능성.
원작 재해석 방향, 핵심 기능 범위, 그리고 호진·준현·지성·민원·제영의 작업이 하나의 플레이 흐름으로 연결되는 방식 제시.
-->


---
layout: default
class: prag-project-goal prag-feature-slide
---

# 프로젝트 주제와 목표

<div class="prag-feature-layout">
  <div class="prag-card">
    <h3>한 줄 소개</h3>
    <p>
      Pragmata는 Hugh의 액션 전투와 Diana의 해킹 퍼즐을 두 플레이어에게 나누어,
      같은 전장을 서로 다른 방식으로 해결하게 만드는 2인 협동 액션 퍼즐 게임.
    </p>
    <ul class="prag-compact-list mt-3">
      <li>개발 엔진: Unreal Engine 5</li>
      <li>네트워크 구조: Listen Server 기반 2인 협동</li>
      <li>목표 결과물: 짧은 선형 스테이지와 보스전까지 플레이 가능한 데모</li>
    </ul>
  </div>
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-04-project-goal-hugh-diana-summary.jpg" />
    <figcaption>원작의 Hugh와 Diana 조합을 실제 2인 플레이 책임으로 분리하는 것이 핵심 주제.</figcaption>
  </figure>
</div>

<!--
[종료 목표 01:25]

시간: 25초

Pragmata의 한 문장 요약: 전투 담당 Hugh와 해킹 담당 Diana가 서로 다른 방식으로 같은 전장을 해결하는 2인 협동 액션 퍼즐 게임.
목표: 거대한 전체 게임이 아니라, 짧은 선형 스테이지와 보스전까지 실제 플레이 가능한 데모 완성.
네트워크 범위도 2인 Listen Server로 고정.
-->


---
layout: default
class: prag-why-pragmata
---

# 왜 Pragmata를 모작 대상으로 삼았는가?

<div class="prag-why-layout">
  <div class="prag-card prag-why-main">
    <h3>선택 이유</h3>
    <p>
      Pragmata는 FPS 액션, 해킹 퍼즐, 레벨 기믹이 하나의 진행 흐름 안에서 맞물리는 게임이기 때문에
      단일 기능 구현이 아니라 캐릭터 조작, 적 AI, UI, 레벨 디자인, 네트워크 협동을 함께 다뤄볼 수 있다고 판단함.
    </p>
  </div>

  <div class="prag-card">
    <h3>시스템 밀도</h3>
    <p>전투, 해킹, 퍼즐, 맵 기믹이 분리되지 않고 한 플레이 흐름 안에서 작동.</p>
  </div>

  <div class="prag-card">
    <h3>팀 프로젝트 적합성</h3>
    <p>캐릭터, 적, 맵, UI, 에셋 파이프라인처럼 팀원별 구현 영역을 자연스럽게 분리 가능.</p>
  </div>

  <div class="prag-card">
    <h3>재해석 가능성</h3>
    <p>원작의 싱글 플레이 판단을 Hugh와 Diana의 2인 역할 분리 협동으로 확장 가능.</p>
  </div>
</div>

<!--
[제출용 보강]

Pragmata를 선택한 이유 정리.
단순히 원작이 독특해서가 아니라, 팀 프로젝트로 구현해볼 만한 시스템이 밀도 있게 모여 있음 강조.
전투, 해킹, 퍼즐, 맵 기믹이 한 흐름 안에서 맞물리고, 이를 2인 협동으로 바꾸면 캐릭터, 적 AI, UI, 레벨, 네트워크처럼 팀원별 담당 영역도 자연스럽게 분리.
원작의 한 플레이어 판단을 두 플레이어의 협동으로 나누는 지점이 프로젝트 차별점.
-->


---
layout: default
class: prag-summary prag-feature-slide
---

# 기획 의도: 싱글 플레이를 협동으로 확장

<div class="prag-feature-layout">
  <div class="prag-card">
    <h3>원작에서 가져올 부분</h3>
    <p>
      기존 Pragmata는 Hugh의 이동·전투와 Diana의 해킹 지원이 같은 플레이 흐름 안에서 작동.
      Pragmata는 이 판단을 두 명에게 나누어 실시간 의사소통과 역할 의존을 핵심 재미로 구성.
    </p>
    <ul class="prag-compact-list mt-3">
      <li>Hugh는 전장을 버티며 공격 타이밍 확보.</li>
      <li>Diana는 해킹으로 방어 해제와 약점 노출 담당.</li>
      <li>두 행동이 겹칠 때 적 처리와 진행 속도 상승.</li>
    </ul>
  </div>
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-06-coop-intent-singleplayer-combat.jpg" />
    <figcaption>원작의 한 화면 판단을 전투 플레이어와 해킹 플레이어의 동시 협업으로 전환.</figcaption>
  </figure>
</div>

<!--
[종료 목표 01:50]

시간: 25초

원작에서는 한 명의 플레이어가 전투 상황과 해킹 지원을 함께 확인.
출발점: “한 화면 안의 판단을 두 사람의 역할로 나누면 어떨까?”라는 질문.
Hugh는 생존과 공격 기회 생성, Diana는 해킹으로 그 기회 개방.
-->


---
layout: default
class: prag-value
---

# 사용자 관점의 재미와 가치

<div class="prag-value-grid">
  <div class="prag-card">
    <h3>역할이 다른 협동</h3>
    <p>두 플레이어가 같은 문제를 같은 조작으로 해결하지 않음. Hugh는 생존과 사격, Diana는 퍼즐과 지원 판단 담당.</p>
  </div>
  <div class="prag-card">
    <h3>말해야 이기는 전투</h3>
    <p>적 약점 노출, 해킹 성공, 사격 타이밍이 맞아야 전투가 쉬워지므로 자연스러운 커뮤니케이션 발생.</p>
  </div>
  <div class="prag-card">
    <h3>짧고 명확한 목표</h3>
    <p>선형 스테이지로 길 찾기 부담을 줄이고, 구역별 전투와 퍼즐 목표를 명확히 제시.</p>
  </div>
  <div class="prag-card">
    <h3>반복 가능한 성장</h3>
    <p>체크포인트, 보상, 무기, 해킹 노드로 실패 후 재도전과 다음 전투 준비 이유 제공.</p>
  </div>
</div>

<!--
[종료 목표 02:15]

시간: 25초

사용자 입장에서의 재미는 단순히 같이 접속하는 데서 끝나지 않음.
두 사람이 서로 다른 조작과 정보를 가지고, 말을 맞춰야 전투가 쉬워지는 구조가 핵심.
길 찾기보다 구역별 목표를 분명히 해서, 관객과 플레이어 모두 “지금 무엇을 해야 하는지” 바로 이해하도록 설계.
-->


---
layout: default
class: prag-loop
---

# 핵심 게임 루프

<div class="prag-flow">
  <div class="prag-card prag-step">
    <strong>탐사</strong>
    <p>태양광 발전소 맵을 선형으로 진행하며 무기, 루나 필라멘트, 해킹 노드를 발견</p>
  </div>
  <div class="prag-card prag-step">
    <strong>기계 해킹</strong>
    <p>Diana가 문, 장치, 필드 기믹을 해킹해 다음 구역을 개방</p>
  </div>
  <div class="prag-card prag-step">
    <strong>전투</strong>
    <p>Hugh가 생존과 공격을 맡고 Diana가 적 해킹으로 약점을 노출</p>
  </div>
  <div class="prag-card prag-step">
    <strong>체크포인트</strong>
    <p>HP 회복, 아이템 재충전, 실패 후 재도전 위치 저장</p>
  </div>
  <div class="prag-card prag-step">
    <strong>구역 진행</strong>
    <p>다음 전투와 퍼즐 조합으로 넘어가며 보스전까지 도달</p>
  </div>
</div>

<p class="prag-mini mt-4">비전투 시간이 길어지면 Diana의 할 일이 줄어들기 때문에, 탐사와 전투 사이의 간격은 짧고 명확하게 설계.</p>

<!--
[종료 목표 02:40]

시간: 25초

게임 루프: 탐사, 해킹, 전투, 체크포인트, 다음 구역 진행 반복.
핵심: Diana가 기다리는 시간이 길어지지 않도록 전투와 해킹 사이 간격을 짧게 설정.
이 루프가 안정화되면 보상과 보스 패턴을 그 위에 확장 가능.
-->


---
layout: default
class: prag-feature-scope
---

# 구현할 주요 기능 목록

<div class="prag-scope-grid">
  <div class="prag-card">
    <h3>주요 기능</h3>
    <ul class="prag-list">
      <li>Listen Server 세션 생성과 6자리 참가 코드</li>
      <li>Hugh / Diana 역할 선택과 중복 선택 방지</li>
      <li>Hugh 이동, 조준, 사격, 회피, 회복 아이템</li>
      <li>Diana 적 해킹 퍼즐, 약점 노출, 필드 장치 조작</li>
      <li>기본 적, 오염 변종, 보스전</li>
      <li>체크포인트, 게임 오버, 클리어 조건</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>추가 기능</h3>
    <ul class="prag-list">
      <li>무기 파밍과 간단한 무기 교체</li>
      <li>Diana 해킹 노드와 오버드라이브 게이지</li>
      <li>상점 또는 강화 요소</li>
      <li>연출용 UI, 전투 피드백, 감상 요소</li>
      <li>보스 패턴 확장과 난이도 조정</li>
      <li>맵 우회 경로와 탐험 보상</li>
    </ul>
  </div>
</div>

<p class="prag-mini mt-4">주요 기능은 데모 완성 기준, 추가 기능은 핵심 루프 안정화 뒤 선택 구현.</p>

<!--
[종료 목표 03:05]

시간: 25초

만들고 싶은 기능과 꼭 만들어야 하는 기능 분리.
왼쪽의 주요 기능은 데모 완성 기준.
오른쪽의 추가 기능은 재미 보강 요소. 핵심 루프 안정화 뒤 선택적으로 추가할 항목.
이 구분을 통해 기간 안의 완성 가능성 확보.
-->


---
layout: default
class: prag-milestone
---

# 멘토링까지 구현할 핵심 기능

<div class="prag-milestone-layout">
  <div class="prag-card">
    <h3>1차 플레이 가능 목표</h3>
    <p>멘토링 단계에서는 전체 게임보다 “두 명이 함께 플레이해야 하는 이유”가 실제로 보이는 기능 우선 완성.</p>
  </div>
  <div class="prag-card">
    <span>01</span>
    <h3>접속과 역할 선택</h3>
    <p>호스트 세션 생성, 참가 코드 입력, Hugh / Diana 역할 확정</p>
  </div>
  <div class="prag-card">
    <span>02</span>
    <h3>기본 전투</h3>
    <p>Hugh 조작, 워커 몬스터, 사격 / 회피 / HP 판정</p>
  </div>
  <div class="prag-card">
    <span>03</span>
    <h3>전투 중 해킹</h3>
    <p>Diana가 적을 해킹해 방어를 해제하고 Hugh의 공격 타이밍 생성.</p>
  </div>
  <div class="prag-card">
    <span>04</span>
    <h3>짧은 스테이지</h3>
    <p>해킹 장치, 체크포인트, 기본 전투 1회 이상을 연결한 시연 가능 구간</p>
  </div>
</div>

<!--
[종료 목표 03:30]

시간: 25초

멘토링까지는 전체 게임보다 시연 가능 구간 우선.
목표: 접속, 역할 선택, 짧은 전투 안에서 Hugh와 Diana의 협동이 실제로 보이는 상태.
이 단계에서 재미가 보이면 이후 맵, 보스, 보상을 더 확신 있게 확장 가능.
-->


---
layout: default
class: prag-session
---

# 2인 세션과 역할 선택

<div class="prag-sequence">
  <div class="prag-card">
    <span>호스트</span>
    <h3>Hugh 또는 Diana 선택</h3>
    <p>방 생성과 6자리 참가 코드 발급.</p>
  </div>
  <div class="prag-card">
    <span>참가</span>
    <h3>코드 입력</h3>
    <p>클라이언트 참가 후 남은 역할 선택.</p>
  </div>
  <div class="prag-card">
    <span>규칙</span>
    <h3>중복 선택 방지</h3>
    <p>같은 역할을 두 명이 선택하면 시작 불가.</p>
  </div>
  <div class="prag-card">
    <span>시작</span>
    <h3>공유 진행 시작</h3>
    <p>HP, 체크포인트, 획득 상태를 공동 진행으로 관리.</p>
  </div>
</div>

<p class="prag-mini mt-4">네트워크 범위는 2인 Listen Server로 제한해 구현 리스크를 줄이고, 협동 경험 검증에 집중.</p>

<!--
[종료 목표 03:50]

시간: 20초

세션 흐름은 최대한 단순하게 설정.
한 명이 방 생성, 다른 한 명은 코드로 참가. 서로 다른 역할 선택 후 시작 가능.
현재 단계에서는 매치메이킹보다 역할 분리 협동 검증이 더 중요.
-->


---
layout: default
class: prag-roles prag-player-slide
---

# 플레이어 기획: Hugh

<div class="prag-player-layout single-role">
  <div class="prag-player-hugh-stack">
    <img class="prag-img" src="./images/slide-12-hugh-player-character-front.png" />
    <img class="prag-img" src="./images/slide-12-hugh-player-character-side.png" />
  </div>
  <div class="prag-card prag-player-hugh-card">
    <div class="prag-role-title">
      <h3>Hugh</h3>
      <span>이동 / 전투 / 생존</span>
    </div>
    <ul class="prag-list">
      <li>맵 이동, 점프, 회피, 부스터 게이지 관리</li>
      <li>적 조준과 사격, 무기 운용</li>
      <li>회복 아이템 사용과 전투 위치 판단</li>
      <li>해킹 결과를 보고 공격 타이밍 결정</li>
    </ul>
  </div>
  <div class="prag-card prag-player-summary">
    <h3>플레이 감각</h3>
    <p>Hugh 플레이어는 눈앞의 위협을 직접 해결. Diana의 해킹이 성공할 때까지 생존하고, 약점이 열리는 순간 공격 집중.</p>
  </div>
</div>

<!--
[종료 목표 04:10]

시간: 20초

Hugh는 관객이 가장 쉽게 이해할 수 있는 액션 담당.
이동, 회피, 조준, 공격 담당.
혼자 모든 걸 해결하는 캐릭터가 아니라, Diana가 해킹으로 만든 타이밍에 공격을 집중하는 역할.
-->


---
layout: default
class: prag-roles prag-player-slide
---

# 플레이어 기획: Diana

<div class="prag-player-layout single-role diana-focus">
  <img class="prag-img prag-img-contain prag-player-diana" src="./images/slide-13-diana-player-character.png" />
  <div class="prag-card prag-player-diana-card">
    <div class="prag-role-title">
      <h3>Diana</h3>
      <span>해킹 / 정화 / 지원</span>
    </div>
    <ul class="prag-list">
      <li>적 해킹 대상 지정과 퍼즐 조작</li>
      <li>오염된 적 정화, 방어 해제, 약점 노출 지원</li>
      <li>필드 기계 상호작용과 스캔</li>
      <li>오버드라이브 게이지 관리</li>
    </ul>
  </div>
  <div class="prag-card prag-player-summary">
    <h3>플레이 감각</h3>
    <p>Diana 플레이어는 직접 사격하지 않는 대신, 적과 장치의 상태를 바꾸어 전투 조건 생성. 퍼즐 성공이 곧 팀의 공격 기회.</p>
  </div>
</div>

<!--
[종료 목표 04:30]

시간: 20초

Diana는 직접 사격하지 않는 대신 전투 조건을 바꾸는 플레이어.
적을 해킹하거나 장치를 조작해서 Hugh가 공격할 수 있는 창을 열어주는 역할.
Diana의 재미: “내 퍼즐 성공이 팀의 생존과 공격으로 바로 이어진다”는 감각.
-->


---
layout: default
class: prag-core prag-core-image
---

# 핵심 경험: 전투 중 해킹

<div class="prag-core-image-layout">
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-14-core-experience-combat-hacking-ui.jpg" />
    <figcaption>한 화면 안에서 Hugh의 조준, Diana의 해킹 퍼즐, 적 약점 노출을 동시에 확인.</figcaption>
  </figure>
  <div class="prag-core-notes">
    <div class="prag-card">
      <h3>Hugh</h3>
      <p>전장을 버티며 조준과 사격 타이밍 담당.</p>
    </div>
    <div class="prag-card">
      <h3>Diana</h3>
      <p>해킹 퍼즐을 풀어 방어 해제와 공격 조건 생성.</p>
    </div>
    <div class="prag-card">
      <h3>협동 판정</h3>
      <p>두 행동이 겹치는 순간 적 처리 속도와 생존 가능성 상승.</p>
    </div>
  </div>
</div>

<!--
[종료 목표 04:55]

시간: 25초

이 장면이 만들고 싶은 핵심 경험을 가장 잘 보여주는 예시.
Hugh는 눈앞의 적을 상대하고, Diana는 해킹 UI를 통해 적 상태 변경.
두 행동이 동시에 맞아떨어질 때 전투가 쉬워지는 구조가 Pragmata의 중심.
-->


---
layout: default
class: prag-conditions
---

# 게임 오버 / 클리어 조건

<div class="prag-grid-2">
  <div class="prag-card">
    <h3>게임 오버</h3>
    <ul class="prag-list">
      <li>공유 HP가 0이 되면 플레이어 사망</li>
      <li>마지막 체크포인트에서 재시작</li>
      <li>체크포인트 이후 획득한 아이템과 진행 상태는 보존</li>
      <li>실패 부담은 낮추되 체크포인트 위치로 긴장감 조절</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>게임 클리어</h3>
    <ul class="prag-list">
      <li>최종 보스 처치 시 클리어</li>
      <li>Hugh의 공격 타이밍과 Diana의 해킹 성공이 모두 필요</li>
      <li>보스전 직전 체크포인트로 재도전 흐름 확보</li>
      <li>무기 튜토리얼은 보스 전보다 앞선 구간에서 학습</li>
    </ul>
  </div>
</div>

<!--
[종료 목표 05:15]

시간: 20초

실패와 클리어 조건은 단순하게 설계.
HP는 공유해 한 명만 따로 살아남는 느낌을 줄이고, 실패 시 마지막 체크포인트에서 재시작.
클리어 조건은 최종 보스 처치이며, 여기서도 Hugh의 공격과 Diana의 해킹이 모두 필요하도록 설계.
-->


---
layout: default
class: prag-level-enemies
---

# 레벨 디자인: 적 구성

<div class="prag-difficulty-rail">
  <span>기본 패턴 학습</span>
  <span>전투 압박 증가</span>
  <span>변칙 대응 요구</span>
  <span>최종 협동 시험</span>
</div>

<div class="prag-enemy-groups">
  <div class="prag-enemy-group normal">
    <div class="prag-enemy-heading">
      <span>1</span>
      <h3>일반 몬스터</h3>
    </div>
    <div class="prag-enemy-group-row">
      <div class="prag-card prag-enemy-card">
        <img class="prag-img prag-img-contain" src="./images/slide-16-enemy-walker.png" />
        <div class="prag-enemy-name">워커 (Walker)</div>
      </div>
      <div class="prag-card prag-enemy-card">
        <img class="prag-img prag-img-contain" src="./images/slide-16-enemy-watcher.png" />
        <div class="prag-enemy-name">워쳐 (Watcher)</div>
      </div>
    </div>
  </div>

  <div class="prag-enemy-group elite">
    <div class="prag-enemy-heading">
      <span>2</span>
      <h3>엘리트 몬스터</h3>
    </div>
    <div class="prag-enemy-group-row single">
      <div class="prag-card prag-enemy-card">
        <img class="prag-img prag-img-contain" src="./images/slide-16-enemy-executor.png" />
        <div class="prag-enemy-name">익시큐터 (Executor)</div>
      </div>
    </div>
  </div>

  <div class="prag-enemy-group tainted">
    <div class="prag-enemy-heading">
      <span>3</span>
      <h3>오염 변종</h3>
    </div>
    <div class="prag-enemy-group-row">
      <div class="prag-card prag-enemy-card">
        <img class="prag-img prag-img-contain" src="./images/slide-16-enemy-tainted-walker.png" />
        <div class="prag-enemy-name">오염된 워커</div>
      </div>
      <div class="prag-card prag-enemy-card">
        <img class="prag-img prag-img-contain" src="./images/slide-16-enemy-tainted-executor.png" />
        <div class="prag-enemy-name">오염된 익시큐터</div>
      </div>
    </div>
  </div>

  <div class="prag-enemy-group boss">
    <div class="prag-enemy-heading">
      <span>4</span>
      <h3>보스</h3>
    </div>
    <div class="prag-enemy-group-row single">
      <div class="prag-card prag-enemy-card">
        <img class="prag-img prag-img-contain" src="./images/slide-16-enemy-sentinel-boss.png" />
        <div class="prag-enemy-name">센티넬 (Sentinel)</div>
      </div>
    </div>
  </div>
</div>

<!--
[종료 목표 05:40]

시간: 25초

적 구성은 난이도 상승을 눈으로 이해할 수 있게 배치.
처음에는 워커와 워쳐로 기본 패턴 학습, 익시큐터와 오염 변종으로 압박 상승.
마지막 센티넬은 두 역할이 제대로 협동하는지 확인하는 최종 시험.
-->


---
layout: default
class: prag-map-elements
---

# 레벨 디자인: 맵 구성 요소

<div class="prag-map-columns">
  <div class="prag-card">
    <h3>해킹 요소</h3>
    <p>해킹을 통해 환경 오브젝트를 조작하거나 기믹을 활성화·해제하여 플레이에 활용</p>
    <ul class="prag-compact-list">
      <li>이동 경로 개척, 장애물 제거, 전투 지원</li>
      <li>이동식 바닥 조작</li>
      <li>잠긴 문 개방</li>
      <li>레이저 장치 비활성화</li>
    </ul>
    <div class="prag-map-image-row">
      <img class="prag-img" src="./images/slide-17-map-hack-device.png" />
      <img class="prag-img" src="./images/slide-17-map-hack-obstacle.png" />
    </div>
  </div>
  <div class="prag-card">
    <h3>기믹 요소</h3>
    <p>플레이어의 진행을 방해하거나 특정 행동을 요구하는 환경 요소</p>
    <ul class="prag-compact-list">
      <li>회피, 해킹 등을 통해 극복 가능</li>
      <li>레이저 장애물</li>
      <li>루나 필라멘트 장애물</li>
      <li>데드 필라멘트 오염 지형, 구역 봉쇄 기믹</li>
    </ul>
    <div class="prag-map-image-row">
      <img class="prag-img" src="./images/slide-17-map-laser-trap.png" />
      <img class="prag-img" src="./images/slide-17-map-dead-filament-floor.png" />
    </div>
  </div>
</div>

<!--
[종료 목표 06:05]

시간: 25초

맵 안의 요소는 크게 해킹 요소와 기믹 요소로 구분.
해킹 요소는 Diana가 길을 열거나 전투를 돕는 장치, 기믹 요소는 플레이어가 회피하거나 해킹으로 극복해야 하는 장애물.
이 구조를 통해 Diana의 역할을 전투 밖에서도 유지.
-->


---
layout: default
class: prag-map-rewards
---

# 레벨 디자인: 보상과 휴식 구간

<div class="prag-map-columns">
  <div class="prag-card">
    <h3>파밍 요소 및 보상</h3>
    <ul class="prag-compact-list">
      <li>강화 재화 획득: 적 처치, 보물상자</li>
      <li>신규 스킬 획득: 다이애나 전용</li>
      <li>무기 파밍: 휴 전용</li>
      <li>해킹 노드 파밍: 다이애나 전용</li>
    </ul>
    <div class="prag-reward-images four">
      <img class="prag-img" src="./images/slide-18-reward-supply-box.png" />
      <img class="prag-img prag-img-contain" src="./images/slide-18-reward-dropped-weapon.png" />
      <img class="prag-img prag-img-contain" src="./images/slide-18-reward-dropped-hack-node.png" />
      <img class="prag-img prag-img-contain" src="./images/slide-18-reward-health-recovery-item.png" />
    </div>
  </div>
  <div class="prag-card">
    <h3>휴식 구간: 체크포인트</h3>
    <ul class="prag-compact-list">
      <li>플레이어 스탯 회복</li>
      <li>플레이어 정비, 풀무장</li>
      <li>강화요소 상점</li>
      <li>힐링 감상 요소</li>
    </ul>
    <div class="prag-reward-images two">
      <img class="prag-img" src="./images/slide-18-rest-area-diana-camp.png" />
      <img class="prag-img" src="./images/slide-18-rest-area-checkpoint.png" />
    </div>
  </div>
</div>

<!--
[종료 목표 06:25]

시간: 20초

보상과 체크포인트는 실패 후 다시 도전할 이유 제공.
Hugh에게는 무기, Diana에게는 해킹 노드처럼 역할별 보상을 분리해 각자 성장하는 느낌 제공.
체크포인트는 긴장을 풀고 다음 구역을 준비하는 짧은 쉼표로 사용.
-->


---
layout: default
class: prag-level-method
---

# 레벨 디자인: 난이도 산정 기준

<div class="prag-grid-2">
  <div class="prag-card">
    <h3>전투 항목</h3>
    <p>전투 단위는 몬스터 종류, 오염 여부, 등장 수, 보스전 여부에 따라 난이도를 점수화</p>
    <img class="prag-img prag-img-contain mt-3" src="./images/slide-19-difficulty-combat-score-table.png" />
  </div>
  <div class="prag-card">
    <h3>기타 항목</h3>
    <p>휴식, 보상, 해킹, 방해 요소를 별도 점수로 두어 전투 사이의 리듬을 조절</p>
    <img class="prag-img prag-img-contain mt-3" src="./images/slide-19-difficulty-noncombat-score-table.png" />
  </div>
</div>

<p class="prag-mini mt-4">높은 난이도의 항목 이후에는 낮은 난이도 항목을 배치해 과열 방지.</p>

<!--
[종료 목표 06:50]

시간: 25초

이 구간은 사실상 튜토리얼에 가까운 초반부.
플레이어가 이동, 전투, 해킹, 보상 구조를 배워야 하는 단계. 처음부터 압박이 높으면 배우는 과정 자체가 답답하게 느껴질 수 있음.
특히 아직 익숙하지 않은 상태에서 스트레스 난이도까지 높아지면, 플레이어가 재미를 느끼기 전에 게임을 그만둘 수 있다고 판단.
초반 난이도는 원작의 낮은 곡선을 크게 해치지 않는 방향으로 유지. 전투와 휴식, 보상 요소를 따로 점수화해 과열되지 않게 배치.
-->


---
layout: default
clicks: 1
class: prag-level-flow
---

# 레벨 디자인: 플레이 흐름 분석

<div class="prag-before-after-grid">
  <figure class="prag-before-after-slot">
    <h3>난이도 표</h3>
    <div class="prag-before-after-stage">
      <img v-click.fade.hide="1" class="prag-img prag-img-contain" src="./images/slide-20-flow-before-difficulty-table.png" />
      <img v-click.fade="1" class="prag-img prag-img-contain" src="./images/slide-20-flow-after-difficulty-table.png" />
    </div>
    <figcaption>
      <span v-click.fade.hide="1">조정 전: 초반부터 스트레스 곡선이 높게 올라가는 구성</span>
      <span v-click.fade="1">조정 후: 초반 학습 구간을 낮게 유지하고 후반으로 갈수록 상승</span>
    </figcaption>
  </figure>
  <figure class="prag-before-after-slot">
    <h3>플레이 흐름 그래프</h3>
    <div class="prag-before-after-stage">
      <img v-click.fade.hide="1" class="prag-img prag-img-contain" src="./images/slide-20-flow-before-pressure-graph.png" />
      <img v-click.fade="1" class="prag-img prag-img-contain" src="./images/slide-20-flow-after-pressure-graph.png" />
    </div>
    <figcaption>
      <span v-click.fade.hide="1">조정 전: 튜토리얼 구간의 압박이 빠르게 높아지는 흐름</span>
      <span v-click.fade="1">조정 후: 원작의 낮은 초반 곡선을 유지하면서 완만히 상승</span>
    </figcaption>
  </figure>
</div>

<!--
[종료 목표 07:10]

시간: 20초

조정 전과 조정 후를 같은 자리에서 바꿔 보여주며, 난이도 곡선을 낮춘 이유 설명.
초반은 플레이어가 시스템을 배우는 단계. 곡선이 빨리 치솟으면 배움보다 짜증과 답답함이 먼저 올 수 있음.
원작의 낮은 초반 곡선은 유지하되, 플레이어가 숙달되는 구간에서는 지루해지지 않도록 난이도가 계속 올라가게 설계.
핵심: 초반 스트레스는 낮추고, 뒤로 갈수록 완만하지만 분명하게 상승하는 흐름.
-->


---
layout: default
class: prag-map-plan-slide
---

# 레벨 디자인: 맵 구성

<div class="prag-map-plan">
  <div class="prag-card">
    <h3>맵 설계 방향</h3>
    <ul class="prag-compact-list">
      <li>태양광 발전소 맵을 기반으로 선형 진행 구성</li>
      <li>체크포인트 3개를 전투 난이도와 보상 지점 사이에 배치</li>
      <li>평면 이동만이 아니라 위·아래·우회 경로를 섞어 탐험감 확보</li>
    </ul>
  </div>
  <img class="prag-img prag-map-main" src="./images/slide-21-level-map-main-route.png" />
</div>

<img class="prag-img prag-map-strip" src="./images/slide-21-level-map-detail-strip.png" />

<!--
[종료 목표 07:35]

시간: 25초

맵은 태양광 발전소 기반의 선형 진행.
일직선 진행은 피하고, 위아래 이동과 우회 경로를 섞어 탐험감 부여.
다만 전체 범위는 한 개 스테이지로 제한해 완성 가능성 확보.
-->


---
layout: default
class: prag-tech
---

# 기술적 접근 방식

<div class="prag-tech-grid">
  <div class="prag-card">
    <h3>엔진 / 네트워크</h3>
    <ul class="prag-compact-list">
      <li>Unreal Engine 5</li>
      <li>2인 Listen Server</li>
      <li>호스트 / 참가 흐름을 최소 구현 범위로 제한</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>플레이어 시스템</h3>
    <ul class="prag-compact-list">
      <li>Hugh: 이동, 조준, 무기, HP</li>
      <li>Diana: 해킹 UI, 퍼즐 결과, 지원 행동</li>
      <li>공유 상태: HP, 체크포인트, 진행도</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>전투 / 해킹 연동</h3>
    <ul class="prag-compact-list">
      <li>적 상태: 기본, 보호막, 약점 노출, 오염</li>
      <li>해킹 성공 시 공격 가능 창 생성</li>
      <li>보스는 페이즈별 패턴과 해킹 조건 확장</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>범위 제어</h3>
    <ul class="prag-compact-list">
      <li>멀티플레이 인원은 2명으로 고정</li>
      <li>맵은 한 개의 선형 스테이지로 제한</li>
      <li>추가 기능은 핵심 루프 구현 이후 적용</li>
    </ul>
  </div>
</div>

<!--
[종료 목표 08:00]

시간: 25초

기술 기준: UE5의 2인 Listen Server.
복잡한 온라인 서비스보다 호스트와 참가 흐름에 집중하고, 플레이어 시스템과 전투 상태를 먼저 안정화.
범위를 줄여 네트워크 리스크를 관리하면서 협동 재미 검증.
-->


---
layout: default
class: prag-collab
---

# 협업 방식

<div class="prag-collab-grid">
  <div class="prag-card">
    <h3>커뮤니케이션</h3>
    <p>일일 진행 공유, 막힌 지점 즉시 공유, 기능 단위 결과물 시연을 기본 원칙으로 운영.</p>
  </div>
  <div class="prag-card">
    <h3>문서화</h3>
    <p>Notion에 기획, 레벨 구성, 담당별 진행 상황, 회의 내용을 정리하고 발표 자료와 연결.</p>
  </div>
  <div class="prag-card">
    <h3>일정 관리</h3>
    <p>멘토링 전 시연 가능 구간, 베타 전 핵심 기능 완료, 최종 전 폴리싱으로 단계 구분.</p>
  </div>
  <div class="prag-card">
    <h3>Git 규칙</h3>
    <p>담당 기능별 브랜치 작업, 기능 완료 후 통합, 충돌 가능성이 큰 파일은 사전 공유.</p>
  </div>
</div>

<!--
[종료 목표 08:20]

시간: 20초

협업은 매일 짧게 공유하고, 막힌 부분은 바로 알리는 방식으로 운영.
Notion에는 기획과 레벨 구성, 담당별 진행 상황 기록. Git은 기능 단위 브랜치로 관리.
핵심은 누가 어떤 루프를 책임지는지 계속 보이게 만드는 것.
-->


---
layout: default
class: prag-duties
---

# 팀원별 역할 분담

| 팀원 | 담당 | 기획상 책임 |
| --- | --- | --- |
| 정호진 | Diana 플레이어, 애니메이션, 퍼즐 로직, 프로젝트 보조 툴 개발 | 해킹 재미와 지원 플레이 성립 |
| 박준현 | Hugh 플레이어, 워커 몬스터 | 기본 전투 조작과 첫 교전 완성 |
| 안지성 | 레벨 디자인, 익시큐터 몬스터, 플레이어 무기 | 난이도 흐름과 전투 확장 |
| 안민원 | 맵, 보스 | 스테이지 구조와 최종 클리어 경험 |
| 윤제영 | UI | 전투 / 해킹 상태 전달과 조작 피드백 |

<p class="prag-mini mt-4">각 담당 영역은 최종 필수 요소와 직접 연결되도록 관리. 여유 기능은 필수 구현 안정화 뒤 추가.</p>

<!--
[종료 목표 08:45]

시간: 25초

역할 분담은 단순한 이름 배분이 아니라 게임 루프의 책임 단위로 구분.
Diana, Hugh, 적, 맵, UI가 각각 핵심 경험의 한 부분 담당.
한 기능이 늦어졌을 때 어떤 플레이 경험이 영향을 받는지도 바로 확인 가능.
-->


---
layout: default
class: prag-progress-guide
---

# 진행 현황 작성 방식

<div class="prag-status-guide">
  <div>
    <h3>완료</h3>
    <ul class="prag-list">
      <li>이미 구현되어 시연 가능한 기능</li>
      <li>머지된 작업</li>
      <li>확인된 결과</li>
    </ul>
  </div>
  <div>
    <h3>진행 중</h3>
    <ul class="prag-list">
      <li>현재 작업 중인 기능</li>
      <li>막힌 지점</li>
      <li>다음에 연결될 작업</li>
    </ul>
  </div>
  <div>
    <h3>다음 목표</h3>
    <ul class="prag-list">
      <li>발표 이후 바로 진행할 작업</li>
      <li>필요한 도움</li>
      <li>리스크와 대응 계획</li>
    </ul>
  </div>
</div>

<div class="prag-card mt-4">
  <h3>입력 기준</h3>
  <p>각자 담당 기능이 게임 루프에서 어떤 역할을 하는지, 현재 시연 가능한 수준이 어디까지인지 중심으로 정리.</p>
</div>

<!--
[종료 목표 09:05]

시간: 20초

이후 개인별 진행 현황은 읽기 위한 페이지라기보다, 발표자가 현재 상태를 빠르게 말하기 위한 템플릿.
완료, 진행 중, 다음 목표로만 나누어 듣는 사람이 “지금 어디까지 왔는지” 바로 따라오게 구성.
-->


---
layout: default
class: prag-progress-member prag-jhj-summary
---

# 정호진 진행 현황

<div class="prag-jhj-progress">
  <div class="prag-card">
    <h3>🎮 담당</h3>
    <ul class="prag-compact-list">
      <li>Diana 플레이어</li>
      <li>에셋 / 애니메이션 파이프라인</li>
      <li>서버 로직</li>
      <li>AI 워크플로</li>
      <li>발표</li>
      <li>RE 엔진 에셋 자동 추출 도구</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>🛠️ 진행 중</h3>
    <ul class="prag-compact-list">
      <li>Diana 플레이어 ABP IK</li>
      <li>서버 로직</li>
      <li>AI 워크플로 연동</li>
      <li>애니메이션 문제 일괄 정리</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>✅ 완료</h3>
    <ul class="prag-compact-list">
      <li>캐릭터 메시 / 텍스처 / 애니메이션 임포트</li>
      <li>RE 엔진 에셋 자동 추출 도구</li>
    </ul>
  </div>
</div>

<!--
[종료 목표 09:40]

시간: 35초

제 담당 범위: Diana 플레이어, 애니메이션, 서버, AI 워크플로, 발표, RE 엔진 에셋 자동 추출 도구.
완료: 캐릭터 에셋 임포트와 추출 도구. 진행 중: Diana ABP의 IK 조정과 서버 로직.
AI 워크플로는 완료보다 지속 개선 영역으로 관리.
제 파트는 화면에 바로 보이는 캐릭터 결과물과 팀 작업을 돕는 제작 파이프라인이 함께 포함.
이 장에서는 세부 기능을 모두 읽기보다, “캐릭터가 들어오고, 애니메이션 문제가 정리되고, 반복 에셋 작업이 자동화되는 축”으로 먼저 정리.
-->


---
layout: default
class: prag-jhj-extractor
---

# 정호진: RE 엔진 에셋 자동 추출 도구

<div class="prag-extractor-layout">
  <div class="prag-card prag-extractor-copy">
    <h3>문제</h3>
    <ul class="prag-compact-list">
      <li>에셋 추출과 정리가 반복 수작업에 가까움</li>
      <li>맵 스테이지 파일이 수천 개 조각으로 분리되어 있는 것을 발견</li>
      <li>Blender 정리 단계 반복으로 일정 리스크 증가</li>
    </ul>
  </div>
  <div class="prag-extractor-stack">
    <figure class="prag-media-figure">
      <img class="prag-img prag-img-contain" src="./images/slide-27-asset-extractor-stage-pieces.png" />
      <figcaption>스테이지 조각: 수천 개로 분리된 스테이지 에셋</figcaption>
    </figure>
    <div class="prag-card">
      <h3>목표</h3>
      <p>RE 엔진 원본 파일에서 <b>Blender를 거치지 않고</b> Unreal용 FBX를 직접 추출</p>
    </div>
  </div>
</div>

<!--
[종료 목표 10:25]

시간: 45초

제가 만든 추출 도구는 단순 편의 기능이 아니라 제작 시간을 줄이기 위한 핵심 도구.
캐릭터 하나를 스켈레톤과 애니메이션까지 추출하면 몇 시간 소요. 작은 오브젝트도 Blender에서 스케일과 회전 정리 필요.
특히 스테이지가 수천 조각으로 나뉘어 있어, 수작업 방식은 일정 안에 감당하기 어려운 상황.
따라서 Blender를 거치지 않고 Unreal에서 바로 사용할 수 있는 FBX로 추출하는 자동화 필요.
중요한 지점: “한 번 오래 걸리는 작업”이 아니라 “작업할 때마다 계속 반복되는 병목”.
에셋을 새로 뽑거나 수정할 때마다 같은 정리 과정을 반복하면, 구현보다 준비 작업에 시간이 더 많이 쓰일 수 있음.
목표는 단순 변환기가 아니라, Unreal로 바로 가져갈 수 있는 상태까지 최대한 자동으로 맞추는 흐름.
-->


---
layout: default
class: prag-jhj-extractor-result
---

# 정호진: 자동 추출 도구 개발 결과

<div class="prag-extractor-result">
  <div class="prag-card">
    <h3>개발 결과</h3>
    <p>Blender를 거치지 않고 필요한 에셋을 일괄 추출하는 흐름 구축.</p>
    <ul class="prag-compact-list">
      <li>메시 / 스켈레톤 / 애니메이션 추출 자동화</li>
      <li>스케일 / 회전 정리 부담 감소</li>
      <li>절약 시간: 며칠에서 1주 이상의 시간을 절약</li>
    </ul>
  </div>
  <figure class="prag-media-figure">
    <img class="prag-img prag-img-contain" src="./images/slide-28-asset-extractor-tool-screenshot.png" />
    <figcaption>추출 도구: 실행 화면</figcaption>
  </figure>
  <figure class="prag-media-figure">
    <img class="prag-img prag-img-contain" src="./images/slide-28-asset-extractor-blender-result.png" />
    <figcaption>추출 결과: Blender 없이 추출된 에셋</figcaption>
  </figure>
</div>

<!--
[종료 목표 11:05]

시간: 40초

결과적으로 필요한 에셋을 Blender 없이 추출할 수 있는 흐름 구축.
도구 제작 과정에서 시행착오는 있었지만, 흐름이 잡힌 뒤 반복 작업을 크게 절감.
이 부분은 단순히 멋진 도구 제작보다, 팀 전체의 에셋 준비 시간을 며칠에서 몇 주까지 줄일 수 있었던 점이 중요.
왼쪽은 결과 요약, 가운데와 오른쪽은 실제 툴 화면과 추출 결과.
핵심은 에셋 수정 때마다 Blender를 열어 수작업으로 정리하지 않아도 되는 흐름을 만든 점.
덕분에 스테이지처럼 조각 수가 많은 에셋도 한 번에 처리 가능했고, 이후 임포트 검증에 더 많은 시간 확보.
-->


---
layout: default
class: prag-jhj-import-result
---

# 정호진: Hugh / Diana 에셋 임포트 결과

<div class="prag-asset-result-grid">
  <figure class="prag-media-figure">
    <div class="prag-pdf-safe-image prag-import-result-image prag-import-hugh"></div>
    <figcaption>Hugh 임포트: 메시 / 텍스처 / 애니메이션 적용 결과</figcaption>
  </figure>
  <figure class="prag-media-figure">
    <div class="prag-pdf-safe-image prag-import-result-image prag-import-diana"></div>
    <figcaption>Diana 임포트: 메시 / 텍스처 / 애니메이션 적용 결과</figcaption>
  </figure>
</div>

<!--
[종료 목표 11:40]

시간: 35초

제가 임포트한 결과 이미지를 보여주는 슬라이드.
핵심은 Hugh와 Diana가 Unreal 안에서 메시, 텍스처, 애니메이션까지 들어온 상태.
캡처가 들어가면 “원본 에셋을 실제 플레이어 캐릭터로 사용할 준비가 된 상태”를 짧게 설명.
Hugh와 Diana는 이후 팀원들이 플레이어, 애니메이션, 전투 쪽 작업을 이어갈 기준 에셋.
여기서는 단순히 모델을 띄운 것보다, 텍스처와 애니메이션까지 연결되어 다음 구현자가 바로 사용할 수 있는 형태로 준비한 의미가 큼.
-->


---
layout: default
class: prag-jhj-ik
---

# 정호진: 애니메이션 IK 조정 필요성

<div class="prag-ik-compare">
  <figure class="prag-media-figure">
    <img class="prag-img prag-img-contain" src="./images/slide-30-ik-comparison-original-reference.gif" />
    <figcaption>원작: IK / 발 위치 / 상체 움직임</figcaption>
  </figure>
  <figure class="prag-media-figure">
    <img class="prag-img prag-img-contain" src="./images/slide-30-ik-comparison-current-build.gif" />
    <figcaption>개발 빌드: IK 조정 필요 지점</figcaption>
  </figure>
</div>

<p class="prag-mini mt-4">현재 이슈: root bone axis 등 분산된 애니메이션 문제를 한 번에 정리하는 중</p>

<!--
[종료 목표 12:20]

시간: 40초

애니메이션 IK는 말로 설명하기보다 원작과 현재 빌드를 나란히 보여주는 것이 가장 빠름.
원작에서는 발 위치나 상체 움직임이 자연스럽지만, 개발 빌드에서는 root bone axis 같은 문제로 일부 애니메이션이 어긋날 수 있음.
문제가 여러 애니메이션에 흩어져 있어, 하나씩 고치기보다 원인을 정리해 한 번에 해결하는 방향으로 진행 중.
애니메이션 문제는 겉으로 보면 “동작이 이상하다”로 보이지만, 실제 원인은 skeleton, root bone, retargeting 설정처럼 여러 단계에 걸쳐 있을 수 있음.
개별 애니메이션을 임시로 맞추기보다, 같은 원인에서 나온 문제들을 묶어서 정리하는 쪽이 더 안정적.
이 비교 GIF를 통해 IK 조정 필요성을 관객에게 더 직관적으로 전달 가능.
-->


---
layout: default
class: prag-progress-member prag-pjh-summary
---

# 박준현 진행 현황

<div class="prag-member-summary">
  <div class="prag-card">
    <h3>🎮 담당</h3>
    <ul class="prag-compact-list">
      <li>Hugh 이동 / 전투</li>
      <li>허리 로봇 팔 애니메이션</li>
      <li>권총 에셋 / 무기 애니메이션</li>
      <li>Walker / Watcher 행동 트리</li>
      <li>적-플레이어 스탯 관리</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>🛠️ 진행 중</h3>
    <ul class="prag-compact-list">
      <li>Hugh 사격</li>
      <li>Hugh 회피</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>✅ 완료</h3>
    <ul class="prag-compact-list">
      <li>Hugh 이동 / 조준</li>
      <li>허리 로봇 팔 애니메이션</li>
      <li>기본 권총 임포트</li>
      <li>무기 애니메이션</li>
    </ul>
  </div>
</div>

<!--
[종료 목표 12:55]

시간: 35초

박준현님 담당: Hugh의 이동, 조준, 전투 입력.
현재 사격과 회피 작업 중. 이동과 조준, 허리 로봇 팔 애니메이션, 기본 권총 에셋과 무기 애니메이션은 완료.
이 파트는 플레이어가 실제로 손에 쥐는 감각을 만드는 영역이며, 이후 전투 검증의 기준점.
추가로 Walker와 Watcher 적의 행동 트리, 적과 플레이어 사이의 스탯 관리도 담당 범위.
이번 진행 공유에서는 Hugh의 조작감과 애니메이션 결과를 중심으로 보여주고, 적 로직은 이후 전투 루프가 붙을 때 더 자세히 설명하는 흐름이 자연스러움.
-->


---
layout: default
class: prag-pjh-movement
---

# 박준현: Hugh 이동 / 조준

<div class="prag-pjh-movement-grid">
  <figure class="prag-media-figure">
    <img class="prag-img prag-img-contain" src="./images/slide-32-hugh-movement-walk.gif" />
    <figcaption>걷기: 기본 이동</figcaption>
  </figure>
  <figure class="prag-media-figure">
    <img class="prag-img prag-img-contain" src="./images/slide-32-hugh-movement-run.gif" />
    <figcaption>달리기: 빠른 이동</figcaption>
  </figure>
  <figure class="prag-media-figure">
    <img class="prag-img prag-img-contain" src="./images/slide-32-hugh-movement-jump.gif" />
    <figcaption>점프: 기본 점프 동작</figcaption>
  </figure>
  <figure class="prag-media-figure">
    <img class="prag-img prag-img-contain" src="./images/slide-32-hugh-movement-hover.gif" />
    <figcaption>체공: 공중 이동</figcaption>
  </figure>
  <figure class="prag-media-figure">
    <img class="prag-img prag-img-contain" src="./images/slide-32-hugh-movement-aim.gif" />
    <figcaption>조준: 자세 전환</figcaption>
  </figure>
</div>

<!--
[종료 목표 13:35]

시간: 40초

준현님이 먼저 정리한 부분은 Hugh의 기본 이동과 조준.
걷기, 달리기, 점프, 체공, 조준을 짧게 보여주며, Hugh가 이동부터 조준까지 하나의 플레이어 캐릭터처럼 반응하기 시작한 점 설명.
-->


---
layout: default
class: prag-pjh-arm
---

# 박준현: Hugh 허리 로봇 팔 애니메이션

<div class="prag-pjh-arm-layout">
  <figure class="prag-media-figure">
    <img class="prag-img prag-img-contain" src="./images/slide-33-hugh-robot-arm-animation.gif" />
    <figcaption>허리 로봇 팔 애니메이션 동작</figcaption>
  </figure>
  <div class="prag-card">
    <h3>핵심</h3>
    <li>허리의 로봇 팔은 평소에 Hugh의 무기를 수납하는 공간.</li>
    <li>조준 종료 애니메이션과 함께 무기 메시가 로봇 팔로 이동하고, 로봇 팔 수납 애니메이션 재생</li>
    <li>수납 이후에는 로봇 팔의 수납 상태 애니메이션을 반복 재생하여 상태 유지</li>
  </div>
</div>

<!--
[종료 목표 14:10]

시간: 35초

방금 보여드린 Hugh 애니메이션 이외에, 허리의 로봇 팔 또한 있는데요,
로봇 팔은 단순 장식이 아니라 Hugh가 평소에 무기를 수납하는 공간.
조준 중에는 Hugh가 무기를 직접 들고, 조준 종료 직후 로봇 팔이 무기를 가져가 수납.
처음에는 로봇 팔과 Hugh를 하나의 메시로 합쳐 작업했으나, 최종적으로 둘을 분리 처리.
-->


---
layout: default
class: prag-progress-member prag-aj-summary
---

# 안지성 진행 현황

<div class="prag-member-summary">
  <div class="prag-card">
    <h3>🧭 담당</h3>
    <ul class="prag-compact-list">
      <li>레벨 디자인</li>
      <li>Executor 적 에셋 임포트</li>
      <li>Executor 행동 트리</li>
      <li>Hugh 플레이어 추가 무기</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>🛠️ 진행 중</h3>
    <ul class="prag-compact-list">
      <li>Executor 행동 트리</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>✅ 완료</h3>
    <ul class="prag-compact-list">
      <li>레벨 디자인</li>
      <li>Executor 적 에셋 임포트</li>
    </ul>
  </div>
</div>

<!--
[종료 목표 14:35]

시간: 25초

안지성님 담당: 레벨 디자인, Executor 적 관련 작업, Hugh 기본 무기 외 추가 무기.
앞서 발표한 레벨 디자인은 대부분 지성님 작업에 팀 의견을 얹은 결과.
완료: 레벨 디자인과 Executor 에셋 임포트. 진행 중: Executor 행동 트리.
-->


---
layout: default
class: prag-aj-result
---

# 안지성: Executor 임포트

<figure class="prag-executor-showcase">
  <img src="./images/slide-35-unreal-import-executor-result.png" alt="Unreal Engine에 임포트된 Executor" />
  <figcaption>Executor 임포트: 적 메시 / 텍스처 / 애니메이션 적용 결과</figcaption>
</figure>

<!--
[종료 목표 15:05]

시간: 30초

지성님 작업 중 완료된 결과를 보여주는 슬라이드.
왼쪽은 앞서 설명한 레벨 디자인 결과 대표 이미지, 오른쪽은 Executor 적 에셋 임포트 결과.
레벨 디자인이 먼저 게임의 동선과 전투 리듬을 만들고, Executor가 그 안에서 추가 압박을 주는 적으로 들어갈 예정이라고 연결.
행동 트리는 아직 진행 중이므로, 여기서는 에셋 준비까지 완료된 상태만 명확히 설명.
-->


---
layout: default
class: prag-progress-member prag-am-summary
---

# 안민원 진행 현황

<div class="prag-member-summary">
  <div class="prag-card">
    <h3>🗺️ 담당</h3>
    <ul class="prag-compact-list">
      <li>맵 에셋 임포트</li>
      <li>맵 빌딩</li>
      <li>Sentinel 보스 행동 트리</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>🛠️ 진행 중</h3>
    <ul class="prag-compact-list">
      <li>맵 빌딩</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>✅ 완료</h3>
    <ul class="prag-compact-list">
      <li>맵 에셋 임포트</li>
    </ul>
  </div>
</div>

<!--
[종료 목표 15:25]

시간: 20초

안민원님 담당: 맵 에셋 임포트와 맵 빌딩.
현재 맵 에셋 임포트 완료. 실제 플레이 공간으로 조립하는 맵 빌딩은 진행 중.
다음 몇 장은 별도 설명 없이 가져온 맵 에셋 결과를 빠르게 확인.
-->


---
layout: default
class: prag-single-image-slide
---

# 안민원: 가져온 맵 에셋 1

<img class="prag-img prag-single-image prag-img-contain" src="./images/slide-37-map-asset-import-01.png" />

<!--
[종료 목표 15:25]

-->
---
layout: default
class: prag-single-image-slide
---

# 안민원: 가져온 맵 에셋 2

<img class="prag-img prag-single-image prag-img-contain" src="./images/slide-38-map-asset-import-02.png" />

<!--
[종료 목표 15:25]

-->
---
layout: default
class: prag-single-image-slide
---

# 안민원: 가져온 맵 에셋 3

<img class="prag-img prag-single-image prag-img-contain" src="./images/slide-39-map-asset-import-03.png" />

<!--
[종료 목표 15:25]

-->
---
layout: default
class: prag-single-image-slide
---

# 안민원: 가져온 맵 에셋 4

<img class="prag-img prag-single-image prag-img-contain" src="./images/slide-40-map-asset-import-04.png" />

<!--
[종료 목표 15:25]

-->
---
layout: default
class: prag-single-image-slide
---

# 안민원: 가져온 맵 에셋 5

<img class="prag-img prag-single-image prag-img-contain" src="./images/slide-41-map-asset-import-05.png" />

<!--
[종료 목표 15:25]

-->
---
layout: default
class: prag-progress-member prag-yj-summary
---

# 윤제영 진행 현황

<div class="prag-member-summary">
  <div class="prag-card">
    <h3>🖥️ 담당</h3>
    <ul class="prag-compact-list">
      <li>UI 작업</li>
      <li>전투 / 해킹 피드백</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>✅ 완료</h3>
    <ul class="prag-compact-list">
      <li>Diana 해킹 배경</li>
      <li>Diana 오버드라이브 게이지</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>🎯 역할</h3>
    <ul class="prag-compact-list">
      <li>Diana 상태 전달</li>
      <li>해킹 / 오버드라이브 피드백</li>
    </ul>
  </div>
</div>

<!--
[종료 목표 15:45]

시간: 20초

윤제영님은 UI 작업에 집중.
현재 완료된 UI: Diana 해킹 배경과 Diana 오버드라이브 게이지.
이 프로젝트에서 UI는 단순 장식이 아니라, Hugh와 Diana의 협동 상태를 관객과 플레이어에게 전달하는 역할.
-->


---
layout: default
class: prag-single-image-slide
---

# 윤제영: Diana 해킹 배경

<figure class="prag-media-figure prag-single-media">
  <img class="prag-img prag-single-image prag-img-contain" src="./images/slide-43-diana-hacking-background-ui.gif" />
  <figcaption>Diana 해킹 배경: 해킹 UI 분위기와 배경 연출</figcaption>
</figure>

<!--
[종료 목표 15:55]

시간: 10초

이 자료는 Diana 해킹 화면의 분위기와 배경 방향.
해킹을 별도 미니게임처럼 보이게 하되, 전투와 분리되지 않도록 UI 톤을 맞추는 방향.
-->


---
layout: default
class: prag-single-image-slide
---

# 윤제영: Diana 오버드라이브 게이지

<figure class="prag-media-figure prag-single-media">
  <img class="prag-img prag-single-image prag-img-contain" src="./images/slide-44-diana-overdrive-gauge-ui.gif" />
  <figcaption>Diana 오버드라이브 게이지: 지원 가능 상태를 보여주는 UI</figcaption>
</figure>

<!--
[종료 목표 16:05]

시간: 10초

오버드라이브 게이지는 Diana가 언제 강한 지원을 할 수 있는지 보여주는 정보.
요약: “플레이어가 지금 쓸 수 있는 선택지를 한눈에 알게 하는 UI”.
-->


---
layout: default
class: prag-original-video
---

# 원작 예시 영상

<div class="prag-video-layout">
  <iframe
    class="prag-youtube"
    src="https://www.youtube.com/embed/1alpJxkD90g?start=3766"
    title="Pragmata original gameplay example"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
  <a class="prag-video-link" href="https://youtu.be/1alpJxkD90g?t=3766" target="_blank" rel="noreferrer">
    원작 예시: 1:02:46 지점부터 보기
  </a>
</div>

<!--
[종료 목표 16:20]

시간: 15초

이 영상은 원작에서 Hugh의 전투와 Diana의 해킹 지원이 한 흐름 안에서 보이는 예시.
프로젝트 방향: 한 사람이 동시에 판단하던 요소를 두 플레이어의 역할로 나누어 재구성.
-->


---
layout: default
class: prag-schedule
---

# 일정과 리스크 관리

<div class="prag-timeline">
  <div class="prag-card">
    <span>06.19</span>
    <h3>기획 발표</h3>
    <p>주제, 목표, 핵심 기능, 역할, 협업 방식 확정</p>
  </div>
  <div class="prag-card">
    <span>7월 초</span>
    <h3>멘토링</h3>
    <p>접속, 역할 선택, 기본 전투, 해킹 연동 시연 구간 검증</p>
  </div>
  <div class="prag-card">
    <span>07.10</span>
    <h3>베타 발표</h3>
    <p>핵심 기능 대부분 완료, 보스전과 맵 흐름 연결</p>
  </div>
  <div class="prag-card">
    <span>07.14</span>
    <h3>최종 발표</h3>
    <p>안정화, 발표 시연, UI 피드백, 난이도 폴리싱</p>
  </div>
</div>

<div class="prag-card mt-4">
  <h3>주요 리스크</h3>
  <p>네트워크 동기화와 역할 간 의존도가 가장 큰 리스크. 멀티플레이 범위를 2인 Listen Server로 고정하고, 먼저 작은 전투 구간에서 협동 루프 검증.</p>
</div>

<!--
[종료 목표 16:35]

시간: 15초

일정은 기획 발표, 멘토링, 베타, 최종 발표로 구분 관리.
가장 큰 리스크는 네트워크 동기화와 역할 의존도.
멘토링 전에는 작은 전투 구간에서 협동 루프가 실제로 작동하는지 먼저 확인.
-->


---
layout: default
class: prag-extension
---

# 기대 효과와 확장 가능성

<div class="prag-value-grid">
  <div class="prag-card">
    <h3>학습 효과</h3>
    <p>UE5 캐릭터 조작, AI, UI, 네트워크, 레벨 디자인을 하나의 플레이 가능한 결과물 안에서 연결.</p>
  </div>
  <div class="prag-card">
    <h3>포트폴리오 가치</h3>
    <p>단순 기능 구현보다 “역할이 분리된 협동 플레이”라는 설계 의도를 구현 결과로 설명 가능.</p>
  </div>
  <div class="prag-card">
    <h3>콘텐츠 확장</h3>
    <p>적 종류, 해킹 퍼즐 패턴, 보스 페이즈, 무기와 노드 보상 추가로 스테이지 확장 가능.</p>
  </div>
  <div class="prag-card">
    <h3>서비스 가능성</h3>
    <p>짧은 협동 미션 단위로 확장 시 온라인 협동 퍼즐 액션 데모 또는 팀 프로젝트 쇼케이스로 활용 가능.</p>
  </div>
</div>

<!--
[종료 목표 16:50]

시간: 15초

기대 효과는 학습과 포트폴리오 두 가지.
UE5의 여러 시스템을 하나의 플레이 가능한 결과물로 연결하고, “역할이 분리된 협동 플레이”라는 설계 의도를 결과로 제시 가능.
이후 적, 퍼즐, 보스 페이즈를 늘려 콘텐츠 확장 가능.
-->


---
layout: cover
class: prag-cover prag-close
---

<p class="prag-eyebrow">팀 다이애나</p>

# <span class="prag-title">Q&A</span>

<p class="prag-subtitle">
출시일은 7월 14일 화요일!
</p>

<!--
[종료 목표 17:00]

시간: 10초

발표 마무리.
계속 확인할 질문은 한 가지.
개발 기준: 두 명이 함께할 때 더 재미있는가, 그 재미가 실제 구현으로 보이는가.
감사 인사.
-->
