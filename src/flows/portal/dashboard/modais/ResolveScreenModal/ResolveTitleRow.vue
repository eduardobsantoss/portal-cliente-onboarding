<script setup lang="ts">
import { Link, Upload } from 'lucide-vue-next';
import type { Titulo } from '@/types/titulo';
import ResolveActionButton from './ResolveActionButton.vue';

defineProps<{
  titulo: Titulo;
  index: number;
}>();

const emit = defineEmits<{
  uploadCanhoto: [titulo: Titulo];
  sendLink: [titulo: Titulo];
}>();
</script>

<template>
  <tr :class="`border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors ${index % 2 === 0 ? '' : 'bg-slate-50/10'}`">
    <td class="px-8 py-6">
      <div class="flex flex-col">
        <span class="text-sm font-black text-gci uppercase tracking-tighter italic">{{ titulo.titulo }}</span>
        <span class="text-[10px] text-slate-400 font-bold mt-0.5">{{ titulo.sacado }}</span>
      </div>
    </td>
    <td class="px-8 py-6 text-xs font-black text-slate-600 uppercase italic">
      {{ titulo.lastro }} / {{ titulo.numero }}
    </td>
    <td class="px-8 py-6 text-xs font-black text-slate-400 uppercase italic">
      {{ titulo.cessao }}
    </td>
    <td class="px-8 py-6">
      <div class="flex items-center justify-center gap-3">
        <ResolveActionButton
          :done="titulo.canhotoEnviado"
          label="Subir Canhoto"
          done-label="Canhoto Enviado"
          :icon="Upload"
          todo-class-name="bg-orange-50 border-orange-100 text-agro-orange hover:bg-orange-100"
          @click="emit('uploadCanhoto', titulo)"
        />

        <ResolveActionButton
          :done="titulo.linkEnviado"
          label="Link de Confirmação"
          done-label="Link Enviado"
          :icon="Link"
          todo-class-name="bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100"
          @click="emit('sendLink', titulo)"
        />
      </div>
    </td>
  </tr>
</template>
