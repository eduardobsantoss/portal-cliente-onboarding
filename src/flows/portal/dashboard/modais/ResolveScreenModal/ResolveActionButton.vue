<script setup lang="ts">
import type { Component } from 'vue';
import { CheckCircle2 } from 'lucide-vue-next';
import { cn } from '@/utils/cn';

/** Botão de ação da tela de resolução (vira "enviado" e fica desabilitado quando concluído). */
defineProps<{
  done?: boolean;
  label: string;
  doneLabel: string;
  icon: Component;
  todoClassName: string;
}>();

const emit = defineEmits<{ click: [] }>();
</script>

<template>
  <button
    :disabled="done"
    @click.stop="emit('click')"
    :class="cn(
      'flex flex-col items-center gap-1 p-3 px-6 rounded-2xl transition-all border shrink-0',
      done
        ? 'bg-green-50 border-green-100 text-green-600'
        : todoClassName
    )"
  >
    <CheckCircle2 v-if="done" :size="16" />
    <component :is="icon" v-else :size="16" />
    <span class="text-[9px] font-black uppercase tracking-widest">{{ done ? doneLabel : label }}</span>
  </button>
</template>
