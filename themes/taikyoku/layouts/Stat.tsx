// ────────────────────────────────────────────────────────────────
// Stat — support kit: a stat callout (slide furniture).
// A single mono figure + caps label (+ optional context line). Use as a
// rail member or grid cell to substantiate the action title with a number
// that's too small for headline-metric / quarterly-metrics.
// Slots:
//   v: string    — the figure (JetBrains Mono, tabular-nums)
//   l: string    — the tracked-caps label
//   c?: string   — optional body-context line
// Motion: tk-rise once on enter, 240 ms delay.
// Tokens: paper-tint / line / ink / ink-soft / ink-muted.
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
const V = (n: string, f: string) => `var(--tk-${n},${f})`;
const TINT = V('paper-tint', '#F4F7FB');
const LINE = V('line', 'rgba(0,0,0,0.12)');
const INK  = V('ink', '#0A0A0A');
const SOFT = V('ink-soft', '#3F3F3F');
const MUT  = V('ink-muted', '#6B6B6B');
const Fn = {
  caps: "'Helvetica Neue','Inter',system-ui,sans-serif",
  body: "'Inter',system-ui,sans-serif",
  mono: "'JetBrains Mono','SF Mono',monospace",
};

export const Stat = ({ v, l, c }:{ v:string; l:string; c?:string }) => (
  <div style={{ background:TINT, borderTop:`1px solid ${LINE}`, padding:'20px 22px',
    animation:'600ms cubic-bezier(0.2,0.7,0.3,1) 240ms both tk-rise' }}>
    <div style={{ fontFamily:Fn.mono, fontVariantNumeric:'tabular-nums', fontWeight:700, fontSize:46, color:INK, lineHeight:1 }}>{v}</div>
    <div style={{ fontFamily:Fn.caps, fontSize:15, letterSpacing:'0.16em', textTransform:'uppercase', color:MUT, marginTop:10 }}>{l}</div>
    {c && <div style={{ fontFamily:Fn.body, fontSize:18, color:SOFT, marginTop:6 }}>{c}</div>}
  </div>
);
