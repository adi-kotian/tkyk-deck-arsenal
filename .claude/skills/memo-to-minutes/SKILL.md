---
name: memo-to-minutes
description: Generate meeting minutes from an approved DA2 memo. Reads Projects/<slug>/memo.md and writes Projects/<slug>/artifacts/minutes.md in a decisions / action-items / parking-lot shape. Triggers on "draft minutes", "meeting minutes from memo", "minutes for <project>", "generate minutes". Handles the case where the memo isn't actually from a meeting (project-context document) by marking the artifact as unmapped and continuing — the user can edit.
---

# memo-to-minutes

Generate meeting minutes from an approved DA2 memo. The minutes are a
derived artifact for distributing to people who weren't present, or for
the project log. They share the memo's context but are shaped for "this
is what we decided and what's next."

## Inputs

1. **The memo** at `Projects/<slug>/memo.md`. Must have `status: approved`
   in frontmatter — if `status: draft`, stop and surface that.
2. **The order** at `Projects/<slug>/order.md` for the title field.
3. **(Optional) user-supplied meeting context** — if the user names a
   meeting date, attendees, or a specific agenda item, weave it in. If
   not, generate from memo alone and flag the unknowns.

## Output

Exactly one file: `Projects/<slug>/artifacts/minutes.md`.

Frontmatter:

```yaml
---
memo: ../memo.md
memo_version: <copy from memo's frontmatter version>
generated: YYYY-MM-DD
status: draft
meeting_type: project-recap | decision-review | working-session | unmapped
attendees: []           # populate if known; leave empty otherwise
---
```

Body sections in order:

### Meeting
- Date (if known; else `?`)
- Attendees (if known; else `?`)
- Subject — the order's title, sharpened

### Decisions
What was decided. Each as a one-liner. Source: memo's thesis and the
load-bearing key points (the ones that are claim-shaped, not
question-shaped).

```
- <one-line decision>
- <one-line decision>
```

### Action items
Concrete next steps. Each as `- [ ] <owner> — <action> — <by when>`. If
owner/when unknown, use `?`. Sources:

- Memo's `open_questions` that are action-shaped ("decide on X" → "owner
  ? — decide X — ?")
- Sources listed in the memo that need to be read or reviewed
- Any explicit todo-shaped lines in the memo

```
- [ ] ? — Review and decide on X — ?
- [ ] AK — Confirm Y with stakeholders — by Fri
```

### Parking lot
Issues raised but not resolved. Memo's open questions that aren't
action-shaped (questions about scope, philosophy, future direction) go
here. Each as a one-liner.

### Sources cited
Every URL or path from the memo's `sources:` block. Markdown links if
they're URLs; plain paths otherwise.

## When the memo isn't meeting-shaped

If the memo is clearly a project-context document with no meeting
provenance (no attendees in `recipients:`, the order's purpose is
`internal` or `teach`, no meeting-shaped language), set
`meeting_type: unmapped` in the frontmatter and prepend a note above
the Meeting section:

> **Note:** This memo is project context, not a meeting record. The
> minutes below interpret the memo content as if it had been discussed
> and decided in a meeting. Treat as a scaffold for a future meeting,
> or edit liberally to match a meeting that actually happened.

Continue with the structure anyway — the scaffold is still useful.

## Hard rules

1. **Read-only** on `memo.md` and `order.md`. Never modify them.
2. The artifact's `status:` is `draft`. There's no formal approval gate
   for derived artifacts — the user reads, edits, ships. No `approve
   minutes` ceremony.
3. **Don't invent attendees or dates.** Leave `?` placeholders.
4. **Don't invent decisions or action items not supported by the memo.**
   The memo is the substrate. If the memo doesn't support a clear
   decision on a topic, don't manufacture one.
5. **Don't write anywhere except** `Projects/<slug>/artifacts/minutes.md`.
6. **Don't read or modify** anything in `engine/`.
7. **Regeneration check:** if `minutes.md` already exists with a
   matching `memo_version`, surface that and ask before overwriting:
   "Minutes already exist for memo v<N>. Reply `yes, regenerate
   minutes` to overwrite, or describe a specific revision."

## Return contract

End with a one-line summary:
- File path
- Number of decisions extracted, action items extracted, parking-lot
  items extracted
- `meeting_type` chosen
- Any unknowns flagged for the user to fill (attendees, dates, owners)
