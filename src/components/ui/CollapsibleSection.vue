<script setup lang="ts">
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

defineProps<{
  isOpen: boolean;
  buttonClassName: string;
}>();

const emit = defineEmits<{ toggle: [] }>();

/*
 * Slots: header (conteúdo do botão) e o slot padrão (conteúdo exibido quando aberto).
 */
</script>

<template>
  <div class="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
    <button type="button" :class="buttonClassName" @click="emit('toggle')">
      <slot name="header" />
      <ChevronUp v-if="isOpen" :size="16" class="text-slate-500" />
      <ChevronDown v-else :size="16" class="text-slate-500" />
    </button>

    <slot v-if="isOpen" />
  </div>
</template>
