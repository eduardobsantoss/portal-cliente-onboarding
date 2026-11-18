<script setup lang="ts">
import SelectField from '@/components/ui/SelectField.vue';
import TextField from '@/components/ui/TextField.vue';
import { EMPRESA_TIPOS } from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import DocumentLookupMessage from '@/flows/onboarding/dados-complementares/DocumentLookupMessage.vue';
import CompanyCnaeField from '@/flows/onboarding/dados-complementares/empresa/CompanyCnaeField.vue';
import StepNextButton from '@/flows/onboarding/dados-complementares/empresa/StepNextButton.vue';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import { MOCK_FATURAMENTO_ANUAL } from '@/mocks/complementaryPending';
import type {
  DocumentLookupStatus,
  PjCompanyFormData,
  PjLockedField,
} from '@/types/dadosComplementares';

const props = defineProps<{
  company: PjCompanyFormData;
  setCompany: SetState<PjCompanyFormData>;
  hasDataErrors: boolean;
  lockedFields: readonly PjLockedField[];
  lookupStatus: DocumentLookupStatus;
  lookupError: string | null;
}>();

const emit = defineEmits<{ next: []; cnpjChange: [value: string] }>();

const INPUT_CLASS = FIELD_VARIANT_STYLES.page.input;
const READ_ONLY_INPUT_CLASS = FIELD_VARIANT_STYLES.page.readOnlyInput;

const isLocked = (field: PjLockedField) => props.lockedFields.includes(field);
const inputClassOf = (field: PjLockedField) => (isLocked(field) ? READ_ONLY_INPUT_CLASS : INPUT_CLASS);
</script>

<template>
  <form class="space-y-6" @submit.prevent="lookupStatus === 'success' && emit('next')">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      <!-- O documento vem primeiro: a partir dele a Receita Federal preenche os demais dados -->
      <TextField
        wrapper-class-name="sm:col-span-2"
        required
        :max-length="18"
        placeholder="00.000.000/0000-00"
        :value="company.cnpj"
        :input-class-name="INPUT_CLASS"
        @change="emit('cnpjChange', $event)"
      >
        <template #label>CNPJ da Empresa *</template>
        <template #footer>
          <DocumentLookupMessage
            :status="lookupStatus"
            :error-message="lookupError"
            loading-message="Consultando a Receita Federal..."
            success-message="Dados da empresa carregados. Complete apenas os campos em branco."
          />
        </template>
      </TextField>

      <template v-if="lookupStatus === 'success'">
        <TextField
          wrapper-class-name="sm:col-span-2"
          required
          :read-only="isLocked('razaoSocial')"
          :value="company.razaoSocial"
          :input-class-name="inputClassOf('razaoSocial')"
          @change="setCompany({ ...company, razaoSocial: $event })"
        >
          <template #label>Razão Social / Nome Empresarial *</template>
        </TextField>

        <TextField
          type="date"
          required
          :read-only="isLocked('dataAbertura')"
          :value="company.dataAbertura"
          :input-class-name="inputClassOf('dataAbertura')"
          @change="setCompany({ ...company, dataAbertura: $event })"
        >
          <template #label>Data de Abertura da Empresa *</template>
        </TextField>

        <TextField
          required
          placeholder="Ex: 500.000,00"
          :read-only="isLocked('capitalSocial')"
          :value="company.capitalSocial"
          :input-class-name="inputClassOf('capitalSocial')"
          @change="setCompany({ ...company, capitalSocial: $event })"
        >
          <template #label>Capital Social (R$) *</template>
        </TextField>

        <TextField
          required
          placeholder="Ex: 5.000.000,00"
          :value="company.faturamentoAnual"
          :input-class-name="INPUT_CLASS"
          @change="setCompany({ ...company, faturamentoAnual: $event })"
        >
          <template #label>Faturamento Anual Estimado (R$) *</template>
          <!-- Atalho discreto de demonstração -->
          <template #footer>
            <button
              type="button"
              class="mt-1 text-[10px] font-medium text-slate-300 hover:text-slate-500 transition-colors"
              @click="setCompany({ ...company, faturamentoAnual: MOCK_FATURAMENTO_ANUAL })"
            >
              Preencher com dado de exemplo
            </button>
          </template>
        </TextField>

        <TextField
          v-if="isLocked('tipoEmpresa')"
          wrapper-class-name="sm:col-span-2"
          read-only
          :value="company.tipoEmpresa"
          :input-class-name="READ_ONLY_INPUT_CLASS"
        >
          <template #label>Tipo de Empresa (Natureza Jurídica) *</template>
        </TextField>
        <SelectField
          v-else
          wrapper-class-name="sm:col-span-2"
          required
          :value="company.tipoEmpresa"
          :options="['', ...EMPRESA_TIPOS]"
          :input-class-name="INPUT_CLASS"
          @change="setCompany({ ...company, tipoEmpresa: $event })"
        >
          <template #label>Tipo de Empresa (Natureza Jurídica) *</template>
        </SelectField>

        <CompanyCnaeField
          :value="company.cnae"
          :has-data-errors="hasDataErrors"
          :read-only="isLocked('cnae')"
          @change="setCompany({ ...company, cnae: $event })"
        />
      </template>
    </div>

    <div class="pt-4 border-t border-slate-100 flex justify-end">
      <StepNextButton label="Avançar para Endereço" :disabled="lookupStatus !== 'success'" />
    </div>
  </form>
</template>
