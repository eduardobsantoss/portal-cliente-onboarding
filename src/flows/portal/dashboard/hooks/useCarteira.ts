import { ref, type UnwrapNestedRefs } from 'vue';
import { EMPTY_CONFIRMACAO_DATA } from '@/constants/confirmacao';
import { INITIAL_TITULOS } from '@/mocks/portalCollections';
import type { ConfirmacaoData, Titulo, TituloDetails } from '@/types/titulo';
import { toggleListItem } from '@/utils/toggleListItem';

/** Carteira de títulos: lista, seleção, filtros, registro de confirmação e detalhes do título. */
export function useCarteira() {
  const titulosList = ref<Titulo[]>(INITIAL_TITULOS);
  const selectedTitulos = ref<number[]>([]);
  const selectedTituloDetails = ref<TituloDetails | null>(null);
  const showFilterModal = ref(false);
  const showConfirmacaoModal = ref(false);
  const confirmacaoData = ref<ConfirmacaoData>({ ...EMPTY_CONFIRMACAO_DATA });
  const hasPendingConfirmations = ref(false);

  const handleSelectTitulo = (id: number) => {
    selectedTitulos.value = toggleListItem(selectedTitulos.value, id);
  };

  const handleSelectAllTitulos = (ids: number[]) => {
    if (selectedTitulos.value.length === ids.length) {
      selectedTitulos.value = [];
    } else {
      selectedTitulos.value = ids;
    }
  };

  const handleRegisterConfirmacao = () => {
    // Simular registro
    alert('Confirmação registrada com sucesso para ' + selectedTitulos.value.length + ' títulos.');
    showConfirmacaoModal.value = false;
    selectedTitulos.value = [];
    confirmacaoData.value = { ...EMPTY_CONFIRMACAO_DATA };
  };

  const handleOpenTituloDetails = (titulo: Titulo) => {
    selectedTituloDetails.value = { ...titulo, currentTab: 'DETALHES_TITULO' };
  };

  return {
    titulosList,
    selectedTitulos,
    selectedTituloDetails,
    showFilterModal,
    showConfirmacaoModal,
    confirmacaoData,
    hasPendingConfirmations,
    handleSelectTitulo,
    handleSelectAllTitulos,
    handleRegisterConfirmacao,
    handleOpenTituloDetails,
  };
}

/** Estado desembrulhado (use `reactive(useCarteira())` para repassar aos componentes filhos). */
export type CarteiraState = UnwrapNestedRefs<ReturnType<typeof useCarteira>>;
