// ────────────────────────────────────────────────────────────────
// Frame — the universal content-slide chrome.
// Production-slide anatomy (COMPOSITION.md §1.5):
//   eyebrow strip · action title (+ optional subhead) · body region ·
//   source/method line · folio.
// Slots:
//   eyebrow:  string                 — caps eyebrow label
//   meta?:    string                 — right-side meta string (default: 'Taikyoku · master reference')
//   action:   string                 — the so-what headline (Title Case)
//   sub?:     string                 — optional one-line subhead
//   source:   string                 — citation/method line above the folio
//   folio:    string                 — page X / Y or section · page
//   jp?:      boolean                — if true: action in HomuraM, sub in Noto Sans JP
//   children: ReactNode              — the body region (use Rail/Band/TwoUp/AnchoredRail/DenseGrid)
// Token usage: var(--tk-*, <light>) for every color; fonts are not tokenized.
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';

const V = (n: string, f: string) => `var(--tk-${n},${f})`;
const INK   = V('ink', '#0A0A0A');
const SOFT  = V('ink-soft', '#3F3F3F');
const MUT   = V('ink-muted', '#6B6B6B');
const ACC   = V('accent', '#7030A0');
const LINE  = V('line', 'rgba(0,0,0,0.12)');
const PAPER = V('paper', '#FFFFFF');
const Fn = {
  display: "'Prata',Georgia,serif",
  caps:    "'Helvetica Neue','Inter',system-ui,sans-serif",
  body:    "'Inter',system-ui,sans-serif",
  mono:    "'JetBrains Mono','SF Mono',monospace",
  jpD:     "'HomuraM','Noto Serif JP',serif",
  jpB:     "'Noto Sans JP',system-ui,sans-serif",
};

export const Frame = ({ eyebrow, meta, action, sub, source, folio, jp, children }:
  { eyebrow:string; meta?:string; action:string; sub?:string; source:string; folio:string; jp?:boolean; children:ReactNode }) => (
  <div style={{ width:'100%', height:'100%', background:PAPER, color:INK, fontFamily:Fn.body,
    padding:'72px 100px 56px', boxSizing:'border-box', display:'flex', flexDirection:'column', overflow:'hidden' }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
      borderBottom:`1px solid ${INK}`, paddingBottom:14, fontFamily:Fn.caps, fontSize:20,
      letterSpacing:'0.22em', textTransform:'uppercase', animation:'600ms ease-out both tk-fadeUp' }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:14 }}>
        <span aria-hidden style={{ width:11, height:11, background:ACC, display:'inline-block' }} />
        <span style={{ fontWeight:700 }}>{eyebrow}</span></span>
      <span style={{ color:MUT, fontSize:18, letterSpacing:'0.16em' }}>{meta ?? 'Taikyoku · master reference'}</span>
    </div>
    <div style={{ marginTop:26, animation:'600ms ease-out 120ms both tk-fadeUp' }}>
      <h2 style={{ fontFamily: jp ? Fn.jpD : Fn.display, fontSize:54, fontWeight: jp?600:400,
        lineHeight: jp?1.12:1.06, letterSpacing:'-0.02em', margin:0, color:INK, maxWidth:1500 }}>{action}</h2>
      {sub && <p style={{ fontFamily: jp ? Fn.jpB : Fn.body, fontSize:23, lineHeight: jp?1.7:1.4,
        color:SOFT, margin:'12px 0 0', maxWidth:1400 }}>{sub}</p>}
    </div>
    <div style={{ flex:1, minHeight:0, overflow:'hidden', marginTop:30 }}>{children}</div>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
      borderTop:`1px solid ${LINE}`, paddingTop:14, marginTop:18, fontFamily:Fn.mono, fontSize:15,
      color:MUT, letterSpacing:'0.02em' }}>
      <span>{source}</span>
      <span style={{ fontFamily:Fn.caps, letterSpacing:'0.16em', textTransform:'uppercase' }}>{folio}</span>
    </div>
  </div>
);
