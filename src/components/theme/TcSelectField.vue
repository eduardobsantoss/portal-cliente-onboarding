<script setup lang="ts">
import { computed } from 'vue';
import { AlertCircle, ChevronDown } from 'lucide-vue-next';

/** Mesma caixa, foco e erro do `TcTextField`, com `<select>` nativo. */
const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    modelValue?: string;
    options: { value: string; label: string }[];
    /** Texto da opção vazia (desabilitada) exibida enquanto nada foi escolhido. */
    placeholder?: string;
    /** Texto à direita do rótulo, ex.: "opcional". */
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
  }>(),
  { modelValue: '', required: false, disabled: false },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [event: Event];
  blur: [event: FocusEvent];
}>();

const errorId = computed(() => `${props.id}-error`);

const onChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
  emit('change', event);
};
</script>

<template>
  <div class="flex flex-col gap-[var(--space-2)]">
    <div class="flex items-baseline justify-between gap-[var(--space-3)]">
      <label
        :for="id"
        class="text-[length:var(--text-sm)] font-[number:var(--weight-semibold)] text-[color:var(--text-strong)]"
      >
        {{ label }}<template v-if="required"> *</template>
      </label>
      <span v-if="hint" class="text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
        {{ hint }}
      </span>
    </div>

    <div class="relative">
      <select
        :id="id"
        :disabled="disabled"
        :required="required"
        :aria-required="required ? 'true' : undefined"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error ? errorId : undefined"
        class="h-[var(--control-input)] w-full cursor-pointer appearance-none rounded-[var(--radius-input)] border bg-[var(--surface-card)] pl-[var(--space-5)] pr-[var(--space-12)] text-[length:var(--text-base)] transition-colors duration-[var(--duration-base)] focus:outline-none disabled:cursor-not-allowed disabled:bg-[var(--surface-soft)] disabled:opacity-60 motion-reduce:transition-none"
        :class="[
          error
            ? 'border-[color:var(--danger-base)] focus:shadow-[var(--focus-ring)]'
            : 'border-[color:var(--border-default)] focus:border-[color:var(--border-strong)] focus:shadow-[var(--focus-ring)]',
          modelValue ? 'text-[color:var(--text-strong)]' : 'text-[color:var(--text-muted)]',
        ]"
        @change="onChange"
        @blur="emit('blur', $event)"
      >
        <option v-if="placeholder" value="" disabled :selected="!modelValue">
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.value === modelValue"
          class="text-[color:var(--text-strong)]"
        >
          {{ option.label }}
        </option>
      </select>
      <ChevronDown
        class="pointer-events-none absolute right-[var(--space-5)] top-1/2 size-[calc(var(--space-4)+var(--space-1)/2)] -translate-y-1/2 text-[color:var(--text-strong)]"
        aria-hidden="true"
      />
    </div>

    <p
      v-if="error"
      :id="errorId"
      class="m-0 flex items-center gap-[var(--space-1)] text-[length:var(--text-xs)] text-[color:var(--danger-dark)]"
    >
      <AlertCircle class="size-[14px] shrink-0" aria-hidden="true" />
      {{ error }}
    </p>
  </div>
</template>
