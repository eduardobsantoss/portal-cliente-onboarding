<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import type { SacadoContact } from '@/types/titulo';

defineProps<{
  sacado: string | undefined;
  contacts: SacadoContact[];
  selectedSacados: string[];
}>();

const emit = defineEmits<{
  toggleSacado: [contactId: string];
  toggleAll: [];
}>();
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between ml-1">
      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contatos do Sacado ({{ sacado }})</label>
      <button
        @click="emit('toggleAll')"
        class="text-[10px] font-black text-agro-orange uppercase tracking-widest hover:underline"
      >
        {{ selectedSacados.length === contacts.length ? 'Desmarcar Todos' : 'Selecionar Todos' }}
      </button>
    </div>

    <div class="space-y-3">
      <div
        v-for="contact in contacts"
        :key="contact.id"
        @click="emit('toggleSacado', contact.id)"
        :class="`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
          selectedSacados.includes(contact.id)
            ? 'border-gci bg-gci/5'
            : 'border-slate-50 bg-slate-50 hover:border-slate-200'
        }`"
      >
        <div class="flex items-center gap-4">
          <div :class="`w-10 h-10 rounded-xl flex items-center justify-center ${selectedSacados.includes(contact.id) ? 'bg-gci text-white' : 'bg-white text-slate-300 border border-slate-100'}`">
            <Check v-if="selectedSacados.includes(contact.id)" :size="20" :stroke-width="3" />
            <div v-else class="w-5 h-5 rounded border-2 border-slate-200" />
          </div>
          <div>
            <p class="font-black text-sm text-gci uppercase tracking-tight">{{ contact.email }}</p>
            <p class="text-[10px] text-slate-400 font-bold tracking-widest">{{ contact.phone }} {{ contact.isPrincipal && '• PRINCIPAL' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
