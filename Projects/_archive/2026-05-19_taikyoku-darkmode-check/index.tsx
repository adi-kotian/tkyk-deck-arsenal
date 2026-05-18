import type { Page, SlideMeta } from '@open-slide/core';
import type { ReactNode, CSSProperties } from 'react';
// Dark-mode token-indirection VALIDATION. Imports the ACTUAL refactored
// library components and flips them to dark by setting the --tk-* block
// on a PER-SLIDE WRAPPER (inline custom properties — scoped to the
// subtree, NOT :root, so light and dark never contaminate each other).
// ZERO component changes. Light = the same components wrapped in the
// light var set.
import { OpeningHero } from '../../themes/taikyoku/components/opening-hero';
import { SectionDivider } from '../../themes/taikyoku/components/section-divider';
import { QuarterlyMetrics } from '../../themes/taikyoku/components/quarterly-metrics';
import { Quadrant } from '../../themes/taikyoku/components/quadrant';
import { LogoCluster } from '../../themes/taikyoku/components/logo-cluster';
import { Closing } from '../../themes/taikyoku/components/closing';

// Mode = inline CSS custom properties on a per-slide wrapper (scoped).
const TK_LIGHT: Record<string,string> = {
  '--tk-grad-cool':'#A6C9EB','--tk-grad-warm':'#FFE9BF','--tk-grad-cool-pos':'12%',
  '--tk-paper':'#FFFFFF','--tk-paper-tint':'#F4F7FB','--tk-paper-tint-2':'#E9EEF4',
  '--tk-ink':'#0A0A0A','--tk-ink-soft':'#3F3F3F','--tk-ink-muted':'#6B6B6B','--tk-ink-faint':'#AFAFAF',
  '--tk-accent':'#7030A0','--tk-accent-hot':'#FFE1A4','--tk-accent-negative':'#9B2226',
  '--tk-line':'rgba(0,0,0,0.12)','--tk-rule':'rgba(0,0,0,0.40)',
  '--tk-logo-filter':'grayscale(1) brightness(0)',
};
const TK_DARK: Record<string,string> = {
  '--tk-grad-cool':'#151030','--tk-grad-warm':'#8B8B96','--tk-grad-cool-pos':'40%',
  '--tk-paper':'#141029','--tk-paper-tint':'#201A3C','--tk-paper-tint-2':'#2A2452',
  '--tk-ink':'#E6E0CE','--tk-ink-soft':'#ACA6BC','--tk-ink-muted':'#786F92','--tk-ink-faint':'#5A5478',
  '--tk-accent':'#B388E0','--tk-accent-hot':'#FFE1A4','--tk-accent-negative':'#E26D6F',
  '--tk-line':'rgba(230,224,206,0.14)','--tk-rule':'rgba(230,224,206,0.34)',
  '--tk-logo-filter':'grayscale(1) brightness(0) invert(1)',
};
const KF = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@500;700&family=Prata&display=swap");
@keyframes tk-fadeUp { 0%{opacity:0;transform:translateY(16px)} 100%{opacity:1;transform:translateY(0)} }
@keyframes tk-fadeIn { 0%{opacity:0} 100%{opacity:1} }
@keyframes tk-grow  { 0%{transform:scaleX(0)} 100%{transform:scaleX(1)} }
@keyframes tk-growY { 0%{transform:scaleY(0)} 100%{transform:scaleY(1)} }
@keyframes tk-rise  { 0%{opacity:0;transform:translateY(28px)} 100%{opacity:1;transform:translateY(0)} }`;

// Per-slide scoping wrapper. Vars live HERE (inline), never on :root.
const Slide = ({ dark, children }: { dark: boolean; children: ReactNode }) => (
  <>
    <style>{KF}</style>
    <div style={{ ...(dark ? TK_DARK : TK_LIGHT), width:'100%', height:'100%' } as CSSProperties}>
      {children}
    </div>
  </>
);
const Paper = ({ children }: { children: ReactNode }) => (
  <div style={{ width:'100%', height:'100%', background:'var(--tk-paper,#FFFFFF)',
    color:'var(--tk-ink,#0A0A0A)', fontFamily:"'Inter',system-ui,sans-serif",
    padding:100, boxSizing:'border-box', overflow:'hidden' }}>{children}</div>
);
const Word = ({ t }: { t: string }) => (
  <div aria-hidden style={{ fontFamily:"'Prata',serif", fontSize:34, color:'var(--tk-ink,#0A0A0A)', lineHeight:1 }}>{t}</div>
);

const metrics = [
  { value:'$6.2B', label:'Under assurance', context:'4 owners' },
  { value:'$184M', label:'Exposure surfaced', context:'first 90 days' },
  { value:'11×', label:'Pilot ROI' },
];
const quads: [any,any,any,any] = [
  { label:"Owner's-engineer", items:['Independent, sampled'] },
  { label:'Taikyoku', items:['Independent','Continuous'] },
  { label:'EPC self-report', items:['Conflicted'] },
  { label:'Project controls', items:['Data, not assurance'] },
];

function pages(dark: boolean): Page[] {
  const tag = dark ? 'DARK' : 'LIGHT';
  const w = (n: ReactNode) => () => <Slide dark={dark}>{n}</Slide>;
  return [
    w(<OpeningHero eyebrow={`Token check · ${tag}`} meta="2026"
      title="One Wrapper Flips It" sub="Same component file. Vars are scoped to this slide — no :root, no leak." />),
    w(<SectionDivider kicker={`Token check · ${tag}`} number="01" title="Gradient & Ink" />),
    w(<Paper><QuarterlyMetrics eyebrow={`Metrics · ${tag}`} heading="Paper, Tint, Mono"
      variant="hero-supporting" density="standard" metrics={metrics} /></Paper>),
    w(<Paper><Quadrant eyebrow={`Quadrant · ${tag}`} heading="Accent & Tint-2 Highlight"
      density="standard" highlightQuadrant={1} axis={{ xLabel:'Periodic → Continuous', yLabel:'Conflicted → Independent' }}
      quadrants={quads} /></Paper>),
    w(<Paper><LogoCluster eyebrow={`Logos · ${tag}`} heading="Monochrome Filter Inverts"
      headlineStat="40+ teams" density="rich"
      logos={[<Word t="NORTHWIND" />,<Word t="ACME" />,<Word t="HELIOS" />,<Word t="ORBIT" />,<Word t="VANTA" />,<Word t="MERIDIAN" />]} /></Paper>),
    w(<Closing headline="Gold Holds Either Way" sub={`${tag} — accent-hot is unchanged across modes.`} goldMoment />),
  ];
}

export const meta: SlideMeta = { title: 'Taikyoku — dark-mode token check (light then dark)', theme: 'taikyoku' };
export default [...pages(false), ...pages(true)];
