import type { AnalysisProgressStage, AnalysisStepItem } from '@/types/analysis';

export const PRE_APPROVED_LIMIT_LABEL = 'R$ 2.000.000,00';

/** Limite exibido no portal depois da análise de crédito. Reusa o valor da pré-análise. */
export const LIMIT_AVAILABLE_LABEL = PRE_APPROVED_LIMIT_LABEL;

export const LIMIT_EMPTY_LABEL = 'R$ 0,00';

export const ANALYSIS_STEPS: AnalysisStepItem[] = [
  {
    id: 1,
    label: 'Autenticação e integridade do documento',
    detail: 'Verificação criptográfica e conferência do cartão CNPJ',
  },
  {
    id: 2,
    label: 'Conectando às bases de crédito e birôs regulamentados',
    detail: 'Consulta a bases de dados públicos e cadastros oficiais',
  },
  {
    id: 3,
    label: 'Consultando score e regularidade cadastral',
    detail: 'Checagem de adimplência, pendências financeiras e protestos',
  },
  {
    id: 4,
    label: 'Checagem de conformidade anticorrupção/PLD',
    detail: 'Auditoria de pessoas politicamente expostas (PEP) e sanções',
  },
  {
    id: 5,
    label: 'Processamento das regras de elegibilidade da conta GCI',
    detail: 'Definição de perfil operacional e limite de pré-aprovação',
  },
];

// Estágios da análise simulada: enquanto `elapsedSeconds < untilSeconds`, aplica stepIndex/progress
export const ANALYSIS_PROGRESS_STAGES: AnalysisProgressStage[] = [
  { untilSeconds: 4, stepIndex: 0, progress: 15 },
  { untilSeconds: 10, stepIndex: 1, progress: 35 },
  { untilSeconds: 17, stepIndex: 2, progress: 58 },
  { untilSeconds: 24, stepIndex: 3, progress: 82 },
  { untilSeconds: 30, stepIndex: 4, progress: 95 },
];
