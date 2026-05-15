---
description: Start a new Deck Arsenal 2 project. Reads Inbox/ for an order or collects fields inline; scaffolds Projects/<YYYY-MM-DD_slug>/; dispatches the memo subagent and pauses for approval.
---

# /da2-new

Run the order → memo stage end-to-end with one approval gate at the end.

## Procedure

### 1. Find or collect the order

Look in `Inbox/` for any `*.md` file. If one exists:
- Read its frontmatter. Confirm it follows `Templates/ORDER.md`.
- Note its `slug:` field.

If no order is in Inbox, ask the user via `AskUserQuestion` for the order
fields (one multi-question call): title, slug, audience, purpose, length,
deadline, recipe (optional), theme (optional), sources, artifacts.

Write the order file you'll use inside the project folder in step 2. Don't
ask the user to put it in Inbox first — that's optional, not required.

### 2. Scaffold the project folder

Get today's date via Bash: `date +%Y-%m-%d`.

Create `Projects/<YYYY-MM-DD>_<slug>/`. Inside it:
- `order.md` — copy from Inbox (then delete the Inbox copy) or write the
  inline version. If copying, preserve frontmatter exactly.
- `sources/` — empty directory.
- `artifacts/` — empty directory.
- `exports/` — empty directory.
- `log.md` — one line: `<YYYY-MM-DD HH:MM> created via /da2-new`.

### 3. Dispatch the memo subagent

Use the `Agent` tool with `subagent_type: memo`. Pass in the prompt:
- The absolute path to the new project folder.
- The order path.
- The list of source paths from the order's `sources:` field.
- "This is a first draft."

Wait for the subagent to return.

### 4. Present and pause

Read the memo at `Projects/<slug>/memo.md`. Show the user:
- The project folder path
- A 2-line summary of what the memo claims (audience, thesis)
- The link to the file (use a `computer://` URL if running in Cowork)

Then end with the exact prompt:

> Reply **`approve memo`** to advance to the storyboard stage. To revise,
> describe what to change.

Stop. Wait for input.

### 5. Handle the response

- If the user replies `approve memo` (case-insensitive, also accept
  "approved memo" or "memo approved"): edit `memo.md`'s frontmatter to set
  `status: approved`, append a log entry, and tell the user to run
  `/da2-advance` to continue to storyboard. **Do not auto-advance.**
- If they describe revisions: re-dispatch the memo subagent with the
  feedback. Repeat from step 4.
- If they say something ambiguous: ask once for clarification using the
  exact phrases as a hint.

## Hard rules

1. Never auto-advance past the memo gate. Approval is the user's word, not
   inferred from silence.
2. If the memo subagent fails or returns something malformed, surface the
   error and stop. Don't improvise the memo yourself.
3. Don't read or write anything inside `engine/`. The pipeline only touches
   `Projects/`, `Inbox/`, and `log.md`.
4. Use relative paths inside DA2. The folder is portable.
5. If a project folder for today's date + that slug already exists, stop
   and ask: resume the existing one (read its state), or pick a different
   slug?
