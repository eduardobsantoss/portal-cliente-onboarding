import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Curva de saída longa usada nas entradas (equivalente ao `expo.out` da referência). */
export const EASE_EXPO_OUT = 'expo.out';

/** Telas até 767px: sem parallax nem clip-path com scrub (guia: desktop-first). */
export const DESKTOP_QUERY = '(min-width: 768px)';
export const MOTION_QUERY = '(prefers-reduced-motion: no-preference)';

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Envolve cada palavra do elemento em `<span overflow:hidden><span class="wi">` para que possa
 * subir de dentro de uma "máscara". Preserva a estrutura de elementos (ex.: o `<span>` da segunda
 * linha dos títulos) e o espaço entre as palavras.
 * O `padding-bottom` com `margin-bottom` negativo evita cortar as descendentes (g, p, q).
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  // O setup roda de novo quando a media query muda: reaproveita palavras já separadas.
  const existing = Array.from(el.querySelectorAll<HTMLElement>('.wi'));
  if (existing.length) return existing;

  const words: HTMLElement[] = [];

  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
        return;
      }
      if (child.nodeType !== Node.TEXT_NODE) return;

      const text = child.textContent ?? '';
      if (!text.trim()) return;

      const fragment = document.createDocumentFragment();
      text.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(' '));
          return;
        }
        const mask = document.createElement('span');
        mask.style.cssText =
          'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.12em;margin-bottom:-.12em';
        const word = document.createElement('span');
        word.className = 'wi';
        word.style.display = 'inline-block';
        word.textContent = part;
        mask.appendChild(word);
        fragment.appendChild(mask);
        words.push(word);
      });
      child.parentNode?.replaceChild(fragment, child);
    });
  };

  walk(el);
  return words;
}

/**
 * Recalcula os gatilhos quando as fontes e imagens terminam de carregar, para que as posições
 * de início/fim batam com o layout final.
 */
export function refreshOnAssetsReady(): () => void {
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener('load', refresh);
  return () => window.removeEventListener('load', refresh);
}
