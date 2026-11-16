<script setup lang="ts">
import { Plus } from 'lucide-vue-next';

const handleRegister = () => {
  alert('Para cadastrar uma nova conta, acesse a área de Configurações do seu perfil.');
};
</script>

<template>
  <div class="mt-6 p-6 rounded-[24px] bg-slate-50 border border-slate-200 border-dashed text-center">
    <p class="text-xs text-slate-400 font-bold mb-4">Precisa de outra conta?</p>
    <button
      class="inline-flex items-center gap-2 text-gci font-black text-xs uppercase tracking-widest hover:text-agro-orange transition-colors"
      @click="handleRegister"
    >
      <Plus :size="16" />
      CADASTRAR NOVA CONTA
    </button>
    <div class="mt-4 pt-4 border-t border-slate-200">
      <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed">
        Lembrando que ao cadastrar uma nova conta, a titularidade tem que ser de seu CNPJ. Caso contrário o desembolso não será realizado
      </p>
    </div>
  </div>
</template>
