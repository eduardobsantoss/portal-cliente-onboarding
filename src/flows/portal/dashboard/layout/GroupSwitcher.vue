<script setup lang="ts">
import { Building2 } from 'lucide-vue-next';
import { CORPORATE_GROUPS } from '@/mocks/economicGroups';

/** Lista de grupos econômicos para troca de grupo. */
defineProps<{
  selectedGroup: string;
}>();

const emit = defineEmits<{
  selectGroup: [group: string];
}>();
</script>

<template>
  <div class="border-t border-slate-50 py-2">
    <div class="px-5 py-2">
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grupo Selecionado</p>
    </div>
    <button
      v-for="group in CORPORATE_GROUPS"
      :key="group"
      @click="emit('selectGroup', group)"
      class="w-full flex items-center justify-between px-5 py-2 text-sm hover:bg-slate-50 transition-colors"
    >
      <div class="flex items-center gap-3">
        <Building2 :size="16" :class="selectedGroup === group ? 'text-agro-orange' : 'text-slate-400'" />
        <span :class="selectedGroup === group ? 'font-bold text-gci' : 'text-slate-600'">{{ group }}</span>
      </div>
      <div v-if="selectedGroup === group" class="w-1.5 h-1.5 rounded-full bg-agro-orange" />
    </button>
  </div>
</template>
