<script setup lang="ts">
import { computed } from 'vue';
import { Building2, ChevronDown, User } from 'lucide-vue-next';
import { DOCUMENT_ENTITY_COMPANY } from '@/constants/requiredDocuments';
import type { DocumentUploadItem } from '@/types/documentUpload';

const props = defineProps<{
  groupTitle: string;
  groupDocs: DocumentUploadItem[];
  cnpj: string;
  isOpen: boolean;
}>();

const emit = defineEmits<{ toggle: [] }>();

const groupUploaded = computed(
  () => props.groupDocs.filter((d) => d.uploaded && !d.isRegularizationNeeded).length
);
const isGroupCompany = computed(() =>
  props.groupDocs.some((d) => d.entityType === DOCUMENT_ENTITY_COMPANY)
);
const isGroupComplete = computed(() => groupUploaded.value === props.groupDocs.length);

/** Cabeçalho clicável do cartão (mesmo padrão dos tópicos do "Compl. Cadastro"): abre e fecha os uploads do grupo. */
</script>

<template>
  <button
    type="button"
    class="w-full p-4 sm:p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
    :aria-expanded="isOpen"
    @click="emit('toggle')"
  >
    <div class="flex items-center gap-3 min-w-0">
      <div
        :class="[
          'w-9 h-9 shrink-0 rounded-xl flex items-center justify-center',
          isGroupComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500',
        ]"
      >
        <Building2 v-if="isGroupCompany" :size="18" />
        <User v-else :size="18" />
      </div>
      <div class="min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <h3 class="text-xs sm:text-sm font-bold text-slate-900">
            {{ groupTitle }}
          </h3>
          <span
            v-if="!isGroupCompany && groupDocs[0]?.cargo"
            class="text-[10px] font-bold text-gci bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full"
          >
            {{ groupDocs[0].cargo }}
          </span>
        </div>
        <p class="text-[11px] text-slate-500">
          {{
            isGroupCompany
              ? `CNPJ: ${cnpj}`
              : `Cargo: ${groupDocs[0]?.cargo || 'Sócio'} • Documentação pessoal`
          }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-3 self-start sm:self-auto">
      <span
        :class="[
          'text-[11px] font-bold px-3 py-1 rounded-full border',
          isGroupComplete
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-amber-50 text-amber-800 border-amber-200',
        ]"
      >
        {{ groupUploaded }} de {{ groupDocs.length }} enviados
      </span>
      <ChevronDown
        :size="16"
        :class="`shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-gci' : ''}`"
      />
    </div>
  </button>
</template>
