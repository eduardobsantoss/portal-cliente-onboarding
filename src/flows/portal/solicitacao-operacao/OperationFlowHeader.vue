<script setup lang="ts">
import { X } from 'lucide-vue-next';
import Logo from '@/components/ui/Logo.vue';

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <!-- Mobile Header -->
  <div class="lg:hidden p-6 border-b border-slate-50 flex items-center justify-between shrink-0">
    <Logo variant="dark" class-name="h-6" />
    <button class="p-2 text-slate-400 hover:text-gci" @click="emit('close')">
      <X :size="24" />
    </button>
  </div>

  <div class="absolute top-8 right-8 z-30 hidden lg:block">
    <button
      class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-gci transition-all group"
      @click="emit('close')"
    >
      <X :size="24" class="group-hover:rotate-90 transition-transform" />
    </button>
  </div>
</template>
