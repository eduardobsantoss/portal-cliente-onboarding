<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import ModalActionFooter from '@/components/ui/ModalActionFooter.vue';
import ModalFrame from '@/components/ui/ModalFrame.vue';
import ModalTitleBar from '@/components/ui/ModalTitleBar.vue';
import { FILTER_STATUS_OPTIONS, FILTER_TITLE_TYPE_OPTIONS } from '@/constants/carteiraFilters';
import FilterField from './FilterField.vue';
import FilterInput from './FilterInput.vue';
import FilterSelect from './FilterSelect.vue';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <AnimatePresence>
    <ModalFrame
      v-if="isOpen"
      key="carteira-filter-modal"
      overlay-class-name="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
      panel-class-name="bg-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
    >
      <ModalTitleBar @close="emit('close')">
        <template #title>Filtros da Carteira</template>
        <template #subtitle>Refine a busca por títulos em sua carteira</template>
      </ModalTitleBar>

      <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <FilterField label="Tipo de Título">
              <FilterSelect :options="FILTER_TITLE_TYPE_OPTIONS" />
            </FilterField>
            <FilterField label="Número">
              <FilterInput type="text" placeholder="Ex: NF-1234" />
            </FilterField>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <FilterField label="Vencimento Inicial">
              <FilterInput type="date" />
            </FilterField>
            <FilterField label="Vencimento Final">
              <FilterInput type="date" />
            </FilterField>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <FilterField label="Criação Inicial">
              <FilterInput type="date" />
            </FilterField>
            <FilterField label="Criação Final">
              <FilterInput type="date" />
            </FilterField>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <FilterField label="Status">
              <FilterSelect :options="FILTER_STATUS_OPTIONS" />
            </FilterField>
            <FilterField label="Sacado">
              <FilterInput type="text" placeholder="Nome do sacado..." />
            </FilterField>
          </div>

          <FilterField label="Lastro">
            <FilterInput type="text" placeholder="Número do lastro..." />
          </FilterField>
        </div>
      </div>

      <ModalActionFooter
        class-name="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4 text-center"
        cancel-label="Limpar Filtros"
        @cancel="emit('close')"
        confirm-label="Aplicar Filtros"
        @confirm="emit('close')"
        confirm-class-name="flex-3 bg-gci hover:bg-gci-hover text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-gci/20 active:scale-[0.98]"
      />
    </ModalFrame>
  </AnimatePresence>
</template>
