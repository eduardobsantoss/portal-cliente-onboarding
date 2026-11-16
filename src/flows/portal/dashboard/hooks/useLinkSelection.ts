import { ref, toValue, type MaybeRefOrGetter, type Ref, type UnwrapNestedRefs } from 'vue';
import type { SacadoContact, Titulo } from '@/types/titulo';
import { toggleListItem } from '@/utils/toggleListItem';

interface UseLinkSelectionParams {
  resolutionTitulo: Ref<Titulo | null>;
  titulosList: Ref<Titulo[]>;
  hasPendingConfirmations: Ref<boolean>;
  sacadoContacts: MaybeRefOrGetter<SacadoContact[]>;
}

/** Modal "Enviar Link de Confirmação": canais e destinatários escolhidos e disparo do link. */
export function useLinkSelection({
  resolutionTitulo,
  titulosList,
  hasPendingConfirmations,
  sacadoContacts,
}: UseLinkSelectionParams) {
  const showLinkSelectionModal = ref(false);
  const selectedSacados = ref<string[]>([]);
  const selectedChannels = ref<string[]>(['whatsapp']);

  const openLinkSelectionModal = (titulo: Titulo) => {
    resolutionTitulo.value = titulo;
    showLinkSelectionModal.value = true;
  };

  const closeLinkSelectionModal = () => {
    showLinkSelectionModal.value = false;
    resolutionTitulo.value = null;
  };

  const toggleChannel = (channelId: string) => {
    selectedChannels.value = toggleListItem(selectedChannels.value, channelId);
  };

  const toggleSacado = (contactId: string) => {
    selectedSacados.value = toggleListItem(selectedSacados.value, contactId);
  };

  const toggleAllSacados = () => {
    const allIds = toValue(sacadoContacts).map(c => c.id);
    if (selectedSacados.value.length === allIds.length) selectedSacados.value = [];
    else selectedSacados.value = allIds;
  };

  const submitLinkSelection = () => {
    const updatedList = titulosList.value.map(t => t.id === resolutionTitulo.value!.id ? {
      ...t,
      actionStatus: 'Pendente de Análise',
      status: 'Pendente de Análise',
      linkEnviado: true
    } : t);

    titulosList.value = updatedList;

    const hasPending = updatedList.some(t => t.actionStatus === 'Pendência');
    if (!hasPending) {
      hasPendingConfirmations.value = false;
    }

    closeLinkSelectionModal();
  };

  return {
    showLinkSelectionModal,
    selectedSacados,
    selectedChannels,
    openLinkSelectionModal,
    closeLinkSelectionModal,
    toggleChannel,
    toggleSacado,
    toggleAllSacados,
    submitLinkSelection,
  };
}

/** Estado desembrulhado (use `reactive(useLinkSelection(...))` para repassar aos componentes filhos). */
export type LinkSelectionState = UnwrapNestedRefs<ReturnType<typeof useLinkSelection>>;
