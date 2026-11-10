import type { TituloDetailsTab } from '@/types/titulo';

export const TITLE_DETAILS_TABS: { id: TituloDetailsTab; label: string }[] = [
  { id: 'DETALHES_TITULO', label: 'Detalhes do Título' },
  { id: 'ANEXOS', label: 'Anexos' },
  { id: 'VALIDACOES', label: 'Validações' },
  { id: 'MOVIMENTACOES', label: 'Movimentações' },
  { id: 'SACADO', label: 'Sacado' },
];

export const DEFAULT_TITLE_DETAILS_TAB: TituloDetailsTab = 'DETALHES_TITULO';
