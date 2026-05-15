---
name: memo-to-one-pager
description: Generate a polished, distributable single-page document from an approved DA2 memo. Reads Projects/<slug>/memo.md and writes Projects/<slug>/artifacts/one-pager.md in a "what it means / what we're doing / what we need" three-act shape. Designed to stand on its own when shared with someone who has no other context. Triggers on "draft one-pager", "make a one-pager", "one-pager from memo", "summary doc for <project>".
---

# memo-to-one-pager

Generate a one-pager from an approved DA2 memo. The one-pager is a
ship-ready distributable — designed to be shared cold with someone who
has no other context for the project. Sharper than the memo, more
concrete, structured for a single printed page.

This is NOT a summary. A summary recapitulates the memo. A one-pager
**reshapes** it for a reader who needs to act on it.

## Inputs

1. **The memo** at `Projects/<slug>/memo.md`. Must have `status: approved`.
2. **The order** at `Projects/<slug>/order.md` for `title`, `audience`,
   `purpose`, and `artifacts` fields.

## Output

Exactly one file: `Projects/<slug>/artifacts/one-pager.md`.

Frontmatter:

```yaml
---
memo: ../memo.md
memo_version: <copy from memo>
generated: YYYY-MM-DD
status: draft
audience: <from memo's audience.primary>
---
```

## Body — three-act structure

The one-pager has exactly three sections plus a small provenance block
at the bottom. Word budget: 500–700 words total across the three
sections. If it overruns, trim — discipline is the point.

### Headline (no section name; just the headline)

Open with the headline — the memo's one-line pitch, sharpened until it
punches. Active voice, concrete nouns. One sentence, no preamble.
Underneath, one or two lines of context for who's reading this.

### What it means

Why the reader should care. Frame the thesis from the perspective of
someone with no prior context. Distill the memo's core thesis into
*one short paragraph* — not bullets. End the paragraph with the stakes:
what changes if this happens, what stays broken if it doesn't.

### What we're doing

The substance. Reshape the memo's key points into prose. If there are
3 key points, write 2–3 short paragraphs. If 5+, group and synthesize
— the one-pager doesn't enumerate. Use **bold** sparingly to mark
load-bearing claims. Avoid bullet lists in this section; prose forces
the writer to commit to relationships between claims.

### What we need

The ask. What the reader should do, and by when. Pull from:
- The order's audience field and the memo's `audience.reading_for`
- The memo's open questions that are decision-shaped
- The deadline if specified

Be concrete: a decision by a date, a meeting in a window, a review
turnaround, an introduction to a specific person. "Thoughts?" is not
an acceptable ask.

If there's truly no ask (it's a status update, not a decision request),
say so explicitly — "no ask; this is a status." Don't manufacture one.

### Provenance (small block at bottom, italic)

```
*Memo: <relative path>. Sources: <comma-separated from memo>.*
```

## Tone

- **No preamble.** No "We are pleased to..." No "This document
  describes..." Open with the headline.
- **Active voice.** "We're shipping X" not "X will be shipped."
- **Concrete nouns.** "The pipeline has 5 stages" not "There is a
  multi-stage process."
- **Section headlines** — write a real headline for each section that
  captures THIS project's content, not the generic name. The three
  sections are conceptually "what it means / what we're doing / what
  we need" but render their headlines as project-specific lines like
  "Why this matters" → "**The pattern-stitcher couldn't keep up.**" or
  "What we're doing" → "**A React substrate, gated workflow, universal
  memo.**"
- **Audience-tuned.** If the audience is technical, lean into specifics
  (paths, version pins, mechanisms). If non-technical, lean into impact
  and outcomes.

## Hard rules

1. **Read-only** on memo, order, and recipe. Never modify them.
2. **One file only:** `Projects/<slug>/artifacts/one-pager.md`. No
   sidecar files, no images, no asset references.
3. **One printed page.** Aim for 500–700 words. If you'd need more, the
   one-pager isn't doing its job — trim further.
4. **No code blocks** unless the memo explicitly requires one (e.g. a
   command the reader needs to run). Plain prose preferred.
5. **No bullets in "What it means."** Bullets in "What we're doing" are
   tolerated for parallel claims but prose is better. Bullets in "What
   we need" are fine — they're action items.
6. **Don't read or modify** anything in `engine/`.
7. **Regeneration check:** if `one-pager.md` already exists with a
   matching `memo_version`, surface that and ask before overwriting:
   "One-pager already exists for memo v<N>. Reply `yes, regenerate
   one-pager` to overwrite, or describe a specific revision."

## Return contract

End with a one-line summary:
- File path
- Approximate word count
- Anything flagged: ask absent, audience inference, etc.
