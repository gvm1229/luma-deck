# pragmata-2p-final

이 폴더는 gitignored LumaDeck authoring project.

AI agents should read `AGENTS.md` in this folder before editing this deck.

## 실행

```bash
pnpm lumadeck dev pragmata-2p-final
pnpm lumadeck build pragmata-2p-final
```

## 편집 우선순위

1. `slides.md`
2. `components/`
3. `styles/`
4. `uno.config.ts`
5. `deck.json`, 초기 구조 재생성이 필요할 때만

`slides.md`, Vue components, styles가 실제 제작 source of truth.
`deck.json`에서 다시 render할 때는 기존 `slides.md`가 백업된 뒤 덮어쓰기됨.
