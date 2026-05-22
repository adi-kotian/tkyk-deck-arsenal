// ────────────────────────────────────────────────────────────────
// DenseGrid — `dense-grid` named layout (COMPOSITION.md §1.5).
// Action title (in Frame) + a 2×2 / 2×3 grid of small components or
// callout cells. The densest named layout. Each cell alternates surface
// tint/tint-2 by index so the grid reads as a structured field, not as
// a slab.
// Reference implementation: master-reference's `Density · pushed` slide.
// Slots:
//   cells: ReactNode[] — populated grid cells; first 4 (or 6) used
// Props:
//   columns?: 2 | 3    — default 3 (gives a 2×3); 2 gives a 2×2
// Motion: tk-rise staggered 100 ms per cell.
// Tokens: paper-tint / paper-tint-2 / line (cell surfaces + hairline).
// Hook-free — mandatory.
// ────────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';

const V = (n: string, f: string) => `var(--tk-${n},${f})`;
const TINT = V('paper-tint', '#F4F7FB');
const T2   = V('paper-tint-2', '#E9EEF4');
const LINE = V('line', 'rgba(0,0,0,0.12)');

export const DenseGrid = ({ cells, columns }:{ cells:ReactNode[]; columns?: 2 | 3 }) => (
  <div style={{ display:'grid', gridTemplateColumns:`repeat(${columns ?? 3}, 1fr)`,
    gridTemplateRows:'1fr 1fr', gap:22, height:'100%' }}>
    {cells.map((cell,i)=>(
      <div key={i} style={{
        background: i % 2 === 0 ? TINT : T2, borderTop:`1px solid ${LINE}`,
        padding:'22px 24px', display:'flex', flexDirection:'column', gap:8,
        animation:`500ms ease-out ${150+i*100}ms both tk-rise`,
      }}>{cell}</div>
    ))}
  </div>
);
