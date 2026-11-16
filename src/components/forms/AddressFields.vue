<script setup lang="ts">
import { computed } from 'vue';
import TextField from '@/components/ui/TextField.vue';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import type { AddressField, AddressValues, FieldVariant } from '@/types/forms';

const props = withDefaults(
  defineProps<{
    values: AddressValues;
    variant?: FieldVariant;
    /** obrigatoriedade dos campos (complemento nunca é obrigatório) */
    required?: boolean;
    logradouroLabel?: string;
    ufLabel?: string;
    complementoPlaceholder?: string;
    cepPlaceholder?: string;
  }>(),
  {
    variant: 'page',
    required: true,
    logradouroLabel: 'Logradouro / Rua *',
    ufLabel: 'Estado (UF) *',
  },
);

const emit = defineEmits<{ fieldChange: [field: AddressField, value: string] }>();

const styles = computed(() => FIELD_VARIANT_STYLES[props.variant]);
</script>

<template>
  <div :class="styles.addressGrid">
    <TextField
      :required="required"
      :placeholder="cepPlaceholder"
      :value="values.cep"
      :input-class-name="styles.input"
      @change="(value) => emit('fieldChange', 'cep', value)"
    >
      <template #label>CEP *</template>
    </TextField>

    <TextField
      wrapper-class-name="sm:col-span-2"
      :required="required"
      :value="values.logradouro"
      :input-class-name="styles.input"
      @change="(value) => emit('fieldChange', 'logradouro', value)"
    >
      <template #label>{{ logradouroLabel }}</template>
    </TextField>

    <TextField
      :required="required"
      :value="values.numero"
      :input-class-name="styles.input"
      @change="(value) => emit('fieldChange', 'numero', value)"
    >
      <template #label>Número *</template>
    </TextField>

    <TextField
      :placeholder="complementoPlaceholder"
      :value="values.complemento"
      :input-class-name="styles.input"
      @change="(value) => emit('fieldChange', 'complemento', value)"
    >
      <template #label>Complemento</template>
    </TextField>

    <TextField
      :required="required"
      :value="values.bairro"
      :input-class-name="styles.input"
      @change="(value) => emit('fieldChange', 'bairro', value)"
    >
      <template #label>Bairro *</template>
    </TextField>

    <TextField
      wrapper-class-name="sm:col-span-2"
      :required="required"
      :value="values.cidade"
      :input-class-name="styles.input"
      @change="(value) => emit('fieldChange', 'cidade', value)"
    >
      <template #label>Cidade *</template>
    </TextField>

    <TextField
      :max-length="2"
      :required="required"
      :value="values.uf"
      :input-class-name="styles.input"
      @change="(value) => emit('fieldChange', 'uf', value.toUpperCase())"
    >
      <template #label>{{ ufLabel }}</template>
    </TextField>
  </div>
</template>
