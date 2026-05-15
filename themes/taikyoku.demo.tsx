import type { Page, SlideMeta } from '@open-slide/core';
import type { ReactNode } from 'react';

// ─── Theme tokens (mirror taikyoku.md) ────────────────────────────────────────
const c = {
  gradientCool: '#A6C9EB',
  gradientWarm: '#FFE9BF',
  paper: '#FFFFFF',
  paperTint: '#F4F7FB',
  ink: '#0A0A0A',
  inkSoft: '#3F3F3F',
  inkMuted: '#6B6B6B',
  inkFaint: '#AFAFAF',
  accent: '#7030A0',
  accentHot: '#FFE1A4',
  line: 'rgba(0,0,0,0.12)',
  rule: 'rgba(0,0,0,0.40)',
};

const f = {
  display: "'Prata', Georgia, 'Times New Roman', serif",
  caps: "'Archivo', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Menlo', monospace",
};

const styles = `
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;900&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@500;700&family=Prata&display=swap");

@keyframes tk-fadeUp {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes tk-fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes tk-grow {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}
@keyframes tk-rise {
  0% { opacity: 0; transform: translateY(28px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes tk-draw {
  100% { stroke-dashoffset: 0; }
}
@keyframes tk-breath {
  0%, 100% { transform: scale(1.0); }
  50%      { transform: scale(1.02); }
}
`;

// ─── Shared chrome ────────────────────────────────────────────────────────────

const GradientCanvas = ({ children, breath = false }: { children: ReactNode; breath?: boolean }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: `linear-gradient(330deg, ${c.gradientCool} 12%, ${c.gradientWarm} 100%)`,
      color: c.ink,
      fontFamily: f.body,
      padding: 100,
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      ...(breath
        ? { animation: '8s ease-in-out infinite tk-breath', transformOrigin: 'center center' }
        : {}),
    }}
  >
    <style>{styles}</style>
    {children}
  </div>
);

const PaperCanvas = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: c.paper,
      color: c.ink,
      fontFamily: f.body,
      padding: 100,
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <style>{styles}</style>
    {children}
  </div>
);

const Eyebrow = ({ label, meta, delay = 0 }: { label: string; meta?: string[]; delay?: number }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottom: `1px solid ${c.ink}`,
      paddingBottom: 18,
      fontFamily: f.caps,
      fontSize: 22,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      animation: `600ms ease-out ${delay}ms both tk-fadeUp`,
    }}
  >
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: c.ink }}>
      <span aria-hidden style={{ width: 12, height: 12, background: c.accent, display: 'inline-block' }} />
      <span style={{ fontWeight: 700 }}>{label}</span>
    </span>
    {meta && (
      <span
        style={{
          display: 'inline-flex',
          gap: 32,
          color: c.inkMuted,
          fontWeight: 500,
          fontSize: 20,
          letterSpacing: '0.16em',
        }}
      >
        {meta.map((m, i) => <span key={i}>{m}</span>)}
      </span>
    )}
  </div>
);

const AccentRule = ({ width = 320, delay = 0, color = c.accent }: { width?: number; delay?: number; color?: string }) => (
  <div
    aria-hidden
    style={{
      width,
      height: 6,
      background: color,
      transformOrigin: 'left center',
      animation: `700ms cubic-bezier(0.7, 0, 0.2, 1) ${delay}ms both tk-grow`,
    }}
  />
);

const Folio = ({ section, page, total }: { section: string; page: number; total: number }) => (
  <div
    style={{
      position: 'absolute',
      left: 100,
      right: 100,
      bottom: 56,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontFamily: f.caps,
      fontSize: 20,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      borderTop: `1px solid ${c.ink}`,
      paddingTop: 18,
    }}
  >
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: c.ink }}>
      <span aria-hidden style={{ width: 8, height: 8, background: c.accent, display: 'inline-block' }} />
      <span style={{ fontWeight: 700 }}>{section}</span>
      <span style={{ color: c.inkMuted, margin: '0 4px' }}>/</span>
      <span style={{ color: c.inkMuted, fontWeight: 500 }}>taikyoku</span>
    </span>
    <span
      style={{
        fontFamily: f.mono,
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 700,
        color: c.ink,
      }}
    >
      {String(page).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  </div>
);

