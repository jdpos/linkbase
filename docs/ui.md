# Linkbase UI — Components & Patterns

Companion to `design-system.md`. Class names use the proposed Tailwind config there. Behaviour is taken from the React components in `components/` and the two UI kits (`ui_kits/app`, `ui_kits/marketing`). Anything not defined is **TBD**.

Global rules: icons are Lucide (stroke 1.75); all buttons/links/pills are `rounded-full`; copy is sentence case; no emoji.

---
## 1. Components

### Button
Pill action button. Sizes: `sm` 36px / 14px text / 16px side padding · `md` 48px / 16px / 24px · `lg` 56px / 17px / 28px. Font 600, gap 8px, icon optional left or right (16/18/20px). `fullWidth` option.

| Variant | Default | Hover | Classes (default) |
|---|---|---|---|
| primary | ink bg, white text | `#2E2B24` | `bg-ink text-white border border-ink hover:bg-ink-hover` |
| secondary | mist bg, ink text | line (`#E6E3DC`) | `bg-mist border-mist hover:bg-line` |
| outline | white bg, 1px strong border | paper | `bg-white border-line-strong hover:bg-paper` |
| accent | ember bg, ink text | ember-deep | `bg-ember text-ink hover:bg-ember-deep` |
| inverse | white bg, ink text (use on dark/colour blocks) | mist | `bg-white hover:bg-mist` |
| ghost | transparent | mist | `hover:bg-mist` |

States: **hover** colour above, 200ms · **pressed** `active:scale-[.97]` 120ms · **disabled** `opacity-40 cursor-not-allowed`, no hover/press · **focus-visible**: not implemented in kit; use `focus-visible:shadow-focus outline-none` (TBD, confirm with design) · **loading**: TBD.

```tsx
<Button icon="plus" fullWidth>Add</Button>
<Button variant="secondary" icon="folder-plus" fullWidth>New collection</Button>
```

### IconButton
Circle, default 44px (icon = 45% of size). Always requires an accessible label.
| Variant | Style |
|---|---|
| soft | `bg-mist` |
| white | `bg-white shadow-card` (profile corners) |
| solid | `bg-ink text-white` |
| ghost | transparent |
States: hover `brightness-95` 200ms · focus TBD · disabled TBD · pressed TBD. Sizes used: 32 (compact profile), 34, 36, 44.

### Icon
Lucide glyph by name, 20px default, stroke 1.75, `currentColor`, `aria-hidden`. Common: arrow-left, plus, share, more-vertical, layers, user-square, paintbrush, settings, list-checks, archive, folder-plus, sparkles, zap, sliders-horizontal, external-link, grip-vertical, chevron-down, x.

### Input
Filled field, 56px tall, `rounded-sm` (10px), `bg-mist`, 18px horizontal padding, text 16/500. Optional label (14/600, 8px above), optional static muted prefix (e.g. `linkba.se/`), helper or error text (13px) below.
| State | Style |
|---|---|
| default | no ring |
| focus | `ring-2 ring-inset ring-ink`, 120ms |
| error | `ring-2 ring-inset ring-danger`; message in `text-danger` |
| disabled | TBD |
| success | TBD |
Placeholder colour: TBD (kit uses browser default). Username filter in kit: lowercase `a–z 0–9 . _`, min 3 chars.

### Switch
52×32 track, 26px white knob (3px padding), `role="switch"` + `aria-checked`. Off: `bg-line-strong`. On: `bg-success`. Knob moves 20px with spring ease. Disabled: `opacity-40 cursor-not-allowed`. Focus: TBD. Controlled or uncontrolled.

### Tabs
Text tabs, gap 28px, 17px/500 (22px `lg`). Active: `text-ink` + 3px ink underline (inset). Inactive: `text-subtle`. `role="tablist"`/`tab`, `aria-selected`. Hover: TBD. Focus: TBD. Keyboard arrow navigation: TBD (not implemented).

### SideNavItem
Editor rail item: 56px circle icon (22px) over a 13px label.
| State | Style |
|---|---|
| default | `bg-mist`, label `text-secondary` 500 |
| hover | `bg-line` |
| active | `bg-ink text-white`, double ring (2px white gap + 2px ink), label `text-primary` 600 |
Rail items: Content (layers), Header (user-square), Design (paintbrush), Settings (settings).

