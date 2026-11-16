<script setup lang="ts">
import { X } from 'lucide-vue-next';
import Modal from '@/components/ui/Modal.vue';
import { ADD_PARTNER_PF_DOCS_NOTE, ADD_PARTNER_PJ_DOCS_NOTE } from '@/constants/checklistTopics';
import type { NewPartnerForm } from '@/types/documentChecklist';
import AddPartnerFields from './AddPartnerFields.vue';
import AddPartnerTypeToggle from './AddPartnerTypeToggle.vue';

defineProps<{
  isOpen: boolean;
  values: NewPartnerForm;
}>();

const emit = defineEmits<{
  <K extends keyof NewPartnerForm>(e: 'fieldChange', field: K, value: NewPartnerForm[K]): void;
  (e: 'submit', event: Event): void;
  (e: 'close'): void;
}>();

const OVERLAY_CLASS = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm';
const PANEL_CLASS = 'bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 border border-slate-200 space-y-4';

/** Modal "Adicionar Parte Relacionada" (PF ou PJ) do quadro societário. */
</script>

<template>
  <Modal :is-open="isOpen" :overlay-class-name="OVERLAY_CLASS" :panel-class-name="PANEL_CLASS">
    <div class="flex items-center justify-between border-b border-slate-100 pb-3">
      <h3 class="text-sm font-bold text-slate-800">Adicionar Parte Relacionada</h3>
      <button class="text-slate-400 hover:text-slate-700" @click="emit('close')">
        <X :size="18" />
      </button>
    </div>

    <form class="space-y-3.5" @submit="emit('submit', $event)">
      <AddPartnerTypeToggle :value="values.type" @change="(type) => emit('fieldChange', 'type', type)" />

      <AddPartnerFields :values="values" @field-change="(field, value) => emit('fieldChange', field, value)" />

      <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-500">
        <span v-if="values.type === 'PJ'"><strong>Documentos exigidos pelo checklist:</strong> {{ ADD_PARTNER_PJ_DOCS_NOTE }}</span>
        <span v-else><strong>Documentos exigidos pelo checklist:</strong> {{ ADD_PARTNER_PF_DOCS_NOTE }}</span>
      </div>

      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button
          type="button"
          class="px-4 py-2 text-xs text-slate-500 hover:text-slate-700 font-bold"
          @click="emit('close')"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-5 py-2 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
        >
          Salvar Parte Relacionada
        </button>
      </div>
    </form>
  </Modal>
</template>
