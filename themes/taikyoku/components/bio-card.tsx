/**
 * bio-card — Taikyoku library (Phase 9, Session B Archetype 12)
 * USE: people — founder/leader or team. Canvas-agnostic block.
 * VARIANTS: 'spotlight' (one person large + bio) · 'grid' (3–6 cards) ·
 *   'lead-supporting' (one prominent + bench).
 * SLOTS: eyebrow, heading, members[]{name,role,credential,bio,portrait}
 * PROPS: variant, density STANDARD FIXED (no density prop — Session B).
 * TYPE: role = Prata *italic* (person-role convention). Portrait is an
 *   author image; graceful initials monogram when absent.
 * MOTION: heading tk-fadeUp; cards tk-rise staggered 150ms. No tk-draw.
 */
import type { ReactNode } from 'react';
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)', paperTint:'var(--tk-paper-tint,#F4F7FB)', line:'var(--tk-line,rgba(0,0,0,0.12))' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif" };

export type Member = { name: string; role: string; credential?: string; bio?: string; portrait?: ReactNode };
export type BioCardProps = {
  eyebrow: string; heading: string; members: Member[];
  variant?: 'spotlight' | 'grid' | 'lead-supporting';
};

const Monogram = ({ name, size }: { name: string; size: number }) => (
  <div aria-hidden style={{ width:size, height:size, background:c.paperTint, border:`1px solid ${c.line}`,
    display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:f.display, fontSize:size*0.34, color:c.inkMuted }}>
    {name.split(' ').map(w=>w[0]).slice(0,2).join('')}
  </div>
);

export const BioCard = ({ eyebrow, heading, members, variant = 'grid' }: BioCardProps) => {
  const Person = ({ m, size, big, i }: { m: Member; size: number; big?: boolean; i: number }) => (
    <div style={{ display:'flex', flexDirection: big?'row':'column', gap: big?40:18, alignItems: big?'center':'flex-start',
      animation:`600ms cubic-bezier(0.2,0.7,0.3,1) ${300+i*150}ms both tk-rise` }}>
      <div style={{ width:size, height:size, flex:'0 0 auto', overflow:'hidden', border:`1px solid ${c.line}` }}>
        {m.portrait ?? <Monogram name={m.name} size={size} />}
      </div>
      <div>
        <div style={{ fontFamily:f.display, fontSize: big?56:32, color:c.ink }}>{m.name}</div>
        <div style={{ fontFamily:f.display, fontStyle:'italic', fontSize: big?28:22, color:c.inkSoft, marginTop:6 }}>{m.role}</div>
        {m.credential && (
          <div style={{ fontFamily:f.caps, fontSize:16, letterSpacing:'0.14em', textTransform:'uppercase', color:c.inkMuted, marginTop:10 }}>{m.credential}</div>
        )}
        {big && m.bio && (
          <p style={{ fontFamily:f.body, fontSize:24, lineHeight:1.55, color:c.inkSoft, margin:'18px 0 0', maxWidth:760 }}>{m.bio}</p>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ borderBottom:`1px solid ${c.ink}`, paddingBottom:18, fontFamily:f.caps,
        fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase',
        display:'inline-flex', alignItems:'center', gap:14, animation:'600ms ease-out both tk-fadeUp' }}>
        <span aria-hidden style={{ width:12, height:12, background:c.accent, display:'inline-block' }} />
        <span style={{ fontWeight:700 }}>{eyebrow}</span>
      </div>
      <h2 style={{ fontFamily:f.display, fontSize:78, fontWeight:400, lineHeight:1.02,
        letterSpacing:'-0.02em', margin:'40px 0 40px', color:c.ink,
        animation:'600ms ease-out 150ms both tk-fadeUp' }}>{heading}</h2>

      {variant === 'spotlight' && (
        <div style={{ flex:1, display:'flex', alignItems:'center' }}>
          <Person m={members[0]} size={300} big i={0} />
        </div>
      )}
      {variant === 'grid' && (
        <div style={{ flex:1, display:'grid', gap:40,
          gridTemplateColumns:`repeat(${Math.min(members.length,4)},1fr)`, alignContent:'start' }}>
          {members.map((m,i)=><Person key={i} m={m} size={180} i={i} />)}
        </div>
      )}
      {variant === 'lead-supporting' && (
        <div style={{ flex:1, display:'flex', gap:64, alignItems:'center' }}>
          <div style={{ flex:'0 0 52%' }}><Person m={members[0]} size={260} big i={0} /></div>
          <div style={{ flex:1, display:'grid', gap:28, gridTemplateColumns:'1fr 1fr' }}>
            {members.slice(1).map((m,i)=><Person key={i} m={m} size={120} i={i+1} />)}
          </div>
        </div>
      )}
    </div>
  );
};
export default BioCard;
