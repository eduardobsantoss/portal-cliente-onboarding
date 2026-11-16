<script setup lang="ts">
import { motion } from 'motion-v';
import AddressFields from '@/components/forms/AddressFields.vue';
import CheckboxField from '@/components/ui/CheckboxField.vue';
import type { AddressField, AddressValues } from '@/types/forms';

defineProps<{
  sameAsMain: boolean;
  title: string;
  address: AddressValues;
  logradouroLabel: string;
  complementoPlaceholder: string;
}>();

const emit = defineEmits<{
  sameAsMainChange: [checked: boolean];
  fieldChange: [field: AddressField, value: string];
}>();
</script>

<template>
  <div class="pt-2">
    <CheckboxField
      :checked="sameAsMain"
      label-class-name="flex items-center gap-2.5 cursor-pointer p-3 bg-slate-50 border border-slate-200/80 rounded-xl"
      span-class-name="text-xs font-semibold text-slate-800"
      @change="(checked) => emit('sameAsMainChange', checked)"
    >
      O endereço de correspondência é o mesmo
    </CheckboxField>

    <motion.div
      v-if="!sameAsMain"
      :initial="{ opacity: 0, height: 0 }"
      :animate="{ opacity: 1, height: 'auto' }"
      :exit="{ opacity: 0, height: 0 }"
      class="mt-4 p-4 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-4"
    >
      <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wider">{{ title }}</h4>
      <AddressFields
        :values="address"
        :required="!sameAsMain"
        cep-placeholder="00000-000"
        :logradouro-label="logradouroLabel"
        :complemento-placeholder="complementoPlaceholder"
        @field-change="(field, value) => emit('fieldChange', field, value)"
      />
    </motion.div>
  </div>
</template>
