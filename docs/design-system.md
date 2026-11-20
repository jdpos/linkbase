# Linkbase Design System — Foundations

Source of truth: `tokens/*.css` in the design-system project. Values below are copied from there. Tailwind class names are **proposed** (the kit ships CSS variables, not a Tailwind config); wire them up with the config in §9.

Anything the system does not define is marked **TBD**.

## 1. Colors

### Brand
| Token | Hex | Tailwind class | Use |
|---|---|---|---|
| `--lb-ember` | `#FF5B2E` | `bg-ember` `text-ember` | Accent, marketing hero/CTA |
| `--lb-ember-deep` | `#D9431A` | `bg-ember-deep` | Accent hover |
| `--lb-ember-soft` | `#FFE1D6` | `bg-ember-soft` | Accent tint |
| `--lb-pine` | `#0F3D3A` | `bg-pine` | Marketing block |
| `--lb-pine-2` | `#1D5C55` | `bg-pine-2` | Pine secondary |
| `--lb-sky` | `#C6DDF5` | `bg-sky` | Marketing block |
| `--lb-butter` | `#F3E3A1` | `bg-butter` | Marketing block |
| `--lb-plum` | `#3B1D3A` | `bg-plum` | Marketing block (FAQ) |
| `--lb-rose` | `#F6C9D2` | `bg-rose` | Text on plum |

### Neutrals (warm)
| Token | Hex | Tailwind class |
|---|---|---|
| `--lb-ink` | `#16140F` | `bg-ink` `text-ink` |
| `--lb-ink-2` | `#3D3A33` | `text-ink-2` |
| `--lb-muted` | `#6E6A60` | `text-muted` |
| `--lb-subtle` | `#9A968C` | `text-subtle` |
| `--lb-line-strong` | `#D3CFC6` | `border-line-strong` |
| `--lb-line` | `#E6E3DC` | `border-line` |
| `--lb-mist` | `#ECEAE5` | `bg-mist` |
| `--lb-paper` | `#F6F4EF` | `bg-paper` |
| `--lb-white` | `#FFFFFF` | `bg-white` |
| `--surface-backdrop` | `#A9A69F` | `bg-backdrop` (public-profile page background) |
| hover ink | `#2E2B24` | `bg-ink-hover` (primary button hover; hard-coded in Button) |

### Semantic
| Token | Hex | Tailwind class |
|---|---|---|
| `--lb-success` | `#1F8A5B` | `bg-success` (also switch "on") |
| `--lb-success-soft` | `#D6EFE2` | `bg-success-soft` |
| `--lb-danger` | `#D23B2B` | `text-danger` `ring-danger` |
| `--lb-danger-soft` | `#FADBD7` | `bg-danger-soft` |
| `--lb-warning` | `#E8A317` | `bg-warning` |
| `--lb-warning-soft` | `#FBEBC6` | `bg-warning-soft` |

### Semantic aliases (prefer these in app code)
| Alias | Resolves to | Tailwind |
|---|---|---|
| `--surface-page` | paper | `bg-page` |
| `--surface-card` | white | `bg-card` |
| `--surface-sunken` | mist | `bg-sunken` |
| `--surface-inverse` | ink | `bg-inverse` |
| `--surface-profile` | mist | `bg-profile` |
| `--text-primary` | ink | `text-primary` |
| `--text-secondary` | muted | `text-secondary` |
| `--text-subtle` | subtle | `text-subtle` |
| `--text-inverse` | white | `text-inverse` |
| `--border-default` | line | `border-default` |
| `--border-strong` | line-strong | `border-strong` |
| `--border-focus` | ink | `ring-ink` |
| `--accent` / `-hover` / `-soft` / `-fg` | ember / ember-deep / ember-soft / ink | `bg-accent` `bg-accent-hover` `bg-accent-soft` `text-accent-fg` |
| `--toggle-on` | success | `bg-success` |

### Block pairings (marketing sections)
| Background | Text |
|---|---|
| ember | ink |
| pine | butter (headline), white (body) |
| sky | pine |
| butter | pine (headline), ink (body) |
| plum | rose (headline), white (rows) |
| paper | ink |
| ink | ember (headline) |

Dark mode: **TBD** (not defined).

## 2. Typography

| Role | Family | Tailwind |
|---|---|---|
| Display / headings | Bricolage Grotesque (Google Fonts, opsz 12–96, weights 400–800) | `font-display` |
| UI / body | DM Sans (opsz 9–40, weights 400–700) | `font-sans` |
| Mono | **TBD** | — |

Both are Google Fonts substitutes (no brand font files supplied). In Next.js use `next/font/google` and expose them as CSS variables `--font-display` and `--font-body`.

