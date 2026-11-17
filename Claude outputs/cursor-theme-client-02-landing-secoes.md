# Prompt 02 — landing page in theme-client

Attach: `theme-client-guidelines.md`. Run after Prompts 00 and 01.

## Goal

Restyle the landing page (`src/flows/onboarding/landing/`) with the theme-client components. **Visual layer only.**

## Rules for this prompt

- Keep every text as it is in this prompt (the approved copy rewrite is a separate step, Prompt 03), the section order, section `id`s (`solucoes`, `beneficios`, `como-funciona`), props, emits, `v-fade-in`, GA4, newsletter logic and all click handlers exactly as they are.
- Add `class="theme-client"` to the root `<div>` of `LandingPage.vue`.
- Inside the landing, replace `BaseButton` with `TcButton` and `SectionHeading` with `TcEyebrow` + `TcDisplayHeading`. Delete `BaseButton.vue` and `SectionHeading.vue` only if nothing else imports them.
- **No orange text.** Headings currently color single words ("Agro", "Fintech", "transformar") with `.text-highlight`. Remove the color; express the emphasis with the two-line weight contrast of `TcDisplayHeading` instead (see each section).
- No `bg-gray-50`, `text-gray-*`, `text-green-400`, `shadow-2xl`, `hover:scale-105`, arbitrary font sizes. Tokens only.
- Photos: use the local files, not Unsplash hotlinks. Hero → `/assets/refactor/tractor-right-copy.jpg` (`position="center 45%"`). Social proof → `/assets/refactor/campo-soja.jpeg`. Final CTA → `/assets/refactor/soybeans-harvesting.jpg` (`position="center 60%"`).
- **Out of scope here:** `RegistrationModal.vue` and `NewsletterModal.vue` (restyled in Prompt 04). Do not touch anything under `src/flows/portal/`.

## Page frame

Root: white, padding `--page-gutter` on all sides, sections stacked with a 20px gap. The hero sits inside this frame (rounded corners, not full-bleed).

## Section by section

**Navbar** (`Navbar.vue`)
- Over the hero: logo (white version) on the left; the three links (Soluções, Benefícios, Como Funciona) as a glass pill group, same pattern as the portal navigation; on the right, in this order: "Acesse sua conta" as `TcButton variant="glass"`, then "Registre-se" as `variant="inverse"` (Registre-se is the emphasized action and sits last). Both 48px high.
- After scrolling past the hero: solid white bar, 1px `--border-subtle` bottom border, blue logo, blue links, "Acesse sua conta" as `variant="secondary"` and "Registre-se" as `variant="primary"`. Keep the existing scroll detection and the mobile menu behavior; restyle the mobile menu as a white panel with `--radius-xl`.

**Hero** (`HeroSection.vue`) → `TcPhotoSection` with the top scrim enabled (the navbar sits on the photo), min-height `calc(100vh - 40px)`
- `TcEyebrow tone="onDark"`: "Grupo Ceres Investimentos".
- `TcDisplayHeading as="h1" size="display" tone="onDark"`: line 1 "Portal do Cliente", line 2 "GCI".
- Paragraph: 17px, line-height 1.6, max 52ch.
- **Remove** the three check items at the bottom of the hero (their content repeats the paragraph).
- CTAs: the registration CTA = `inverse`, `size="hero"`, `arrow`. The login CTA = `glass`, `size="hero"`.
- **Remove `QuoteHighlightCard`** from the hero and delete `QuoteHighlightCard.vue` if nothing else imports it. Its regulatory note ("O Grupo Ceres possui registro e autorizações regulatórias…") moves to the footer, above the copyright line, 13px `--text-muted`. The hero is a single left column, max width 760px.

**Soluções** (`SolutionsSection.vue`, `SolutionCard.vue`) → `TcSection`
- `aside`: `TcEyebrow` "Nossas Soluções".
- Content: `TcDisplayHeading size="3xl"`, line 1 "Para cada necessidade,", line 2 "uma solução". Subtitle 17px `--text-muted`.
- Three `SolutionCard`s in a 3-column grid (1 column below `md`), each a `TcSoftCard`: icon in a 48px blue circle (white icon), title 24px weight 700, description 15px `--text-muted`. The card title "Funding para o Agro" has no colored word.

**Benefícios** (`BenefitsSection.vue`, `BenefitCard.vue`) → `TcSection`, white (remove `bg-gray-50`)
- `aside`: `TcEyebrow` "POR QUE A GCI?".
- Content: `TcDisplayHeading size="3xl"`, line 1 "Tradição do Agro", line 2 "com inovação de Fintech".
- The six benefits as a 2-column list (1 column below `md`), **no card container**: each item has a 1px `--border-subtle` top border, 28px vertical padding, the icon (24px, blue, no badge), title 24px weight 700 and description 15px `--text-muted`.

**Números** (`SocialProofSection.vue`, `StatCard.vue`) → `TcPhotoSection`
- `TcEyebrow tone="onDark"` "NOSSOS NÚMEROS"; `TcDisplayHeading size="4xl" tone="onDark"`: line 1 "O grupo que o", line 2 "Agro precisa". Supporting text as in the hero.
- Three `StatCard`s as `TcGlassCard`s: value `--text-3xl-fluid`, weight 800, `tabular-nums`, `white-space: nowrap`; label as `StatusLabel` (12px, 700, uppercase).

**Como funciona** (`HowItWorksSection.vue`, `StepCard.vue`) → `TcSection`
- `aside`: `TcEyebrow` "COMO FUNCIONA".
- Content: `TcDisplayHeading size="3xl"`, line 1 "Simples, rápido e", line 2 "sem burocracia".
- Three `StepCard`s in a 3-column grid, each a `TcSoftCard radius="lg"`, min-height 240px: step number on top as `StatusLabel`, title 24px weight 700 and description at the bottom. No connecting lines or arrows between cards.
- The registration CTA under the grid = `TcButton variant="primary" arrow`, left-aligned.

**CTA final** (`CallToActionSection.vue`) → `TcPhotoSection` with the harvester photo above (replace the current Unsplash image), padding 96px 48px
- `TcDisplayHeading size="4xl" tone="onDark"`: line 1 "Pronto para transformar", line 2 "seus resultados?". Paragraph 17px, white at 88%.
- Registration CTA = `inverse` + `arrow`. Login CTA = `glass`.

**Footer** (`Footer.vue`)
- White, 1px `--border-subtle` top border, padding 48px `--section-pad-x`. Blue logo, blue link text, secondary text `--text-muted` 13px. Keep all links and legal text, and add the regulatory note moved from the hero above the copyright line.

## Accessibility

Apply §6 of the guidelines to every section of this prompt. In particular: `v-fade-in` must respect `prefers-reduced-motion`, and every button and link must show `--focus-ring` on `:focus-visible`.

## STOP and ask before implementing if

- A section needs a component or measure not in the guidelines or in this prompt.
- The navbar scroll behavior or mobile menu cannot be restyled without changing its logic.
- Any icon used today has no clear equivalent role in the spec above.

## Done when

- `npm run lint` passes.
- The landing has no hex literals, no legacy helper classes and no orange other than the eyebrow dashes.
- Every CTA still opens what it opened before (registration form or login).
- Report files changed, and anything you could not map.
