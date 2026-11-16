<script setup lang="ts">
import { cn } from '@/utils/cn';
import { OPERATION_JOURNEY } from '@/mocks/operationDetails';

/** Linha do tempo vertical da jornada da operação (painel esquerdo). */
</script>

<template>
  <div class="pt-8 flex-1">
    <p class="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-6">Jornada da Operação</p>
    <div class="relative space-y-8 pl-1">
      <!-- Vertical Connection Line -->
      <div class="absolute left-4 top-4 bottom-4 w-[2px] bg-white/10 z-0" />

      <div v-for="(step, i) in OPERATION_JOURNEY" :key="i" class="flex items-start gap-6 relative z-10 group">
        <!-- Dot / Icon Bubble -->
        <div
          :class="`w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 ${
            step.status === 'COMPLETO'
              ? 'bg-agro-orange text-white shadow-[0_0_15px_rgba(242,125,38,0.3)]'
              : step.status === 'ATUAL'
                ? 'bg-white text-gci animate-pulse ring-4 ring-white/10'
                : 'bg-gci border-2 border-white/10 text-white/20'
          }`"
        >
          <component :is="step.icon" :size="14" />
        </div>

        <div :class="cn('pt-0.5', step.status === 'PENDENTE' ? 'opacity-30' : 'opacity-100')">
          <p
            :class="`text-xs font-black uppercase tracking-widest mb-1 ${
              step.status === 'ATUAL' ? 'text-agro-orange' : 'text-white'
            }`"
          >
            {{ step.label }}
          </p>
          <div class="flex items-center gap-2">
            <span class="text-[9px] text-white/40 font-bold uppercase">{{ step.date }}</span>
            <span class="text-[9px] text-white/40 font-bold underline decoration-white/10">{{ step.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
