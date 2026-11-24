<script setup lang="ts">
import { computed } from 'vue';
import { AlertCircle } from 'lucide-vue-next';

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    modelValue?: string;
    type?: string;
    placeholder?: string;
    /** Texto à direita do rótulo, ex.: "14 dígitos". */
    hint?: string;
    error?: string;
    required?: boolean;
    inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
    autocomplete?: string;
    maxlength?: number;
  }>(),
  { modelValue: '', type: 'text', required: false },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  input: [event: Event];
  blur: [event: FocusEvent];
}>();

const errorId = computed(() => `${props.id}-error`);

// Repassa o evento nativo: as máscaras existentes (@input) continuam funcionando.
const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
  emit('input', event);
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
      <!-- Slot opcional à direita do rótulo (ex.: link "Esqueci a senha"); sem ele, mostra `hint`. -->
      <slot name="label-aside">
        <span
          v-if="hint"
          class="text-[length:var(--text-xs)] text-[color:var(--text-muted)]"
        >
          {{ hint }}
        </span>
      </slot>
    </div>

    <div class="relative">
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      :maxlength="maxlength"
      :required="required"
      :aria-required="required ? 'true' : undefined"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="error ? errorId : undefined"
      class="h-[var(--control-input)] w-full rounded-[var(--radius-input)] border bg-[var(--surface-card)] px-[var(--space-5)] text-[length:var(--text-base)] text-[color:var(--text-strong)] transition-colors duration-[var(--duration-base)] placeholder:text-[color:var(--text-muted)] focus:outline-none motion-reduce:transition-none"
      :class="[
        error
          ? 'border-[color:var(--danger-base)] focus:shadow-[var(--focus-ring)]'
          : 'border-[color:var(--border-default)] focus:border-[color:var(--border-strong)] focus:shadow-[var(--focus-ring)]',
        $slots.trailing ? 'pr-[var(--space-14)]' : '',
      ]"
      @input="onInput"
      @blur="emit('blur', $event)"
    />
    <!-- Slot opcional dentro do campo, à direita (ex.: botão de mostrar/ocultar senha). -->
    <div
      v-if="$slots.trailing"
      class="absolute right-[var(--space-2)] top-1/2 flex -translate-y-1/2 items-center"
    >
      <slot name="trailing" />
    </div>
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
