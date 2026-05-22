// ────────────────────────────────────────────────────────────────
// Structural — Frame variant for components that own their eyebrow + heading.
// Use with deck-contents, opening-hero-shaped components, anything whose
// header chrome would echo Frame's chrome. Drops the eyebrow + action title
// slots; keeps source/folio + an optional support row.
// Slots:
//   source:   string       — citation/method line above the folio
//   folio:    string       — page X / Y or section · page
//   support?: ReactNode    — optional support row (e.g. Cards, Stat row)
//   children: ReactNode    — the full-body component (its own chrome inside)
// Token usage: var(--tk-*, <light>) for every color.
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';

const V = (n: string, f: string) => `var(--tk-${n},${f})`;
const INK   = V('ink', '#0A0A0A');
const MUT   = V('ink-muted', '#6B6B6B');
const LINE  = V('line', 'rgba(0,0,0,0.12)');
const PAPER = V('paper', '#FFFFFF');
const Fn = {
  caps: "'Helvetica Neue','Inter',system-ui,sans-serif",
  body: "'Inter',system-ui,sans-serif",
  mono: "'JetBrains Mono','SF Mono',monospace",
};

export const Structural = ({ source, folio, support, children }:
  { source:string; folio:string; support?:ReactNode; children:ReactNode }) => (
  <div style={{ width:'100%', height:'100%', background:PAPER, color:INK, fontFamily:Fn.body,
    padding:'72px 100px 56px', boxSizing:'border-box', display:'flex', flexDirection:'column', overflow:'hidden' }}>
    <div style={{ flex:1, minHeight:0, display:'flex' }}>{children}</div>
    {support && <div style={{ flex:'0 0 auto', display:'flex', gap:24, marginTop:26 }}>{support}</div>}
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
      borderTop:`1px solid ${LINE}`, paddingTop:14, marginTop:18, fontFamily:Fn.mono, fontSize:15,
      color:MUT, letterSpacing:'0.02em' }}>
      <span>{source}</span>
      <span style={{ fontFamily:Fn.caps, letterSpacing:'0.16em', textTransform:'uppercase' }}>{folio}</span></div>
  </div>
);
