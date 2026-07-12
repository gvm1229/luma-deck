# Pragmata 2P 베타 발표 대본

- 목표 시간: 18분
- 발표 기준: 기능 나열보다 실제 게임 루프와 적용 기술을 함께 설명
- 베타 완료 범위: 방 코드 접속부터 정화 스킬 획득까지
- 기여 판단 기준: GitHub commit·PR·asset history 우선
- 발표 원칙: 미완성 기능은 베타 성과에 포함하지 않고, 마지막 `최종 릴리스 단계`에서만 짧게 언급

## 1. 표지 — 00:00~00:30

다들 바쁘시니 현재까지의 진행 상황과 시연 위주로 빠르게 진행해 보겠습니다.

저희 게임은 원작에서 한 플레이어가 함께 수행하던 Hugh의 전투와 Diana의 해킹을 두 명의 플레이어에게 나눈 2인 협동 액션 퍼즐 데모입니다.

현재 보이는 타이틀 화면은 원작의 구도를 오마주하되 저희 게임만의 분위기를 주기 위해 밝은 하늘과 두 주인공이 함께 쉬는 장면으로 구성했습니다. 카메라 배치와 캐릭터 애니메이션은 정호진, 로고와 텍스트는 윤제영이 담당했습니다. 이 장면은 Level Sequencer 기반 연출이 아니며, 배치된 카메라와 캐릭터 animation setup을 사용했습니다. Diana의 머리카락에는 PhysicsAsset 기반 물리 시뮬레이션을 적용했고, Blend Pose로 얼굴과 몸 애니메이션을 함께 재생했습니다.

## 2. 발표 흐름 — 00:30~01:00

발표는 구현 기능을 단순히 나열하지 않고 실제 플레이 순서로 진행하겠습니다.

먼저 2인 협동으로 재해석한 목표를 설명하고, 방 코드 접속과 역할 선택, 서버 권한과 UI 동기화, Hugh의 사격과 Diana의 해킹·정화 구현을 보겠습니다. 마지막에는 지금 실제 빌드에서 반복 재현되는 베타 범위를 시연하겠습니다.

## 3. 베타 완료 범위 — 01:00~01:30

기획 발표 때 제시한 전체 게임 루프 중 이번 베타에서 연속 플레이로 확보한 범위는 방 코드 접속, 역할 확정, 협력 탐사, 협동 전투, 오염 기계의 등장, 정화 스킬 획득까지입니다.

중요한 점은 각 기능이 별도의 테스트 맵에 흩어져 있는 것이 아니라, 두 플레이어가 같은 세션에서 하나의 흐름으로 경험할 수 있게 연결됐다는 것입니다.

## 4. 2인 협동 재해석 — 01:30~02:05

원작에서는 한 플레이어가 Hugh를 움직이면서 사격과 회피를 수행하고, 동시에 Diana의 해킹 퍼즐도 처리합니다. 적이 많아질수록 이 동시 처리 부담이 커집니다.

저희는 이 부담을 단순히 낮추는 대신 역할로 분리했습니다. Hugh 플레이어는 이동과 조준, 사격과 생존을 담당하고, Diana 플레이어는 넓은 시야에서 대상을 찾고 해킹과 정화로 전투 조건을 만듭니다.

저희 프로젝트의 차별점은 원작을 그대로 복제하는 것이 아니라, 솔로 플레이의 부담을 두 사람이 협력하는 재미로 바꾼 데 있습니다.

## 5. 해킹과 약점 사격 — 02:05~02:45

두 역할의 관계가 가장 잘 드러나는 장면은 해킹 이후의 약점 사격입니다.

Diana가 퍼즐을 풀면 적의 방어 상태가 해제되고 약점이 노출됩니다. Hugh는 총을 발사할 때 서버에서 수행한 Line Trace의 `BoneName`으로 실제 약점 부위를 맞혔는지 판정합니다.

따라서 Diana가 먼저 조건을 만들고 Hugh가 그 결과를 정확한 사격으로 해결해야 정상적인 피해가 들어갑니다. 관객이 시연에서 봐야 할 핵심도 해킹 성공, 약점 노출, Hugh의 명중으로 이어지는 이 순서입니다.

## 6. 기술 스택 — 02:45~03:20

프로젝트는 Unreal Engine 5.8 C++와 Blueprint를 함께 사용했고, 네트워크는 Listen Server 구조로 구현했습니다.

