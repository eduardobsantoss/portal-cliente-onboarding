<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import { cn } from '@/utils/cn';

defineProps<{
  termsAccepted: boolean;
}>();

const emit = defineEmits<{
  termsAcceptedChange: [accepted: boolean];
  recusar: [];
  confirm: [];
}>();

const showTerms = () => {
  alert('Termos da Operação: ...');
};
</script>

<template>
  <div class="space-y-6 pt-6">
    <div class="flex flex-col items-center gap-4">
      <label class="flex items-center gap-3 cursor-pointer group">
        <div class="relative">
          <input
            type="checkbox"
            id="final-terms-checkbox"
            :checked="termsAccepted"
            class="peer sr-only"
            @change="emit('termsAcceptedChange', ($event.target as HTMLInputElement).checked)"
          />
          <div
            :class="cn(
              'w-6 h-6 border-2 rounded-lg transition-all flex items-center justify-center',
              termsAccepted ? 'bg-agro-orange border-agro-orange' : 'border-slate-200 group-hover:border-agro-orange'
            )"
          >
            <Check :size="14" :class="cn('text-white transition-transform', termsAccepted ? 'scale-100' : 'scale-0')" />
          </div>
        </div>
        <span class="text-xs font-bold text-slate-500 group-hover:text-gci transition-colors">
          Eu concordo com o resumo acima e com os <button class="text-agro-orange hover:underline" @click.stop="showTerms">Termos da Operação</button>
        </span>
      </label>
    </div>

    <div class="flex justify-center gap-4">
      <button
        class="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
        @click="emit('recusar')"
      >
        Recusar
      </button>
      <button
        :disabled="!termsAccepted"
        :class="cn(
          'px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl',
          termsAccepted
            ? 'bg-gci text-white shadow-gci/20 hover:scale-105'
            : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
        )"
        @click="emit('confirm')"
      >
        Confirmar e Assinar
      </button>
    </div>
  </div>
</template>
