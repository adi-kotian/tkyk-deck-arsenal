# Projects

One folder per deck, named `YYYY-MM-DD_<slug>` (creation date + the
slug from the order). Flat files inside; git history is the version
log.

Each project folder typically contains:

```
Projects/<YYYY-MM-DD_slug>/
  order.md             stage 1 — the production order
  memo.md              stage 2 — canonical context (universal)
  storyboard.yaml      stage 3 — recipe + content
  index.tsx            stage 4 — composed React slide (picked up by open-slide)
  assets/              images, videos, fonts imported by index.tsx
  sources/             raw research that the memo cites
  artifacts/           minutes.md, one-pager.md derived from memo
  exports/             deck.html, deck.pdf after finalize
  log.md               project log
```

Project folders are created by `/da2-new`. Don't make them by hand.

## `_archive/`

`Projects/_archive/<slug>/` holds historical / one-off / spike decks
from Phases 2–11. They're **off the dev server** — open-slide globs
`Projects/*/index.tsx` one level deep, so anything two levels deep
under `_archive/` is not served at `/s/<slug>`. See
`_archive/README.md` for the index of what's there and why.

## The `.folders.json` file

open-slide writes a folder-organization manifest at the top of this
directory (`Projects/.folders.json`) — the user-defined groupings
shown in the dev server's sidebar. It's tracked by git. Don't delete
it.
