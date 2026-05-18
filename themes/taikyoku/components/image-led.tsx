/**
 * image-led — Taikyoku library (Phase 9, Session B Archetype 13)
 * USE: an image carries the slide. The one archetype that breaks the
 * paper canvas — so it renders its OWN canvas (like opening-hero).
 * VARIANTS: 'full-bleed' (image fills; Prata title/caption over an
 *   auto ink scrim) · 'framed' (image inset in paper, caption below).
 * SLOTS: image (author ReactNode — <img>/svg), eyebrow, heading, caption
 * PROPS: variant. Density STANDARD FIXED.
 * MOTION: single tk-fadeIn on the whole composition. ZOOM-ON-ENTER
 *   FORBIDDEN — opacity only, never scale/Ken-Burns. The scrim is an
 *   internal default of the bleed variant, not a prop.
 */
import type { ReactNode } from 'react';
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)', paper:'var(--tk-paper,#FFFFFF)', line:'var(--tk-line,rgba(0,0,0,0.12))' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif" };

export type ImageLedProps = {
  image: ReactNode; eyebrow?: string; heading: string; caption?: string;
  variant?: 'full-bleed' | 'framed';
};

export const ImageLed = ({ image, eyebrow, heading, caption, variant = 'framed' }: ImageLedProps) => {
  if (variant === 'full-bleed') {
    return (
      <div style={{ width:'100%', height:'100%', position:'relative', overflow:'hidden',
        background:c.ink, animation:'700ms ease-out both tk-fadeIn' }}>
        <div style={{ position:'absolute', inset:0 }}>{image}</div>
        {/* auto ink scrim for text legibility (internal default) */}
        <div aria-hidden style={{ position:'absolute', inset:0,
          background:'linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0) 100%)' }} />
        <div style={{ position:'absolute', left:100, bottom:100, right:100, color:'#FFF' }}>
          {eyebrow && (
            <div style={{ fontFamily:f.caps, fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase', fontWeight:700 }}>{eyebrow}</div>
          )}
          <h2 style={{ fontFamily:f.display, fontSize:108, fontWeight:400, lineHeight:1.0,
            letterSpacing:'-0.02em', margin:'24px 0 0' }}>{heading}</h2>
          {caption && <div style={{ fontFamily:f.body, fontSize:24, color:'rgba(255,255,255,0.82)', marginTop:18 }}>{caption}</div>}
        </div>
      </div>
    );
  }
  // framed
  return (
    <div style={{ width:'100%', height:'100%', background:c.paper, color:c.ink,
      fontFamily:f.body, padding:100, boxSizing:'border-box', display:'flex', flexDirection:'column',
      animation:'700ms ease-out both tk-fadeIn' }}>
      {eyebrow && (
        <div style={{ borderBottom:`1px solid ${c.ink}`, paddingBottom:18, fontFamily:f.caps,
          fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase',
          display:'inline-flex', alignItems:'center', gap:14 }}>
          <span aria-hidden style={{ width:12, height:12, background:c.accent, display:'inline-block' }} />
          <span style={{ fontWeight:700 }}>{eyebrow}</span>
        </div>
      )}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 0', overflow:'hidden' }}>
        <div style={{ maxHeight:'100%', maxWidth:'100%', border:`1px solid ${c.line}` }}>{image}</div>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
        <h2 style={{ fontFamily:f.display, fontSize:52, fontWeight:400, margin:0, color:c.ink }}>{heading}</h2>
        {caption && <span style={{ fontFamily:f.caps, fontSize:18, letterSpacing:'0.14em', textTransform:'uppercase', color:c.inkMuted }}>{caption}</span>}
      </div>
    </div>
  );
};
export default ImageLed;