// ─── Page 1 — Cover (gradient + breath) ───────────────────────────────────────

const Cover: Page = () => (
  <GradientCanvas breath>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        fontFamily: f.caps,
        fontSize: 22,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        animation: '600ms ease-out both tk-fadeUp',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: c.ink }}>
        <span aria-hidden style={{ width: 12, height: 12, background: c.accent, display: 'inline-block' }} />
        <span style={{ fontWeight: 700 }}>Taikyoku</span>
      </span>
      <span style={{ color: c.inkMuted, fontWeight: 500, fontSize: 20, letterSpacing: '0.16em' }}>
        synthesis · 2026 · 05
      </span>
    </div>

    <div style={{ marginTop: 96, maxWidth: 1600 }}>
      <h1
        style={{
          fontFamily: f.display,
          fontSize: 168,
          fontWeight: 400,
          lineHeight: 0.96,
          letterSpacing: '-0.03em',
          margin: 0,
          color: c.ink,
          animation: '700ms ease-out 200ms both tk-fadeUp',
        }}
      >
        Editorial<br />composition.
      </h1>

      <div style={{ marginTop: 48 }}>
        <AccentRule width={360} delay={700} />
      </div>

      <p
        style={{
          marginTop: 40,
          fontSize: 36,
          lineHeight: 1.4,
          color: c.ink,
          fontWeight: 500,
          maxWidth: 1200,
          animation: '600ms ease-out 1000ms both tk-fadeUp',
        }}
      >
        Aurora's structural restraint, the deck-arsenal motion vocabulary trimmed
        by half, rendered in the Taikyoku palette.
      </p>
    </div>

    <div
      style={{
        position: 'absolute',
        left: 100,
        right: 100,
        bottom: 80,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        animation: '600ms ease-out 1400ms both tk-fadeIn',
      }}
    >
      <div
        style={{
          fontFamily: f.caps,
          fontSize: 20,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: c.inkMuted,
        }}
      >
        a working method
      </div>
      <div
        style={{
          padding: '14px 22px',
          border: `1px solid ${c.ink}`,
          fontFamily: f.caps,
          color: c.ink,
          minWidth: 220,
        }}
      >
        <div
          style={{
            color: c.inkMuted,
            fontSize: 14,
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          format
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            fontSize: 26,
            fontWeight: 700,
            fontFamily: f.mono,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <span>1920</span>
          <span style={{ color: c.accent, fontWeight: 900 }}>×</span>
          <span>1080</span>
        </div>
      </div>
    </div>
  </GradientCanvas>
);

// ─── Page 2 — Section divider (gradient, centered) ────────────────────────────

const Section: Page = () => (
  <GradientCanvas>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 64,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          animation: '700ms ease-out both tk-fadeUp',
        }}
      >
        <div
          style={{
            fontFamily: f.display,
            fontSize: 144,
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: c.inkSoft,
          }}
        >
          01
        </div>
        <AccentRule width={120} delay={400} />
      </div>

      <div
        aria-hidden
        style={{
          width: 1,
          height: 280,
          background: c.inkMuted,
          opacity: 0,
          animation: '500ms ease-out 600ms both tk-fadeIn',
        }}
      />

      <h2
        style={{
          fontFamily: f.display,
          fontSize: 96,
          fontWeight: 400,
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          margin: 0,
          maxWidth: 720,
          color: c.ink,
          animation: '700ms ease-out 300ms both tk-fadeUp',
        }}
      >
        Cover & section<br />
        carry the gradient.
      </h2>
    </div>
  </GradientCanvas>
);

// ─── Page 3 — Value (paper, three-card grid) ──────────────────────────────────

