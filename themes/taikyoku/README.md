# Taikyoku — files in this directory

| File / dir | Role |
| --- | --- |
| `COMPOSITION.md` | The composition spec — how compose-deck assembles a deck from the component library. §1.5 owns slide anatomy + named layouts + density floor + the support kit. Read whenever theme = taikyoku. |
| `REFINEMENT.md` | The decision log. Top: current state of every locked rule. Bottom: superseded-history appendix (load-bearing — prevents re-litigating reversals). |
| `components/` | 19 Tier-1 components (Phase 9). One `.tsx` per archetype, each hook-free, each redeclaring its own tokens (`c`) and fonts (`f`) inline for portability. Header comment per file is the authoritative slot/prop contract. Use the components as the spec; compose-deck **transcribes** them into the deck's `index.tsx` (one-file rule, COMPOSITION §1). |
| `assets/fonts/` | Bundled **HomuraM** ×3 (Medium, SemiBold, Display — ~14 MB total). The source-of-truth for Japanese display type. **Decks never ship the full theme fonts** — `scripts/da2-subset-fonts.sh <slug>` cuts them to ~120 KB per weight (~97% smaller) and writes the subset to `Projects/<slug>/assets/fonts/`. Theme fonts are read-only. |
| `assets/logos/` | TKYK brand mark — `TKYK-mark-dark.svg` (for light/gradient backgrounds) and `TKYK-mark-white.svg` (for dark/video backgrounds). Decks reference them via Vite import from `Projects/<slug>/assets/` (copy on use; do not relative-`url()` from a `<style>` block — open-slide's dev server won't serve it). |

The theme contract itself lives one level up at `../taikyoku.md`.
