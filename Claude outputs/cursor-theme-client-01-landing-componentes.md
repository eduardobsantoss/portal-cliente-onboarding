# Prompt 01 — theme components needed by the landing

Attach: `theme-client-guidelines.md`. Run after Prompt 00.

## Goal

Create the shared theme-client components the landing page needs, in `src/components/theme/`. **Do not use them anywhere yet**; no screen changes in this prompt.

All components: Vue 3 `<script setup lang="ts">`, Tailwind utilities with the `tc-` tokens or `var(--token)` in arbitrary values. No hex literals, no legacy helpers (`.glass-card`, `.text-highlight`, `gci-*`). Icons from `lucide-vue-next`. Follow §3 of the guidelines for every measure not repeated here.

## Components

| File | Props / slots | Notes |
|---|---|---|
| `TcEyebrow.vue` | default slot; `tone?: 'default' \| 'onDark'` | 22×2px `--accent` dash + uppercase label. `onDark` = white text. |
| `TcDisplayHeading.vue` | `as?: 'h1' \| 'h2'` (default `h2`); `size?: 'display' \| '4xl' \| '3xl'`; `tone?: 'default' \| 'onDark'`; slots `default` (line 1) and `second` (line 2) | Line 1 weight 800. Line 2 is `display: block`, weight 300, muted per tone. Use the `*-fluid` font-size tokens. |
| `TcButton.vue` | `variant: 'primary' \| 'inverse' \| 'secondary' \| 'glass'`; `size?: 'md' \| 'hero'`; `arrow?: boolean`; `as?: 'button' \| 'a'`; `href?` | `primary` = blue fill. `inverse` = white fill, blue label (for photo/blue backgrounds). `secondary` = 1.5px blue outline. `glass` = glass fill, white label. When `arrow`, render the circle with `ArrowUpRight` on the right and use `padding: 0 8px 0 26px`; circle colors invert against the fill. Real `<button type="button">` or `<a>`. Visible focus ring (`--focus-ring`) on `:focus-visible`. Label never wraps (`white-space: nowrap`). |
| `TcPhotoSection.vue` | `src: string`; `position?: string` (CSS `background-position`, default `center`); `minHeight?: string`; `topScrim?: boolean` (default `false`); default slot | `--radius-xl`, `background-image: [var(--scrim-photo-top),] var(--scrim-photo), url(src)`, cover; the top scrim is added when `topScrim` is true. White text. Sets the image through an inline style binding. |
| `TcGlassCard.vue` | default slot | Only valid inside `TcPhotoSection` or `TcBrandSection`. |
| `TcSoftCard.vue` | default slot; `radius?: 'lg' \| 'xl'` (default `xl`) | `--surface-soft`, no border, no shadow. |
| `TcBrandSection.vue` | default slot | `--surface-brand`, `--radius-xl`, padding 64px 48px (32px 24px below `md`). White text. |
| `TcSection.vue` | slots `aside` and `default` | White section, two columns (`aside` narrow, content wide), gap 56px, padding `--section-pad-y` / `--section-pad-x`; one column below `lg`. |

## STOP and ask before implementing if

- A component seems to need a prop not listed here.
- Any measure is missing from the guidelines. Do not guess.

## Done when

- `npm run lint` passes; no existing screen changed.
- Report the files created.
