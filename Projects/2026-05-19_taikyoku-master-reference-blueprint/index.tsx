/**
 * GENERATED WIREFRAME — do not hand-edit.
 * Source of truth: ../2026-05-19_taikyoku-master-reference/blueprint.yaml
 *                  (storyboard_version: 0 — no upstream storyboard;
 *                   constructed manually for Stream 4 / Phase I verification).
 * Regenerate by re-dispatching the blueprint subagent.
 *
 * This deck is the structural review surface for the master-reference
 * project. The real deck is composed at
 *   ../2026-05-19_taikyoku-master-reference/index.tsx
 * by compose-deck, *executing* this blueprint against the storyboard.
 */
import type { Page, SlideMeta } from '@open-slide/core';
import type { ReactNode, CSSProperties } from 'react';

// ── Theme tokens — match master-reference so light/dark wrapper applies ─────
const TK_LIGHT: Record<string,string> = {
  '--tk-paper':'#FFFFFF','--tk-paper-tint':'#F4F7FB','--tk-paper-tint-2':'#E9EEF4',
  '--tk-ink':'#0A0A0A','--tk-ink-soft':'#3F3F3F','--tk-ink-muted':'#6B6B6B',
  '--tk-accent':'#7030A0','--tk-accent-negative':'#9B2226',
  '--tk-line':'rgba(0,0,0,0.12)',
};
const TK_DARK: Record<string,string> = {
  '--tk-paper':'#141029','--tk-paper-tint':'#201A3C','--tk-paper-tint-2':'#2A2452',
  '--tk-ink':'#E6E0CE','--tk-ink-soft':'#ACA6BC','--tk-ink-muted':'#786F92',
  '--tk-accent':'#B388E0','--tk-accent-negative':'#E26D6F',
  '--tk-line':'rgba(230,224,206,0.14)',
};
const KF = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@500;700&family=Prata&display=swap");
@keyframes tk-fadeUp{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}`;

const V = (n:string,f:string) => `var(--tk-${n},${f})`;
const INK   = V('ink','#0A0A0A');
const SOFT  = V('ink-soft','#3F3F3F');
const MUT   = V('ink-muted','#6B6B6B');
const ACC   = V('accent','#7030A0');
const NEG   = V('accent-negative','#9B2226');
const LINE  = V('line','rgba(0,0,0,0.12)');
const PAPER = V('paper','#FFFFFF');
const TINT  = V('paper-tint','#F4F7FB');
const Fn = {
  display: "'Prata',Georgia,serif",
  caps:    "'Helvetica Neue','Inter',system-ui,sans-serif",
  body:    "'Inter',system-ui,sans-serif",
  mono:    "'JetBrains Mono','SF Mono',monospace",
};

const Slide = ({ d, children }: { d?:boolean; children:ReactNode }) => (
  <><style>{KF}</style>
    <div style={{ ...(d?TK_DARK:TK_LIGHT), width:'100%', height:'100%' } as CSSProperties}>{children}</div></>
);

// ── WireframeFrame — same anatomy as themes/taikyoku/layouts/Frame.tsx,
//    with a status badge in the meta slot (ReactNode, not just a string) ────
const WireframeFrame = ({ eyebrow, status, action, sub, source, folio, children }:
  { eyebrow:string; status:'DRAFT'|'APPROVED'; action:string; sub?:string;
    source:string; folio:string; children:ReactNode }) => (
  <div style={{ width:'100%', height:'100%', background:PAPER, color:INK, fontFamily:Fn.body,
    padding:'72px 100px 56px', boxSizing:'border-box', display:'flex', flexDirection:'column', overflow:'hidden' }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
      borderBottom:`1px solid ${INK}`, paddingBottom:14, fontFamily:Fn.caps, fontSize:20,
      letterSpacing:'0.22em', textTransform:'uppercase', animation:'600ms ease-out both tk-fadeUp' }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:14 }}>
        <span aria-hidden style={{ width:11, height:11, background:ACC, display:'inline-block' }} />
        <span style={{ fontWeight:700 }}>{eyebrow}</span></span>
      <span style={{ fontSize:14, letterSpacing:'0.18em', fontWeight:700,
        color: status==='APPROVED' ? ACC : NEG }}>BLUEPRINT • {status}</span>
    </div>
    <div style={{ marginTop:26 }}>
      <h2 style={{ fontFamily:Fn.display, fontSize:54, fontWeight:400, lineHeight:1.06,
        letterSpacing:'-0.02em', margin:0, color:INK, maxWidth:1500,
        display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical',
        overflow:'hidden', textOverflow:'ellipsis' } as CSSProperties}>{action}</h2>
      {sub && <p style={{ fontFamily:Fn.body, fontSize:23, lineHeight:1.4,
        color:SOFT, margin:'12px 0 0', maxWidth:1400 }}>{sub}</p>}
    </div>
    {/* ContentArea — 1720 × 720 absolute */}
    <div style={{ flex:1, minHeight:0, marginTop:30, overflow:'hidden' }}>{children}</div>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
      borderTop:`1px solid ${LINE}`, paddingTop:14, marginTop:18, fontFamily:Fn.mono, fontSize:15,
      color:MUT, letterSpacing:'0.02em', height:40, boxSizing:'border-box' }}>
      <span>{source}</span>
      <span style={{ fontFamily:Fn.caps, letterSpacing:'0.16em', textTransform:'uppercase' }}>{folio}</span>
    </div>
  </div>
);

// ── Wireframe cell — labelled rectangle for a shadow ────────────────────────
type Span = { col:[number,number]; row:[number,number] };
const cellStyle = (s:Span):CSSProperties => ({
  gridColumn:`${s.col[0]} / ${s.col[1]+1}`, gridRow:`${s.row[0]} / ${s.row[1]+1}`,
  border:`1px solid ${LINE}`, background:`${TINT}`, padding:'14px 16px',
  display:'flex', flexDirection:'column', gap:8, minWidth:0, minHeight:0, overflow:'hidden',
});
const Cell = ({ id, label, summary, span }:
  { id:string; label:string; summary:string; span:Span }) => (
  <div style={cellStyle(span)}>
    <div style={{ fontFamily:Fn.caps, fontSize:13, letterSpacing:'0.16em',
      textTransform:'uppercase', color:ACC, fontWeight:700 }}>{id}</div>
    <div style={{ fontFamily:Fn.mono, fontSize:16, color:INK }}>{label}</div>
    <div style={{ fontFamily:Fn.display, fontStyle:'italic', fontSize:18, lineHeight:1.4,
      color:SOFT, whiteSpace:'pre-line' }}>{summary}</div>
  </div>
);
// layout-zone cell — wraps a sub-stack of support-kit children
const ZoneCell = ({ id, span, children }:
  { id:string; span:Span; children:{ kind:string; summary:string }[] }) => (
  <div style={{ ...cellStyle(span), padding:'12px 14px' }}>
    <div style={{ fontFamily:Fn.caps, fontSize:13, letterSpacing:'0.16em',
      textTransform:'uppercase', color:ACC, fontWeight:700 }}>{id}</div>
    <div style={{ fontFamily:Fn.mono, fontSize:14, color:MUT }}>layout-zone · {children.length} children</div>
    <div style={{ display:'flex', flexDirection:'column', gap:8, flex:1, minHeight:0,
      borderTop:`1px solid ${LINE}`, paddingTop:8, marginTop:4 }}>
      {children.map((ch,i)=>(
        <div key={i} style={{ borderTop: i? `1px dashed ${LINE}` : 'none',
          paddingTop: i?6:0 }}>
          <div style={{ fontFamily:Fn.mono, fontSize:14, color:INK }}>{ch.kind}</div>
          <div style={{ fontFamily:Fn.display, fontStyle:'italic', fontSize:16,
            lineHeight:1.35, color:SOFT }}>{ch.summary}</div>
        </div>
      ))}
    </div>
  </div>
);

const grid12x6 = (gap=24):CSSProperties => ({
  display:'grid', gridTemplateColumns:'repeat(12,1fr)', gridTemplateRows:'repeat(6,1fr)',
  gap, height:'100%',
});

// ── Pages — one per blueprint beat ──────────────────────────────────────────
const pg: Page[] = [];

// Beat 1 — field (primary-rail, DRAFT)
pg.push(() => <Slide>
  <WireframeFrame eyebrow="FIELD" status="DRAFT" action="The Work Survives Contact With The Site"
    sub="An image-led primary with a supporting read-out — not a bare photo."
    source="Source: site audit, 2026-Q2 · n=3 sites" folio="BLUEPRINT · 01">
    <div style={grid12x6()}>
      <Cell id="primary" label="image-led (framed)" span={{ col:[1,7], row:[1,6] }}
        summary={'variant=framed; eyebrow "Exhibit A";\nheading "On The Ground";\ncaption "Q2 site"; placeholder image slot.'} />
      <ZoneCell id="rail-supports" span={{ col:[8,12], row:[1,6] }}
        children={[
          { kind:'stat-callout',  summary:'3 — Sites audited (all on the same controls data)' },
          { kind:'insight',       summary:'The gap the deck closes is visible the moment you stand in the room.' },
          { kind:'labelled-list', summary:'Schedule +6 wk · Change orders 2 soft · Coverage 100% vs sampled' },
        ]} />
    </div>
  </WireframeFrame>
</Slide>);

// Beat 2 — headline-73 (primary-rail, APPROVED — demonstrates badge flip)
pg.push(() => <Slide>
  <WireframeFrame eyebrow="HEADLINE-73" status="APPROVED" action="73% Of Pipeline Is Now Self-Serve"
    sub="One decisive figure — framed by what it replaced and why it holds."
    source="Source: 1,240 closed-won, FY25→26, ex-migrations" folio="BLUEPRINT · 02">
    <div style={grid12x6()}>
      <Cell id="primary" label="headline-metric" span={{ col:[1,7], row:[1,6] }}
        summary={'eyebrow "Headline"; value "73%";\nlabel "Pipeline Self-Serve";\ncontext "Up from 41% a year ago." (count-up sanctioned)'} />
      <ZoneCell id="rail-supports" span={{ col:[8,12], row:[1,6] }}
        children={[
          { kind:'stat-callout', summary:'41% — A year ago' },
          { kind:'stat-callout', summary:'+32pp — Year over year (no added sales headcount)' },
          { kind:'insight',      summary:'Self-serve is now the default path — sales-assist is the exception, by design.' },
        ]} />
    </div>
  </WireframeFrame>
</Slide>);

// Beat 3 — two-up (two-up, DRAFT)
pg.push(() => <Slide d>
  <WireframeFrame eyebrow="TWO-UP" status="DRAFT" action="The Chart Sets It Up; The Comparison Closes It"
    sub="Two co-equal components under one action title, with a shared takeaway."
    source="Source: composed · two-up layout" folio="BLUEPRINT · 03">
    <div style={grid12x6()}>
      <Cell id="a" label="chart-hero (lean)" span={{ col:[1,6], row:[1,5] }}
        summary={'Adoption curve;\ninflection at week 8\n(onboarding v2 launch).'} />
      <Cell id="b" label="quadrant (lean)" span={{ col:[7,12], row:[1,5] }}
        summary={'Slow→Fast × Generic→True;\nhighlight quadrant 1 ("Fast, true");\nother corners populated.'} />
      <Cell id="takeaway" label="annotation" span={{ col:[1,12], row:[6,6] }}
        summary={'"Adoption is bending and the field is empty where we sit — the same conclusion from two angles."'} />
    </div>
  </WireframeFrame>
</Slide>);

// Beat 4 — density-pushed (dense-grid, DRAFT)
pg.push(() => <Slide>
  <WireframeFrame eyebrow="DENSITY-PUSHED" status="DRAFT" action="Six Modules, One Read — The Grid Stress Test"
    sub="The densest layout: a header and a packed grid, still on the surface ramp."
    source="Source: composed · dense-grid layout" folio="BLUEPRINT · 04">
    <div style={{ ...grid12x6(22) }}>
      <Cell id="c1" label="annotation" span={{ col:[1,4],  row:[1,3] }} summary="01 Capture — Every decision logged at the point it is made." />
      <Cell id="c2" label="annotation" span={{ col:[5,8],  row:[1,3] }} summary="02 Render — Context becomes a deck, minutes, or a one-pager." />
      <Cell id="c3" label="annotation" span={{ col:[9,12], row:[1,3] }} summary="03 Assure — Owner-side, independent, continuous." />
      <Cell id="c4" label="annotation" span={{ col:[1,4],  row:[4,6] }} summary="04 Compound — Each project sharpens the graph." />
      <Cell id="c5" label="annotation" span={{ col:[5,8],  row:[4,6] }} summary="05 Govern — Provenance and reversibility by default." />
      <Cell id="c6" label="annotation" span={{ col:[9,12], row:[4,6] }} summary="06 Ship — Production-grade output, not slideware." />
    </div>
  </WireframeFrame>
</Slide>);

export const meta: SlideMeta = { title: 'Master Reference — Blueprint (Stream 4)', theme: 'taikyoku' };
export default pg satisfies Page[];
