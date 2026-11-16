<script setup lang="ts">
import PepField from '@/components/forms/PepField.vue';
import CollapsibleSection from '@/components/ui/CollapsibleSection.vue';
import TextField from '@/components/ui/TextField.vue';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import type { PfFormData } from '@/types/dadosComplementares';
import PfAlternativeDocument from './PfAlternativeDocument.vue';

defineProps<{
  pfData: PfFormData;
  setPfData: SetState<PfFormData>;
  isOpen: boolean;
}>();

const emit = defineEmits<{ toggle: [] }>();
</script>

<template>
  <CollapsibleSection
    :is-open="isOpen"
    button-class-name="w-full p-4 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
    @toggle="emit('toggle')"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-slate-700"> Informações adicionais e complementares </span>
        <span
          class="text-[10px] font-bold text-slate-400 bg-slate-200/80 px-2 py-0.5 rounded-full uppercase"
        >
          Opcional
        </span>
      </div>
    </template>
    <div
      class="p-4 pt-2 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"
    >
      <TextField
        label-class-name="block text-[11px] font-medium text-slate-600 mb-1"
        input-class-name="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
        :value="pfData.nomePai"
        @change="setPfData({ ...pfData, nomePai: $event })"
      >
        <template #label>Nome do Pai</template>
      </TextField>

      <PepField
        :checked="pfData.pep"
        label="Sou ou possuo relação com Pessoa Politicamente Exposta (PEP)"
        @change="(checked) => setPfData({ ...pfData, pep: checked })"
      />

      <PfAlternativeDocument :pf-data="pfData" :set-pf-data="setPfData" />
    </div>
  </CollapsibleSection>
</template>
