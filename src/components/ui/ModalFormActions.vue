<script setup lang="ts">
defineProps<{
  submitLabel: string;
}>();

const emit = defineEmits<{ cancel: [] }>();
</script>

<template>
  <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
    <button
      type="button"
      class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
      @click="emit('cancel')"
    >
      Cancelar
    </button>
    <button
      type="submit"
      class="px-6 py-2.5 rounded-xl bg-gci hover:bg-gci-hover text-white font-bold text-xs transition-colors shadow-sm"
    >
      {{ submitLabel }}
    </button>
  </div>
</template>