Listen Server를 선택한 이유는 대규모 온라인 서비스보다 두 명이 같은 빌드에 접속해 서로 다른 역할을 맡는 구조를 학습하고 검증하는 것이 이번 프로젝트의 핵심이었기 때문입니다.

UI는 전체를 한 방식으로 과장하지 않고, 핵심 HUD 상태에 MVVM을 적용한 mixed MVVM 구조입니다. UE 5.8 업그레이드는 gameplay 기능뿐 아니라 Editor API를 활용하는 프로젝트 자동화 범위를 넓히는 데도 사용했습니다.

## 7. 개발 진행 — 03:20~03:50

개발은 기획 발표, 기능 통합, 베타 검증, 발표 준비의 네 단계로 진행했습니다.

기획 단계에서 2인 협동 재해석 범위를 확정했고, 기능 통합 단계에서는 세션과 역할, HUD와 전투 기능을 하나의 플레이 흐름으로 연결했습니다. 베타 검증에서는 접속부터 정화 획득까지 반복 실행했고, 현재는 같은 시연 경로가 안정적으로 재현되는지와 화면 가독성을 확인하고 있습니다.

## 8. 직접 제작한 UnreelMCP — 03:50~04:35

저희는 AI를 코드 작성 보조에만 사용하지 않고 Git, 문서, Unreal Editor 작업까지 연결했습니다.

여기서 UnreelMCP는 외부 도구를 가져와 설정한 것이 아닙니다. 제가 Unreal Engine 5.8 Editor의 asset, Blueprint, Widget, MVVM 상태를 읽고 제한적으로 수정할 수 있도록 MCP 서버를 직접 만들었고, 이 프로젝트의 `.mcp.json`, Codex, Claude, Gemini 작업 흐름에 통합했습니다.

이를 통해 `.uasset`의 구조와 참조를 직접 확인하고, Blueprint 생성과 변수 추가, compile, Widget과 MVVM 편집을 반자동화했습니다. Git 변경 분석과 commit 작성, 문서 분류와 Code Intent 사이트 생성도 같은 AI 작업 흐름으로 연결했습니다.

다만 AI가 최종 결정을 대신하지는 않습니다. operation 결과와 변경 asset은 개발자가 확인하는 구조로 사용했습니다.

## 9. AI 기술 부채와 Code Intent — 04:35~05:20

AI 활용으로 구현 속도는 높아졌지만, 생성된 코드가 많아질수록 원래 개발자의 의도가 사라지거나 비슷한 기능이 중복될 위험도 커졌습니다.

이 기술 부채를 줄이기 위해 저희는 Code Intent 문서화 도구를 만들었습니다. 각 카드는 코드의 존재 이유, 사용해야 하는 상황과 사용하면 안 되는 상황, 호출 관계, 서버와 클라이언트 권한 조건, Blueprint 연결 여부를 함께 기록합니다.

또한 확인된 사실과 추정한 의도, 확신도와 아직 모르는 점, 검증 방법을 분리했습니다. AI가 개발자의 의도를 대체하는 것이 아니라, 의도를 보존한 상태에서 반복 작업을 줄이도록 만든 것입니다.

## 10. 협업과 서버 상태 계약 — 05:20~05:50

팀원별 기여는 우선 GitHub commit과 PR, asset history를 기준으로 확인했습니다. 발표에서는 사람별 기능 목록보다 각 기능이 어떤 계약으로 연결됐는지 중심으로 설명하겠습니다.

세션, 역할, 캐릭터, 해킹, 적, UI를 나누어 개발했지만 `Server RPC`, `GameState`, replicated Component, delegate가 각각 어디까지 책임지는지 문서로 맞췄습니다. 통합 완료 기준도 코드가 존재하는지가 아니라 두 플레이어 화면에서 같은 결과가 재현되는지로 잡았습니다.

## 11. 방 코드 로비 — 05:50~06:35

로비와 RoomCode 흐름은 정호진이 구현했습니다.

IP 주소를 직접 입력하는 불편함을 줄이기 위해 Host가 6자리 코드를 만들고, 다른 플레이어가 같은 코드를 입력해 LAN Session을 검색하도록 구성했습니다. 이 RoomCode는 인증이나 보안 코드가 아니라 Session 검색 키입니다.

또 하나 중요한 점은 Host와 Hugh를 같은 의미로 취급하지 않는 것입니다. Host와 Join은 네트워크상의 위치이고, Hugh와 Diana는 gameplay 역할입니다. 이 둘을 분리했기 때문에 Host Diana와 Client Hugh 조합도 가능합니다.

