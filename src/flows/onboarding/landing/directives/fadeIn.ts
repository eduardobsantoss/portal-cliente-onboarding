import type { Directive } from 'vue';

/**
 * Reveals an element with a fade + slide-up transition once it scrolls into view.
 * Usage: `v-fade-in` or `v-fade-in="delayInSeconds"`.
 */
export const fadeIn: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('v-fade-in');

    if (binding.value !== undefined && typeof binding.value === 'number') {
      el.style.transitionDelay = `${binding.value}s`;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.1,
    });

    observer.observe(el);
  },
};
