---
theme: apple-basic
title: "Pragmata 2P 베타 발표"
fonts:
  sans: "Pretendard Variable"
  local: "Pretendard Variable"
  provider: none
info: |
  POTENUP 최종 프로젝트 Pragmata 2P 베타 발표 덱.
transition: none
layout: cover
class: prag-cover
---

<img
  src="./images/unreal-capture-title-background-16x9.png"
  alt="Hugh와 Diana가 함께 앉아 있는 실제 타이틀 맵 렌더"
  style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;"
/>
<div style="position: absolute; inset: 0; background: linear-gradient(90deg, rgb(243 244 246 / 0.94) 0%, rgb(243 244 246 / 0.72) 46%, rgb(243 244 246 / 0.08) 100%);"></div>

<div class="prag-cover-copy">
  <p class="prag-eyebrow">POTENUP 최종 프로젝트 베타 발표</p>
  <h1><span class="prag-title">Pragmata 2P</span></h1>
  <p class="prag-subtitle">
    Hugh의 전투와 Diana의 해킹을 두 플레이어에게 분리한 2인 협동 액션 퍼즐 데모
  </p>
  <div class="prag-tags">
    <span class="prag-tag"><b>팀 다이애나</b>: 정호진, 박준현, 안지성, 안민원, 윤제영</span>
    <span class="prag-tag">베타 발표: 2026.07.10</span>
    <span class="prag-tag">프로젝트 기간: 2026.06.17-07.14</span>
  </div>
</div>

<!--
[00:00-00:25]
오늘은 기획 설명을 길게 반복하기보다, 현재 빌드에서 실제로 확인할 수 있는 진행 상황과 시연 흐름을 중심으로 말씀드리겠습니다.
Pragmata 2P는 Hugh의 전투와 Diana의 해킹을 두 플레이어에게 분리한 협동 액션 퍼즐 데모입니다.
-->

---
layout: default
class: prag-beta-focus
---

# 실제 게임과 적용 기술 시연을 중심으로 진행함

<div class="prag-session-flow">
  <div class="prag-session-step"><span>01</span><strong>협동 목표</strong><small>솔로 부담을 역할로 분리</small></div>
  <div class="prag-session-step"><span>02</span><strong>접속과 역할</strong><small>방 코드부터 Pawn까지</small></div>
  <div class="prag-session-step"><span>03</span><strong>권한과 UI</strong><small>서버 상태와 MVVM</small></div>
  <div class="prag-session-step"><span>04</span><strong>핵심 구현</strong><small>사격·해킹·정화</small></div>
  <div class="prag-session-step"><span>05</span><strong>시연 범위</strong><small>베타 완료 구간 확인</small></div>
</div>

<div class="prag-session-evidence">
  <figure class="prag-image-frame prag-session-capture">
    <img class="prag-img" src="./images/slide-02-coop-device.png" alt="Hugh와 Diana가 장치를 함께 바라보는 실제 게임 장면" />
    <figcaption>플레이 장면을 먼저 제시하고, 그 장면을 만든 기술을 이어서 확인.</figcaption>
  </figure>
  <div class="prag-session-facts">
    <div class="prag-card"><h3>발표 방식</h3><p>기능 목록보다 게임 루프 순서로 진행함.</p></div>
    <div class="prag-card"><h3>판단 기준</h3><p>두 화면에서 재현되는 결과만 베타 성과로 제시함.</p></div>
  </div>
</div>

<!--
[00:25-00:55]
발표는 기능 목록을 나열하지 않고, 실제 플레이 장면과 그 장면을 가능하게 한 기술 구조를 함께 설명하는 순서로 진행하겠습니다.
협동 목표와 접속, 서버 권한과 UI, 핵심 gameplay 구현, 마지막 시연과 현재 상태 순서입니다.
-->

---
layout: default
class: prag-feature-scope
---

# 베타 빌드는 접속부터 정화 획득까지 이어짐

<div class="prag-session-flow six">
  <div class="prag-session-step"><span>01</span><strong>세션 접속</strong><small>방 코드로 참가</small></div>
  <div class="prag-session-step"><span>02</span><strong>역할 확정</strong><small>Hugh / Diana 선택</small></div>
  <div class="prag-session-step"><span>03</span><strong>협력 탐사</strong><small>이동 + 장치 해킹</small></div>
  <div class="prag-session-step"><span>04</span><strong>협동 전투</strong><small>해킹 + 약점 사격</small></div>
  <div class="prag-session-step"><span>05</span><strong>분위기 전환</strong><small>오염 기계 등장</small></div>
  <div class="prag-session-step"><span>06</span><strong>정화 획득</strong><small>대응 수단 확보</small></div>
</div>

<div class="prag-session-evidence">
  <figure class="prag-image-frame prag-session-capture">
    <img class="prag-img" src="./images/slide-03-combat-explosion.png" alt="두 플레이어가 전투를 수행하는 실제 게임 장면" />
    <figcaption>접속부터 이 장면까지 중단 없이 이어지는 것이 현재 베타 범위.</figcaption>
  </figure>
  <div class="prag-session-facts">
    <div class="prag-card"><h3>검증됨</h3><p>서버 권한, 상태 동기화, 역할별 UI가 하나의 루프로 연결됨.</p></div>
    <div class="prag-card"><h3>베타 경계</h3><p>정화 획득까지를 실제 빌드의 완료 범위로 제시함.</p></div>
  </div>
