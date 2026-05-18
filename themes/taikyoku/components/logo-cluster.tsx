/**
 * logo-cluster — Taikyoku library (Phase 9, Session B Archetype 14)
 * USE: customer/partner social proof, framed by a headline stat.
 * Canvas-agnostic block.
 * SLOTS: eyebrow, heading, headlineStat, logos[] (author ReactNode)
 * PROPS: monochrome (default TRUE — logos rendered ink/grayscale to
 *   protect the single-purple palette; an escape hatch toggle),
 *   density (lean: logos · standard:+eyebrow/heading · rich:+stat)
 * MOTION: heading tk-fadeUp; logos tk-fadeIn (opacity only — NO rise,
 *   NO scale; dignified) staggered. headlineStat = mono (Topic 4).
 */
import type { ReactNode } from 'react';
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)', line:'var(--tk-line,rgba(0,0,0,0.12))' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif", mono:"'JetBrains Mono','SF Mono',monospace" };

export type LogoClusterProps = {
  eyebrow: string; heading: string; headlineStat?: string;
  logos: ReactNode[]; monochrome?: boolean;
  density?: 'lean' | 'standard' | 'rich';
};

export const LogoCluster = ({
  eyebrow, heading, headlineStat, logos, monochrome = true, density = 'standard',
}: LogoClusterProps) => {
  const showHead = density !== 'lean';
  const showStat = density === 'rich';
  const cols = logos.length <= 6 ? 3 : 4;

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      {showHead && (
        <>
          <div style={{ borderBottom:`1px solid ${c.ink}`, paddingBottom:18, fontFamily:f.caps,
            fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase',
            display:'inline-flex', alignItems:'center', gap:14, animation:'600ms ease-out both tk-fadeUp' }}>
            <span aria-hidden style={{ width:12, height:12, background:c.accent, display:'inline-block' }} />
            <span style={{ fontWeight:700 }}>{eyebrow}</span>
          </div>
          <h2 style={{ fontFamily:f.display, fontSize:72, fontWeight:400, lineHeight:1.05,
            letterSpacing:'-0.02em', margin:'40px 0 0', color:c.ink,
            animation:'600ms ease-out 150ms both tk-fadeUp' }}>{heading}</h2>
        </>
      )}
      {showStat && headlineStat && (
        <div style={{ fontFamily:f.mono, fontVariantNumeric:'tabular-nums', fontSize:48, fontWeight:700,
          color:c.ink, marginTop:24, animation:'600ms ease-out 300ms both tk-fadeUp' }}>{headlineStat}</div>
      )}
      <div style={{ flex:1, display:'grid', alignItems:'center', justifyItems:'center', gap:'40px 56px',
        gridTemplateColumns:`repeat(${cols},1fr)`, marginTop:48 }}>
        {logos.map((lg,i)=>(
          <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'center',
            maxHeight:90, opacity: monochrome ? 0.74 : 1,
            filter: monochrome ? 'var(--tk-logo-filter,grayscale(1) brightness(0))' : 'none',
            animation:`500ms ease-out ${300+i*120}ms both tk-fadeIn` }}>
            {lg}
          </div>
        ))}
      </div>
    </div>
  );
};
export default LogoCluster;
