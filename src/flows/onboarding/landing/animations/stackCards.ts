import { gsap } from './motion';

/**
 * Pilha de cards da seção "Por que a GCI?".
 *
 * Ao ativar, a seção ganha `data-stack-active` e o CSS deixa o bloco azul fixo (sticky) na área
 * visível, com os cards sobrepostos em degraus. Uma única timeline presa à
 * rolagem faz cada card deslizar de baixo do palco até a sua posição, enquanto o anterior
 * encolhe um pouco. O mesmo progresso alimenta o contador e a barra ao lado do título.
 *
 * Retorna a função que desfaz a ativação (volta à lista simples).
 */
export function setupStackCards(root: HTMLElement): () => void {
  const section = root.querySelector<HTMLElement>('[data-stack-root]');
  const stage = section?.querySelector<HTMLElement>('[data-stack-stage]');
  const list = section?.querySelector<HTMLElement>('[data-stack]');
  if (!section || !stage || !list) return () => {};

  const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]', list);
  if (cards.length < 2) return () => {};

  // Precisa vir antes de medir qualquer coisa: o layout muda com o modo animado.
  section.dataset.stackActive = '';

  const stageTop = () => parseFloat(getComputedStyle(stage).top) || 0;
  const lastIndex = cards.length - 1;

  // Contador e barra são buscados a cada atualização (e não guardados) para continuar certo se
  // a seção for re-renderizada.
  const showProgress = (progress: number) => {
    const counter = section.querySelector<HTMLElement>('[data-stack-counter]');
    const bar = section.querySelector<HTMLElement>('[data-stack-progress]');
    // O card i pousa quando o progresso chega a i / lastIndex.
    const landed = 1 + Math.floor(progress * lastIndex + 1e-6);
    const current = String(Math.min(cards.length, landed)).padStart(2, '0');
    if (counter && counter.textContent !== current) counter.textContent = current;
    if (bar) bar.style.transform = `scaleX(${progress})`;
  };

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: () => `top ${stageTop()}px`,
      end: () => `bottom ${stageTop() + stage.offsetHeight}px`,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => showProgress(self.progress),
      onRefresh: (self) => showProgress(self.progress),
    },
  });

  // Altura de cada degrau da pilha (distância entre um card e o seguinte).
  const stepSize = () => cards[1].offsetTop - cards[0].offsetTop;
  // Posição final de um card quando a pilha "fecha": todos no mesmo lugar, no centro do que
  // era a pilha. O último card fica por cima e cobre todos os outros.
  const collapsedY = (index: number) => ((lastIndex - 2 * index) / 2) * stepSize();

  cards.forEach((card, index) => {
    if (index === 0) return;
    const previous = cards[index - 1].querySelector<HTMLElement>('[data-stack-card-inner]');
    const isLast = index === lastIndex;

    // Começa totalmente abaixo do palco (que corta o que passa da borda) e sobe até o degrau
    // (ou, no último card, até a posição em que cobre a pilha inteira).
    timeline.fromTo(
      card,
      { y: () => stage.clientHeight - (list.offsetTop + card.offsetTop) },
      { y: isLast ? () => collapsedY(index) : 0, duration: 1 },
      index - 1,
    );
    if (previous) timeline.to(previous, { scale: 0.94, duration: 1 }, index - 1);
  });

  // Enquanto o último card sobe, os anteriores se juntam sob ele.
  cards.slice(0, -1).forEach((card, index) => {
    timeline.fromTo(
      card,
      { y: 0 },
      { y: () => collapsedY(index), duration: 1, immediateRender: false },
      lastIndex - 1,
    );
  });

  return () => {
    delete section.dataset.stackActive;
  };
}
