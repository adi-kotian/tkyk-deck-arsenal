/**
 * chart-hero — Taikyoku library (Phase 9, Session B Archetype 7)
 * USE: a chart-led slide that always carries interpretation (purple
 * annotations + a narrative). Chart is author-supplied (ReactNode SVG).
 * Canvas-agnostic block — Page wraps in PaperCanvas.
 * SLOTS: eyebrow, heading, chart, takeaway, annotations[]{text},
 *   axisLabels{x,y}, source, narrative
 * PROPS: narrativePosition ('side' | 'below'), density (lean/standard/rich)
 *   lean: chart+heading · standard: +takeaway+axisLabels · rich:+annotations+source+narrative
 * MOTION: chart container tk-fadeIn → annotations tk-fadeUp after
 *   (data → argument). Author applies tk-draw inside the chart SVG.
 */
import type { ReactNode } from 'react';
const c = { ink:'var(--tk-ink,#0A0A0A)', inkSoft:'var(--tk-ink-soft,#3F3F3F)', inkMuted:'var(--tk-ink-muted,#6B6B6B)', accent:'var(--tk-accent,#7030A0)', paperTint:'var(--tk-paper-tint,#F4F7FB)', line:'var(--tk-line,rgba(0,0,0,0.12))' };
const f = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif", body:"'Inter',system-ui,sans-serif", mono:"'JetBrains Mono','SF Mono',monospace" };

export type ChartHeroProps = {
  eyebrow: string; heading: string; chart: ReactNode; takeaway?: string;
  annotations?: { text: string }[]; axisLabels?: { x?: string; y?: string };
  source?: string; narrative?: string;
  narrativePosition?: 'side' | 'below'; density?: 'lean' | 'standard' | 'rich';
};

export const ChartHero = ({
  eyebrow, heading, chart, takeaway, annotations = [], axisLabels,
  source, narrative, narrativePosition = 'side', density = 'standard',
}: ChartHeroProps) => {
  const showStd = density !== 'lean';
  const showRich = density === 'rich';
  const side = narrativePosition === 'side';

  const ChartBlock = (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ animation: '600ms ease-out 200ms both tk-fadeIn' }}>{chart}</div>
      {showStd && axisLabels && (
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:14,
          fontFamily:f.mono, fontVariantNumeric:'tabular-nums', fontSize:18, color:c.inkMuted }}>
          <span>{axisLabels.x}</span><span>{axisLabels.y}</span>
        </div>
      )}
      {showRich && annotations.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginTop:24 }}>
          {annotations.map((a,i)=>(
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:10,
              fontFamily:f.body, fontSize:21, color:c.ink,
              animation:`500ms ease-out ${700+i*150}ms both tk-fadeUp` }}>
              <span aria-hidden style={{ width:10, height:10, background:c.accent, display:'inline-block' }} />
              {a.text}
            </span>
          ))}
        </div>
      )}
      {showRich && source && (
        <div style={{ fontFamily:f.mono, fontSize:16, color:c.inkMuted, marginTop:18, letterSpacing:'0.02em' }}>{source}</div>
      )}
    </div>
  );

  const NarrativeBlock = showRich && narrative ? (
    <div style={{ flex: side ? '0 0 34%' : '0 0 auto', marginTop: side ? 0 : 32 }}>
      <p style={{ fontFamily:f.body, fontSize:24, lineHeight:1.55, color:c.inkSoft, margin:0,
        animation:'600ms ease-out 900ms both tk-fadeUp' }}>{narrative}</p>
    </div>
  ) : null;

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
      {showStd && takeaway && (
        <p style={{ fontFamily:f.body, fontSize:30, lineHeight:1.4, color:c.inkSoft,
          margin:'20px 0 0', maxWidth:1300, animation:'600ms ease-out 300ms both tk-fadeUp' }}>{takeaway}</p>
      )}
      <div style={{ display:'flex', flexDirection: side ? 'row' : 'column', gap:48,
        marginTop:40, flex:1, alignItems: side ? 'flex-start' : 'stretch' }}>
        {ChartBlock}{NarrativeBlock}
      </div>
    </div>
  );
};
export default ChartHero;
