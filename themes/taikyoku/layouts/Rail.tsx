// ────────────────────────────────────────────────────────────────
// Rail — `primary-rail` named layout (COMPOSITION.md §1.5).
// Body region split 62 / 38: primary component left ~66 %, supporting
// rail right ~34 % (stack of 2–3 supports — stat / insight / source).
// Default for chart / metric / comparison beats.
// Slots:
//   primary: ReactNode  — the beat's hero component (zone is display:block
//                         so a block child fills 100 % of the zone width)
//   rail:    ReactNode  — supporting cluster (the rail uses flex column
//                         with gap 22, justify-content: center)
// No colors / no fonts — pure layout shell.
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';

export const Rail = ({ primary, rail }:{ primary:ReactNode; rail:ReactNode }) => (
  <div style={{ display:'flex', gap:48, height:'100%' }}>
    <div style={{ flex:'1 1 66%', minWidth:0, minHeight:0, display:'block' }}>{primary}</div>
    <div style={{ flex:'1 1 34%', minWidth:0, display:'flex', flexDirection:'column', gap:22, justifyContent:'center' }}>{rail}</div>
  </div>
);
