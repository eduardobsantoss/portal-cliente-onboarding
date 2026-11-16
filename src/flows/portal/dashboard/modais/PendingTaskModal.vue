<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { AlertCircle, X } from 'lucide-vue-next';
import ModalFrame from '@/components/ui/ModalFrame.vue';
import type { PendingTask } from '@/types/notification';

defineProps<{
  task: PendingTask | null;
}>();

const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <AnimatePresence>
    <ModalFrame
      v-if="task"
      key="pending-task-modal"
      overlay-class-name="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/40 backdrop-blur-md"
      panel-class-name="bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
    >
      <div class="p-8 border-b border-gray-100 flex items-center justify-between bg-white">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-agro-orange">
            <AlertCircle :size="24" />
          </div>
          <div>
            <h2 class="text-xl font-black text-gci tracking-tight">{{ task.title }}</h2>
            <p class="text-[10px] text-gray-400 font-black uppercase tracking-widest">Operação #{{ task.details.opId }}</p>
          </div>
        </div>
        <button
          @click="emit('close')"
          class="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gci hover:bg-gray-100 transition-colors"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="p-8 space-y-6">
        <div class="bg-slate-50 rounded-3xl p-6 border border-slate-100">
          <p class="text-sm text-slate-600 leading-relaxed">
            Dos <span class="font-black text-gci">{{ task.details.total }} títulos</span> que você enviou na operação <span class="font-black text-gci">#{{ task.details.opId }}</span>, foram aprovados somente <span class="font-black text-agro-orange">{{ task.details.approved }} títulos</span> e já foram registrados no sistema.
          </p>
        </div>

        <p class="text-xs text-slate-400 font-medium text-center px-4">
          Deseja confirmar o registro desses títulos ou recusar a operação?
        </p>
      </div>

      <div class="p-8 pt-0 flex gap-4">
        <button
          @click="emit('close')"
          class="flex-1 bg-white border-2 border-slate-100 text-slate-400 py-4 rounded-2xl font-bold text-sm hover:border-red-100 hover:text-red-500 transition-all active:scale-[0.98]"
        >
          Recusar
        </button>
        <button
          @click="emit('close')"
          class="flex-1 bg-gci hover:bg-gci-hover text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-gci/20 active:scale-[0.98]"
        >
          Confirmar Registro
        </button>
      </div>
    </ModalFrame>
  </AnimatePresence>
</template>
