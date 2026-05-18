/**
 * opening-hero — Taikyoku component library (Phase 9, Session B
 * Archetype 1, REVISED 2026-05-18: visual slot dropped).
 *
 * USE: the deck's opening hero — text + structural graphics only.
 * The Prata title carries the slide; the only "graphic" is the
 * purple AccentRule and the eyebrow dot. NO secondary visual
 * (chart/logo/image) — that slot was removed per user direction;
 * supersedes Session B Archetype 1's "~60/40 + quiet visual".
 *
 * SLOTS (props):
 *   eyebrow — top tracked-caps label (Helvetica Neue)
 *   meta    — right-side eyebrow run (e.g. "Internal · 2026 · 05")
 *   title   — Prata hero headline (Title Case)
 *   sub     — one supporting sub-line
 *
 * DENSITY: standard, fixed — eyebrow + title + AccentRule + sub.
 * MOTION: staggered tk-fadeUp (eyebrow → title → rule → sub). NO
 *   breath (removed theme-wide, Phase 8). ≤1.6s.
 * CANVAS: gradient (cover) — full-slide component.
 */
const c = {
  gradientCool: 'var(--tk-grad-cool,#A6C9EB)', gradientWarm: 'var(--tk-grad-warm,#FFE9BF)',
  ink: 'var(--tk-ink,#0A0A0A)', inkMuted: 'var(--tk-ink-muted,#6B6B6B)',
  accent: 'var(--tk-accent,#7030A0)',
};
const f = {
  display: "'Prata', Georgia, 'Times New Roman', serif",
  caps: "'Helvetica Neue', 'Inter', -apple-system, system-ui, sans-serif",
  body: "'Inter', -apple-system, system-ui, sans-serif",
};

export type OpeningHeroProps = {
  eyebrow: string;
  meta?: string;
  title: string;
  sub?: string;
};

export const OpeningHero = ({ eyebrow, meta, title, sub }: OpeningHeroProps) => (
  <div
    style={{
      width: '100%', height: '100%',
      background: `linear-gradient(330deg, ${c.gradientCool} var(--tk-grad-cool-pos,12%), ${c.gradientWarm} 100%)`,
      color: c.ink, fontFamily: f.body, padding: 100, boxSizing: 'border-box',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}
  >
    <div
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        fontFamily: f.caps, fontSize: 22, letterSpacing: '0.22em',
        textTransform: 'uppercase', animation: '600ms ease-out both tk-fadeUp',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
        <span aria-hidden style={{ width: 12, height: 12, background: c.accent, display: 'inline-block' }} />
        <span style={{ fontWeight: 700 }}>{eyebrow}</span>
      </span>
      {meta && (
        <span style={{ color: c.inkMuted, fontWeight: 500, fontSize: 20, letterSpacing: '0.16em' }}>
          {meta}
        </span>
      )}
    </div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1
        style={{
          fontFamily: f.display, fontSize: 168, fontWeight: 400,
          lineHeight: 0.96, letterSpacing: '-0.03em', margin: 0, color: c.ink,
          maxWidth: 1500,
          animation: '700ms ease-out 200ms both tk-fadeUp',
        }}
      >
        {title}
      </h1>
      <div
        aria-hidden
        style={{
          width: 320, height: 6, background: c.accent, marginTop: 48,
          transformOrigin: 'left center',
          animation: '700ms cubic-bezier(0.7,0,0.2,1) 700ms both tk-grow',
        }}
      />
      {sub && (
        <p
          style={{
            marginTop: 32, fontSize: 36, lineHeight: 1.4, color: c.ink,
            fontWeight: 500, maxWidth: 1200,
            animation: '600ms ease-out 1000ms both tk-fadeUp',
          }}
        >
          {sub}
        </p>
      )}
    </div>
  </div>
);

export default OpeningHero;
