<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import { FileText, X, Download } from 'lucide-vue-next';
import { TERMS_DOCUMENTS } from '@/constants/termsDocuments';
import type { TermsDocumentType } from '@/types/terms';
import TermsDocumentBody from './TermsDocumentBody.vue';

const props = defineProps<{
  docType: TermsDocumentType;
}>();

const emit = defineEmits<{
  download: [];
  close: [];
  agree: [];
}>();

const doc = computed(() => TERMS_DOCUMENTS[props.docType]);
</script>

<template>
  <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
    <motion.div
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.95 }"
      class="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden"
    >
      <!-- Modal Header -->
      <div class="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gci text-white flex items-center justify-center shadow-sm">
            <FileText :size="18" />
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900">
              {{ doc.modalFileName }}
            </h3>
            <span class="text-[10px] text-slate-500 uppercase font-semibold">
              Grupo Ceres Investimentos • {{ doc.pagesLabel }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="emit('download')"
            class="p-2 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors"
            title="Baixar cópia do documento"
          >
            <Download :size="16" />
          </button>
          <button
            @click="emit('close')"
            class="p-2 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors"
          >
            <X :size="18" />
          </button>
        </div>
      </div>

      <!-- Modal Body - PDF Document Simulated Reader -->
      <div class="p-6 sm:p-8 overflow-y-auto custom-scrollbar text-xs text-slate-600 leading-relaxed space-y-5 bg-slate-100/60 font-serif">
        <TermsDocumentBody :document="doc" />
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
        <span class="text-xs text-slate-400">
          {{ doc.footerLabel }}
        </span>
        <button
          @click="emit('agree')"
          class="px-5 py-2 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          Concordar e Fechar
        </button>
      </div>
    </motion.div>
  </div>
</template>
