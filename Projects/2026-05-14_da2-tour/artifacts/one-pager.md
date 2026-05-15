---
memo: ../memo.md
memo_version: 1
generated: 2026-05-14
status: draft
audience: future-me and any collaborator brought into this directory
---

# Deck Arsenal 2 — same workflow, new engine.

*A one-page tour for anyone walking into this directory cold.*

## The pattern-stitcher couldn't keep up.

DA1's pipeline was right — five gated stages, filesystem as state
machine, explicit human approval between each. The substrate was wrong.
Stitching HTML patterns from a closed library hit its limit on
expressivity and on editing UX. The workflow stayed; the rendering
moved.

DA2 is that swap. open-slide replaces the vendored HTML stitcher with
a React-per-page substrate that ships its own in-browser click-to-comment
inspector. The five stages, the memo, the storyboard, the approval gates,
the project folder shape — all carry over. What changes is what happens
at compose time, and what tools you have to edit.

## A React substrate, gated workflow, universal memo.

open-slide is vendored under `engine/`, pinned to `@open-slide/core@1.3.0`,
and modified only at one config file that points slide discovery at DA2's
`Projects/` tree. The framework is otherwise untouched — upgrades go
through `scripts/sync-engine.sh`, not by editing files inline.

The **memo** is the canonical project context, and it now serves more
than the deck. The same `memo.md` feeds `memo-to-minutes` for meeting
minutes and `memo-to-one-pager` for distributable summaries (you are
reading one). Write the memo once, write it well, and three artifacts
come out of it cleanly.

**Storyboards reuse via recipes.** A recipe at `recipes/<name>.yaml`
defines a beat structure (cover → problem → solution → demo → validation
→ ask). A project's storyboard references it and supplies the per-deck
content. Reusing a deck shape across projects is "pick the same recipe,
write a new memo, compose." Two recipes ship out of the box;
`pitch-classic` and `explainer`. Add more when three projects converge
on a fourth pattern.

**Editing is now in the browser.** Click an element in the rendered
slide, type a comment, run `apply-comments` — open-slide's inspector
loop sweeps the markers and applies the edits. DA1's chat-driven
`/deck-edit` is retired.

## Try it on a real deck. Decide whether to retire DA1.

There is no formal ask attached to this one-pager — it's documentation,
not a decision request. But if you're reading this and you haven't run
DA2 end-to-end yet, do that now: drop an order in `Inbox/`, run
`/da2-new`, walk through the gates, finalize. Then look at DA1 and ask
whether anything in your active deck pipeline still needs the old engine.

If nothing does, freeze DA1 and make DA2 your default.

---

*Memo: `../memo.md`. Sources: `../README.md`, `../CLAUDE.md`,
`../ENGINE_INVESTIGATION.md`.*
