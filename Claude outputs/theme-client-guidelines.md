# GCI theme-client — implementation guidelines (v1)

Guardrails for AI-assisted work (Cursor) on the **landing page**, the **onboarding** and the **Portal do Cliente** prototype (`portal-cliente-onboarding`).
Source of truth: `theme-client.css` + the approved V3.1 screens (SMS, Login, Home).
This is **not** the admin theme. Do not import patterns from `minerva-design-tokens.css` usage or `theme-admin`.

## 0. Hard rules

1. **Tokens only.** No hex, px radius, font-size or shadow literals in components. If a value is missing, STOP and ask; do not invent a token.
2. **Never invent visual details.** If a screen or state is not covered by V3.1 or by a screenshot from Eduardo, STOP and ask.
3. **Blue is primary, white is white, orange is auxiliary.**
   - Page background is `#FFFFFF`. No cream, no slate-50, no `#F8FAFB`.
   - Orange (`--accent`) is allowed only as: the 22×2px eyebrow dash, an 8–10px dot (notification / current step), and the focused SMS digit border. Never a button, card, panel, band or text color.
4. **Forbidden:** dark teal header band on top of cards; sidebar dashboard layout; drop shadows on cards that sit on white; left-border accent cards; gradient-filled buttons; emoji; `uppercase tracking-widest` micro labels outside the two label styles in §3; arbitrary Tailwind values (`rounded-[40px]`, `text-[11px]`).
5. **One primary action per screen.**
6. Do not change copy, business logic, mocks, hooks or routing while restyling. Visual layer only.

## 1. Wiring the tokens (Vue 3 + Tailwind 4)

The prototype is **Vue 3** (`<script setup lang="ts">`), Vite, Tailwind 4, `motion-v`, `lucide-vue-next`. No Vuetify.

The theme is **opt-in per screen** while the migration is in progress, so untouched screens keep working:

- `src/styles/theme-client.css` holds the tokens (global `:root` variables; harmless to legacy screens).
- A screen is migrated when its root element carries `class="theme-client"`. That class sets the font, text color and page background (see `cursor-theme-client-00-setup.md`).
- Tailwind utilities for the theme are prefixed `tc-` (`bg-tc-brand`, `text-tc-muted`, `rounded-tc-xl`) so they never collide with the legacy `gci-*` utilities.
- Legacy helpers in `src/index.css` (`.text-highlight`, `.gci-gradient`, `.agro-overlay`, `.glass-card`, `bg-[#F8FAFB]`, `--color-surface`) stay until the last screen is migrated. **Never use them inside a `.theme-client` screen.**

**STOP-and-ASK:** before deleting any legacy token or helper from `src/index.css`.

## 2. Page structure

- Page: white, `--page-gutter` (20px) padding on all sides, blocks stacked with a 20px gap.
- Navigation lives in the **top** of the hero as a glass pill group. No sidebar.
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

1. Tokens + `@theme` wiring + font. Nothing visual should break yet.
2. Base components in `src/components/theme` (§3), built as each screen needs them.
3. Screens, in journey order: **Landing → Abra sua conta → SMS → Senha → Login → Termos → Dados → Documentos → Assinatura → Análise → Conta criada → Home**, then the rest of the portal.
4. One screen per prompt. After each, run `npm run lint` and report files touched.

## 5. STOP-and-ASK list

- Any screen or state not present in V3.1 (errors, loading, modals, tables, empty states beyond "Nenhuma operação realizada").
- Responsive behavior below 1024px: V3.1 was designed at 1440px only. The `*-fluid` type tokens are proposals.
- The operations cards on Home: the approved mock differs from the current `RecentOperationCard`; keep the current data shape and ask before restructuring.
- The GCI card visual: designed and parked. Do not add it to any screen.
- Splitting onboarding and portal into separate repositories: not decided. Do not move folders.

## 6. Accessibility (WCAG 2.1 AA) — required on every screen

Measured on the landing render; these are not optional polish.

- **Contrast.** Body text `--text-muted` on white is 5.9:1 and on `--surface-soft` 5.3:1: fine. Input and checkbox borders use `--border-default` (3.5:1). Never use `--mist-300` or `--border-subtle` as the only boundary of a control.
- **White text on photos** always sits on `--scrim-photo` (and `--scrim-photo-top` when there is navigation). If a new photo is brighter, darken the scrim; do not lighten the text.
- **Orange** (`--accent`) is 2.7:1 on white: decoration only, never text or the only signal of a state.
- **Focus.** Every interactive element shows `--focus-ring` on `:focus-visible`. Never `outline: none` without it.
- **Targets.** Buttons, nav links and form controls are at least 44px tall. Footer and inline text links may be smaller but keep 8px+ spacing between them.
- **Text never overflows.** Display headings and stat values use the `*-fluid` font-size tokens; button labels use `white-space: nowrap` and the button grows instead of wrapping.
- **Motion.** `v-fade-in` and any entrance animation are disabled under `@media (prefers-reduced-motion: reduce)`.
- **Forms.** Every input has a visible `<label for>`; placeholders are examples, never the label. Required fields show `*` and the form states once "* campo obrigatório". Error messages are linked with `aria-describedby`, appear on blur/submit (not on every keystroke) and the field gets `aria-invalid="true"`.
- **Segmented choice (PJ/PF).** Use two native `<input type="radio">` styled as the pill, so arrow keys and screen readers work without custom code.
- **Dialogs** (registration, newsletter): `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the title; focus moves into the dialog on open, is trapped while open, `Esc` closes it, and focus returns to the button that opened it.
- **Icons.** Decorative icons get `aria-hidden="true"`; icon-only buttons get an `aria-label` in Portuguese.
