<script setup lang="ts">
import { Copy, Check } from 'lucide-vue-next';
import type { AccountInfo } from '@/types/account';

defineProps<{
  accountInfo: AccountInfo;
  copiedField: string | null;
}>();

const emit = defineEmits<{
  copy: [field: string, value: string];
}>();
</script>

<template>
  <div class="bg-gradient-to-br from-slate-900 to-[#083C4A] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-slate-800">
    <!-- Subtle background glow -->
    <div class="absolute top-0 right-0 w-48 h-48 bg-agro-orange/10 rounded-full blur-3xl pointer-events-none" />

    <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-agro-orange/20 text-agro-orange flex items-center justify-center font-bold text-xs">
          GCI
        </div>
        <div>
          <p class="text-xs font-bold text-white tracking-wide">
            {{ accountInfo.institution }}
          </p>
          <p class="text-[10px] text-white/60 font-medium">
            {{ accountInfo.accountType }}
          </p>
        </div>
      </div>
    </div>

    <!-- Data Grid -->
    <div class="grid grid-cols-2 gap-4 text-xs">
      <div>
        <span class="text-[10px] text-white/50 uppercase font-bold tracking-wider">Agência</span>
        <p class="text-sm font-bold text-white font-mono mt-0.5">{{ accountInfo.agency }}</p>
      </div>

      <div>
        <span class="text-[10px] text-white/50 uppercase font-bold tracking-wider">Conta Corrente</span>
        <div class="flex items-center gap-2 mt-0.5">
          <p class="text-sm font-bold text-white font-mono">{{ accountInfo.accountNumber }}</p>
          <button
            type="button"
            @click="emit('copy', 'account', accountInfo.accountNumber)"
            class="text-white/60 hover:text-white transition-colors"
            title="Copiar conta"
          >
            <Check v-if="copiedField === 'account'" :size="14" class="text-emerald-400" />
            <Copy v-else :size="14" />
          </button>
        </div>
      </div>

      <div class="col-span-2 pt-2 border-t border-white/10">
        <span class="text-[10px] text-white/50 uppercase font-bold tracking-wider">Titular / Razão Social</span>
        <p class="text-xs font-bold text-white uppercase tracking-tight mt-0.5">{{ accountInfo.companyName }}</p>
        <p class="text-[11px] text-white/60 font-medium mt-0.5">CNPJ: {{ accountInfo.cnpj }}</p>
      </div>
    </div>
  </div>
</template>
