import type { Socio } from '@/types/socio';

/** Faturamento usado pelo atalho de demonstração (mesmo valor dos dados de exemplo da empresa). */
export const MOCK_FATURAMENTO_ANUAL = '18.500.000,00';

type SocioPendingField =
  | 'cpfCnpj'
  | 'email'
  | 'telefone'
  | 'dataNascimento'
  | 'nomeMae'
  | 'profissao'
  | 'renda';

/** "João da Silva" -> "joao.silva@exemplo.com.br" (sem acentos, só primeiro e último nome). */
function buildMockEmail(name: string | undefined): string {
  const tokens = (name ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  const local =
    tokens.length > 1 ? `${tokens[0]}.${tokens[tokens.length - 1]}` : (tokens[0] ?? 'socio');
  return `${local}@exemplo.com.br`;
}

/**
 * Dados de exemplo para os campos do sócio que a Receita não fornece.
 * Devolve apenas os campos que ainda estão vazios, sem sobrescrever o que o usuário preencheu.
 */
export function buildMockSocioPendingFields(form: Partial<Socio>): Partial<Socio> {
  const mock: Record<SocioPendingField, string> = {
    cpfCnpj: '529.982.247-25',
    email: buildMockEmail(form.nome),
    telefone: '(34) 99999-0000',
    dataNascimento: '1980-01-15',
    nomeMae: 'Maria Aparecida da Silva',
    profissao: 'Administrador / Produtor Rural',
    renda: '45.000,00',
  };

  const result: Partial<Socio> = {};
  (Object.keys(mock) as SocioPendingField[]).forEach((field) => {
    if (!String(form[field] ?? '').trim()) result[field] = mock[field];
  });
  return result;
}