### Scale
| Token | Size | Tailwind | Typical use |
|---|---|---|---|
| `--fs-display-xl` | 72px | `text-display-xl` | Marketing hero (kit uses 88px in the hero; see note) |
| `--fs-display-l` | 56px | `text-display-l` | Section headlines |
| `--fs-display-m` | 40px | `text-display-m` | Quote, sub-headlines |
| `--fs-h1` | 32px | `text-h1` | Editor panel title |
| `--fs-h2` | 24px | `text-h2` | |
| `--fs-h3` | 20px | `text-h3` | Card titles, username |
| `--fs-body-l` | 18px | `text-body-l` | Intro copy |
| `--fs-body` | 16px | `text-base` | Default |
| `--fs-body-s` | 14px | `text-sm` | Meta ("0 clicks · udemy.com") |
| `--fs-caption` | 12px | `text-xs` | Footer links |

Note: the marketing hero H1 is 88px/0.98 in the UI kit, which is outside the token scale. Treat as a one-off (`text-[88px]`) or add `display-2xl`. Decision: **TBD**.

### Weights, line height, tracking
| Token | Value | Tailwind |
|---|---|---|
| weights | 400 / 500 / 600 / 700 / 800 | `font-normal` `font-medium` `font-semibold` `font-bold` `font-extrabold` |
| `--lh-tight` | 1.02 | `leading-tight-display` |
| `--lh-snug` | 1.15 | `leading-snug` (default 1.375; override) |
| `--lh-body` | 1.5 | `leading-normal` |
| `--tracking-display` | −0.035em | `tracking-display` |
| `--tracking-heading` | −0.02em | `tracking-heading` |
| wordmark tracking | −0.04em | `tracking-wordmark` |

### Recipes
| Element | Classes |
|---|---|
| Marketing headline | `font-display font-extrabold text-display-l tracking-display leading-tight-display text-balance` |
| In-app title | `font-display font-bold text-h1 tracking-heading` |
| Profile handle | `font-display font-bold text-[30px] tracking-heading` (20px in compact preview) |
| Button label | `font-sans font-semibold text-base` (14px sm, 17px lg) |
| Meta | `text-sm text-secondary` |
| Wordmark | `font-display font-extrabold tracking-wordmark lowercase` (type-only, no logo supplied) |

## 3. Spacing
4px-based scale. All steps match Tailwind's default spacing keys, so no config is needed.

| Token | px | Tailwind |
|---|---|---|
| `--space-1` | 2 | `0.5` |
| `--space-2` | 4 | `1` |
| `--space-3` | 8 | `2` |
| `--space-4` | 12 | `3` |
| `--space-5` | 16 | `4` |
| `--space-6` | 20 | `5` |
| `--space-7` | 24 | `6` |
| `--space-8` | 32 | `8` |
| `--space-9` | 40 | `10` |
| `--space-10` | 48 | `12` |
| `--space-11` | 64 | `16` |
| `--space-12` | 96 | `24` |

### Sizing tokens
| Token | Value | Tailwind |
|---|---|---|
| `--control-h-sm` | 36px | `h-9` |
| `--control-h-md` | 48px | `h-12` |
| `--control-h-lg` | 56px | `h-14` |
| `--link-h` | 60px | `min-h-[60px]` (`min-h-link`) |
| `--profile-max` | 580px | `max-w-profile` |
| `--editor-max` | 640px | `max-w-editor` |

### In-use values (from the kit)
- Profile link stack: gap 12–14px (`gap-3`/`gap-3.5`), rows 60px.
- Profile page padding: 40px (compact preview 14px).
- Editor panel padding: 36px 40px; section gap 24px.
- Marketing blocks: 120px vertical, 48px horizontal padding; content max 1240px; two-column gap 64px.

## 4. Radius
| Token | px | Tailwind |
|---|---|---|
| `--radius-xs` | 6 | `rounded-xs` |
| `--radius-sm` | 10 | `rounded-sm` (inputs, thumbnails) |
| `--radius-md` | 16 | `rounded-md` (featured-link image) |
| `--radius-lg` | 24 | `rounded-lg` (link rows, FAQ rows, cards) |
| `--radius-xl` | 32 | `rounded-xl` (editor panel, profile card, footer card) |
| `--radius-pill` | 999 | `rounded-full` (all buttons, link pills, URL pills, nav) |

Note: these override Tailwind's default `rounded-*` scale; see §9.

## 5. Shadows
| Token | Value | Tailwind | Use |
|---|---|---|---|
| `--shadow-card` | `0 1px 2px rgba(22,20,15,.06)` | `shadow-card` | Profile links, white icon buttons |
| `--shadow-raised` | `0 2px 4px rgba(22,20,15,.04), 0 10px 28px -10px rgba(22,20,15,.18)` | `shadow-raised` | Editor panel, floating nav, hovered cards, URL pill (white) |
| `--shadow-phone` | `0 30px 70px -24px rgba(22,20,15,.35)` | `shadow-phone` | Phone previews, profile card, hero mockups |
| `--ring-focus` | `0 0 0 2px #fff, 0 0 0 4px #16140F` | `focus-visible:shadow-focus` | Focus ring |

No inner shadows. Elevation beyond these three: **TBD**.

