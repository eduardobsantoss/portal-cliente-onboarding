<script setup lang="ts">
import { motion } from 'motion-v';

defineProps<{
  email: string;
  phone: string;
}>();

const emit = defineEmits<{
  emailChange: [value: string];
  phoneChange: [value: string];
  cancel: [];
  save: [];
}>();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: -10 }"
    :animate="{ opacity: 1, y: 0 }"
    class="bg-orange-50/50 border border-orange-100 p-8 rounded-3xl space-y-6 mb-8"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail do Contato</label>
        <input
          type="email"
          :value="email"
          @input="emit('emailChange', ($event.target as HTMLInputElement).value)"
          placeholder="ex: financeiro@email.com"
          class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-gci focus:outline-none focus:border-agro-orange transition-all"
        />
      </div>
      <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
        <input
          type="text"
          :value="phone"
          @input="emit('phoneChange', ($event.target as HTMLInputElement).value)"
          placeholder="(00) 00000-0000"
          class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-gci focus:outline-none focus:border-agro-orange transition-all"
        />
      </div>
    </div>
    <div class="flex items-center justify-end gap-3">
      <button
        @click="emit('cancel')"
        class="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
      >
        Cancelar
      </button>
      <button
        @click="emit('save')"
        class="bg-agro-orange text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-agro-orange/20 hover:bg-agro-orange/90 transition-all"
      >
        Salvar Contato
      </button>
    </div>
  </motion.div>
</template>
