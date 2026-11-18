<script setup lang="ts">
import SelectField from '@/components/ui/SelectField.vue';
import TextField from '@/components/ui/TextField.vue';
import { GENEROS_COMPLETO } from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES, getRendaInputClass } from '@/constants/formStyles';
import type { FieldVariant, PersonField, PersonValues } from '@/types/forms';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    values: Partial<PersonValues>;
    /** campos a renderizar, na ordem em que devem aparecer */
    fields: PersonField[];
    variant?: FieldVariant;
    generoOptions?: readonly string[];
    requireGenero?: boolean;
    labels?: Partial<Record<PersonField, string>>;
    placeholders?: Partial<Record<PersonField, string>>;
    /** quando definido, destaca o campo de renda e exibe o aviso abaixo dele */
    rendaNotice?: string;
    /** campos de texto travados (somente leitura), ex.: preenchidos pela consulta de CPF */
    readOnlyFields?: readonly PersonField[];
  }>(),
  {
    variant: 'page',
    generoOptions: () => GENEROS_COMPLETO,
    requireGenero: true,
    readOnlyFields: () => [],
  },
);

const emit = defineEmits<{ fieldChange: [field: PersonField, value: string] }>();

const DEFAULT_LABELS: Record<PersonField, string> = {
  dataNascimento: 'Data de Nascimento *',
  genero: 'Gênero *',
  nacionalidade: 'Nacionalidade *',
  nomeMae: 'Nome da Mãe *',
  profissao: 'Profissão *',
  renda: 'Renda Mensal (R$) *',
};

const styles = computed(() => FIELD_VARIANT_STYLES[props.variant]);
const labelOf = (field: PersonField) => props.labels?.[field] ?? DEFAULT_LABELS[field];
const isReadOnly = (field: PersonField) => props.readOnlyFields.includes(field);

/** Dados pessoais comuns (PF, sócio...). Renderiza células do grid do pai. */
</script>

<template>
  <template v-for="field in fields" :key="field">
    <SelectField
      v-if="field === 'genero'"
      :required="requireGenero"
      :value="values.genero ?? ''"
      :options="generoOptions"
      :input-class-name="styles.input"
      @change="(value) => emit('fieldChange', 'genero', value)"
    >
      <template #label>{{ labelOf(field) }}</template>
    </SelectField>

    <TextField
      v-else-if="field === 'renda'"
      required
      :placeholder="placeholders?.renda"
      :value="values.renda ?? ''"
      :input-class-name="getRendaInputClass(variant, Boolean(rendaNotice))"
      @change="(value) => emit('fieldChange', 'renda', value)"
    >
      <template #label>{{ labelOf(field) }}</template>
      <template v-if="rendaNotice" #footer>
        <span class="text-[10px] text-amber-700 font-semibold mt-1 block">{{ rendaNotice }}</span>
      </template>
    </TextField>

    <TextField
      v-else
      :type="field === 'dataNascimento' ? 'date' : 'text'"
      required
      :placeholder="placeholders?.[field]"
      :value="values[field] ?? ''"
      :read-only="isReadOnly(field)"
      :input-class-name="isReadOnly(field) ? styles.readOnlyInput : styles.input"
      @change="(value) => emit('fieldChange', field, value)"
    >
      <template #label>{{ labelOf(field) }}</template>
    </TextField>
  </template>
</template>