### Borders
- Card outline / divider: `1px` `border-line`.
- Outline button: `1px` `border-line-strong`.
- Outline link theme: `2px` `border-ink`.
- Input focus: 2px ink inset ring (`ring-2 ring-inset ring-ink`); error: 2px danger inset.

## 6. Breakpoints
**TBD.** The system defines no breakpoints; the kit is desktop-first at fixed widths and has no responsive rules.

Known fixed widths to design around:
| Surface | Width |
|---|---|
| Public profile column | max 580px, centred |
| Editor content panel | max 640px |
| Editor phone preview | 340px (8px white border, 40px radius) |
| Marketing content | max 1240px (nav 1320px) |

Until defined, use Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`) and flag any layout decision for design review. Mobile behaviour of the editor and marketing nav: **TBD**. The public profile is a single column and is expected to work at mobile widths.

## 7. Motion
| Token | Value | Tailwind |
|---|---|---|
| `--dur-fast` | 120ms | `duration-fast` |
| `--dur-base` | 200ms | `duration-base` |
| `--dur-slow` | 320ms | `duration-slow` |
| `--ease-out` | `cubic-bezier(.2,.8,.2,1)` | `ease-out-soft` |
| `--ease-spring` | `cubic-bezier(.34,1.56,.64,1)` | `ease-spring` |
| `--press-scale` | .97 | `active:scale-[.97]` |

| Interaction | Spec |
|---|---|
| Button press | scale .97, 120ms ease-out |
| Profile link press | scale .98, 120ms |
| Profile link hover | translateY(−1px) + `shadow-raised`, 200ms |
| Fill / colour changes | 200ms ease-out |
| Switch knob | translateX 20px, 200ms `ease-spring`; track colour 200ms |
| Accordion chevron | rotate 180°, 320ms ease-out |
| Input focus ring | 120ms |
| Sheets / menus | 320ms, fade + 8px rise (stated intent; not implemented in kit) |

Page transitions, skeleton/loading, drag-reorder animation, `prefers-reduced-motion` handling: **TBD** (recommend disabling transforms under reduced motion).

## 8. Iconography
Lucide outline icons, stroke **1.75**, round caps/joins. Default 20px; 22px in the editor rail; 16–18px in small buttons. In Next.js use `lucide-react` with `strokeWidth={1.75}`. Brand/social glyphs are Lucide outline versions; official coloured platform logos: **TBD**. No emoji.

## 9. Tailwind config (proposed)
```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ember: { DEFAULT: '#FF5B2E', deep: '#D9431A', soft: '#FFE1D6' },
        pine: { DEFAULT: '#0F3D3A', 2: '#1D5C55' },
        sky: '#C6DDF5', butter: '#F3E3A1', plum: '#3B1D3A', rose: '#F6C9D2',
        ink: { DEFAULT: '#16140F', 2: '#3D3A33', hover: '#2E2B24' },
        muted: '#6E6A60', subtle: '#9A968C',
        line: { DEFAULT: '#E6E3DC', strong: '#D3CFC6' },
        mist: '#ECEAE5', paper: '#F6F4EF', backdrop: '#A9A69F',
        success: { DEFAULT: '#1F8A5B', soft: '#D6EFE2' },
        danger: { DEFAULT: '#D23B2B', soft: '#FADBD7' },
        warning: { DEFAULT: '#E8A317', soft: '#FBEBC6' },
        page: '#F6F4EF', card: '#FFFFFF', sunken: '#ECEAE5', inverse: '#16140F', profile: '#ECEAE5',
        primary: '#16140F', secondary: '#6E6A60',
        accent: { DEFAULT: '#FF5B2E', hover: '#D9431A', soft: '#FFE1D6', fg: '#16140F' },
      },
      borderColor: { default: '#E6E3DC', strong: '#D3CFC6' },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['72px', '1.02'], 'display-l': ['56px', '1.02'], 'display-m': ['40px', '1.15'],
        h1: ['32px', '1.15'], h2: ['24px', '1.15'], h3: ['20px', '1.15'], 'body-l': ['18px', '1.5'],
      },
      letterSpacing: { display: '-0.035em', heading: '-0.02em', wordmark: '-0.04em' },
      lineHeight: { 'tight-display': '1.02' },
      borderRadius: { xs: '6px', sm: '10px', md: '16px', lg: '24px', xl: '32px' },
      boxShadow: {
        card: '0 1px 2px rgba(22,20,15,.06)',
        raised: '0 2px 4px rgba(22,20,15,.04), 0 10px 28px -10px rgba(22,20,15,.18)',
        phone: '0 30px 70px -24px rgba(22,20,15,.35)',
        focus: '0 0 0 2px #fff, 0 0 0 4px #16140F',
      },
      maxWidth: { profile: '580px', editor: '640px' },
      minHeight: { link: '60px' },
      transitionDuration: { fast: '120ms', base: '200ms', slow: '320ms' },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(.2,.8,.2,1)', spring: 'cubic-bezier(.34,1.56,.64,1)',
      },
    },
  },
} satisfies Config;
```
