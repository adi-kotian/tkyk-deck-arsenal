import type { Page, SlideMeta } from '@open-slide/core';
import type { ReactNode } from 'react';

// Phase 9 — Taikyoku DARK-VARIANT SPIKE (Session A Topic 6).
//
// PURPOSE: prove out a dark Taikyoku before committing the library to
// dual-mode. Gallery-only feasibility spike — the 19 production
// components are deliberately NOT touched. Each highest-risk archetype
// is rendered LIGHT then DARK (separate, comparable slides — same
// references convention as the language deck).
//
// Dark base is brand-grounded: Brand Style Brief states the gradient
// inverts to deep navy #0E2841 → muted gold #7A5F2A and ink swaps to
// paper. Lifted accent/red values are SPIKE-PROVISIONAL — the point of
// the spike is to judge them. Findings + go/no-go: REFINEMENT.md.

const LIGHT = {
  grad: 'linear-gradient(330deg,#A6C9EB 12%,#FFE9BF 100%)',
  canvas: '#FFFFFF', panel: '#F4F7FB',
  ink: '#0A0A0A', inkSoft: '#3F3F3F', inkMuted: '#6B6B6B',
  accent: '#7030A0', gold: '#FFE1A4', neg: '#9B2226',
  line: 'rgba(0,0,0,0.12)', logoFilter: 'grayscale(1) brightness(0)',
};
const DARK = {
  // NIGHT: deep indigo night sky → ashen moonlit grey (cold, not ivory,
  // not yellow). The grey stop is light enough to read as a real
  // gradient; the dark stop at 12% keeps the slide overall dark.
  // Supersedes the Brand Style Brief's #0E2841→#7A5F2A inversion.
  grad: 'linear-gradient(330deg,#151030 40%,#8B8B96 100%)',
  canvas: '#141029', panel: '#201A3C',           // deeper indigo content / panel
  ink: '#E6E0CE',                                // faint moonlight ivory text
  inkSoft: '#ACA6BC', inkMuted: '#786F92',       // muted lavender-greys
  accent: '#B388E0',  // lifted purple — SPIKE-PROVISIONAL
  gold: '#FFE1A4',    // the one-moment hot — unchanged (gradient no longer gold)
  neg: '#E26D6F',     // lifted red — SPIKE-PROVISIONAL
  line: 'rgba(230,224,206,0.14)',                // faint ivory hairline
  logoFilter: 'grayscale(1) brightness(0) invert(1)', // must invert on dark
};
type T = typeof LIGHT;

