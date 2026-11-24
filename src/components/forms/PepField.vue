<script setup lang="ts">
import CheckboxField from '@/components/ui/CheckboxField.vue';

defineProps<{
  checked: boolean;
  label: string;
}>();

const emit = defineEmits<{ change: [checked: boolean] }>();

/** Checkbox de Pessoa Politicamente Exposta; ocupa a linha inteira do grid do pai. */
</script>

<template>
  <div class="sm:col-span-2 pt-2 border-t border-slate-200/50 tc:border-[color:var(--border-subtle)] tc:pt-[var(--space-4)]">
    <CheckboxField
      :checked="checked"
      label-class-name="flex items-center gap-2 cursor-pointer"
      span-class-name="text-xs font-medium text-slate-700"
      @change="(value) => emit('change', value)"
    >
      {{ label }}
    </CheckboxField>
  </div>
</template>
