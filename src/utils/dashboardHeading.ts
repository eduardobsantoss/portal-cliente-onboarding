import {
  CADASTRO_HEADING,
  CARTEIRA_HEADING,
  GERAL_TITLE,
  HOME_HEADING,
  HOME_SUBTITLE_WITHOUT_LIMIT,
  OPERACOES_HEADING,
  getGeralSubtitle,
  type DashboardHeadingTexts,
} from '@/constants/dashboardHeadings';
import type { DashboardTab } from '@/types/dashboard';

/** Título/subtítulo do cabeçalho da página; qualquer outra aba cai no texto da análise de crédito. */
export function getDashboardHeading(
  activeTab: DashboardTab,
  selectedGroup: string,
  isLimitReleased: boolean,
): DashboardHeadingTexts {
  switch (activeTab) {
    case 'home':
      return isLimitReleased
        ? HOME_HEADING
        : { title: HOME_HEADING.title, subtitle: HOME_SUBTITLE_WITHOUT_LIMIT };
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
