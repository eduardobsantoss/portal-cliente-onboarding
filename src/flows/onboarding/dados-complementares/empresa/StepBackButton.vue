<script setup lang="ts">
defineProps<{
  label: string;
}>();

const emit = defineEmits<{ click: [] }>();
</script>

<template>
  <button
    type="button"
    class="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all"
    @click="emit('click')"
  >
    {{ label }}
  </button>
</template>