</div>

<!--
[00:55-01:25]
현재 빌드에서는 방 코드 접속과 역할 확정부터 협력 탐사, 협동 전투, 오염된 기계의 등장, 정화 스킬 획득까지 하나의 흐름으로 확인할 수 있습니다.
베타의 핵심은 이 기능들이 개별 테스트에 머무르지 않고 두 플레이어의 연속된 플레이 경험으로 연결되었다는 점입니다.
오늘은 정화 획득까지 실제 빌드에서 연속 재현되는 베타 범위만 설명드리겠습니다.
-->

---
layout: default
class: prag-core prag-core-image prag-chaos
---

# 솔로 플레이의 부담을 2인 협동으로 재해석함

<div class="prag-core-image-layout">
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-04-chaos-combat-hacking.png" alt="다수의 적 사이에서 전투와 해킹을 동시에 처리하는 난전" />
    <figcaption>적의 수가 늘어날수록 사격·회피·해킹을 혼자 병행해야 하는 부담이 커짐.</figcaption>
  </figure>
  <div class="prag-core-notes">
    <div class="prag-card">
      <h3>싱글 플레이 부담</h3>
      <p>전투 판단과 퍼즐 입력을 한 플레이어가 동시에 처리.</p>
    </div>
    <div class="prag-card">
      <h3>역할 분리</h3>
      <p>Hugh는 이동·사격·생존, Diana는 시야·해킹·정화 담당.</p>
    </div>
    <div class="prag-card">
      <h3>협동 목표</h3>
      <p>두 플레이어가 서로 다른 정보와 조작으로 같은 전투를 해결.</p>
    </div>
  </div>
</div>

<!--
[01:25-02:00]
기획 의도는 원작을 그대로 따라가는 것이 아니라, Hugh와 Diana의 관계를 실제 2인 협동 구조로 바꾸는 것이었습니다.
원작은 한 플레이어가 사격과 회피, Diana의 해킹 퍼즐까지 함께 처리하는 독특한 구조입니다.
적의 수가 늘어나는 난전에서는 이 동시 처리 부담이 커지므로, Hugh는 이동과 사격과 생존을 담당하고 Diana는 시야와 해킹과 정화를 담당하도록 분리했습니다.
이 프로젝트의 차별점은 원작의 기능을 단순히 복제하는 데 그치지 않고, 해당 부담을 두 플레이어가 협력하는 재미로 전환한 점입니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# 해킹으로 약점을 만들고 사격으로 공략함

<div class="prag-core-image-layout">
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-05-walker-attack.png" alt="Walker를 상대로 공격 패턴과 전투를 확인하는 실제 장면" />
    <figcaption>Hugh의 조준, Diana의 해킹 퍼즐, 적 약점 노출이 같은 전투 상황 안에서 연결.</figcaption>
  </figure>
  <div class="prag-core-notes">
    <div class="prag-card">
      <h3>Hugh의 역할</h3>
      <p>전장을 버티며 해킹으로 노출된 약점을 정확히 조준.</p>
    </div>
    <div class="prag-card">
      <h3>Diana의 역할</h3>
      <p>적을 해킹해 방어를 낮추고 추가 배율이 적용될 약점 노출.</p>
    </div>
    <div class="prag-card">
      <h3>협동 판정</h3>
      <p>Walker·Watcher는 해킹 전 약 0.1배 피해. 해킹 후 약점 명중 시 추가 배율 적용.</p>
    </div>
  </div>
</div>

<!--
[02:00-02:35]
저희가 가장 중요하게 본 장면은 해킹 이후의 약점 사격입니다.
Diana가 퍼즐을 풀면 적의 방어 상태가 바뀌고 약점이 노출되며, Hugh는 Line Trace의 BoneName 판정으로 그 약점을 정확히 맞혀야 합니다.
현재 베타의 Walker는 해킹 전 배율 0.14와 총기 배율 0.76이 함께 적용되어 약 0.106배, Watcher는 0.168과 0.648이 적용되어 약 0.109배 피해를 받습니다.
반면 Executor는 공통 fallback을 사용해 0.2배이므로, 모든 적이 동일한 0.1배라고 설명하지는 않겠습니다.
해킹 상태에서는 이 방어 배율이 해제되고, 등록된 약점 Bone을 맞히면 적별 추가 배율까지 적용됩니다. 현재 설정을 기준으로 Walker 약점은 약 0.98배, Watcher 약점은 약 0.87배, Executor 약점은 1.75배의 최종 총기 배율이 됩니다.
관객이 시연에서 봐야 할 포인트도 바로 이 역할 분리입니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# UE 5.8 기반에서 Listen Server와 MVVM을 결합함

