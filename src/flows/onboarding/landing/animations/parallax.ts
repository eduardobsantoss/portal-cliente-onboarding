import { gsap } from './motion';

/**
 * Efeitos de scroll (scrub) das seções com foto, só no desktop:
 * - `data-photo-section` (exceto o hero): parallax da foto, que se move dentro da seção;
 * - `data-clip-reveal`: a seção "abre" de um recorte menor até ocupar toda a largura (animação única, sem scrub).
 */
export function setupParallax(root: HTMLElement): void {
  gsap.utils.toArray<HTMLElement>('[data-photo-section]', root).forEach((section) => {
    if (section.hasAttribute('data-hero')) return;
    const layer = section.querySelector<HTMLElement>('[data-photo-parallax]');
    if (!layer) return;

    gsap.fromTo(
      layer,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-clip-reveal]', root).forEach((section) => {
    // Mantém o raio da seção durante o recorte para o canto não "quadrar".
    const radius = getComputedStyle(section).borderTopLeftRadius || '28px';

    gsap.fromTo(
      section,
      { clipPath: `inset(7% 4% 0% 4% round ${radius})` },
      {
        clipPath: `inset(0% 0% 0% 0% round ${radius})`,
        duration: 1.4,
        ease: 'expo.out',
        // Abre uma vez só, ao entrar na tela: ao rolar de volta a seção não "fecha" de novo.
        scrollTrigger: { trigger: section, start: 'top 90%', once: true },
      },
    );
  });
}
