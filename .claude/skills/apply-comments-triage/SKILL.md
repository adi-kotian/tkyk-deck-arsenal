---
name: apply-comments-triage
description: Pre-process `@slide-comment` markers in a DA2 deck — split by prefix (`fix:` / `decide:` / `brief:` / `ask:`), delegate `fix:` to the engine's `apply-comments` skill (the existing sweep), route `decide:` to `Projects/<slug>/log.md` "Pending decisions", route `brief:` to `themes/<theme>/REFINEMENT.md` "Pending brief changes", answer `ask:` in chat with no file edit, and run the P3.a render smoke-check (`scripts/da2-smoke-check.sh`) after any `fix:` sweep that touched the deck. Triggers on "apply comments", "sweep comments", "apply marker comments", "apply the inspector comments" when the target is a DA2 deck (`Projects/<slug>/index.tsx`). Bare unprefixed markers default to `fix:` for backward compatibility.
---

# apply-comments-triage

Stream 3 round 1. Layers comment-prefix triage (P1) + render
smoke-check (P3.a) on top of the engine's `apply-comments` skill —
without forking it. This is the user-facing entry point for "apply
comments" on a DA2 deck; the engine skill is called internally for the
`fix:` slice only.

## How it works

When triggered:

1. **Identify the target deck.** If the user named one (slug, folder
   name, or path), use that. Otherwise look for an active deck via the
   `current-slide` skill (engine-side) or ask. The target is always
   `Projects/<slug>/index.tsx`.
2. **Scan for markers.** Match the engine's authoritative regex:
   ```
   /\{\/\*\s*@slide-comment\s+id="(c-[a-f0-9]+)"\s+ts="([^"]+)"\s+text="([A-Za-z0-9_\-]+={0,2})"\s*\*\/\}/g
   ```
3. **Parse each marker.** Base64url-decode `text`, `JSON.parse` to
   `{ note, hint? }`. Inspect `note` for a one-word **prefix**
   (case-insensitive): `fix:`, `decide:`, `brief:`, `ask:`. Unprefixed
   → defaults to `fix:` (D5 backward compat).
4. **Split by class.** Three queues: fix-list, decide-list,
   brief-list, ask-list.
5. **Delegate `fix:` markers** to the engine's `apply-comments` skill.
   Invoke it via the Skill tool with the explicit deck path
   (`Projects/<slug>/index.tsx`). The engine skill applies the
   in-place edits and removes the markers — its existing behaviour,
   untouched. If the engine skill can't be invoked against a
   DA2-shaped path, fall back to applying `fix:` markers inline using
   its documented procedure (regex match, reverse-line-order apply,
   marker deletion).
6. **Route `decide:` markers** to `Projects/<slug>/log.md` under a
   "Pending decisions" section (create if missing). Format per D3 — see
   "Routing rules". Remove the marker from `index.tsx`.
7. **Route `brief:` markers** to `themes/<theme-id>/REFINEMENT.md`
   under its "Pending brief changes (open for user ruling)" section
   (the section template already lives above §1). Format per D3.
   Remove the marker from `index.tsx`.
8. **Answer `ask:` markers in the chat response.** Read the
   surrounding code context for the marker's target element, give a
   one- to two-sentence answer, and remove the marker from
   `index.tsx`. No file write beyond the marker removal.
9. **Run the smoke-check** (D4) IF the `fix:` queue was non-empty
   (anything that touched the deck file). See "Smoke-check
   integration" below. If `fix:` was empty (only decide/brief/ask), no
   smoke-check — the deck didn't change.

## Marker prefix grammar

```
@slide-comment fix:     a mechanical edit (default behaviour; matches engine apply-comments)
@slide-comment decide:  a doctrine question — route to log.md, surface for ruling
@slide-comment brief:   change the theme contract — route to REFINEMENT.md, surface for ruling
@slide-comment ask:     a question — answer in chat, no edit
```

The prefix is parsed from the start of the decoded `note` field,
case-insensitively, followed by a colon. Examples (decoded `note`):

- `"fix: align the eyebrow"` → fix
- `"decide: should this advocate or be neutral?"` → decide
- `"brief: allow tk-fadeOut for cover-only exits"` → brief
- `"ask: why is this card 18px and not 20?"` → ask
- `"align the eyebrow"` (no prefix) → defaults to fix

The prefix and its colon are stripped before delegation / routing —
the engine skill sees the trimmed note (`"align the eyebrow"`); the
queue entry uses the trimmed note as the description.

## Routing rules

### `decide:` → `Projects/<slug>/log.md`

Append to a top-level `## Pending decisions` section (create the
section if it doesn't exist; place it ABOVE the existing log content,
under the file title). One bullet per entry:

```markdown
## Pending decisions

- [ ] <YYYY-MM-DD> — <id-short> — <decoded note minus prefix> (route from `@slide-comment decide:`, marker id `c-<8hex>`)
```