<div class="prag-core-image-layout">
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-06-hugh-hud-dark.png" alt="Hugh HUD가 표시된 실제 게임 장면" />
    <figcaption>Listen Server가 확정한 상태를 역할별 ViewModel이 서로 다른 HUD 표현으로 전달.</figcaption>
  </figure>
  <div class="prag-core-notes">
    <div class="prag-card">
      <h3>Unreal Engine 5.8</h3>
      <p>C++ gameplay와 Editor API 확장을 함께 운용.</p>
    </div>
    <div class="prag-card">
      <h3>Listen Server</h3>
      <p>RoomCode, role handoff, shared state를 서버 권위로 확정.</p>
    </div>
    <div class="prag-card">
      <h3>UE MVVM</h3>
      <p>HP, 회복, OverDrive, 정화 cooldown을 역할별 HUD 값으로 전달.</p>
    </div>
  </div>
</div>

<!--
[02:35-03:15]
기술 스택은 거창한 온라인 서비스보다, 두 사람이 같은 빌드에서 서로 다른 역할로 접속하고 플레이하는 데 맞췄습니다.
Listen Server를 선택한 이유도 이 범위에서는 방 코드와 역할 검증을 빠르게 보여주는 것이 더 중요했기 때문입니다.
Unreal Engine 5.8 업그레이드는 게임 기능뿐 아니라 Editor API를 활용하는 자체 MCP 서버의 기능 범위를 넓히기 위한 선택이기도 했습니다.
-->

---
layout: default
class: prag-project-roadmap
---

# 기획부터 베타 검증과 발표 준비까지 4단계로 진행함

<div class="prag-session-flow four">
  <div class="prag-session-step"><span>06.19</span><strong>기획 발표</strong><small>협동 재해석 범위 확정</small></div>
  <div class="prag-session-step"><span>7월 초</span><strong>기능 통합</strong><small>세션·HUD·전투 연결</small></div>
  <div class="prag-session-step"><span>07.10</span><strong>베타 검증</strong><small>정화까지 연속 플레이</small></div>
  <div class="prag-session-step"><span>07.14</span><strong>발표 준비</strong><small>반복 검증·화면 가독성</small></div>
</div>

<div class="prag-session-evidence prag-roadmap-evidence">
  <figure class="prag-image-frame prag-session-capture">
    <img class="prag-img" src="./images/slide-07-notion-schedule.png" alt="PRAGMATA-2P Notion 일정 보드" />
    <figcaption>Notion 보드에서 시작, 진행 중, 완료 작업의 실제 상태를 확인.</figcaption>
  </figure>
</div>

<!--
[03:15-03:45]
개발 과정은 기획 발표, 기능 통합, 베타 검증, 발표 준비의 네 단계로 진행했습니다.
기획 단계에서 2인 협동 재해석 범위를 확정했고, 7월 초에는 세션과 역할, HUD와 전투 기능을 하나의 플레이 흐름으로 연결했습니다.
베타에서는 접속부터 정화 획득까지 연속 플레이를 확보했으며, 현재는 같은 시연 경로의 반복 재현성과 화면 가독성을 보강하고 있습니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# 자체 MCP 서버로 AI와 Unreal Editor를 연결함

<div class="prag-core-image-layout">
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-08-diana-title-animgraph.png" alt="Unreal Editor에서 Diana 타이틀 애니메이션 그래프를 확인하는 화면" />
    <figcaption>Unreal Editor 작업 화면을 기반으로 반복적인 애니메이션·Blueprint 작업을 AI 보조 흐름에 연결.</figcaption>
  </figure>
  <div class="prag-core-notes">
    <div class="prag-card">
      <h3>Git 자동화</h3>
      <p>변경 분석, 검증 결과, commit 작성까지 반복 절차 자동화.</p>
    </div>
    <div class="prag-card">
      <h3>문서 자동화</h3>
      <p>Docs 분류·갱신과 Code Intent 정적 사이트 생성 자동화.</p>
    </div>
    <div class="prag-card">
      <h3>Blueprint 반자동화</h3>
      <p>생성, 변수 추가, compile, Widget·MVVM 편집을 검토 가능한 operation으로 실행.</p>
    </div>
  </div>
</div>

<!--
[03:45-04:30]
저희는 AI를 코드 작성 보조에만 사용하지 않고 Git, 문서, Unreal Editor 작업까지 연결했습니다.
제가 직접 제작하고 프로젝트에 통합한 UnreelMCP는 Unreal Engine 5.8 Editor 안에서 asset과 Blueprint, Widget, MVVM 상태를 조회하거나 제한적으로 수정할 수 있는 MCP 서버입니다.
이를 통해 변경 분석과 commit 작성, 문서 분류와 사이트 생성, Blueprint 생성과 변수 추가, compile, Widget과 MVVM 편집 같은 반복 작업을 자동화하거나 반자동화했습니다.
다만 AI가 최종 결정을 대신하는 구조가 아니라, operation 실행 결과와 변경 asset을 사람이 검토하는 구조로 사용했습니다.
-->

---
layout: default
class: prag-ai-debt
---

# AI 자동화의 기술 부채는 Code Intent 문서로 통제함

