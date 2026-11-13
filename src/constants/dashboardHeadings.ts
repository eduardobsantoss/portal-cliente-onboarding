export interface DashboardHeadingTexts {
  title: string;
  subtitle: string;
}

export const HOME_HEADING: DashboardHeadingTexts = {
  title: 'Olá, Eduardo! Boas vindas.',
  subtitle: 'Acelere seu fluxo de caixa agora mesmo.',
};

export const HOME_SUBTITLE_WITHOUT_LIMIT = 'Falta pouco para liberar o seu limite de crédito.';

export const CARTEIRA_HEADING: DashboardHeadingTexts = {
  title: 'Minha Carteira',
  subtitle: 'Acompanhe o desempenho e os títulos da sua carteira ativa.',
};

export const OPERACOES_HEADING: DashboardHeadingTexts = {
  title: 'Minhas Operações',
  subtitle: 'Gerencie e acompanhe o status de suas solicitações.',
};

export const CADASTRO_HEADING: DashboardHeadingTexts = {
  title: 'Conclua sua Análise de Crédito',
  subtitle: 'Envie as informações e documentos para liberarmos o seu limite de crédito.',
};

export const GERAL_TITLE = 'Minhas Informações';

export const getGeralSubtitle = (selectedGroup: string) =>
  `Aqui está o resumo financeiro da ${selectedGroup} hoje.`;
