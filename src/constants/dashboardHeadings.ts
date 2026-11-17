export interface DashboardHeadingTexts {
  title: string;
  subtitle: string;
}

export const HOME_HEADING: DashboardHeadingTexts = {
  title: 'Olá, Eduardo! Boas vindas.',
  subtitle: 'Acelere seu fluxo de caixa agora mesmo.',
};

export const CARTEIRA_HEADING: DashboardHeadingTexts = {
  title: 'Minha Carteira',
  subtitle: 'Acompanhe o desempenho e os títulos da sua carteira ativa.',
};

export const OPERACOES_HEADING: DashboardHeadingTexts = {
  title: 'Minhas Operações',
  subtitle: 'Gerencie e acompanhe o status de suas solicitações.',
};

export const CADASTRO_HEADING: DashboardHeadingTexts = {
  title: 'Complete o seu Cadastro',
  subtitle: 'Complete a sua jornada cadastral para liberação do seu limite de crédito.',
};

export const GERAL_TITLE = 'Minhas Informações';

export const getGeralSubtitle = (selectedGroup: string) =>
  `Aqui está o resumo financeiro da ${selectedGroup} hoje.`;
