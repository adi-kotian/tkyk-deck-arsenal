---
name: Taikyoku
description: Light editorial deck — cool→warm gradient on cover and section, paper-white content slides, Prata headlines, Archivo caps, single purple accent with gold as a one-moment hot. Synthesis of Aurora's structural restraint and a Stripe/Linear product-launch register.
---

# Taikyoku

The visual identity is a **two-canvas** deck. Cover and section dividers
carry the signature cool→warm gradient. Content slides drop to paper
white. Across both canvases, one purple accent, one gold "hot" reserved
for a single moment per deck, and motion that's considered but not
austere.

Reads like a Stripe or Linear product-launch deck rendered in McKinsey
ink — sharp, confident, with one moment of visual delight per page.

## Palette

| Role               | Value                          | Notes                                                       |
| ------------------ | ------------------------------ | ----------------------------------------------------------- |
| bg-gradient-cool   | `#A6C9EB`                      | gradient cool stop (12% on cover and section)               |
| bg-gradient-warm   | `#FFE9BF`                      | gradient warm stop (100%)                                   |
| bg-gradient-angle  | `330deg`                       | the diagonal — never rotate                                 |
| paper              | `#FFFFFF`                      | content slide background                                    |
| paper-tint         | `#F4F7FB`                      | optional cool-tinted alternative for content cards          |
| ink                | `#0A0A0A`                      | body & display text (slightly off-pure black, softer)       |
| ink-soft           | `#3F3F3F`                      | de-emphasised runs, secondary headers                       |
| ink-muted          | `#6B6B6B`                      | folios, captions, eyebrow meta                              |
| ink-faint          | `#AFAFAF`                      | separators, deemphasised labels                             |
| accent             | `#7030A0`                      | purple — load-bearing single accent (eyebrow dot, AccentRule, hot spans inside headlines, SVG strokes) |
| accent-hot         | `#FFE1A4`                      | gold — reserved. One moment per deck, never more            |
| line               | `rgba(0,0,0,0.12)`             | hairline borders                                            |
| rule               | `rgba(0,0,0,0.40)`             | hero horizontal rule under titles                           |

## Typography

- Display font: `'Prata', Georgia, 'Times New Roman', serif` — weight 400. Editorial seriousness; the only thing that breathes.
- Eyebrow / caps / folio font: `'Archivo', -apple-system, BlinkMacSystemFont, system-ui, sans-serif` — weights 700 and 900.
- Body font: `'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif` — weight 500 for prose, 700 for emphasis.
- Mono font: `'JetBrains Mono', 'SF Mono', 'Menlo', monospace` — for `1920 × 1080` callouts and any inline counter.

Source via Google Fonts (`Prata`, `Archivo:wght@400;700;900`, `Inter:wght@400;500;700`, `JetBrains+Mono:wght@500;700`) — see Example usage below.

### Type scale (1920 × 1080 canvas)

| Element              | Size      | Weight  | Line  | Tracking      | Notes                          |
| -------------------- | --------- | ------- | ----- | ------------- | ------------------------------ |
| Hero title           | 168 px    | 400 Prata | 0.96 | -0.03em       | cover only                     |
| Page heading (h2)    | 88–104 px | 400 Prata | 1.02 | -0.02em       | content pages                  |
| Section number       | 144 px    | 400 Prata | 1.0  | -0.02em       | section divider only           |
| Card title           | 60 px     | 900 Archivo | 1.02 | -0.015em     | inside card / column           |
| Eyebrow              | 22 px     | 700 Archivo | 1.0 | 0.22em        | tracked caps, uppercase        |
| Eyebrow meta         | 20 px     | 500 Archivo | 1.0 | 0.16em        | the right-side run             |
| Body lead            | 32–36 px  | 500 Inter | 1.4–1.5 | normal      | the paragraph under a heading  |
| Body                 | 26–28 px  | 500 Inter | 1.55 | normal        | card body, content prose       |
| Folio                | 20 px     | 700 Archivo | 1.0 | 0.16em        | bottom strip, section name     |
| Counter (mono)       | 20 px     | 700 JetBrains Mono | 1.0 | 0.02em | page X / Y, tabular-nums       |

## Layout

