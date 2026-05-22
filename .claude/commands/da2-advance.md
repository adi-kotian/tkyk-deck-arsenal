---
description: Detect a Deck Arsenal 2 project's current stage from its filesystem and run the next stage. The "what's next" button — one stage per invocation.
---

# /da2-advance

Look at a project folder and run the next stage based on what files
exist. This is the filesystem-as-state-machine in action.

## Procedure

### 1. Identify the project

If the user named a project (slug, folder name, or path), use that.
Otherwise, list `Projects/*/` (skip `Projects/README.md`), show
modification times, and ask via `AskUserQuestion` which one. Default to
the most recently modified.

### 2. Detect the current stage

Inspect the project folder and the frontmatter of any state files:

| State | Files / frontmatter | Next action |
| --- | --- | --- |
| Order only | `order.md` present, no `memo.md` | Dispatch `memo` subagent |
| Memo drafted | `memo.md` present, frontmatter `status: draft` | Stop — ask for approve / revise |
| Memo approved, no storyboard | `memo.md` with `status: approved`, no `storyboard.yaml` | Dispatch `storyboard` subagent |
| Storyboard drafted | `storyboard.yaml` with `status: draft` | Stop — ask for approve / revise |
| Storyboard approved, no blueprint | `storyboard.yaml` with `status: approved`, no `blueprint.yaml` | Dispatch `blueprint` subagent |
| Blueprint drafted (any beat draft) | `blueprint.yaml` exists, top-level `status: draft` (or any beat `status: draft`) | Stop — show which beats are still draft; ask for `approve blueprint <id>` / `approve blueprint all` / `revise blueprint <id>: …` |
| Blueprint stale | `blueprint.yaml` exists, top-level `status: stale` (storyboard_version drift) | Stop — surface the version mismatch; tell the user to re-dispatch blueprint after the new storyboard |
| Blueprint approved, no slide | `blueprint.yaml` with `status: approved`, no `index.tsx` | Dispatch `compose-deck` subagent, then open browser |
| Composed, not finalized | `index.tsx` present, no `exports/deck.html` or `exports/deck.pdf` | Tell the user to run `/da2-finalize` when satisfied with the rendered deck. |
| Finalized | `exports/deck.html` or `exports/deck.pdf` present | Tell the user the project is finalized; suggest derived artifacts (Phase 5: `memo-to-minutes`, `memo-to-one-pager`). |

Phase 3 covers compose. Phase 4 (finalize) is reached via `/da2-finalize`,
not by `/da2-advance` — `/da2-advance` just tells the user that's the
next move. Phase 5 (derived artifacts) is not shipped yet — surface that
and stop if detection lands there.

### 3. Dispatch and gate

#### Draftable stages (memo / storyboard not yet written)

- Dispatch the relevant subagent via the `Agent` tool with the
  appropriate `subagent_type`. Pass the project path and any feedback
  context.
- After it returns, present the artifact summary to the user.
- End with the structured approval prompt for that stage.

#### Blueprint stage (storyboard approved, no blueprint)

- Dispatch the `blueprint` subagent. Pass the project path. It reads
  memo + storyboard + theme + COMPOSITION.md + component headers, and
  writes `Projects/<slug>/blueprint.yaml` + the wireframe deck at
  `Projects/<slug>-blueprint/`. It returns a prose summary + a
  **per-beat manifest** (fenced YAML block, `manifest: …`).
- After it returns, **open the wireframe** in the browser:
  `./scripts/da2-open.sh <slug>-blueprint`.
- Then **drive the interactive approval walk** (next subsection).

#### Blueprint approval walk (interactive)

The blueprint subagent's return manifest is the input. Walk it via
`AskUserQuestion`:

1. **Up-front shortcut.** Single question with two options:
   - `Approve all beats now` — flip every still-draft beat +
     top-level `status: approved`; regenerate wireframe badges; tell
     the user `/da2-advance` will dispatch compose-deck on the next
     invocation. Done.
   - `Walk through each beat` — proceed to step 2.

2. **Per-beat loop.** For each beat in the manifest with
   `status: draft`, ask via `AskUserQuestion`:
   - Header: `<beat-id>`
   - Question: `Beat <id> (<layout_preset>, N shadows). <note>.
     Approve, revise, or skip?`
   - Options:
     - **Approve this beat** — edit `blueprint.yaml`: flip that
       beat's `status: draft` → `status: approved`; append a log
       entry; move to the next beat.
     - **Revise this beat** — follow up in prose: "What should
       change about `<id>`? Paste wireframe comments, or describe."
       When the user replies, re-dispatch the `blueprint` subagent
       scoped to that beat with the feedback. After the subagent
       returns, re-emit the wireframe and resume the walk at the
       next beat.
     - **Skip (leave as draft)** — leave the beat in `status: draft`;
       move on. The user can return via `/da2-advance` later.

3. **After the walk.**
   - If every beat is now `approved`: flip top-level
     `status: draft` → `status: approved`; regenerate wireframe
     badges; append `<YYYY-MM-DD HH:MM> approved blueprint (all
     beats via walk)` to `log.md`; tell the user `/da2-advance`
     will dispatch compose-deck on the next invocation.
   - If any beats remain `draft`: list which ones; stop. The user
     can re-run `/da2-advance` to resume from those.

The textual phrases (`approve blueprint <id>` / `approve blueprint all`
/ `revise blueprint <id>: …`) remain a **fallback** for users who
prefer to type — they bypass the AskUserQuestion walk entirely and are
detected in step 4 below.

