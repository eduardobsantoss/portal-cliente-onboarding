<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { Upload } from 'lucide-vue-next';
import ModalFrame from '@/components/ui/ModalFrame.vue';
import ModalTitleBar from '@/components/ui/ModalTitleBar.vue';
import { DOCUMENT_CENTER_ITEMS } from '@/constants/documentCenter';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <AnimatePresence>
    <ModalFrame
      v-if="isOpen"
      key="document-upload-modal"
      overlay-class-name="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gci/40 backdrop-blur-md"
      panel-class-name="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
    >
      <ModalTitleBar
        class-name="p-8 md:p-10 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10"
        subtitle-class-name="text-sm text-gray-500 font-medium mt-1"
        close-button-class-name="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gci hover:bg-gray-100 transition-colors"
        @close="emit('close')"
      >
        <template #title>Central de Documentos</template>
        <template #subtitle>Upload de arquivos para análise de crédito</template>
      </ModalTitleBar>

      <div class="p-8 md:p-10 overflow-y-auto custom-scrollbar">
        <div class="space-y-8">
          <div v-for="docLabel in DOCUMENT_CENTER_ITEMS" :key="docLabel" class="space-y-3">
            <label class="text-[10px] font-black text-gci ml-1 uppercase tracking-[0.2em]">{{ docLabel }}</label>
            <div class="border-2 border-dashed border-gray-200 rounded-[24px] p-8 flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-white hover:border-gci/30 hover:shadow-xl transition-all cursor-pointer group">
              <div class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-gci group-hover:scale-110 transition-all shadow-sm">
                <Upload :size="28" />
              </div>
              <div class="text-center">
                <p class="text-sm font-black text-gci">Arraste ou clique para selecionar</p>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">PDF, JPG ou PNG (Máx 10MB)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-8 md:p-10 border-t border-gray-100 bg-gray-50">
        <button
          @click="emit('close')"
          class="w-full bg-gci hover:bg-gci-hover text-white py-5 rounded-[20px] font-bold text-base transition-all shadow-xl shadow-gci/20 active:scale-[0.98]"
        >
          Finalizar e Enviar
        </button>
      </div>
    </ModalFrame>
  </AnimatePresence>
</template>
