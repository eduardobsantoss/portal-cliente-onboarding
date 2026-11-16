<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { Image, Info } from 'lucide-vue-next';
import ModalActionFooter from '@/components/ui/ModalActionFooter.vue';
import ModalFrame from '@/components/ui/ModalFrame.vue';
import ModalTitleBar from '@/components/ui/ModalTitleBar.vue';
import type { CanhotoFile, Titulo } from '@/types/titulo';
import { cn } from '@/utils/cn';
import NoticeCard from '@/flows/portal/dashboard/modais/comum/NoticeCard.vue';
import UploadDropzone from '@/flows/portal/dashboard/modais/comum/UploadDropzone.vue';
import UploadedFileRow from '@/flows/portal/dashboard/modais/comum/UploadedFileRow.vue';
import CanhotoUploadProgress from './CanhotoUploadProgress.vue';

defineProps<{
  isOpen: boolean;
  titulo: Titulo | null;
  files: CanhotoFile[];
  isUploading: boolean;
  progress: number;
}>();

const emit = defineEmits<{
  pickFile: [];
  removeFile: [];
  close: [];
  submit: [];
}>();
</script>

<template>
  <AnimatePresence>
    <ModalFrame
      v-if="isOpen"
      key="canhoto-upload-modal"
      overlay-class-name="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
      panel-class-name="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
    >
      <ModalTitleBar
        title-class-name="text-2xl font-black text-gci tracking-tight uppercase italic"
        subtitle-class-name="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1"
        @close="emit('close')"
      >
        <template #title>Subir Canhoto</template>
        <template #subtitle>{{ titulo?.titulo }} • {{ titulo?.numero }}</template>
      </ModalTitleBar>

      <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div class="space-y-8">
          <CanhotoUploadProgress v-if="isUploading" :progress="progress" />
          <template v-else>
            <UploadDropzone
              @click="emit('pickFile')"
              title="Clique ou arraste o canhoto assinado"
              hint="Formatos aceitos: JPG, PNG ou PDF"
              class-name="border border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 bg-slate-50/50 hover:bg-white hover:border-agro-orange/30 transition-all cursor-pointer group shadow-sm"
              icon-box-class-name="w-20 h-20 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-agro-orange group-hover:scale-110 transition-all shadow-md"
            />

            <div v-if="files.length > 0" class="space-y-4">
              <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Arquivo selecionado</h4>
              <UploadedFileRow
                :name="files[0].name"
                class-name="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center justify-between group hover:border-agro-orange/20 transition-all"
                icon-box-class-name="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-agro-orange"
                @remove="emit('removeFile')"
              >
                <template #icon><Image :size="24" /></template>
                <template #details>{{ files[0].size }} • Pronto para envio</template>
              </UploadedFileRow>
            </div>

            <NoticeCard
              title="Como deve ser o canhoto?"
              text="O documento deve conter a assinatura legível do recebedor, data da entrega e, preferencialmente, o carimbo da empresa sacada."
              class-name="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4"
              icon-box-class-name="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20"
              title-class-name="text-xs font-black text-blue-900 uppercase tracking-widest mb-1"
              text-class-name="text-[11px] text-blue-800/70 leading-relaxed font-medium"
            >
              <template #icon><Info :size="20" /></template>
            </NoticeCard>
          </template>
        </div>
      </div>

      <ModalActionFooter
        v-if="!isUploading"
        cancel-label="Cancelar"
        @cancel="emit('close')"
        confirm-label="Confirmar Envio do Canhoto"
        @confirm="emit('submit')"
        :confirm-disabled="files.length === 0"
        :confirm-class-name="cn(
          'flex-[2] py-4 rounded-2xl font-bold text-sm transition-all shadow-xl active:scale-[0.98]',
          files.length > 0
            ? 'bg-gci hover:bg-gci-hover text-white shadow-gci/20'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
        )"
      />
    </ModalFrame>
  </AnimatePresence>
</template>
