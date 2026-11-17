import { gsap, ScrollTrigger, EASE_EXPO_OUT, splitWords } from './motion';

/**
 * Entradas por scroll. Cada função registra, em `flushers`, como levar o elemento ao estado final
 * de imediato (rede de segurança para nada ficar invisível).
 *
 * Marcadores:
 * - `data-reveal`: sobe e aparece; elementos que entram juntos saem em stagger;
 * - `data-split-reveal`: título que sobe palavra a palavra;
 * - `data-countup`: número que conta de 0 até o valor;
 * - `data-clip-logo`: marca revelada da esquerda para a direita;
 * - `data-draw-line`: linha que se desenha conforme a rolagem (scrub).
 */
export function setupReveals(root: HTMLElement, flushers: Array<() => void>): void {
  revealBlocks(root, flushers);
  revealSplitTitles(root, flushers);
  countUp(root, flushers);
  revealClipLogo(root, flushers);
}

function revealBlocks(root: HTMLElement, flushers: Array<() => void>): void {
  const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]', root);
  if (!targets.length) return;

  const pending = new Set(targets);
  gsap.set(targets, { opacity: 0, y: 40 });

  ScrollTrigger.batch(targets, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => {
      batch.forEach((el) => pending.delete(el as HTMLElement));
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASE_EXPO_OUT,
        stagger: 0.12,
        overwrite: true,
        clearProps: 'transform,opacity',
      });
    },
  });

  flushers.push(() => {
    if (!pending.size) return;
    gsap.to([...pending], { opacity: 1, y: 0, duration: 0.6, clearProps: 'transform,opacity' });
    pending.clear();
  });
}

function revealSplitTitles(root: HTMLElement, flushers: Array<() => void>): void {
  gsap.utils.toArray<HTMLElement>('[data-split-reveal]', root).forEach((title) => {
    const words = splitWords(title);
    if (!words.length) return;

    const tween = gsap.from(words, {
      yPercent: 115,
      duration: 1.2,
      ease: EASE_EXPO_OUT,
      stagger: 0.07,
      scrollTrigger: { trigger: title, start: 'top 85%', once: true },
    });
    flushers.push(() => tween.progress(1));
  });
}

function countUp(root: HTMLElement, flushers: Array<() => void>): void {
  gsap.utils.toArray<HTMLElement>('[data-countup]', root).forEach((el) => {
    // O valor original fica guardado: o setup pode rodar de novo (mudança de media query).
    el.dataset.countupValue ??= el.textContent ?? '';
    const original = el.dataset.countupValue;
    const match = original.match(/^(\D*?)(\d[\d.,]*)(.*)$/);
    if (!match) return;

    const [, prefix, rawNumber, suffix] = match;
    const decimals = rawNumber.includes(',') ? rawNumber.split(',')[1].length : 0;
    const target = parseFloat(rawNumber.replace(/\./g, '').replace(',', '.'));
    if (Number.isNaN(target)) return;

    const format = (value: number) =>
      value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

    // Leitores de tela recebem o valor final; a contagem animada fica oculta para eles.
    const readable = document.createElement('span');
    readable.className = 'sr-only';
    readable.textContent = original;
    const visible = document.createElement('span');
    visible.setAttribute('aria-hidden', 'true');
    visible.textContent = `${prefix}${format(0)}${suffix}`;
    el.replaceChildren(readable, visible);

    const counter = { value: 0 };

    const tween = gsap.to(counter, {
      value: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        visible.textContent = `${prefix}${format(counter.value)}${suffix}`;
      },
      onComplete: () => {
        visible.textContent = original;
      },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
    flushers.push(() => {
      tween.progress(1);
      visible.textContent = original;
    });
  });
}

function revealClipLogo(root: HTMLElement, flushers: Array<() => void>): void {
  gsap.utils.toArray<HTMLElement>('[data-clip-logo]', root).forEach((logo) => {
    const tween = gsap.fromTo(
      logo,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.6,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: logo, start: 'top 95%', once: true },
      },
    );
    flushers.push(() => tween.progress(1));
  });
}

/** Linhas que se desenham com a rolagem (desktop). */
export function setupDrawLines(root: HTMLElement): void {
  gsap.utils.toArray<HTMLElement>('[data-draw-line]', root).forEach((line) => {
    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: line.parentElement ?? line,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      },
    );
  });
}
