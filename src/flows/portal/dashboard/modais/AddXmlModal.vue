<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { FileText, ShieldCheck } from 'lucide-vue-next';
import ModalActionFooter from '@/components/ui/ModalActionFooter.vue';
import ModalFrame from '@/components/ui/ModalFrame.vue';
import ModalTitleBar from '@/components/ui/ModalTitleBar.vue';
import NoticeCard from './comum/NoticeCard.vue';
import UploadDropzone from './comum/UploadDropzone.vue';
import UploadedFileRow from './comum/UploadedFileRow.vue';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <AnimatePresence>
    <ModalFrame
      v-if="isOpen"
      key="add-xml-modal"
      overlay-class-name="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
      panel-class-name="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
    >
      <ModalTitleBar @close="emit('close')">
        <template #title>Adicionar XMLs</template>
        <template #subtitle>Extração de Ativos (Duplicatas)</template>
      </ModalTitleBar>

      <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div class="space-y-8">
          <UploadDropzone
            title="Arraste ou clique para enviar duplicatas"
            hint="Você pode selecionar múltiplos arquivos (XML, PDF)"
            class-name="border border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 bg-slate-50/50 hover:bg-white hover:border-gci/30 transition-all cursor-pointer group shadow-sm"
            icon-box-class-name="w-20 h-20 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-gci group-hover:scale-110 transition-all shadow-md"
          />

          <div class="space-y-4">
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Arquivos selecionados</h4>
            <UploadedFileRow
              name="NFE_VENC_MAIO_001.xml"
              class-name="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center justify-between group hover:border-gci/20 transition-all"
              icon-box-class-name="w-12 h-12 rounded-xl bg-gci/5 flex items-center justify-center text-gci"
            >
              <template #icon><FileText :size="24" /></template>
              <template #details>1.2 MB • Pendente Validação</template>
            </UploadedFileRow>
          </div>

          <NoticeCard
            title="Validação Segura"
            text="Seus arquivos passarão por uma triagem automática de integridade e lastro antes de serem vinculados à operação."
            class-name="bg-agro-orange/5 border border-agro-orange/10 rounded-2xl p-5 flex items-start gap-4"
            icon-box-class-name="w-10 h-10 rounded-xl bg-agro-orange text-white flex items-center justify-center shrink-0"
            title-class-name="text-xs font-black text-gci uppercase tracking-widest mb-1"
            text-class-name="text-[11px] text-slate-500 leading-relaxed font-medium"
          >
            <template #icon><ShieldCheck :size="20" /></template>
          </NoticeCard>
        </div>
      </div>

      <ModalActionFooter
        cancel-label="Cancelar"
        @cancel="emit('close')"
        confirm-label="Confirmar e Enviar para Validação"
        @confirm="emit('close')"
        confirm-class-name="flex-3 bg-gci hover:bg-gci-hover text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-gci/20 shadow-gci/20 active:scale-[0.98]"
      />
    </ModalFrame>
  </AnimatePresence>
</template>
