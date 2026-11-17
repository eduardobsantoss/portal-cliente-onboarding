import { gsap, EASE_EXPO_OUT, splitWords } from './motion';

/**
 * Entrada do hero (foto, título palavra a palavra, textos, botões e itens da navbar) e, no
 * desktop, o efeito de scroll: a foto afasta/desce e o texto sobe e esmaece.
 * Marcadores usados: `data-hero`, `data-hero-split`, `data-hero-fade`, `data-hero-content`,
 * `data-photo-zoom`, `data-photo-parallax` e `data-nav-item`.
 */
export function setupHeroMotion(root: HTMLElement, options: { scrub: boolean }): void {
  const hero = root.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;

  const zoom = hero.querySelector<HTMLElement>('[data-photo-zoom]');
  const parallax = hero.querySelector<HTMLElement>('[data-photo-parallax]');
  const title = hero.querySelector<HTMLElement>('[data-hero-split]');
  const fades = gsap.utils.toArray<HTMLElement>('[data-hero-fade]', hero);
  const content = hero.querySelector<HTMLElement>('[data-hero-content]');
  const navItems = gsap.utils.toArray<HTMLElement>('[data-nav-item]', root);
  const words = title ? splitWords(title) : [];

  const tl = gsap.timeline({ defaults: { ease: EASE_EXPO_OUT } });

  if (zoom) tl.from(zoom, { scale: 1.35, duration: 2.4 }, 0);
  if (words.length) tl.from(words, { yPercent: 115, duration: 1.2, stagger: 0.08 }, 0.25);
  if (fades.length) {
    tl.from(
      fades,
      { y: 26, opacity: 0, duration: 1, stagger: 0.1, clearProps: 'transform,opacity' },
      0.55,
    );
  }
  if (navItems.length) {
    tl.from(
      navItems,
      { y: -24, opacity: 0, duration: 0.9, stagger: 0.08, clearProps: 'transform,opacity' },
      0.3,
    );
  }

  if (!options.scrub) return;

  const scrollTrigger = {
    trigger: hero,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  };

  if (parallax) {
    gsap.fromTo(
      parallax,
      { scale: 1, yPercent: 0 },
      { scale: 1.1, yPercent: 8, ease: 'none', scrollTrigger },
    );
  }
  if (content) {
    gsap.to(content, { yPercent: -12, opacity: 0.3, ease: 'none', scrollTrigger });
  }
}
