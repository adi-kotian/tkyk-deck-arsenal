/**
 * before-after — Taikyoku library (Phase 9, Session B Archetype 11)
 * USE: a directional transformation (distinct from the neutral compare
 * at #2). Canvas-agnostic block.
 * VARIANTS: 'stacked-overlay' (before above, muted ink; after below,
 *   full ink + accent) · 'diff-list' (paired old→new rows).
 * SLOTS: eyebrow, heading, before{label,points}, after{label,points},
 *   transitionLabel, deltaMetric, diffPairs[]{from,to}
 * PROPS: variant, density (lean: labels · standard:+points ·
 *   rich:+deltaMetric). RULE: "before" = muted ink, NEVER semantic red
 *   (red is data-negative only). MOTION sequenced: before tk-fadeUp →
 *   connecting accent tk-grow → after tk-rise.
 */
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)', paperTint:'var(--tk-paper-tint,#F4F7FB)', line:'var(--tk-line,rgba(0,0,0,0.12))' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif", mono:"'JetBrains Mono','SF Mono',monospace" };

export type BAState = { label: string; points: string[] };
export type BeforeAfterProps = {
  eyebrow: string; heading: string;
  before: BAState; after: BAState;
  transitionLabel?: string; deltaMetric?: string;
  diffPairs?: { from: string; to: string }[];
  variant?: 'stacked-overlay' | 'diff-list'; density?: 'lean' | 'standard' | 'rich';
};

export const BeforeAfter = ({
  eyebrow, heading, before, after, transitionLabel, deltaMetric,
  diffPairs = [], variant = 'stacked-overlay', density = 'standard',
}: BeforeAfterProps) => {
  const showPoints = density !== 'lean';
  const showDelta = density === 'rich';

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ borderBottom:`1px solid ${c.ink}`, paddingBottom:18, fontFamily:f.caps,
        fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase',
        display:'inline-flex', alignItems:'center', gap:14, animation:'600ms ease-out both tk-fadeUp' }}>
        <span aria-hidden style={{ width:12, height:12, background:c.accent, display:'inline-block' }} />
        <span style={{ fontWeight:700 }}>{eyebrow}</span>
      </div>
      <h2 style={{ fontFamily:f.display, fontSize:78, fontWeight:400, lineHeight:1.02,
        letterSpacing:'-0.02em', margin:'40px 0 36px', color:c.ink,
        animation:'600ms ease-out 150ms both tk-fadeUp' }}>{heading}</h2>

      {variant === 'diff-list' ? (
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:18 }}>
          {diffPairs.map((d,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:28,
              borderTop:`1px solid ${c.line}`, padding:'18px 0',
              animation:`600ms ease-out ${300+i*120}ms both tk-fadeUp` }}>
              <span style={{ flex:1, fontFamily:f.body, fontSize:24, color:c.inkMuted, textDecoration:'line-through' }}>{d.from}</span>
              <span aria-hidden style={{ color:c.accent, fontSize:26 }}>→</span>
              <span style={{ flex:1, fontFamily:f.body, fontSize:24, color:c.ink, fontWeight:700 }}>{d.to}</span>
            </div>
          ))}
          {showDelta && deltaMetric && (
            <div style={{ fontFamily:f.mono, fontVariantNumeric:'tabular-nums', fontSize:40, color:c.accent, marginTop:18,
              animation:'600ms ease-out 700ms both tk-fadeUp' }}>{deltaMetric}</div>
          )}
        </div>
      ) : (
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:0 }}>
          <div style={{ opacity:0.55, animation:'600ms ease-out 200ms both tk-fadeUp' }}>
            <div style={{ fontFamily:f.caps, fontSize:20, letterSpacing:'0.18em', textTransform:'uppercase', color:c.inkMuted }}>{before.label}</div>
            {showPoints && (
              <div style={{ display:'flex', gap:32, marginTop:14 }}>
                {before.points.map((p,i)=><span key={i} style={{ fontFamily:f.body, fontSize:24, color:c.inkSoft }}>{p}</span>)}
              </div>
            )}
          </div>
          <div aria-hidden style={{ display:'flex', alignItems:'center', gap:18, margin:'30px 0' }}>
            <div style={{ width:120, height:6, background:c.accent, transformOrigin:'left center',
              animation:'700ms cubic-bezier(0.7,0,0.2,1) 500ms both tk-grow' }} />
            {transitionLabel && (
              <span style={{ fontFamily:f.caps, fontSize:18, letterSpacing:'0.16em', textTransform:'uppercase', color:c.accent }}>{transitionLabel}</span>
            )}
          </div>
          <div style={{ animation:'600ms cubic-bezier(0.2,0.7,0.3,1) 800ms both tk-rise' }}>
            <div style={{ fontFamily:f.display, fontSize:48, color:c.ink }}>{after.label}</div>
            {showPoints && (
              <div style={{ display:'flex', gap:32, marginTop:14 }}>
                {after.points.map((p,i)=><span key={i} style={{ fontFamily:f.body, fontSize:26, color:c.ink, fontWeight:500 }}>{p}</span>)}
              </div>
            )}
            {showDelta && deltaMetric && (
              <div style={{ fontFamily:f.mono, fontVariantNumeric:'tabular-nums', fontSize:44, color:c.accent, marginTop:22 }}>{deltaMetric}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default BeforeAfter;
