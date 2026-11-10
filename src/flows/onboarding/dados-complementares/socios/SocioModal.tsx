import React from 'react';
import { Users } from 'lucide-react';
import { AddressFields } from '@/components/forms/AddressFields';
import { CheckboxField } from '@/components/ui/CheckboxField';
import { Modal } from '@/components/ui/Modal';
import { ModalFormActions } from '@/components/ui/ModalFormActions';
import { ModalHeader } from '@/components/ui/ModalHeader';
import { SocioContactFields } from '@/flows/onboarding/dados-complementares/socios/SocioContactFields';
import { SocioOptionalSection } from '@/flows/onboarding/dados-complementares/socios/SocioOptionalSection';
import type { SociosEditor } from '@/flows/onboarding/dados-complementares/socios/useSociosEditor';
import { pickSocioAddress } from '@/utils/socio';

interface SocioModalProps {
  editor: SociosEditor;
}

export const SocioModal: React.FC<SocioModalProps> = ({ editor }) => {
  const { form, setForm, editingId } = editor;

  return (
    <Modal isOpen={editor.isModalOpen}>
      <ModalHeader
        icon={<Users size={20} className="text-gci" />}
        title={editingId ? 'Editar Sócio' : 'Adicionar Sócio / Administrador'}
        onClose={editor.closeModal}
      />

      <form onSubmit={editor.save} className="space-y-6">
        {/* Obrigatórios Sócio */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Dados Pessoais e de Contato (Obrigatórios)
            </h4>
            {/* Toggle de Representante Legal no modal */}
            <CheckboxField
              checked={Boolean(form.isRepresentanteLegal)}
              onChange={(checked) => setForm({ ...form, isRepresentanteLegal: checked })}
              labelClassName="flex items-center gap-2 cursor-pointer px-3 py-1 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800"
              inputClassName="w-4 h-4 rounded text-gci focus:ring-gci border-emerald-300"
            >
              Representante legal
            </CheckboxField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <SocioContactFields form={form} setForm={setForm} />
          </div>
        </div>

        {/* Endereço do Sócio */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Endereço do Sócio (Obrigatório)
          </h4>

          <AddressFields
            variant="modal"
            values={pickSocioAddress(form)}
            logradouroLabel="Logradouro *"
            ufLabel="UF *"
            onFieldChange={(field, value) => setForm({ ...form, [field]: value })}
          />
        </div>

        {/* Opcionais Sócio */}
        <SocioOptionalSection
          form={form}
          setForm={setForm}
          isOpen={editor.showOptionals}
          onToggle={editor.toggleOptionals}
        />

        <ModalFormActions
          submitLabel={editingId ? 'Atualizar Sócio' : 'Salvar Sócio'}
          onCancel={editor.closeModal}
        />
      </form>
    </Modal>
  );
};
