/**
 * taikyoku.gallery.tsx — Taikyoku component library gallery (Phase 9).
 *
 * One page per component VARIANT, ENGLISH ONLY (Phase 8 references
 * convention), hydrated with realistic content. Increments 1+2:
 * Group 1A + 1B + 1C. Sibling of taikyoku.demo.tsx; viewed via
 * Projects/2026-05-18_taikyoku-gallery/.
 */
import type { Page, SlideMeta } from '@open-slide/core';
import type { ReactNode } from 'react';

import { OpeningHero } from './taikyoku/components/opening-hero';
import { QuarterlyMetrics } from './taikyoku/components/quarterly-metrics';
import { ProductComparison } from './taikyoku/components/product-comparison';
import { HeadlineMetric } from './taikyoku/components/headline-metric';
import { CustomerVoice } from './taikyoku/components/customer-voice';
import { DeckContents } from './taikyoku/components/deck-contents';
import { ChartHero } from './taikyoku/components/chart-hero';
import { Timeline } from './taikyoku/components/timeline';
import { Roadmap } from './taikyoku/components/roadmap';
import { Methodology } from './taikyoku/components/methodology';
import { BeforeAfter } from './taikyoku/components/before-after';
import { BioCard } from './taikyoku/components/bio-card';
import { ImageLed } from './taikyoku/components/image-led';
import { LogoCluster } from './taikyoku/components/logo-cluster';
import { SectionDivider } from './taikyoku/components/section-divider';
import { ValueGrid } from './taikyoku/components/value-grid';
import { ProcessFlow } from './taikyoku/components/process-flow';
import { Quadrant } from './taikyoku/components/quadrant';
import { Closing } from './taikyoku/components/closing';

