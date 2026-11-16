<script setup lang="ts">
import { DASHBOARD_SERVICES } from '@/constants/dashboardServices';

/** Atalhos de serviços (desconto de duplicata / contratos fiduciários). */
const emit = defineEmits<{
  selectService: [serviceLabel: string];
}>();
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <button
      v-for="service in DASHBOARD_SERVICES"
      :key="service.id"
      :disabled="!service.active"
      :class="`bg-white border border-slate-100 p-5 rounded-2xl flex flex-col items-center text-center gap-3 transition-all group relative ${
        service.active
          ? 'hover:border-gci/20 hover:shadow-md active:scale-[0.98]'
          : 'opacity-60 cursor-not-allowed'
      }`"
      @click="service.active && emit('selectService', service.label)"
    >
      <div
        v-if="!service.active"
        class="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <span class="bg-gci text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl">Em breve</span>
      </div>
      <div :class="`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
        service.active
          ? 'bg-slate-50 text-gci group-hover:bg-gci group-hover:text-white'
          : 'bg-slate-100 text-slate-400'
      }`">
        <component :is="service.icon" :size="20" />
      </div>
      <span :class="`text-[11px] font-bold leading-tight uppercase tracking-wide ${
        service.active ? 'text-gci' : 'text-slate-400'
      }`">{{ service.label }}</span>
    </button>
  </div>
</template>
