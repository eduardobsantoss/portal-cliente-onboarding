<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { Info } from 'lucide-vue-next';
import ModalActionFooter from '@/components/ui/ModalActionFooter.vue';
import ModalFrame from '@/components/ui/ModalFrame.vue';
import ModalTitleBar from '@/components/ui/ModalTitleBar.vue';
import { LINKABLE_ASSETS } from '@/mocks/linkableAssets';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <AnimatePresence>
    <ModalFrame
      v-if="isOpen"
      key="link-assets-modal"
      overlay-class-name="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
      panel-class-name="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
    >
      <ModalTitleBar @close="emit('close')">
        <template #title>Vincular Ativos</template>
        <template #subtitle>Selecione títulos para vincular a esta operação</template>
      </ModalTitleBar>

      <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div class="space-y-6">
          <div class="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
              <Info :size="20" />
            </div>
            <p class="text-sm text-blue-700 font-medium leading-relaxed">
              A listagem abaixo inclui títulos que estão em análise ou foram recusados anteriormente, permitindo nova tentativa de vinculação.
            </p>
          </div>

          <div class="border border-slate-100 rounded-3xl overflow-hidden">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-100">
                  <th class="px-6 py-4 w-12">
                    <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-gci focus:ring-gci" />
                  </th>
                  <th class="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / Número</th>
                  <th class="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</th>
                  <th class="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sacado</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="(row, i) in LINKABLE_ASSETS" :key="i" class="hover:bg-slate-50 transition-colors">
                  <td class="px-6 py-4">
                    <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-gci focus:ring-gci" />
                  </td>
                  <td class="px-4 py-4 font-bold text-gci text-sm">{{ row.id }} <span class="text-slate-400">/ {{ row.numero }}</span></td>
                  <td class="px-4 py-4 font-black text-gci text-sm">{{ row.valor }}</td>
                  <td class="px-4 py-4">
                    <span :class="`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${row.color}`">
                      {{ row.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-xs font-bold text-slate-500 truncate max-w-[200px]">{{ row.sacado }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalActionFooter
        cancel-label="Cancelar"
        @cancel="emit('close')"
        confirm-label="Vincular 3 títulos selecionados"
        @confirm="emit('close')"
        confirm-class-name="flex-3 bg-gci hover:bg-gci-hover text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-gci/20"
      />
    </ModalFrame>
  </AnimatePresence>
</template>