#### Compose stage (blueprint approved, no slide)

- Dispatch the `compose-deck` subagent. Pass the project path. The
  subagent reads memo + storyboard + **approved blueprint** + theme +
  slide-authoring contract, writes `Projects/<slug>/index.tsx`,
  returns a summary.
- After it returns, **invoke the open script** via Bash:
  `./scripts/da2-open.sh <slug>` (with the slug being the project's
  folder name, e.g. `2026-05-19_taikyoku-master-reference`).
- The script checks the dev server is up and opens
  `http://localhost:5173/s/<slug>`. If the dev server isn't running, the
  script prints instructions and exits non-zero — surface that to the
  user so they can start `pnpm dev`.
- Append a log entry to `log.md`: `<YYYY-MM-DD HH:MM> composed via /da2-advance`.

There is **no approval gate after compose**. Editing happens in the
browser via open-slide's inspector. The user reaches "approval" by
choosing to run `/da2-finalize` (Phase 4) when satisfied.

#### Approval-pending stages (status: draft)

For memo / storyboard: don't dispatch. Just present the current state
and ask:

> The <memo|storyboard> at `<path>` is currently `status: draft`. Reply
> **`approve <memo|storyboard>`** to advance, or describe what to revise.

For blueprint: the interactive walk above is the default. If the user
returns to a project mid-walk (some beats approved, some still draft),
re-read `blueprint.yaml` to find draft beats and resume the walk from
the first one.

### 4. Approval phrase detection

Match case-insensitively. Accept:
- For memo: `approve memo`, `approved memo`, `memo approved`
- For storyboard: `approve storyboard`, `approved storyboard`, `storyboard approved`
- For blueprint (per-beat): `approve blueprint <beat-id>` —
  case-insensitive on the verb, exact-match on the beat-id (key from
  `blueprint.yaml`'s `beats[].id`).
- For blueprint (whole deck): `approve blueprint all`.
- For blueprint revision: `revise blueprint <beat-id>: <feedback>` —
  re-dispatches the blueprint subagent on just that beat.

On memo / storyboard approval:
- Edit the relevant file's frontmatter: `status: draft` → `status: approved`.
- Append a log entry to `log.md`: `<YYYY-MM-DD HH:MM> approved <stage>`.
- Tell the user to run `/da2-advance` again for the next stage. **Do not
  auto-chain.**

On blueprint per-beat approval (`approve blueprint <id>`):
- Edit `blueprint.yaml`: flip that beat's `status: draft` → `status: approved`.
- If every beat is now `approved`, also flip the top-level
  `status: draft` → `status: approved`.
- Regenerate the wireframe deck — the simplest correct move is to
  re-dispatch the blueprint subagent in "badge-refresh" mode
  (preserve every shadow; only re-emit the per-page `BLUEPRINT •
  DRAFT/APPROVED` badge to reflect the new status). If that's
  expensive, a hand-edit to the wireframe's per-page badge constant
  is acceptable as long as the page identifiers remain in lockstep
  with `blueprint.yaml`'s beat ids.
- Append a log entry to `log.md`:
  `<YYYY-MM-DD HH:MM> approved blueprint beat <id>`.
- Tell the user the per-beat result and what remains to be approved.

On `approve blueprint all`:
- Flip every still-`draft` beat to `approved`; flip top-level to
  `approved`; regenerate the wireframe badges in one pass.
- Append `<YYYY-MM-DD HH:MM> approved blueprint (all beats)`.
- Tell the user `/da2-advance` will now dispatch compose-deck on the
  next invocation.

On `revise blueprint <id>: <feedback>`:
- Re-dispatch the blueprint subagent with the user's feedback scoped
  to that beat. The subagent preserves every other beat's shadows +
  per-beat status verbatim.

On any other revision request:
- Re-dispatch the relevant subagent with the user's message as the
  revision feedback.
- Repeat from step 3.

### 5. Upstream-gap routing

If the storyboard subagent returns flagging a memo-level issue, present:

> The storyboard subagent surfaced a memo-level issue: <summary>. Reply
> **`yes, revise memo`** to re-dispatch the memo subagent, or describe a
> storyboard-only fix.

If the blueprint subagent returns flagging a storyboard-level issue
(beat has no facts/quotes to substantiate the shadows), present:

> The blueprint subagent surfaced a storyboard-level issue: <summary>.
> Reply **`yes, revise storyboard`** to re-dispatch the storyboard
> subagent, or describe a blueprint-only fix.

If the compose-deck subagent refuses because of `[NEEDS CONTENT]`
placeholders, a draft storyboard, or a missing/draft/stale blueprint,
present:

> compose-deck refused: <reason>. Want me to re-dispatch the
> <storyboard|blueprint> subagent? Reply **`yes, revise <stage>`** or
> describe the fix.

Do not auto-route. Confirm.

## Hard rules

1. **One stage per invocation.** Never chain approve-and-advance in a
   single command. The compose stage is the only one without an
   approval gate, but it still consumes one invocation.
2. Approval is explicit user input. Never infer.
3. Never edit files inside `engine/` (the slide-authoring skill is
   read-only reference for compose-deck and that's it).
4. If detection returns an unknown state (files in unexpected
   combinations), stop and ask the user to clarify. Don't guess.
5. Use relative paths inside DA2.
