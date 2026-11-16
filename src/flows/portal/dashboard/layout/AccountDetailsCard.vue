<script setup lang="ts">
import { Check, Copy } from 'lucide-vue-next';

/** Cartão "Dados da Conta" do menu do usuário (com botão de copiar). */
defineProps<{
  copiedAccountInfo: boolean;
  handleCopyAccountInfo: () => void;
}>();
</script>

<template>
  <div class="p-4 mx-3 my-2 rounded-xl bg-slate-50 border border-slate-100">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-1.5">
        <div class="w-2 h-2 rounded-full bg-agro-orange" />
        <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          Dados da Conta
        </span>
      </div>
      <span class="text-[9px] font-bold text-gci bg-gci/5 px-2 py-0.5 rounded border border-gci/10">
        GCI SCD
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-3">
      <div class="bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Agência</span>
        <span class="text-xs font-bold text-gci font-mono">0001</span>
      </div>
      <div class="bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Conta Corrente</span>
        <span class="text-xs font-bold text-gci font-mono">84920-3</span>
      </div>
    </div>

    <div class="space-y-1 mb-3 pt-1 border-t border-slate-200/60 text-[11px]">
      <div class="flex justify-between items-start gap-2">
        <span class="text-slate-400 font-medium">Titular:</span>
        <span class="font-bold text-gci text-right truncate">AgroTech Soluções Agrícolas S.A.</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-slate-400 font-medium">CNPJ:</span>
        <span class="font-mono text-slate-600 font-semibold">12.345.678/0001-90</span>
      </div>
    </div>

    <button
      type="button"
      @click="handleCopyAccountInfo"
      class="w-full py-2 px-3 rounded-lg bg-white border border-slate-200 hover:border-agro-orange hover:text-agro-orange text-gci text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-2xs"
    >
      <template v-if="copiedAccountInfo">
        <Check :size="14" class="text-emerald-500" />
        <span class="text-emerald-600">Dados da conta copiados!</span>
      </template>
      <template v-else>
        <Copy :size="14" />
        <span>Copiar dados bancários</span>
      </template>
    </button>
  </div>
</template>
