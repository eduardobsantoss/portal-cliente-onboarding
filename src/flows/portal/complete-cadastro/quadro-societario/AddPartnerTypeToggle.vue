<script setup lang="ts">
import { Building2, User } from 'lucide-vue-next';
import type { PartnerPersonType } from '@/types/documentChecklist';

defineProps<{
  value: PartnerPersonType;
}>();

const emit = defineEmits<{ change: [type: PartnerPersonType] }>();

/** Escolha do tipo de parte relacionada: Pessoa Física (PF) ou Pessoa Jurídica (PJ). */
</script>

<template>
  <div>
    <label class="text-[11px] font-bold text-slate-600 block mb-1.5">Tipo de Parte Relacionada</label>
    <div class="grid grid-cols-2 gap-2">
      <button
        type="button"
        :class="`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
          value === 'PF'
            ? 'border-gci bg-emerald-50 text-gci ring-1 ring-gci/30'
            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
        }`"
        @click="emit('change', 'PF')"
      >
        <User :size="14" /> Pessoa Física (PF)
      </button>
      <button
        type="button"
        :class="`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
          value === 'PJ'
            ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-400/30'
            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
        }`"
        @click="emit('change', 'PJ')"
      >
        <Building2 :size="14" /> Pessoa Jurídica (PJ)
      </button>
    </div>
  </div>
</template>
