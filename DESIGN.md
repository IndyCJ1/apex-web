---
name: Lanier Web
description: Modern websites for local businesses in Gainesville, GA
colors:
  ember: "#FF4500"
  ember-dark: "#CC3700"
  ember-light: "#FFF0EB"
  surface: "#FFFFFF"
  surface-off: "#F7F7F7"
  ink: "#0D0D0D"
  ink-deep: "#1A1A1A"
  muted: "#737373"
  faint: "#A3A3A3"
  border: "#E5E5E5"
typography:
  display:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "normal"
  headline:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.2em"
rounded:
  full: "9999px"
  2xl: "1rem"
  xl: "0.75rem"
spacing:
  section: "96px"
  card: "32px"
  input-x: "16px"
  input-y: "12px"
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.ember-dark}"
  button-secondary:
    backgroundColor: "{colors.surface-off}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-secondary-hover:
    backgroundColor: "{colors.border}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-dark-hover:
    backgroundColor: "{colors.ember}"
  card-service:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.card}"
  card-pricing-featured:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.card}"
  input:
    backgroundColor: "{colors.surface-off}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
  input-focus:
    backgroundColor: "{colors.surface-off}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
---

# Design System: Lanier Web

## 1. Overview

**Creative North Star: "The Local Authority"**

Lanier Web's design system is built around one premise: the site itself is the most powerful sales tool in the business. A small-business owner opens lanierweb.com, sees precise typography, purposeful spacing, and a single strong accent used with restraint, and the argument for hiring Lanier Web is made before they read a word. The system communicates authority through what it doesn't do: no stock-photo hero, no gradient blob, no decorative card grid, no startup shimmer.

The aesthetic is the best-run business on the block — clean storefront, clear signage, nothing to prove. White is the default. Ink anchors structure. Ember fires sparingly, only where attention is genuinely required. The result feels settled, local, and competent — not hungry. A prospect from a BBQ restaurant or HVAC company sees a site that looks like it was built by someone who understands their world, not someone pitching Series A SaaS.

This system explicitly rejects the SaaS/Webflow showcase lane: dark backgrounds, glowing cards, gradient blobs, neon CTAs. That aesthetic signals "I build for tech startups." Lanier Web builds for restaurants, gyms, HVAC companies, and barbers. The design makes that obvious.

