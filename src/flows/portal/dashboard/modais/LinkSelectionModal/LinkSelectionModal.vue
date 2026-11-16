<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { ArrowRight } from 'lucide-vue-next';
import ModalFrame from '@/components/ui/ModalFrame.vue';
import ModalTitleBar from '@/components/ui/ModalTitleBar.vue';
import type { SacadoContact, Titulo } from '@/types/titulo';
import SacadoContactPicker from './SacadoContactPicker.vue';
import ShareChannelPicker from './ShareChannelPicker.vue';

defineProps<{
  isOpen: boolean;
  titulo: Titulo | null;
  contacts: SacadoContact[];
  selectedChannels: string[];
  selectedSacados: string[];
}>();

const emit = defineEmits<{
  toggleChannel: [channelId: string];
  toggleSacado: [contactId: string];
  toggleAllSacados: [];
  close: [];
  submit: [];
}>();
</script>

<template>
  <AnimatePresence>
    <ModalFrame
      v-if="isOpen"
      key="link-selection-modal"
      overlay-class-name="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
      panel-class-name="bg-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
    >
      <ModalTitleBar
        class-name="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 text-left"
        subtitle-class-name="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1"
        @close="emit('close')"
      >
        <template #title>Enviar Link de Confirmação</template>
        <template #subtitle>Título {{ titulo?.numero }}</template>
      </ModalTitleBar>

      <div class="flex-1 overflow-y-auto custom-scrollbar p-8 text-left">
        <div class="space-y-8">
          <!-- Canais de Envio -->
          <ShareChannelPicker
            :selected-channels="selectedChannels"
            @toggle-channel="emit('toggleChannel', $event)"
          />

          <!-- Seleção de Destinatários -->
          <SacadoContactPicker
            :sacado="titulo?.sacado"
            :contacts="contacts"
            :selected-sacados="selectedSacados"
            @toggle-sacado="emit('toggleSacado', $event)"
            @toggle-all="emit('toggleAllSacados')"
          />
        </div>
      </div>

      <div class="p-8 border-t border-slate-100 bg-slate-50/50">
        <button
          :disabled="selectedSacados.length === 0 || selectedChannels.length === 0"
          @click="emit('submit')"
          class="w-full bg-gci hover:bg-gci-hover disabled:opacity-30 disabled:cursor-not-allowed text-white py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-gci/20 flex items-center justify-center gap-3"
        >
          Disparar Confirmação ({{ selectedSacados.length }})
          <ArrowRight :size="18" />
        </button>
      </div>
    </ModalFrame>
  </AnimatePresence>
</template>
