# Recipes

A recipe is a reusable storyboard *structure* — a sequence of beats with
their purpose and density. Recipes do not commit to content; that comes
from the storyboard's `content:` block per project.

## Recipe schema

```yaml
name: <kebab-case-id>            # filename without extension; e.g. pitch-classic
description: <one-line>          # human-readable purpose
default_theme: <theme-id>|null   # optional default — storyboard can override

beats:
  - purpose: <one-of: cover, problem, solution, demo, validation,
               value, workflow, architecture, ask, closing,
               section, intro, recap, ...>
    density: low|medium|high
    notes: "<optional copy direction>"     # what kind of content fits here
```

## When to add a new recipe

Don't add a recipe for every deck. The point is reuse. Heuristic: add a
recipe when **three projects have organically converged** on the same beat
sequence. Until then, write the storyboard ad hoc (omit the `recipe:` line
and define beats inline — Phase 2 will document the ad-hoc shape).

## Shipped

| Recipe | Shape | When to use |
| --- | --- | --- |
| `pitch-classic` | cover → problem → solution → demo → validation → ask | Selling something. Six beats, narrative arc, ends in an ask. |
| `explainer` | cover → value → workflow → architecture | Internal docs or walkthroughs for technically literate audiences. Four beats, no ask. |
| `executive-pitch` | cover → section → value → workflow → architecture → closing | Formal explainer with sectioning + a deliberate closer. Six beats. Ships with `default_theme: taikyoku`. |

To add more, write `<name>.yaml` following the schema above. The
storyboard subagent picks recipes by `name:` field, which should equal
the filename without extension.