## 12. 캐릭터 선택과 역할 유지 — 06:35~07:15

캐릭터 선택과 역할 인계도 정호진이 구현했습니다.

각 플레이어가 Hugh와 Diana 중 원하는 역할을 선택하면 결과가 `PlayerState`의 `PreferredRole`에 저장됩니다. 맵 이동 과정에서는 Seamless Travel을 통해 새 `PlayerState`로 이 값을 전달합니다.

데모 맵에 도착하면 서버가 `AssignedRole`을 최종 확정하고 역할에 맞는 Pawn을 spawn·possess합니다. 그다음 PlayerController가 Hugh 또는 Diana HUD와 Input Mapping을 구성합니다. 그래서 로비에서 고른 역할, 실제 Pawn, HUD, 입력 방식이 맵 이동 이후에도 일치합니다.

## 13. 서버 상태와 양쪽 HUD — 07:15~07:55

Listen Server에서는 서버와 로컬 플레이어가 같은 프로세스 안에 있으므로 원격 클라이언트와 상태 갱신 경로가 다를 수 있습니다.

클라이언트는 해킹이나 상호작용 의도만 보내고, 서버가 `ActiveEnemyHackTarget`, `ActiveMapPuzzleActor`, `EnemyCombatActive` 같은 상태를 확정합니다.

원격 클라이언트는 `OnRep`로 상태가 갱신되지만 Listen Server의 로컬 화면은 `OnRep`만으로 갱신을 보장할 수 없습니다. 그래서 서버 setter가 local delegate를 직접 broadcast하고, 원격 클라이언트의 `OnRep`도 같은 delegate를 broadcast하도록 구성했습니다. 결과적으로 양쪽 화면이 같은 HUD handler로 수렴합니다.

## 14. Mixed MVVM HUD — 07:55~08:35

UI 전체가 완전한 MVVM이라고 설명하지는 않겠습니다. 현재는 핵심 HUD 상태를 MVVM으로 전달하고 일부 POI, crosshair, enemy HP, upgrade 경로는 직접 widget 또는 delegate 갱신을 함께 사용합니다.

PlayerController는 역할에 맞는 `WBP_HughHUD` 또는 `WBP_DianaHUD`를 생성합니다. 각 root HUD는 별도의 local `PragmataHUDViewModel` instance를 사용하지만, 두 ViewModel은 같은 replicated gameplay source를 구독합니다.

ViewModel은 HP, Stamina, PlayerStats, OverDrive, 정화 cooldown 같은 화면용 값을 `FieldNotify`로 갱신합니다. 적 해킹 퍼즐은 별도의 `EnemyHackingPuzzleViewModel`이 grid와 cursor, 시작·완료·취소 상태를 담당합니다. 실제 gameplay 명령은 ViewModel이 아니라 Diana의 Server RPC 경로에서 시작합니다.

## 15. Hugh의 GripGun — 08:35~09:20

Hugh의 GripGun은 Line Trace 방식으로 구현했습니다.

클라이언트는 발사 의도만 `Server_RequestFire`로 보내고, 서버가 탄약, 재장전 상태, 발사 간격을 확인한 뒤 사격을 확정합니다.

서버는 Player View Point를 기준으로 카메라 방향에 사거리 3,000cm의 Line Trace를 한 번 수행합니다. muzzle origin trace나 두 번째 보정 trace를 사용하는 구조는 아닙니다.

최종 `FHitResult`의 Actor와 `BoneName`을 DamageSpec에 담아 일반 피해와 해킹 약점 명중을 판정합니다. Impact VFX는 Multicast로 두 화면에 전달합니다.

## 16. Diana의 POI 판별과 맵 상호작용 — 09:20~10:10

Diana의 스캔과 실제 상호작용 대상 판정은 같은 `GameState` POI registry와 typed metadata를 공유하지만 서로 다른 경로로 동작합니다.

먼저 `APropInteractionBase` 계열 장치는 BeginPlay에서 자신을 Scannable POI로 `GameState`에 등록합니다. metadata에는 `MapHackNode` 또는 `ItemBox` 같은 종류, 화면에 표시할 이름, Diana interaction 가능 거리가 들어 있습니다. 스캔 입력은 이 registry를 조회해 발견 가능한 POI를 거리순으로 Hugh와 Diana 화면에 전달합니다.

