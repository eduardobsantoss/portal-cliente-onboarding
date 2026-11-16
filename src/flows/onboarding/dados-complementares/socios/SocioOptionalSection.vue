<script setup lang="ts">
import PepField from '@/components/forms/PepField.vue';
import CollapsibleSection from '@/components/ui/CollapsibleSection.vue';
import TextField from '@/components/ui/TextField.vue';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import type { Socio } from '@/types/socio';

defineProps<{
  form: Partial<Socio>;
  setForm: SetState<Partial<Socio>>;
  isOpen: boolean;
}>();

const emit = defineEmits<{ toggle: [] }>();
</script>

<template>
  <CollapsibleSection
    :is-open="isOpen"
    button-class-name="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
    @toggle="emit('toggle')"
  >
    <template #header>
      <span class="text-xs font-bold text-slate-700">
        Informações adicionais do sócio (Opcional)
      </span>
    </template>
    <div
      class="p-4 pt-2 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"
    >
      <TextField
        label-class-name="block text-[11px] font-medium text-slate-600 mb-1"
        input-class-name="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
        :value="form.nomePai || ''"
        @change="setForm({ ...form, nomePai: $event })"
      >
        <template #label>Nome do Pai</template>
      </TextField>

      <PepField
        :checked="form.pep || false"
        label="Pessoa Politicamente Exposta (PEP)"
        @change="(checked) => setForm({ ...form, pep: checked })"
      />
    </div>
  </CollapsibleSection>
</template>
