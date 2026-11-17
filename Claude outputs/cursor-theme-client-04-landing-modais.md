# Prompt 04 — registration and newsletter modals in theme-client

Attach: `theme-client-guidelines.md`. Run after Prompts 00–03.

## Goal

Restyle the two dialogs opened from the landing page so they match the approved screens "Abra sua conta" and "Newsletter":

- `src/flows/onboarding/landing/components/modals/RegistrationModal.vue`
- `src/flows/onboarding/landing/components/modals/NewsletterModal.vue`

**Visual layer only.** Keep every prop, emit, ref, validation rule, mask, `useBodyScrollLock`, the honeypot field, `submitNewsletterLead`, the localStorage keys and all texts (the copy was already updated in Prompt 03).

**Scope guard:** touch only these two files plus new components in `src/components/theme/`. Do not touch anything under `src/flows/portal/` or the other onboarding steps.

## New shared components (`src/components/theme/`)

| File | Props / slots | Spec |
|---|---|---|
| `TcTextField.vue` | `id`, `label`, `modelValue`, `type?`, `placeholder?`, `hint?` (text at the right of the label, e.g. "14 dígitos"), `error?`, `required?`, `inputmode?`, `autocomplete?`; emits `update:modelValue`, `input`, `blur` | Label above (14px, 600). Input height `--control-input`, `--radius-input`, 1px `--border-default`, white fill, 15px text, 20px side padding. Focus: `--border-strong` + `--focus-ring`. Error: border `--danger-base`, `aria-invalid="true"`, message below (13px, `--danger-dark`, `AlertCircle` 14px) linked with `aria-describedby`. `required` adds ` *` to the label and `aria-required`. Must forward native `input` events so the existing masks keep working. |
| `TcSegmentedRadio.vue` | `name`, `modelValue`, `options: { value, label }[]`; emits `update:modelValue` | Two **native** `<input type="radio">` visually hidden, each inside a `<label>` styled as a pill. Track: `--surface-soft`, padding 6px, `--radius-full`. Option height 48px, 14px. Selected: `--surface-brand` fill, white text, 700. Unselected: transparent, blue text, 600. Focus ring on the focused option. Arrow keys work natively. |
| `TcCheckbox.vue` | `id`, `modelValue`, default slot for the label text | Native checkbox 20px, `accent-color: var(--gci-base)`, label 13px `--text-muted`, line-height 1.55, aligned to the top. |
| `TcDialog.vue` | `open`, `labelledby`, `variant: 'fullscreen' \| 'centered'`; emits `close`; default slot | `role="dialog"`, `aria-modal="true"`, `aria-labelledby`. On open: focus the first focusable element; trap Tab inside; `Esc` emits `close`; on close, return focus to the element that opened it. `centered`: overlay `rgba(4,26,32,0.72)` over the page, panel white, max-width 480px, `--radius-xl`, padding 36px, `--shadow-float`; clicking the overlay emits `close`. `fullscreen`: white page with `--page-gutter` padding, no overlay. Entrance animation disabled under `prefers-reduced-motion`. |

Reuse `TcButton`, `TcEyebrow`, `TcDisplayHeading`, `TcPhotoSection`, `TcGlassCard` from Prompt 01.

## `RegistrationModal.vue` → `TcDialog variant="fullscreen"`

Two columns side by side (stack below `lg`, photo panel on top and shorter):

**Left — `TcPhotoSection`** with `/assets/refactor/campo-soja.jpeg`, vertical scrim (`linear-gradient(180deg, rgba(8,60,74,0.72) 0%, rgba(8,60,74,0.9) 60%, rgba(8,60,74,0.95) 100%)`), padding 32px 36px 36px, content spaced between top and bottom:
- Top: white logo, 68px high.
- Middle: `TcEyebrow tone="onDark"` "Abertura de Conta Digital"; `TcDisplayHeading as="h1" size="4xl" tone="onDark"` with the two title lines from Prompt 03.
- Bottom: the single remaining benefit (Privacidade & Proteção) as a `TcGlassCard`: `Lock` icon 22px + title 15px/700 + text 14px at 90% white.

**Right — form column**, padding 12px 44px 24px:
- Top right: close button, 48px circle, 1.5px `--border-strong`, `X` icon, `aria-label="Fechar e voltar ao site"`.
- Form, max-width 480px, vertically centered, gap 20px:
  - `TcEyebrow` "Grupo Ceres Investimentos"; `TcDisplayHeading as="h2" size="4xl"` line 1 "Abra", line 2 "sua conta." (use this element's `id` for `aria-labelledby`).
  - Intro paragraph, 15px `--text-muted`.
  - `TcSegmentedRadio` for CNPJ / CPF, wired to the existing `documentType` and `selectType`.
  - `TcTextField` × 3: E-mail, the document field (label = `documentType`, `hint` = "14 dígitos" / "11 dígitos"), Telefone / WhatsApp. Keep the current `@input` handlers and `errors` bindings.
  - `* campo obrigatório`, 13px `--text-muted`.
  - Submit: `TcButton variant="primary" arrow`, full width, `type="submit"`. While `isSubmitting`: disabled, the arrow circle shows `Loader2` spinning, label "Enviando cadastro...".
- Remove the old `role="dialog"` wrapper and the `benefits` loop rendering (the data can stay if other code uses it; otherwise delete it).

## `NewsletterModal.vue` → `TcDialog variant="centered"`

Inside the white panel, gap 20px:
- Header row: `TcDisplayHeading as="h2" size="3xl"` line 1 "Fique", line 2 "por dentro." (keep `id="newsletter-modal-title"`) and, on the right, a 44px circle close button (1.5px `--border-strong`, `X`, `aria-label="Fechar"`) that calls `dismiss`.
- Paragraph 15px `--text-muted`.
- `TcTextField` Nome and Telefone (keep `onPhoneInput`). Keep the honeypot input exactly as it is (hidden, `aria-hidden`, `tabindex="-1"`).
- `TcCheckbox` with the consent text from `NEWSLETTER_CONSENT_TEXT`.
- `errorMessage`: 13px `--danger-dark` with `AlertCircle`, `role="alert"`.
- Submit: `TcButton variant="primary" arrow`, full width; disabled while `isSubmitting || !consent`, spinner as in the registration form.
- "Agora não": text button, 44px high, blue, 14px/700, calls `dismiss`.
- Success state (`successMessage`): replace the form with `CheckCircle2` 40px in `--success-base` and the message 17px `--text-strong`. Keep whatever the success state does today (auto-close, close button) unchanged.

## Do not

- Do not change validation messages, masks, API calls or storage logic.
- No hex literals, no legacy helpers, no `uppercase tracking-wider` on buttons.

## STOP and ask before implementing if

- The existing focus/scroll-lock logic conflicts with `TcDialog`'s focus trap.
- `selectType` does more than set `documentType` (e.g. clears fields) and the radio pattern would change that behavior.
- Any state exists that is not listed here (e.g. a server error banner in the registration form).

## Done when

- `npm run lint` passes.
- Keyboard only: open each dialog, Tab stays inside, `Esc` closes, focus returns to the button that opened it, PJ/PF switches with arrow keys.
- Report files created/changed.