하지만 실제로 상호작용할 Actor는 `DianaNodeInteractionComponent`가 별도로 선택합니다. Diana가 `Roaming` 상태에서 조준 중이고, 전투 중이 아니며 action lock도 없을 때만 후보를 검사합니다. 후보는 `Scannable`과 `PropInteractable`을 모두 구현해야 하고, 종류가 `MapHackNode` 또는 `ItemBox`여야 하며 이미 완료된 장치는 제외됩니다.

그다음 각 후보가 metadata에 기록된 Hugh 기준 interaction 거리 안에 있는지, Diana camera로부터 3,000cm 안인지, 화면 중앙 반각 10도 안인지, Visibility Line Trace로 가려지지 않았는지를 확인합니다. 이 조건을 통과한 후보 중 화면 중앙에 가장 가까운 Actor를 현재 대상으로 선택합니다.

입력 방식도 대상 종류에 따라 다릅니다. `MapHackNode`는 Diana가 조준점을 올리면 자동으로 server interaction을 요청하지만, `ItemBox`는 조준만으로 열리지 않고 `IA_Interact` 입력을 요구합니다. 어느 경우든 client는 의도만 보내며, 서버가 Diana role과 mode, 전투 상태, 거리, 각도, LOS를 같은 방식으로 다시 판정한 뒤 `IPropInteractableInterface::Interact`를 실행합니다.

Map hacking component가 있는 장치는 서버가 puzzle 시작과 방향 입력, 성공 상태를 소유합니다. 퍼즐이 완료되면 `PuzzleInteractable::CompletePuzzle`이 호출되고, `TargetActors`의 `OnPuzzleTriggered` 또는 `OnInteractionActivated`를 통해 문, 전원, 이동 장치가 실제로 작동합니다. 적 해킹은 이 맵 상호작용과 분리된 component에서 대상 거리와 LOS를 다시 검증하고 전투 조건을 만듭니다.

## 17. Diana의 정화 — 10:10~10:50

정화는 화면 효과만 재생하는 기능이 아니라 서버가 대상 집합을 확정하는 gameplay 기능입니다.

정밀 조준은 Diana의 authoritative camera를 사용하고, quick 실행은 Hugh의 authoritative aim을 사용합니다. 현재 Blueprint 기본값은 사거리 3,000cm와 반각 30도로, 전체 범위는 60도 Cone입니다.

서버는 Diana 역할과 action lock, active hack 여부, cooldown을 확인하고, Visibility Line Trace로 가려진 대상을 제외합니다. 검증된 오염 적과 Dead Filament 장애물에만 정화를 적용합니다. 5초 cooldown의 시작 시각과 지속 시간도 복제하고, HUD는 서버 시간을 기준으로 진행률을 표시합니다.

## 18. 맵 흐름 — 10:50~11:25

맵은 공간 목록보다 협동 기능의 등장 순서에 맞춰 구성했습니다.

이동과 기본 상호작용으로 시작한 뒤 장치 해킹, 전투, 휴식과 보상, 오염 기계와 정화로 점차 역할 관계를 확장합니다. 각 장치는 POI metadata로 발견 조건과 Diana interaction 거리를 제공하고, 성공 결과는 연결된 문, 전원 또는 이동 장치에 전달됩니다. 전투 뒤에는 재정비 구간을 두고, 다음 상호작용 대상과 목표가 자연스럽게 보이도록 시연 동선을 구성했습니다.

## 19. 이동 네트워크 예측 — 11:25~12:05

Hugh의 Aim, Run, Hover, Jump Hold는 입력 직후 반응해야 하지만 서버 movement update에서도 같은 frame의 의도로 재현돼야 합니다.

일반 replicated bool을 늘리는 대신 `FHughSavedMove`가 해당 frame의 네 가지 intent를 저장하고, Unreal CharacterMovement의 custom compressed flag 네 개에 실어 보냅니다.

서버는 `UpdateFromCompressedFlags`에서 intent를 복원한 뒤 조준 중 달리기 금지 같은 gameplay 조건을 다시 적용합니다. 확정된 상태는 `FHughReplicatedAnimState`로 복제하고, remote proxy와 AnimBP는 이 snapshot을 표시 source로 사용합니다.

정지 이미지 한 장만으로 prediction 자체를 증명하지 않고, 시연에서는 동일한 인위적 지연 조건의 연속 프레임으로 확인하겠습니다.

## 20. 베타 라이브 시연 — 12:05~16:20