const ValueCard = ({ index, title, body, delay }: { index: string; title: string; body: string; delay: number }) => (
  <div
    style={{
      position: 'relative',
      paddingTop: 32,
      animation: `600ms cubic-bezier(0.2, 0.7, 0.3, 1) ${delay}ms both tk-rise`,
    }}
  >
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: c.ink,
        transformOrigin: 'left center',
        animation: `600ms cubic-bezier(0.7, 0, 0.2, 1) ${delay + 100}ms both tk-grow`,
      }}
    />
    <div
      style={{
        fontFamily: f.caps,
        fontSize: 22,
        letterSpacing: '0.20em',
        fontWeight: 700,
        marginBottom: 18,
        fontVariantNumeric: 'tabular-nums',
        color: c.accent,
      }}
    >
      {index}
      <span style={{ color: c.ink, margin: '0 8px' }}>/</span>
      <span style={{ color: c.inkMuted }}>03</span>
    </div>
    <div
      style={{
        fontFamily: f.caps,
        fontSize: 60,
        fontWeight: 900,
        lineHeight: 1.02,
        letterSpacing: '-0.015em',
        marginBottom: 24,
        color: c.ink,
      }}
    >
      {title}
    </div>
    <AccentRule width={64} delay={delay + 300} />
    <p
      style={{
        marginTop: 24,
        fontSize: 28,
        lineHeight: 1.55,
        color: c.ink,
        fontWeight: 500,
        margin: '24px 0 0 0',
      }}
    >
      {body}
    </p>
  </div>
);

const Value: Page = () => (
  <PaperCanvas>
    <Eyebrow label="02 · principles" meta={['paper canvas', 'three cards']} />

    <div style={{ marginTop: 56 }}>
      <h2
        style={{
          fontFamily: f.display,
          fontSize: 104,
          fontWeight: 400,
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          margin: 0,
          color: c.ink,
          animation: '700ms ease-out 100ms both tk-fadeUp',
        }}
      >
        Three <span style={{ color: c.accent }}>principles</span>.
      </h2>
      <p
        style={{
          marginTop: 24,
          fontSize: 32,
          lineHeight: 1.5,
          color: c.inkMuted,
          fontWeight: 500,
          margin: '24px 0 0 0',
          maxWidth: 1500,
          animation: '600ms ease-out 250ms both tk-fadeUp',
        }}
      >
        The same vocabulary the smoke deck used — restraint sets which idioms
        come along.
      </p>
    </div>

    <div
      style={{
        marginTop: 72,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 56,
      }}
    >
      <ValueCard
        index="01"
        title="Determinism"
        body="Known pieces compose into a known whole. Same brief, same atoms, same deck — no temperature, no surprise."
        delay={500}
      />
      <ValueCard
        index="02"
        title="Reusability"
        body="Every page becomes a future page. The cost of slide N+1 is search, not generation; the library compounds."
        delay={650}
      />
      <ValueCard
        index="03"
        title="Iteration"
        body="Surgical edits replace re-rolls. Swap one atom, leave the rest. The deck is read-write where generation is read-only."
        delay={800}
      />
    </div>

    <Folio section="principles" page={3} total={6} />
  </PaperCanvas>
);

// ─── Page 4 — Workflow (paper, SVG draw + columns) ────────────────────────────

