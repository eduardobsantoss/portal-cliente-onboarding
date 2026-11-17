# Prompt 00 — theme-client setup (no visual change)

Attach: `theme-client.css`, `theme-client-guidelines.md`.

## Goal

Make the theme-client tokens available in this repo **without changing how any existing screen looks**. Screens opt in later, one at a time.

## Do

1. Create `src/styles/theme-client.css` with the exact content of the attached `theme-client.css`. Do not edit values.
2. In `src/index.css`:
   - Add `@import "./styles/theme-client.css";` right after `@import "tailwindcss";`.
   - Add a second block, **below** the existing `@theme`, and leave the existing `@theme` untouched:

```css
@theme inline {
  --color-tc-brand: var(--gci-base);
  --color-tc-brand-hover: var(--gci-hover);
  --color-tc-brand-raised: var(--gci-tint);
  --color-tc-soft: var(--gci-light);
  --color-tc-muted: var(--mist-600);
  --color-tc-line: var(--mist-300);
  --color-tc-line-subtle: var(--gci-subtle);
  --color-tc-accent: var(--agro-base);
  --radius-tc-md: var(--radius-md);
  --radius-tc-input: var(--radius-input);
  --radius-tc-lg: var(--radius-lg);
  --radius-tc-xl: var(--radius-xl);
  --shadow-tc-float: var(--shadow-float);
}

.theme-client {
  font-family: var(--font-sans);
  color: var(--text-strong);
  background: var(--surface-page);
}
```

3. In `index.html`, load Montserrat (weights 300, 400, 500, 600, 700, 800) from Google Fonts next to the existing font link. Keep Inter.
4. Create the folder `src/components/theme/` with an empty `README.md` containing one line: `Componentes do theme-client. Ver theme-client-guidelines.md §3.`

## Do not

- Do not remove or rename anything in the existing `@theme`, `@layer base` or helper classes.
- Do not add `class="theme-client"` to any screen yet.
- Do not touch any `.vue` file.

## Done when

- `npm run lint` passes.
- `npm run dev`: every existing screen looks exactly as before.
- Report the files created/changed.