`<id-short>` is the first 4 hex chars of the marker id (for cheap
disambiguation when the user types `approve decision c-1a2b`). The
date is today (YYYY-MM-DD).

### `brief:` → `themes/<theme>/REFINEMENT.md`

The `<theme>` is read from the deck's storyboard.yaml (`theme:` field),
or the project's blueprint.yaml. Default `taikyoku`.

Append under the `## Pending brief changes (open for user ruling)`
section (already templated above §1). One bullet per entry, same
format as above:

```markdown
- [ ] <YYYY-MM-DD> — <id-short> — <decoded note minus prefix> (route from `@slide-comment brief:`, marker id `c-<8hex>`)
```

### Approval / rejection phrases (detected by `/da2-advance` or the orchestrator)

| Phrase | Effect |
| --- | --- |
| `approve decision <id-short>` | Move the entry from "Pending …" into the relevant numbered section + appendix per the existing supersession pattern. Tick the checkbox; preserve the line struck through as the historical breadcrumb. |
| `reject decision <id-short>: <reason>` | Strike the entry through, append `**rejected:** <reason>`; leave in place as a "we considered and declined" record. |

### `ask:` → chat response, no file write

In the reply summary, list each `ask:` with the decoded note and a
short answer. Remove the marker from the deck. Don't write anywhere.

## Smoke-check integration

After step 5 (the `fix:` delegation), if any markers were applied to
the deck file, invoke:

```bash
./scripts/da2-smoke-check.sh <slug>
```

Capture exit code:

- **Exit 0** — append `✓ render smoke-check clean` to the return
  summary.
- **Exit 1** — surface the offending log excerpt in the return
  summary, abort the "done" report:
  > ✗ render smoke-check FAILED. The sweep transformed cleanly but the
  > deck did not render. Excerpt:
  > ```
  > <offending lines from smoke-check>
  > ```
  > Re-inspect the deck before declaring this sweep done.
- **Exit 2** — the smoke-check couldn't run (the dev server wasn't
  started via `scripts/da2-dev.sh`). Surface that to the user:
  > ⚠ Smoke-check not available — start the dev server via
  > `./scripts/da2-dev.sh` (instead of bare `pnpm dev`) to enable
  > runtime-error detection. The `fix:` sweep itself completed
  > successfully.

## Hard rules

1. **Never fork or edit the engine's `apply-comments` skill** at
   `engine/apps/demo/.claude/skills/apply-comments/SKILL.md`. It is
   read-only engine reference. The triage skill layers on top.
2. **Never silently edit `REFINEMENT.md` or `taikyoku.md`** off a
   `brief:` comment. The queue → user-ruling path is the only way.
3. **Never silently edit the live deck** off a `decide:` comment. The
   queue → user-ruling path is the only way.
4. **Never move a queue entry from "Pending" to "resolved" without an
   explicit user approval phrase** (`approve decision <id>` /
   `reject decision <id>: <reason>`). The triage skill writes the
   "Pending" entry; the user (via `/da2-advance` or the orchestrator)
   resolves it.
5. **Preserve unprefixed markers as `fix:`** (D5 backward compat). No
   migration of existing decks required.
6. **Apply `fix:` markers in reverse line order** when handling them
   inline (the engine skill does this; the fallback path must too).
   Top-down processing invalidates line numbers as the file shrinks.
7. **Never leave a marker behind.** Every marker, regardless of class,
   is removed from `index.tsx` after its triage destination has been
   reached. An un-removed marker signals a failure.
8. **Don't touch files outside the project folder + the two queue
   destinations** (`Projects/<slug>/log.md` and
   `themes/<theme>/REFINEMENT.md`). No edits to memo, storyboard,
   blueprint, components, or any other doc.

## Return contract

End every sweep with:

1. **Counts per class.** Example:
   > `fix: 7 applied · decide: 2 queued (log.md) · brief: 1 queued (REFINEMENT.md) · ask: 1 answered`
2. **Smoke-check status** (only if `fix:` was non-empty):
   `✓ render smoke-check clean` OR `✗ render smoke-check FAILED — <excerpt>` OR `⚠ smoke-check unavailable`.
3. **Queue entries that need user attention.** List each new
   "Pending" entry by id-short + one-line summary, with the exact
   approval phrase to use:
   > New pending entries — review and rule:
   > - `c-1a2b` (decide, log.md) — should this advocate or be neutral?
   >   → `approve decision c-1a2b` / `reject decision c-1a2b: <reason>`
   > - `c-3c4d` (brief, REFINEMENT.md) — allow `tk-fadeOut` for cover exits?
   >   → `approve decision c-3c4d` / `reject decision c-3c4d: <reason>`
4. **Ask answers** (inline in the summary, not a separate file).
