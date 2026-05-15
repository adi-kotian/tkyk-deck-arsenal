# Engine investigation — slidesDir & themesDir

Phase 1 deliverable. Confirms whether open-slide can be configured to discover
slides inside DA2's `Projects/` tree instead of `engine/apps/demo/slides/`,
and similarly for themes.

**Verdict: yes, both work.** DA2 is configured this way out of the box.

## What I read

The relevant source files in the vendored engine (pinned to
`@open-slide/core@1.3.0`):

- `engine/packages/core/src/config.ts` — `OpenSlideConfig` type. Fields
  include `slidesDir?: string` and `themesDir?: string`. Both optional, both
  defaulting to `'slides'` / `'themes'`.
- `engine/packages/core/src/vite/config.ts` lines 37–40 — the resolution
  call: `path.resolve(userCwd, slidesDir)`. `userCwd` is the directory where
  `pnpm dev` is invoked (here: `engine/apps/demo/`). `slidesDir` is taken
  verbatim from the user's `open-slide.config.ts` and resolved against
  `userCwd`. **No validation prevents escaping the workspace** — `../../`
  prefixes are accepted.
- `engine/packages/core/src/vite/open-slide-plugin.ts:49–58` — the discovery
  function `findSlides`. It runs `fast-glob` with the pattern
  `*/index.{tsx,jsx,ts,js}` from `slidesAbs`. One directory level deep. The
  slug is the immediate child directory name (`toId`, line 60).
- `engine/packages/core/src/vite/open-slide-plugin.ts:163–170` — folders
  manifest is read from `<slidesRoot>/.folders.json`. That file lives
  wherever `slidesDir` points, so when we point at `Projects/`, the manifest
  ends up at `Projects/.folders.json`.

## What this means in practice

With `slidesDir: '../../../Projects'` set in
`engine/apps/demo/open-slide.config.ts`:

- A project at `Projects/2026-05-14_foo/index.tsx` becomes a slide with
  slideId `2026-05-14_foo` and dev URL `http://localhost:5173/s/2026-05-14_foo`.
- The slide's React file (`index.tsx`) sits **alongside** memo, storyboard,
  sources, and artifacts in the same folder. Project content and slide
  source are co-located.
- Themes live at DA2's top-level `themes/` directory (one `<theme-id>.md`
  file each), via `themesDir: '../../../themes'`. The engine ships its own
  default theme set under `engine/apps/demo/themes/` which is now
  unreachable from the dev server — they're effectively shelved as
  reference. If you ever want them back, copy the markdown files into
  DA2/themes/.
- The folder-organization manifest persists at `Projects/.folders.json`
  rather than inside the engine. Git tracks it with the rest of DA2.

## Layout we adopted

```
Deck Arsenal 2/
  engine/                       # vendored open-slide, untouched except config
    apps/demo/open-slide.config.ts  # ← slidesDir + themesDir overrides
  
  Projects/
    <YYYY-MM-DD_slug>/
      order.md
      memo.md
      storyboard.yaml
      index.tsx                 # ← open-slide picks this up as the slide
      assets/                   # ← open-slide picks images/videos here
      sources/                  # raw research, not displayed in deck
      artifacts/                # minutes.md, one-pager.md
      exports/                  # deck.html / deck.pdf after finalize
      log.md
    .folders.json               # open-slide's folder-org manifest
  
  themes/
    <theme-id>.md               # ← discovered by open-slide
```

## Caveats

1. **One-level-deep discovery.** The glob `*/index.{tsx,...}` means each
   project's slide must live at the project root as `index.tsx`. We cannot
   nest it deeper (e.g. `Projects/<slug>/deck/index.tsx`). The trade-off:
   project files (memo, storyboard, sources/) and slide source share one
   directory.
2. **assets/ subfolder is a convention, not a constraint.** open-slide doesn't
   special-case `assets/` — you just import from there. Same for
   `sources/`, `artifacts/`, `exports/` — open-slide ignores them.
3. **Engine-ship defaults are shelved.** The bundled themes and the
   `getting-started` example slide inside the engine are now unreachable in
   the dev server because slidesDir/themesDir no longer point at them. They
   stay on disk for reference. Don't delete them — they're useful and
   they're part of the vendored snapshot.
4. **File watching.** open-slide watches `slidesAbs` via Vite's `watcher.add`
   (open-slide-plugin.ts:254). chokidar handles cross-directory watching
   fine in our experience, but if hot reload misbehaves on a directory
   outside the workspace, restart `pnpm dev`.
5. **Portability of paths.** The override uses relative paths
   (`../../../Projects`), so DA2 can be moved anywhere on disk — to a
   sibling of `Deck Arsenal/`, into another tree, anywhere. Don't ever
   substitute absolute paths in this config.

## If we ever want to revert

Set both fields back to undefined (or remove them) in
`engine/apps/demo/open-slide.config.ts`. Slides will then be discovered at
`engine/apps/demo/slides/<slug>/index.tsx` per the default. You'd also need
to move slide sources back into the engine workspace.