<div class="prag-ai-debt-layout">
  <figure class="prag-image-frame prag-ai-intent-shot">
    <img src="./images/slide-ai-code-intent.png" alt="ReceiveDamage Code Intent 문서 화면" />
    <figcaption>함수의 존재 이유부터 호출 관계, 서버 조건, Blueprint 연결, 검증 방법까지 한 장에 보존.</figcaption>
  </figure>
  <div class="prag-ai-debt-points">
    <div class="prag-card">
      <span>01</span>
      <h3>개발자 의도 보존</h3>
      <p>사용해야 하는 상황과 사용하면 안 되는 상황을 함께 기록.</p>
    </div>
    <div class="prag-card">
      <span>02</span>
      <h3>근거와 추정 분리</h3>
      <p>확실한 근거, 추정한 의도, 확신도, 아직 모르는 점을 구분.</p>
    </div>
    <div class="prag-card">
      <span>03</span>
      <h3>변경 영향 추적</h3>
      <p>호출 관계, 서버·클라이언트 조건, Blueprint 연결과 관련 commit을 연결.</p>
    </div>
  </div>
</div>

<p class="prag-mini mt-3">AI가 구현 속도를 높이는 만큼, 다음 개발자가 “왜 존재하는 코드인지” 복원할 수 있는 기록을 함께 생성함.</p>

<!--
[04:30-05:15]
AI 활용으로 구현 속도는 높아졌지만, 생성된 코드가 많아질수록 원래 개발자의 의도가 사라지고 비슷한 기능이 중복될 위험도 커졌습니다.
이 기술 부채를 줄이기 위해 Code Intent 문서화 도구를 만들었습니다.
각 의도 카드는 코드의 존재 이유, 사용해야 하는 상황과 사용하면 안 되는 상황, 호출 관계, 서버와 클라이언트 조건, Blueprint 연결 여부를 함께 기록합니다.
또한 사실과 추정을 섞지 않도록 확실한 근거, 추정한 의도, 확신도, 아직 모르는 점과 검증 방법을 분리했습니다.
따라서 AI는 개발자의 의도를 대체하는 도구가 아니라, 의도를 보존한 상태에서 반복 작업을 줄이는 도구로 사용했습니다.
-->

---
layout: default
class: prag-collab
---

# 서버 상태 계약으로 기능을 하나의 플레이 루프로 통합함

<div class="prag-session-flow four">
  <div class="prag-session-step"><span>01</span><strong>기능 분리</strong><small>세션·역할·캐릭터·UI</small></div>
  <div class="prag-session-step"><span>02</span><strong>상태 계약</strong><small>RPC·GameState·OnRep</small></div>
  <div class="prag-session-step"><span>03</span><strong>문서화</strong><small>권한·소유·Binding 기록</small></div>
  <div class="prag-session-step"><span>04</span><strong>통합 검증</strong><small>양방향 Host 역할 조합</small></div>
</div>

<div class="prag-session-evidence">
  <figure class="prag-image-frame prag-session-capture">
    <img class="prag-img" src="./images/slide-10-role-selection.png" alt="Hugh와 Diana 역할을 선택하는 실제 게임 화면" />
    <figcaption>역할 선택과 Ready 상태가 통합 시연의 시작점이 됨.</figcaption>
  </figure>
  <div class="prag-session-facts">
    <div class="prag-card"><h3>통합 단위</h3><p>사람별 작업물이 아니라 하나의 플레이 루프로 결합함.</p></div>
    <div class="prag-card"><h3>검증 조합</h3><p>Host 역할을 고정하지 않고 Hugh / Diana 양방향을 확인함.</p></div>
  </div>
</div>

<!--
[05:15-05:45]
협업은 사람별 소개보다 기능 스트림과 그 사이의 계약을 중심으로 설명하겠습니다.
세션, 역할, 캐릭터, 해킹, 적, UI를 나눠 개발했지만 Server RPC와 GameState, replicated Component, delegate가 각각 어디까지 책임지는지 문서로 맞췄습니다.
개별 기능 완료보다 두 플레이어 화면에서 같은 결과가 보이는지를 통합 기준으로 사용했습니다.
-->

---
layout: default
class: prag-loop
---

# 6자리 방 코드로 접속하고 역할을 확정함

<div class="prag-session-flow">
  <div class="prag-session-step"><span>01</span><strong>시작</strong><small>타이틀 → 로비</small></div>
  <div class="prag-session-step"><span>02</span><strong>방 생성</strong><small>LAN Session + RoomCode</small></div>
  <div class="prag-session-step"><span>03</span><strong>방 참가</strong><small>Code로 동일 Session 검색</small></div>
  <div class="prag-session-step"><span>04</span><strong>역할 확정</strong><small>Hugh / Diana 중복 방지</small></div>
  <div class="prag-session-step"><span>05</span><strong>데모 진입</strong><small>역할별 Pawn 적용</small></div>
</div>

