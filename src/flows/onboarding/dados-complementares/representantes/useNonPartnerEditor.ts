import { ref } from 'vue';
import { INITIAL_NON_PARTNER_FORM } from '@/constants/complementaryForm';
import { createSetter } from '@/flows/onboarding/dados-complementares/stateSetter';
import type { NonPartnerRepresentative } from '@/types/representante';
import { buildBlankNonPartnerForm, buildNonPartnerFromForm } from '@/utils/representante';

interface UseNonPartnerEditorOptions {
  clearValidationNotice: () => void;
}

export function useNonPartnerEditor({ clearValidationNotice }: UseNonPartnerEditorOptions) {
  const reps = ref<NonPartnerRepresentative[]>([]);
  const isModalOpen = ref(false);
  const editingId = ref<string | null>(null);
  const form = ref<Partial<NonPartnerRepresentative>>(INITIAL_NON_PARTNER_FORM);

  const setReps = createSetter(reps);
  const setForm = createSetter(form);

  const openAdd = () => {
    editingId.value = null;
    form.value = buildBlankNonPartnerForm();
    isModalOpen.value = true;
  };

  const openEdit = (rep: NonPartnerRepresentative) => {
    editingId.value = rep.id;
    form.value = { ...rep };
    isModalOpen.value = true;
  };

  const save = (e: Event) => {
    e.preventDefault();
    if (!form.value.nome || !form.value.cpf) return;

    const currentId = editingId.value;
    const currentForm = form.value;
    if (currentId) {
      setReps((prev) =>
        prev.map((r) =>
          r.id === currentId ? ({ ...r, ...currentForm } as NonPartnerRepresentative) : r
        )
      );
    } else {
      setReps((prev) => [...prev, buildNonPartnerFromForm(currentForm)]);
    }
    isModalOpen.value = false;
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
    closeModal: () => {
      isModalOpen.value = false;
    },
    save,
    remove,
  };
}

export type NonPartnerEditor = ReturnType<typeof useNonPartnerEditor>;
