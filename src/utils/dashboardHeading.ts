import {
  CADASTRO_HEADING,
  CARTEIRA_HEADING,
  GERAL_TITLE,
  HOME_HEADING,
  OPERACOES_HEADING,
  getGeralSubtitle,
  type DashboardHeadingTexts,
} from '@/constants/dashboardHeadings';
import type { DashboardTab } from '@/types/dashboard';

/** Título/subtítulo do cabeçalho da página; qualquer outra aba cai no texto do cadastro (como no original). */
export function getDashboardHeading(activeTab: DashboardTab, selectedGroup: string): DashboardHeadingTexts {
  switch (activeTab) {
    case 'home':
      return HOME_HEADING;
    case 'geral':
      return { title: GERAL_TITLE, subtitle: getGeralSubtitle(selectedGroup) };
    case 'carteira':
      return CARTEIRA_HEADING;
    case 'operacoes':
      return OPERACOES_HEADING;
    default:
      return CADASTRO_HEADING;
  }
}
