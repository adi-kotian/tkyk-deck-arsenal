import type { Page, SlideMeta } from '@open-slide/core';
import type { ReactNode, CSSProperties } from 'react';
// ════════════════════════════════════════════════════════════════════════════
// TAIKYOKU — MASTER VISUAL REFERENCE CATALOGUE · v2 (Phase 11)
// Composition-density rebuild. Components are UNCHANGED (approved austerity);
// fullness comes from the slide anatomy + multi-component layout grammar
// (COMPOSITION.md §1.5): every content slide = chrome + action title +
// primary + ≥2 supporting elements + source + folio, filled to the budget.
// Mixes light/dark per-slide (scoped TK_* wrapper). See log.md.
// ════════════════════════════════════════════════════════════════════════════
import tkykMark from './assets/tkyk-mark.svg';
import homM from '../../themes/taikyoku/assets/fonts/HomuraM-Medium.woff2';
import homS from '../../themes/taikyoku/assets/fonts/HomuraM-SemiBold.woff2';
import homD from '../../themes/taikyoku/assets/fonts/HomuraM-Display.woff2';
import { OpeningHero } from '../../themes/taikyoku/components/opening-hero';
import { SectionDivider } from '../../themes/taikyoku/components/section-divider';
import { DeckContents } from '../../themes/taikyoku/components/deck-contents';
import { QuarterlyMetrics } from '../../themes/taikyoku/components/quarterly-metrics';
import { HeadlineMetric } from '../../themes/taikyoku/components/headline-metric';
import { ChartHero } from '../../themes/taikyoku/components/chart-hero';
import { Quadrant } from '../../themes/taikyoku/components/quadrant';
import { ProductComparison } from '../../themes/taikyoku/components/product-comparison';
import { BeforeAfter } from '../../themes/taikyoku/components/before-after';
import { ValueGrid } from '../../themes/taikyoku/components/value-grid';
import { Timeline } from '../../themes/taikyoku/components/timeline';
import { Roadmap } from '../../themes/taikyoku/components/roadmap';
import { ProcessFlow } from '../../themes/taikyoku/components/process-flow';
import { Methodology } from '../../themes/taikyoku/components/methodology';
import { CustomerVoice } from '../../themes/taikyoku/components/customer-voice';
import { BioCard } from '../../themes/taikyoku/components/bio-card';
import { ImageLed } from '../../themes/taikyoku/components/image-led';
import { LogoCluster } from '../../themes/taikyoku/components/logo-cluster';
import { Closing } from '../../themes/taikyoku/components/closing';

