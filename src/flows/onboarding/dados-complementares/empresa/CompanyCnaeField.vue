<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next';

defineProps<{
  value: string;
  hasDataErrors: boolean;
}>();

const emit = defineEmits<{ change: [value: string] }>();
</script>

<template>
  <div class="sm:col-span-2">
    <div class="flex items-center justify-between mb-1">
      <label class="block text-[11px] font-bold text-slate-700">CNAE Principal *</label>
      <span
        v-if="hasDataErrors"
        class="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1"
      >
        <AlertCircle :size="11" /> Divergência cadastral
      </span>
    </div>
    <input
      type="text"
      required
      placeholder="Ex: 01.15-6/00 - Cultivo de soja"
      :value="value"
      :class="`w-full px-3.5 py-2.5 rounded-xl border font-medium focus:outline-none focus:ring-2 ${
        hasDataErrors
          ? 'border-amber-400 bg-amber-50/40 text-slate-900 focus:ring-amber-500/20'
          : 'border-slate-200 bg-white focus:ring-gci/20 focus:border-gci'
      }`"
      @input="emit('change', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="hasDataErrors" class="text-[11px] text-amber-700 mt-1 font-medium">
      Por favor, confirme se o CNAE informado coincide com a atividade principal da sua empresa.
    </p>
  </div>
</template>
