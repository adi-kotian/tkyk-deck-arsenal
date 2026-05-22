// ────────────────────────────────────────────────────────────────
// Insight — support kit: accent-dot + one sharp sentence (slide furniture).
// Use as a rail item or a grid cell when an annotation needs to assert,
// not describe. One sentence; don't pad to a paragraph.
// Slots:
//   children: ReactNode  — the sentence
// Motion: tk-fadeUp once on enter, 360 ms delay.
// Tokens: accent / ink.
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';

const V = (n: string, f: string) => `var(--tk-${n},${f})`;
const ACC = V('accent', '#7030A0');
const INK = V('ink', '#0A0A0A');
const Fn = { body: "'Inter',system-ui,sans-serif" };

export const Insight = ({ children }:{ children:ReactNode }) => (
  <div style={{ display:'flex', gap:14, alignItems:'flex-start',
    animation:'600ms ease-out 360ms both tk-fadeUp' }}>
    <span aria-hidden style={{ width:10, height:10, background:ACC, marginTop:9, flex:'0 0 auto' }} />
    <div style={{ fontFamily:Fn.body, fontSize:22, lineHeight:1.45, color:INK }}>{children}</div>
  </div>
);