const TK_LIGHT: Record<string,string> = {
  '--tk-grad-cool':'#A6C9EB','--tk-grad-warm':'#FFE9BF','--tk-grad-cool-pos':'12%',
  '--tk-paper':'#FFFFFF','--tk-paper-tint':'#F4F7FB','--tk-paper-tint-2':'#E9EEF4',
  '--tk-ink':'#0A0A0A','--tk-ink-soft':'#3F3F3F','--tk-ink-muted':'#6B6B6B','--tk-ink-faint':'#AFAFAF',
  '--tk-accent':'#7030A0','--tk-accent-hot':'#FFE1A4','--tk-accent-negative':'#9B2226',
  '--tk-line':'rgba(0,0,0,0.12)','--tk-rule':'rgba(0,0,0,0.40)','--tk-logo-filter':'grayscale(1) brightness(0)',
};
const TK_DARK: Record<string,string> = {
  '--tk-grad-cool':'#151030','--tk-grad-warm':'#8B8B96','--tk-grad-cool-pos':'40%',
  '--tk-paper':'#141029','--tk-paper-tint':'#201A3C','--tk-paper-tint-2':'#2A2452',
  '--tk-ink':'#E6E0CE','--tk-ink-soft':'#ACA6BC','--tk-ink-muted':'#786F92','--tk-ink-faint':'#5A5478',
  '--tk-accent':'#B388E0','--tk-accent-hot':'#FFE1A4','--tk-accent-negative':'#E26D6F',
  '--tk-line':'rgba(230,224,206,0.14)','--tk-rule':'rgba(230,224,206,0.34)','--tk-logo-filter':'grayscale(1) brightness(0) invert(1)',
};
const KF = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@500;700&family=Noto+Sans+JP:wght@400;500&family=Noto+Serif+JP:wght@500;600;700&family=Prata&display=swap");
@font-face{font-family:'HomuraM';src:local('HomuraM-Medium'),url(${homM}) format('woff2');font-weight:500;font-display:swap}
@font-face{font-family:'HomuraM';src:local('HomuraM-SemiBold'),url(${homS}) format('woff2');font-weight:600;font-display:swap}
@font-face{font-family:'HomuraM';src:local('HomuraM-Bold'),url(${homD}) format('woff2');font-weight:700;font-display:swap}
@keyframes tk-fadeUp{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}
@keyframes tk-fadeIn{0%{opacity:0}100%{opacity:1}}
@keyframes tk-grow{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}
@keyframes tk-growY{0%{transform:scaleY(0)}100%{transform:scaleY(1)}}
@keyframes tk-rise{0%{opacity:0;transform:translateY(28px)}100%{opacity:1;transform:translateY(0)}}`;
const Fn = { display:"'Prata',Georgia,serif", caps:"'Helvetica Neue','Inter',system-ui,sans-serif",
  body:"'Inter',system-ui,sans-serif", mono:"'JetBrains Mono','SF Mono',monospace",
  jpD:"'HomuraM','Noto Serif JP',serif", jpB:"'Noto Sans JP',system-ui,sans-serif" };
const V = (n:string,f:string)=>`var(--tk-${n},${f})`;
const INK=V('ink','#0A0A0A'), SOFT=V('ink-soft','#3F3F3F'), MUT=V('ink-muted','#6B6B6B'),
  ACC=V('accent','#7030A0'), TINT=V('paper-tint','#F4F7FB'), T2=V('paper-tint-2','#E9EEF4'),
  LINE=V('line','rgba(0,0,0,0.12)'), PAPER=V('paper','#FFFFFF');

const Slide = ({ d, children }: { d?: boolean; children: ReactNode }) => (
  <><style>{KF}</style>
    <div style={{ ...(d?TK_DARK:TK_LIGHT), width:'100%', height:'100%' } as CSSProperties}>{children}</div></>
);

// ── Frame: chrome (eyebrow) + action title + body + source + folio ──────────
const Frame = ({ eyebrow, meta, action, sub, source, folio, jp, children }:
  { eyebrow:string; meta?:string; action:string; sub?:string; source:string; folio:string; jp?:boolean; children:ReactNode }) => (
  <div style={{ width:'100%', height:'100%', background:PAPER, color:INK, fontFamily:Fn.body,
    padding:'72px 100px 56px', boxSizing:'border-box', display:'flex', flexDirection:'column', overflow:'hidden' }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
      borderBottom:`1px solid ${INK}`, paddingBottom:14, fontFamily:Fn.caps, fontSize:20,
      letterSpacing:'0.22em', textTransform:'uppercase', animation:'600ms ease-out both tk-fadeUp' }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:14 }}>
        <span aria-hidden style={{ width:11, height:11, background:ACC, display:'inline-block' }} />
        <span style={{ fontWeight:700 }}>{eyebrow}</span></span>
      <span style={{ color:MUT, fontSize:18, letterSpacing:'0.16em' }}>{meta ?? 'Taikyoku · master reference'}</span>
    </div>
    <div style={{ marginTop:26, animation:'600ms ease-out 120ms both tk-fadeUp' }}>
      <h2 style={{ fontFamily: jp ? Fn.jpD : Fn.display, fontSize:54, fontWeight: jp?600:400,
        lineHeight: jp?1.12:1.06, letterSpacing:'-0.02em', margin:0, color:INK, maxWidth:1500 }}>{action}</h2>
      {sub && <p style={{ fontFamily: jp ? Fn.jpB : Fn.body, fontSize:23, lineHeight: jp?1.7:1.4,
        color:SOFT, margin:'12px 0 0', maxWidth:1400 }}>{sub}</p>}
    </div>
    <div style={{ flex:1, minHeight:0, overflow:'hidden', marginTop:30 }}>{children}</div>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
      borderTop:`1px solid ${LINE}`, paddingTop:14, marginTop:18, fontFamily:Fn.mono, fontSize:15,
      color:MUT, letterSpacing:'0.02em' }}>
      <span>{source}</span>
      <span style={{ fontFamily:Fn.caps, letterSpacing:'0.16em', textTransform:'uppercase' }}>{folio}</span>
    </div>
  </div>
);
// support kit
const Stat = ({ v, l, c }:{v:string;l:string;c?:string}) => (
  <div style={{ background:TINT, borderTop:`1px solid ${LINE}`, padding:'20px 22px',
    animation:'600ms cubic-bezier(0.2,0.7,0.3,1) 240ms both tk-rise' }}>
    <div style={{ fontFamily:Fn.mono, fontVariantNumeric:'tabular-nums', fontWeight:700, fontSize:46, color:INK, lineHeight:1 }}>{v}</div>
    <div style={{ fontFamily:Fn.caps, fontSize:15, letterSpacing:'0.16em', textTransform:'uppercase', color:MUT, marginTop:10 }}>{l}</div>
    {c && <div style={{ fontFamily:Fn.body, fontSize:18, color:SOFT, marginTop:6 }}>{c}</div>}
  </div>
);
const Insight = ({ children }:{children:ReactNode}) => (
  <div style={{ display:'flex', gap:14, alignItems:'flex-start',
    animation:'600ms ease-out 360ms both tk-fadeUp' }}>
    <span aria-hidden style={{ width:10, height:10, background:ACC, marginTop:9, flex:'0 0 auto' }} />
    <div style={{ fontFamily:Fn.body, fontSize:22, lineHeight:1.45, color:INK }}>{children}</div>
  </div>
);
const LList = ({ items }:{items:[string,string][]}) => (
  <div style={{ display:'flex', flexDirection:'column', animation:'600ms ease-out 460ms both tk-fadeUp' }}>
    {items.map(([k,v],i)=>(
      <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
        borderTop:`1px solid ${LINE}`, padding:'13px 0', fontFamily:Fn.caps, fontSize:17,
        letterSpacing:'0.14em', textTransform:'uppercase', color:MUT }}>
        <span>{k}</span><span style={{ fontFamily:Fn.mono, color:INK, letterSpacing:'0.02em' }}>{v}</span></div>))}
  </div>
);
const Annote = ({ children }:{children:ReactNode}) => (
  <div style={{ fontFamily:Fn.display, fontStyle:'italic', fontSize:24, lineHeight:1.4, color:SOFT,
    animation:'600ms ease-out 400ms both tk-fadeUp' }}>{children}</div>
);
const Rail = ({ primary, rail }:{primary:ReactNode;rail:ReactNode}) => (
  <div style={{ display:'flex', gap:48, height:'100%' }}>
    <div style={{ flex:'1 1 66%', minWidth:0, minHeight:0, display:'block' }}>{primary}</div>
    <div style={{ flex:'1 1 34%', minWidth:0, display:'flex', flexDirection:'column', gap:22, justifyContent:'center' }}>{rail}</div>
  </div>
);
// Structural: for components that own their eyebrow+heading (deck-contents,
// etc.) — no Frame echo, the component gets the room, slim support + footer.
const Structural = ({ source, folio, support, children }:
  { source:string; folio:string; support?:ReactNode; children:ReactNode }) => (
  <div style={{ width:'100%', height:'100%', background:PAPER, color:INK, fontFamily:Fn.body,
    padding:'72px 100px 56px', boxSizing:'border-box', display:'flex', flexDirection:'column', overflow:'hidden' }}>
    <div style={{ flex:1, minHeight:0, display:'flex' }}>{children}</div>
    {support && <div style={{ flex:'0 0 auto', display:'flex', gap:24, marginTop:26 }}>{support}</div>}
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline',
      borderTop:`1px solid ${LINE}`, paddingTop:14, marginTop:18, fontFamily:Fn.mono, fontSize:15,
      color:MUT, letterSpacing:'0.02em' }}>
      <span>{source}</span>
      <span style={{ fontFamily:Fn.caps, letterSpacing:'0.16em', textTransform:'uppercase' }}>{folio}</span></div>
  </div>
);
const Cards = ({ items }:{items:[string,string][]}) => (
  <>{items.map(([k,b],i)=>(
    <div key={i} style={{ flex:1, background:TINT, borderTop:`1px solid ${LINE}`, padding:'18px 20px',
      animation:`600ms cubic-bezier(0.2,0.7,0.3,1) ${240+i*120}ms both tk-rise` }}>
      <div style={{ fontFamily:Fn.caps, fontSize:14, letterSpacing:'0.16em', textTransform:'uppercase', color:ACC }}>{k}</div>
      <div style={{ fontFamily:Fn.body, fontSize:20, lineHeight:1.4, color:INK, marginTop:8 }}>{b}</div></div>))}</>
);
const Band = ({ primary, cells }:{primary:ReactNode;cells:ReactNode[]}) => (
  <div style={{ display:'flex', flexDirection:'column', gap:26, height:'100%' }}>
    <div style={{ flex:'1 1 64%', minWidth:0, minHeight:0, display:'block' }}>{primary}</div>
    <div style={{ flex:'0 0 auto', display:'flex', gap:24 }}>{cells.map((c,i)=><div key={i} style={{ flex:1 }}>{c}</div>)}</div>
  </div>
);
const TwoUp = ({ a, b, take }:{a:ReactNode;b:ReactNode;take:string}) => (
  <div style={{ display:'flex', flexDirection:'column', gap:24, height:'100%' }}>
    <div style={{ flex:1, minHeight:0, display:'flex', gap:40 }}>
      <div style={{ flex:1, minWidth:0, minHeight:0, display:'block' }}>{a}</div>
      <div style={{ flex:1, minWidth:0, minHeight:0, display:'block' }}>{b}</div></div>
    <div style={{ flex:'0 0 auto', borderTop:`1px solid ${LINE}`, paddingTop:16, fontFamily:Fn.body,
      fontSize:24, color:INK, fontWeight:500 }}>{take}</div>
  </div>
);

const Chart = () => (
  <svg viewBox="0 0 620 300" style={{ width:'100%', height:'100%' }} preserveAspectRatio="xMidYMid meet" aria-hidden>
    <line x1="40" y1="260" x2="600" y2="260" stroke={LINE} />
    <polyline points="40,228 150,188 260,200 370,128 480,98 600,52" fill="none" stroke={ACC} strokeWidth="4" />
    {[228,188,200,128,98,52].map((y,i)=><circle key={i} cx={40+i*112} cy={y} r="5" fill={ACC} />)}
  </svg>
);
const Img = () => (<div aria-hidden style={{ flex:1, minHeight:360,
  background:'linear-gradient(135deg,var(--tk-grad-cool,#A6C9EB),var(--tk-paper-tint-2,#E9EEF4),var(--tk-grad-warm,#FFE9BF))',
  display:'flex', alignItems:'center', justifyContent:'center', fontFamily:Fn.mono, fontSize:18, color:'rgba(128,128,128,0.55)' }}>image slot</div>);
const Wm = ({ t }:{t:string}) => <div aria-hidden style={{ fontFamily:Fn.display, fontSize:30, color:INK }}>{t}</div>;
const SECS=[{number:'01',title:'The Problem',descriptor:'Why the status quo compounds cost.'},
  {number:'02',title:'The Approach',descriptor:'How we close the gap, end to end.'},
  {number:'03',title:'The Proof',descriptor:'What changed for three teams.'},
  {number:'04',title:'The Ask',descriptor:'What the next stage funds.'}];

const pg: Page[] = [];
const add=(n:ReactNode,d?:boolean)=>pg.push(()=> <Slide d={d}>{n}</Slide>);
const sec=(k:string,n:string,t:string,d?:boolean)=>pg.push(()=> <Slide d={d}><SectionDivider kicker={k} number={n} title={t} /></Slide>);

// Cover
add(<OpeningHero eyebrow="Taikyoku · Master Reference v2" meta="Composition-density · 2026"
  title="Slides That Carry Their Weight" sub="Every content page: chrome + an action title + a primary + a supporting cluster + a source — filled, not centred." />);

// 01 Covers & Openers
sec('Catalogue · openers','01','Covers & Openers');
add(<OpeningHero eyebrow="Climate Infrastructure" meta="Confidential · 2026"
  title="Power The Grid We Haven't Built" sub="Dark cover — same component, scoped dark wrapper, full-slide archetype (exempt from the body rule)." />, true);
add(<Frame eyebrow="Field" meta="Site visit · Q2" action="The Work Survives Contact With The Site"
  sub="An image-led primary with a supporting read-out — not a bare photo." source="Source: site audit, 2026-Q2 · n=3 sites" folio="01 · openers">
  <Rail primary={<ImageLed variant="framed" eyebrow="Exhibit A" heading="On The Ground" caption="Q2 site" image={<Img />} />}
    rail={<><Stat v="3" l="Sites audited" c="all on the same controls data" />
      <Insight>The gap the deck closes is visible the moment you stand in the room.</Insight>
      <LList items={[['Schedule','+6 wk slip'],['Change orders','2 soft'],['Coverage','100% vs sampled']]} /></>} />
</Frame>);

// 02 Structure & Navigation
sec('Catalogue · structure','02','Structure & Navigation', true);
add(<Structural source="Internal · master reference" folio="02 · structure"
  support={<Cards items={[
    ['Customer proof','Eight named references on record, two on video.'],
    ['Usage data','Product analytics across 4,112 active teams.'],
    ['Independent audit',"Owner's-engineer review, no exceptions raised."],
    ['Financial','Pilot economics: 11× ROI on fees, blended.'],
    ['Benchmark','Outperforms the sampled-audit baseline on every lane.']]} />}>
  <DeckContents eyebrow="Contents" heading="What's In This Deck" variant="agenda-grid" sections={SECS} />
</Structural>, true);
add(<Structural source="Progress marker" folio="02 · structure"
  support={<><div style={{ flex:1 }}><Stat v="2 / 4" l="Chapters in" /></div>
    <div style={{ flex:2, display:'flex', alignItems:'center' }}><Annote>Navigation is structure, not decoration — the marker is the same component as the agenda.</Annote></div></>}>
  <DeckContents eyebrow="Progress" heading="The Approach" variant="progress-map" activeIndex={1} sections={SECS} />
</Structural>);

// 03 Metrics & Data
sec('Catalogue · numbers','03','Metrics & Data');
add(<Frame eyebrow="Quarter in review" meta="FY26 Q2" action="Retention Carried The Quarter, Churn Held"
  sub="The lead number is not alone — it sits in a read of the whole quarter." source="Source: FY26-Q2 board pack · n=1,240 accounts" folio="03 · numbers">
  <Rail primary={<QuarterlyMetrics eyebrow="The numbers" heading="What Moved" variant="metric-delta" density="rich"
      metrics={[{value:'$4.2M',label:'Net new ARR',context:'New + expansion',delta:'18.4%',deltaDir:'up'},
        {value:'6.2%',label:'Gross churn',context:'Trailing 90d',delta:'1.1pp',deltaDir:'down'},
        {value:'132%',label:'Net retention',context:'Top quartile',delta:'9pp',deltaDir:'up'}]} />}
    rail={<><Insight>Net retention &gt; 130% means the base alone funds the next stage.</Insight>
      <Stat v="$184M" l="Pipeline influenced" c="self-serve sourced" />
      <LList items={[['Win rate','+7pp'],['Sales cycle','−11 days'],['CAC payback','9 mo']]} /></>} />
</Frame>);
add(<Frame eyebrow="The number" action="73% Of Pipeline Is Now Self-Serve"
  sub="One decisive figure — framed by what it replaced and why it holds." source="Source: 1,240 closed-won, FY25→26, ex-migrations" folio="03 · numbers">
  <Rail primary={<HeadlineMetric eyebrow="Headline" value="73%" label="Pipeline Self-Serve"
      context="Up from 41% a year ago." />}
    rail={<><Stat v="41%" l="A year ago" /><Stat v="+32pp" l="Year over year" c="no added sales headcount" />
      <Insight>Self-serve is now the default path — sales-assist is the exception, by design.</Insight></>} />
</Frame>, true);
add(<Frame eyebrow="Adoption" meta="FY25 → FY26" action="The Curve Bent At The Onboarding Rebuild — Not The Launch"
  sub="The chart carries the trend; the rail carries the cause." source="Source: product analytics · n=4,112 teams · ex-trials <7d" folio="03 · numbers">
  <Rail primary={<div style={{ flex:1, display:'flex', flexDirection:'column' }}>
      <div style={{ flex:1 }}><Chart /></div>
      <div style={{ fontFamily:Fn.mono, fontSize:15, color:MUT, marginTop:10 }}>weekly active teams · FY25 Q1 → FY26 Q2</div></div>}
    rail={<><Annote>The inflection is six weeks after the launch — the onboarding rebuild, not the announcement.</Annote>
      <Stat v="3.1×" l="WAU vs. pre-rebuild" /><LList items={[['Pricing change','wk 0'],['Onboarding v2','wk 6'],['Inflection','wk 8']]} /></>} />
</Frame>);
add(<Frame eyebrow="Landscape" action="Independent And Continuous Is An Empty Quadrant — Until Us"
  sub="Where the category sits, and the corner no one else occupies." source="Source: competitive teardown, 2026 · 11 vendors" folio="03 · numbers">
  <Rail primary={<Quadrant eyebrow="Map" heading="The Field" density="rich" highlightQuadrant={1}
      axis={{xLabel:'Periodic → Continuous',yLabel:'Conflicted → Independent'}}
      quadrants={[{label:"Owner's-engineer",items:['Independent, sampled']},{label:'Taikyoku',items:['Independent','Continuous']},
        {label:'EPC self-report',items:['Conflicted']},{label:'Project controls',items:['Data, not assurance']}]} />}
    rail={<><Insight>Everyone else is independent <em>or</em> continuous. The owner needs both.</Insight>
      <LList items={[['Vendors mapped','11'],['In our quadrant','1'],['Owner-aligned','1']]} />
      <Annote>The quadrant is the argument — the rail says why it holds.</Annote></>} />
</Frame>, true);

// 04 Compare & Transform
sec('Catalogue · positioning','04','Compare & Transform');
add(<Frame eyebrow="Positioning" action="Managed Pays For Itself Before The First Quarter Closes"
  sub="The comparison decides it; the rail prices it." source="Source: pilot economics, 4 owners · blended" folio="04 · compare">
  <Rail primary={<ProductComparison eyebrow="Tiers" heading="Self-Hosted vs Managed" accentColumn="right" density="rich"
      rowLabels={['Setup','Ops','Support','Cost']} columns={[
        {title:'Self-hosted',thesis:'You run it.',points:['Weeks','Your team','Forum','Capex'],metric:'$0/mo'},
        {title:'Managed',thesis:'We run it.',points:['Minutes','On us','24/7','Opex'],metric:'$2.4k/mo'}]} />}
    rail={<><Stat v="11×" l="Pilot ROI on fees" /><Insight>The hidden cost of self-hosted is the on-call you already can't staff.</Insight>
      <LList items={[['Breakeven','<1 qtr'],['Time to live','same day'],['SLA','30 min']]} /></>} />
</Frame>);
add(<Frame eyebrow="The change" action="Two Weeks Of Reporting Became An Afternoon"
  sub="Before/after carries the story; the metrics quantify it." source="Source: customer time study · Northwind" folio="04 · compare">
  <Rail primary={<BeforeAfter eyebrow="Migration" heading="Before / After" variant="stacked-overlay" density="rich"
      transitionLabel="post-migration" deltaMetric="−86% cycle time"
      before={{label:'Manual reporting',points:['2 weeks','4 people','Stale']}}
      after={{label:'Rendered in an afternoon',points:['3 hours','1 person','Live']}} />}
    rail={<><Stat v="−86%" l="Cycle time" c="two weeks → one afternoon" />
      <Stat v="4 → 1" l="People in the loop" /><Insight>The win is not speed alone — it is that the output is now trusted.</Insight></>} />
</Frame>, true);
add(<Frame eyebrow="Why this holds" action="Three Properties Make It Defensible"
  sub="The value grid is the claim; the rail is the evidence it compounds." source="Source: design principles · REFINEMENT.md" folio="04 · compare">
  <Rail primary={<ValueGrid eyebrow="Moat" heading="What Compounds" density="standard" surface="tint"
      cards={[{roleKicker:'Restraint',title:'Structure, Not Decoration',body:'Hairlines and type do the work.'},
        {roleKicker:'Provenance',title:'Every Choice Logged',body:'A trail from interview to contract.'},
        {roleKicker:'Render',title:'One Memo, Many Artifacts',body:'Deck, minutes, one-pager — one source.'}]} />}
    rail={<><Insight>Each property is weak alone and strong together — that is a moat, not a feature list.</Insight>
      <LList items={[['Decisions logged','100%'],['Reversible','yes'],['Artifacts / memo','3']]} />
      <Annote>The grid keeps its approved density; the slide is full because the rail carries the rest.</Annote></>} />
</Frame>);

// 05 Time & Flow
sec('Catalogue · sequence','05','Time & Flow', true);
add(<Frame eyebrow="How we got here" action="Two Years, Four Inflections — And The Curve Is Steepening"
  sub="The timeline is the spine; the rail reads the trajectory." source="Source: company history · board minutes" folio="05 · time">
  <Band primary={<Timeline eyebrow="Arc" heading="The Path" variant="milestones" density="standard" activeIndex={3}
      events={[{date:'2024 Q2',label:'First close',descriptor:'3 partners'},{date:'2024 Q4',label:'GA',descriptor:'Self-serve'},
        {date:'2025 Q3',label:'Enterprise',descriptor:'SSO, audit'},{date:'2026 Q2',label:'Today',descriptor:'4.1k teams'}]} />}
    cells={[<Stat v="4.1k" l="Active teams" c="from 3 design partners" />,
      <Stat v="22 mo" l="Wedge → enterprise" />,
      <Insight>Each inflection shortened the gap to the next — that is the trajectory.</Insight>]} />
</Frame>);
add(<Frame eyebrow="FY26 plan" meta="Committed" action="Q1 Ships On Track; Mobile Is The One At-Risk Bet"
  sub="The roadmap is the plan; the rail flags the risk and the why." source="Source: FY26 plan of record" folio="05 · time">
  <Rail primary={<Roadmap eyebrow="Plan" heading="What Ships, When" variant="quarter-columns" density="rich" activeColumn={0}
      columns={[{label:'Q1',items:[{text:'Billing v2',owner:'Platform',status:'on-track'},{text:'Audit log',owner:'Sec',status:'on-track'}]},
        {label:'Q2',items:[{text:'Mobile beta',owner:'Apps',status:'at-risk'},{text:'SSO',owner:'Sec',status:'on-track'}]},
        {label:'Q3',items:[{text:'Marketplace',owner:'Platform',status:'on-track'}]},
        {label:'Q4',items:[{text:'Self-serve ENT',owner:'GTM',status:'on-track'}]}]} />}
    rail={<><Insight>Mobile is the only at-risk item — staffed, not yet de-risked.</Insight>
      <LList items={[['On track','5 / 6'],['At risk','1'],['Slipped','0']]} />
      <Stat v="Q3" l="Marketplace GA" c="the revenue unlock" /></>} />
</Frame>, true);
add(<Frame eyebrow="How we engage" action="The Pipeline Is Gated — One Stage Is Blocked Today"
  sub="Process flow shows the path; the rail shows the blockage and the fix." source="Source: delivery tracker · live" folio="05 · time">
  <Rail primary={<ProcessFlow eyebrow="Flow" heading="Order → Finalize" density="rich" steps={[
      {number:'01',label:'Order',descriptor:'Captured',status:'done'},{number:'02',label:'Memo',descriptor:'Context',status:'done'},
      {number:'03',label:'Storyboard',descriptor:'Recipe',status:'active'},{number:'04',label:'Compose',descriptor:'Blocked: assets',status:'blocked'},
      {number:'05',label:'Finalize',descriptor:'Export'}]} />}
    rail={<><Insight>Stage 04 is blocked on assets — the one thing the owner controls.</Insight>
      <Stat v="1" l="Blocked stage" c="accent-negative, by design" /><Annote>Status is honest — a blocked step is shown, not hidden.</Annote></>} />
</Frame>);
add(<Frame eyebrow="Operating model" action="The Flywheel Is The Whole Strategy On One Slide"
  sub="Methodology carries the model; the rail names each turn's payoff." source="Source: strategy memo v3" folio="05 · time">
  <Rail primary={<Methodology eyebrow="Model" heading="The Flywheel" variant="loop" density="standard" centerLabel="Compounds each turn"
      elements={[{label:'Capture',descriptor:'Logged'},{label:'Render',descriptor:'To a deck'},{label:'Ship',descriptor:'Acted on'},{label:'Learn',descriptor:'Feeds back'}]} />}
    rail={<><Insight>Every turn makes the next cheaper — that is why this compounds.</Insight>
      <LList items={[['Capture → Render','minutes'],['Ship → Learn','same week'],['Loop cost','↓ each turn']]} />
      <Annote>Three framework variants exist; this deck uses the loop.</Annote></>} />
</Frame>, true);

// 06 People, Voice & Proof
sec('Catalogue · proof','06','People, Voice & Proof');
add(<Frame eyebrow="Owner voice" action="It Caught What The Monthly Report Did Not"
  sub="The quote is the proof; the rail is who said it and what it was worth." source="Source: customer interview · anonymised" folio="06 · proof">
  <Rail primary={<CustomerVoice density="rich"
      quote="Taikyoku flagged a slip and a soft change-order six weeks before it would have reached my board — from the same data my contractor was reporting against."
      name="VP, Major Capital Projects" role="Energy-infrastructure owner" contextTag="Anonymised pilot" logo={<Wm t="OWNER" />} />}
    rail={<><Stat v="6 wk" l="Earlier warning" c="vs. the monthly report" /><Stat v="$184M" l="Exposure surfaced" />
      <Insight>Same data the contractor reported against — read independently.</Insight></>} />
</Frame>);
add(<Frame eyebrow="Leadership" action="Owner's-Engineer Domain Meets Applied AI"
  sub="The lead carries the bio; the bench and the proof points fill the slide." source="Source: team · semi-fictional" folio="06 · proof">
  <Rail primary={<BioCard eyebrow="Team" heading="Who's Building This" variant="lead-supporting"
      members={[{name:'A. Founder',role:'Founder & CEO',bio:'A decade auditing capital-project controls for owners, paired with an applied-AI team.'},
        {name:'M. Sato',role:'Head of Design'},{name:'R. Vela',role:'Head of Eng'},
        {name:'J. Okafor',role:'Head of GTM'},{name:'K. Knudsen',role:'Head of Legal'}]} />}
    rail={<><LList items={[['Prior exits','2'],['Domain yrs','10+'],['Team','7']]} />
      <Insight>Domain credibility is the wedge — the buyer is an owner, not a developer.</Insight>
      <Annote>Bench shown small; the lead carries the page.</Annote></>} />
</Frame>, true);
add(<Frame eyebrow="Trusted by" action="Forty Teams, Six Industries, One Quarter"
  sub="The logo wall is the proof; the rail makes it a number." source="Source: customer list, 2026-Q2" folio="06 · proof">
  <Rail primary={<LogoCluster eyebrow="Customers" heading="Who Ships On It" headlineStat="40+ teams · 6 industries" density="rich"
      logos={[<Wm t="NORTHWIND"/>,<Wm t="ACME"/>,<Wm t="HELIOS"/>,<Wm t="VANTA"/>,<Wm t="ORBIT"/>,<Wm t="MERIDIAN"/>]} />}
    rail={<><Stat v="40+" l="Teams" /><Stat v="6" l="Industries" c="energy, infra, data centers…" />
      <Insight>Monochrome by discipline — the proof is the count, not the colours.</Insight></>} />
</Frame>);

// 07 Prose & Editorial (dense editorial — still anatomy: title + body + supports + source)
sec('Catalogue · editorial','07','Prose & Editorial', true);
add(<Frame eyebrow="A letter" action="On Building The Whole Board"
  sub="The editorial register — measured body, em-dashes, Title Case." source="Source: founder's note" folio="07 · editorial">
  <Rail primary={<div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:24 }}>
      <p style={{ fontFamily:Fn.body, fontSize:26, lineHeight:1.55, color:INK, fontWeight:500, margin:0 }}>
        Most decks fail not in the data but in the gap between the room and the page — the slide that was clear to its author and opaque to everyone else.</p>
      <p style={{ fontFamily:Fn.body, fontSize:26, lineHeight:1.55, color:INK, fontWeight:500, margin:0 }}>
        So we built a system, not a template. The components carry the structure; the typography carries the voice; restraint carries the credibility.</p></div>}
    rail={<><Annote>A deck is an instrument of decision — and an instrument should be precise.</Annote>
      <LList items={[['Register','60/40 institutional'],['Em-dashes','house style'],['Headlines','Title Case']]} />
      <Insight>Even a prose page obeys the anatomy: title, body, supports, source.</Insight></>} />
</Frame>);

// 08 Bilingual Reference (separate EN→JP, anatomy preserved)
sec('Catalogue · bilingual','08','Bilingual Reference');
add(<Frame eyebrow="Bilingual · EN" meta="English deck" action="Measured, Evidence-Led"
  sub="English body is Inter at body size — one idea per sentence." source="Source: voice spec · Session C" folio="08 · bilingual">
  <Rail primary={<div style={{ flex:1, display:'flex', alignItems:'center' }}>
      <p style={{ fontFamily:Fn.body, fontSize:28, lineHeight:1.55, color:INK, fontWeight:500, margin:0 }}>
        Punch is rationed to the headline and a single accent line per slide — the body stays full and well-built.</p></div>}
    rail={<><LList items={[['Body','Inter 500'],['Headline','Prata'],['Sentence','15–25 wd']]} />
      <Insight>Mono-language per deck — this is the English reference.</Insight></>} />
</Frame>, true);
add(<Frame jp eyebrow="Bilingual · JP" meta="日本語デッキ" action="簡潔・根拠に基づく"
  sub="本文は Noto Sans JP、見出しと大きな漢字は HomuraM。" source="出典: ボイス仕様 · セッションC" folio="08 · bilingual">
  <Rail primary={<div style={{ flex:1, display:'flex', alignItems:'center' }}>
      <p style={{ fontFamily:Fn.jpB, fontSize:27, lineHeight:1.75, color:INK, fontWeight:400, margin:0 }}>
        見出しは常体・体言止め、本文は です・ます調。約物は全角、英数字は半角。1スライドにつき1言語。</p></div>}
    rail={<><div style={{ fontFamily:Fn.jpD, fontWeight:700, fontSize:64, color:INK, lineHeight:1.1 }}>大局</div>
      <Annote>日本語の参考スライド。</Annote>
      <LList items={[['本文','Noto Sans JP'],['見出し','HomuraM'],['言語','単一']]} /></>} />
</Frame>);

// 09 Mixed & Pushed — densest: two-up + dense band
sec('Catalogue · pushed','09','Mixed & Pushed', true);
add(<Frame eyebrow="Two-up" action="The Chart Sets It Up; The Comparison Closes It"
  sub="Two co-equal components under one action title, with a shared takeaway." source="Source: composed · two-up layout" folio="09 · pushed">
  <TwoUp a={<div style={{ flex:1, display:'flex', flexDirection:'column' }}><div style={{ flex:1 }}><Chart /></div></div>}
    b={<Quadrant eyebrow="Map" heading="Where We Sit" density="lean" highlightQuadrant={1}
      axis={{xLabel:'Slow → Fast',yLabel:'Generic → True'}}
      quadrants={[{label:'Incumbents',items:['Slow']},{label:'Us',items:['Fast, true']},{label:'DIY',items:['Hand-built']},{label:'Templates',items:['Generic']}]} />}
    take={'Adoption is bending and the field is empty where we sit — the same conclusion from two angles.'} />
</Frame>);
add(<Frame eyebrow="Density · pushed" action="Six Modules, One Read — The Grid Stress Test"
  sub="The densest layout: a header and a packed grid, still on the surface ramp." source="Source: composed · dense-grid layout" folio="09 · pushed">
  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gridTemplateRows:'1fr 1fr', gap:22, height:'100%' }}>
    {[['Capture','Every decision logged at the point it is made.'],
      ['Render','Context becomes a deck, minutes, or a one-pager.'],
      ['Assure','Owner-side, independent, continuous.'],
      ['Compound','Each project sharpens the graph.'],
      ['Govern','Provenance and reversibility by default.'],
      ['Ship','Production-grade output, not slideware.']].map(([h,b],i)=>(
      <div key={i} style={{ background: i%2?T2:TINT, borderTop:`1px solid ${LINE}`, padding:'22px 24px',
        display:'flex', flexDirection:'column', gap:8, animation:`500ms ease-out ${150+i*100}ms both tk-rise` }}>
        <div style={{ fontFamily:Fn.display, fontStyle:'italic', fontSize:22, color:ACC }}>{`0${i+1}`}</div>
        <div style={{ fontFamily:Fn.display, fontSize:32, color:INK }}>{h}</div>
        <div style={{ fontFamily:Fn.body, fontSize:19, lineHeight:1.4, color:SOFT }}>{b}</div></div>))}
  </div>
</Frame>);

// 10 Closing — the one gold moment
add(<Closing headline="Now — Detailed Feedback" sub="Every page is filled to the anatomy. Mark up anything; this drives the next refinement stage."
  goldMoment mark={<img src={tkykMark} alt="TKYK" style={{ height:50 }} />} />, true);

export const meta: SlideMeta = { title: 'Taikyoku — Master Visual Reference v2', theme: 'taikyoku' };
export default pg satisfies Page[];
