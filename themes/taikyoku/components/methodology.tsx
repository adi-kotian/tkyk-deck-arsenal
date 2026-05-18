/**
 * methodology — Taikyoku library (Phase 9, Session B Archetype 10)
 * USE: a conceptual framework diagram (distinct from the linear
 * process at #17). Canvas-agnostic block.
 * VARIANTS: 'stack' (layered bands, foundation→apex) · 'loop' (cyclical
 *   nodes with connectors + a hub label) · 'pillars' (N pillars under a
 *   capstone = centerLabel).
 * SLOTS: eyebrow, heading, elements[]{label,descriptor}, centerLabel
 * PROPS: variant, density (lean: label · standard/rich:+descriptor)
 * MOTION: connecting structure tk-grow/tk-growY (or tk-fadeIn for the
 *   loop ring) → labels tk-fadeUp in build order. Single-purple,
 *   hairline, no fill/shadow.
 */
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)', paperTint:'var(--tk-paper-tint,#F4F7FB)', line:'var(--tk-line,rgba(0,0,0,0.12))' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif" };

export type FrameworkElement = { label: string; descriptor?: string };
export type MethodologyProps = {
  eyebrow: string; heading: string; elements: FrameworkElement[];
  centerLabel?: string;
  variant?: 'stack' | 'loop' | 'pillars'; density?: 'lean' | 'standard' | 'rich';
};

export const Methodology = ({
  eyebrow, heading, elements, centerLabel,
  variant = 'stack', density = 'standard',
}: MethodologyProps) => {
  const showDesc = density !== 'lean';
  const Label = (el: FrameworkElement, big = false) => (
    <>
      <div style={{ fontFamily:f.display, fontSize: big?40:32, color:c.ink }}>{el.label}</div>
      {showDesc && el.descriptor && (
        <div style={{ fontFamily:f.body, fontSize:20, lineHeight:1.45, color:c.inkSoft, marginTop:6 }}>{el.descriptor}</div>
      )}
    </>
  );

  const Body = () => {
    if (variant === 'stack') {
      return (
        <div style={{ flex:1, display:'flex', flexDirection:'column-reverse', gap:14, justifyContent:'center' }}>
          {elements.map((el,i)=>(
            <div key={i} style={{ border:`1px solid ${c.ink}`, padding:'24px 32px', background:i===elements.length-1?c.paperTint:'#FFF',
              animation:`600ms ease-out ${300+i*150}ms both tk-fadeUp` }}>{Label(el)}</div>
          ))}
        </div>
      );
    }
    if (variant === 'pillars') {
      return (
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:0 }}>
          {centerLabel && (
            <div style={{ border:`2px solid ${c.accent}`, color:c.accent, padding:'22px 28px', textAlign:'center',
              fontFamily:f.display, fontSize:40, animation:'600ms ease-out 200ms both tk-fadeUp' }}>{centerLabel}</div>
          )}
          <div style={{ display:'flex', gap:20, marginTop:24 }}>
            {elements.map((el,i)=>(
              <div key={i} style={{ flex:1, borderTop:`3px solid ${c.accent}`, padding:'24px 22px',
                animation:`600ms cubic-bezier(0.2,0.7,0.3,1) ${400+i*150}ms both tk-rise` }}>{Label(el)}</div>
            ))}
          </div>
        </div>
      );
    }
    // loop
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:28 }}>
        {centerLabel && (
          <div style={{ textAlign:'center', fontFamily:f.caps, fontSize:20, letterSpacing:'0.2em',
            textTransform:'uppercase', color:c.accent, animation:'600ms ease-out 200ms both tk-fadeIn' }}>↻ {centerLabel}</div>
        )}
        <div style={{ display:'flex', alignItems:'stretch', gap:0 }}>
          {elements.map((el,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', flex:1 }}>
              <div style={{ flex:1, border:`1px solid ${c.ink}`, padding:'22px 20px',
                animation:`600ms ease-out ${360+i*150}ms both tk-fadeUp` }}>{Label(el)}</div>
              <span aria-hidden style={{ color:c.accent, fontSize:28, padding:'0 12px' }}>→</span>
              {i === elements.length-1 && (
                <span aria-hidden style={{ color:c.inkMuted, fontFamily:f.caps, fontSize:14, letterSpacing:'0.14em' }}>↺</span>
              )}
            </div>
          ))}
        </div>
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
      <h2 style={{ fontFamily:f.display, fontSize:78, fontWeight:400, lineHeight:1.02,
        letterSpacing:'-0.02em', margin:'40px 0 36px', color:c.ink,
        animation:'600ms ease-out 150ms both tk-fadeUp' }}>{heading}</h2>
      <Body />
    </div>
  );
};
export default Methodology;
