# Themes

Each `<theme-id>.md` here defines a theme: palette, typography, layout
primitives. Discovered by the engine via `themesDir: '../../../themes'` in
`engine/apps/demo/open-slide.config.ts`.

A theme markdown file follows open-slide's theme contract. The engine's
`create-theme` skill (under `engine/apps/demo/.claude/skills/create-theme`)
documents the contract — read it before authoring a theme by hand.

## Shipped

| Theme | Aesthetic | Lives at |
| --- | --- | --- |
| `taikyoku` | Cool→warm gradient cover + paper content. Prata + Archivo + Inter. Single purple accent with gold reserved for one moment per deck. Synthesis of Aurora's structural restraint and a Stripe/Linear product-launch register. | `taikyoku.md` + `taikyoku.demo.tsx` |

Open `http://localhost:5173/themes/taikyoku` (with `pnpm dev` running)
to see the theme's demo deck rendered.

## Reference

The vendored engine ships its own example themes inside
`engine/apps/demo/themes/`. Those are not discovered by the dev server
(because `themesDir` points here), but they remain on disk as reference.
To borrow a layout idea, read those markdown files — don't symlink or
copy without making it your own.
