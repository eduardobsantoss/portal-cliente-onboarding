import type { PjCompanyFormData, PjLockedField } from '@/types/dadosComplementares';
import type { AddressValues } from '@/types/forms';
import type { ReceitaWsPartner, ReceitaWsResponse } from '@/types/receitaws';
import type { Socio } from '@/types/socio';
import { onlyDigits } from '@/utils/registrationMasks';
import { buildBlankSocioForm, buildSocioFromForm } from '@/utils/socio';

/** Código da natureza jurídica (CONCLA) para os tipos de empresa aceitos no formulário. */
const NATUREZA_JURIDICA_POR_CODIGO: Record<string, string> = {
  '206-2': 'Sociedade empresária limitada',
  '230-5': 'Sociedade limitada unipessoal',
  '204-6': 'Sociedade anônima',
  '205-4': 'Sociedade anônima',
  '213-5': 'Empresário individual',
  '214-3': 'Sociedade cooperativa',
  '223-2': 'Sociedade simples',
  '224-0': 'Sociedade simples',
  '399-9': 'Sociedade de associação privada',
};

export interface MappedCompany {
  company: Partial<PjCompanyFormData>;
  /** Campos que a API devolveu com valor e que, por isso, ficam travados. */
  locked: PjLockedField[];
}

const clean = (value: string | undefined | null): string => (value ?? '').trim();

/** "01/08/1966" -> "1966-08-01". Devolve vazio se o formato não for reconhecido. */
export function parseReceitaDate(value: string | undefined): string {
  const match = clean(value).match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : '';
}

/** "1500000.00" -> "1.500.000,00". */
export function formatCapitalSocial(value: string | undefined): string {
  const raw = clean(value);
  if (!raw) return '';
  const amount = Number(raw);
  if (!Number.isFinite(amount)) return '';
  return amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** "70.040-912" ou "70040912" -> "70040-912". */
export function formatCep(value: string | undefined): string {
  const digits = onlyDigits(clean(value)).slice(0, 8);
  if (digits.length !== 8) return clean(value);
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

/** "64.22-1-00" + texto -> "64.22-1/00 - Bancos múltiplos...". */
export function formatCnae(activity: { code: string; text: string } | undefined): string {
  if (!activity) return '';
  const code = clean(activity.code).replace(/^(\d{2}\.\d{2}-\d)-(\d{2})$/, '$1/$2');
  const text = clean(activity.text);
  if (!code) return text;
  return text ? `${code} - ${text}` : code;
}

/** Converte a natureza jurídica da Receita em um dos `EMPRESA_TIPOS`; vazio se não houver correspondência. */
export function mapNaturezaJuridica(data: ReceitaWsResponse): string {
  const text = clean(data.natureza_juridica);
  const code = text.match(/^(\d{3}-\d)/)?.[1];

  if (code === '213-5' && data.simei?.optante) return 'MEI';
  if (code && NATUREZA_JURIDICA_POR_CODIGO[code]) return NATUREZA_JURIDICA_POR_CODIGO[code];
  if (/condom[ií]nio/i.test(text)) return 'Condomínio edifício';
  return '';
}

/** Monta os dados da empresa a partir da resposta da Receita e lista os campos que vieram preenchidos. */
export function mapReceitaToCompany(data: ReceitaWsResponse, cnpj: string): MappedCompany {
  const numero = clean(data.numero);
  const values: Partial<PjCompanyFormData> = {
    razaoSocial: clean(data.nome),
    cnpj,
    dataAbertura: parseReceitaDate(data.abertura),
    capitalSocial: formatCapitalSocial(data.capital_social),
    tipoEmpresa: mapNaturezaJuridica(data),
    cnae: formatCnae(data.atividade_principal?.[0]),
    cep: formatCep(data.cep),
    logradouro: clean(data.logradouro),
    numero: numero.toUpperCase() === 'SN' ? 'S/N' : numero,
    complemento: clean(data.complemento),
    bairro: clean(data.bairro),
    cidade: clean(data.municipio),
    uf: clean(data.uf).toUpperCase(),
  };

  const locked = (Object.keys(values) as PjLockedField[]).filter(
    (field) => field !== 'cnpj' && Boolean(values[field]),
  );

  return { company: values, locked };
}

/** "49-Sócio-Administrador" -> "Sócio-Administrador". */
export function stripQualificationCode(qual: string): string {
  return clean(qual).replace(/^\d+\s*-\s*/, '');
}

/** Administradores, diretores e presidentes entram como representantes legais. */
function isLegalRepresentativeRole(qualification: string): boolean {
  if (/conselheiro/i.test(qualification)) return false;
  return /administrador|diretor|presidente/i.test(qualification);
}

function mapResponsabilidade(qualification: string): string {
  if (/procurador/i.test(qualification)) return 'Procurador';
  if (isLegalRepresentativeRole(qualification)) return 'Representante legal';
  return 'Sócio';
}

/**
 * Pré-cria os sócios a partir do QSA: só nome e cargo vêm da Receita.
 * O endereço herda o da sede e o restante fica em branco para o usuário completar.
 */
export function mapQsaToSocios(
  qsa: ReceitaWsPartner[] | undefined,
  companyAddress: AddressValues,
): Socio[] {
  return (qsa ?? [])
    .filter((partner) => clean(partner.nome))
    .map((partner, index) => {
      const qualification = stripQualificationCode(partner.qual);
      const socio = buildSocioFromForm({
        ...buildBlankSocioForm(companyAddress),
        complemento: companyAddress.complemento,
        nome: clean(partner.nome),
        responsabilidade: mapResponsabilidade(qualification),
        isRepresentanteLegal: isLegalRepresentativeRole(qualification),
      });
      return {
        ...socio,
        id: `qsa-${index + 1}`,
        cargo: qualification || undefined,
        origemReceita: true,
      };
    });
}
