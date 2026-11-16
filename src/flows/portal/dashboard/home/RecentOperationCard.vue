<script setup lang="ts">
import { motion } from 'motion-v';
import { Calendar, FileText } from 'lucide-vue-next';
import type { PortalOperation } from '@/types/portalOperation';

/** Cartão resumido de operação recente (Home). */
const props = defineProps<{
  op: PortalOperation;
}>();

const emit = defineEmits<{
  open: [op: PortalOperation];
}>();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
    @click="emit('open', props.op)"
    class="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
  >
    <div class="flex items-center justify-between mb-4">
      <div :class="`w-10 h-10 rounded-xl flex items-center justify-center ${
        op.status === 'Finalizado' ? 'bg-green-50 text-green-600' :
        op.status === 'Rejeitado' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-agro-orange'
      }`">
        <FileText :size="20" />
      </div>
      <span :class="`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border ${
         op.status === 'Rejeitado' ? 'border-red-100 text-red-500' :
         op.status === 'Finalizado' ? 'border-green-100 text-green-600' :
         'border-orange-100 text-agro-orange'
      }`">
        {{ op.status }}
      </span>
    </div>
    <p class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">#{{ op.id }}</p>
    <h4 class="font-black text-gci text-sm mb-4 line-clamp-1">{{ op.title }}</h4>
    <div class="flex items-center justify-between pt-4 border-t border-gray-50">
      <span class="text-sm font-black text-gci">{{ op.value }}</span>
      <span class="text-[10px] items-center gap-1 text-gray-400 font-bold flex">
        <Calendar :size="12" />
        {{ op.date }}
      </span>
    </div>
  </motion.div>
</template>
