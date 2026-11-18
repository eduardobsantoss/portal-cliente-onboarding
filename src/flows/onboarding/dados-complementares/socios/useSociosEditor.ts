import { ref, toValue, type MaybeRefOrGetter } from 'vue';
import { INITIAL_SOCIO_FORM } from '@/constants/complementaryForm';
import { createSetter } from '@/flows/onboarding/dados-complementares/stateSetter';
import { INITIAL_SOCIOS } from '@/mocks/complementarySocios';
import type { AddressValues } from '@/types/forms';
import type { Socio } from '@/types/socio';
import { buildBlankSocioForm, buildSocioFromForm, hasSocioOptionalData } from '@/utils/socio';

interface UseSociosEditorOptions {
  /** endereço da sede, usado para pré-preencher novos sócios */
  companyAddress: MaybeRefOrGetter<AddressValues>;
  clearValidationNotice: () => void;
}

export function useSociosEditor({ companyAddress, clearValidationNotice }: UseSociosEditorOptions) {
  // Começa vazio: os sócios chegam do QSA da Receita (ou dos dados de exemplo).
  const socios = ref<Socio[]>([]);
  const isModalOpen = ref(false);
  const editingId = ref<string | null>(null);
  const form = ref<Partial<Socio>>(INITIAL_SOCIO_FORM);
  const showOptionals = ref(false);

  const setSocios = createSetter(socios);
  const setForm = createSetter(form);

  /** Substitui a lista pelos sócios pré-cadastrados a partir do QSA da Receita. */
  const loadFromReceita = (loaded: Socio[]) => {
    setSocios(loaded);
    clearValidationNotice();
  };

  /** Substitui a lista pelos sócios de exemplo (preenchimento manual de demonstração). */
  const loadMock = () => {
    setSocios(INITIAL_SOCIOS);
    clearValidationNotice();
  };

  /** Esvazia a lista (ex.: o CNPJ foi alterado). */
  const clear = () => {
    setSocios([]);
    clearValidationNotice();
  };

  // Open modal for new socio
  const openAdd = () => {
    editingId.value = null;
    form.value = buildBlankSocioForm(toValue(companyAddress));
    showOptionals.value = false;
    isModalOpen.value = true;
  };

  // Open modal to edit socio
  const openEdit = (socio: Socio) => {
    editingId.value = socio.id;
    form.value = { ...socio };
    showOptionals.value = hasSocioOptionalData(socio);
    isModalOpen.value = true;
  };

  // Save socio
  const save = (e: Event) => {
    e.preventDefault();
    if (!form.value.nome || !form.value.cpfCnpj) return;

    const currentId = editingId.value;
    const currentForm = form.value;
    if (currentId) {
      setSocios((prev) =>
        prev.map((s) => (s.id === currentId ? ({ ...s, ...currentForm } as Socio) : s))
      );
    } else {
      setSocios((prev) => [...prev, buildSocioFromForm(currentForm)]);
    }

    isModalOpen.value = false;
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
    if (socios.value.length <= 1) {
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
    toggleOptionals: () => {
      showOptionals.value = !showOptionals.value;
    },
    loadFromReceita,
    loadMock,
    clear,
    openAdd,
    openEdit,
    closeModal: () => {
      isModalOpen.value = false;
    },
    save,
    toggleRepresentante,
    remove,
  };
}

export type SociosEditor = ReturnType<typeof useSociosEditor>;
