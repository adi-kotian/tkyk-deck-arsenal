---
description: Export the rendered slide as HTML and PDF and land them in Projects/<slug>/exports/. Manual download from the browser; the script moves files to the project folder.
---

# /da2-finalize

Capture the finished deck as a single-file HTML and a print-ready PDF,
land both in `Projects/<slug>/exports/`, and close the project log.

## Why this is half-manual

open-slide's HTML and PDF export functions run **in the browser**, not on
the command line. HTML export triggers a `<a download>` click (file lands
in `~/Downloads/<slug>.html`). PDF export calls `window.print()` and
relies on the browser's "Save as PDF" dialog. There is no headless CLI
export — we'd need to add Puppeteer/Playwright to get there, and we
explicitly chose not to.

So `/da2-finalize` does the orchestration: opens the editor, prompts you
to click the two export buttons, then moves the downloaded files into
the project's `exports/` folder with stable filenames.

## Procedure

### 1. Identify the project

If the user named a project (slug or path), use that. Otherwise list
projects with `index.tsx` present (composed but possibly not finalized)
and ask via `AskUserQuestion`. Default to most-recently-modified.

### 2. Sanity checks

Stop early if any of these is true:

- `Projects/<slug>/index.tsx` doesn't exist → "compose first via /da2-advance"
- `storyboard.yaml` has `status: draft` → "approve storyboard first"
- `Projects/<slug>/exports/deck.html` and `deck.pdf` both already exist
  and are newer than `index.tsx` → "already finalized; refinalize? reply
  **`yes, refinalize`**"

### 3. Open the editor

Invoke `./scripts/da2-open.sh <slug>` via Bash. The script checks the
dev server is up and opens `http://localhost:5173/s/<slug>`. If the
server's down, surface the script's error and stop.

### 4. Prompt the user to export

Tell the user:

> The deck is open at http://localhost:5173/s/<slug>. To finalize:
>
> 1. Click **Download HTML** in the slide's top-right menu. The file
>    saves to `~/Downloads/<slug>.html` (or `.zip` if the deck has
>    assets).
> 2. Click **Download PDF**. A print dialog opens — save as PDF to
>    your Downloads folder; **leave the default filename alone**.
>    open-slide's PDF export uses `window.print()`, so the file lands
>    as the deck's *title* (not slug) — e.g. `Q1 Pipeline Review.pdf`.
>    `scripts/da2-finalize.sh` reads `order.md`'s title field and
>    matches that pattern, so no manual rename is needed.
>
> When both files are in ~/Downloads, reply **`exports ready`**.

Wait for the user's reply. If they reply something other than
`exports ready` (case-insensitive), treat it as a question or revision
intent — answer or surface as appropriate.

### 5. Move files into the project

Invoke `./scripts/da2-finalize.sh <slug>` via Bash. The script:

- Finds the most recent `~/Downloads/<slug>.{html,pdf,zip}` files
  (handles browser auto-rename like `<slug> (1).html`)
- Moves them into `Projects/<slug>/exports/` with stable filenames:
  `deck.html` (or `deck.zip`), `deck.pdf`
- Updates `log.md`
- Prints what it moved

If the script fails (file not found in Downloads), surface the error
and either ask the user for the actual path or ask them to try the
download again.

### 6. Confirm and offer Phase 5

Tell the user the deck is finalized, give them computer:// links to
`Projects/<slug>/exports/deck.html` and `deck.pdf`. Then offer:

> The deck is finalized. The memo is the same context that feeds the
> minutes and one-pager artifacts. Want me to draft those now?
> Reply **`minutes`**, **`one-pager`**, **`both`**, or **`no`**.

If the user picks any of those, dispatch the relevant Phase 5 skills
(`memo-to-minutes`, `memo-to-one-pager`) — provided Phase 5 has
shipped. If it hasn't, tell the user those skills land in Phase 5 and
stop.

## Hard rules

1. **Don't auto-download anything.** open-slide's export is browser-side
   and that's intentional. No Puppeteer, no curl-fetch tricks.
2. **Don't overwrite without confirmation.** If exports/ already
   contains a deck file newer than `index.tsx`, ask before overwriting.
3. **Use the project's slug, not the title.** Filenames in `exports/`
   are always `deck.html` and `deck.pdf` — the project folder name is
   the slug provenance.
4. **Never modify `engine/`.**
5. **Approval for refinalize is `yes, refinalize`** (case-insensitive).
   Anything else is a no.