const styles = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@500;700&family=Prata&display=swap");
@keyframes tk-fadeUp { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes tk-fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
@keyframes tk-grow  { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
@keyframes tk-growY { 0% { transform: scaleY(0); } 100% { transform: scaleY(1); } }
@keyframes tk-rise  { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
`;

const Caption = ({ name, use }: { name: string; use: string }) => (
  <div style={{ position:'absolute', left:100, bottom:38, right:100,
    fontFamily:"'JetBrains Mono',monospace", fontSize:15, letterSpacing:'0.04em', color:'#AFAFAF' }}>
    {name} — {use}
  </div>
);

const Stage = ({ children, name, use }: { children: ReactNode; name: string; use: string }) => (
  <>
    <style>{styles}</style>
    <div style={{ width:'100%', height:'100%', background:'#FFFFFF', color:'#0A0A0A',
      fontFamily:"'Inter',system-ui,sans-serif", padding:100, paddingBottom:120,
      boxSizing:'border-box', position:'relative', overflow:'hidden' }}>
      {children}
      <Caption name={name} use={use} />
    </div>
  </>
);

const FullStage = ({ children, name, use }: { children: ReactNode; name: string; use: string }) => (
  <>
    <style>{styles}</style>
    <div style={{ width:'100%', height:'100%', position:'relative' }}>
      {children}
      <Caption name={name} use={use} />
    </div>
  </>
);

const PlaceholderChart = () => (
  <svg viewBox="0 0 600 280" style={{ width:'100%', height:280 }} aria-hidden>
    <line x1="40" y1="240" x2="580" y2="240" stroke="rgba(0,0,0,0.12)" />
    <line x1="40" y1="20" x2="40" y2="240" stroke="rgba(0,0,0,0.12)" />
    <polyline points="40,210 150,170 260,185 370,120 480,95 580,55"
      fill="none" stroke="#7030A0" strokeWidth="4" />
    {[210,170,185,120,95,55].map((y,i)=><circle key={i} cx={40+i*108} cy={y} r="5" fill="#7030A0" />)}
  </svg>
);
const PlaceholderImage = ({ h = '100%' }: { h?: number | string }) => (
  <div aria-hidden style={{ width:'100%', height:h, minWidth:680, minHeight:380,
    background:'linear-gradient(135deg,#A6C9EB 0%,#E9EEF4 60%,#FFE9BF 100%)',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:"'JetBrains Mono',monospace", fontSize:18, color:'rgba(0,0,0,0.35)' }}>
    image slot
  </div>
);
const Word = ({ t }: { t: string }) => (
  <div aria-hidden style={{ fontFamily:"'Prata',serif", fontSize:30, color:'#0A0A0A', lineHeight:1 }}>{t}</div>
);

// ─── Cover ───────────────────────────────────────────────────────────────────
const GalleryCover: Page = () => (
  <>
    <style>{styles}</style>
    <div style={{ width:'100%', height:'100%',
      background:'linear-gradient(330deg,#A6C9EB 12%,#FFE9BF 100%)', color:'#0A0A0A',
      fontFamily:"'Inter',system-ui,sans-serif", padding:100, boxSizing:'border-box',
      display:'flex', flexDirection:'column', justifyContent:'center' }}>
      <div style={{ fontFamily:"'Helvetica Neue','Inter',sans-serif", fontSize:22,
        letterSpacing:'0.22em', textTransform:'uppercase', fontWeight:700,
        animation:'600ms ease-out both tk-fadeUp' }}>Taikyoku · Component Library</div>
      <h1 style={{ fontFamily:"'Prata',serif", fontSize:120, fontWeight:400, lineHeight:0.98,
        letterSpacing:'-0.03em', margin:'40px 0 0', animation:'700ms ease-out 200ms both tk-fadeUp' }}>
        Gallery — Tier 1</h1>
      <p style={{ fontSize:32, lineHeight:1.4, fontWeight:500, maxWidth:1180, marginTop:28,
        animation:'600ms ease-out 400ms both tk-fadeUp' }}>
        Nineteen components, every variant, spec-built from the Phase 7
        refinement. English-only by convention.</p>
    </div>
  </>
);

// ─── Group 1A ────────────────────────────────────────────────────────────────
const P_hero: Page = () => (
  <FullStage name="opening-hero" use="deck cover; text + structural graphics only (no visual)">
    <OpeningHero eyebrow="Taikyoku · Seed" meta="Confidential · 2026 · 05"
      title="Decisions, Rendered" sub="Strategy decks that read like a product launch and hold up like a board memo." />
  </FullStage>
);
const P_metricsDelta: Page = () => (
  <Stage name="quarterly-metrics · metric-delta · rich" use="a metrics row with change indicators">
    <QuarterlyMetrics eyebrow="Quarter in review" heading="The Numbers That Moved" variant="metric-delta" density="rich"
      metrics={[
        { value:'$4.2M', label:'Net new ARR', context:'New logos + expansion', delta:'18.4%', deltaDir:'up' },
        { value:'6.2%', label:'Gross churn', context:'Trailing 90 days, logo', delta:'1.1pp', deltaDir:'down' },
        { value:'132%', label:'Net retention', context:'Top quartile cohort', delta:'9pp', deltaDir:'up' },
        { value:'14 mo', label:'Runway', context:'At current burn', delta:'2 mo', deltaDir:'up' },
      ]} />
  </Stage>
);
const P_metricsHero: Page = () => (
  <Stage name="quarterly-metrics · hero-supporting · standard" use="a lead number + supporting set">
    <QuarterlyMetrics eyebrow="Headline" heading="One Lead, Three Supports" variant="hero-supporting" density="standard"
      metrics={[
        { value:'312%', label:'Net revenue retention', context:'Enterprise segment, FY26' },
        { value:'4.1k', label:'Active teams' },
        { value:'<2h', label:'Median time to value' },
      ]} />
  </Stage>
);
const P_compare: Page = () => (
  <Stage name="product-comparison · axis+advocacy · rich" use="matrix compare with a recommended side">
    <ProductComparison eyebrow="Positioning" heading="Why The Managed Tier" accentColumn="right" density="rich"
      rowLabels={['Time to live','Ops burden','Support','Cost shape','Compliance']}
      columns={[
        { title:'Self-hosted', thesis:'You run the platform.', points:['3–6 weeks','Your on-call','Community forum','Capex + headcount','Your audit'], metric:'$0 / mo' },
        { title:'Managed', thesis:'We run it; you ship.', points:['Same day','Fully managed','24/7, 30-min SLA','Predictable opex','SOC 2 inherited'], metric:'$2.4k / mo' },
      ]} />
  </Stage>
);
const P_headline: Page = () => (
  <Stage name="headline-metric · fixed" use="the one-number slide; figure + proof">
    <HeadlineMetric eyebrow="The number" value="73%" label="Of pipeline is now self-serve"
      context="Up from 41% a year ago — measured across 1,240 closed-won opportunities, FY25 → FY26, excluding migrations." />
  </Stage>
);
const P_voice: Page = () => (
  <Stage name="customer-voice · rich" use="a testimonial anchored to a face/brand">
    <CustomerVoice density="rich"
      quote="It collapsed a two-week reporting cycle into an afternoon — and the output reads like we hired a design team we don't have."
      name="Dana Reyes" role="VP, Strategy & Ops" company="Northwind"
      contextTag="Enterprise · 2-year customer" logo={<Word t="NORTHWIND" />} />
  </Stage>
);
const P_tocGrid: Page = () => (
  <Stage name="deck-contents · agenda-grid" use="up-front 'what's in this deck'">
    <DeckContents eyebrow="Contents" heading="What's In This Deck" variant="agenda-grid"
      sections={[
        { number:'01', title:'The Problem', descriptor:'Why the status quo costs more than it looks on the line items.' },
        { number:'02', title:'The Approach', descriptor:'How we close the gap, end to end, in one quarter.' },
        { number:'03', title:'The Proof', descriptor:'What materially changed for three reference customers.' },
        { number:'04', title:'The Ask', descriptor:'The capital and the two hires that unlock the next stage.' },
      ]} />
  </Stage>
);
const P_tocProgress: Page = () => (
  <Stage name="deck-contents · progress-map · active=1" use="re-showable 'you are here' divider">
    <DeckContents eyebrow="Where we are" heading="The Approach" variant="progress-map" activeIndex={1}
      sections={[
        { number:'01', title:'The Problem', descriptor:'Established.' },
        { number:'02', title:'The Approach', descriptor:'You are here.' },
        { number:'03', title:'The Proof', descriptor:'Up next.' },
        { number:'04', title:'The Ask', descriptor:'Then the close.' },
      ]} />
  </Stage>
);

// ─── Group 1B ────────────────────────────────────────────────────────────────
const P_chartSide: Page = () => (
  <Stage name="chart-hero · narrative side · rich" use="chart + annotations + side narrative">
    <ChartHero eyebrow="Adoption" heading="The Curve Bent in Q3" narrativePosition="side" density="rich"
      chart={<PlaceholderChart />} takeaway="Self-serve activation overtook sales-assisted for the first time."
      axisLabels={{ x:'FY25 Q1 → FY26 Q2', y:'Weekly active teams' }}
      annotations={[{ text:'Pricing change ships' },{ text:'Onboarding rebuilt' }]}
      source="n=4,112 teams · excludes trials <7d"
      narrative="The inflection isn't the launch — it's the onboarding rebuild six weeks later. That's the lever to keep pulling." />
  </Stage>
);
const P_chartBelow: Page = () => (
  <Stage name="chart-hero · narrative below · standard" use="chart + takeaway, narrative beneath">
    <ChartHero eyebrow="Adoption" heading="The Curve Bent in Q3" narrativePosition="below" density="standard"
      chart={<PlaceholderChart />} takeaway="Self-serve activation overtook sales-assisted for the first time."
      axisLabels={{ x:'FY25 Q1 → FY26 Q2', y:'Weekly active teams' }} />
  </Stage>
);
const P_timelineMs: Page = () => (
  <Stage name="timeline · milestones · standard" use="even-spaced past event sequence">
    <Timeline eyebrow="How we got here" heading="Two Years, Four Inflections" variant="milestones"
      density="standard" activeIndex={3}
      events={[
        { date:'2024 Q2', label:'First close', descriptor:'Three design partners.' },
        { date:'2024 Q4', label:'GA', descriptor:'Public launch, self-serve.' },
        { date:'2025 Q3', label:'Enterprise', descriptor:'SSO, audit, SLA.' },
        { date:'2026 Q2', label:'Today', descriptor:'4.1k active teams.' },
      ]} />
  </Stage>
);
const P_timelinePh: Page = () => (
  <Stage name="timeline · phased · rich" use="event sequence grouped into eras">
    <Timeline eyebrow="Company arc" heading="From Wedge to Platform" variant="phased" density="rich"
      phases={[{ label:'Wedge' },{ label:'Expansion' },{ label:'Platform' }]}
      events={[
        { date:'2024', label:'One workflow', descriptor:'Nailed a single painful job.' },
        { date:'2025', label:'Adjacent jobs', descriptor:'Same buyer, more surface.' },
        { date:'2026', label:'The platform', descriptor:'Others build on us.' },
      ]} />
  </Stage>
);
const P_roadmapQ: Page = () => (
  <Stage name="roadmap · quarter-columns · rich" use="calendar plan with owners + status">
    <Roadmap eyebrow="FY26 plan" heading="What Ships, When" variant="quarter-columns" density="rich" activeColumn={0}
      columns={[
        { label:'Q1', items:[{ text:'Billing v2', owner:'Platform', status:'on-track' },{ text:'Audit log', owner:'Security', status:'on-track' }] },
        { label:'Q2', items:[{ text:'Mobile beta', owner:'Apps', status:'at-risk' },{ text:'SSO SAML', owner:'Security', status:'on-track' }] },
        { label:'Q3', items:[{ text:'Marketplace', owner:'Platform', status:'on-track' }] },
        { label:'Q4', items:[{ text:'Self-serve enterprise', owner:'GTM', status:'on-track' }] },
      ]} />
  </Stage>
);
const P_roadmapSw: Page = () => (
  <Stage name="roadmap · swimlanes · standard" use="workstreams × quarters matrix">
    <Roadmap eyebrow="FY26 plan" heading="Three Lanes, Four Quarters" variant="swimlanes" density="standard"
      lanes={[{ label:'Platform' },{ label:'Security' },{ label:'GTM' }]}
      columns={[
        { label:'Q1', items:[{ text:'Billing v2', owner:'P' },{ text:'Audit log', owner:'S' },{ text:'Pricing test', owner:'G' }] },
        { label:'Q2', items:[{ text:'Marketplace α', owner:'P' },{ text:'SSO SAML', owner:'S' },{ text:'Partner motion', owner:'G' }] },
        { label:'Q3', items:[{ text:'Marketplace GA', owner:'P' },{ text:'SOC 2 Type II', owner:'S' },{ text:'Land-expand', owner:'G' }] },
      ]} />
  </Stage>
);
const P_roadmapNNL: Page = () => (
  <Stage name="roadmap · now-next-later · standard" use="horizon buckets, date-noncommittal">
    <Roadmap eyebrow="Direction" heading="Now, Next, Later" variant="now-next-later" density="standard"
      columns={[
        { label:'NOW', items:[{ text:'Billing v2', owner:'In flight' },{ text:'Audit log', owner:'In flight' }] },
        { label:'NEXT', items:[{ text:'Mobile', owner:'Scoped' },{ text:'Marketplace', owner:'Scoped' }] },
        { label:'LATER', items:[{ text:'Self-serve enterprise', owner:'Directional' }] },
      ]} />
  </Stage>
);
const P_methStack: Page = () => (
  <Stage name="methodology · stack · standard" use="layered maturity model">
    <Methodology eyebrow="Framework" heading="The Maturity Stack" variant="stack" density="standard"
      elements={[
        { label:'Foundation', descriptor:'Data in one place, trusted.' },
        { label:'Workflow', descriptor:'The job runs end to end.' },
        { label:'Leverage', descriptor:'The system compounds.' },
      ]} />
  </Stage>
);
const P_methLoop: Page = () => (
  <Stage name="methodology · loop · standard" use="continuous reinforcing cycle">
    <Methodology eyebrow="Operating model" heading="The Flywheel" variant="loop" density="standard" centerLabel="Compounds each turn"
      elements={[
        { label:'Capture', descriptor:'Every decision logged.' },
        { label:'Render', descriptor:'Turned into a deck.' },
        { label:'Ship', descriptor:'Shared, acted on.' },
        { label:'Learn', descriptor:'Outcomes feed back.' },
      ]} />
  </Stage>
);
const P_methPillars: Page = () => (
  <Stage name="methodology · pillars · standard" use="claim supported by N pillars">
    <Methodology eyebrow="Why it holds" heading="Three Pillars" variant="pillars" density="standard" centerLabel="Production-grade by default"
      elements={[
        { label:'Restraint', descriptor:'Structure carries the look.' },
        { label:'Provenance', descriptor:'Every choice is logged.' },
        { label:'Render', descriptor:'One memo, many artifacts.' },
      ]} />
  </Stage>
);
const P_baStacked: Page = () => (
  <Stage name="before-after · stacked-overlay · rich" use="we-improved-this narrative">
    <BeforeAfter eyebrow="The change" heading="Before / After Migration" variant="stacked-overlay" density="rich"
      transitionLabel="post-migration" deltaMetric="−86% cycle time"
      before={{ label:'Manual reporting', points:['2 weeks','4 people','Stale on arrival'] }}
      after={{ label:'Rendered in an afternoon', points:['3 hours','1 person','Live'] }} />
  </Stage>
);
const P_baDiff: Page = () => (
  <Stage name="before-after · diff-list · standard" use="granular old → new change log">
    <BeforeAfter eyebrow="What changed" heading="The Diff" variant="diff-list" density="standard"
      before={{ label:'', points:[] }} after={{ label:'', points:[] }}
      diffPairs={[
        { from:'Hand-built slides', to:'Spec-built components' },
        { from:'Inconsistent type', to:'One locked type scale' },
        { from:'Ad-hoc color', to:'Single accent + rationed gold' },
        { from:'No provenance', to:'Every decision logged' },
      ]} />
  </Stage>
);
const P_bioSpot: Page = () => (
  <Stage name="bio-card · spotlight" use="founder/leader feature">
    <BioCard eyebrow="Leadership" heading="Who's Building This" variant="spotlight"
      members={[{ name:'Aditya Kotian', role:'Founder & CEO', credential:'Ex-strategy, two prior exits',
        bio:'Spent a decade watching good decisions die in bad decks. Taikyoku is the fix — a production system, not a template.' }]} />
  </Stage>
);
const P_bioGrid: Page = () => (
  <Stage name="bio-card · grid" use="meet the team">
    <BioCard eyebrow="The team" heading="Small, Senior, Shipping" variant="grid"
      members={[
        { name:'A. Kotian', role:'Founder', credential:'Strategy' },
        { name:'M. Sato', role:'Design', credential:'Ex-editorial' },
        { name:'R. Vela', role:'Engineering', credential:'Ex-infra' },
        { name:'J. Okafor', role:'GTM', credential:'Ex-enterprise' },
      ]} />
  </Stage>
);
const P_bioLead: Page = () => (
  <Stage name="bio-card · lead-supporting" use="a leader and the bench">
    <BioCard eyebrow="Leadership" heading="The Lead & The Bench" variant="lead-supporting"
      members={[
        { name:'Aditya Kotian', role:'Founder & CEO', credential:'Two prior exits',
          bio:'Sets the bar: would a McKinsey partner and a Stripe designer both ship this slide?' },
        { name:'M. Sato', role:'Head of Design' },
        { name:'R. Vela', role:'Head of Eng' },
        { name:'J. Okafor', role:'Head of GTM' },
        { name:'L. Park', role:'Ops' },
      ]} />
  </Stage>
);
const P_imgBleed: Page = () => (
  <FullStage name="image-led · full-bleed" use="image fills; text over auto scrim">
    <ImageLed variant="full-bleed" eyebrow="Field note" heading="Where The Work Happens"
      caption="On-site, Q2 — the room a deck has to survive." image={<PlaceholderImage />} />
  </FullStage>
);
const P_imgFramed: Page = () => (
  <FullStage name="image-led · framed" use="editorial plate, caption below">
    <ImageLed variant="framed" eyebrow="Exhibit A" heading="The Rendered Output"
      caption="Taikyoku · executive-pitch" image={<PlaceholderImage h={420} />} />
  </FullStage>
);
const P_logos: Page = () => (
  <Stage name="logo-cluster · rich · monochrome" use="social proof framed by a stat">
    <LogoCluster eyebrow="Trusted by" heading="Teams That Ship On It" headlineStat="40+ teams · 6 industries" density="rich"
      logos={[<Word t="NORTHWIND" />,<Word t="ACME" />,<Word t="HELIOS" />,<Word t="VANTA" />,<Word t="ORBIT" />,<Word t="MERIDIAN" />]} />
  </Stage>
);

// ─── Group 1C (Phase-8-reconciled) ───────────────────────────────────────────
const P_divider: Page = () => (
  <FullStage name="section-divider" use="numbered chapter divider (no seal, no breath)">
    <SectionDivider kicker="Part Two" number="02" title="The Approach" />
  </FullStage>
);
const P_valueBare: Page = () => (
  <Stage name="value-grid · standard · bare" use="three value/claim cards (hairline)">
    <ValueGrid eyebrow="Why this matters" heading="Three Reasons It Holds" density="standard" surface="bare"
      cards={[
        { roleKicker:'Restraint', title:'Structure, not decoration', body:'Hairlines and type do the work. Nothing is added that a print magazine wouldn’t.' },
        { roleKicker:'Provenance', title:'Every choice logged', body:'A decision trail from interview to contract — nothing is folklore.' },
        { roleKicker:'Render', title:'One memo, many artifacts', body:'The same context becomes a deck, minutes, or a one-pager.' },
      ]} />
  </Stage>
);
const P_valueTint: Page = () => (
  <Stage name="value-grid · rich · tint surface" use="same, paper-tint panels (surface ramp)">
    <ValueGrid eyebrow="Why this matters" heading="Three Reasons It Holds" density="rich" surface="tint"
      cards={[
        { roleKicker:'Restraint', title:'Structure, not decoration', body:'Hairlines and type do the work — no shadows, no gradients on cards.' },
        { roleKicker:'Provenance', title:'Every choice logged', body:'A decision trail from interview to contract.' },
        { roleKicker:'Render', title:'One memo, many artifacts', body:'Deck, minutes, one-pager — same source.' },
      ]} />
  </Stage>
);
const P_process: Page = () => (
  <Stage name="process-flow · rich (with a blocked step)" use="linear workflow; line-draw signature">
    <ProcessFlow eyebrow="How we engage" heading="Order to Finalize" density="rich"
      steps={[
        { number:'01', label:'Order', descriptor:'Brief captured.', status:'done' },
        { number:'02', label:'Memo', descriptor:'Canonical context.', status:'done' },
        { number:'03', label:'Storyboard', descriptor:'Recipe + content.', status:'active' },
        { number:'04', label:'Compose', descriptor:'Awaiting assets.', status:'blocked' },
        { number:'05', label:'Finalize', descriptor:'HTML + PDF.' },
      ]} />
  </Stage>
);
const P_quadrant: Page = () => (
  <Stage name="quadrant · rich · highlighted" use="positioning on two axes">
    <Quadrant eyebrow="Landscape" heading="Where We Sit" density="rich" highlightQuadrant={1}
      axis={{ xLabel:'Template → Production system', yLabel:'Generic → Brand-true' }}
      quadrants={[
        { label:'Generic builders', items:['Slideware'] },
        { label:'Taikyoku', items:['Brand-true','Production-grade'] },
        { label:'DIY decks', items:['Hand-built'] },
        { label:'Agencies', items:['Bespoke, slow'] },
      ]} />
  </Stage>
);
const P_closing: Page = () => (
  <FullStage name="closing · goldMoment" use="sign-off; gold is deck-assigned, no breath">
    <Closing headline="The Whole Board" sub="Taikyoku — decisions, rendered." goldMoment
      mark={<div style={{ fontFamily:"'Helvetica Neue','Inter',sans-serif", fontSize:20, letterSpacing:'0.22em', fontWeight:700, textTransform:'uppercase' }}>TKYK</div>} />
  </FullStage>
);

// Section organisers — grouped by COMPONENT TYPE (not Phase-7 build
// groups). Simple titles; any exposition lives in the kicker (eyebrow),
// never in the title. section-divider dogfooded as the structure.
const SecCovers: Page = () => (
  <><style>{styles}</style>
    <SectionDivider kicker="Component Library · framing the deck" number="01" title="Covers & Dividers" /></>
);
const SecMetrics: Page = () => (
  <><style>{styles}</style>
    <SectionDivider kicker="Component Library · numbers & evidence" number="02" title="Metrics & Data" /></>
);
const SecCompare: Page = () => (
  <><style>{styles}</style>
    <SectionDivider kicker="Component Library · positioning" number="03" title="Compare & Transform" /></>
);
const SecFlow: Page = () => (
  <><style>{styles}</style>
    <SectionDivider kicker="Component Library · sequence & system" number="04" title="Time & Flow" /></>
);
const SecProof: Page = () => (
  <><style>{styles}</style>
    <SectionDivider kicker="Component Library · people & proof" number="05" title="People & Proof" /></>
);

export const meta: SlideMeta = { title: 'Taikyoku — Component Gallery (Tier 1)', theme: 'taikyoku' };

export default [
  GalleryCover,

  // ── Covers & Dividers ────────────────────────────────────────────────────
  SecCovers,
  P_hero, P_tocGrid, P_tocProgress, P_divider, P_closing,

  // ── Metrics & Data ───────────────────────────────────────────────────────
  SecMetrics,
  P_headline, P_metricsDelta, P_metricsHero, P_chartSide, P_chartBelow, P_quadrant,

  // ── Compare & Transform ──────────────────────────────────────────────────
  SecCompare,
  P_compare, P_baStacked, P_baDiff, P_valueBare, P_valueTint,

  // ── Time & Flow ──────────────────────────────────────────────────────────
  SecFlow,
  P_timelineMs, P_timelinePh, P_roadmapQ, P_roadmapSw, P_roadmapNNL,
  P_process, P_methStack, P_methLoop, P_methPillars,

  // ── People & Proof ───────────────────────────────────────────────────────
  SecProof,
  P_voice, P_bioSpot, P_bioGrid, P_bioLead, P_logos, P_imgBleed, P_imgFramed,
];
