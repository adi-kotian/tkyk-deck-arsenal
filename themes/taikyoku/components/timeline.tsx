/**
 * timeline — Taikyoku library (Phase 9, Session B Archetype 8)
 * USE: a horizontal past/event sequence. Canvas-agnostic block.
 * VARIANTS: 'milestones' (even-spaced nodes, alternating labels) ·
 *   'phased' (axis split into labelled phase bands, events within).
 * SLOTS: eyebrow, heading, events[]{date,label,descriptor},
 *   phases[]{label} (phased), activeIndex (marks "now")
 * PROPS: variant, density (lean: date+label · standard:+descriptor ·
 *   rich:+ outcome tag via descriptor). MOTION: axis tk-grow (scaleX
 *   L→R) → nodes tk-fadeUp staggered. Dates = mono (Topic 4).
 */
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)', line:'var(--tk-line,rgba(0,0,0,0.12))', paperTint:'var(--tk-paper-tint,#F4F7FB)' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif", mono:"'JetBrains Mono','SF Mono',monospace" };

export type TimelineEvent = { date: string; label: string; descriptor?: string };
export type TimelineProps = {
  eyebrow: string; heading: string; events: TimelineEvent[];
  phases?: { label: string }[]; activeIndex?: number;
  variant?: 'milestones' | 'phased'; density?: 'lean' | 'standard' | 'rich';
};

export const Timeline = ({
  eyebrow, heading, events, phases = [], activeIndex,
  variant = 'milestones', density = 'standard',
}: TimelineProps) => {
  const showDesc = density !== 'lean';

  const Node = ({ e, i }: { e: TimelineEvent; i: number }) => {
    const active = i === activeIndex;
    const above = i % 2 === 0;
    const block = (
      <div style={{ textAlign:'center', maxWidth:240 }}>
        <div style={{ fontFamily:f.mono, fontVariantNumeric:'tabular-nums', fontSize:20,
          color: active ? c.accent : c.inkMuted, letterSpacing:'0.02em' }}>{e.date}</div>
        <div style={{ fontFamily:f.display, fontSize:30, color: active ? c.accent : c.ink, marginTop:6 }}>{e.label}</div>
        {showDesc && e.descriptor && (
          <div style={{ fontFamily:f.body, fontSize:19, lineHeight:1.45, color:c.inkSoft, marginTop:6 }}>{e.descriptor}</div>
        )}
      </div>
    );
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
        animation:`500ms ease-out ${500+i*150}ms both tk-fadeUp` }}>
        <div style={{ height:150, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>{above ? block : null}</div>
        <div aria-hidden style={{ width: active?18:12, height: active?18:12, borderRadius:'50%',
          background: active ? c.accent : c.ink, border: active ? `3px solid ${c.accent}` : 'none' }} />
        <div style={{ height:150, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:14 }}>{!above ? block : null}</div>
      </div>
    );
  };

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ borderBottom:`1px solid ${c.ink}`, paddingBottom:18, fontFamily:f.caps,
        fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase',
        display:'inline-flex', alignItems:'center', gap:14, animation:'600ms ease-out both tk-fadeUp' }}>
        <span aria-hidden style={{ width:12, height:12, background:c.accent, display:'inline-block' }} />
        <span style={{ fontWeight:700 }}>{eyebrow}</span>
      </div>
      <h2 style={{ fontFamily:f.display, fontSize:80, fontWeight:400, lineHeight:1.02,
        letterSpacing:'-0.02em', margin:'44px 0 0', color:c.ink,
        animation:'600ms ease-out 150ms both tk-fadeUp' }}>{heading}</h2>

      {variant === 'phased' && phases.length > 0 && (
        <div style={{ display:'flex', gap:24, marginTop:48 }}>
          {phases.map((p,i)=>(
            <div key={i} style={{ flex:1, background:c.paperTint, borderTop:`1px solid ${c.line}`,
              padding:'14px 18px', fontFamily:f.caps, fontSize:18, letterSpacing:'0.16em',
              textTransform:'uppercase', color:c.inkMuted,
              animation:`500ms ease-out ${300+i*120}ms both tk-fadeIn` }}>{p.label}</div>
          ))}
        </div>
      )}

      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', marginTop:24 }}>
        <div style={{ position:'relative' }}>
          <div aria-hidden style={{ height:2, background:c.ink, transformOrigin:'left center',
            animation:'700ms cubic-bezier(0.7,0,0.2,1) 200ms both tk-grow' }} />
          <div style={{ display:'flex', position:'absolute', left:0, right:0, top:-150 }}>
            {events.map((e,i)=><Node key={i} e={e} i={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timeline;
