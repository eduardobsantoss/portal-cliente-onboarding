<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next';
import ListSectionHeader from '@/components/forms/ListSectionHeader.vue';
import StepBackButton from '@/flows/onboarding/dados-complementares/empresa/StepBackButton.vue';
import NonPartnerSection from '@/flows/onboarding/dados-complementares/representantes/NonPartnerSection.vue';
import type { NonPartnerEditor } from '@/flows/onboarding/dados-complementares/representantes/useNonPartnerEditor';
import SocioCard from '@/flows/onboarding/dados-complementares/socios/SocioCard.vue';
import type { SociosEditor } from '@/flows/onboarding/dados-complementares/socios/useSociosEditor';
import SubmitDocumentsButton from '@/flows/onboarding/dados-complementares/SubmitDocumentsButton.vue';

const props = defineProps<{
  sociosEditor: SociosEditor;
  nonPartnerEditor: NonPartnerEditor;
  validationErrorNotice: string | null;
}>();

const emit = defineEmits<{ back: []; submit: [] }>();

// refs estáveis do composable (o objeto `sociosEditor` não é recriado)
const { socios, openAdd, toggleRepresentante, openEdit, remove } = props.sociosEditor;

/** PASSO 3: SÓCIOS */
</script>

<template>
  <div class="space-y-6">
    <ListSectionHeader
      title="Sócios e Administradores Cadastrados"
      description="Mantenha as informações conforme o Contrato Social da empresa."
      action-label="Adicionar Outro Sócio"
      @action="openAdd"
    />

    <!-- Validation error notice if no representative is selected -->
    <div
      v-if="validationErrorNotice"
      class="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-2xl flex items-center gap-2"
    >
      <AlertCircle :size="16" class="text-rose-600 shrink-0" />
      <span>{{ validationErrorNotice }}</span>
    </div>

    <!-- Lista de Sócios -->
    <div class="space-y-3">
      <SocioCard
        v-for="(socio, idx) in socios"
        :key="socio.id"
        :socio="socio"
        :index="idx"
        :on-delete="socios.length > 1 ? remove : undefined"
        @toggle-representante="toggleRepresentante"
        @edit="openEdit"
      />
    </div>

    <NonPartnerSection :editor="nonPartnerEditor" />

    <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
      <StepBackButton label="Voltar para Endereço" @click="emit('back')" />
      <SubmitDocumentsButton type="button" @click="emit('submit')" />
    </div>
  </div>
</template>
