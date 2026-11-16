<script setup lang="ts">
import { computed } from 'vue';
import SelectField from '@/components/ui/SelectField.vue';
import TextField from '@/components/ui/TextField.vue';
import { ESTADOS_CIVIS, REGIMES_DE_BENS } from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import type { FieldVariant, MaritalStatusField, MaritalStatusValues } from '@/types/forms';
import { hasSpouse } from '@/utils/maritalStatus';

const props = withDefaults(
  defineProps<{
    values: MaritalStatusValues;
    variant?: FieldVariant;
  }>(),
  { variant: 'page' },
);

const emit = defineEmits<{
  estadoCivilChange: [estadoCivil: string];
  fieldChange: [field: MaritalStatusField, value: string];
}>();

const styles = computed(() => FIELD_VARIANT_STYLES[props.variant]);

/** Estado civil + (se casado/união estável) cônjuge, CPF e regime de bens. Renderiza células do grid do pai. */
</script>

<template>
  <SelectField
    required
    :value="values.estadoCivil"
    :options="ESTADOS_CIVIS"
    :input-class-name="styles.input"
    @change="(value) => emit('estadoCivilChange', value)"
  >
    <template #label>Estado Civil *</template>
  </SelectField>

  <template v-if="hasSpouse(values.estadoCivil)">
    <TextField
      required
      placeholder="Nome completo do cônjuge"
      :value="values.nomeConjuge"
      :input-class-name="styles.filledInput"
      @change="(value) => emit('fieldChange', 'nomeConjuge', value)"
    >
      <template #label>Nome do Cônjuge *</template>
    </TextField>

    <TextField
      required
      placeholder="000.000.000-00"
      :value="values.cpfConjuge"
      :input-class-name="styles.filledInput"
      @change="(value) => emit('fieldChange', 'cpfConjuge', value)"
    >
      <template #label>CPF do Cônjuge *</template>
    </TextField>

    <SelectField
      wrapper-class-name="sm:col-span-2"
      required
      :value="values.regimeBens || REGIMES_DE_BENS[0]"
      :options="REGIMES_DE_BENS"
      :input-class-name="styles.filledInput"
      @change="(value) => emit('fieldChange', 'regimeBens', value)"
    >
      <template #label>Regime de Bens *</template>
    </SelectField>
  </template>
</template>
