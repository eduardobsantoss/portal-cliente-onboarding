<script setup lang="ts">
import { Users } from 'lucide-vue-next';
import AddressFields from '@/components/forms/AddressFields.vue';
import CheckboxField from '@/components/ui/CheckboxField.vue';
import Modal from '@/components/ui/Modal.vue';
import ModalFormActions from '@/components/ui/ModalFormActions.vue';
import ModalHeader from '@/components/ui/ModalHeader.vue';
import SocioContactFields from '@/flows/onboarding/dados-complementares/socios/SocioContactFields.vue';
import SocioOptionalSection from '@/flows/onboarding/dados-complementares/socios/SocioOptionalSection.vue';
import type { SociosEditor } from '@/flows/onboarding/dados-complementares/socios/useSociosEditor';
import { pickSocioAddress } from '@/utils/socio';

const props = defineProps<{
  editor: SociosEditor;
}>();

// refs/funções estáveis do composable (o objeto `editor` não é recriado)
const {
  form,
  setForm,
  editingId,
  isModalOpen,
  showOptionals,
  toggleOptionals,
  closeModal,
  save,
} = props.editor;
</script>

<template>
  <Modal :is-open="isModalOpen">
    <ModalHeader
      :title="editingId ? 'Editar Sócio' : 'Adicionar Sócio / Administrador'"
      @close="closeModal"
    >
      <template #icon><Users :size="20" class="text-gci" /></template>
    </ModalHeader>

    <form class="space-y-6" @submit="save">
      <!-- Obrigatórios Sócio -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Dados Pessoais e de Contato (Obrigatórios)
          </h4>
          <!-- Toggle de Representante Legal no modal -->
          <CheckboxField
            :checked="Boolean(form.isRepresentanteLegal)"
            label-class-name="flex items-center gap-2 cursor-pointer px-3 py-1 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800"
            input-class-name="w-4 h-4 rounded text-gci focus:ring-gci border-emerald-300"
            @change="(checked) => setForm({ ...form, isRepresentanteLegal: checked })"
          >
            Representante legal
          </CheckboxField>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <SocioContactFields :form="form" :set-form="setForm" />
        </div>
      </div>

      <!-- Endereço do Sócio -->
      <div class="space-y-4">
        <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Endereço do Sócio (Obrigatório)
        </h4>

        <AddressFields
          variant="modal"
          :values="pickSocioAddress(form)"
          logradouro-label="Logradouro *"
          uf-label="UF *"
          @field-change="(field, value) => setForm({ ...form, [field]: value })"
        />
      </div>

      <!-- Opcionais Sócio -->
      <SocioOptionalSection
        :form="form"
        :set-form="setForm"
        :is-open="showOptionals"
        @toggle="toggleOptionals"
      />

      <ModalFormActions
        :submit-label="editingId ? 'Atualizar Sócio' : 'Salvar Sócio'"
        @cancel="closeModal"
      />
    </form>
  </Modal>
</template>
