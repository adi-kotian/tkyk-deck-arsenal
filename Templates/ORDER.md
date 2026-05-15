---
title: "<deck title shown on slide 1>"
slug: "<kebab-case-slug>"             # becomes Projects/YYYY-MM-DD_<slug>/
audience: "<who reads/sees this>"
purpose: pitch|teach|conference|internal
length: short|medium|long             # short ≤ 6 pages, medium 6–12, long 12+
deadline: YYYY-MM-DD | flexible
recipe: pitch-classic|teach-fundamentals|walkthrough|...   # optional preference; can be filled at storyboard stage
theme: taikyoku|<theme-id>            # optional; default falls back to recipe's default_theme
sources:                              # paths or URLs
  - "<path/to/doc>"
avoid: []                             # things to NOT do (tone, claims, visuals)
artifacts:                            # which non-deck outputs to also produce
  - minutes                           # ⇒ artifacts/minutes.md
  - one-pager                         # ⇒ artifacts/one-pager.md
---

# Brief

## 1. Purpose
One paragraph. What problem does this deck solve? What does the audience
do after they've seen it?

## 2. Single takeaway
One sentence. If the audience remembers nothing else, what?

## 3. Anything the agent should know
Tone, prior context, related decks, edge cases. Anything that wouldn't be
obvious from reading the sources.
