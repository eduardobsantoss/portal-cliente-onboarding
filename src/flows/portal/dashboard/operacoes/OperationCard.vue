<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import { ArrowUpRight, Building2, Calendar, FileText } from 'lucide-vue-next';
import type { PortalOperation } from '@/types/portalOperation';

/** Cartão de operação da aba Operações. */
const props = defineProps<{
  op: PortalOperation;
}>();

const emit = defineEmits<{
  openDetails: [op: PortalOperation];
}>();

const steps = computed(() => [
  { label: 'Envio', completed: true },
  { label: 'Análise', completed: props.op.status !== 'Rejeitado' },
  { label: 'Assinatura', completed: props.op.status === 'Finalizado' },
  { label: 'Liberação', completed: props.op.status === 'Finalizado' },
]);
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
    class="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
  >
    <div class="absolute top-0 right-0 w-24 h-24 bg-gci/5 rounded-bl-[64px] -mr-4 -mt-4"></div>

    <div class="flex items-center justify-between mb-8 relative z-10">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-gci/5 flex items-center justify-center text-gci group-hover:bg-gci group-hover:text-white transition-all">
          <FileText :size="24" />
        </div>
        <div>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#{{ op.id }}</p>
          <h3 class="font-black text-gci text-lg leading-tight">{{ op.type }}</h3>
        </div>
      </div>
    </div>

    <div class="space-y-6 relative z-10">
      <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <p class="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">Grupo Empresarial</p>
          <p class="font-bold text-gci truncate">{{ op.title }}</p>
        </div>
        <div class="text-right shrink-0">
          <p class="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">Valor Estimado</p>
          <p class="text-lg font-black text-gci">{{ op.value }}</p>
        </div>
      </div>

      <!-- Progress Indicator inside card -->
      <div class="flex items-center gap-1.5 p-1 bg-slate-50 rounded-xl">
        <div v-for="(s, idx) in steps" :key="idx" class="flex-1 flex flex-col gap-1">
          <div :class="`h-1 rounded-full transition-all ${
            s.completed ? 'bg-agro-orange' : 'bg-slate-200'
          }`" />
          <span :class="`text-[7px] font-black uppercase tracking-tighter text-center ${
            s.completed ? 'text-agro-orange' : 'text-slate-300'
          }`">
            {{ s.label }}
          </span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <p class="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">Status</p>
          <span :class="`text-[10px] font-black px-3 py-1 rounded-lg flex items-center gap-1.5 uppercase tracking-wider border ${
            op.status === 'Rejeitado' ? 'bg-red-50 text-red-500 border-red-100' :
            op.status === 'Finalizado' ? 'bg-green-50 text-green-600 border-green-100' :
            op.status === 'Em andamento' ? 'bg-blue-50 text-blue-600 border-blue-100' :
            'bg-orange-50 text-agro-orange border-orange-100 animate-pulse'
          }`">
            {{ op.status }}
          </span>
        </div>
        <div class="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
          <Calendar :size="12" class="text-slate-300" />
          {{ op.date }}
        </div>
      </div>
    </div>

    <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between relative z-10">
      <div class="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
        <Building2 :size="14" />
        <span>{{ op.date }}</span>
      </div>
      <button
        @click="emit('openDetails', op)"
        class="flex items-center gap-1 text-[10px] font-black text-gci hover:text-agro-orange transition-colors uppercase tracking-widest"
      >
        Detalhes
        <ArrowUpRight :size="14" />
      </button>
    </div>
  </motion.div>
</template>
