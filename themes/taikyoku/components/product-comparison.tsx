/**
 * product-comparison — Taikyoku component library (Phase 9, Session B Archetype 2)
 *
 * USE: a two-thing comparison that is BOTH a feature matrix and an
 * advocacy slide. Shared left-gutter row labels align the two columns
 * row-by-row (axis), AND one column may be elevated in purple (advocacy).
 *
 * Canvas-agnostic CONTENT BLOCK — Page wraps it in a PaperCanvas.
 *
 * SLOTS: eyebrow, heading, rowLabels[] (shared left gutter — aligns
 *   each column's points[] by index), columns: [colA, colB] where each
 *   = { title, thesis?, points[], metric? }
 * PROPS: accentColumn ('left' | 'right' | 'none'), density
 *   ('lean' | 'standard' | 'rich')
 *   - lean: title + points ; standard: + thesis ; rich: + metric (mono)
 * MOTION: sequenced — heading tk-fadeUp; vertical divider tk-growY
 *   (vertical sibling of tk-grow, same easing/duration — scaleY 0→1,
 *   transformOrigin top); columns tk-rise. ≤1.6s, no breath. The slide
 *   must define @keyframes tk-growY { 0%{transform:scaleY(0)} 100%
 *   {transform:scaleY(1)} } (added to the theme motion vocab Phase 9).
 *   Single-purple only.
 */
const c = {
  paper: 'var(--tk-paper,#FFFFFF)', paperTint: 'var(--tk-paper-tint,#F4F7FB)',
  ink: 'var(--tk-ink,#0A0A0A)', inkSoft: 'var(--tk-ink-soft,#3F3F3F)', inkMuted: 'var(--tk-ink-muted,#6B6B6B)',
  accent: 'var(--tk-accent,#7030A0)', line: 'var(--tk-line,rgba(0,0,0,0.12))',
};
const f = {
  display: "'Prata', Georgia, serif",
  caps: "'Helvetica Neue', 'Inter', -apple-system, system-ui, sans-serif",
  body: "'Inter', -apple-system, system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Menlo', monospace",
};

export type CompareColumn = {
  title: string;
  thesis?: string;
  points: string[];
  metric?: string;
};
export type ProductComparisonProps = {
  eyebrow: string;
  heading: string;
  rowLabels?: string[];
  columns: [CompareColumn, CompareColumn];
  accentColumn?: 'left' | 'right' | 'none';
  density?: 'lean' | 'standard' | 'rich';
};

export const ProductComparison = ({
  eyebrow, heading, rowLabels, columns,
  accentColumn = 'none', density = 'standard',
}: ProductComparisonProps) => {
  const showThesis = density !== 'lean';
  const showMetric = density === 'rich';

  const Col = ({ col, side, i }: { col: CompareColumn; side: 'left' | 'right'; i: number }) => {
    const elevated = accentColumn === side;
    return (
      <div
        style={{
          flex: 1,
          background: elevated ? c.paperTint : c.paper,
          padding: elevated ? '28px 28px' : '28px 4px',
          animation: `600ms cubic-bezier(0.2,0.7,0.3,1) ${260 + i * 150}ms both tk-rise`,
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          {elevated && (
            <span aria-hidden style={{ width: 12, height: 12, background: c.accent, display: 'inline-block' }} />
          )}
          <h3
            style={{
              fontFamily: f.display, fontSize: 44, fontWeight: 400, lineHeight: 1.05,
              margin: 0, color: elevated ? c.accent : c.ink,
            }}
          >
            {col.title}
          </h3>
        </div>
        {showThesis && col.thesis && (
          <p style={{ fontFamily: f.body, fontSize: 24, lineHeight: 1.5, color: c.inkSoft, margin: '14px 0 0' }}>
            {col.thesis}
          </p>
        )}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {col.points.map((p, r) => (
            <div
              key={r}
              style={{
                fontFamily: f.body, fontSize: 24, lineHeight: 1.4, color: c.ink,
                minHeight: rowLabels ? 34 : undefined,
              }}
            >
              {p}
            </div>
          ))}
        </div>
        {showMetric && col.metric && (
          <div
            style={{
              fontFamily: f.mono, fontVariantNumeric: 'tabular-nums', fontWeight: 700,
              fontSize: 40, color: elevated ? c.accent : c.ink, marginTop: 28,
            }}
          >
            {col.metric}
          </div>
        )}
      </div>
    );
  };

  return (
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

      <h2
        style={{
          fontFamily: f.display, fontSize: 84, fontWeight: 400, lineHeight: 1.02,
          letterSpacing: '-0.02em', margin: '48px 0 40px', color: c.ink,
          animation: '600ms ease-out 150ms both tk-fadeUp',
        }}
      >
        {heading}
      </h2>

      <div style={{ display: 'flex', gap: 36, flex: 1 }}>
        {rowLabels && (
          <div style={{ flex: '0 0 220px', paddingTop: 92, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {rowLabels.map((rl, r) => (
              <div
                key={r}
                style={{
                  fontFamily: f.caps, fontSize: 18, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: c.inkMuted, minHeight: 34,
                  lineHeight: 1.4,
                }}
              >
                {rl}
              </div>
            ))}
          </div>
        )}
        <Col col={columns[0]} side="left" i={0} />
        <div
          aria-hidden
          style={{
            width: 1, background: c.ink, transformOrigin: 'top center',
            animation: '700ms cubic-bezier(0.7,0,0.2,1) 200ms both tk-growY',
          }}
        />
        <Col col={columns[1]} side="right" i={1} />
      </div>
    </div>
  );
};

export default ProductComparison;
