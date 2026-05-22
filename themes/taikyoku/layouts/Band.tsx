// ────────────────────────────────────────────────────────────────
// Band — `primary-band` named layout (COMPOSITION.md §1.5).
// Body region split top 64 / bottom 30: primary across the top, a bottom
// band of 2–4 equal support cells (mini-stats, takeaways).
// Slots:
//   primary: ReactNode    — the beat's hero component (zone is display:block
//                           so a block child fills 100 % of the zone width)
//   cells:   ReactNode[]  — equal-width cells along the bottom band
// No colors / no fonts — pure layout shell.
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';

export const Band = ({ primary, cells }:{ primary:ReactNode; cells:ReactNode[] }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:26, height:'100%' }}>
    <div style={{ flex:'1 1 64%', minWidth:0, minHeight:0, display:'block' }}>{primary}</div>
    <div style={{ flex:'0 0 auto', display:'flex', gap:24 }}>{cells.map((c,i)=><div key={i} style={{ flex:1 }}>{c}</div>)}</div>
  </div>
);
