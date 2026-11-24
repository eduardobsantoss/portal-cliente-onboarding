<script setup lang="ts">
import { ref } from 'vue';

/**
 * Abas em pílula (guidelines §7.3), para filtros de status e abas dentro de modais.
 * Setas esquerda/direita (e Home/End) movem entre as abas; só a aba ativa entra na ordem do Tab.
 */
interface Tab {
  value: string;
  label: string;
  count?: number;
}

const props = defineProps<{
  modelValue: string;
  tabs: Tab[];
  /** Vira o `aria-label` do tablist. */
  label: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const buttons = ref<(HTMLButtonElement | null)[]>([]);

const select = (index: number) => {
  const tab = props.tabs[index];
  if (!tab) return;
  emit('update:modelValue', tab.value);
  buttons.value[index]?.focus();
};

const onKeydown = (event: KeyboardEvent, index: number) => {
  const last = props.tabs.length - 1;
  const target =
    event.key === 'ArrowRight'
      ? (index + 1) % props.tabs.length
      : event.key === 'ArrowLeft'
        ? (index - 1 + props.tabs.length) % props.tabs.length
        : event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? last
            : null;
  if (target === null) return;
  event.preventDefault();
  select(target);
};
</script>

<template>
  <div class="max-w-full overflow-x-auto">
    <div
      role="tablist"
      :aria-label="props.label"
      class="inline-flex gap-[var(--space-1)] rounded-[var(--radius-full)] bg-[var(--surface-soft)] p-[calc(var(--space-1)+var(--space-1)/2)]"
    >
      <button
        v-for="(tab, index) in props.tabs"
        :key="tab.value"
        :ref="(el) => (buttons[index] = el as HTMLButtonElement | null)"
        type="button"
        role="tab"
        :aria-selected="tab.value === props.modelValue"
        :tabindex="tab.value === props.modelValue ? 0 : -1"
        class="inline-flex h-[var(--control-arrow)] cursor-pointer items-center whitespace-nowrap rounded-[var(--radius-full)] border-0 px-[var(--space-5)] text-[length:var(--text-xs)] font-[number:var(--weight-semibold)] transition-colors duration-[var(--duration-base)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
        :class="
          tab.value === props.modelValue
            ? 'bg-[var(--surface-brand)] text-[color:var(--text-on-brand)]'
            : 'bg-transparent text-[color:var(--text-strong)] hover:bg-[var(--surface-card)]'
        "
        @click="emit('update:modelValue', tab.value)"
        @keydown="onKeydown($event, index)"
      >
        {{ tab.label }}<template v-if="tab.count !== undefined">&nbsp;({{ tab.count }})</template>
      </button>
    </div>
  </div>
</template>
