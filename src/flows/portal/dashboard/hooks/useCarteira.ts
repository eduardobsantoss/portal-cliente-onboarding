import { useState } from 'react';
import { EMPTY_CONFIRMACAO_DATA } from '@/constants/confirmacao';
import { INITIAL_TITULOS } from '@/mocks/portalCollections';
import type { ConfirmacaoData, Titulo, TituloDetails } from '@/types/titulo';
import { toggleListItem } from '@/utils/toggleListItem';

/** Carteira de títulos: lista, seleção, filtros, registro de confirmação e detalhes do título. */
export function useCarteira() {
  const [titulosList, setTitulosList] = useState<Titulo[]>(INITIAL_TITULOS);
  const [selectedTitulos, setSelectedTitulos] = useState<number[]>([]);
  const [selectedTituloDetails, setSelectedTituloDetails] = useState<TituloDetails | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);
  const [confirmacaoData, setConfirmacaoData] = useState<ConfirmacaoData>({ ...EMPTY_CONFIRMACAO_DATA });
  const [hasPendingConfirmations, setHasPendingConfirmations] = useState(false);

  const handleSelectTitulo = (id: number) => {
    setSelectedTitulos(prev => toggleListItem(prev, id));
  };

  const handleSelectAllTitulos = (ids: number[]) => {
    if (selectedTitulos.length === ids.length) {
      setSelectedTitulos([]);
    } else {
      setSelectedTitulos(ids);
    }
  };

  const handleRegisterConfirmacao = () => {
    // Simular registro
    alert('Confirmação registrada com sucesso para ' + selectedTitulos.length + ' títulos.');
    setShowConfirmacaoModal(false);
    setSelectedTitulos([]);
    setConfirmacaoData({ ...EMPTY_CONFIRMACAO_DATA });
  };

  const handleOpenTituloDetails = (titulo: Titulo) => {
    setSelectedTituloDetails({ ...titulo, currentTab: 'DETALHES_TITULO' });
  };

  return {
    titulosList,
    setTitulosList,
    selectedTitulos,
    selectedTituloDetails,
    setSelectedTituloDetails,
    showFilterModal,
    setShowFilterModal,
    showConfirmacaoModal,
    setShowConfirmacaoModal,
    confirmacaoData,
    setConfirmacaoData,
    hasPendingConfirmations,
    setHasPendingConfirmations,
    handleSelectTitulo,
    handleSelectAllTitulos,
    handleRegisterConfirmacao,
    handleOpenTituloDetails,
  };
}

export type CarteiraState = ReturnType<typeof useCarteira>;
