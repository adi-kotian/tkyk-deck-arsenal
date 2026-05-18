/**
 * deck-contents — Taikyoku component library (Phase 9, Session B Archetype 6)
 *
 * USE: the "what's in this deck" slide. Two variants:
 *   - "agenda-grid":  2–3 column hairline cards (up-front agenda)
 *   - "progress-map": vertical list with the current section accented;
 *                      re-showable between sections as a "you are here"
 *
 * Canvas-agnostic CONTENT BLOCK — Page wraps it in a PaperCanvas.
 *
 * SLOTS: eyebrow, heading, sections[]{ number, title, descriptor }
 * PROPS: variant ('agenda-grid' | 'progress-map'),
 *        activeIndex (progress-map only — the current section)
 * DENSITY: standard, FIXED (number + title + descriptor). No density
 *   prop — a TOC doesn't flex (exception, like headline-metric).
 * MOTION: sequenced. progress-map: numbers tk-fadeUp → a connecting
 *   vertical hairline tk-growY threads the entries → entries tk-fadeIn.
 *   agenda-grid: plain staggered tk-fadeUp on cards (no threaded line —
 *   per the Session B reconciliation note). ≤1.6s, no breath.
 *   Slide must define tk-growY (vertical scale sibling of tk-grow).
 */
const c = {
  paper: 'var(--tk-paper,#FFFFFF)', paperTint: 'var(--tk-paper-tint,#F4F7FB)',
  ink: 'var(--tk-ink,#0A0A0A)', inkSoft: 'var(--tk-ink-soft,#3F3F3F)', inkMuted: 'var(--tk-ink-muted,#6B6B6B)',
  accent: 'var(--tk-accent,#7030A0)', line: 'var(--tk-line,rgba(0,0,0,0.12))',
};
const f = {
  display: "'Prata', Georgia, serif",
  caps: "'Helvetica Neue', 'Inter', -apple-system, system-ui, sans-serif",
  body: "'Inter', -apple-system, system-ui, sans-serif",
};

export type TocSection = { number: string; title: string; descriptor: string };
export type DeckContentsProps = {
  eyebrow: string;
  heading: string;
  sections: TocSection[];
  variant?: 'agenda-grid' | 'progress-map';
  activeIndex?: number;
};

export const DeckContents = ({
  eyebrow, heading, sections, variant = 'agenda-grid', activeIndex,
}: DeckContentsProps) => {
  const Head = (
    <>
      <div
        style={{
          borderBottom: `1px solid ${c.ink}`, paddingBottom: 18,
          fontFamily: f.caps, fontSize: 22, letterSpacing: '0.22em',
          textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 14,
          animation: '600ms ease-out both tk-fadeUp',
        }}
      >
        <span aria-hidden style={{ width: 12, height: 12, background: c.accent, display: 'inline-block' }} />
        <span style={{ fontWeight: 700 }}>{eyebrow}</span>
      </div>
      <h2
        style={{
          fontFamily: f.display, fontSize: 84, fontWeight: 400, lineHeight: 1.02,
          letterSpacing: '-0.02em', margin: '48px 0 48px', color: c.ink,
          animation: '600ms ease-out 150ms both tk-fadeUp',
        }}
      >
        {heading}
      </h2>
    </>
  );

  if (variant === 'progress-map') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {Head}
        <div style={{ display: 'flex', gap: 36, flex: 1 }}>
          <div
            aria-hidden
            style={{
              width: 2, background: c.ink, transformOrigin: 'top center',
              animation: '800ms cubic-bezier(0.7,0,0.2,1) 300ms both tk-growY',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
            {sections.map((s, i) => {
              const active = i === activeIndex;
              return (
                <div
                  key={s.number}
                  style={{
                    display: 'flex', alignItems: 'baseline', gap: 28,
                    opacity: activeIndex == null || active ? 1 : 0.45,
                    animation: `500ms ease-out ${500 + i * 150}ms both tk-fadeIn`,
                  }}
                >
                  {/* fixed-width number column so every title/descriptor
                      shares one left margin (progress-map alignment fix) */}
                  <span style={{ fontFamily: f.display, fontSize: 56, flex: '0 0 92px',
                    color: active ? c.accent : c.inkMuted }}>
                    {s.number}
                  </span>
                  <div>
                    <div style={{ fontFamily: f.display, fontSize: 44, color: active ? c.accent : c.ink }}>
                      {s.title}
                    </div>
                    <div style={{ fontFamily: f.body, fontSize: 22, color: c.inkSoft, marginTop: 6 }}>
                      {s.descriptor}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // agenda-grid
  const cols = sections.length <= 4 ? 2 : 3;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {Head}
      <div
        style={{
          flex: 1, display: 'grid', gap: 32,
          gridTemplateColumns: `repeat(${cols}, 1fr)`, alignContent: 'start',
        }}
      >
        {sections.map((s, i) => (
          <div
            key={s.number}
            style={{
              background: c.paperTint, borderTop: `1px solid ${c.line}`, padding: '28px 28px',
              animation: `600ms ease-out ${250 + i * 150}ms both tk-fadeUp`,
            }}
          >
            <div style={{ fontFamily: f.display, fontSize: 48, color: c.accent }}>{s.number}</div>
            <div style={{ fontFamily: f.display, fontSize: 38, color: c.ink, marginTop: 10 }}>{s.title}</div>
            <div style={{ fontFamily: f.body, fontSize: 22, lineHeight: 1.5, color: c.inkSoft, marginTop: 10 }}>
              {s.descriptor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckContents;