### Banner
Full-width strip, min-height 52px, 15/500 text centred, optional action pill (34px tall, 1.5px border, zap icon, 14/600) and close button (right, 14px inset).
| Tone | Style |
|---|---|
| ink | `bg-ink text-white`; action pill ember outline/text |
| accent | `bg-ember text-ink`; action pill ink outline/text |

### Avatar
Circle, default 96px (104 on profile, 72 compact, 88 in editor). Fallbacks: image → initials (700, 36% of size) → person glyph, on `bg-line-strong` with white content. Optional 3px card-colour ring. Alt text = name.

### LinkButton (public profile link)
Full-width white pill, min-height 60px, padding `0 16px 0 8px`, centred 16/600 title, optional 44px circle thumb/icon at left, kebab (18px, 70% opacity) at right in a 44px slot so the title stays centred. Rendered as `<a>`.
| Theme | Style |
|---|---|
| white (default) | `bg-white text-ink shadow-card` |
| ink | `bg-ink text-white` |
| outline | transparent, 2px ink border |
| featured (`image` prop) | `rounded-lg` card, 10px padding, 16:9 image with `rounded-md`, centred 15/600 title below |
States: hover `-translate-y-px shadow-raised` · pressed `scale-[.98]` · focus TBD · visited TBD. Click tracking, thumbnails layout/long-title truncation (kit wraps): TBD.

### UrlPill
52px pill, 17/500, optional leading icon (default link), optional trailing icon button (share or x). `soft` = `bg-mist`; `white` = `bg-white shadow-raised`. Used in the editor top bar and the profile CTA.

### LinkRow (editor)
Bordered card: `rounded-lg`, `border border-line`, `bg-white`, padding 18/20/18/14. Left to right: drag grip (50% opacity, 100% on hover), 48px `rounded-sm` thumb or icon, title (17/600, single-line ellipsis) over meta (14, secondary: `{n} clicks · {domain}`), optional Switch, kebab button.
States: hover `shadow-raised` 200ms · dragging TBD · disabled link (switch off) visual treatment TBD · kebab menu contents TBD (kit simply deletes the row).

### Accordion (FAQ)
Stack of rows (gap 12px), `rounded-lg`, button full-width, padding 22/26, 17/600. Chevron rotates 180° on open (320ms). Answer 16px, 1.55 line height, 85% opacity, padding `0 26px 24px`. One open at a time. `aria-expanded` set.
| Tone | Style |
|---|---|
| dark | `bg-white/8 text-white` (on plum) |
| light | `bg-white text-ink` |
Answer panel has no height animation in the kit (TBD). Keyboard: native button.

---
## 2. Layout patterns

### Public profile
- Page bg `bg-backdrop`; centred column `max-w-profile` (580px) with `rounded-t-xl`, `bg-profile`, `shadow-phone`, 40px padding.
- Top corners: `IconButton white` left (brand mark; type-set placeholder, no logo) and Share right.
- Stack: Avatar (104) → handle (`font-display font-bold text-[30px]`) → optional bio (16, secondary, centred) → social icons (24px, gap 12) → links (gap 14) → flexible spacer → footer.
- Footer: "Make your own linkbase" white pill (48px, `shadow-raised`), then `Report · Privacy · Cookies` at 13px secondary.
- Bottom sign-up CTA: fixed to the column bottom, gradient from transparent to `rgba(22,20,15,.9)` over 80px+, white UrlPill with dismiss (x), white 15/500 line beneath.
- Desktop-only "View on mobile" QR code (bottom-right of the viewport in the reference): not built, **TBD**.

### Editor (dashboard)
- Page: `bg-ink` top strip with Banner, then `bg-page` surface with `rounded-t-[28px]`, padding 20/28/40.
- Top bar: 3-column grid — Back (ghost IconButton) · URL pill (white, share) centred · Enhance (secondary Button, sparkles) right.
- Body grid: `88px | minmax(0,640px) | 1fr`, gap 32, max 1320, aligned start.
  - **Rail:** SideNavItem column, gap 22, top padding 120.
  - **Content panel:** `bg-card rounded-xl shadow-raised` padding 36/40, vertical gap 24. Title row (h1 + 2 soft icon buttons: list-checks, archive) → Tabs (Links / Shop) → profile summary (Avatar 88, handle, social icons + add) → 2-col action row (Add primary lg, New collection secondary lg) → optional inline add-link form (bordered `rounded-lg`, Title + URL inputs, Cancel ghost / Save link primary) → LinkRow list (gap 14) → 1px divider → "Linkbase footer" card (title, Pro zap badge, Switch, wordmark).
  - **Preview:** sticky (top 20) 340×680 phone, `rounded-[40px]`, 8px white border, `shadow-phone`, rendering the compact profile; beside it a small vertical white tool bar (sliders-horizontal, external-link).