const Workflow: Page = () => {
  const stages = [
    { num: '01', name: 'Order', body: 'Brief verbatim. Topic, audience, constraints captured as raw input.' },
    { num: '02', name: 'Memo', body: 'Synthesize into one page. The deck is decided in prose, not code.' },
    { num: '03', name: 'Storyboard', body: 'Page-by-page outline. Each slot named and ordered; no copy yet.' },
    { num: '04', name: 'Compose', body: 'Pull atoms from the library, assemble. First compile is also first read.' },
    { num: '05', name: 'Finalize', body: 'Self-review, tighten copy, run checks, ship to exports/.' },
  ];
  return (
    <PaperCanvas>
      <Eyebrow label="03 · sequence" meta={['svg line-draw', 'five stages']} />

      <div style={{ marginTop: 56 }}>
        <h2
          style={{
            fontFamily: f.display,
            fontSize: 96,
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            margin: 0,
            color: c.ink,
            animation: '700ms ease-out both tk-fadeUp',
          }}
        >
          Five stages. <span style={{ color: c.inkMuted }}>Strict order.</span>
        </h2>
        <p
          style={{
            marginTop: 24,
            fontSize: 30,
            lineHeight: 1.5,
            color: c.inkMuted,
            fontWeight: 500,
            margin: '24px 0 0 0',
            maxWidth: 1500,
            animation: '600ms ease-out 200ms both tk-fadeUp',
          }}
        >
          The same line as the smoke deck — the dot doesn't travel, the line just
          draws.
        </p>
      </div>

      <div style={{ marginTop: 64, position: 'relative', width: '100%', height: 56, marginBottom: 28 }}>
        <svg
          viewBox="0 0 1720 56"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
        >
          <line
            x1="40"
            y1="28"
            x2="1680"
            y2="28"
            stroke={c.ink}
            strokeWidth="1"
            strokeDasharray="1720"
            strokeDashoffset="1720"
            style={{ animation: '800ms ease-out 300ms forwards tk-draw' }}
          />
          {[40, 450, 860, 1270, 1680].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1="14"
              x2={x}
              y2="42"
              stroke={c.ink}
              strokeWidth="1"
              style={{ animation: `300ms ease-out ${1100 + i * 100}ms both tk-fadeIn` }}
            />
          ))}
        </svg>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 28, marginTop: 28 }}>
        {stages.map((s, i) => (
          <div key={s.num} style={{ animation: `600ms ease-out ${400 + i * 150}ms both tk-fadeUp` }}>
            <div
              style={{
                fontFamily: f.caps,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: c.ink,
                marginBottom: 14,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              STAGE <span style={{ color: c.inkMuted, margin: '0 4px' }}>·</span>
              <span style={{ color: c.accent }}>{s.num}</span>
            </div>
            <div
              aria-hidden
              style={{
                width: '100%',
                height: 1,
                background: c.ink,
                marginBottom: 22,
                transformOrigin: 'left center',
                animation: `500ms cubic-bezier(0.7, 0, 0.2, 1) ${600 + i * 150}ms both tk-grow`,
              }}
            />
            <div
              style={{
                fontFamily: f.caps,
                fontSize: 44,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                marginBottom: 18,
                color: c.ink,
              }}
            >
              {s.name}
            </div>
            <div
              style={{
                fontSize: 22,
                lineHeight: 1.55,
                color: c.ink,
                fontWeight: 500,
              }}
            >
              {s.body}
            </div>
          </div>
        ))}
      </div>

      <Folio section="sequence" page={4} total={6} />
    </PaperCanvas>
  );
};

// ─── Page 5 — Architecture (paper, 2×2 grid with hairline tops) ──────────────

