<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ArrowLeft, ArrowRight, Compass, X } from 'lucide-vue-next';
import { DESKTOP_BREAKPOINT_PX } from '@/constants/dashboardNav';
import { TOUR_INTRO, type TourStep } from './tourSteps';

/**
 * Tour guiado do primeiro acesso ao portal: um convite ("Fazer tutorial" ou "Pular") e, se aceito,
 * popups passo a passo que destacam (spotlight) cada área do menu e do cabeçalho.
 */
const props = defineProps<{
  phase: 'idle' | 'intro' | 'steps';
  step: TourStep;
  stepIndex: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
}>();

const emit = defineEmits<{
  start: [];
  skip: [];
  next: [];
  previous: [];
  /** Pede ao portal para abrir/fechar o menu lateral (necessário nos passos do menu). */
  sidebar: [open: boolean];
}>();

const SPOTLIGHT_PADDING_PX = 6;
const POPOVER_GAP_PX = 14;
const VIEWPORT_MARGIN_PX = 16;
const POPOVER_WIDTH_PX = 340;
const COMPACT_BREAKPOINT_PX = 640;
const SIDEBAR_TRANSITION_MS = 380;

const rect = ref<DOMRect | null>(null);
const viewport = ref({ width: 0, height: 0 });
const popoverHeight = ref(200);
// Falso enquanto o menu lateral anima: evita o popup "pular" de posição.
const isSettled = ref(false);

const popover = ref<HTMLElement | null>(null);
const primaryButton = ref<HTMLElement | null>(null);

const isCompact = computed(() => viewport.value.width < COMPACT_BREAKPOINT_PX);
const isNarrow = () => window.innerWidth < DESKTOP_BREAKPOINT_PX;

let settleTimer: ReturnType<typeof setTimeout> | undefined;

const measure = () => {
  viewport.value = { width: window.innerWidth, height: window.innerHeight };
  // Escondido (display: none) o popup mede 0; só atualiza com uma altura real.
  const measuredHeight = popover.value?.offsetHeight ?? 0;
  if (measuredHeight > 0) popoverHeight.value = measuredHeight;

  if (props.phase !== 'steps') {
    rect.value = null;
    return;
  }

  const el = document.querySelector<HTMLElement>(`[data-tour="${props.step.target}"]`);
  const box = el?.getBoundingClientRect();
  // Fora da tela (menu lateral ainda fechado no mobile) conta como "sem alvo".
  const isVisible =
    !!box && box.width > 0 && box.height > 0 && box.right > 0 && box.left < window.innerWidth;
  rect.value = isVisible ? box! : null;
};

const focusPrimary = async () => {
  await nextTick();
  primaryButton.value?.focus();
};

const prepareStep = async () => {
  clearTimeout(settleTimer);
  if (props.phase !== 'steps') {
    isSettled.value = true;
    measure();
    return;
  }

  isSettled.value = false;
  let delay = 0;
  if (props.step.needsSidebar) {
    emit('sidebar', true);
    if (isNarrow()) delay = SIDEBAR_TRANSITION_MS;
  } else if (isNarrow()) {
    emit('sidebar', false);
    delay = SIDEBAR_TRANSITION_MS;
  }

  await nextTick();
  measure();
  settleTimer = setTimeout(async () => {
    isSettled.value = true;
    await nextTick();
    measure();
    void focusPrimary();
  }, delay);
};

watch(() => [props.phase, props.stepIndex], prepareStep, { immediate: true });
watch(() => props.phase, (phase) => {
  if (phase === 'intro') void focusPrimary();
}, { immediate: true, flush: 'post' });

const onKeydown = (event: KeyboardEvent) => {
  if (props.phase === 'idle') return;

  if (event.key === 'Escape') {
    event.preventDefault();
    emit('skip');
    return;
  }
  if (props.phase === 'steps') {
    if (event.key === 'ArrowRight') emit('next');
    if (event.key === 'ArrowLeft') emit('previous');
  }
  if (event.key === 'Tab' && popover.value) {
    const items = Array.from(popover.value.querySelectorAll<HTMLElement>('button:not([disabled])'));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    } else if (!popover.value.contains(active)) {
      event.preventDefault();
      first.focus();
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('resize', measure);
  window.addEventListener('scroll', measure, true);
});

onBeforeUnmount(() => {
  clearTimeout(settleTimer);
  window.removeEventListener('keydown', onKeydown);
  window.removeEventListener('resize', measure);
  window.removeEventListener('scroll', measure, true);
});

const spotlightStyle = computed(() => {
  if (!rect.value) return undefined;
  const pad = SPOTLIGHT_PADDING_PX;
  return {
    top: `${rect.value.top - pad}px`,
    left: `${rect.value.left - pad}px`,
    width: `${rect.value.width + pad * 2}px`,
    height: `${rect.value.height + pad * 2}px`,
  };
});

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

