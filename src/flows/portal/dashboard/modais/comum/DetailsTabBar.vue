<script setup lang="ts" generic="TTab extends string">
import { motion } from 'motion-v';

interface DetailsTab<T extends string> {
  id: T;
  label: string;
}

/** Abas dos detalhes (operação/título) com indicador animado. */
defineProps<{
  tabs: DetailsTab<TTab>[];
  activeTab: TTab;
  indicatorLayoutId: string;
  containerClassName: string;
  buttonClassName: string;
}>();

const emit = defineEmits<{ change: [tab: TTab] }>();
</script>

<template>
  <div :class="containerClassName">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="emit('change', tab.id)"
      :class="`${buttonClassName} ${
        activeTab === tab.id
          ? 'text-gci'
          : 'text-gray-300 hover:text-gray-400'
      }`"
    >
      {{ tab.label }}
      <motion.div
        v-if="activeTab === tab.id"
        :layout-id="indicatorLayoutId"
        class="absolute bottom-0 left-0 right-0 h-1 bg-gci rounded-full"
      />
    </button>
  </div>
</template>
