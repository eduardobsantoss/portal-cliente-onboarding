<script setup lang="ts">
import { Upload } from 'lucide-vue-next';

/** Área tracejada "clique ou arraste" dos modais de envio de arquivos. */
defineProps<{
  title: string;
  hint: string;
  className: string;
  iconBoxClassName: string;
}>();

const emit = defineEmits<{ click: [] }>();
</script>

<template>
  <div @click="emit('click')" :class="className">
    <div :class="iconBoxClassName">
      <Upload :size="32" />
    </div>
    <div class="text-center">
      <p class="text-xl font-bold text-gci">{{ title }}</p>
      <p class="text-xs text-slate-400 mt-2 font-medium uppercase tracking-widest">{{ hint }}</p>
    </div>
  </div>
</template>
