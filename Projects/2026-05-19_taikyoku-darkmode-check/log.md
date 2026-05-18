# Log — Taikyoku dark-mode token-indirection validation

- **2026-05-19** — Validates the dark-mode token-indirection refactor.
  Imports the **actual refactored library components** (opening-hero,
  section-divider, quarterly-metrics, quadrant, logo-cluster, closing)
  and renders each **LIGHT then DARK** — dark via the single `:root`
  `--tk-*` block, **zero component changes**. Proves gradient, ink,
  paper, paper-tint(-2), accent, the monochrome-logo filter, and the
  unchanged gold all switch from one block; light path = same
  components with no block (var fallbacks). Mechanism, not aesthetic
  sign-off (the aesthetic was accepted on the spike 2026-05-18).
