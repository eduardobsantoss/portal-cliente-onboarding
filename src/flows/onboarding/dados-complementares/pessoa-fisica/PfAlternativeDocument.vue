<script setup lang="ts">
import TextField from '@/components/ui/TextField.vue';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import type { PfFormData } from '@/types/dadosComplementares';

defineProps<{
  pfData: PfFormData;
  setPfData: SetState<PfFormData>;
}>();

const LABEL_CLASS = 'block text-[10px] text-slate-500 mb-0.5';
const INPUT_CLASS = 'w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs';
</script>

<template>
  <div class="sm:col-span-2 pt-2 border-t border-slate-200/50">
    <span class="block text-[11px] font-bold text-slate-700 mb-2"
      >Documento de Identificação Alternativo</span
    >
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <TextField
        :label-class-name="LABEL_CLASS"
        :input-class-name="INPUT_CLASS"
        :value="pfData.docTipo"
        @change="setPfData({ ...pfData, docTipo: $event })"
      >
        <template #label>Tipo</template>
      </TextField>
      <TextField
        :label-class-name="LABEL_CLASS"
        :input-class-name="INPUT_CLASS"
        :value="pfData.docNumero"
        @change="setPfData({ ...pfData, docNumero: $event })"
      >
        <template #label>Número</template>
      </TextField>
      <TextField
        type="date"
        :label-class-name="LABEL_CLASS"
        :input-class-name="INPUT_CLASS"
        :value="pfData.docDataExpedicao"
        @change="setPfData({ ...pfData, docDataExpedicao: $event })"
      >
        <template #label>Expedição</template>
      </TextField>
      <TextField
        :label-class-name="LABEL_CLASS"
        :input-class-name="INPUT_CLASS"
        :value="pfData.docOrgao"
        @change="setPfData({ ...pfData, docOrgao: $event })"
      >
        <template #label>Órgão Emissor</template>
      </TextField>
    </div>
  </div>
</template>
