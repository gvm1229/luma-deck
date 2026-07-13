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

- `images/`는 Git에 포함하지 않음
- `slides.md`의 상대 경로를 유지한 채 별도 백업에서 복원
- 빌드 전 누락 이미지 확인 필요
- `images/slide-08-camera-trace-illustration.png`: 슬라이드 8 카메라 기준 단일 시선 판정 설명용 생성 일러스트. 수동 이미지 백업에 반드시 포함
- `images/slide-08-camera-trace-illustration-v2.png`: 슬라이드 8 최종 일러스트. 플레이어 뒤 카메라 렌즈를 단일 Line Trace의 정확한 시작점으로 명시함. 수동 이미지 백업에 반드시 포함
- `images/slide-08-camera-aim-reference.png`: 슬라이드 8 카메라 시선과 총구 방향 비교 이미지. 출처 영상 `눈에서 총알이 튀어나오는 FPS 게임의 사격 판정` (`https://youtu.be/kucqGt8Q2a8`), SHA-256 `DE2F36C532EA562B783DB250DA7AEA1EB1D5606083D76F0D9642225D4AF87E72`. 수동 이미지 백업에 반드시 포함
