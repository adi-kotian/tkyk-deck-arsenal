// ────────────────────────────────────────────────────────────────
// AnchoredRail — `anchored-rail` named layout (COMPOSITION.md §1.5).
// Full-width primary with a thin (~26 %) right annotation/footnote rail
// (insights, definitions, source). Use when the primary needs full breadth
// but a slim margin still earns its keep.
// Slots:
//   primary: ReactNode  — the wide-format primary (zone is display:block
//                         so a block child fills 100 % of the zone width)
//   rail:    ReactNode  — narrow right column (stack with gap 18)
// No colors / no fonts — pure layout shell.
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';

export const AnchoredRail = ({ primary, rail }:{ primary:ReactNode; rail:ReactNode }) => (
  <div style={{ display:'flex', gap:48, height:'100%' }}>
    <div style={{ flex:'1 1 74%', minWidth:0, minHeight:0, display:'block' }}>{primary}</div>
    <div style={{ flex:'1 1 26%', minWidth:0, display:'flex', flexDirection:'column', gap:18 }}>{rail}</div>
  </div>
);
