<script setup lang="ts">
import { Upload } from 'lucide-vue-next';

const emit = defineEmits<{
  fileUpload: [];
}>();
</script>

<template>
  <div
    class="group border-[3px] border-dashed border-slate-100 rounded-[32px] p-16 flex flex-col items-center justify-center gap-6 bg-slate-50/50 hover:bg-white hover:border-agro-orange/30 hover:shadow-2xl hover:shadow-agro-orange/5 transition-all cursor-pointer"
    @click="emit('fileUpload')"
  >
    <div class="w-20 h-20 rounded-[24px] bg-white flex items-center justify-center text-slate-300 group-hover:text-agro-orange group-hover:bg-orange-50 transition-all shadow-sm">
      <Upload :size="32" />
    </div>
    <div class="text-center">
      <p class="text-xl font-black text-gci">Arraste ou clique para enviar</p>
      <p class="text-sm font-bold text-slate-400 mt-2">Apenas arquivos .xml são aceitos nesta etapa</p>
    </div>
  </div>
</template>