<div class="prag-session-evidence">
  <figure class="prag-image-frame prag-session-capture">
    <div class="grid grid-cols-2 gap-2 min-h-0 h-full">
      <img
        class="prag-img prag-img-contain h-full min-h-0"
        src="./images/unreal-capture-lobby-session-entry-16x9.png"
        alt="6자리 방 코드를 입력하거나 세션을 생성하는 로비 화면"
      />
      <img
        class="prag-img prag-img-contain h-full min-h-0"
        src="./images/unreal-capture-room-code-host-16x9.png"
        alt="Host가 생성한 6자리 RoomCode 화면"
      />
    </div>
    <figcaption>실제 빌드의 Join 입력 화면과 Host RoomCode 생성 결과.</figcaption>
  </figure>
  <div class="prag-session-facts">
    <div class="prag-card">
      <h3>세션 탐색</h3>
      <p>RoomCode를 LAN Session 검색 키로 사용함.</p>
    </div>
    <div class="prag-card">
      <h3>역할 확정</h3>
      <p>Host / Join과 Hugh / Diana를 분리해 양방향 조합을 지원함.</p>
    </div>
  </div>
</div>

<!--
[05:45-06:35]
먼저 세션 흐름입니다.
기획 발표 때보다 가장 크게 정리된 부분은 Host/Join과 Hugh/Diana를 분리한 점입니다.
호스트냐 참가자냐는 네트워크 행동이고, Hugh냐 Diana냐는 게임플레이 역할입니다.
이 둘을 분리해야 Host Diana, Client Hugh 같은 조합도 정상적으로 동작합니다.
-->

---
layout: default
class: prag-role-handoff
---

# 선택한 역할은 맵 이동 후에도 그대로 유지됨

<div class="prag-handoff-visuals">
  <figure class="prag-image-frame">
    <div class="grid grid-cols-2 gap-2 min-h-0 h-full">
      <img
        class="prag-img prag-img-contain h-full min-h-0"
        src="./images/unreal-capture-character-select-diana-16x9.png"
        alt="Diana 역할 선택 화면"
      />
      <img
        class="prag-img prag-img-contain h-full min-h-0"
        src="./images/unreal-capture-character-select-hugh-16x9.png"
        alt="Hugh 역할 선택 화면"
      />
    </div>
    <figcaption>같은 RoomCode에서 Diana와 Hugh를 각각 선택한 실제 로비 화면.</figcaption>
  </figure>
  <figure class="prag-image-frame">
    <div class="prag-placeholder prag-shot-placeholder">
      <span>02 · 실제 인게임 캡처</span>
      <strong>Diana HUD / Hugh HUD로 데모 맵 진입</strong>
      <p>로비에서 선택한 역할과 각 Pawn, HUD, 입력 방식이 일치하는 두 화면</p>
    </div>
    <figcaption>Travel 이후 역할별 Pawn possess, HUD, Input Mapping 적용.</figcaption>
  </figure>
</div>

<div class="prag-handoff-chain">
  <div class="prag-card"><span>1</span><h3>PreferredRole</h3><p>로비 선택을 PlayerState에 저장.</p></div>
  <div class="prag-card"><span>2</span><h3>Seamless Travel</h3><p>맵 이동 중 선택 정보를 새 PlayerState로 전달.</p></div>
  <div class="prag-card"><span>3</span><h3>AssignedRole</h3><p>서버가 역할별 Pawn, HUD, 입력 구성을 최종 확정.</p></div>
</div>

<!--
[06:35-07:15]
앞 장에서 방 코드 접속과 역할 선택 과정을 설명했으므로, 여기서는 선택 결과가 실제 게임까지 유지되는 경로만 보겠습니다.
Host Diana와 Client Hugh를 선택하면 PreferredRole이 PlayerState에 저장되고, Seamless Travel 과정에서 새 PlayerState로 복사됩니다.
데모 맵에서는 서버가 AssignedRole을 확정한 뒤 역할에 맞는 Pawn을 생성하고, PlayerController가 해당 HUD와 Input Mapping을 구성합니다.
따라서 Host는 Hugh라는 고정 가정 없이 Host Diana와 Client Hugh 조합도 동일하게 동작합니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# 두 플레이어가 같은 협동 상황을 함께 봄

<div class="prag-core-image-layout">
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-13-hacking-ui.png" alt="전투 중 해킹 UI가 열린 실제 게임 장면" />
    <figcaption>한 플레이어의 행동 결과를 서버가 확인한 뒤 두 화면에 같은 상태로 전달.</figcaption>
  </figure>
  <div class="prag-core-notes prag-core-notes-general">
    <div class="prag-card">
      <h3>행동은 함께 확인</h3>
      <p>해킹과 상호작용의 결과를 두 플레이어가 같은 순간에 확인함.</p>
    </div>
    <div class="prag-card">
      <h3>화면은 같은 결과를 표시</h3>
      <p>대상, 전투 상태, 퍼즐 진행도가 역할별 화면에 일관되게 반영됨.</p>
    </div>
  </div>
</div>

