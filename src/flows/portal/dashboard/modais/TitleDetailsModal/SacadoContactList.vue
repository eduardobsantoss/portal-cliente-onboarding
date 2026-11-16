<script setup lang="ts">
import { Shield, X } from 'lucide-vue-next';
import type { SacadoContact } from '@/types/titulo';

defineProps<{
  contacts: SacadoContact[];
}>();

const emit = defineEmits<{
  makePrincipal: [contactId: string];
  remove: [contactId: string];
}>();
</script>

<template>
  <div class="space-y-8 pt-4">
    <div v-for="contact in contacts" :key="contact.id" class="flex flex-col md:flex-row items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100 relative group">
      <div v-if="contact.isPrincipal" class="absolute -top-3 left-6 bg-agro-orange text-white text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-lg shadow-agro-orange/20 flex items-center gap-1">
        <Shield :size="10" fill="currentColor" />
        Principal
      </div>

      <div class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-1">
          <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">E-mail</p>
          <p class="text-sm font-bold text-gci">{{ contact.email }}</p>
        </div>
        <div class="space-y-1">
          <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Telefone</p>
          <p class="text-sm font-bold text-gci">{{ contact.phone }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          v-if="!contact.isPrincipal"
          @click="emit('makePrincipal', contact.id)"
          class="text-[9px] font-black text-slate-400 hover:text-agro-orange uppercase tracking-widest transition-colors"
        >
          Tornar Principal
        </button>
        <button
          @click="emit('remove', contact.id)"
          class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all border border-slate-100 opacity-0 group-hover:opacity-100"
        >
          <X :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>
