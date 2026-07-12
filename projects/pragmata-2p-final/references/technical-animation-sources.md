# 기술 애니메이션 근거

final presentation의 animated technical route는 현재 Unreal 문서를 기준으로 한다.

| Slide | 표시 흐름 | 근거 |
| --- | --- | --- |
| 10 | 기능 분리 → 상태 계약 → 문서화 → 통합 검증 | `Docs/Systems/Server/server.md`, `Docs/Architecture/architecture.md` |
| 11 | Title → LAN RoomCode → Join 검색 → 역할 확정 → Demo spawn | `Docs/Systems/Server/server.md`, `Docs/Intent/GameFlow/PragmataSessionUtils.md` |
| 12 | PreferredRole → PlayerState handoff → AssignedRole | `Docs/Systems/Server/server.md` Role State / Travel 계약 |
| 13 | client intent → server GameState setter → local delegate / client OnRep → HUD bind | `Docs/Systems/Server/server.md` HUD와 GameState |
| 15 | fire intent → server weapon gate → camera-viewpoint single Line Trace → first blocking hit | `Docs/Intent/Weapon/GripGun-PullTrigger.md`, `Docs/Create/20260703-190759-gripgun-authority-boundary.md` |
| 16 | Diana focus intent → server distance / LOS / role 검증 → puzzle 완료 / TargetActors | `Docs/Systems/Hacking/map-hacking-integration.md`, `Docs/Intent/Hacking/DianaNodeInteractionComponent-RequestNodeInteraction.md` |
| 17 | precision / quick cleanse intent → server cone / LOS target 판정 → replicated cooldown HUD | `Docs/Intent/Hacking/DianaCleanseComponent-RequestCleanse.md`, `Docs/Intent/Hacking/MonsterBase-TaintState.md` |
| 19 | session부터 cleanse 획득까지 실제 demo loop | `Docs/Systems/Server/server.md`, `Docs/KNOW_HOW.md` |

## 표현 경계

- RoomCode는 LAN session 검색 키이며 인증 수단으로 표현하지 않음.
- Host / Join network action과 Hugh / Diana gameplay role을 분리함.
- client 값은 intent이며 server가 role, action lock, distance, LOS, active target을 재검증함.
- Listen Server local HUD는 setter delegate, remote client HUD는 OnRep 경로를 사용해 같은 bind 지점으로 모음.
- GripGun은 projectile actor가 아닌 server-side camera-viewpoint single Line Trace임.
- Cleanse tuning 수치는 Blueprint CDO/runtime 확인 전 audience-facing 고정값으로 사용하지 않음.