const f = {
  display: "'Prata',Georgia,serif",
  caps: "'Helvetica Neue','Inter',-apple-system,system-ui,sans-serif",
  body: "'Inter',system-ui,sans-serif",
  mono: "'JetBrains Mono','SF Mono',monospace",
};
const styles = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@500;700&family=Prata&display=swap");
@keyframes tk-fadeUp { 0% { opacity:0; transform:translateY(16px);} 100% { opacity:1; transform:translateY(0);} }
@keyframes tk-fadeIn { 0% { opacity:0;} 100% { opacity:1;} }
@keyframes tk-grow  { 0% { transform:scaleX(0);} 100% { transform:scaleX(1);} }
@keyframes tk-rise  { 0% { opacity:0; transform:translateY(28px);} 100% { opacity:1; transform:translateY(0);} }
`;

const Tag = ({ mode }: { mode: 'LIGHT' | 'DARK' }) => (
  <div style={{ position:'absolute', right:100, top:60, fontFamily:f.mono, fontSize:16,
    letterSpacing:'0.18em', color: mode==='DARK' ? 'rgba(255,255,255,0.5)' : '#AFAFAF' }}>{mode}</div>
);

// ── Archetype renderers (token-parameterised) ────────────────────────────────
const Cover = (t: T, mode: 'LIGHT'|'DARK') => (
  <><style>{styles}</style>
    <div style={{ width:'100%', height:'100%', background:t.grad, color:t.ink,
      fontFamily:f.body, padding:100, boxSizing:'border-box', position:'relative', overflow:'hidden' }}>
      <Tag mode={mode} />
      <div style={{ fontFamily:f.caps, fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase',
        fontWeight:700, display:'inline-flex', alignItems:'center', gap:14,
        animation:'600ms ease-out both tk-fadeUp' }}>
        <span aria-hidden style={{ width:12, height:12, background:t.accent, display:'inline-block' }} />Taikyoku · Seed
      </div>
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'calc(100% - 60px)' }}>
        <h1 style={{ fontFamily:f.display, fontSize:168, fontWeight:400, lineHeight:0.96,
          letterSpacing:'-0.03em', margin:0, animation:'700ms ease-out 200ms both tk-fadeUp' }}>
          Decisions, Rendered</h1>
        <div aria-hidden style={{ width:320, height:6, background:t.accent, marginTop:48,
          transformOrigin:'left center', animation:'700ms cubic-bezier(0.7,0,0.2,1) 700ms both tk-grow' }} />
        <p style={{ marginTop:32, fontSize:36, lineHeight:1.4, fontWeight:500, maxWidth:1200,
          animation:'600ms ease-out 1000ms both tk-fadeUp' }}>
          Daytime: light-blue sky → warm sun. Night: indigo → ashen moonlit grey.</p>
      </div>
    </div></>
);

const DataSlide = (t: T, mode: 'LIGHT'|'DARK') => (
  <><style>{styles}</style>
    <div style={{ width:'100%', height:'100%', background:t.canvas, color:t.ink,
      fontFamily:f.body, padding:100, boxSizing:'border-box', position:'relative' }}>
      <Tag mode={mode} />
      <div style={{ borderBottom:`1px solid ${t.ink}`, paddingBottom:18, fontFamily:f.caps,
        fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase',
        display:'inline-flex', alignItems:'center', gap:14, animation:'600ms ease-out both tk-fadeUp' }}>
        <span aria-hidden style={{ width:12, height:12, background:t.accent, display:'inline-block' }} />Quarter in review
      </div>
      <h2 style={{ fontFamily:f.display, fontSize:88, fontWeight:400, lineHeight:1.02,
        letterSpacing:'-0.02em', margin:'48px 0 0', animation:'600ms ease-out 150ms both tk-fadeUp' }}>
        The Numbers That Moved</h2>
      <div style={{ display:'flex', gap:40, marginTop:64 }}>
        {[{v:'+18.4%',l:'Net new ARR',n:false},{v:'−6.2%',l:'Gross churn',n:true},{v:'132%',l:'Net retention',n:false}].map((m,i)=>(
          <div key={i} style={{ flex:1, background:t.panel, borderTop:`1px solid ${t.line}`, padding:'32px 28px',
            animation:`600ms cubic-bezier(0.2,0.7,0.3,1) ${250+i*150}ms both tk-rise` }}>
            <div style={{ fontFamily:f.mono, fontVariantNumeric:'tabular-nums', fontWeight:700, fontSize:56,
              color: m.n ? t.neg : t.ink }}>{m.v}</div>
            <div style={{ fontFamily:f.caps, fontSize:20, letterSpacing:'0.16em', textTransform:'uppercase',
              color:t.inkMuted, marginTop:12 }}>{m.l}</div>
          </div>
        ))}
      </div>
      <p style={{ marginTop:48, fontSize:24, lineHeight:1.5, color:t.inkSoft, maxWidth:1100,
        animation:'600ms ease-out 800ms both tk-fadeUp' }}>
        Negative delta in <span style={{ color:t.neg, fontWeight:700 }}>accent-negative</span>;
        purple eyebrow dot in <span style={{ color:t.accent, fontWeight:700 }}>accent</span>.
        Does the contrast hold on dark?</p>
    </div></>
);

const Logos = (t: T, mode: 'LIGHT'|'DARK') => (
  <><style>{styles}</style>
    <div style={{ width:'100%', height:'100%', background:t.canvas, color:t.ink,
      fontFamily:f.body, padding:100, boxSizing:'border-box', position:'relative' }}>
      <Tag mode={mode} />
      <h2 style={{ fontFamily:f.display, fontSize:72, fontWeight:400, lineHeight:1.05,
        letterSpacing:'-0.02em', margin:0, animation:'600ms ease-out both tk-fadeUp' }}>Teams That Ship On It</h2>
      <div style={{ fontFamily:f.mono, fontVariantNumeric:'tabular-nums', fontSize:44, fontWeight:700,
        marginTop:24, animation:'600ms ease-out 200ms both tk-fadeUp' }}>40+ teams · 6 industries</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'40px 56px', marginTop:56,
        alignItems:'center', justifyItems:'center' }}>
        {['NORTHWIND','ACME','HELIOS','VANTA','ORBIT','MERIDIAN'].map((w,i)=>(
          <div key={i} style={{ filter:t.logoFilter, opacity:0.8,
            fontFamily:f.display, fontSize:34, color:'#0A0A0A',
            animation:`500ms ease-out ${300+i*120}ms both tk-fadeIn` }}>{w}</div>
        ))}
      </div>
      <p style={{ marginTop:40, fontSize:22, color:t.inkMuted }}>
        Monochrome logos: light uses brightness(0) (→ ink); dark adds invert(1) (→ paper).</p>
    </div></>
);

const Closing = (t: T, mode: 'LIGHT'|'DARK') => (
  <><style>{styles}</style>
    <div style={{ width:'100%', height:'100%', background:t.canvas, color:t.ink,
      fontFamily:f.body, padding:100, boxSizing:'border-box', position:'relative',
      display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', gap:36 }}>
      <Tag mode={mode} />
      <h2 style={{ fontFamily:f.display, fontSize:120, fontWeight:400, lineHeight:1.0,
        letterSpacing:'-0.02em', margin:0, animation:'700ms ease-out both tk-fadeUp' }}>The Whole Board</h2>
      {/* the one assigned gold moment — the real test of gold on dark */}
      <div aria-hidden style={{ width:360, height:6, background:t.gold, transformOrigin:'center',
        animation:'800ms cubic-bezier(0.7,0,0.2,1) 400ms both tk-grow' }} />
      <div style={{ fontFamily:f.caps, fontSize:20, letterSpacing:'0.22em', fontWeight:700,
        textTransform:'uppercase', color:t.inkSoft, animation:'600ms ease-out 900ms both tk-fadeIn' }}>TKYK</div>
    </div></>
);

const wrap = (r: ReactNode): Page => () => <>{r}</>;

const Intro: Page = () => (
  <><style>{styles}</style>
    <div style={{ width:'100%', height:'100%', background:DARK.grad, color:DARK.ink,
      fontFamily:f.body, padding:100, boxSizing:'border-box', display:'flex',
      flexDirection:'column', justifyContent:'center' }}>
      <div style={{ fontFamily:f.caps, fontSize:22, letterSpacing:'0.22em', textTransform:'uppercase',
        fontWeight:700, animation:'600ms ease-out both tk-fadeUp' }}>Taikyoku · Dark-variant spike</div>
      <h1 style={{ fontFamily:f.display, fontSize:104, fontWeight:400, lineHeight:1.0,
        letterSpacing:'-0.03em', margin:'36px 0 0', animation:'700ms ease-out 200ms both tk-fadeUp' }}>
        Light, Then Dark</h1>
      <p style={{ fontSize:30, lineHeight:1.45, fontWeight:500, maxWidth:1200, marginTop:26,
        animation:'600ms ease-out 400ms both tk-fadeUp' }}>
        Four highest-risk archetypes, each light then dark. Feasibility
        spike — production components untouched. Go/no-go in REFINEMENT.</p>
    </div></>
);

export const meta: SlideMeta = { title: 'Taikyoku — dark-variant spike', theme: 'taikyoku' };

export default [
  Intro,
  wrap(Cover(LIGHT,'LIGHT')),    wrap(Cover(DARK,'DARK')),
  wrap(DataSlide(LIGHT,'LIGHT')), wrap(DataSlide(DARK,'DARK')),
  wrap(Logos(LIGHT,'LIGHT')),     wrap(Logos(DARK,'DARK')),
  wrap(Closing(LIGHT,'LIGHT')),   wrap(Closing(DARK,'DARK')),
];
