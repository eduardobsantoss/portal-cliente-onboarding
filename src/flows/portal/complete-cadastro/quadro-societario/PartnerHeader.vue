<script setup lang="ts">
import { computed } from 'vue';
import { Building2, ChevronDown } from 'lucide-vue-next';
import type { PartnerData } from '@/types/documentChecklist';
import ValidationBadge from '@/flows/portal/complete-cadastro/comum/ValidationBadge.vue';

const props = defineProps<{
  partner: PartnerData;
  isExpanded: boolean;
}>();

const emit = defineEmits<{ toggle: [] }>();

const isPartnerValid = computed(() => props.partner.status === 'validado');
const isPJ = computed(() => props.partner.type === 'PJ');

/** Cabeçalho clicável de uma parte relacionada (avatar, nome/CPF-CNPJ, vínculo, status e chevron). */
</script>

<template>
  <button
    class="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
    @click="emit('toggle')"
  >
    <div class="flex items-center gap-3 min-w-0">
      <div
        :class="`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
          isPJ ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60' : 'bg-slate-100 text-slate-600'
        }`"
      >
        <Building2 v-if="isPJ" :size="16" />
        <template v-else>{{ partner.name.charAt(0) }}</template>
      </div>
      <div class="truncate">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-xs font-bold text-slate-800 truncate">{{ partner.name }}</span>
          <span class="text-[10px] text-slate-400">({{ partner.cpf }})</span>
          <span
            v-if="partner.isNonPartner"
            class="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded"
          >
            {{ partner.vinculo || 'Representante Não Sócio' }}
          </span>
          <span
            v-else-if="isPJ"
            class="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-1.5 py-0.5 rounded"
          >
            Pessoa Jurídica
          </span>
        </div>
        <p class="text-[11px] text-slate-400">
          {{ partner.role }}
          <template v-if="!partner.isNonPartner">{{ ` • ${partner.quotaPercentage}% de participação` }}</template>
          <template v-if="!isPJ && partner.maritalStatus">{{ ` • ${partner.maritalStatus}` }}</template>
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2.5 shrink-0">
      <ValidationBadge :is-done="isPartnerValid" done-label="Validado" variant="partner" />
      <ChevronDown
        :size="14"
        :class="`text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-gci' : ''}`"
      />
    </div>
  </button>
</template>
