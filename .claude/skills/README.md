# DA2 skills

DA2-specific Claude Code skills land here in subsequent phases. The
engine's own skills (create-slide, slide-authoring, apply-comments,
create-theme, current-slide) live inside the vendored engine at
`engine/apps/demo/.claude/skills/` and are auto-discovered when Claude
Code is opened with that directory in scope.

## Planned

| Skill | Phase | Reads | Writes |
| --- | --- | --- | --- |
| `compose-deck` | 3 | `memo.md`, `storyboard.yaml`, `themes/<theme>.md`, engine's `slide-authoring` | `Projects/<slug>/index.tsx` |
| `memo-to-minutes` | 5 | `memo.md` | `Projects/<slug>/artifacts/minutes.md` |
| `memo-to-one-pager` | 5 | `memo.md` | `Projects/<slug>/artifacts/one-pager.md` |

Subagents (memo, storyboard) live under `agents/` instead of `skills/`
once Phase 2 ships — they're invoked by `/da2-new` and `/da2-advance`
rather than triggered by user phrasing.
