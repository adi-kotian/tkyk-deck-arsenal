# Themes

Each `<theme-id>.md` here defines a theme: palette, typography, motion,
layout primitives, component index, voice. Discovered by the engine
via `themesDir: '../../../themes'` in
`engine/apps/demo/open-slide.config.ts`.

A theme markdown file follows open-slide's theme contract. The
engine's `create-theme` skill (under
`engine/apps/demo/.claude/skills/create-theme`) documents that
contract — read it before authoring a theme by hand.

## Shipped

| Theme | Aesthetic | Files |
| --- | --- | --- |
| `taikyoku` | Cool→warm gradient cover, paper-white content. Prata display + Helvetica Neue tracked caps + Inter body + JetBrains Mono numerics + HomuraM/Noto for Japanese. Single purple accent; one rationed gold moment per deck; semantic-red for data-negative + blocked steps. Production-grade Phase-7-reconciled system with 19-component Tier-1 library, per-deck font subsetting, and per-deck light/dark via `var(--tk-*)` tokens. | `taikyoku.md` (contract) · `taikyoku.demo.tsx` (Phase 6.1 frozen baseline) · `taikyoku.gallery.tsx` (Phase 9 gallery) · `taikyoku/COMPOSITION.md` (composition spec) · `taikyoku/REFINEMENT.md` (decision log) · `taikyoku/components/*.tsx` (19 components) · `taikyoku/assets/{fonts,logos}/` |

Open `http://localhost:5173/themes/taikyoku` (with `pnpm dev` running)
to see the demo deck rendered, or
`scripts/da2-open.sh 2026-05-19_taikyoku-master-reference` for the
current master-reference catalogue.

## Reference

The vendored engine ships its own example themes inside
`engine/apps/demo/themes/`. Those are not discovered by the dev server
(because `themesDir` points here), but they remain on disk as
reference. To borrow a layout idea, read those markdown files — don't
symlink or copy without making it your own.
