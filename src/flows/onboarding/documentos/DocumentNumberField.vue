<script setup lang="ts">
defineProps<{
  value: string;
}>();

const emit = defineEmits<{ change: [value: string] }>();
</script>

<template>
  <div class="mt-2.5 pt-2 border-t border-slate-200/60 max-w-md">
    <label class="block text-[11px] font-bold text-slate-700 mb-1">
      Número do Documento (CPF / RG / CNH) *
    </label>
    <input
      type="text"
      :value="value"
      placeholder="Digite o CPF ou RG..."
      class="w-full px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci transition-all shadow-sm"
      @input="emit('change', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
