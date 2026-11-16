<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next';

/** Linha de arquivo selecionado (ícone, nome, detalhes e lixeira) dos modais de envio. */
defineProps<{
  name: string;
  className: string;
  iconBoxClassName: string;
}>();

const emit = defineEmits<{ remove: [] }>();
</script>

<template>
  <div :class="className">
    <div class="flex items-center gap-4">
      <div :class="iconBoxClassName"><slot name="icon" /></div>
      <div>
        <p class="font-bold text-sm text-gci">{{ name }}</p>
        <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest"><slot name="details" /></p>
      </div>
    </div>
    <button
      @click="emit('remove')"
      class="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
    >
      <Trash2 :size="20" />
    </button>
  </div>
</template>
