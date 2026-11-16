<script setup lang="ts">
import { Eye, Upload } from 'lucide-vue-next';

defineProps<{
  isRejected: boolean;
  isUploaded: boolean;
  isOptional: boolean;
}>();

const emit = defineEmits<{
  /** Abre o seletor de arquivos (input oculto da linha). */
  pick: [];
  preview: [];
}>();

const SECONDARY_BUTTON_CLASS =
  'px-2.5 py-1.5 text-slate-500 hover:text-gci text-[11px] font-semibold bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors flex items-center gap-1';

/** Botões da linha: "Substituir Arquivo" (rejeitado), "Ver" + "Substituir" (enviado) ou "Anexar". */
</script>

<template>
  <button
    v-if="isRejected"
    class="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
    @click="emit('pick')"
  >
    <Upload :size="12" />
    Substituir Arquivo
  </button>

  <div v-else-if="isUploaded" class="flex items-center gap-1.5">
    <button :class="SECONDARY_BUTTON_CLASS" @click="emit('preview')">
      <Eye :size="12" /> Ver
    </button>
    <button :class="SECONDARY_BUTTON_CLASS" @click="emit('pick')">
      <Upload :size="12" /> Substituir
    </button>
  </div>

  <button
    v-else
    class="px-3 py-1.5 bg-gci hover:bg-gci-hover text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
    @click="emit('pick')"
  >
    <Upload :size="12" />
    {{ isOptional ? 'Anexar (Opcional)' : 'Anexar Arquivo' }}
  </button>
</template>
