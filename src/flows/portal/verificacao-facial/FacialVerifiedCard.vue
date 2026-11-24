<script setup lang="ts">
import { CheckCircle2 } from 'lucide-vue-next';
import TcNotice from '@/components/theme/TcNotice.vue';
import TcStatusChip from '@/components/theme/TcStatusChip.vue';
import {
  MOCK_FACIAL_AUDIT_STATUS,
  MOCK_FACIAL_IDENTIFIER,
  MOCK_FACIAL_LIVENESS_SCORE,
} from '@/mocks/facialVerification';

const FACTS = [
  { label: 'Identificador', value: MOCK_FACIAL_IDENTIFIER },
  { label: 'Liveness Score', value: MOCK_FACIAL_LIVENESS_SCORE },
  { label: 'Status de Auditoria', value: MOCK_FACIAL_AUDIT_STATUS },
];
</script>

<template>
  <TcNotice tone="success" :icon="CheckCircle2" title="Biometria Facial Validada com Sucesso">
    <div class="flex flex-col gap-[var(--space-3)]">
      <div>
        <TcStatusChip tone="success">Prova de Vida Aprovada</TcStatusChip>
      </div>
      <p class="m-0">Reconhecimento facial do sócio administrador autenticado e auditado digitalmente.</p>

      <dl class="m-0 grid grid-cols-1 gap-[var(--space-3)] sm:grid-cols-3">
        <div v-for="fact in FACTS" :key="fact.label" class="min-w-0 rounded-[var(--radius-md)] bg-[var(--surface-card)] p-[var(--space-3)]">
          <dt class="text-[length:var(--text-xs)] text-[color:var(--text-muted)]">{{ fact.label }}</dt>
          <dd class="m-0 font-[number:var(--weight-semibold)] [overflow-wrap:anywhere]">{{ fact.value }}</dd>
        </div>
      </dl>
    </div>
  </TcNotice>
</template>
