<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v';
import type { PartnerData, PartnerDocKey, PreviewDoc } from '@/types/documentChecklist';
import { PARTNER_NO_PENDING_DOCS_NOTE } from '@/constants/checklistTopics';
import { getPartnerDocFields } from '@/utils/partnerRules';
import PartnerDocItem from './PartnerDocItem.vue';
import PartnerHeader from './PartnerHeader.vue';

defineProps<{
  partner: PartnerData;
  isExpanded: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
  uploadDoc: [partnerId: string, docKey: PartnerDocKey, file: File];
  preview: [doc: PreviewDoc];
}>();

/** Cartão recolhível de uma parte relacionada (sócio PF com cônjuge, sócio PJ ou representante não sócio). */
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs">
    <PartnerHeader :partner="partner" :is-expanded="isExpanded" @toggle="emit('toggle')" />

    <AnimatePresence>
      <motion.div
        v-if="isExpanded"
        key="docs"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        class="border-t border-slate-100 p-3.5 bg-slate-50/30 grid grid-cols-1 sm:grid-cols-2 gap-2.5"
      >
        <p
          v-if="getPartnerDocFields(partner).length === 0"
          class="sm:col-span-2 text-[11px] text-slate-500 leading-relaxed"
        >
          {{ PARTNER_NO_PENDING_DOCS_NOTE }}
        </p>
        <PartnerDocItem
          v-for="field in getPartnerDocFields(partner)"
          :key="field.docKey"
          :label="field.label"
          :doc-state="partner.docs[field.docKey] || { uploaded: false, status: 'pendente' }"
          :note="field.note"
          @upload="(file) => emit('uploadDoc', partner.id, field.docKey, file)"
          @preview="
            partner.docs[field.docKey]?.fileName &&
              emit('preview', { title: field.previewTitle, fileName: partner.docs[field.docKey]!.fileName! })
          "
        />
      </motion.div>
    </AnimatePresence>
  </div>
</template>
