import { useState } from 'react';
import type { SacadoContact, Titulo } from '@/types/titulo';
import { toggleListItem } from '@/utils/toggleListItem';

interface UseLinkSelectionParams {
  resolutionTitulo: Titulo | null;
  setResolutionTitulo: (titulo: Titulo | null) => void;
  titulosList: Titulo[];
  setTitulosList: (titulos: Titulo[]) => void;
  setHasPendingConfirmations: (value: boolean) => void;
  sacadoContacts: SacadoContact[];
}

/** Modal "Enviar Link de Confirmação": canais e destinatários escolhidos e disparo do link. */
export function useLinkSelection({
  resolutionTitulo,
  setResolutionTitulo,
  titulosList,
  setTitulosList,
  setHasPendingConfirmations,
  sacadoContacts,
}: UseLinkSelectionParams) {
  const [showLinkSelectionModal, setShowLinkSelectionModal] = useState(false);
  const [selectedSacados, setSelectedSacados] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['whatsapp']);

  const openLinkSelectionModal = (titulo: Titulo) => {
    setResolutionTitulo(titulo);
    setShowLinkSelectionModal(true);
  };

  const closeLinkSelectionModal = () => {
    setShowLinkSelectionModal(false);
    setResolutionTitulo(null);
  };

  const toggleChannel = (channelId: string) => setSelectedChannels(prev => toggleListItem(prev, channelId));

  const toggleSacado = (contactId: string) => setSelectedSacados(prev => toggleListItem(prev, contactId));

  const toggleAllSacados = () => {
    const allIds = sacadoContacts.map(c => c.id);
    if (selectedSacados.length === allIds.length) setSelectedSacados([]);
    else setSelectedSacados(allIds);
  };

  const submitLinkSelection = () => {
    const updatedList = titulosList.map(t => t.id === resolutionTitulo.id ? {
      ...t,
      actionStatus: 'Pendente de Análise',
      status: 'Pendente de Análise',
      linkEnviado: true
    } : t);

    setTitulosList(updatedList);

    const hasPending = updatedList.some(t => t.actionStatus === 'Pendência');
    if (!hasPending) {
      setHasPendingConfirmations(false);
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

export type LinkSelectionState = ReturnType<typeof useLinkSelection>;