- Header / Design / Settings views: **TBD** (no reference).
- Shop tab content: **TBD**.

### Welcome / claim username
- Two columns, full viewport height. Left (white): wordmark top-left (30px), vertically centred form column max 460px: H1 (`text-[48px]` display 800), helper line, Input with `linkba.se/` prefix, legal note (13px, secondary), Continue (primary lg, full width, disabled when invalid), login link.
- Right: `bg-ember` panel with a tilted (−3°) profile mock card (`shadow-phone`, 320px) and a tilted (+4°) white URL pill overlapping its top-left; photo placeholder bottom-right. Real photography: **TBD**.

### Marketing homepage
- Sticky floating nav: `rounded-full bg-white shadow-raised`, 76px tall, max 1320, 16px from top, overlapping the hero (hero has −92px top margin). Items: wordmark, Product, Templates, Marketplace, Learn, Pricing (16/500 secondary), Log in (secondary), Sign up free (primary). Dismissible ink Banner above.
- Blocks, in order: Hero (ember) · Customize (pine) · Share (sky) · Analytics (butter) · Quote (paper) · FAQ (plum) · Closing CTA + footer (ink).
- Block anatomy: full-bleed colour, `py-[120px] px-12`, inner `max-w-[1240px]` two-column grid gap 64, items centred. Headline `display-l`, 19px body (max 520px), one Button (lg).
- Claim field (hero + closing CTA): 56px white `rounded-xl`(12px in kit) input with `linkba.se/` prefix + lg Button.
- Footer: white `rounded-xl` card, p-12, 4 link columns (Company, Community, Support, Legal; headings 20px display, links 15px secondary), bottom row wordmark + solid IconButtons for social links.
- Collage mockups rotate ±3–4° and overlap. Metric tiles (Analytics) are `rounded-lg` p-6 min-h-160 with a 48px display number.
- Responsive behaviour: **TBD**.

### Wordmark
Type only: `font-display font-extrabold lowercase tracking-wordmark`. Real logo: **TBD**.

---
## 3. Accessibility

Defined in the kit:
- Switch: `role="switch"`, `aria-checked`, label via `aria-label`.
- Tabs: `role="tablist"` / `role="tab"`, `aria-selected`.
- Accordion: `aria-expanded` on the trigger button.
- IconButton: `aria-label` + `title`; Banner close has `aria-label="Dismiss"`.
- Icons are `aria-hidden`; Avatar uses name as `alt`.
- Focus token `--ring-focus` (2px white gap + 2px ink) exists; inputs show a 2px ink ring on focus.

Recommendations for the build (verify against design):
- Apply `focus-visible:shadow-focus outline-none` to every interactive element, including LinkButton, IconButton, SideNavItem, Tabs. Not implemented in the kit.
- Tabs: add roving tabindex, arrow-key navigation, `aria-controls`/`tabpanel`.
- Accordion: add `aria-controls` + `role="region"` on answers.
- Link rows' kebab needs `aria-haspopup="menu"` once the menu exists (menu design TBD). Drag reorder needs a keyboard alternative (TBD).
- Error text should be tied to its input with `aria-describedby` and `aria-invalid`.
- Profile kebab on public links is decorative in the reference; confirm if it opens a menu (TBD).
- Touch targets: buttons are ≥36px (`sm`) and IconButtons 32–44px; use ≥44px on mobile (public profile links are 60px, fine). Smaller sizes (32/34/36) should be reviewed.
- Contrast, measured from tokens: ink on paper/white/mist and white on ink pass AA comfortably. `text-secondary` (#6E6A60) on white is ≈5.3:1 (passes AA for body). `text-subtle` (#9A968C) on white is ≈2.9:1 and **fails** AA for text. It's used for inactive tab labels, so treat as TBD for design review. Ink on ember (`#FF5B2E`) passes. White text on ember does **not** — keep ink on ember.
- Reduced motion: **TBD** (recommend `motion-reduce:transition-none motion-reduce:transform-none`).
- Public profile page title, landmarks and language: **TBD**.
