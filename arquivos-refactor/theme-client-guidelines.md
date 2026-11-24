# GCI theme-client — implementation guidelines (v2)

Guardrails for AI-assisted work (Cursor) on the **landing page**, the **onboarding** and the **Portal do Cliente** prototype (`portal-cliente-onboarding`).
Source of truth: `theme-client.css` + the approved V3.1 screens (SMS, Login, Home) + the patterns in §7, which extend V3.1 to the screens that were never drawn.
This is **not** the admin theme. Do not import patterns from `minerva-design-tokens.css` usage or `theme-admin`.

## 0. Hard rules

1. **Tokens only.** No hex, px radius, font-size or shadow literals in components. If a value is missing, STOP and ask; do not invent a token.
2. **Never invent visual details.** If a screen or state is not covered by V3.1, by §7 or by a screenshot from Eduardo, STOP and ask.
3. **Blue is primary, white is white, orange is auxiliary.**
   - Page background is `#FFFFFF`. No cream, no slate-50, no `#F8FAFB`.
   - Orange (`--accent`) is allowed only as: the 22×2px eyebrow dash, an 8–10px dot (notification / current step), and the focused SMS digit border. Never a button, card, panel, band or text color.
4. **Forbidden:** dark teal header band on top of cards; sidebar dashboard layout; drop shadows on cards that sit on white; left-border accent cards; gradient-filled buttons; emoji; `uppercase tracking-widest` micro labels outside the two label styles in §3; arbitrary Tailwind values (`rounded-[40px]`, `text-[11px]`).
5. **One primary action per screen.**
6. Do not change copy, business logic, mocks, hooks or routing while restyling. Visual layer only.

## 1. Wiring the tokens (Vue 3 + Tailwind 4)

The prototype is **Vue 3** (`<script setup lang="ts">`), Vite, Tailwind 4, `motion-v`, `lucide-vue-next`. No Vuetify.

The theme is **opt-in per screen** while the migration is in progress, so untouched screens keep working:

- `src/styles/theme-client.css` holds the tokens. In this repo they are declared on `.theme-client` (not `:root`), so **a component only gets the tokens when an ancestor has `class="theme-client"`**. Anything teleported to `<body>` (dialogs, toasts, dropdowns, the tour) must put `theme-client` on its own root.
- A screen is migrated when its root element carries `class="theme-client"`. That class sets the font, text color and page background (see `cursor-theme-client-00-setup.md`).
- Tailwind utilities for the theme are prefixed `tc-` (`bg-tc-brand`, `text-tc-muted`, `rounded-tc-xl`) so they never collide with the legacy `gci-*` utilities.
- Legacy helpers in `src/index.css` (`.text-highlight`, `.gci-gradient`, `.agro-overlay`, `.glass-card`, `bg-[#F8FAFB]`, `--color-surface`) stay until the last screen is migrated. **Never use them inside a `.theme-client` screen.**

**STOP-and-ASK:** before deleting any legacy token or helper from `src/index.css`.

## 2. Page structure