<!--
[07:15-07:55]
이 장에서는 두 플레이어가 같은 협동 상황을 본다는 결과를 먼저 말씀드리겠습니다.
한 사람이 해킹이나 상호작용을 시작하면, 대상과 전투 상태, 퍼즐 진행도가 두 화면에서 어긋나지 않아야 합니다.
이를 위해 입력 요청은 서버가 확인하고, 확정된 상태만 양쪽 HUD로 전달했습니다.
Listen Server에서는 호스트 화면과 참가자 화면의 갱신 경로가 다를 수 있어, 최종적으로 같은 HUD 갱신 지점으로 모이도록 구성했습니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# 역할별 HUD가 현재 상황을 쉽게 보여줌

<div class="prag-core-image-layout">
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-14-hugh-hud-dark.png" alt="Hugh HUD가 표시된 어두운 탐사 구간의 실제 게임 장면" />
    <figcaption>두 역할은 다른 화면을 쓰지만, 현재 상황에 필요한 정보는 각 HUD에 즉시 반영.</figcaption>
  </figure>
  <div class="prag-core-notes prag-core-notes-general">
    <div class="prag-card">
      <h3>Hugh 화면</h3>
      <p>체력과 전투 준비 상태를 보며 이동과 사격에 집중함.</p>
    </div>
    <div class="prag-card">
      <h3>Diana 화면</h3>
      <p>해킹, 정화, OverDrive처럼 협동 판단에 필요한 정보를 제공함.</p>
    </div>
  </div>
</div>

<!--
[07:55-08:35]
협동 게임에서는 같은 정보를 모두 보여주는 것보다, 각 역할이 지금 판단해야 할 정보를 빠르게 보여주는 편이 중요합니다.
Hugh 화면은 이동과 전투 준비에, Diana 화면은 해킹과 정화 판단에 맞춰 구성했습니다.
화면에 보이는 체력, cooldown, 퍼즐 상태는 gameplay 상태가 바뀌면 바로 갱신됩니다.
구현에서는 핵심 HUD에 MVVM을 사용했지만, 오늘은 구조 자체보다 화면이 역할의 차이를 어떻게 전달하는지에 집중하겠습니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# Hugh의 사격 결과가 두 화면에 일관되게 보임

<div class="prag-core-image-layout">
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-15-enemy-hit.png" alt="적에게 피격 피해가 표시되는 실제 게임 장면" />
    <figcaption>서버가 조준 결과를 확인해 피격 위치와 반응을 두 플레이어에게 같은 결과로 전달.</figcaption>
  </figure>
  <div class="prag-core-notes prag-core-notes-general">
    <div class="prag-card">
      <h3>조준과 발사</h3>
      <p>Hugh가 약점을 노릴 때 사격 판단이 한 번의 결과로 확정됨.</p>
    </div>
    <div class="prag-card">
      <h3>피격과 반응</h3>
      <p>피해와 충격 효과가 두 화면에 함께 보여 협동 전투의 타이밍을 맞춤.</p>
    </div>
  </div>
</div>

<!--
[08:35-09:20]
Hugh의 사격은 적을 맞히는 것만이 아니라, Diana가 만든 약점을 실제 전투 결과로 바꾸는 행동입니다.
따라서 발사와 피격 결과는 한쪽 화면에서만 보이면 안 되고 두 플레이어에게 같은 흐름으로 전달되어야 합니다.
클라이언트는 발사 의도만 전달하고, 서버가 조준 결과와 발사 조건을 확인한 뒤 피해와 충격 효과를 확정합니다.
구현 근거로는 서버가 카메라 시점에서 단일 Line Trace를 수행해 피격 지점을 결정합니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# Diana가 눈앞의 장치를 골라 협동 탐사를 이끎

<div class="prag-core-image-layout">
  <figure class="prag-image-frame">
    <img class="prag-img" src="./images/slide-16-hacking-puzzle.png" alt="Diana의 해킹 퍼즐 UI가 표시된 실제 게임 장면" />
    <figcaption>화면 앞의 후보 중 실제로 상호작용할 수 있는 장치만 선택해 보여줌.</figcaption>
  </figure>
  <div class="prag-core-notes prag-core-notes-general">
    <div class="prag-card">
      <h3>탐색</h3>
      <p>주변 장치와 보상을 확인해 두 플레이어가 다음 목표를 찾음.</p>
    </div>
    <div class="prag-card">
      <h3>상호작용</h3>
      <p>장치를 해킹하면 문, 전원, 이동 경로가 바뀌어 탐사를 이어갈 수 있음.</p>
    </div>
  </div>
</div>

<!--
[09:20-10:10]
Diana는 주변 장치와 보상을 찾아 다음 탐사 목표를 정하는 역할입니다.
플레이어가 화면 앞의 장치를 조준하면, 실제로 상호작용 가능한 대상만 선택되어 혼란을 줄입니다.
해킹이 성공하면 문, 전원, 이동 장치가 바뀌고 Hugh와 Diana가 함께 다음 구간으로 넘어갑니다.
구현에서는 거리와 시야가 맞는 후보만 서버가 다시 확인하지만, 시연에서는 장치 선택과 월드 변화의 인과만 보여드리겠습니다.
-->

