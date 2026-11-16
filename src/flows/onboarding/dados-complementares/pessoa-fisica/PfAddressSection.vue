<script setup lang="ts">
import { MapPin } from 'lucide-vue-next';
import AddressFields from '@/components/forms/AddressFields.vue';
import CorrespondenceAddressSection from '@/components/forms/CorrespondenceAddressSection.vue';
import SectionTitle from '@/components/forms/SectionTitle.vue';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import type { PfFormData } from '@/types/dadosComplementares';
import { pickCorrespondenceAddress, toCorrespondenceKey } from '@/utils/address';

defineProps<{
  pfData: PfFormData;
  setPfData: SetState<PfFormData>;
}>();

const COMPLEMENTO_PLACEHOLDER = 'Apto, Sala, Bloco';
</script>

<template>
  <div class="space-y-4">
    <SectionTitle>
      <template #icon><MapPin :size="18" class="text-gci" /></template>
      2. Endereço Residencial (Obrigatório)
    </SectionTitle>

    <AddressFields
      :values="pfData"
      :complemento-placeholder="COMPLEMENTO_PLACEHOLDER"
      @field-change="(field, value) => setPfData({ ...pfData, [field]: value })"
    />

    <!-- Item 5: Endereço de Correspondência PF -->
    <CorrespondenceAddressSection
      :same-as-main="pfData.correspondenciaMesmo"
      title="Endereço de Correspondência *"
      :address="pickCorrespondenceAddress(pfData)"
      logradouro-label="Logradouro / Rua *"
      :complemento-placeholder="COMPLEMENTO_PLACEHOLDER"
      @same-as-main-change="(checked) => setPfData({ ...pfData, correspondenciaMesmo: checked })"
      @field-change="
        (field, value) => setPfData({ ...pfData, [toCorrespondenceKey(field)]: value })
      "
    />
  </div>
</template>
