<script setup lang="ts">
import type { TermsDocumentType } from '@/types/terms';

defineProps<{
  accepted: boolean;
}>();

const emit = defineEmits<{
  acceptedChange: [accepted: boolean];
  openDocument: [type: TermsDocumentType];
}>();
</script>

<template>
  <label class="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50/70 transition-colors cursor-pointer select-none">
    <input
      type="checkbox"
      :checked="accepted"
      @change="emit('acceptedChange', ($event.target as HTMLInputElement).checked)"
      class="mt-0.5 w-5 h-5 rounded border-slate-300 text-gci focus:ring-gci cursor-pointer shrink-0"
    />
    <div class="text-xs leading-relaxed text-slate-700">
      <span class="font-bold text-slate-900">
        Declaro que li e concordo integralmente com os{{ ' ' }}
      </span>
      <button
        type="button"
        @click.prevent="emit('openDocument', 'terms')"
        class="font-bold text-gci underline underline-offset-2 hover:text-agro-orange inline transition-colors"
      >
        Termos de Uso
      </button>
      <span class="font-bold text-slate-900">{{ ' e a ' }}</span>
      <button
        type="button"
        @click.prevent="emit('openDocument', 'privacy')"
        class="font-bold text-gci underline underline-offset-2 hover:text-agro-orange inline transition-colors"
      >
        Política de Privacidade
      </button>
      <span class="text-slate-900 font-bold">{{ ' da plataforma.' }}</span>
      <p class="text-[11px] text-slate-400 mt-1.5">
        Ao avançar, você confirma a autorização para tratamento dos dados cadastrais e envio das informações necessárias para análise.
      </p>
    </div>
  </label>
</template>
