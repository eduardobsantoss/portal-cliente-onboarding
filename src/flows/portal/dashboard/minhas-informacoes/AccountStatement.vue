<script setup lang="ts">
import { motion } from 'motion-v';
import { ArrowDownRight, ArrowUpRight, FileText } from 'lucide-vue-next';
import { ACCOUNT_TRANSACTIONS } from '@/mocks/dashboardChart';

/** Extrato de operação (estado vazio quando não há movimentações). */
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, x: 20 }"
    :animate="{ opacity: 1, x: 0 }"
    :transition="{ delay: 0.4 }"
    class="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col"
  >
    <div class="flex items-center justify-between mb-8">
      <h3 class="text-lg font-black text-gci">Extrato de Operação</h3>
      <button class="text-[10px] font-black text-agro-orange uppercase tracking-widest hover:underline">Ver Tudo</button>
    </div>
    <div class="space-y-8 flex-1">
      <template v-if="ACCOUNT_TRANSACTIONS.length > 0">
        <div v-for="tx in ACCOUNT_TRANSACTIONS" :key="tx.id" class="flex items-center justify-between group cursor-pointer">
          <div class="flex items-center gap-4">
            <div :class="`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
              tx.type === 'in' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`">
              <ArrowDownRight v-if="tx.type === 'in'" :size="18" />
              <ArrowUpRight v-else :size="18" />
            </div>
            <div>
              <p class="font-black text-sm text-gci">{{ tx.name }}</p>
              <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{{ tx.date }}</p>
            </div>
          </div>
          <span :class="`font-black text-sm ${
            tx.type === 'in' ? 'text-green-600' : 'text-gci'
          }`">
            {{ tx.amount }}
          </span>
        </div>
      </template>
      <div v-else class="text-center py-12 text-slate-400">
        <FileText :size="28" class="mx-auto mb-2 text-slate-300" />
        <p class="text-xs font-semibold text-slate-600">Nenhuma movimentação</p>
        <p class="text-[11px] text-slate-400 mt-0.5">Seu extrato de operações aparecerá aqui.</p>
      </div>
    </div>
  </motion.div>
</template>
