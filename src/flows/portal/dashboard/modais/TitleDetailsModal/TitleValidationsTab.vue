<script setup lang="ts">
import { AlertTriangle, Clock, Info } from 'lucide-vue-next';
import { TITLE_VALIDATION_ERROR_CODE } from '@/mocks/titleDetails';
import type { Titulo } from '@/types/titulo';
import DetailsAlertBanner from '@/flows/portal/dashboard/modais/comum/DetailsAlertBanner.vue';

defineProps<{
  titulo: Titulo;
}>();
</script>

<template>
  <div class="space-y-6">
    <DetailsAlertBanner tone="danger" :icon="AlertTriangle">
      <h4 class="text-lg font-black text-red-600 mb-1">Validação Crítica</h4>
      <p class="text-sm text-slate-600 leading-relaxed">
        O contato do sacado (<span class="font-bold">{{ titulo.sacado }}</span>) cadastrado no XML é inválido ou inexistente.
      </p>
      <p class="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
        <Info :size="12" />
        {{ `Código de Erro: ${TITLE_VALIDATION_ERROR_CODE}` }}
      </p>
    </DetailsAlertBanner>

    <DetailsAlertBanner tone="warning" :icon="Clock">
      <h4 class="text-lg font-black text-gci mb-1">Aviso de Vencimento Proximo</h4>
      <p class="text-sm text-slate-600 leading-relaxed">
        Este título possui vencimento em <span class="font-bold">{{ titulo.vencimento }}</span>. Certifique-se de que o termo de cessão foi assinado pelo sacado.
      </p>
    </DetailsAlertBanner>
  </div>
</template>
