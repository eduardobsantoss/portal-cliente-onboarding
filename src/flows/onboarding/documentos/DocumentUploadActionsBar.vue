<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';

defineProps<{
  isAllMandatoryUploaded: boolean;
  hasPendingRegularization: boolean;
  hasRegularization: boolean;
}>();

const emit = defineEmits<{
  back: [];
  submit: [];
}>();
</script>

<template>
  <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
    <button
      type="button"
      class="w-full sm:w-auto px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
      @click="emit('back')"
    >
      <ArrowLeft :size="16" />
      Voltar aos Dados Complementares
    </button>

    <button
      type="button"
      :disabled="!isAllMandatoryUploaded || hasPendingRegularization"
      :class="[
        'w-full sm:w-auto px-8 py-3.5 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg',
        isAllMandatoryUploaded && !hasPendingRegularization
          ? 'bg-gci hover:bg-gci-hover text-white shadow-gci/10 cursor-pointer active:scale-95'
          : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none',
      ]"
      @click="emit('submit')"
    >
      <span>
        {{ hasRegularization ? 'Reenviar Documentos e Avançar' : 'Avançar para Assinatura da Abertura' }}
      </span>
      <ArrowRight :size="18" />
    </button>
  </div>
</template>
