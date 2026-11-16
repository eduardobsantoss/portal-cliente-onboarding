<script setup lang="ts">
/** Campo de data/hora com ícone à esquerda do modal de confirmação. */
defineProps<{
  label: string;
  type: 'date' | 'time';
  value: string;
}>();

const emit = defineEmits<{ change: [value: string] }>();
</script>

<template>
  <div class="space-y-2">
    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ label }}</label>
    <div class="relative">
      <slot name="icon" />
      <input
        :type="type"
        :value="value"
        @input="emit('change', ($event.target as HTMLInputElement).value)"
        class="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gci focus:outline-none focus:border-agro-orange transition-all"
      />
    </div>
  </div>
</template>
