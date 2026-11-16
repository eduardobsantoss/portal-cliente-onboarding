<script setup lang="ts">
import PartnerCard from '@/components/forms/PartnerCard.vue';
import StatusChip from '@/components/ui/StatusChip.vue';
import type { NonPartnerRepresentative } from '@/types/representante';

const props = defineProps<{
  rep: NonPartnerRepresentative;
}>();

const emit = defineEmits<{
  edit: [rep: NonPartnerRepresentative];
  delete: [id: string];
}>();
</script>

<template>
  <PartnerCard
    avatar-class-name="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold text-xs shrink-0"
    details-class-name="space-y-0.5"
    actions-class-name="flex items-center gap-2 self-end sm:self-center"
    delete-title="Remover Representante"
    :on-delete="() => emit('delete', props.rep.id)"
    @edit="emit('edit', rep)"
  >
    <template #avatar>RL</template>
    <template #details>
      <div class="flex items-center gap-2 flex-wrap">
        <h4 class="text-xs font-bold text-slate-900">{{ rep.nome }}</h4>
        <StatusChip tone="warning">{{ rep.vinculo }}</StatusChip>
        <StatusChip tone="muted">Cargo: {{ rep.cargo }}</StatusChip>
      </div>
      <p class="text-[11px] text-slate-500">
        CPF: {{ rep.cpf }} • {{ rep.email }} • {{ rep.telefone }}
      </p>
      <p class="text-[10px] text-slate-400">
        Estado civil: {{ rep.estadoCivil }}
        <template v-if="rep.nomeConjuge">
          • Cônjuge: {{ rep.nomeConjuge }} ({{ rep.regimeBens || 'Comunhão parcial' }})
        </template>
      </p>
    </template>
  </PartnerCard>
</template>
