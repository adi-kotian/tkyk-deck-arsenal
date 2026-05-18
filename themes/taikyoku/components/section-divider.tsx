/**
 * section-divider — Taikyoku library (Phase 9 refine of Session B
 * Archetype 15, Phase-8-reconciled). Full-slide GRADIENT canvas.
 * USE: numbered chapter divider.
 * SLOTS: kicker?, number (Prata, large), title (Prata)
 * PROPS: gradient?{cool,warm} — per-deck Session A industry variant;
 *   default cool→warm. (KanjiSeal slot is RESERVED but renders
 *   NOTHING — seal deferred Phase 8; do not add it.)
 * MOTION: number tk-fadeUp → AccentRule tk-grow beat → title tk-fadeUp.
 *   NO breath (removed theme-wide Phase 8). Gradient never rotates.
 */
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif" };

export type SectionDividerProps = {
  kicker?: string; number: string; title: string;
  gradient?: { cool: string; warm: string };
};

export const SectionDivider = ({
  kicker, number, title, gradient = { cool:'var(--tk-grad-cool,#A6C9EB)', warm:'var(--tk-grad-warm,#FFE9BF)' },
}: SectionDividerProps) => (
  <div style={{ width:'100%', height:'100%',
    background:`linear-gradient(330deg, ${gradient.cool} var(--tk-grad-cool-pos,12%), ${gradient.warm} 100%)`,
    color:c.ink, fontFamily:f.body, padding:100, boxSizing:'border-box',
    display:'flex', flexDirection:'column', justifyContent:'center', gap:24 }}>
    {/* KanjiSeal slot — RESERVED, intentionally empty (seal deferred). */}
    {kicker && (
      <div style={{ fontFamily:f.caps, fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase',
        fontWeight:700, color:c.inkSoft, animation:'600ms ease-out both tk-fadeUp' }}>{kicker}</div>
    )}
    <div style={{ fontFamily:f.display, fontSize:144, lineHeight:1, color:c.ink,
      animation:'700ms ease-out 150ms both tk-fadeUp' }}>{number}</div>
    <div aria-hidden style={{ width:280, height:6, background:c.accent, transformOrigin:'left center',
      animation:'700ms cubic-bezier(0.7,0,0.2,1) 450ms both tk-grow' }} />
    <h2 style={{ fontFamily:f.display, fontSize:88, fontWeight:400, lineHeight:1.02,
      letterSpacing:'-0.02em', margin:0, color:c.ink,
      animation:'700ms ease-out 700ms both tk-fadeUp' }}>{title}</h2>
  </div>
);
export default SectionDivider;
