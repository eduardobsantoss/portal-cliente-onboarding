import type { NonPartnerRepresentative } from '@/types/representante';
import type { Socio } from '@/types/socio';

export type AccountType = 'pf' | 'pj';

export interface ComplementaryFormSubmitPayload {
  accountType: AccountType;
  socios: Socio[];
  nonPartnerRepresentatives?: NonPartnerRepresentative[];
  companyName?: string;
  cnpj?: string;
  tipoEmpresa?: string;
  capitalSocial?: string;
  hasProcurador?: boolean;
}

export type PjStep = 1 | 2 | 3;

export interface PfFormData {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  correspondenciaMesmo: boolean;
  correspondenciaCep: string;
  correspondenciaLogradouro: string;
  correspondenciaNumero: string;
  correspondenciaComplemento: string;
  correspondenciaBairro: string;
  correspondenciaCidade: string;
  correspondenciaUf: string;
  dataNascimento: string;
  genero: string;
  nacionalidade: string;
  nomeMae: string;
  profissao: string;
  renda: string;
  estadoCivil: string;
  nomeConjuge: string;
  cpfConjuge: string;
  regimeBens: string;
  nomePai: string;
  pep: boolean;
  docTipo: string;
  docNumero: string;
  docDataExpedicao: string;
  docOrgao: string;
}

export interface PjCompanyFormData {
  razaoSocial: string;
  cnpj: string;
  dataAbertura: string;
  capitalSocial: string;
  faturamentoAnual: string;
  tipoEmpresa: string;
  cnae: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  correspondenciaMesmo: boolean;
  correspondenciaCep: string;
  correspondenciaLogradouro: string;
  correspondenciaNumero: string;
  correspondenciaComplemento: string;
  correspondenciaBairro: string;
  correspondenciaCidade: string;
  correspondenciaUf: string;
}
