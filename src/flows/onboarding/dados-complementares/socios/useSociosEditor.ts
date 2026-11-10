import React, { useState } from 'react';
import { INITIAL_SOCIO_FORM } from '@/constants/complementaryForm';
import { INITIAL_SOCIOS } from '@/mocks/complementarySocios';
import type { AddressValues } from '@/types/forms';
import type { Socio } from '@/types/socio';
import { buildBlankSocioForm, buildSocioFromForm, hasSocioOptionalData } from '@/utils/socio';

interface UseSociosEditorOptions {
  /** endereço da sede, usado para pré-preencher novos sócios */
  companyAddress: AddressValues;
  clearValidationNotice: () => void;
}

export function useSociosEditor({ companyAddress, clearValidationNotice }: UseSociosEditorOptions) {
  const [socios, setSocios] = useState<Socio[]>(INITIAL_SOCIOS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Socio>>(INITIAL_SOCIO_FORM);
  const [showOptionals, setShowOptionals] = useState(false);

  // Open modal for new socio
  const openAdd = () => {
    setEditingId(null);
    setForm(buildBlankSocioForm(companyAddress));
    setShowOptionals(false);
    setIsModalOpen(true);
  };

  // Open modal to edit socio
  const openEdit = (socio: Socio) => {
    setEditingId(socio.id);
    setForm({ ...socio });
    setShowOptionals(hasSocioOptionalData(socio));
    setIsModalOpen(true);
  };

  // Save socio
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.cpfCnpj) return;

    if (editingId) {
      setSocios((prev) =>
        prev.map((s) => (s.id === editingId ? ({ ...s, ...form } as Socio) : s))
      );
    } else {
      setSocios((prev) => [...prev, buildSocioFromForm(form)]);
    }

    setIsModalOpen(false);
  };

  // Toggle Representante Legal directly on socio card
  const toggleRepresentante = (socioId: string) => {
    setSocios((prev) =>
      prev.map((s) => (s.id === socioId ? { ...s, isRepresentanteLegal: !s.isRepresentanteLegal } : s))
    );
    clearValidationNotice();
  };

  // Delete socio
  const remove = (id: string) => {
    if (socios.length <= 1) {
      alert('É obrigatório manter pelo menos 1 sócio cadastrado.');
      return;
    }
    setSocios((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    socios,
    isModalOpen,
    editingId,
    form,
    setForm,
    showOptionals,
    toggleOptionals: () => setShowOptionals(!showOptionals),
    openAdd,
    openEdit,
    closeModal: () => setIsModalOpen(false),
    save,
    toggleRepresentante,
    remove,
  };
}

export type SociosEditor = ReturnType<typeof useSociosEditor>;
