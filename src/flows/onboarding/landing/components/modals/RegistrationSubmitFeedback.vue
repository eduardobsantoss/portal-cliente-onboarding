<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { motion } from 'motion-v';
import { Check } from 'lucide-vue-next';
import Logo from '../layout/Logo.vue';
import TcButton from '@/components/theme/TcButton.vue';

/**
 * Resposta visual do envio do cadastro (estilo app de banco digital): primeiro uma tela de
 * "processando" com etapas que vão sendo concluídas, depois uma confirmação com check animado.
 * É só apresentação (nada é enviado de verdade). Não avança sozinha: só o botão "Continuar"
 * dispara `done` e libera o fluxo.
 */
const props = defineProps<{
  /** Primeiro nome de quem se cadastrou, para personalizar a confirmação. */
  firstName?: string;
}>();

const emit = defineEmits<{
  done: [];
}>();

const STEPS = ['Validando seus dados', 'Criando seu acesso', 'Preparando o seu portal'];
const STEP_INTERVAL_MS = 800;

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const phase = ref<'processing' | 'success'>('processing');
const completedSteps = ref(0);
const continueButton = ref<InstanceType<typeof TcButton> | null>(null);

let stepTimer: ReturnType<typeof setInterval> | undefined;
let finished = false;

const title = computed(() =>
  phase.value === 'processing'
    ? 'Estamos criando o seu acesso'
    : props.firstName
      ? `Tudo certo, ${props.firstName}!`
      : 'Tudo certo!',
);

const finish = () => {
  if (finished) return;
  finished = true;
  emit('done');
};

const showSuccess = async () => {
  phase.value = 'success';
  await nextTick();
  (continueButton.value?.$el as HTMLElement | undefined)?.focus();
};

onMounted(() => {
  stepTimer = setInterval(() => {
    completedSteps.value += 1;
    if (completedSteps.value >= STEPS.length) {
      clearInterval(stepTimer);
      // Pequena pausa para o último item aparecer concluído antes da confirmação.
      setTimeout(showSuccess, 450);
    }
  }, STEP_INTERVAL_MS);
});

onBeforeUnmount(() => {
  clearInterval(stepTimer);
});
</script>

<template>
  <motion.div
    :initial="prefersReducedMotion ? false : { opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 0.3 }"
    class="fixed inset-0 z-10 overflow-y-auto bg-[var(--surface-brand)] px-[var(--page-gutter)] py-[var(--space-6)] text-center text-[color:var(--text-on-brand)]"
  >
    <div class="mx-auto flex min-h-full w-full max-w-[420px] flex-col items-center justify-center gap-[var(--space-6)]">
      <Logo variant="dark" class-name="h-[68px] shrink-0" />

      <!-- Indicador: anel girando enquanto processa, check desenhado ao concluir -->
      <div class="relative flex size-[84px] shrink-0 items-center justify-center" aria-hidden="true">
        <div
          v-if="phase === 'processing'"
          class="absolute inset-0 rounded-full border-[3px] border-white/20 border-t-white motion-safe:animate-spin"
        />
        <motion.div
          v-else
          :initial="prefersReducedMotion ? false : { scale: 0.6, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 260, damping: 18 }"
          class="flex size-full items-center justify-center rounded-full bg-[var(--success-base)]"
        >
          <svg viewBox="0 0 52 52" class="size-[52px]" fill="none">
            <motion.path
              d="M14 27 L23 36 L39 17"
              stroke="white"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :initial="prefersReducedMotion ? false : { pathLength: 0 }"
              :animate="{ pathLength: 1 }"
              :transition="{ duration: 0.45, delay: 0.2, ease: 'easeOut' }"
            />
          </svg>
        </motion.div>
      </div>

      <div aria-live="polite" class="flex flex-col items-center gap-[var(--space-3)]">
        <h2
          id="registration-feedback-title"
          class="m-0 text-[length:var(--text-2xl)] font-[number:var(--weight-bold)] leading-tight"
        >
          {{ title }}
        </h2>
        <p
          v-if="phase === 'success'"
          class="m-0 max-w-[36ch] text-[length:var(--text-md)] leading-[var(--leading-body)] text-[color:var(--text-on-brand-muted)]"
        >
          Seu acesso foi criado. Vamos iniciar a sua jornada de crédito.
        </p>
      </div>

      <ul v-if="phase === 'processing'" class="m-0 flex list-none flex-col gap-[var(--space-3)] p-0 text-left">
        <li
          v-for="(step, index) in STEPS"
          :key="step"
          class="flex items-center gap-[var(--space-3)] text-[length:var(--text-base)] transition-opacity duration-300"
          :class="index <= completedSteps ? 'opacity-100' : 'opacity-40'"
        >
          <span
            class="flex size-[22px] shrink-0 items-center justify-center rounded-full border border-white/40"
            :class="index < completedSteps ? 'border-transparent bg-[var(--success-base)]' : ''"
          >
            <Check v-if="index < completedSteps" :size="14" :stroke-width="3" aria-hidden="true" />
          </span>
          {{ step }}
        </li>
      </ul>

      <TcButton
        v-else
        ref="continueButton"
        variant="inverse"
        arrow
        class="w-full"
        @click="finish"
      >
        Continuar
      </TcButton>
    </div>
  </motion.div>
</template>
