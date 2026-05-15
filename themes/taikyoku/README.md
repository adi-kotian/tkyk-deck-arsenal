# Taikyoku — assets

Empty by design. The v1 theme uses Google Fonts at runtime (Prata, Archivo,
Inter, JetBrains Mono) and no logo or icon assets — colour and typography
carry the identity.

When a future deck genuinely needs a brand asset, decide where it belongs:

- **One specific deck only** (a logo on this deck's cover) → drop it in
  `Projects/<slug>/assets/`. The theme stays brand-light.
- **Every Taikyoku deck** (a wordmark for every cover) → land it here, and
  reference it from a fixed component in `../taikyoku.md`. Update the
  theme contract so the asset is documented.

What's intentionally not here yet:

- `TKYK_logo-web-hq.svg`, `TKYK_logo-white.svg` — covered by the parent
  brand brief but not adopted into the Taikyoku synthesis theme. If we
  build a "Taikyoku Full" theme later, those land in that theme's
  assets, not here.
- The 大 kanji seal / 大局 wordmark — same reasoning.
- Self-hosted font woff2 files — Google Fonts handles all four faces;
  bundling licensed faces is deferred until offline rendering is a
  real requirement.
