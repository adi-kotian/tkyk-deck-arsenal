import type { OpenSlideConfig } from '@open-slide/core';

// ─── Deck Arsenal 2 override ──────────────────────────────────────────────────
// Slides live inside each project folder at DA2/Projects/<slug>/index.tsx, and
// themes live at DA2/themes/. Both paths are relative to this file (which lives
// at DA2/engine/apps/demo/open-slide.config.ts), so `../../../` reaches DA2's
// root regardless of where the DA2 directory itself is on disk.
//
// This is the one place where the vendored engine is configured for DA2. Every
// other file under engine/ is untouched and managed via scripts/sync-engine.sh.
//
// See ENGINE_INVESTIGATION.md at DA2 root for the analysis of slidesDir.
const openSlideConfig: OpenSlideConfig = {
  slidesDir: '../../../Projects',
  themesDir: '../../../themes',
};

export default openSlideConfig;
