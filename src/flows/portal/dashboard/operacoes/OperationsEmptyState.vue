<script setup lang="ts">
import { FileText } from 'lucide-vue-next';

/** Estado vazio "Nenhuma operação ativa". */
const emit = defineEmits<{
  viewServices: [];
}>();
</script>

<template>
  <div class="bg-white rounded-[40px] border border-gray-100 p-20 text-center flex flex-col items-center justify-center shadow-sm">
    <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
      <FileText :size="40" />
    </div>
    <h3 class="text-2xl font-black text-gci mb-3 tracking-tight">Nenhuma operação ativa</h3>
    <p class="text-gray-500 mb-8 max-w-md font-medium">Você ainda não possui solicitações em andamento. Inicie uma nova operação agora mesmo.</p>
    <button
      @click="emit('viewServices')"
      class="bg-gci text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-gci-hover transition-all shadow-xl shadow-gci/20 active:scale-[0.98]"
    >
      Ver Serviços Disponíveis
    </button>
  </div>
</template>
