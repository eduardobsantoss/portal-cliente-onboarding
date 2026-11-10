import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { MaritalStatusFields } from '@/components/forms/MaritalStatusFields';
import { PepField } from '@/components/forms/PepField';
import { PersonFields } from '@/components/forms/PersonFields';
import { Modal } from '@/components/ui/Modal';
import { ModalFormActions } from '@/components/ui/ModalFormActions';
import { ModalHeader } from '@/components/ui/ModalHeader';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import { VINCULOS_REPRESENTANTE } from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import type { NonPartnerEditor } from '@/flows/onboarding/dados-complementares/representantes/useNonPartnerEditor';
import type { NonPartnerRepresentative } from '@/types/representante';
import { applyMaritalStatusChange, pickMaritalStatus } from '@/utils/maritalStatus';

interface NonPartnerModalProps {
  editor: NonPartnerEditor;
}

const INPUT_CLASS = FIELD_VARIANT_STYLES.modal.input;

export const NonPartnerModal: React.FC<NonPartnerModalProps> = ({ editor }) => {
  const { form, setForm, editingId } = editor;

  return (
    <Modal isOpen={editor.isModalOpen}>
      <ModalHeader
        icon={<ShieldCheck size={20} className="text-gci" />}
        title={editingId ? 'Editar Representante Não Sócio' : 'Adicionar Representante Que Não É Sócio'}
        onClose={editor.closeModal}
      />

      <form onSubmit={editor.save} className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Dados do Administrador Não Sócio ou Procurador
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <TextField
              wrapperClassName="sm:col-span-2"
              label="Nome Completo *"
              required
              placeholder="Nome completo do representante"
              value={form.nome || ''}
              onChange={(value) => setForm({ ...form, nome: value })}
              inputClassName={INPUT_CLASS}
            />

            <TextField
              label="CPF *"
              required
              placeholder="000.000.000-00"
              value={form.cpf || ''}
              onChange={(value) => setForm({ ...form, cpf: value })}
              inputClassName={INPUT_CLASS}
            />

            <SelectField
              label="Tipo de Vínculo *"
              required
              value={form.vinculo || 'Administrador não sócio'}
              options={VINCULOS_REPRESENTANTE}
              onChange={(value) =>
                setForm({ ...form, vinculo: value as NonPartnerRepresentative['vinculo'] })
              }
              inputClassName={INPUT_CLASS}
            />

            <TextField
              label="Cargo / Função *"
              required
              placeholder="Ex: Diretor Financeiro, Procurador Legal"
              value={form.cargo || ''}
              onChange={(value) => setForm({ ...form, cargo: value })}
              inputClassName={INPUT_CLASS}
            />

            <PersonFields
              variant="modal"
              values={{ dataNascimento: form.dataNascimento || '' }}
              fields={['dataNascimento']}
              onFieldChange={(field, value) => setForm({ ...form, [field]: value })}
            />

            <TextField
              type="email"
              label="E-mail *"
              required
              placeholder="representante@email.com"
              value={form.email || ''}
              onChange={(value) => setForm({ ...form, email: value })}
              inputClassName={INPUT_CLASS}
            />

            <TextField
              label="Celular / Telefone *"
              required
              placeholder="(00) 00000-0000"
              value={form.telefone || ''}
              onChange={(value) => setForm({ ...form, telefone: value })}
              inputClassName={INPUT_CLASS}
            />

            {/* Estado Civil e Cônjuge (Item 6) */}
            <MaritalStatusFields
              variant="modal"
              values={pickMaritalStatus(form)}
              onEstadoCivilChange={(estadoCivil) =>
                setForm((prev) => applyMaritalStatusChange(prev, estadoCivil))
              }
              onFieldChange={(field, value) => setForm({ ...form, [field]: value })}
            />

            <PepField
              checked={form.pep || false}
              onChange={(checked) => setForm({ ...form, pep: checked })}
              label="Pessoa Politicamente Exposta (PEP)"
            />
          </div>
        </div>

        <ModalFormActions
          submitLabel={editingId ? 'Atualizar Representante' : 'Salvar Representante'}
          onCancel={editor.closeModal}
        />
      </form>
    </Modal>
  );
};
