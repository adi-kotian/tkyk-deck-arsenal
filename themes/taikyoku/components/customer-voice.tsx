/**
 * customer-voice — Taikyoku component library (Phase 9, Session B Archetype 5)
 *
 * USE: a pullquote / customer testimonial — a Prata quote anchored to a
 * face or brand (portrait or logo).
 *
 * Canvas-agnostic CONTENT BLOCK — Page wraps it in a PaperCanvas.
 *
 * SLOTS: quote, name, role, company, logo (polymorphic ReactNode —
 *   a company logo OR a portrait image; one slot serves both),
 *   contextTag (rich only)
 * PROPS: density ('lean' | 'standard' | 'rich')
 *   - lean: quote + name
 *   - standard: + role + company
 *   - rich: + logo/portrait + contextTag
 * TYPE: `role` renders Prata *italic* (the person/attribution-role
 *   convention — Session B cross-cutting #1, widened Phase 8).
 * MOTION: quote tk-fadeUp; attribution tk-fadeIn (200ms after). ≤1.6s.
 */
import type { ReactNode } from 'react';

const c = {
  ink: 'var(--tk-ink,#0A0A0A)', inkSoft: 'var(--tk-ink-soft,#3F3F3F)', inkMuted: 'var(--tk-ink-muted,#6B6B6B)',
  accent: 'var(--tk-accent,#7030A0)', line: 'var(--tk-line,rgba(0,0,0,0.12))',
};
const f = {
  display: "'Prata', Georgia, serif",
  caps: "'Helvetica Neue', 'Inter', -apple-system, system-ui, sans-serif",
  body: "'Inter', -apple-system, system-ui, sans-serif",
};

export type CustomerVoiceProps = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  /** Company logo OR portrait — one polymorphic visual slot. */
  logo?: ReactNode;
  contextTag?: string;
  density?: 'lean' | 'standard' | 'rich';
};

export const CustomerVoice = ({
  quote, name, role, company, logo, contextTag, density = 'standard',
}: CustomerVoiceProps) => {
  const showRoleCompany = density !== 'lean';
  const showVisual = density === 'rich';

  return (
    <div
      style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', gap: 56,
      }}
    >
      <blockquote
        style={{
          margin: 0, fontFamily: f.display, fontWeight: 400, fontSize: 76,
          lineHeight: 1.18, letterSpacing: '-0.01em', color: c.ink, maxWidth: 1500,
          animation: '700ms ease-out both tk-fadeUp',
        }}
      >
        <span aria-hidden style={{ color: c.accent }}>“</span>
        {quote}
        <span aria-hidden style={{ color: c.accent }}>”</span>
      </blockquote>

      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 28,
          animation: '600ms ease-out 250ms both tk-fadeIn',
        }}
      >
        {showVisual && logo && (
          <div
            style={{
              flex: '0 0 auto', maxWidth: 200, maxHeight: 96,
              display: 'flex', alignItems: 'center',
              paddingRight: 28, borderRight: `1px solid ${c.line}`,
            }}
          >
            {logo}
          </div>
        )}
        <div>
          <div style={{ fontFamily: f.caps, fontSize: 26, fontWeight: 700, letterSpacing: '0.04em', color: c.ink }}>
            {name}
          </div>
          {showRoleCompany && (role || company) && (
            <div style={{ marginTop: 6, fontFamily: f.display, fontStyle: 'italic', fontSize: 26, color: c.inkSoft }}>
              {role}{role && company ? ', ' : ''}{company}
            </div>
          )}
          {showVisual && contextTag && (
            <div
              style={{
                marginTop: 10, fontFamily: f.caps, fontSize: 18, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: c.inkMuted,
              }}
            >
              {contextTag}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerVoice;
