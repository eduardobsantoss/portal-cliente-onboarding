import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;
let releaseNativeScroll: (() => void) | null = null;

/** Teclas que rolam a página sem passar pela roda do mouse. */
const SCROLL_KEYS = new Set(['PageUp', 'PageDown', 'Home', 'End', ' ', 'ArrowUp', 'ArrowDown']);

/**
 * O Lenis ignora a rolagem nativa enquanto está animando ("smooth"): se o visitante arrasta a barra
 * de rolagem ou usa o teclado no meio de uma rolagem suave, os dois brigam (a página "joga" para o
 * sentido antigo). Nesses casos cancelamos a animação e devolvemos o controle à rolagem nativa.
 */
function handBackToNativeScroll(instance: Lenis): () => void {
  // Parar na posição atual (imediato) encerra a animação e sincroniza o Lenis com o scroll nativo.
  const cancelSmoothScroll = () =>
    instance.scrollTo(window.scrollY, { immediate: true, force: true });

  const cancelOnScrollbar = (event: MouseEvent | PointerEvent) => {
    const pressedScrollbar =
      event.target === document.documentElement ||
      event.clientX >= document.documentElement.clientWidth;
    if (pressedScrollbar) cancelSmoothScroll();
  };
  const cancelOnKey = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (SCROLL_KEYS.has(event.key)) cancelSmoothScroll();
  };

  window.addEventListener('pointerdown', cancelOnScrollbar, true);
  window.addEventListener('mousedown', cancelOnScrollbar, true);
  window.addEventListener('keydown', cancelOnKey, true);

  return () => {
    window.removeEventListener('pointerdown', cancelOnScrollbar, true);
    window.removeEventListener('mousedown', cancelOnScrollbar, true);
    window.removeEventListener('keydown', cancelOnKey, true);
  };
}

/**
 * Liga a rolagem suave (Lenis) ao ScrollTrigger. Só existe enquanto a landing estiver montada;
 * com `prefers-reduced-motion` a rolagem continua nativa.
 * Retorna a função que desfaz tudo.
 */
export function useSmoothScroll(): () => void {
  if (prefersReducedMotion() || lenis) return () => undefined;

  const instance = new Lenis({ lerp: 0.09 });
  lenis = instance;

  instance.on('scroll', ScrollTrigger.update);
  tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  releaseNativeScroll = handBackToNativeScroll(instance);

  return () => {
    releaseNativeScroll?.();
    releaseNativeScroll = null;
    if (tick) gsap.ticker.remove(tick);
    instance.destroy();
    lenis = null;
    tick = null;
  };
}

/** Rola até um elemento ou posição, com Lenis quando ativo e `scrollTo` nativo como alternativa. */
export function smoothScrollTo(target: HTMLElement | number, offset = 0): void {
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }
  const top =
    typeof target === 'number'
      ? target
      : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/** Congela a rolagem da página (ex.: modal aberto). */
export function pauseSmoothScroll(): void {
  lenis?.stop();
}

export function resumeSmoothScroll(): void {
  lenis?.start();
}
