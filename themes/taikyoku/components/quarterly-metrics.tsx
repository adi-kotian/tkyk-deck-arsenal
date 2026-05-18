/**
 * quarterly-metrics — Taikyoku component library (Phase 9, Session B Archetype 3)
 *
 * USE: a row of 3–4 key metrics. Two variants:
 *   - "hero-supporting": one dominant metric larger, the rest smaller
 *   - "metric-delta":    each metric carries a ▲/▼ change indicator
 *
 * Canvas-agnostic CONTENT BLOCK — the composing Page wraps it in a
 * PaperCanvas (paper bg + 100px padding). Atomic per Phase 7 (components
 * compose into Pages).
 *
 * SLOTS: eyebrow, heading, metrics[]{ value, label, context?, delta?,
 *   deltaDir?: 'up' | 'down' }
 * PROPS: variant ('hero-supporting' | 'metric-delta'), density
 *   ('lean' | 'standard' | 'rich')
 * RULES: figures = JetBrains Mono + tabular-nums (Topic 4). A 'down'
 *   delta renders accent-negative #9B2226 (Topic 7); 'up' stays ink.
 *   Motion: eyebrow/heading tk-fadeUp; cells tk-rise staggered 150ms.
 *   COUNT-UP: the hero-supporting LEAD figure (the large one) count-ups
 *   once on enter (sanctioned 2026-05-19 for large metrics — supersedes
 *   the earlier ban). Small/delta cells never count-up (would read
 *   busy). Honours prefers-reduced-motion; tabular-nums = no shift.
 */
/** One-time count-up for the large lead figure only — HOOK-FREE
 *  (the component system is hook-free; hooks broke open-slide render).
 *  ref-callback + rAF; children default to the final value (graceful). */
const CountUp = ({ value, ms = 700, delay = 150 }: { value: string; ms?: number; delay?: number }) => {
  const m = /^([^\d-]*)(-?\d[\d.,]*)(.*)$/.exec(value);
  if (!m) return <>{value}</>;
  const target = parseFloat(m[2].replace(/,/g, ''));
  if (isNaN(target)) return <>{value}</>;
  const dec = m[2].includes('.') ? m[2].split('.')[1].length : 0;
  const pre = m[1], suf = m[3];
  const fmt = (x: number) =>
    pre + x.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
  const ref = (node: HTMLSpanElement | null) => {
    if (!node || node.dataset.cu) return;
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
  paperTint: 'var(--tk-paper-tint,#F4F7FB)',
  ink: 'var(--tk-ink,#0A0A0A)', inkSoft: 'var(--tk-ink-soft,#3F3F3F)', inkMuted: 'var(--tk-ink-muted,#6B6B6B)',
  accent: 'var(--tk-accent,#7030A0)', accentNegative: 'var(--tk-accent-negative,#9B2226)',
  line: 'var(--tk-line,rgba(0,0,0,0.12))',
};
const f = {
  display: "'Prata', Georgia, serif",
  caps: "'Helvetica Neue', 'Inter', -apple-system, system-ui, sans-serif",
  body: "'Inter', -apple-system, system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Menlo', monospace",
};

export type Metric = {
  value: string;
  label: string;
  context?: string;
  delta?: string;
  deltaDir?: 'up' | 'down';
};
export type QuarterlyMetricsProps = {
  eyebrow: string;
  heading: string;
  metrics: Metric[];
  variant?: 'hero-supporting' | 'metric-delta';
  density?: 'lean' | 'standard' | 'rich';
};

export const QuarterlyMetrics = ({
  eyebrow, heading, metrics,
  variant = 'metric-delta', density = 'standard',
}: QuarterlyMetricsProps) => {
  const showContext = density !== 'lean';
  const showDelta = (variant === 'metric-delta') && density === 'rich';

  const Cell = ({ m, i, hero }: { m: Metric; i: number; hero?: boolean }) => (
    <div
      style={{
        flex: hero ? '0 0 42%' : 1,
        background: c.paperTint, borderTop: `1px solid ${c.line}`,
        padding: hero ? '40px 36px' : '32px 28px',
        animation: `600ms cubic-bezier(0.2,0.7,0.3,1) ${150 + i * 150}ms both tk-rise`,
      }}
    >
      <div
        style={{
          fontFamily: f.mono, fontVariantNumeric: 'tabular-nums', fontWeight: 700,
          fontSize: hero ? 92 : 56,
          color: m.deltaDir === 'down' ? c.accentNegative : c.ink,
          lineHeight: 1,
        }}
      >
        {hero ? <CountUp value={m.value} /> : m.value}
      </div>
      {(showDelta && m.delta) && (
        <div
          style={{
            fontFamily: f.mono, fontVariantNumeric: 'tabular-nums', fontSize: 22,
            marginTop: 8, fontWeight: 700,
            color: m.deltaDir === 'down' ? c.accentNegative : c.accent,
          }}
        >
          {m.deltaDir === 'down' ? '▼' : '▲'} {m.delta}
        </div>
      )}
      <div
        style={{
          fontFamily: f.caps, fontSize: 20, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: c.inkMuted, marginTop: 14,
        }}
      >
        {m.label}
      </div>
      {(showContext && m.context) && (
        <div style={{ fontFamily: f.body, fontSize: 22, lineHeight: 1.5, color: c.inkSoft, marginTop: 10 }}>
          {m.context}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          borderBottom: `1px solid ${c.ink}`, paddingBottom: 18,
          fontFamily: f.caps, fontSize: 22, letterSpacing: '0.22em',
          textTransform: 'uppercase', animation: '600ms ease-out both tk-fadeUp',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <span aria-hidden style={{ width: 12, height: 12, background: c.accent, display: 'inline-block' }} />
          <span style={{ fontWeight: 700 }}>{eyebrow}</span>
        </span>
      </div>

      <h2
        style={{
          fontFamily: f.display, fontSize: 88, fontWeight: 400, lineHeight: 1.02,
          letterSpacing: '-0.02em', margin: '56px 0 0', color: c.ink,
          animation: '600ms ease-out 150ms both tk-fadeUp',
        }}
      >
        {heading}
      </h2>

      <div style={{ display: 'flex', gap: 40, marginTop: 'auto', paddingTop: 56 }}>
        {variant === 'hero-supporting'
          ? metrics.map((m, i) => <Cell key={m.label} m={m} i={i} hero={i === 0} />)
          : metrics.map((m, i) => <Cell key={m.label} m={m} i={i} />)}
      </div>
    </div>
  );
};

export default QuarterlyMetrics;