- Content padding: **100 px** all sides. Never break this without a reason.
- Cover / section divider: gradient background, no top eyebrow strip, no bottom folio. The page is the moment.
- Content pages: paper-white background, top eyebrow strip with `border-bottom: 1px solid ink` and `padding-bottom: 18px`, bottom folio strip with `border-top: 1px solid ink` and `padding-top: 18px`, both running edge-to-edge of the 100px content area.
- One **AccentRule** per page maximum — the scaling-in horizontal underline beneath the hero or eyebrow. Two AccentRules on a page reads as decoration; one reads as composition.
- Hairline borders (`line` token) for cards' top edges; never drop shadows. The Aurora discipline of "structure carries the look, not decoration" applies.
- Cover may carry **one** subtle radial glow in `accent` at low opacity, blurred ~80px, off-centre, animating via `tk-breath`. Never on content pages.
- Gold (`accent-hot`) gets used **once per deck**. Pick the page where the eye most needs to land — usually the closer's headline or a single cover element. Don't repeat.

## Fixed components

These five are the load-bearing primitives. Every page is built from them.

### GradientCanvas

```tsx
const GradientCanvas = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(330deg, #A6C9EB 12%, #FFE9BF 100%)',
      color: '#0A0A0A',
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: 100,
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);
```

### PaperCanvas

```tsx
const PaperCanvas = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: '#FFFFFF',
      color: '#0A0A0A',
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: 100,
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);
```

### Eyebrow (top content-page strip)

```tsx
const Eyebrow = ({ label, meta }: { label: string; meta?: string[] }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottom: '1px solid #0A0A0A',
      paddingBottom: 18,
      fontFamily: "'Archivo', system-ui, sans-serif",
      fontSize: 22,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      animation: '600ms ease-out both tk-fadeUp',
    }}
  >
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: '#0A0A0A' }}>
      <span aria-hidden style={{ width: 12, height: 12, background: '#7030A0', display: 'inline-block' }} />
      <span style={{ fontWeight: 700 }}>{label}</span>
    </span>
    {meta && (
      <span style={{ display: 'inline-flex', gap: 32, color: '#6B6B6B', fontWeight: 500, fontSize: 20, letterSpacing: '0.16em' }}>
        {meta.map((m, i) => <span key={i}>{m}</span>)}
      </span>
    )}
  </div>
);
```

### AccentRule (scaling underline)

```tsx
const AccentRule = ({ width = 320, delay = 0 }: { width?: number; delay?: number }) => (
  <div
    aria-hidden
    style={{
      width,
      height: 6,
      background: '#7030A0',
      transformOrigin: 'left center',
      animation: `700ms cubic-bezier(0.7, 0, 0.2, 1) ${delay}ms both tk-grow`,
    }}
  />
);
```

### Folio (bottom content-page strip)

```tsx
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
      fontFamily: "'Archivo', system-ui, sans-serif",
      fontSize: 20,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      borderTop: '1px solid #0A0A0A',
      paddingTop: 18,
    }}
  >
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: '#0A0A0A' }}>
      <span aria-hidden style={{ width: 8, height: 8, background: '#7030A0', display: 'inline-block' }} />
      <span style={{ fontWeight: 700 }}>{section}</span>
      <span style={{ color: '#6B6B6B', margin: '0 4px' }}>/</span>
      <span style={{ color: '#6B6B6B', fontWeight: 500 }}>taikyoku</span>
    </span>
    <span
      style={{
        fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 700,
        color: '#0A0A0A',
      }}
    >
      {String(page).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  </div>
);
```

## Motion

Philosophy: **considered, not austere**. A subset of the deck-arsenal-intro
vocabulary plus one Aurora-style breath. Every motion choice should pass the
filter "would this read well on a Stripe launch page rendered in serif?"

### Keyframes (drop into a per-slide `<style>` or a top-level CSS import)

```css
@keyframes tk-fadeUp {
  0%   { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes tk-fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes tk-grow {
  0%   { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}
@keyframes tk-rise {
  0%   { opacity: 0; transform: translateY(28px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes tk-draw {
  100% { stroke-dashoffset: 0; }
}
@keyframes tk-breath {
  0%, 100% { transform: scale(1.0); }
  50%      { transform: scale(1.02); }
}
```

### Rules

- **`tk-fadeUp`** is the universal entrance. 600ms ease-out. Stagger siblings by **200ms** (eyebrow → title → subtitle → callout). Within a card grid, stagger by **150ms**.
- **`tk-fadeIn`** for opacity-only reveals (folio counter, tertiary metadata). 400–600ms.
- **`tk-grow`** for AccentRules and any horizontal stroke that should feel intentional. `cubic-bezier(0.7, 0, 0.2, 1)`. 600–800ms.
- **`tk-rise`** for cards entering. `cubic-bezier(0.2, 0.7, 0.3, 1)`. 600ms. Stagger 150ms.
- **`tk-draw`** for SVG strokes — the workflow stage indicator, any chart, any line illustration. 800ms ease-out.
- **`tk-breath`** runs only on the cover's gradient (or a single radial glow element on the cover). 8s, infinite, `ease-in-out`. Nowhere else.