이제 실제 빌드 시연으로 넘어가겠습니다.

### 시연 1. 접속과 역할

- Host에서 6자리 RoomCode 생성
- Join에서 같은 코드 입력
- Host Diana, Client Hugh 선택
- 양쪽 Ready 후 데모 맵 진입

멘트: Host와 역할은 별개이므로 Host Diana와 Client Hugh 조합도 동일하게 동작합니다.

### 시연 2. 협력 탐사

- Hugh 이동과 Diana 스캔 확인
- 같은 POI와 다음 목표가 양쪽 화면에 표시되는지 확인
- Diana 조준점이 MapHackNode를 focus할 때 자동으로 map hack이 시작되는지 확인
- ItemBox는 조준만으로 열리지 않고 `IA_Interact` 입력 뒤에 열리는지 확인
- 퍼즐 완료 후 연결된 문, 전원 또는 이동 장치가 작동하는지 확인

멘트: 스캔은 POI를 발견하는 경로이고, 실제 상호작용 대상은 거리, 화면 중앙 각도, 완료 상태와 LOS로 별도 판정합니다. 클라이언트는 의도만 보내고 서버가 같은 조건으로 대상을 다시 확정합니다.

### 시연 3. 협동 전투

- 해킹 전 Hugh의 감소된 피해 확인
- Diana가 같은 적을 해킹
- 약점 노출 후 Hugh가 약점 Bone 명중

멘트: Diana가 전투 조건을 만들고 Hugh가 정확한 Line Trace 사격으로 해결하는 장면입니다.

### 시연 4. 탐사 확장

- 문, 전원, 이동 장치 중 준비된 장치 진행
- map hack 성공 이벤트가 실제 월드 상태를 바꾸는 장면 확인

멘트: 적 해킹과 맵 해킹은 UI만 다른 것이 아니라 시작 조건과 성공 결과가 분리되어 있습니다.

### 시연 5. 분위기 전환

- 일반 기계 구간에서 오염된 기계 구간으로 이동
- 기존 상호작용으로 해결할 수 없는 상태 확인

멘트: 이 지점부터 기존 해킹만으로 해결되지 않는 오염 상태가 등장합니다.

### 시연 6. 정화 획득

- 정화 Cone preview 확인
- 오염 대상 정화
- 양쪽 HUD의 cooldown 진행률 확인

멘트: 정화 대상은 서버가 Cone과 Line of Sight로 다시 검증하며, cooldown도 서버 시간을 기준으로 동기화합니다.

## 21. 베타 완료 상태 — 16:20~17:00

베타 완성도는 문서상 기능 개수가 아니라 실제 플레이 루프를 기준으로 보겠습니다.

현재 방 코드 접속, 역할 선택과 이동 후 유지, 역할별 Pawn과 HUD, Diana의 해킹, Hugh의 Line Trace 사격, 약점 피해, 정화 획득까지 하나의 경로로 연결되어 있습니다.

따라서 이번 베타의 성과는 기능 목록이 아니라 두 플레이어가 정화 획득까지 같은 결과를 반복 재현할 수 있다는 점입니다.

## 22. 최종 릴리스 단계 — 17:00~17:35

마지막으로 베타 이후 계획만 짧게 말씀드리겠습니다.

대규모 전투와 보스전은 이번 베타의 미완성 기능으로 길게 설명하지 않고, 최종 릴리스 단계에서 검토할 미래 계획으로 분리했습니다. 우선순위는 현재 베타 시연 경로의 반복 안정성, 해킹과 약점의 화면 가독성, 패키징 결과와 백업 영상 확보입니다.

이 프로젝트는 상업적 확장을 전제로 한 것이 아니라, 원작의 솔로 부담을 2인 협동의 재미로 바꿔 본 학습 목적의 모작 프로젝트입니다.

## 23. Q&A — 17:35~18:00

이상으로 발표를 마치겠습니다. 질문 부탁드립니다.

### 예상 질문

- Dedicated Server 대신 Listen Server를 선택한 이유
- RoomCode가 인증 코드가 아닌 LAN Session 검색 키인 이유
- Host/Join과 Hugh/Diana를 분리한 방식
- enemy hack과 map hack의 권한·결과 차이
- mixed MVVM을 사용한 범위와 직접 widget 갱신이 남은 범위
- UnreelMCP의 직접 제작 범위와 사람의 검토 절차
- 최종 릴리스 단계에서 검토할 후반 콘텐츠 범위
