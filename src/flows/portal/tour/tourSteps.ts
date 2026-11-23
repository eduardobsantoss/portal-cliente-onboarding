/** Passos do tour guiado do portal: cada um destaca um elemento marcado com `data-tour`. */
export type TourPlacement = 'right' | 'bottom';

export interface TourStep {
  id: string;
  /** Valor do atributo `data-tour` do elemento destacado. */
  target: string;
  title: string;
  body: string;
  placement: TourPlacement;
  /** Passos do menu lateral: a sidebar precisa estar aberta para o item aparecer. */
  needsSidebar: boolean;
}

export const TOUR_INTRO = {
  title: 'Bem-vindo ao Portal do Cliente',
  body: 'Quer fazer um tour rápido pelo portal? Em menos de um minuto você conhece cada área e sabe por onde começar.',
  startLabel: 'Fazer tutorial',
  skipLabel: 'Pular',
};

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'home',
    target: 'nav-home',
    title: 'Home',
    body: 'Seu resumo financeiro, o limite disponível e o atalho para antecipar recebíveis.',
    placement: 'right',
    needsSidebar: true,
  },
  {
    id: 'geral',
    target: 'nav-geral',
    title: 'Minhas Informações',
    body: 'Dados cadastrais da empresa, quadro societário e os serviços disponíveis para contratar.',
    placement: 'right',
    needsSidebar: true,
  },
  {
    id: 'carteira',
    target: 'nav-carteira',
    title: 'Carteira',
    body: 'Seus títulos, confirmações de entrega, canhoto digital e cessões de recebíveis.',
    placement: 'right',
    needsSidebar: true,
  },
  {
    id: 'operacoes',
    target: 'nav-operacoes',
    title: 'Operações',
    body: 'Acompanhe cada operação na esteira de crédito e solicite novas contratações.',
    placement: 'right',
    needsSidebar: true,
  },
  {
    id: 'documentos',
    target: 'nav-documentos',
    title: 'Compl. Cadastro',
    body: 'Acompanhe a confirmação por SMS e a biometria facial já concluídas e complete os documentos do quadro societário para finalizar o seu cadastro.',
    placement: 'right',
    needsSidebar: true,
  },
  {
    id: 'header',
    target: 'header-actions',
    title: 'Pendências e troca de grupo',
    body: 'Avisos e tarefas pendentes ficam no sino. No seu perfil você troca de grupo, refaz este tutorial ou sai do portal.',
    placement: 'bottom',
    needsSidebar: false,
  },
];
