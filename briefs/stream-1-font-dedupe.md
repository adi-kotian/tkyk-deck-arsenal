---
doc: stream-1-font-dedupe
status: brief + optional CC prompt
written: 2026-05-19 (Cowork flatten pass)
audience: future Claude Code session implementing the font workflow tightening
---

# Stream 1 — Font workflow audit + optional finalize-time auto-subset

## TL;DR

**There is no font duplication problem.** The 14 MB number quoted in
HANDOFF.md (and the earlier stream-1 framing) refers to the theme's
source-of-truth font payload, not duplication across decks. The
inventory below confirms only one deck carries its own font copies
(the bilingual reference, ~367 KB subset — by design), and master-
reference imports the theme fonts via Vite (correct).

What this brief contains:
1. The font workflow as it stands (just so it's written down).
2. The inventory (2026-05-19 snapshot).
3. **Optional CC prompt** — wire `da2-finalize.sh` so it can offer to
   run the subset script automatically for JP decks (currently
   advises but doesn't act). The current advisory behaviour is fine;
   this is a quality-of-life upgrade, not a defect fix.

## 1. The workflow as designed

Three layers, all consistent with the existing code:

### Layer 1 — Theme source-of-truth (`themes/taikyoku/assets/fonts/`)

Three woff2 files: `HomuraM-Medium.woff2` (4.6 M), `HomuraM-SemiBold.woff2`
(4.6 M), `HomuraM-Display.woff2` (4.8 M) — ~14 MB total. **Read-only**;
never modified. Source: converted from licensed `.otf` (`Assets/Branding/
Fonts/GMingChao-*` outside DA2) in Phase 8.

A deck *may* import directly from here via Vite cross-dir import (the
proven pattern for the master-reference). That carries the full 14 MB
in the deck's bundle.

### Layer 2 — Per-deck subset (`Projects/<slug>/assets/fonts/`)

For Japanese decks, before finalize: run

```bash
./scripts/da2-subset-fonts.sh <slug>
```

The script:
1. Scans `Projects/<slug>/*.tsx` for unique codepoints + an ASCII /
   JP-punctuation / kana safety base.
2. Runs `fontTools.subset` on the source woff2 → writes
   `Projects/<slug>/assets/fonts/HomuraM-{Medium,SemiBold,Display}.woff2`.
3. Reports per-font + total reduction. Verified ratio: **13.9 M → 367 K
   (−97.4 %)** on the bilingual reference deck.

The deck then imports `./assets/fonts/HomuraM-*.woff2` (its own subset)
instead of the shared theme fonts. Rare glyphs not in the subset
degrade to Noto Serif JP (the documented fallback).

### Layer 3 — `da2-finalize.sh` advisory

When finalizing, the script greps the deck's `index.tsx`. If it imports
`themes/taikyoku/assets/fonts/HomuraM` AND has no `Projects/<slug>/
assets/fonts/HomuraM-Medium.woff2`, it prints a non-fatal warning
advising the user to run `da2-subset-fonts.sh` and repoint imports
before the browser export.

## 2. Inventory (2026-05-19)

```
themes/taikyoku/assets/fonts/                                    14 M
├── HomuraM-Display.woff2                                       4.8 M
├── HomuraM-Medium.woff2                                        4.6 M
└── HomuraM-SemiBold.woff2                                      4.6 M

Projects/2026-05-19_taikyoku-master-reference/                   52 K
  (no local fonts; imports theme fonts via Vite — correct for a
   reference catalogue, accepts the 14 MB bundle)

Projects/_archive/2026-05-18_taikyoku-bilingual-ref/            396 K
└── assets/fonts/                                               367 K
    ├── HomuraM-Display.woff2                                   124 K
    ├── HomuraM-Medium.woff2                                    124 K
    └── HomuraM-SemiBold.woff2                                  124 K
    (deck-local subset — correct; ~97% reduction verified here)

Projects/_archive/<8 other decks>                                — no fonts
```

Net: every deck on the workflow is in its correct state. No
duplication. Master-reference's 14 MB bundle is by design (reference
catalogue, not a production deliverable).

## 3. CC prompt — finalize-time auto-subset (optional)

This is a quality-of-life upgrade. Drop into Claude Code, paste the
prompt below, and the model will produce the patch.

---

### Prompt

> In `scripts/da2-finalize.sh`, the JP-font advisory block at lines
> ~46–55 currently prints a warning when the deck imports the shared
> `themes/taikyoku/assets/fonts/HomuraM` and has no per-deck subset.
> Upgrade it so that — instead of just warning — the script offers to
> run the subset for the user and patch the deck's imports.
>
> Requirements:
>
> 1. **Detection unchanged.** The same grep + per-deck-fonts-absent
>    check determines whether the offer fires.
> 2. **Interactive prompt** (skip if `DA2_NONINTERACTIVE=1`): ask
>    "Run `scripts/da2-subset-fonts.sh <slug>` now and rewrite the
>    deck imports to `./assets/fonts/HomuraM-*.woff2`? [y/N]".
> 3. **On `y`:** invoke `scripts/da2-subset-fonts.sh <slug>` (exit
>    non-zero on failure — surface stderr verbatim). Then, on success,
>    rewrite `Projects/<slug>/index.tsx`:
>    - Replace each `'../../themes/taikyoku/assets/fonts/HomuraM-Medium.woff2'`
>      → `'./assets/fonts/HomuraM-Medium.woff2'`
>    - Same for SemiBold and Display.
>    - Match both single-quoted and double-quoted import strings.
>    - Use `sed -i` (BSD `sed` quirk: use `sed -i ''` on macOS, or
>      pipe through `cat`/temp file — the script already runs both
>      macOS and Linux, so pick a portable form).
>    - Verify the rewrite by re-grepping for `themes/taikyoku/assets/
>      fonts/HomuraM` — non-zero matches after rewrite ⇒ error.
> 4. **On `N` or skipped:** keep the existing warning text. Add one
>    extra line: "Run with `DA2_AUTOSUBSET=1` to auto-accept on next
>    invocation."
> 5. **Honour `DA2_AUTOSUBSET=1` env var** to skip the prompt and
>    proceed as if `y`. Documented in the script's top comment.
> 6. **Idempotent.** If the deck imports already point at
>    `./assets/fonts/HomuraM-*` and the subset files exist, the script
>    is silent on this — no warning, no offer.
>
> Don't change anything else in `da2-finalize.sh`. Don't introduce a
> dependency on jq or any non-stdlib tool (the subset script already
> requires `fontTools` + `brotli` via pip; that's the only
> heavyweight dep).
>
> After the patch:
> - Verify the script still passes `shellcheck` (or document any
>   suppressed warnings).
> - Add a one-line entry to `Projects/<slug>/log.md` capturing the
>   auto-subset action (timestamp + "auto-subsetted via /da2-finalize")
>   on success.
> - Update `taikyoku.md` → "Per-deck subsetting (Phase 9 — shipped)"
>   to mention the new auto-subset path alongside the manual one.

---

## 4. What's deliberately NOT in scope

- **Subsetting at compose time** (not finalize). Considered, rejected
  in Phase 9 Increment 4 — the codepoint set isn't stable until copy
  is final, so re-subsetting on every recompose wastes work.
- **Auto-deleting shared theme fonts** from `themes/taikyoku/assets/
  fonts/`. Those are source-of-truth; removing them would break
  master-reference and any future ref deck.
- **Per-component subsetting.** Components don't ship their own
  fonts — they declare font-family strings only. The font payload is
  always deck-level (theme or deck-local subset).
