import type { PersonField } from '@/types/forms';

export const REGIMES_DE_BENS = [
  'Comunhão parcial de bens',
  'Comunhão universal de bens',
  'Separação total de bens',
  'Separação obrigatória de bens',
  'Participação final nos aquestos',
];

export const EMPRESA_TIPOS = [
  'Sociedade empresária limitada',
  'Sociedade limitada unipessoal',
  'Sociedade anônima',
  'Empresário individual',
  'MEI',
  'Sociedade simples',
  'Sociedade cooperativa',
  'Sociedade de associação privada',
  'Condomínio edifício',
];

export const ESTADOS_CIVIS = [
  'Solteiro(a)',
  'Casado(a)',
  'União Estável',
  'Divorciado(a)',
  'Viúvo(a)',
];

export const ESTADOS_CIVIS_COM_CONJUGE = ['Casado(a)', 'União Estável'];

export const GENEROS_COMPLETO = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'];
export const GENEROS_SOCIO = ['Masculino', 'Feminino', 'Outro'];

export const RESPONSABILIDADES_SOCIO = ['Sócio', 'Representante legal', 'Procurador'];
export const VINCULOS_REPRESENTANTE = ['Administrador não sócio', 'Procurador'];

export const PJ_STEP_LABELS: Record<1 | 2 | 3, string> = {
  1: '1. Dados da Empresa',
  2: '2. Endereço da Empresa',
  3: '3. Quadro de Sócios',
};

export const PJ_TOTAL_STEPS = 3;

export const PF_PERSON_FIELDS: PersonField[] = [
  'dataNascimento',
  'genero',
  'nacionalidade',
  'nomeMae',
  'profissao',
  'renda',
];

export const PF_PERSON_LABELS: Partial<Record<PersonField, string>> = {
  profissao: 'Profissão / Ocupação *',
  renda: 'Renda Mensal Estimada (R$) *',
};

export const PF_PERSON_PLACEHOLDERS: Partial<Record<PersonField, string>> = {
  nomeMae: 'Nome completo da mãe',
  profissao: 'Ex: Produtor Rural / Administrador',
  renda: 'Ex: 25.000,00',
};

export const PF_RENDA_NOTICE = 'Comprovação de renda compatível será solicitada na próxima etapa';

export const SOCIO_PERSON_FIELDS: PersonField[] = [
  'dataNascimento',
  'nomeMae',
  'profissao',
  'renda',
  'genero',
  'nacionalidade',
];
