<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import PartnerCard from '@/components/forms/PartnerCard.vue';
import CheckboxField from '@/components/ui/CheckboxField.vue';
import StatusChip from '@/components/ui/StatusChip.vue';
import type { Socio } from '@/types/socio';

const props = defineProps<{
  socio: Socio;
  index: number;
  /** ausente quando é o único sócio (não pode ser removido) */
  onDelete?: (socioId: string) => void;
}>();

const emit = defineEmits<{
  toggleRepresentante: [socioId: string];
  edit: [socio: Socio];
}>();
</script>

<template>
  <PartnerCard
    avatar-class-name="w-9 h-9 rounded-xl bg-slate-100 text-gci flex items-center justify-center font-bold text-xs shrink-0"
    details-class-name="space-y-1"
    actions-class-name="flex items-center gap-3 self-end sm:self-center shrink-0"
    delete-title="Remover Sócio"
    :on-delete="onDelete ? () => props.onDelete?.(socio.id) : undefined"
    @edit="emit('edit', socio)"
  >
    <template #avatar>{{ index + 1 }}</template>
    <template #details>
      <div class="flex items-center gap-2 flex-wrap">
        <h4 class="text-xs font-bold text-slate-900">{{ socio.nome }}</h4>
        <StatusChip tone="neutral">{{ socio.responsabilidade }}</StatusChip>
        <StatusChip v-if="socio.isRepresentanteLegal" tone="success">
          <Check :size="11" :stroke-width="3" /> Representante Legal
        </StatusChip>
      </div>
      <p class="text-[11px] text-slate-500">
        CPF/CNPJ: {{ socio.cpfCnpj }} • {{ socio.email }} • {{ socio.telefone }}
      </p>
      <p class="text-[10px] text-slate-400">
        {{ socio.cidade }}/{{ socio.uf }} • {{ socio.profissao }} • {{ socio.estadoCivil }}
        <template v-if="socio.regimeBens"> ({{ socio.regimeBens }})</template>
      </p>
    </template>
    <template #actionsPrefix>
      <!-- Checkbox Representante Legal no card do sócio -->
      <CheckboxField
        :checked="Boolean(socio.isRepresentanteLegal)"
        label-class-name="flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 transition-colors whitespace-nowrap shrink-0"
        @change="emit('toggleRepresentante', socio.id)"
      >
        Representante legal
      </CheckboxField>
    </template>
  </PartnerCard>
</template>
