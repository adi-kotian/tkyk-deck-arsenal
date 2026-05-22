// ────────────────────────────────────────────────────────────────
// TwoUp — `two-up` named layout (COMPOSITION.md §1.5).
// Two co-equal components side by side under one action title + a
// shared takeaway strip (e.g. chart ⟷ comparison).
// Slots:
//   a:    ReactNode  — left component  (zone is display:block — block child fills the zone)
//   b:    ReactNode  — right component (zone is display:block — block child fills the zone)
//   take: string     — the shared takeaway strip (one-sentence so-what)
// Tokens used by the takeaway strip only.
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';

const V = (n: string, f: string) => `var(--tk-${n},${f})`;
const INK  = V('ink', '#0A0A0A');
const LINE = V('line', 'rgba(0,0,0,0.12)');
const Fn = { body: "'Inter',system-ui,sans-serif" };

export const TwoUp = ({ a, b, take }:{ a:ReactNode; b:ReactNode; take:string }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:24, height:'100%' }}>
    <div style={{ flex:1, minHeight:0, display:'flex', gap:40 }}>
      <div style={{ flex:1, minWidth:0, minHeight:0, display:'block' }}>{a}</div>
      <div style={{ flex:1, minWidth:0, minHeight:0, display:'block' }}>{b}</div></div>
    <div style={{ flex:'0 0 auto', borderTop:`1px solid ${LINE}`, paddingTop:16, fontFamily:Fn.body,
      fontSize:24, color:INK, fontWeight:500 }}>{take}</div>
  </div>
);
