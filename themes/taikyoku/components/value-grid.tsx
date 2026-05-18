/**
 * value-grid — Taikyoku library (Phase 9 refine of Session B Archetype
 * 16, "three-card value grid"). Canvas-agnostic block.
 * USE: 3 (or N) value/claim cards.
 * SLOTS: eyebrow, heading, cards[]{ roleKicker?, title, body }
 * PROPS: density (lean: title+body · standard:+roleKicker ·
 *   rich:+roleKicker, looser), surface ('bare' | 'tint' | 'tint2')
 *   default 'bare' (hairline-top, Aurora discipline; no shadow/gradient)
 * TYPE (Phase 8 Conflict 2): card TITLE = Prata (non-italic);
 *   roleKicker = Prata *italic*; generic eyebrow = HN tracked caps.
 * MOTION: heading tk-fadeUp; cards tk-rise staggered 150ms.
 */
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)',
  paper:'var(--tk-paper,#FFFFFF)', paperTint:'var(--tk-paper-tint,#F4F7FB)', paperTint2:'var(--tk-paper-tint-2,#E9EEF4)', line:'var(--tk-line,rgba(0,0,0,0.12))' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif" };

export type ValueCard = { roleKicker?: string; title: string; body: string };
export type ValueGridProps = {
  eyebrow: string; heading: string; cards: ValueCard[];
  density?: 'lean' | 'standard' | 'rich'; surface?: 'bare' | 'tint' | 'tint2';
};

export const ValueGrid = ({
  eyebrow, heading, cards, density = 'standard', surface = 'bare',
}: ValueGridProps) => {
  const showKicker = density !== 'lean';
  const bg = surface === 'tint' ? c.paperTint : surface === 'tint2' ? c.paperTint2 : c.paper;
  const pad = surface === 'bare' ? '28px 0 0' : '28px 28px';

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ borderBottom:`1px solid ${c.ink}`, paddingBottom:18, fontFamily:f.caps,
        fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase',
        display:'inline-flex', alignItems:'center', gap:14, animation:'600ms ease-out both tk-fadeUp' }}>
        <span aria-hidden style={{ width:12, height:12, background:c.accent, display:'inline-block' }} />
        <span style={{ fontWeight:700 }}>{eyebrow}</span>
      </div>
      <h2 style={{ fontFamily:f.display, fontSize:80, fontWeight:400, lineHeight:1.02,
        letterSpacing:'-0.02em', margin:'44px 0 48px', color:c.ink,
        animation:'600ms ease-out 150ms both tk-fadeUp' }}>{heading}</h2>
      <div style={{ flex:1, display:'grid', gap:40,
        gridTemplateColumns:`repeat(${cards.length},1fr)`, alignContent:'center' }}>
        {cards.map((card,i)=>(
          <div key={i} style={{ background:bg, padding:pad, borderTop:`1px solid ${c.line}`,
            animation:`600ms cubic-bezier(0.2,0.7,0.3,1) ${300+i*150}ms both tk-rise` }}>
            {showKicker && card.roleKicker && (
              <div style={{ fontFamily:f.display, fontStyle:'italic', fontSize:26, color:c.accent }}>{card.roleKicker}</div>
            )}
            <div style={{ fontFamily:f.display, fontSize:46, lineHeight:1.08, color:c.ink, marginTop:showKicker?12:0 }}>{card.title}</div>
            <p style={{ fontFamily:f.body, fontSize:24, lineHeight:1.55, color:c.inkSoft, margin:'18px 0 0' }}>{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ValueGrid;
