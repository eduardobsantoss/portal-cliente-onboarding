<script setup lang="ts">
import { MOCK_DISBURSEMENT_ACCOUNTS } from '@/mocks/operationRequest';
import OperationTimeline from '@/flows/portal/solicitacao-operacao/OperationTimeline.vue';
import AccountOption from './AccountOption.vue';
import NewAccountNotice from './NewAccountNotice.vue';

defineProps<{
  selectedAccount: string;
}>();

const emit = defineEmits<{
  selectAccount: [accountId: string];
}>();
</script>

<template>
  <OperationTimeline step="ACCOUNT_SELECTION" />
  <div class="text-center space-y-3">
    <h2 class="text-3xl font-black text-gci tracking-tight">Conta para Desembolso</h2>
    <p class="text-slate-500 text-lg font-medium">Selecione para qual conta o valor será enviado.</p>
  </div>

  <div class="grid grid-cols-1 gap-4 pt-6">
    <AccountOption
      v-for="acc in MOCK_DISBURSEMENT_ACCOUNTS"
      :key="acc.id"
      :acc="acc"
      :selected-account="selectedAccount"
      @select="emit('selectAccount', $event)"
    />

    <NewAccountNotice />
  </div>
</template>
