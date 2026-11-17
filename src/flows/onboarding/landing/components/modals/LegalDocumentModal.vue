<script setup lang="ts">
import { computed } from 'vue';
import { X } from 'lucide-vue-next';
import TcDialog from '@/components/theme/TcDialog.vue';
import TcEyebrow from '@/components/theme/TcEyebrow.vue';
import { TERMS_DOCUMENTS } from '@/constants/termsDocuments';
import type { TermsDocumentType } from '@/types/terms';

/** Leitura dos Termos de Uso e da Política de Privacidade a partir do rodapé da landing. */
const props = defineProps<{
  docType: TermsDocumentType;
}>();

const emit = defineEmits<{
  close: [];
}>();

const legalDoc = computed(() => TERMS_DOCUMENTS[props.docType]);
</script>

<template>
  <TcDialog
    :open="true"
    variant="centered"
    wide
    labelledby="legal-document-title"
    @close="emit('close')"
  >
    <div class="flex items-start justify-between gap-[var(--space-4)]">
      <div class="min-w-0">
        <TcEyebrow>Documento legal</TcEyebrow>
        <h2
          id="legal-document-title"
          class="m-0 mt-[var(--space-3)] text-[length:var(--text-md)] font-[number:var(--weight-bold)] leading-[var(--leading-heading)] text-[color:var(--text-strong)]"
        >
          {{ legalDoc.heading }}
        </h2>
        <p class="m-0 mt-[var(--space-1)] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
          {{ legalDoc.subtitle }}
        </p>
      </div>
      <button
        type="button"
        class="inline-flex size-[var(--control-arrow)] shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-full)] border-[1.5px] border-[color:var(--border-strong)] text-[color:var(--text-strong)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
        aria-label="Fechar"
        @click="emit('close')"
      >
        <X :size="18" aria-hidden="true" />
      </button>
    </div>

    <div
      class="mt-[var(--space-6)] flex flex-col gap-[var(--space-3)] border-t border-[color:var(--border-subtle)] pt-[var(--space-6)] text-[length:var(--text-sm)] leading-[var(--leading-body)] text-[color:var(--text-muted)]"
    >
      <template v-for="(block, index) in legalDoc.blocks" :key="index">
        <h3
          v-if="block.kind === 'heading'"
          class="m-0 mt-[var(--space-3)] text-[length:var(--text-sm)] font-[number:var(--weight-bold)] text-[color:var(--text-strong)]"
        >
          {{ block.text }}
        </h3>
        <p v-else-if="block.kind === 'paragraph'" class="m-0">{{ block.text }}</p>
        <ul v-else class="m-0 flex list-disc flex-col gap-[var(--space-1)] pl-[var(--space-5)]">
          <li v-for="item in block.items" :key="item">{{ item }}</li>
        </ul>
      </template>
    </div>
  </TcDialog>
</template>
