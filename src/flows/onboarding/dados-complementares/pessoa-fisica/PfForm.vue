<script setup lang="ts">
import TextField from '@/components/ui/TextField.vue';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import DocumentLookupMessage from '@/flows/onboarding/dados-complementares/DocumentLookupMessage.vue';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import SubmitDocumentsButton from '@/flows/onboarding/dados-complementares/SubmitDocumentsButton.vue';
import type {
  DocumentLookupStatus,
  PfFormData,
  PfLockedField,
} from '@/types/dadosComplementares';
import PfAddressSection from './PfAddressSection.vue';
import PfOptionalSection from './PfOptionalSection.vue';
import PfPersonalSection from './PfPersonalSection.vue';

defineProps<{
  pfData: PfFormData;
  setPfData: SetState<PfFormData>;
  showOptionals: boolean;
  hasDataErrors: boolean;
  lockedFields: readonly PfLockedField[];
  lookupStatus: DocumentLookupStatus;
  lookupError: string | null;
}>();

const emit = defineEmits<{
  toggleOptionals: [];
  cpfChange: [value: string];
  submit: [event: Event];
}>();
</script>

<template>
  <form class="space-y-8" @submit="emit('submit', $event)">
    <!-- O documento vem primeiro: a partir dele os demais dados são preenchidos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      <TextField
        wrapper-class-name="sm:col-span-2"
        required
        :max-length="14"
        placeholder="000.000.000-00"
        :value="pfData.cpf"
        :input-class-name="FIELD_VARIANT_STYLES.page.input"
        @change="emit('cpfChange', $event)"
      >
        <template #label>CPF do Titular *</template>
        <template #footer>
          <DocumentLookupMessage
            :status="lookupStatus"
            :error-message="lookupError"
            loading-message="Consultando dados do CPF..."
            success-message="Dados carregados. Complete apenas os campos em branco."
          />
        </template>
      </TextField>
    </div>

    <template v-if="lookupStatus === 'success'">
      <!-- Bloco 1: Dados Pessoais -->
      <PfPersonalSection
        :pf-data="pfData"
        :set-pf-data="setPfData"
        :has-data-errors="hasDataErrors"
        :locked-fields="lockedFields"
      />

      <!-- Bloco 2: Endereço Residencial -->
      <PfAddressSection :pf-data="pfData" :set-pf-data="setPfData" />

      <!-- Seção Opcional Colapsável -->
      <PfOptionalSection
        :pf-data="pfData"
        :set-pf-data="setPfData"
        :is-open="showOptionals"
        @toggle="emit('toggleOptionals')"
      />

      <!-- Submit Action -->
      <div class="pt-4 border-t border-slate-100 flex items-center justify-end">
        <SubmitDocumentsButton type="submit" />
      </div>
    </template>
  </form>
</template>
