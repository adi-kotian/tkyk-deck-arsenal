/**
 * process-flow — Taikyoku library (Phase 9 refine of Session B
 * Archetype 17, "process/workflow diagram"). Canvas-agnostic block.
 * USE: a linear step sequence (distinct from the conceptual framework
 * at methodology #10). Line-draw is this component's signature.
 * SLOTS: eyebrow, heading, steps[]{ number, label, descriptor?,
 *   status?: 'done' | 'active' | 'blocked' }
 * PROPS: density (lean: label · standard:+descriptor · rich:+status)
 * TYPE: step numbers = mono (Phase 8 refine). status 'blocked' →
 *   accent-negative (sanctioned non-data use, Session C C2 note).
 * MOTION: connecting stroke tk-grow (scaleX L→R) → step nodes
 *   tk-fadeUp synced (process being traced). One long motion.
 */
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)', accentNegative:'var(--tk-accent-negative,#9B2226)', line:'var(--tk-line,rgba(0,0,0,0.12))' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif", mono:"'JetBrains Mono','SF Mono',monospace" };

export type ProcessStep = { number: string; label: string; descriptor?: string; status?: 'done' | 'active' | 'blocked' };
export type ProcessFlowProps = {
  eyebrow: string; heading: string; steps: ProcessStep[];
  density?: 'lean' | 'standard' | 'rich';
};

export const ProcessFlow = ({ eyebrow, heading, steps, density = 'standard' }: ProcessFlowProps) => {
  const showDesc = density !== 'lean';
  const showStatus = density === 'rich';
  const stColor = (s?: string) => s === 'blocked' ? c.accentNegative : s === 'active' ? c.accent : c.ink;

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ borderBottom:`1px solid ${c.ink}`, paddingBottom:18, fontFamily:f.caps,
        fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase',
        display:'inline-flex', alignItems:'center', gap:14, animation:'600ms ease-out both tk-fadeUp' }}>
        <span aria-hidden style={{ width:12, height:12, background:c.accent, display:'inline-block' }} />
        <span style={{ fontWeight:700 }}>{eyebrow}</span>
      </div>
      <h2 style={{ fontFamily:f.display, fontSize:78, fontWeight:400, lineHeight:1.02,
        letterSpacing:'-0.02em', margin:'40px 0 0', color:c.ink,
        animation:'600ms ease-out 150ms both tk-fadeUp' }}>{heading}</h2>

      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div style={{ position:'relative', paddingTop:8 }}>
          <div aria-hidden style={{ position:'absolute', top:30, left:'4%', right:'4%', height:3,
            background:c.ink, transformOrigin:'left center',
            animation:'800ms cubic-bezier(0.7,0,0.2,1) 200ms both tk-grow' }} />
          <div style={{ display:'flex' }}>
            {steps.map((s,i)=>(
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
                animation:`500ms ease-out ${300+i*180}ms both tk-fadeUp` }}>
                <div style={{ width:56, height:56, borderRadius:'50%', background:'#FFF',
                  border:`3px solid ${stColor(s.status)}`, display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:f.mono, fontVariantNumeric:'tabular-nums', fontWeight:700, fontSize:22, color:stColor(s.status) }}>
                  {s.number}
                </div>
                <div style={{ fontFamily:f.display, fontSize:30, color:c.ink, marginTop:20 }}>{s.label}</div>
                {showDesc && s.descriptor && (
                  <div style={{ fontFamily:f.body, fontSize:20, lineHeight:1.45, color:c.inkSoft, marginTop:8, maxWidth:240 }}>{s.descriptor}</div>
                )}
                {showStatus && s.status && (
                  <div style={{ fontFamily:f.caps, fontSize:15, letterSpacing:'0.14em', textTransform:'uppercase',
                    marginTop:10, color:stColor(s.status) }}>{s.status}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProcessFlow;
