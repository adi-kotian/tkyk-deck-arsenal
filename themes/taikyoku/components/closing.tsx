/**
 * closing — Taikyoku library (Phase 9 refine of Session B Archetype 19,
 * Phase-8-reconciled). Full-slide PAPER canvas, centered.
 * USE: the deck's sign-off.
 * SLOTS: headline (Prata), sub?, mark? (ReactNode — the brand IMAGE
 *   asset, passed by the deck; WordmarkLockup is PARKED, do not rebuild
 *   it typographically)
 * PROPS: goldMoment (default FALSE — gold is a deck-level assignment,
 *   compose-deck decides; the closing no longer auto-claims it).
 * MOTION: headline tk-fadeUp → (gold rule tk-grow IF goldMoment) → mark
 *   tk-fadeIn. NO breath (removed theme-wide Phase 8 — no bookend).
 */
import type { ReactNode } from 'react';
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', accent:'var(--tk-accent,#7030A0)', accentHot:'var(--tk-accent-hot,#FFE1A4)', paper:'var(--tk-paper,#FFFFFF)' };
const f = { display:"'Prata',Georgia,serif", body:"'Inter',system-ui,sans-serif" };

export type ClosingProps = {
  headline: string; sub?: string; mark?: ReactNode; goldMoment?: boolean;
};

export const Closing = ({ headline, sub, mark, goldMoment = false }: ClosingProps) => (
  <div style={{ width:'100%', height:'100%', background:c.paper, color:c.ink,
    fontFamily:f.body, padding:100, boxSizing:'border-box',
    display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
    textAlign:'center', gap:36 }}>
    <h2 style={{ fontFamily:f.display, fontSize:120, fontWeight:400, lineHeight:1.0,
      letterSpacing:'-0.02em', margin:0, color:c.ink,
      animation:'700ms ease-out both tk-fadeUp' }}>{headline}</h2>
    {sub && (
      <p style={{ fontFamily:f.body, fontSize:30, lineHeight:1.4, color:c.inkSoft, maxWidth:1100, margin:0,
        animation:'600ms ease-out 300ms both tk-fadeUp' }}>{sub}</p>
    )}
    <div aria-hidden style={{ width:360, height:6,
      background: goldMoment ? c.accentHot : c.accent, transformOrigin:'center',
      animation:'800ms cubic-bezier(0.7,0,0.2,1) 400ms both tk-grow' }} />
    {mark && (
      <div style={{ animation:'600ms ease-out 900ms both tk-fadeIn' }}>{mark}</div>
    )}
  </div>
);
export default Closing;
