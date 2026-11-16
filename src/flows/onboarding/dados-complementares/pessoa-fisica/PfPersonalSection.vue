<script setup lang="ts">
import { User } from 'lucide-vue-next';
import MaritalStatusFields from '@/components/forms/MaritalStatusFields.vue';
import PersonFields from '@/components/forms/PersonFields.vue';
import SectionTitle from '@/components/forms/SectionTitle.vue';
import {
  PF_PERSON_FIELDS,
  PF_PERSON_LABELS,
  PF_PERSON_PLACEHOLDERS,
  PF_RENDA_NOTICE,
} from '@/constants/complementaryForm';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import type { PfFormData } from '@/types/dadosComplementares';
import { applyMaritalStatusChange } from '@/utils/maritalStatus';

defineProps<{
  pfData: PfFormData;
  setPfData: SetState<PfFormData>;
  hasDataErrors: boolean;
}>();
</script>

<template>
  <div class="space-y-4">
    <SectionTitle>
      <template #icon><User :size="18" class="text-gci" /></template>
      1. Dados Pessoais (Obrigatórios)
    </SectionTitle>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      <PersonFields
        :values="pfData"
        :fields="PF_PERSON_FIELDS"
        :labels="PF_PERSON_LABELS"
        :placeholders="PF_PERSON_PLACEHOLDERS"
        :renda-notice="hasDataErrors ? PF_RENDA_NOTICE : undefined"
        @field-change="(field, value) => setPfData({ ...pfData, [field]: value })"
      />

      <MaritalStatusFields
        :values="pfData"
        @estado-civil-change="
          (estadoCivil) => setPfData((prev) => applyMaritalStatusChange(prev, estadoCivil))
        "
        @field-change="(field, value) => setPfData({ ...pfData, [field]: value })"
      />
    </div>
  </div>
</template>