const popoverStyle = computed(() => {
  const { width, height } = viewport.value;
  const popoverWidth = Math.min(POPOVER_WIDTH_PX, width - VIEWPORT_MARGIN_PX * 2);

  // Telas pequenas: o popup vira uma folha fixa na base, sem competir com o menu.
  if (isCompact.value) {
    return { left: `${VIEWPORT_MARGIN_PX}px`, right: `${VIEWPORT_MARGIN_PX}px`, bottom: `${VIEWPORT_MARGIN_PX}px` };
  }

  if (!rect.value) {
    return {
      top: '50%',
      left: '50%',
      width: `${popoverWidth}px`,
      transform: 'translate(-50%, -50%)',
    };
  }

  const box = rect.value;
  if (props.step.placement === 'right') {
    return {
      top: `${clamp(box.top + box.height / 2 - popoverHeight.value / 2, VIEWPORT_MARGIN_PX, height - popoverHeight.value - VIEWPORT_MARGIN_PX)}px`,
      left: `${box.right + SPOTLIGHT_PADDING_PX + POPOVER_GAP_PX}px`,
      width: `${popoverWidth}px`,
    };
  }

  return {
    top: `${box.bottom + SPOTLIGHT_PADDING_PX + POPOVER_GAP_PX}px`,
    left: `${clamp(box.right - popoverWidth, VIEWPORT_MARGIN_PX, width - popoverWidth - VIEWPORT_MARGIN_PX)}px`,
    width: `${popoverWidth}px`,
  };
});

const progressLabel = computed(() => `${props.stepIndex + 1} de ${props.totalSteps}`);
</script>

<template>
  <Teleport to="body">
    <Transition name="tour-fade">
      <!-- Convite inicial -->
      <div
        v-if="phase === 'intro'"
        class="fixed inset-0 z-[200] flex items-center justify-center bg-gci/70 p-4 backdrop-blur-sm"
      >
        <div
          ref="popover"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-intro-title"
          class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        >
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gci text-agro-orange">
            <Compass :size="26" />
          </div>
          <h2 id="tour-intro-title" class="text-xl font-bold tracking-tight text-gci sm:text-2xl">
            {{ TOUR_INTRO.title }}
          </h2>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ TOUR_INTRO.body }}</p>
          <div class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              class="rounded-xl px-5 py-3 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
              @click="emit('skip')"
            >
              {{ TOUR_INTRO.skipLabel }}
            </button>
            <button
              ref="primaryButton"
              type="button"
              class="rounded-xl bg-gci px-6 py-3 text-sm font-bold text-white shadow-lg shadow-gci/10 transition-all hover:bg-gci-hover active:scale-95"
              @click="emit('start')"
            >
              {{ TOUR_INTRO.startLabel }}
            </button>
          </div>
        </div>
      </div>

      <!-- Passos com destaque -->
      <div v-else-if="phase === 'steps'" class="fixed inset-0 z-[200]">
        <!-- Bloqueia cliques no portal enquanto o tour está aberto -->
        <div class="absolute inset-0" aria-hidden="true" />

        <div
          v-if="spotlightStyle"
          class="pointer-events-none absolute rounded-2xl shadow-[0_0_0_9999px_rgba(4,26,32,0.72)] ring-2 ring-white/70 transition-all duration-300 motion-reduce:transition-none"
          :style="spotlightStyle"
          aria-hidden="true"
        />
        <div v-else class="absolute inset-0 bg-gci/70" aria-hidden="true" />

        <div
          v-show="isSettled"
          ref="popover"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-step-title"
          class="absolute rounded-2xl bg-white p-5 shadow-2xl transition-all duration-300 motion-reduce:transition-none"
          :style="popoverStyle"
        >
          <div class="flex items-start justify-between gap-3">
            <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400" aria-live="polite">
              {{ progressLabel }}
            </p>
            <button
              type="button"
              class="-mr-1 -mt-1 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label="Pular tutorial"
              @click="emit('skip')"
            >
              <X :size="16" />
            </button>
          </div>

          <h2 id="tour-step-title" class="mt-1 text-base font-bold text-gci">{{ step.title }}</h2>
          <p class="mt-1.5 text-sm leading-relaxed text-slate-600">{{ step.body }}</p>

          <div class="mt-4 flex items-center justify-between gap-2">
            <button
              type="button"
              class="rounded-lg px-2 py-2 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-800"
              @click="emit('skip')"
            >
              Pular
            </button>
            <div class="flex items-center gap-2">
              <button
                v-if="!isFirstStep"
                type="button"
                class="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50"
                @click="emit('previous')"
              >
                <ArrowLeft :size="14" />
                Anterior
              </button>
              <button
                ref="primaryButton"
                type="button"
                class="flex items-center gap-1 rounded-xl bg-gci px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-gci-hover"
                @click="emit('next')"
              >
                {{ isLastStep ? 'Concluir' : 'Próximo' }}
                <ArrowRight v-if="!isLastStep" :size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.tour-fade-enter-active,
.tour-fade-leave-active {
  transition: opacity 0.25s ease;
}
.tour-fade-enter-from,
.tour-fade-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .tour-fade-enter-active,
  .tour-fade-leave-active {
    transition: none;
  }
}
</style>
