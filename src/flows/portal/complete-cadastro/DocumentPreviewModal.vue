<script setup lang="ts">
import { FileCheck, FileText, X } from 'lucide-vue-next';
import Modal from '@/components/ui/Modal.vue';
import type { PreviewDoc } from '@/types/documentChecklist';

defineProps<{
  previewDoc: PreviewDoc | null;
}>();

const emit = defineEmits<{ close: [] }>();

const OVERLAY_CLASS = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm';
const PANEL_CLASS = 'bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-200 space-y-4';

/** Modal de pré-visualização (simulada) de um documento já enviado. */
</script>

<template>
  <Modal :is-open="previewDoc !== null" :overlay-class-name="OVERLAY_CLASS" :panel-class-name="PANEL_CLASS">
    <template v-if="previewDoc">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <FileText :size="18" class="text-gci" />
          <h4 class="text-sm font-bold text-slate-800">{{ previewDoc.title }}</h4>
        </div>
        <button class="text-slate-400 hover:text-slate-700" @click="emit('close')">
          <X :size="18" />
        </button>
      </div>

      <div class="p-8 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
        <FileCheck :size="36" class="text-emerald-500 mx-auto" />
        <p class="text-xs font-bold text-slate-800">{{ previewDoc.fileName }}</p>
        <p class="text-[11px] text-slate-400">Arquivo criptografado e validado pela mesa de crédito.</p>
      </div>

      <button
        class="w-full py-2.5 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-colors"
        @click="emit('close')"
      >
        Fechar
      </button>
    </template>
  </Modal>
</template>
