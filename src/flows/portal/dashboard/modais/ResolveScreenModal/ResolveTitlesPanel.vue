<script setup lang="ts">
import type { Titulo } from '@/types/titulo';
import { isResolutionTitulo } from '@/utils/titulos';
import ResolveFooterNotice from './ResolveFooterNotice.vue';
import ResolveTitleRow from './ResolveTitleRow.vue';

defineProps<{
  titulosList: Titulo[];
}>();

const emit = defineEmits<{
  uploadCanhoto: [titulo: Titulo];
  sendLink: [titulo: Titulo];
  finish: [];
}>();
</script>

<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-100">
              <th class="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Título</th>
              <th class="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Lastro / Numero</th>
              <th class="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Cessão</th>
              <th class="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Ações para Resolução</th>
            </tr>
          </thead>
          <tbody>
            <ResolveTitleRow
              v-for="(titulo, idx) in titulosList.filter(isResolutionTitulo)"
              :key="titulo.id"
              :titulo="titulo"
              :index="idx"
              @upload-canhoto="emit('uploadCanhoto', $event)"
              @send-link="emit('sendLink', $event)"
            />
          </tbody>
        </table>
      </div>
    </div>

    <ResolveFooterNotice @finish="emit('finish')" />
  </div>
</template>
