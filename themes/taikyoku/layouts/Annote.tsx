// ────────────────────────────────────────────────────────────────
// Annote — support kit: italic-Prata aside (slide furniture).
// Editorial annotation — quieter than Insight; reads like a margin note.
// One short sentence; don't pad.
// Slots:
//   children: ReactNode  — the annotation
// Motion: tk-fadeUp once on enter, 400 ms delay.
// Tokens: ink-soft.
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';

const V = (n: string, f: string) => `var(--tk-${n},${f})`;
const SOFT = V('ink-soft', '#3F3F3F');
const Fn = { display: "'Prata',Georgia,serif" };

export const Annote = ({ children }:{ children:ReactNode }) => (
  <div style={{ fontFamily:Fn.display, fontStyle:'italic', fontSize:24, lineHeight:1.4, color:SOFT,
    animation:'600ms ease-out 400ms both tk-fadeUp' }}>{children}</div>
);
