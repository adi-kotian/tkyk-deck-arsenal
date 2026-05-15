---
order: ./order.md
version: 1
status: draft|approved
project_slug: <kebab>
deadline: YYYY-MM-DD | flexible

# Audience and recipients — read by every artifact skill
audience:
  primary: "<who this is for>"
  reading_for: "<what they need to walk away with>"
recipients: []                # for minutes/one-pager distribution — names or roles

# Sources used as evidence for the thesis and key points
sources:
  - "<path or URL>"

# Optional deck-specific section — only read by compose-deck
deck:
  preferred_recipe: pitch-classic
  preferred_theme: taikyoku
  density_override: low|medium|high
---

# Memo — <project name>

This is the canonical context document for this project. The same memo
feeds the deck (via compose-deck), the meeting minutes (via
memo-to-minutes), and the one-pager (via memo-to-one-pager). Write it once,
write it well.

## One-line pitch
One sentence that captures what this project is about. The kind of line
you'd open an email with.

## Core thesis
The argument or position this work takes. Two or three sentences. Not a
summary of the project — the *claim* the project is making.

## Key points (3–7)
The load-bearing ideas. Each should:
- Stand on its own as a one-sentence claim
- Be defensible from the sources
- Be meaningful to the primary audience

1. **<headline>** — one-sentence elaboration.
2. **<headline>** — one-sentence elaboration.
3. **<headline>** — one-sentence elaboration.

## Tone
Two or three adjectives plus a reference if useful ("like a good
engineering README", "like a Pixar short", "dry, like a McKinsey deck").

## Out of scope
Things we are deliberately not covering, and why. This is more useful
than it looks — it stops the agent from drifting.

## Open questions
Things we don't yet know. The deck/minutes/one-pager should treat these
as open, not paper over them.

- [ ] <question>
- [ ] <question>
