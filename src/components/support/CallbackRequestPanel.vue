<script setup lang="ts">
import { Check } from 'lucide-vue-next';

defineProps<{
  callbackRequested: boolean;
  phone: string;
  notes: string;
}>();

const emit = defineEmits<{
  phoneChange: [value: string];
  notesChange: [value: string];
  request: [];
  reset: [];
}>();
</script>

<template>
  <div>
    <div v-if="callbackRequested" class="py-8 text-center space-y-3">
      <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
        <Check :size="24" :stroke-width="3" />
      </div>
      <h4 class="text-sm font-bold text-slate-800">Solicitação Registrada</h4>
      <p class="text-xs text-slate-500 max-w-sm mx-auto">
        Um analista da nossa equipe de crédito entrará em contato pelo telefone <span class="font-semibold text-slate-700">{{ phone }}</span> em até 30 minutos.
      </p>
      <button
        class="mt-2 text-xs text-gci underline font-bold"
        @click="emit('reset')"
      >
        Fazer nova solicitação
      </button>
    </div>
    <form
      v-else
      class="space-y-4"
      @submit.prevent="emit('request')"
    >
      <div class="space-y-1.5">
        <label class="text-xs font-bold text-slate-700">Telefone para contato</label>
        <input
          type="text"
          :value="phone"
          class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-gci"
          required
          @input="emit('phoneChange', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="space-y-1.5">
        <label class="text-xs font-bold text-slate-700">Qual é a sua dúvida ou dificuldade?</label>
        <textarea
          :value="notes"
          :rows="3"
          placeholder="Ex: Preciso de ajuda para obter o recibo do IRPF ou o demonstrativo de endividamento..."
          class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-gci"
          @input="emit('notesChange', ($event.target as HTMLTextAreaElement).value)"
        />
      </div>

      <button
        type="submit"
        class="w-full py-3 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
      >
        Solicitar Ligação de Suporte
      </button>
    </form>
  </div>
</template>
