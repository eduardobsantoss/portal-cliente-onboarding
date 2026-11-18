<script setup lang="ts">
import { computed } from 'vue';
import { User } from 'lucide-vue-next';
import MaritalStatusFields from '@/components/forms/MaritalStatusFields.vue';
import PersonFields from '@/components/forms/PersonFields.vue';
import SectionTitle from '@/components/forms/SectionTitle.vue';
import TextField from '@/components/ui/TextField.vue';
import {
  PF_PERSON_FIELDS,
  PF_PERSON_LABELS,
  PF_PERSON_PLACEHOLDERS,
  PF_RENDA_NOTICE,
} from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import type { PfFormData, PfLockedField } from '@/types/dadosComplementares';
import type { PersonField } from '@/types/forms';
import { applyMaritalStatusChange } from '@/utils/maritalStatus';

const props = defineProps<{
  pfData: PfFormData;
  setPfData: SetState<PfFormData>;
  hasDataErrors: boolean;
  lockedFields: readonly PfLockedField[];
}>();

const isNameLocked = computed(() => props.lockedFields.includes('nome'));
const lockedPersonFields = computed(() =>
  PF_PERSON_FIELDS.filter((field: PersonField) => props.lockedFields.includes(field)),
);
</script>

<template>
  <div class="space-y-4">
    <SectionTitle>
      <template #icon><User :size="18" class="text-gci" /></template>
      1. Dados Pessoais (Obrigatórios)
    </SectionTitle>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      <TextField
        wrapper-class-name="sm:col-span-2"
        required
        :read-only="isNameLocked"
        :value="pfData.nome"
        :input-class-name="
          isNameLocked ? FIELD_VARIANT_STYLES.page.readOnlyInput : FIELD_VARIANT_STYLES.page.input
        "
        @change="setPfData({ ...pfData, nome: $event })"
      >
        <template #label>Nome Completo *</template>
      </TextField>

      <PersonFields
        :values="pfData"
        :fields="PF_PERSON_FIELDS"
        :labels="PF_PERSON_LABELS"
        :placeholders="PF_PERSON_PLACEHOLDERS"
        :read-only-fields="lockedPersonFields"
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
