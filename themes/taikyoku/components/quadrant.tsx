/**
 * quadrant — Taikyoku library (Phase 9 refine of Session B Archetype
 * 18, "2×2 quadrant"). Canvas-agnostic block.
 * USE: positioning on two axes.
 * SLOTS: eyebrow, heading, axis{xLabel,yLabel},
 *   quadrants[4]{label, items[]}  (0=TL 1=TR 2=BL 3=BR),
 *   highlightQuadrant? (0–3)
 * PROPS: density (lean: labels · standard:+items · rich:+items)
 * TYPE (Phase 8 refine): axis & quadrant labels = HN tracked caps;
 *   plotted-item labels = Prata (editorial, distinct from the caps
 *   scaffold). highlight = purple accent + paper-tint-2 fill (on-palette).
 * MOTION: axes tk-grow (x) + tk-growY (y) form the cross → items
 *   tk-fadeUp staggered. One long motion.
 */
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)',
  paperTint2:'var(--tk-paper-tint-2,#E9EEF4)', line:'var(--tk-line,rgba(0,0,0,0.12))' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif" };

export type Quad = { label: string; items: string[] };
export type QuadrantProps = {
  eyebrow: string; heading: string;
  axis: { xLabel: string; yLabel: string };
  quadrants: [Quad, Quad, Quad, Quad];
  highlightQuadrant?: 0 | 1 | 2 | 3;
  density?: 'lean' | 'standard' | 'rich';
};

export const Quadrant = ({
  eyebrow, heading, axis, quadrants, highlightQuadrant, density = 'standard',
}: QuadrantProps) => {
  const showItems = density !== 'lean';

  const Cell = ({ q, idx }: { q: Quad; idx: number }) => {
    const hot = idx === highlightQuadrant;
    return (
      <div style={{ position:'relative', padding:'28px 30px', background: hot ? c.paperTint2 : 'transparent',
        display:'flex', flexDirection:'column', gap:14,
        animation:`500ms ease-out ${600+idx*120}ms both tk-fadeUp` }}>
        <div style={{ fontFamily:f.caps, fontSize:20, letterSpacing:'0.16em', textTransform:'uppercase',
          color: hot ? c.accent : c.inkMuted, display:'inline-flex', alignItems:'center', gap:10 }}>
          {hot && <span aria-hidden style={{ width:10, height:10, background:c.accent, display:'inline-block' }} />}
          {q.label}
        </div>
        {showItems && q.items.map((it,i)=>(
          <div key={i} style={{ fontFamily:f.display, fontSize:28, color:c.ink }}>{it}</div>
        ))}
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
      <h2 style={{ fontFamily:f.display, fontSize:72, fontWeight:400, lineHeight:1.02,
        letterSpacing:'-0.02em', margin:'36px 0 28px', color:c.ink,
        animation:'600ms ease-out 150ms both tk-fadeUp' }}>{heading}</h2>

      <div style={{ flex:1, display:'flex', gap:20 }}>
        <div style={{ display:'flex', alignItems:'center' }}>
          <span style={{ fontFamily:f.caps, fontSize:18, letterSpacing:'0.16em', textTransform:'uppercase',
            color:c.inkMuted, writingMode:'vertical-rl', transform:'rotate(180deg)' }}>{axis.yLabel}</span>
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
          <div style={{ flex:1, position:'relative' }}>
            <div aria-hidden style={{ position:'absolute', left:0, right:0, top:'50%', height:2, background:c.ink,
              transformOrigin:'left center', animation:'700ms cubic-bezier(0.7,0,0.2,1) 200ms both tk-grow' }} />
            <div aria-hidden style={{ position:'absolute', top:0, bottom:0, left:'50%', width:2, background:c.ink,
              transformOrigin:'top center', animation:'700ms cubic-bezier(0.7,0,0.2,1) 200ms both tk-growY' }} />
            <div style={{ position:'absolute', inset:0, display:'grid',
              gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr' }}>
              {quadrants.map((q,idx)=><Cell key={idx} q={q} idx={idx} />)}
            </div>
          </div>
          <div style={{ textAlign:'center', marginTop:14, fontFamily:f.caps, fontSize:18,
            letterSpacing:'0.16em', textTransform:'uppercase', color:c.inkMuted }}>{axis.xLabel}</div>
        </div>
      </div>
    </div>
  );
};
export default Quadrant;
