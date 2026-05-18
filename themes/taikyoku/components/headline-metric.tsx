/**
 * headline-metric — Taikyoku component library (Phase 9, Session B Archetype 4)
 *
 * USE: the "one number" slide — a single dominant figure that is both
 * asserted and substantiated (figure + proof). Deliberately austere.
 *
 * Canvas-agnostic CONTENT BLOCK — Page wraps it in a PaperCanvas.
 *
 * SLOTS: eyebrow, value, label, context
 *   - `context` DOUBLES as the source/proof line (figure + proof intent;
 *     no separate source/sparkline prop by design — Session B Arch 4).
 * DENSITY: standard, FIXED (no density prop) — the slide's power is its
 *   austerity. Exception to the build-all-densities pattern.
 * MOTION: staggered tk-fadeUp (eyebrow → figure → label → context),
 *   PLUS a one-time count-up on the figure (sanctioned 2026-05-19 for
 *   large metric figures — supersedes the Session B Archetype 3 /
 *   forbidden-list count-up ban). Once, on enter, ~700ms ease-out, no
 *   overshoot, tabular-nums (no layout shift), honours
 *   prefers-reduced-motion. ≤1.6s, no breath.
 * GOLD: not a prop — gold is a deck-level assignment (compose-deck),
 *   never baked into this component (changed gold doctrine).
 * RULES: figure = JetBrains Mono + tabular-nums (Topic 4).
 */
/** One-time count-up — HOOK-FREE (the component system is hook-free;
 *  hooks broke open-slide rendering). A ref-callback runs once on mount
 *  and rAF-animates textContent. Children default to the final value, so
 *  with no JS / reduced-motion / non-numeric it just shows the result —
 *  no layout shift (tabular-nums upstream). */
const CountUp = ({ value, ms = 700, delay = 200 }: { value: string; ms?: number; delay?: number }) => {
  const m = /^([^\d-]*)(-?\d[\d.,]*)(.*)$/.exec(value);
  if (!m) return <>{value}</>;
  const target = parseFloat(m[2].replace(/,/g, ''));
  if (isNaN(target)) return <>{value}</>;
  const dec = m[2].includes('.') ? m[2].split('.')[1].length : 0;
  const pre = m[1], suf = m[3];
  const fmt = (x: number) =>
    pre + x.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
  const ref = (node: HTMLSpanElement | null) => {
    if (!node || node.dataset.cu) return;            // run once even if re-attached
    node.dataset.cu = '1';
    const reduce = typeof window !== 'undefined' && !!window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { node.textContent = fmt(target); return; }
    node.textContent = fmt(0);
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t + delay;
      const p = Math.min(1, Math.max(0, (t - start) / ms));
      node.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick); else node.textContent = fmt(target);
    };
    requestAnimationFrame(tick);
  };
  return <span ref={ref}>{fmt(target)}</span>;
};
const c = {
  ink: 'var(--tk-ink,#0A0A0A)', inkSoft: 'var(--tk-ink-soft,#3F3F3F)', inkMuted: 'var(--tk-ink-muted,#6B6B6B)',
  accent: 'var(--tk-accent,#7030A0)',
};
const f = {
  caps: "'Helvetica Neue', 'Inter', -apple-system, system-ui, sans-serif",
  body: "'Inter', -apple-system, system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Menlo', monospace",
};

export type HeadlineMetricProps = {
  eyebrow: string;
  value: string;
  label: string;
  /** Doubles as the source/proof line. */
  context: string;
};

export const HeadlineMetric = ({
  eyebrow, value, label, context,
}: HeadlineMetricProps) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div
      style={{
        borderBottom: `1px solid ${c.ink}`, paddingBottom: 18,
        fontFamily: f.caps, fontSize: 22, letterSpacing: '0.22em',
        textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 14,
        animation: '600ms ease-out both tk-fadeUp',
      }}
    >
      <span aria-hidden style={{ width: 12, height: 12, background: c.accent, display: 'inline-block' }} />
      <span style={{ fontWeight: 700 }}>{eyebrow}</span>
    </div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div
        style={{
          fontFamily: f.mono, fontVariantNumeric: 'tabular-nums', fontWeight: 700,
          fontSize: 260, lineHeight: 0.92, color: c.ink, letterSpacing: '-0.02em',
          animation: '700ms ease-out 200ms both tk-fadeUp',
        }}
      >
        <CountUp value={value} />
      </div>
      <div
        style={{
          fontFamily: f.caps, fontSize: 28, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: c.inkMuted, marginTop: 28,
          animation: '600ms ease-out 400ms both tk-fadeUp',
        }}
      >
        {label}
      </div>
      <p
        style={{
          fontFamily: f.body, fontSize: 26, lineHeight: 1.5, color: c.inkSoft,
          maxWidth: 1100, margin: '28px 0 0',
          animation: '600ms ease-out 600ms both tk-fadeUp',
        }}
      >
        {context}
      </p>
    </div>
  </div>
);

export default HeadlineMetric;
