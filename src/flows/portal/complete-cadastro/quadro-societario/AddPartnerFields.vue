<script setup lang="ts">
import { computed } from 'vue';
import {
  PARTNER_MARITAL_STATUS_OPTIONS,
  PF_PARTNER_ROLE_OPTIONS,
  PJ_PARTNER_ROLE_OPTIONS,
} from '@/constants/documentChecklist';
import type { NewPartnerForm } from '@/types/documentChecklist';
import PartnerFormSelect from './PartnerFormSelect.vue';
import PartnerTextField from './PartnerTextField.vue';

const props = defineProps<{
  values: NewPartnerForm;
}>();

const emit = defineEmits<{
  <K extends keyof NewPartnerForm>(e: 'fieldChange', field: K, value: NewPartnerForm[K]): void;
}>();

const isPJ = computed(() => props.values.type === 'PJ');

/** Campos do formulário "Adicionar Parte Relacionada" (rótulos e opções mudam conforme PF/PJ). */
</script>

<template>
  <PartnerTextField
    :label="isPJ ? 'Razão Social / Nome da Empresa' : 'Nome Completo'"
    required
    :value="values.name"
    :placeholder="isPJ ? 'Ex: Agro Holding Participações S/A' : 'Nome completo da parte'"
    @change="(value) => emit('fieldChange', 'name', value)"
  />

  <div class="grid grid-cols-2 gap-3">
    <PartnerTextField
      :label="isPJ ? 'CNPJ' : 'CPF'"
      required
      :value="values.cpf"
      :placeholder="isPJ ? '00.000.000/0001-00' : '000.000.000-00'"
      @change="(value) => emit('fieldChange', 'cpf', value)"
    />

    <PartnerTextField
      label="Participação (%)"
      type="number"
      :value="values.quotaPercentage"
      @change="(value) => emit('fieldChange', 'quotaPercentage', Number(value))"
    />
  </div>

  <div :class="`grid ${isPJ ? 'grid-cols-1' : 'grid-cols-2'} gap-3`">
    <PartnerFormSelect
      label="Cargo / Função"
      :value="values.role"
      :options="isPJ ? PJ_PARTNER_ROLE_OPTIONS : PF_PARTNER_ROLE_OPTIONS"
      @change="(value) => emit('fieldChange', 'role', value)"
    />

    <PartnerFormSelect
      v-if="values.type === 'PF'"
      label="Estado Civil"
      :value="values.maritalStatus"
      :options="PARTNER_MARITAL_STATUS_OPTIONS"
      @change="(value) => emit('fieldChange', 'maritalStatus', value)"
    />
  </div>
</template>
