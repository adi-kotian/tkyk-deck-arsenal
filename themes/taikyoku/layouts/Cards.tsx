// ────────────────────────────────────────────────────────────────
// Cards — support kit: row of cards (slide furniture).
// Use inside a Band/AnchoredRail/TwoUp cell or directly inside a Frame
// body region when 2–4 short evidence cards substantiate the action title.
// Each card: tinted surface + hairline top + accent kicker + body line.
// Slots:
//   items: [string, string][]   — [kicker, body] pairs, one per card
// Motion: each card tk-rise, staggered 120 ms.
// Tokens: paper-tint / line / accent / ink.
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
const V = (n: string, f: string) => `var(--tk-${n},${f})`;
const TINT = V('paper-tint', '#F4F7FB');
const LINE = V('line', 'rgba(0,0,0,0.12)');
const ACC  = V('accent', '#7030A0');
const INK  = V('ink', '#0A0A0A');
const Fn = {
  caps: "'Helvetica Neue','Inter',system-ui,sans-serif",
  body: "'Inter',system-ui,sans-serif",
};

export const Cards = ({ items }:{ items:[string,string][] }) => (
  <>{items.map(([k,b],i)=>(
    <div key={i} style={{ flex:1, background:TINT, borderTop:`1px solid ${LINE}`, padding:'18px 20px',
      animation:`600ms cubic-bezier(0.2,0.7,0.3,1) ${240+i*120}ms both tk-rise` }}>
      <div style={{ fontFamily:Fn.caps, fontSize:14, letterSpacing:'0.16em', textTransform:'uppercase', color:ACC }}>{k}</div>
      <div style={{ fontFamily:Fn.body, fontSize:20, lineHeight:1.4, color:INK, marginTop:8 }}>{b}</div></div>))}</>
);