---
layout: default
class: prag-core prag-core-image
---

# 정화로 오염된 기계와 장애물에 대응함

<div class="prag-core-image-layout">
  <figure class="prag-image-frame">
    <div class="prag-placeholder prag-shot-placeholder">
      <span>실제 베타 빌드 캡처</span>
      <strong>정화 범위 안의 오염 적이 회복되는 장면</strong>
      <p>정화 직전, 성공 순간, 다음 사용 가능 상태를 연속된 화면으로 촬영</p>
    </div>
    <figcaption>정화 범위 안의 오염 대상을 서버가 확인하고, 결과와 다음 사용 시점을 양쪽 HUD에 반영.</figcaption>
  </figure>
  <div class="prag-core-notes prag-core-notes-general">
    <div class="prag-card">
      <h3>정화 순간</h3>
      <p>오염된 적과 장애물이 등장한 뒤 플레이어에게 새로운 대응 수단을 제공함.</p>
    </div>
    <div class="prag-card">
      <h3>공유되는 결과</h3>
      <p>정화 성공과 다음 사용 가능 시점이 두 플레이어 화면에 함께 표시됨.</p>
    </div>
  </div>
</div>

<!--
[10:10-10:50]
정화는 분위기가 바뀐 뒤 플레이어가 새로운 위험에 대응하는 방법을 얻는 장면입니다.
오염된 적과 장애물이 등장하면 Diana가 정화를 사용하고, 두 플레이어는 성공 결과와 다음 사용 가능 시점을 함께 확인합니다.
이 기능은 범위 안에 있고 가려지지 않은 대상만 적용되도록 서버가 확인합니다.
시연에서는 복잡한 조건보다 오염 등장, 정화 사용, 경로 회복이라는 플레이 흐름을 중심으로 보여드리겠습니다.
-->

---
layout: default
class: prag-map-elements
---

# 맵 상호작용이 전투와 탐사 흐름을 연결함

<div class="prag-map-columns">
  <div class="prag-card">
    <h3>진행 경로</h3>
    <p>선형 스테이지 안에 장치, 전투, 휴식, 보상 구간 배치.</p>
    <ul class="prag-compact-list">
      <li>Diana POI focus → MapHack → 연결 장치 trigger</li>
      <li>전투 압박 구간과 재정비 구간</li>
      <li>후반 전투까지 이어지는 명확한 목표</li>
    </ul>
  </div>
  <div class="prag-card">
    <h3>협동 동선</h3>
    <p>완성된 협동 기능이 한 번에 이어지도록 전투와 해킹 장치를 순서대로 배치.</p>
    <div class="prag-map-image-row">
      <div class="prag-placeholder"><img class="prag-img" src="./images/slide-18-ingame-01.png" alt="맵 장치와 이동 경로를 확인하는 Unreal Editor 장면" /><span>인게임 01</span><strong>휴식·보상 구간</strong><p>전투 후 재정비 장면</p></div>
      <div class="prag-placeholder"><span>인게임 02</span><strong>메인 진행 경로</strong><p>다음 장치와 목표가 보이는 구도</p></div>
    </div>
  </div>
</div>

<!--
[10:50-11:25]
맵 설명은 모든 공간을 나열하기보다 협동 기능이 어떤 순서로 등장하는지에 초점을 둡니다.
맵 장치는 Scannable POI로 GameState registry에 등록되고, Diana가 유효한 거리와 시야에서 조준하거나 상호작용 입력을 보내면 서버가 최종 대상을 다시 확정합니다.
MapHackingPuzzleComponent가 있는 장치는 방향 입력과 성공 상태를 서버가 소유하고, 완료 시 PuzzleInteractable의 TargetActors 또는 OnInteractionActivated를 통해 문, 전원, 이동 장치를 작동시킵니다.
전투 뒤에는 휴식과 보상 구간을 두고, 다음 해킹 장치와 목표가 자연스럽게 보이도록 시연 동선을 구성했습니다.
-->

---
layout: default
class: prag-beta-demo
---

# 베타 협동 플레이 루프는 6단계로 구성됨

<div class="prag-demo-routes">
  <div class="prag-session-flow four compact">
    <div class="prag-session-step"><span>01</span><strong>접속·역할</strong><small>방 코드와 역할 확정</small></div>
    <div class="prag-session-step"><span>02</span><strong>협력 탐사</strong><small>이동 + 장치 해킹</small></div>
    <div class="prag-session-step"><span>03</span><strong>협동 전투</strong><small>해킹 + 약점 사격</small></div>
    <div class="prag-session-step"><span>04</span><strong>탐사 확장</strong><small>문·전원·이동 장치</small></div>
  </div>
  <div class="prag-session-flow compact" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
    <div class="prag-session-step"><span>05</span><strong>분위기 전환</strong><small>오염 기계 등장</small></div>
    <div class="prag-session-step"><span>06</span><strong>정화 획득</strong><small>오염 대응 수단 확보</small></div>
  </div>
</div>

