<script setup lang="ts">
import { computed, type Component } from 'vue';

type AlertTone = 'danger' | 'warning';

const props = withDefaults(
  defineProps<{
    tone: AlertTone;
    withBottomMargin?: boolean;
    icon: Component;
  }>(),
  { withBottomMargin: false },
);

const BANNER_CLASS: Record<AlertTone, string> = {
  danger: 'bg-red-50/50 border border-red-100 p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-8 shadow-sm',
  warning: 'bg-orange-50/50 border border-agro-orange/20 p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-8 shadow-sm',
};

const ICON_BOX_CLASS: Record<AlertTone, string> = {
  danger: 'w-16 h-16 rounded-3xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/20',
  warning: 'w-16 h-16 rounded-3xl bg-agro-orange text-white flex items-center justify-center shadow-lg shadow-agro-orange/20',
};

const bannerClass = computed(() =>
  props.withBottomMargin ? `mb-10 ${BANNER_CLASS[props.tone]}` : BANNER_CLASS[props.tone],
);
</script>

<!-- Faixa de alerta (recusa, pendência, validações) das telas de detalhes. -->
<template>
  <div :class="bannerClass">
    <div :class="ICON_BOX_CLASS[tone]">
      <component :is="icon" :size="32" />
    </div>
    <div class="flex-1 text-center md:text-left"><slot /></div>
    <slot name="actions" />
  </div>
</template>
