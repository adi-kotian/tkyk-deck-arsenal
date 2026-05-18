import type { Page, SlideMeta } from '@open-slide/core';

// Smoke test for DA2 Phase 1.
// If you can see this slide at http://localhost:5173/s/2026-05-14_smoke,
// the slidesDir override in engine/apps/demo/open-slide.config.ts is wired
// correctly and slides discovered from Projects/ render through open-slide.
// Delete this folder when satisfied.

const Hello: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      color: '#000000',
      fontFamily: '"Inter", system-ui, sans-serif',
      gap: 40,
    }}
  >
    <div
      style={{
        fontSize: 32,
        letterSpacing: 6,
        textTransform: 'uppercase',
        color: '#6c6c6c',
      }}
    >
      DA2 · Phase 1
    </div>
    <div
      style={{
        fontSize: 180,
        fontWeight: 800,
        lineHeight: 1.0,
        letterSpacing: -4,
        textAlign: 'center',
      }}
    >
      It's alive.
    </div>
    <div
      style={{
        marginTop: 24,
        width: 320,
        height: 12,
        background: '#ff3300',
      }}
    />
  </div>
);

const Plumbing: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: '#ffffff',
      color: '#000000',
      fontFamily: '"Inter", system-ui, sans-serif',
      padding: 120,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 48,
    }}
  >
    <div
      style={{
        fontSize: 28,
        letterSpacing: 4,
        textTransform: 'uppercase',
        color: '#6c6c6c',
      }}
    >
      What this confirms
    </div>
    <div
      style={{
        fontSize: 80,
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: -2,
        maxWidth: 1500,
      }}
    >
      The slidesDir override works.
    </div>
    <div
      style={{
        marginTop: 24,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 48,
      }}
    >
      {[
        {
          label: '01 / Discovery',
          text: 'open-slide found this file at Projects/2026-05-14_smoke/ — outside the engine workspace.',
        },
        {
          label: '02 / Routing',
          text: 'The slug 2026-05-14_smoke became the URL /s/2026-05-14_smoke.',
        },
        {
          label: '03 / Portability',
          text: 'All paths in DA2 are relative. Moving this folder anywhere on disk leaves the wiring intact.',
        },
      ].map((card) => (
        <div
          key={card.label}
          style={{
            paddingTop: 28,
            borderTop: '4px solid #000000',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div
            style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 22,
              color: '#ff3300',
              letterSpacing: 2,
            }}
          >
            {card.label}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.5,
              color: '#404040',
            }}
          >
            {card.text}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const meta: SlideMeta = {
  title: 'DA2 smoke test',
};

export default [Hello, Plumbing] satisfies Page[];