- Page: white, `--page-gutter` (20px) padding on all sides, blocks stacked with a 20px gap.
- Navigation lives in the **top** of the hero as a glass pill group. No sidebar (the portal's `Sidebar.vue` is retired in Prompt 15).
- Sections alternate three surfaces only: photo hero → white → `--surface-brand` (blue) → white.
- A section is two columns: a narrow label column (eyebrow + link) and a wide content column, gap 56px, padding `--section-pad-y` / `--section-pad-x`. Stack to one column on small screens.

## 3. Patterns (build these as components first)

| Component | Spec |
|---|---|
| `Eyebrow` | 22×2px `--accent` dash + label, `--text-eyebrow`, weight 700, `--tracking-eyebrow`, uppercase. The only uppercase label besides `StatusLabel`. |
| `StatusLabel` | 12px, weight 700, `--tracking-label`, uppercase. Only inside step/status cards ("Completo", "Etapa atual", "Pendente", "Indisponível"). |
| `DisplayHeading` | Two lines. Line 1: weight 800. Line 2: weight 300, `--text-muted` on white or `--text-on-brand-muted` on photo/blue. `--tracking-display`, `--leading-display`. Sizes: `--text-display` (hero value, SMS title), `--text-4xl`, `--text-3xl`. |
| `PrimaryButton` | Pill, height `--control-primary`, label left, a 44px circle with a ↗ arrow on the right (`padding: 0 8px 0 26px`). On white: blue fill, white label, white circle with blue arrow. On photo/blue: **inverse** (white fill, blue label, blue circle with white arrow). |
| `SecondaryButton` | Pill, height `--control-secondary`, 1.5px `--border-strong` outline, blue label. On photo: glass fill + white label. |
| `PhotoHero` | `--radius-xl`, `background: var(--scrim-photo-top), var(--scrim-photo), url(photo) center/cover` (the top scrim is required whenever navigation sits on the photo). White text. Minimum height 800px on Home; fills the viewport on SMS. Photos live in `public/assets/refactor/`. |
| `GlassCard` | `--glass-bg` + 1px `--glass-border`, `--radius-lg`, padding 20px. Only on photo or blue. |
| `FloatingCard` | White, `--radius-xl`, padding 32px, `--shadow-float`. Only on top of a photo (the SMS code card). |
| `SoftCard` | `--surface-soft`, `--radius-xl`, no border, no shadow (pending strip, service row, account data). |
| `BrandSection` | `--surface-brand`, `--radius-xl`, padding 64px 48px. Inner cards use `--surface-brand-raised`; the highlighted one is white with blue text. |
| `TextField` | Height `--control-input`, `--radius-input`, 1px `--border-default`, white fill, label above (14px, weight 600). Focus: `--border-strong` + `--focus-ring`. |
| `OtpInput` | 6 cells, height `--control-otp`, `--radius-md`, 2px border: filled `--border-strong`, focused `--accent`, empty `--border-default`. 28px, weight 700. |
| `Stepper` (onboarding) | One row of 7 items: a 4px rounded bar above "N. Label" (13px). Current: white bar, weight 700. Others: 35% white bar, weight 500. Sits at the bottom of the photo hero. |
| `JourneyCard` | `--radius-lg`, min-height 240px, `StatusLabel` on top, title (24px, 700) + date at the bottom. Done: blue fill, white text. Current: white, 2px `--border-strong`, 8px `--accent` dot before the label. Pending: 1.5px dashed `--border-dashed`. |
| `StackedBar` | 28px tall, 4px gaps, pill segments using `--chart-1…4`, legend below with 10px dots. Always pair color with a text label. |

All numbers (currency, dates, account data) use `font-variant-numeric: tabular-nums`.

## 4. Order of work

1. Tokens + `@theme` wiring + font. Nothing visual should break yet. *(done, Prompt 00)*
2. Base components in `src/components/theme` (§3, §7), built as each screen needs them.
3. Screens, in the journey order **as it is routed today** (`src/app/OnboardingRouter.vue`):
   **Landing (+ Abra sua conta) → Login → SMS → Biometria → Boas-vindas → Dados → Documentos → Assinatura → Análise / Recusa → Portal (Home → Minhas informações → Carteira → Operações → Compl. Cadastro → modais → Solicitação de operação → tour)**.
   Senha and Conta criada are commented out in the router: do not restyle them.
4. One prompt at a time, in the numbered order (05, 06, …). After each, run `npm run lint`, open the screen in the browser and report the files touched.

## 5. STOP-and-ASK list

- Any screen or state not covered by V3.1 **or by a pattern in §7**.
- Any change to routing, emits, hooks, mocks or business rules. Restyling never needs one.
- The operations cards on Home: keep the current data shape of `RecentOperationCard`; ask before restructuring.
- The GCI card visual: designed and parked. Do not add it to any screen.
- Splitting onboarding and portal into separate repositories: not decided. Do not move folders.
- Deleting a legacy component (`Sidebar.vue`, `OnboardingPageShell.vue`, `components/ui/*`): stop using it, keep the file, list it in the report. Deletion is a separate cleanup.

## 6. Accessibility (WCAG 2.1 AA) — required on every screen

Measured on the landing render; these are not optional polish.

- **Contrast.** Body text `--text-muted` on white is 5.9:1 and on `--surface-soft` 5.3:1: fine. Input and checkbox borders use `--border-default` (3.5:1). Never use `--mist-300` or `--border-subtle` as the only boundary of a control.
- **White text on photos** always sits on `--scrim-photo` (and `--scrim-photo-top` when there is navigation). If a new photo is brighter, darken the scrim; do not lighten the text.
- **Orange** (`--accent`) is 2.7:1 on white: decoration only, never text or the only signal of a state.
- **Focus.** Every interactive element shows `--focus-ring` on `:focus-visible`. Never `outline: none` without it.
- **Targets.** Buttons, nav links and form controls are at least 44px tall. Footer and inline text links may be smaller but keep 8px+ spacing between them.
- **Text never overflows.** Display headings and stat values use the `*-fluid` font-size tokens; button labels use `white-space: nowrap` and the button grows instead of wrapping.
- **Motion.** `v-fade-in` and any entrance animation are disabled under `@media (prefers-reduced-motion: reduce)`.
- **Forms.** Every input has a visible `<label for>`; placeholders are examples, never the label. When a form has required fields, they show `*` and the form states once "* campo obrigatório". The registration form on the landing currently has **no** required fields by product decision: do not add `*` there. Error messages are linked with `aria-describedby`, appear on blur/submit (not on every keystroke) and the field gets `aria-invalid="true"`.
- **Segmented choice (PJ/PF).** Use two native `<input type="radio">` styled as the pill, so arrow keys and screen readers work without custom code.
- **Dialogs** (registration, newsletter): `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the title; focus moves into the dialog on open, is trapped while open, `Esc` closes it, and focus returns to the button that opened it.
- **Icons.** Decorative icons get `aria-hidden="true"`; icon-only buttons get an `aria-label` in Portuguese.

## 7. Patterns for screens outside V3.1 (decided 2026-11-23)

V3.1 drew only Login, SMS and Home. The rest of the onboarding and the portal follow these patterns. They reuse the V3.1 vocabulary (photo + white + soft + blue, pills, 2-line headings); nothing here introduces a new color or shape.

### 7.1 Page layouts

| Pattern | Where | Spec |
|---|---|---|
| `TcPageHero` `variant="full"` | SMS, Biometria, Boas-vindas, Análise, Recusa, portal Home | `TcPhotoSection` with `topScrim`, `min-height: calc(100dvh - 2 * var(--page-gutter))` (Home: 800px), padding 24px 36px 36px. Three rows: **header** (white logo 68px left; actions right), **body** (text column left, flex 1 1 520px; optional `TcFloatingCard` right, flex 0 1 440px; gap 48px; vertically centered), **footer** (stepper on onboarding, limit card on Home). |
| `TcPageHero` `variant="compact"` | Dados, Documentos, Assinatura, portal tabs other than Home | Same component, `min-height: 360px`, padding 24px 36px 32px. Header row, then eyebrow + `TcDisplayHeading size="4xl"` + one paragraph (max 56ch), then the footer slot. |
| `TcContentSection` | Below a compact hero | White, padding `--section-pad-y` `--section-pad-x`. Two columns, gap 56px: **label column** (flex 1 1 280px: `TcEyebrow` + 1–2 lines `--text-muted` + optional link) and **content column** (flex 2.3 1 560px, max-width 880px). One column below 1024px. |
| `TcActionBar` | End of every form step | Row, `justify-content: space-between`, padding-top 32px, top 1px `--border-subtle`. Left: `TcButton variant="secondary"` (Voltar…). Right: the single `TcButton variant="primary" arrow`. Stacks (primary on top, full width) below 640px. |
| `TcPageFooter` | Every page | V3.1 Home footer: padding 0 36px 16px, 13px `--text-muted`, "Atendimento: **(34) 3311-0140**" left and "© 2025–2026 Grupo Ceres Investimentos" right. Demo-only buttons (simulate, fill mock, attach all) live here, as text buttons, never in the main content. |

Photos (`public/assets/refactor/`): Login `campo-soja.jpeg`; SMS `soybeans-harvesting.jpg` (center 30%); Biometria and Boas-vindas `tractor-right-copy.jpg` (center 45%); onboarding compact heroes `soybeans-harvesting.jpg` (center 40%); Análise and Recusa `campo-soja.jpeg`; portal Home `homem-tablet-campo-espelhada.jpg` (right 25%, provisional until a higher resolution photo arrives); portal compact heroes `campo-soja.jpeg` (center 55%). On full heroes with a text column on the left, add the horizontal scrim from V3.1 SMS (`linear-gradient(90deg, rgba(8,60,74,0.94) 0%, rgba(8,60,74,0.72) 44%, rgba(8,60,74,0.2) 80%)`) through the `scrim` prop.

### 7.2 Onboarding stepper

Six steps, from the router: **1. Celular · 2. Biometria · 3. Dados · 4. Documentos · 5. Assinatura · 6. Análise**. Boas-vindas is not a step (it shows 1–2 done and nothing current). Rendered with `TcStepper` (§3 `Stepper`) inside the hero footer: done = white bar, label 500; current = white bar, label 700, 8px `--accent` dot before the label, `aria-current="step"`; upcoming = 35% white bar, label 500 at 86% white. The eyebrow above the title reads "Passo N de 6". The PJ sub-steps of Dados (Empresa, Endereço, Sócios) are a second, smaller indicator inside the content (§7.3 `TcSubSteps`), not extra items in the main stepper.

### 7.3 Components

| Component | Spec |
|---|---|
| `TcFloatingCard` | §3 `FloatingCard`. Holds the one interactive block on full heroes (OTP, QR code, welcome CTA). |
| `TcSubSteps` | Row of pills, 40px high, 13px: done = `--surface-soft` + `Check` 14px; current = `--surface-brand` fill, white, 700; upcoming = 1.5px dashed `--border-dashed`, `--text-muted`. Right of the row: "Passo N de 3", 13px muted. |
| `TcFormSection` | `--surface-soft`, `--radius-xl`, padding 32px. Title 20px/700 + optional 14px muted description, then a 2-column grid of fields (gap 20px 16px), 1 column below 640px. Sections stack with 20px gap. |
| `TcSelectField` | Same box as `TcTextField` (height, radius, border, focus, error, label). Native `<select>`, `ChevronDown` 18px at 20px from the right, `appearance: none`. |
| Read-only / locked field | Same box, fill `--surface-soft`, border `--border-subtle`, text weight 600, `readonly`, a `Lock` 14px after the label with `aria-label="Preenchido pela Receita Federal"`. |
| `TcNotice` | Row on `--surface-soft`, `--radius-xl`, padding 24px 28px, gap 20px: 48px circle icon + title 16px/700 + text 14px + optional action (`TcButton variant="primary" size="compact"`, no arrow). Tones change only the circle: `info` = `--surface-brand` + white icon; `success` = `--success-light` + `--success-dark` icon; `warning` = `--warning-light` + `--warning-dark`; `danger` = `--danger-light` + `--danger-dark`. Text stays `--text-strong`. Replaces every emerald/amber/rose banner. |
| `TcStatusChip` | Height 28px, padding 0 12px, `--radius-full`, 12px/600, sentence case: `neutral` (`--surface-soft` / `--text-strong`), `success` (`--success-light` / `--success-dark`), `warning`, `danger` (same pairing). Always text, never color alone. Used in tables, cards and document rows. `TcStatusLabel` (uppercase) stays for journey/step cards only. |
| `TcPillTabs` | The V3.1 nav pill on white: track `--surface-soft`, padding 6px, `--radius-full`; tab height 44px, padding 0 18px, 13px/600; active = `--surface-brand` fill + white; `role="tablist"`/`role="tab"`/`aria-selected`. Used for status filters and the tabs inside detail dialogs. |
| `TcAccordion` | `--surface-soft`, `--radius-xl`. Header is a `<button aria-expanded>` row, min-height 80px, padding 0 28px: title 17px/700 + meta (chip or "3 de 5 enviados", 13px muted) + 40px circle (1.5px `--border-strong`) with `ChevronDown` rotating 180°. Body padding 0 28px 28px. |
| `TcFileRow` | Upload row inside an accordion: white, `--radius-lg`, padding 16px 20px, min-height 72px. Name 15px/600 + requirement 13px muted; right side `TcStatusChip` + action (`TcButton variant="secondary" size="nav"` "Enviar arquivo" / icon button `Trash2` with `aria-label`). Uploading: `Loader2` spinning + "Enviando…". |
| `TcDropzone` | 1.5px dashed `--border-dashed`, `--radius-xl`, padding 40px, centered: `Upload` 28px in a 56px `--surface-soft` circle, 16px/700 line, 13px muted line. Drag-over: border `--border-strong`, fill `--surface-soft`. |
| `TcProgressBar` | 6px track `--gci-subtle` on white (or 28% white on photo), fill `--surface-brand` (white on photo), `--radius-full`; label row above: text 13px/600 + value 13px tabular. `role="progressbar"` with `aria-valuenow`. |
| `TcEmptyState` | V3.1 "Contratos Fiduciários" style: 1.5px dashed `--border-dashed`, `--radius-xl`, padding 48px, centered: title 24px/300 muted, text 14px muted, optional `TcButton variant="secondary"`. No illustrations. |
| `TcDataTable` | On white, no outer border. `<th>` 13px/600 `--text-muted`, height 48px, bottom 1px `--border-default`. Rows min-height 64px, 15px, bottom 1px `--border-subtle`; hover `--surface-soft`; selected = `--surface-soft` fill. Money and dates `tabular-nums`, money right-aligned. Row actions are icon buttons (40px, `aria-label`). Horizontal scroll inside a wrapper below 1024px, first column sticky. Native checkboxes 20px with `accent-color: var(--gci-base)`. |
| `TcPagination` | Right-aligned row: "1–10 de 42" 13px muted + two 44px circle buttons (1.5px `--border-strong`, `ChevronLeft`/`ChevronRight`, `aria-label`). |
| `TcKpiTile` | `TcSoftCard`, padding 28px: label 13px/500 muted, value `--text-2xl`/700 tabular, optional 13px foot line. Grid of 2–4, gap 20px. |
| `TcMenu` (dropdowns) | White panel, `--radius-lg`, 1px `--border-subtle`, `--shadow-float`, padding 8px, min-width 280px. Items 44px, 14px/600, padding 0 14px, `--radius-md`, hover/focus `--surface-soft`. Sections separated by 1px `--border-subtle`. `role="menu"`, Esc closes, focus returns to the trigger. |
| `TcToast` | White, `--radius-lg`, `--shadow-float`, padding 20px 24px, max-width 420px, top-right below the hero header (`--z-toast`). Same icon circle + title/text as `TcNotice`; close icon button. `role="status"` (or `role="alert"` for errors). |
| Dialogs | `TcDialog` from Prompt 04. **Centered** for confirmations and short forms (max-width 480px; `wide` = 720px). **Fullscreen** for detail views and multi-step flows: two columns, left = `--surface-brand` panel (`--radius-xl`, padding 36px: white logo 48px, `TcDisplayHeading size="3xl" tone="onDark"`, description 15px at 88% white, sidebar slot as `TcGlassCard`s), right = content with a 48px circle close button top-right. |
| Charts | Series colors `--chart-1…4` in that order; gridlines 1px `--border-subtle`; axis labels 12px muted; no gradients, no shadows; every series has a text legend. |

### 7.4 Elevation rule

Cards that sit on white or soft surfaces have **no shadow**. `--shadow-float` is reserved for things that float over other content: `TcFloatingCard` on a photo, dialogs, `TcMenu`, `TcToast`, the tour bubble.

### 7.5 Responsive (decided; V3.1 was 1440px only)

- ≥1024px: as drawn.
- 640–1023px: hero body stacks (text, then floating card full width); `TcContentSection` becomes one column; the portal nav pill becomes a horizontally scrollable row under the logo (no hamburger, no drawer).
- <640px: `--page-gutter` stays 20px, hero padding 20px, display headings use the `*-fluid` tokens, `TcActionBar` stacks, tables scroll horizontally.

### 7.6 Product decisions to respect

- The password is created in the landing registration form; Senha and Conta criada are disabled in the router.
- Boas-vindas (`TermsAgreement.vue`) is only a welcome message; the terms acceptance stays commented out.
- The registration form has no required fields and the PJ/PF toggle is commented out there.
- Portal navigation items come from `DASHBOARD_NAV_ITEMS` (Home, Minhas Informações, Carteira, Operações, Compl. Cadastro). The V3.1 mock showed "Análise de crédito"; the code wins.
