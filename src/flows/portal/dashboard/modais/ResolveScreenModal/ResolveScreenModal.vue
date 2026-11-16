<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { AnimatePresence } from 'motion-v';
import ModalFrame from '@/components/ui/ModalFrame.vue';
import type { Titulo } from '@/types/titulo';
import ResolveExplanation from './ResolveExplanation.vue';
import ResolveTitlesPanel from './ResolveTitlesPanel.vue';

/** Tela "Resolução de Pendências": explicação das ações e lista de títulos a regularizar. */
defineProps<{
  isOpen: boolean;
  hasSeenExplanation: boolean;
  titulosList: Titulo[];
}>();

const emit = defineEmits<{
  close: [];
  continue: [];
  uploadCanhoto: [titulo: Titulo];
  sendLink: [titulo: Titulo];
  finish: [];
}>();
</script>

<template>
  <AnimatePresence>
    <ModalFrame
      v-if="isOpen"
      key="resolve-screen-modal"
      overlay-class-name="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
      panel-class-name="bg-[#F8F9FA] rounded-[40px] shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[90vh]"
    >
      <div class="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div>
          <h1 class="text-xl md:text-2xl font-black text-gci tracking-tighter uppercase italic">Resolução de Pendências</h1>
          <p class="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Regularize seus títulos para liberar novas operações</p>
        </div>
        <button
          @click="emit('close')"
          class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-gci hover:bg-slate-100 transition-colors"
        >
          <X :size="24" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
        <ResolveExplanation v-if="!hasSeenExplanation" @continue="emit('continue')" />
        <ResolveTitlesPanel
          v-else
          :titulos-list="titulosList"
          @upload-canhoto="emit('uploadCanhoto', $event)"
          @send-link="emit('sendLink', $event)"
          @finish="emit('finish')"
        />
      </div>
    </ModalFrame>
  </AnimatePresence>
</template>