<div class="prag-session-evidence prag-demo-evidence">
  <figure class="prag-image-frame prag-session-capture"><div class="prag-placeholder"><span>실제 베타 대표 장면</span><strong>해킹된 적의 약점을 Hugh가 조준하는 순간</strong><p>Diana 해킹 UI, 노출된 약점, Hugh의 조준이 동시에 읽히는 화면</p></div><figcaption>Diana가 조건을 만들고 Hugh가 해결하는 장면이 시연의 중심.</figcaption></figure>
  <div class="prag-session-facts"><div class="prag-card"><h3>오늘 시연</h3><p>01부터 06까지 연속 플레이로 진행함.</p></div><div class="prag-card"><h3>베타 완료</h3><p>정화 획득까지 실제 빌드에서 반복 검증함.</p></div></div>
</div>

<!--
[10:50-16:20]
이제 시연으로 넘어가겠습니다.
시연은 접속과 역할 선택, 협력 탐사, 협동 전투, 장치 탐사 확장, 오염된 기계 등장, 정화 스킬 획득 순서로 진행됩니다.
약 4분 동안 01부터 06까지 실제 빌드를 플레이하고, 각 구간에서는 조작 설명보다 두 역할의 협력 결과만 짧게 짚겠습니다.
-->

---
layout: default
class: prag-beta-completion
---

# 핵심 협동 루프 구현, 베타 시연 범위 검증됨

<div class="prag-session-evidence prag-status-evidence">
  <figure class="prag-image-frame prag-session-capture"><div class="prag-placeholder"><span>실제 베타 빌드 캡처</span><strong>현재 시연 가능한 마지막 안정 구간</strong><p>정화 획득 이후 탐사 또는 협동 전투 종료 장면</p></div><figcaption>문서상 기능 수가 아니라 실제로 연속 재현되는 범위로 완성도를 판단.</figcaption></figure>
  <div class="prag-session-facts"><div class="prag-card"><h3>시연 가능</h3><p>접속, 역할, HUD, 해킹과 사격까지 핵심 협동 루프가 연결됨.</p></div><div class="prag-card"><h3>완료 범위</h3><p>정화 획득까지 동일한 경로로 반복 재현 가능.</p></div></div>
</div>

<!--
[16:20-17:00]
베타 완성도는 문서상 기능 개수보다 실제 플레이 루프 기준으로 보겠습니다.
현재 핵심 루프는 연결되어 있으며, 베타 평가는 정화 획득까지 반복 재현되는 결과를 기준으로 보겠습니다.
-->

---
layout: default
class: prag-extension
---

# 최종 릴리스 단계에서는 시연 안정성과 가독성을 보강함

<div class="prag-session-flow four">
  <div class="prag-session-step"><span>01</span><strong>빌드 고정</strong><small>동일 순서 반복 검증</small></div>
  <div class="prag-session-step"><span>02</span><strong>UI 보강</strong><small>해킹·약점·상태 가독성</small></div>
  <div class="prag-session-step"><span>03</span><strong>영상 백업</strong><small>5분 이내 동일 흐름</small></div>
  <div class="prag-session-step"><span>04</span><strong>최종 정리</strong><small>완성도·기여·회고</small></div>
</div>

<div class="prag-session-evidence">
  <figure class="prag-image-frame prag-session-capture"><div class="prag-placeholder"><span>발표 빌드 검증 기록</span><strong>동일 시연 루트 반복 실행 결과</strong><p>체크리스트, 패키징 결과, 백업 영상 썸네일이 함께 보이는 화면</p></div><figcaption>새 기능 추가보다 발표 당일 같은 결과를 재현하는 데 집중.</figcaption></figure>
  <div class="prag-session-facts"><div class="prag-card"><h3>우선순위</h3><p>시연 안정성과 화면 가독성을 먼저 보강함.</p></div><div class="prag-card"><h3>후반 계획</h3><p>대규모 전투와 보스전은 최종 릴리스 단계의 미래 계획으로 분리함.</p></div></div>
</div>

<!--
[17:00-17:35]
마지막으로 베타 이후의 최종 릴리스 단계를 짧게 말씀드리겠습니다. 대규모 전투와 보스전은 베타 성과가 아니라 이후의 미래 계획이며, 우선순위는 현재 시연 경로의 안정성과 화면 가독성입니다.
이 프로젝트는 상업적 확장 가능성을 말하는 프로젝트가 아니라, 원작을 좋아한 팀이 솔로 플레이의 부담을 2인 협동의 재미로 바꿔 본 모작 프로젝트입니다.
따라서 최종 발표에서는 발표 빌드, UI 가독성, 영상 백업, 그리고 attribution과 완성도 평가를 정리하겠습니다.
-->

---
layout: cover
class: prag-cover prag-close
---

<p class="prag-eyebrow">팀 다이애나</p>

# <span class="prag-title">Q&A</span>

<p class="prag-subtitle">
Pragmata 2P 베타 발표
</p>

<!--
[17:35-18:00]
질문 예상 축: Listen Server 선택 이유, 방 코드 방식, Hugh/Diana 역할 분리, enemy hack과 map hack의 차이, 최종 릴리스 단계 범위.
-->