### Stagger budget

- No reveal lasts longer than **800ms**.
- A page may have at most **one** long motion (`tk-breath`, `tk-draw`) and the rest are 600ms-or-less fades.
- Total motion duration on any page should land within **1.6s** from first paint to settled.

### Explicitly forbidden

These belong in a different theme — they don't fit this register.

- Typewriter clip-path reveals (`da-typeIn` from deck-arsenal-intro)
- Blinking carets (`da-blink`)
- Looping traveling-dot indicators (`da-tick5`)
- Progress-bar fills (`da-barFill`)
- Bounce / spring easings
- 3D transforms, slide-in-from-edge, zoom-on-enter

## Aesthetic

Two canvases, one accent, restrained motion. The cover commits to the
Taikyoku gradient as the brand handshake; content slides drop to white
and let the structure (eyebrow strip, hero rule, folio) do the holding.
Prata gives the headlines an editorial register that wouldn't be out of
place on a magazine cover; Archivo handles all the caps work; Inter
handles the prose. Purple is the only accent that does work — eyebrow
dots, scaling underlines, the highlighted span inside a headline. Gold
is rationed to one moment per deck. Motion is sequenced, not staged:
fade-up with 200ms stagger, a single scale-in accent rule, one SVG
line-draw per beat at most. Avoid: typewriter, blinking caret,
traveling dots, marching ants, progress bars, any spring or bounce
easing, decorative emoji, photographic icons, 3D transforms. If a page
could be a frame from a print magazine where the typography is doing
most of the work, it is on theme.

## Example usage

```tsx
import type { Page, SlideMeta } from '@open-slide/core';

// In a real slide, drop this <style> block at the top of the file
// (after imports) — open-slide injects it into the page scope.
const styles = `
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;900&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@500;700&family=Prata&display=swap");
@keyframes tk-fadeUp { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes tk-grow { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
@keyframes tk-breath { 0%, 100% { transform: scale(1.0); } 50% { transform: scale(1.02); } }
`;

const Cover: Page = () => (
  <>
    <style>{styles}</style>
    <div
      style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(330deg, #A6C9EB 12%, #FFE9BF 100%)',
        color: '#0A0A0A',
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: 100,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        animation: '8s ease-in-out infinite tk-breath',
        transformOrigin: 'center center',
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        fontFamily: "'Archivo', system-ui, sans-serif", fontSize: 22,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        animation: '600ms ease-out both tk-fadeUp',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <span aria-hidden style={{ width: 12, height: 12, background: '#7030A0', display: 'inline-block' }} />
          <span style={{ fontWeight: 700 }}>Taikyoku</span>
        </span>
        <span style={{ color: '#6B6B6B', fontWeight: 500, fontSize: 20, letterSpacing: '0.16em' }}>
          internal · 2026 · 05
        </span>
      </div>

      <div style={{ marginTop: 96 }}>
        <h1 style={{
          fontFamily: "'Prata', Georgia, serif",
          fontSize: 168, fontWeight: 400, lineHeight: 0.96, letterSpacing: '-0.03em',
          margin: 0, color: '#0A0A0A',
          animation: '700ms ease-out 200ms both tk-fadeUp',
        }}>
          Editorial<br />composition.
        </h1>
      </div>

      <div aria-hidden style={{
        width: 320, height: 6, background: '#7030A0',
        marginTop: 48,
        transformOrigin: 'left center',
        animation: '700ms cubic-bezier(0.7, 0, 0.2, 1) 700ms both tk-grow',
      }} />

      <p style={{
        marginTop: 32, fontSize: 36, lineHeight: 1.4, color: '#0A0A0A',
        fontWeight: 500, maxWidth: 1200,
        animation: '600ms ease-out 1000ms both tk-fadeUp',
      }}>
        Cool→warm gradient on cover, paper-white content, one purple accent,
        one moment of gold per deck.
      </p>
    </div>
  </>
);

export const meta: SlideMeta = { title: 'Taikyoku — example', theme: 'taikyoku' };
export default [Cover];
```

## Asset attribution

Fonts via Google Fonts at runtime — no bundled webfonts in v1.
Logos and the `Branding/TKYK Logos/*.svg` family are deliberately not
referenced. If a future deck wants them, they belong in
`Projects/<slug>/assets/`, not in the theme. Theme stays brand-light by
design — colour and type carry the identity; logos are a per-deck
concern.