**Key Characteristics:**
- Single typeface: Plus Jakarta Sans across every weight. No decorative type, no serifs.
- One accent: Ember (#FF4500), used at under 10% of any given surface. Rarity is the authority.
- Flat by default: shadows appear only on hover or as structural emphasis on a single featured element.
- White and off-white alternate between sections for rhythm without palette noise.
- Pill-shaped buttons throughout: confident, current, consistent.

## 2. Colors: The Ember Palette

A near-monochromatic neutral palette anchored by one signal color that earns every appearance.

### Primary
- **Ember** (#FF4500): The single accent. CTAs, section eyebrow labels, checkmarks, the logo dot, hover states, active inputs. Never decorative — only functional. OKLCH canonical: `oklch(61% 0.24 39)`.
- **Ember Dark** (#CC3700): Hover and active state of the primary button. Not used in any other context. OKLCH: `oklch(52% 0.22 39)`.
- **Ember Light** (#FFF0EB): Tinted background for the status availability badge. Never used for large surface areas. OKLCH: `oklch(96% 0.02 39)`.

### Neutral
- **Surface** (#FFFFFF): Primary page background. Nav, contact section, footer, service cards. When extending the system, prefer `oklch(99.5% 0.004 39)` for a barely perceptible Ember tint rather than pure white.
- **Surface Off** (#F7F7F7): Alternate section background. Services section, Work section, input fields, secondary button. Provides section rhythm without introducing a second hue. OKLCH: `oklch(97.5% 0 0)`.
- **Ink** (#0D0D0D): Primary text and the featured pricing card background. OKLCH: `oklch(8% 0 0)`.
- **Ink Deep** (#1A1A1A): About section dark background — slightly lighter than Ink, perceptible only at large surface area. OKLCH: `oklch(12% 0 0)`.
- **Muted** (#737373): Secondary text, nav links at rest, descriptor copy. OKLCH: `oklch(49% 0 0)`.
- **Faint** (#A3A3A3): Tertiary text — placeholders, pricing suffixes, small metadata. OKLCH: `oklch(67% 0 0)`.
- **Border** (#E5E5E5): All dividers, card outlines, nav separator. OKLCH: `oklch(91% 0 0)`.

### Named Rules
**The One Voice Rule.** Ember appears on 10% or less of any screen at any time. Its rarity is its authority. If a second element on the same view is asking for Ember, the first instance probably shouldn't have it.

**The No-Decoration Rule.** No color is used for atmosphere alone. Every Ember instance must point at something: a call to action, a status, an active state, a critical label. Background washes, gradient accents, and tinted hero sections are forbidden.

## 3. Typography

**Display / Body Font:** Plus Jakarta Sans ('Plus Jakarta Sans', system-ui, sans-serif)

**Character:** A single humanist geometric sans across all weights (400 to 800). The range from regular to extrabold is expressive enough that a second typeface is never needed. Heavy weights feel assertive without aggression; regular weight carries paragraphs comfortably. No serifs, no display fonts, no mono.

### Hierarchy
- **Display** (800, `clamp(2rem, 4vw, 3.25rem)`, leading 1.05): Hero headlines only. Line breaks are set intentionally — never flow-wrap. Three lines maximum.
- **Headline** (800, `clamp(2.25rem, 5vw, 3rem)`, leading 1.1): Section titles. Services, Packages, Work, About, Contact.
- **Title** (700, 1.125rem / 18px, leading 1.4): Card headings, feature names, pricing tier names.
- **Body** (400, 0.875rem / 14px, leading 1.625): All descriptor copy. Line length capped at 65ch via `max-w-lg` or `max-w-xs`.
- **Label** (700, 0.75rem / 12px, letter-spacing 0.2em, uppercase): Section eyebrow labels ("Services", "Pricing", "Live Examples"). Always Ember. Always uppercase. Always tracking-[0.2em]. The pattern is the signal — never vary it.

### Named Rules
**The Single Font Rule.** Plus Jakarta Sans is the only typeface in this system. Adding a display serif or decorative mono would undercut The Local Authority — authority doesn't need styling tricks.

**The Label Discipline Rule.** Section eyebrow labels are always: `text-xs font-bold uppercase tracking-[0.2em] text-ember mb-3`. Input labels use `text-ink` instead of `text-ember` — they describe fields, not sections. Never vary either pattern.

## 4. Elevation

This system is flat by default. Surfaces at rest carry only a thin border (`1px solid #E5E5E5`) and no shadows. Shadows appear in two cases only: as a response to hover state (card lifts), or as structural emphasis on the single featured element per layout group (the Plus pricing card).

Depth, like color, is reserved. The default surface reads clean. The hovered or featured element reads alive.

### Shadow Vocabulary
- **Hover lift** (`0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)`): Applied on card hover (`hover:shadow-lg`). Always paired with `hover:-translate-y-1 (4px)`. Lift and shadow travel together; never one without the other.
- **Feature emphasis** (`0 25px 50px -12px rgba(0,0,0,0.25)`): The featured pricing card only (`shadow-2xl`). One instance per pricing layout.

### Named Rules
**The Flat-By-Default Rule.** Cards, containers, and nav are flat at rest. Shadows are a state response, not a styling choice. A surface that starts with a shadow has nothing left to say on hover.

## 5. Components

### Buttons
Pill-shaped throughout. The rounding says modern; the extrabold labels say confident.

- **Shape:** Full pill, `border-radius: 9999px`. Never square, never lightly rounded.
- **Primary:** Ember (#FF4500), white text, `padding: 16px 32px`, weight 700, size 14px. Hover: Ember Dark (#CC3700). Transition: colors 200ms.
- **Secondary:** Surface Off (#F7F7F7) background, Ink text. Same radius and padding as primary. Used for parallel non-primary actions (e.g., "See Live Examples" alongside a primary CTA).
- **Dark:** Ink (#0D0D0D) background, white text. Hover: Ember background. Used inside dark sections (About) or as the non-featured CTA inside a pricing card.
- **Nav CTA:** Compact variant — `padding: 10px 20px`, same pill shape, size 14px.

### Cards / Containers
Two surface types — white and ink — one structural language.

- **Service card:** White background, `border-radius: 16px`, `border: 1px solid #E5E5E5`, `padding: 32px`. Hover: border-color shifts to `rgba(255,69,0,0.3)`, `shadow-lg`, `translateY(-4px)`. Leading number in Border color (#E5E5E5) transitions to Ember Light on hover.
- **Work demo card:** Same radius and border. Dark variant (featured): Ink background, white text, no border.
- **Pricing card (default):** Surface Off (#F7F7F7) background, Border outline, `border-radius: 16px`, `padding: 32px`. `hover:translateY(-4px)`.
- **Pricing card (featured):** Ink background, white text, `shadow-2xl`, `border-radius: 16px`. Ember on the "Most Popular" badge and checkmarks. `hover:translateY(-4px)`.

**The No Nested Cards Rule.** Cards never contain cards. When a card section needs internal structure, use spacing and horizontal rules, not inner card frames.

### Inputs / Fields
- **Style:** Surface Off (#F7F7F7) background, Border stroke (`1px solid #E5E5E5`), `border-radius: 12px`, `padding: 12px 16px`, size 14px.
- **Label:** `text-xs font-bold uppercase tracking-[0.15em] text-ink mb-2`. Same pattern as section eyebrows but Ink-colored (not Ember) — describes a field, not a section.
- **Focus:** `border-color: #FF4500` only. No glow, no shadow ring. Clean and direct.
- **Placeholder:** Faint (#A3A3A3).

### Navigation
- **Style:** Fixed top bar. White background, `border-bottom: 1px solid #E5E5E5`. Height 64px. `max-w-6xl` container with `px-6`.
- **Links:** `text-sm font-medium text-muted`. Hover: `text-ink`. Transition: colors.
- **Logo:** `font-extrabold text-ink text-lg tracking-tight` with a 10px Ember dot (`border-radius: 50%; background: #FF4500; width: 10px; height: 10px`). The dot is the only Ember in the nav at rest.
- **CTA:** Ember pill button, compact variant.
- **Mobile:** Hamburger icon (24px, 2px stroke) opens a full-width panel. Panel: white background, full nav links, Ember pill CTA at bottom. Panel closes on any link tap.

### Status Badge (Signature Component)
The availability chip in the hero. An Ember-tinted lozenge with a pulsing Ember dot — the system's most distinctive detail.

- **Container:** `background: #FFF0EB`, `border: 1px solid rgba(255,69,0,0.2)`, `border-radius: 9999px`, `padding: 8px 16px`.
- **Text:** `text-xs font-semibold text-ember uppercase tracking-widest`.
- **Dot:** 6px circle, Ember fill, CSS pulse animation (opacity 1 to 0.4 and back, 2s ease-in-out infinite).

### Scroll Reveal (Signature Motion)
Every `.reveal` element enters from `opacity: 0; transform: translateY(28px)` using `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) over 0.65s. Stagger siblings with 80ms increments (0.08s, 0.16s, 0.24s, 0.32s). IntersectionObserver triggers at 8% visibility with a -48px bottom margin. The easing is the signature: aggressive ease-out that settles with authority — not bouncy, not mechanical.

## 6. Do's and Don'ts

### Do:
- **Do** use `text-xs font-bold uppercase tracking-[0.2em] text-ember mb-3` for every section eyebrow label. The pattern's consistency is the point.
- **Do** alternate section backgrounds between white (#FFFFFF) and off-white (#F7F7F7) for section rhythm. No third background color.
- **Do** use pill-shaped buttons (`border-radius: 9999px`) everywhere buttons appear. Square or lightly rounded buttons are inconsistent with this system.
- **Do** keep Ember to under 10% of any given viewport. Logo dot + eyebrow label + primary CTA is already approaching that ceiling.
- **Do** cap body copy line length at 65ch via `max-w-lg` or `max-w-xs` containers.
- **Do** pair `hover:-translate-y-1` with `hover:shadow-lg` on interactive cards. Lift and shadow always travel together.
- **Do** use `cubic-bezier(0.16, 1, 0.3, 1)` for all enter animations. No bounce, no elastic, no spring.
- **Do** use a single dark section break (Ink Deep, #1A1A1A) per page, maximum. The About section is the anchor; adding more dark breaks dilutes the contrast.

### Don't:
- **Don't** use dark backgrounds, gradient blobs, glowing cards, or neon accent fills. This system explicitly rejects the SaaS/Webflow showcase aesthetic — that look signals the wrong clientele and violates The Local Authority.
- **Don't** introduce a second typeface. Plus Jakarta Sans at 800 weight is already expressive enough for display use. A decorative serif or display font would undercut the single-font authority.
- **Don't** use gradient text (`background-clip: text`). Single solid color for all text, always.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored stripe accent on cards or list items. Use a full border, background tint, or nothing.
- **Don't** add shadows to surfaces at rest. Flat by default — shadows are a state response (hover) or single structural emphasis (featured card), never decoration.
- **Don't** fill large background areas with Ember. It is a signal color, not a surface color. Ember backgrounds are permitted only on buttons and small badges.
- **Don't** add a second accent color. The entire Neutral palette exists so Ember never has to share the stage.
- **Don't** repeat heading text in the body copy beneath it. Every word earns its place.
- **Don't** use em dashes. Commas, colons, semicolons, or periods only.
- **Don't** add hero metrics in the big-number/small-label/gradient-accent template. The existing stat strip (7 days / 100% / A+) is intentionally minimal and border-anchored — not a SaaS metric block.
