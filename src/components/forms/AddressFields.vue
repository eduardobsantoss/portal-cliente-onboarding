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
    /** campos travados (somente leitura), ex.: preenchidos pela consulta de CNPJ */
    readOnlyFields?: readonly AddressField[];
  }>(),
  {
    variant: 'page',
    required: true,
    logradouroLabel: 'Logradouro / Rua *',
    ufLabel: 'Estado (UF) *',
    readOnlyFields: () => [],
  },
);

const emit = defineEmits<{ fieldChange: [field: AddressField, value: string] }>();

const styles = computed(() => FIELD_VARIANT_STYLES[props.variant]);
const isReadOnly = (field: AddressField) => props.readOnlyFields.includes(field);
const inputClassOf = (field: AddressField) =>
  isReadOnly(field) ? styles.value.readOnlyInput : styles.value.input;
</script>

<template>
  <div :class="styles.addressGrid">
    <TextField
      :required="required"
      :placeholder="cepPlaceholder"
      :value="values.cep"
      :read-only="isReadOnly('cep')"
      :input-class-name="inputClassOf('cep')"
      @change="(value) => emit('fieldChange', 'cep', value)"
    >
      <template #label>CEP *</template>
    </TextField>

    <TextField
      wrapper-class-name="sm:col-span-2"
      :required="required"
      :value="values.logradouro"
      :read-only="isReadOnly('logradouro')"
      :input-class-name="inputClassOf('logradouro')"
      @change="(value) => emit('fieldChange', 'logradouro', value)"
    >
      <template #label>{{ logradouroLabel }}</template>
    </TextField>

    <TextField
      :required="required"
      :value="values.numero"
      :read-only="isReadOnly('numero')"
      :input-class-name="inputClassOf('numero')"
      @change="(value) => emit('fieldChange', 'numero', value)"
    >
      <template #label>Número *</template>
    </TextField>

    <TextField
      :placeholder="complementoPlaceholder"
      :value="values.complemento"
      :read-only="isReadOnly('complemento')"
      :input-class-name="inputClassOf('complemento')"
      @change="(value) => emit('fieldChange', 'complemento', value)"
    >
      <template #label>Complemento</template>
    </TextField>

    <TextField
      :required="required"
      :value="values.bairro"
      :read-only="isReadOnly('bairro')"
      :input-class-name="inputClassOf('bairro')"
      @change="(value) => emit('fieldChange', 'bairro', value)"
    >
      <template #label>Bairro *</template>
    </TextField>

    <TextField
      wrapper-class-name="sm:col-span-2"
      :required="required"
      :value="values.cidade"
      :read-only="isReadOnly('cidade')"
      :input-class-name="inputClassOf('cidade')"
      @change="(value) => emit('fieldChange', 'cidade', value)"
    >
      <template #label>Cidade *</template>
    </TextField>

    <TextField
      :max-length="2"
      :required="required"
      :value="values.uf"
      :read-only="isReadOnly('uf')"
      :input-class-name="inputClassOf('uf')"
      @change="(value) => emit('fieldChange', 'uf', value.toUpperCase())"
    >
      <template #label>{{ ufLabel }}</template>
    </TextField>
  </div>
</template>