const ArchQuadrant = ({ index, title, items, delay }: { index: string; title: string; items: string[]; delay: number }) => (
  <div
    style={{
      paddingTop: 28,
      borderTop: `2px solid ${c.ink}`,
      animation: `600ms cubic-bezier(0.2, 0.7, 0.3, 1) ${delay}ms both tk-rise`,
    }}
  >
    <div
      style={{
        fontFamily: f.caps,
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: '0.22em',
        color: c.accent,
        marginBottom: 12,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {index}
    </div>
    <div
      style={{
        fontFamily: f.display,
        fontSize: 44,
        fontWeight: 400,
        lineHeight: 1.05,
        letterSpacing: '-0.015em',
        marginBottom: 18,
        color: c.ink,
      }}
    >
      {title}
    </div>
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        fontFamily: f.body,
        fontSize: 22,
        lineHeight: 1.55,
        color: c.ink,
        fontWeight: 500,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      {items.map((item, i) => (
        <li key={i} style={{ paddingLeft: 16, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, color: c.inkMuted }}>—</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Architecture: Page = () => (
  <PaperCanvas>
    <Eyebrow label="04 · structure" meta={['paper canvas', '2×2 grid']} />

    <div style={{ marginTop: 56 }}>
      <h2
        style={{
          fontFamily: f.display,
          fontSize: 96,
          fontWeight: 400,
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          margin: 0,
          color: c.ink,
          animation: '700ms ease-out both tk-fadeUp',
        }}
      >
        Filesystem <span style={{ color: c.accent }}>is</span> the state.
      </h2>
    </div>

    <div
      style={{
        marginTop: 64,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 56,
        flex: 1,
      }}
    >
      <ArchQuadrant
        index="01 · INTAKE"
        title="Order & memo"
        items={['order.md in Inbox/ or inline', 'memo.md drafted by subagent', 'approve memo / revise']}
        delay={300}
      />
      <ArchQuadrant
        index="02 · DESIGN"
        title="Storyboard"
        items={['recipe + per-deck content', 'beats keyed by purpose', 'approve storyboard / revise']}
        delay={450}
      />
      <ArchQuadrant
        index="03 · BUILD"
        title="Compose"
        items={['index.tsx written from theme', 'slide-authoring rules enforced', 'editor opens in browser']}
        delay={600}
      />
      <ArchQuadrant
        index="04 · SHIP"
        title="Finalize"
        items={['HTML + PDF exported', 'land in exports/', 'minutes & one-pager from memo']}
        delay={750}
      />
    </div>

    <Folio section="structure" page={5} total={6} />
  </PaperCanvas>
);

// ─── Page 6 — Closing (paper, gold moment) ───────────────────────────────────

const Closing: Page = () => (
  <PaperCanvas>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100,
        gap: 32,
      }}
    >
      <div
        style={{
          fontFamily: f.caps,
          fontSize: 20,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: c.inkMuted,
          fontWeight: 500,
          animation: '600ms ease-out both tk-fadeUp',
        }}
      >
        the long view
      </div>

      <h1
        style={{
          fontFamily: f.display,
          fontSize: 140,
          fontWeight: 400,
          lineHeight: 0.98,
          letterSpacing: '-0.025em',
          margin: 0,
          color: c.ink,
          textAlign: 'center',
          animation: '700ms ease-out 200ms both tk-fadeUp',
        }}
      >
        Take the<br />
        long view.
      </h1>

      {/* The one moment of gold — accent-hot rule below the headline */}
      <div
        aria-hidden
        style={{
          width: 280,
          height: 8,
          background: c.accentHot,
          marginTop: 16,
          transformOrigin: 'center center',
          animation: '800ms cubic-bezier(0.7, 0, 0.2, 1) 800ms both tk-grow',
        }}
      />

      <p
        style={{
          marginTop: 24,
          fontSize: 28,
          lineHeight: 1.5,
          color: c.inkSoft,
          fontWeight: 500,
          maxWidth: 900,
          textAlign: 'center',
          margin: '24px 0 0 0',
          animation: '600ms ease-out 1100ms both tk-fadeUp',
        }}
      >
        One purple accent everywhere. One moment of gold — here.
      </p>
    </div>

    <div
      style={{
        position: 'absolute',
        bottom: 56,
        left: 100,
        right: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        fontFamily: f.caps,
        fontSize: 18,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: c.inkMuted,
        fontWeight: 500,
        animation: '500ms ease-out 1500ms both tk-fadeIn',
      }}
    >
      <span>taikyoku · theme demo</span>
      <span
        style={{
          fontFamily: f.mono,
          fontVariantNumeric: 'tabular-nums',
          color: c.ink,
          fontWeight: 700,
        }}
      >
        06 / 06
      </span>
    </div>
  </PaperCanvas>
);

// ─── Export ───────────────────────────────────────────────────────────────────

export const meta: SlideMeta = {
  title: 'Taikyoku — theme demo',
  theme: 'taikyoku',
};

export default [Cover, Section, Value, Workflow, Architecture, Closing];
