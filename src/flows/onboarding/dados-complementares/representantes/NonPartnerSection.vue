<script setup lang="ts">
import ListSectionHeader from '@/components/forms/ListSectionHeader.vue';
import NonPartnerCard from '@/flows/onboarding/dados-complementares/representantes/NonPartnerCard.vue';
import type { NonPartnerEditor } from '@/flows/onboarding/dados-complementares/representantes/useNonPartnerEditor';

const props = defineProps<{
  editor: NonPartnerEditor;
}>();

// refs estáveis do composable (o objeto `editor` não é recriado)
const { reps, openAdd, openEdit, remove } = props.editor;

/** SEÇÃO PRÓPRIA: Representantes Legais Não Sócios (Item 3) */
</script>

<template>
  <div class="pt-4 border-t border-slate-100 space-y-4">
    <ListSectionHeader
      title="Representantes Legais Não Sócios"
      description="Cadastre administradores não sócios ou procuradores com poderes de representação."
      action-label="Adicionar representante que não é sócio"
      @action="openAdd"
    />

    <div
      v-if="reps.length === 0"
      class="p-4 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400"
    >
      Nenhum representante não sócio cadastrado. Se houver administrador ou procurador externo, clique acima.
    </div>
    <div v-else class="space-y-2.5">
      <NonPartnerCard
        v-for="rep in reps"
        :key="rep.id"
        :rep="rep"
        @edit="openEdit"
        @delete="remove"
      />
    </div>
  </div>
</template>
