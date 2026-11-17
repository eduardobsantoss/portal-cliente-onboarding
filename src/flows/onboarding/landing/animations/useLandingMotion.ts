import { onBeforeUnmount, onMounted, type Ref } from 'vue';
import {
  gsap,
  ScrollTrigger,
  DESKTOP_QUERY,
  MOTION_QUERY,
  refreshOnAssetsReady,
} from './motion';
import { useSmoothScroll } from './useSmoothScroll';
import { setupHeroMotion } from './heroMotion';
import { setupParallax } from './parallax';
import { setupReveals, setupDrawLines } from './reveal';
import { setupStackCards } from './stackCards';

/**
 * Orquestra as animações da landing: rolagem suave (Lenis) + entradas, parallax e recortes
 * (GSAP/ScrollTrigger). Com `prefers-reduced-motion: reduce` nada é aplicado e a página aparece
 * já no estado final. Tudo é desfeito ao desmontar.
 */
export function useLandingMotion(root: Ref<HTMLElement | null>): void {
  let stopSmoothScroll: (() => void) | undefined;
  let stopRefresh: (() => void) | undefined;
  let mm: gsap.MatchMedia | undefined;

  onMounted(() => {
    const el = root.value;
    if (!el) return;

    stopSmoothScroll = useSmoothScroll();

    mm = gsap.matchMedia();
    mm.add({ motion: MOTION_QUERY, desktop: DESKTOP_QUERY }, (context) => {
      const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;

      const flushers: Array<() => void> = [];

      // A pilha muda a altura da página: precisa ser montada antes das demais, que medem posições.
      const stopStack = setupStackCards(el);

      setupHeroMotion(el, { scrub: desktop });
      setupReveals(el, flushers);

      if (desktop) {
        setupParallax(el);
        setupDrawLines(el);
      }

      // Rede de segurança (como na referência): ao chegar ao fim da página, tudo o que ainda
      // estiver escondido vai para o estado final.
      ScrollTrigger.create({
        start: 'max-=40',
        end: 'max',
        onEnter: () => flushers.forEach((flush) => flush()),
      });

      return stopStack;
    });

    stopRefresh = refreshOnAssetsReady();
  });

  onBeforeUnmount(() => {
    mm?.revert();
    stopRefresh?.();
    stopSmoothScroll?.();
  });
}
