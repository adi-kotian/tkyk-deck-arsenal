// ────────────────────────────────────────────────────────────────
// LList — support kit: labelled list (slide furniture).
// 3–4 tracked-caps key / mono-value rows separated by hairlines. Use for
// a parameters block, definition list, or facts strip.
// Slots:
//   items: [string, string][]   — [label, value] pairs
// Motion: container tk-fadeUp once on enter, 460 ms delay.
// Tokens: line / ink-muted / ink.
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
const V = (n: string, f: string) => `var(--tk-${n},${f})`;
const LINE = V('line', 'rgba(0,0,0,0.12)');
const MUT  = V('ink-muted', '#6B6B6B');
const INK  = V('ink', '#0A0A0A');
const Fn = {
  caps: "'Helvetica Neue','Inter',system-ui,sans-serif",
  mono: "'JetBrains Mono','SF Mono',monospace",
};

export const LList = ({ items }:{ items:[string,string][] }) => (
  <div style={{ display:'flex', flexDirection:'column', animation:'600ms ease-out 460ms both tk-fadeUp' }}>
    {items.map(([k,v],i)=>(
      <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
        borderTop:`1px solid ${LINE}`, padding:'13px 0', fontFamily:Fn.caps, fontSize:17,
        letterSpacing:'0.14em', textTransform:'uppercase', color:MUT }}>
        <span>{k}</span><span style={{ fontFamily:Fn.mono, color:INK, letterSpacing:'0.02em' }}>{v}</span></div>))}
  </div>
);
