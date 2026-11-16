<script setup lang="ts">
defineProps<{
  availability: string;
  storeName: string;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    type="button"
    @click="emit('click')"
    class="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
  >
    <slot name="logo" />
    <div class="text-left">
      <span class="text-[9px] block text-white/60 font-normal leading-tight">{{ availability }}</span>
      <span class="text-xs font-bold leading-tight">{{ storeName }}</span>
    </div>
  </button>
</template>
