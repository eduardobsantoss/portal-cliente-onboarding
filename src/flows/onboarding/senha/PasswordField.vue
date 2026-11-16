<script setup lang="ts">
import { Lock, Eye, EyeOff } from 'lucide-vue-next';

defineProps<{
  label: string;
  placeholder: string;
  value: string;
  show: boolean;
}>();

const emit = defineEmits<{
  change: [value: string];
  toggleShow: [];
}>();
</script>

<template>
  <div class="space-y-1.5">
    <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
      {{ label }}
    </label>
    <div class="relative group">
      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-gci transition-colors">
        <Lock :size="17" />
      </div>
      <input
        :type="show ? 'text' : 'password'"
        :placeholder="placeholder"
        :value="value"
        @input="emit('change', ($event.target as HTMLInputElement).value)"
        class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-11 text-sm font-medium focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all placeholder:text-slate-400 text-slate-800"
      />
      <button
        type="button"
        @click="emit('toggleShow')"
        class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-gci transition-colors"
        :tabindex="-1"
      >
        <EyeOff v-if="show" :size="17" />
        <Eye v-else :size="17" />
      </button>
    </div>
  </div>
</template>
