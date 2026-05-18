// Phase 9 — viewer for the Taikyoku component gallery.
//
// The gallery itself lives at themes/taikyoku.gallery.tsx (Work Stream 2
// spec location), which open-slide does not serve as a slide route
// (slidesDir = Projects/). This thin Projects deck re-exports it so the
// gallery is reviewable at /s/2026-05-18_taikyoku-gallery. Not a
// memo→storyboard product — a verification viewer (see log.md).
export { default, meta } from '../../themes/taikyoku.gallery';
