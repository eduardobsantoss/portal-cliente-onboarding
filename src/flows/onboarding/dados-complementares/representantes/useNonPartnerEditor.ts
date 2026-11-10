import React, { useState } from 'react';
import { INITIAL_NON_PARTNER_FORM } from '@/constants/complementaryForm';
import type { NonPartnerRepresentative } from '@/types/representante';
import { buildBlankNonPartnerForm, buildNonPartnerFromForm } from '@/utils/representante';

interface UseNonPartnerEditorOptions {
  clearValidationNotice: () => void;
}

export function useNonPartnerEditor({ clearValidationNotice }: UseNonPartnerEditorOptions) {
  const [reps, setReps] = useState<NonPartnerRepresentative[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<NonPartnerRepresentative>>(INITIAL_NON_PARTNER_FORM);

  const openAdd = () => {
    setEditingId(null);
    setForm(buildBlankNonPartnerForm());
    setIsModalOpen(true);
  };

  const openEdit = (rep: NonPartnerRepresentative) => {
    setEditingId(rep.id);
    setForm({ ...rep });
    setIsModalOpen(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.cpf) return;

    if (editingId) {
      setReps((prev) =>
        prev.map((r) =>
          r.id === editingId ? ({ ...r, ...form } as NonPartnerRepresentative) : r
        )
      );
    } else {
      setReps((prev) => [...prev, buildNonPartnerFromForm(form)]);
    }
    setIsModalOpen(false);
    clearValidationNotice();
  };

  const remove = (id: string) => {
    setReps((prev) => prev.filter((r) => r.id !== id));
  };

  return {
    reps,
    isModalOpen,
    editingId,
    form,
    setForm,
    openAdd,
    openEdit,
    closeModal: () => setIsModalOpen(false),
    save,
    remove,
  };
}

export type NonPartnerEditor = ReturnType<typeof useNonPartnerEditor>;
