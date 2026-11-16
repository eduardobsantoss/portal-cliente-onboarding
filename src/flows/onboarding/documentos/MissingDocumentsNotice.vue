<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next';
import type { DocumentUploadItem } from '@/types/documentUpload';

defineProps<{
  missingMandatoryDocs: DocumentUploadItem[];
}>();
</script>

<template>
  <div class="p-4 sm:p-5 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3.5 shadow-xs">
    <div class="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
      <AlertCircle :size="18" />
    </div>
    <div class="flex-1 min-w-0 space-y-1.5">
      <h4 class="text-xs sm:text-sm font-bold text-amber-950">
        Documentos obrigatórios pendentes de envio ({{ missingMandatoryDocs.length }}):
      </h4>
      <ul class="text-xs text-amber-900 space-y-1 list-disc list-inside">
        <li v-for="doc in missingMandatoryDocs" :key="doc.id">
          <span class="font-semibold">{{ doc.targetPersonOrEntity }}:</span> {{ doc.title }}
        </li>
      </ul>
      <p class="text-[11px] text-amber-800 pt-1">
        Anexe os arquivos pendentes acima ou utilize <strong>"Anexar Todos (Demo)"</strong> no rodapé para continuar.
      </p>
    </div>
  </div>
</template>
