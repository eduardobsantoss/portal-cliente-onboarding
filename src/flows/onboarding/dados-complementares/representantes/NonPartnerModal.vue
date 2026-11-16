<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next';
import MaritalStatusFields from '@/components/forms/MaritalStatusFields.vue';
import PepField from '@/components/forms/PepField.vue';
import PersonFields from '@/components/forms/PersonFields.vue';
import Modal from '@/components/ui/Modal.vue';
import ModalFormActions from '@/components/ui/ModalFormActions.vue';
import ModalHeader from '@/components/ui/ModalHeader.vue';
import SelectField from '@/components/ui/SelectField.vue';
import TextField from '@/components/ui/TextField.vue';
import { VINCULOS_REPRESENTANTE } from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import type { NonPartnerEditor } from '@/flows/onboarding/dados-complementares/representantes/useNonPartnerEditor';
import type { NonPartnerRepresentative } from '@/types/representante';
import { applyMaritalStatusChange, pickMaritalStatus } from '@/utils/maritalStatus';

const props = defineProps<{
  editor: NonPartnerEditor;
}>();

const INPUT_CLASS = FIELD_VARIANT_STYLES.modal.input;

// refs/funções estáveis do composable (o objeto `editor` não é recriado)
const { form, setForm, editingId, isModalOpen, closeModal, save } = props.editor;
</script>

<template>
  <Modal :is-open="isModalOpen">
    <ModalHeader
      :title="
        editingId ? 'Editar Representante Não Sócio' : 'Adicionar Representante Que Não É Sócio'
      "
      @close="closeModal"
    >
      <template #icon><ShieldCheck :size="20" class="text-gci" /></template>
    </ModalHeader>

    <form class="space-y-6" @submit="save">
      <div class="space-y-4">
        <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Dados do Administrador Não Sócio ou Procurador
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <TextField
            wrapper-class-name="sm:col-span-2"
            required
            placeholder="Nome completo do representante"
            :value="form.nome || ''"
            :input-class-name="INPUT_CLASS"
            @change="setForm({ ...form, nome: $event })"
          >
            <template #label>Nome Completo *</template>
          </TextField>

          <TextField
            required
            placeholder="000.000.000-00"
            :value="form.cpf || ''"
            :input-class-name="INPUT_CLASS"
            @change="setForm({ ...form, cpf: $event })"
          >
            <template #label>CPF *</template>
          </TextField>

          <SelectField
            required
            :value="form.vinculo || 'Administrador não sócio'"
            :options="VINCULOS_REPRESENTANTE"
            :input-class-name="INPUT_CLASS"
            @change="
              setForm({ ...form, vinculo: $event as NonPartnerRepresentative['vinculo'] })
            "
          >
            <template #label>Tipo de Vínculo *</template>
          </SelectField>

          <TextField
            required
            placeholder="Ex: Diretor Financeiro, Procurador Legal"
            :value="form.cargo || ''"
            :input-class-name="INPUT_CLASS"
            @change="setForm({ ...form, cargo: $event })"
          >
            <template #label>Cargo / Função *</template>
          </TextField>

          <PersonFields
            variant="modal"
            :values="{ dataNascimento: form.dataNascimento || '' }"
            :fields="['dataNascimento']"
            @field-change="(field, value) => setForm({ ...form, [field]: value })"
          />

          <TextField
            type="email"
            required
            placeholder="representante@email.com"
            :value="form.email || ''"
            :input-class-name="INPUT_CLASS"
            @change="setForm({ ...form, email: $event })"
          >
            <template #label>E-mail *</template>
          </TextField>

          <TextField
            required
            placeholder="(00) 00000-0000"
            :value="form.telefone || ''"
            :input-class-name="INPUT_CLASS"
            @change="setForm({ ...form, telefone: $event })"
          >
            <template #label>Celular / Telefone *</template>
          </TextField>

          <!-- Estado Civil e Cônjuge (Item 6) -->
          <MaritalStatusFields
            variant="modal"
            :values="pickMaritalStatus(form)"
            @estado-civil-change="
              (estadoCivil) => setForm((prev) => applyMaritalStatusChange(prev, estadoCivil))
            "
            @field-change="(field, value) => setForm({ ...form, [field]: value })"
          />

          <PepField
            :checked="form.pep || false"
            label="Pessoa Politicamente Exposta (PEP)"
            @change="(checked) => setForm({ ...form, pep: checked })"
          />
        </div>
      </div>

      <ModalFormActions
        :submit-label="editingId ? 'Atualizar Representante' : 'Salvar Representante'"
        @cancel="closeModal"
      />
    </form>
  </Modal>
</template>
