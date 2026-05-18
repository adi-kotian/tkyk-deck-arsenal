/**
 * roadmap — Taikyoku library (Phase 9, Session B Archetype 9)
 * USE: forward-looking plan. Canvas-agnostic block.
 * VARIANTS: 'quarter-columns' (calendar columns of cards) ·
 *   'now-next-later' (horizon buckets — same layout, horizon labels) ·
 *   'swimlanes' (lanes[] rows × columns; item[laneIndex] is that
 *   lane's entry in the column — a lanes×columns matrix).
 * SLOTS: eyebrow, heading, columns[]{label, items[]{text,owner?,status?}},
 *   lanes[]{label} (swimlanes), activeColumn
 * PROPS: variant, density (lean: text · standard:+owner · rich:+status)
 * RULES: column labels = mono (Topic 4). status 'at-risk' →
 *   accent-negative (Topic 7). MOTION sequenced: column dividers
 *   tk-growY → item cards tk-rise.
 */
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)', accentNegative:'var(--tk-accent-negative,#9B2226)', paperTint:'var(--tk-paper-tint,#F4F7FB)', line:'var(--tk-line,rgba(0,0,0,0.12))' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif", mono:"'JetBrains Mono','SF Mono',monospace" };

export type RoadmapItem = { text: string; owner?: string; status?: 'on-track' | 'at-risk' };
export type RoadmapColumn = { label: string; items: RoadmapItem[] };
export type RoadmapProps = {
  eyebrow: string; heading: string; columns: RoadmapColumn[];
  lanes?: { label: string }[]; activeColumn?: number;
  variant?: 'quarter-columns' | 'now-next-later' | 'swimlanes';
  density?: 'lean' | 'standard' | 'rich';
};

export const Roadmap = ({
  eyebrow, heading, columns, lanes = [], activeColumn,
  variant = 'quarter-columns', density = 'standard',
}: RoadmapProps) => {
  const showOwner = density !== 'lean';
  const showStatus = density === 'rich';

  const Card = ({ it, i }: { it: RoadmapItem; i: number }) => (
    <div style={{ background:c.paperTint, borderTop:`1px solid ${c.line}`, padding:'18px 20px',
      animation:`600ms cubic-bezier(0.2,0.7,0.3,1) ${360+i*120}ms both tk-rise` }}>
      <div style={{ fontFamily:f.body, fontSize:23, lineHeight:1.4, color:c.ink }}>{it.text}</div>
      {showOwner && it.owner && (
        <div style={{ fontFamily:f.caps, fontSize:16, letterSpacing:'0.14em', textTransform:'uppercase', color:c.inkMuted, marginTop:10 }}>{it.owner}</div>
      )}
      {showStatus && it.status && (
        <div style={{ fontFamily:f.caps, fontSize:15, letterSpacing:'0.12em', textTransform:'uppercase', marginTop:8,
          color: it.status === 'at-risk' ? c.accentNegative : c.accent }}>
          {it.status === 'at-risk' ? '▼ At risk' : '▲ On track'}
        </div>
      )}
    </div>
  );

  const ColHeader = (label: string, i: number) => (
    <div style={{ fontFamily:f.mono, fontVariantNumeric:'tabular-nums', fontSize:22, fontWeight:700,
      color: i === activeColumn ? c.accent : c.ink, paddingBottom:14, borderBottom:`2px solid ${i===activeColumn?c.accent:c.ink}` }}>
      {label}
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
        letterSpacing:'-0.02em', margin:'40px 0 36px', color:c.ink,
        animation:'600ms ease-out 150ms both tk-fadeUp' }}>{heading}</h2>

      {variant === 'swimlanes' && lanes.length > 0 ? (
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:20 }}>
          <div style={{ display:'flex', gap:20 }}>
            <div style={{ flex:'0 0 200px' }} />
            {columns.map((col,i)=><div key={i} style={{ flex:1 }}>{ColHeader(col.label,i)}</div>)}
          </div>
          {lanes.map((ln,r)=>(
            <div key={r} style={{ display:'flex', gap:20, alignItems:'stretch' }}>
              <div style={{ flex:'0 0 200px', fontFamily:f.caps, fontSize:18, letterSpacing:'0.14em',
                textTransform:'uppercase', color:c.inkMuted, alignSelf:'center' }}>{ln.label}</div>
              {columns.map((col,i)=>(
                <div key={i} style={{ flex:1 }}>{col.items[r] ? <Card it={col.items[r]} i={r} /> : null}</div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ flex:1, display:'flex', gap:24 }}>
          {columns.map((col,i)=>(
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', gap:16 }}>
              {ColHeader(col.label,i)}
              {col.items.map((it,j)=><Card key={j} it={it} i={j} />)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Roadmap;
