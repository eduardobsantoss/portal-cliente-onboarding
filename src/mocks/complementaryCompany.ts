import type { PjCompanyFormData } from '@/types/dadosComplementares';

export const INITIAL_PJ_COMPANY_DATA: PjCompanyFormData = {
  // Passo 1: Dados da Empresa
  razaoSocial: 'AGRO INDUSTRIAL SOJA & MILHO LTDA',
  cnpj: '12.345.678/0001-90',
  dataAbertura: '2014-03-12',
  capitalSocial: '1.500.000,00',
  faturamentoAnual: '18.500.000,00',
  tipoEmpresa: 'Sociedade empresária limitada',
  cnae: '01.15-6/00 - Cultivo de soja',
  // Passo 2: Endereço da Empresa
  cep: '38400-100',
  logradouro: 'Avenida Rondon Pacheco',
  numero: '4500',
  complemento: 'Bloco A, Sala 801 a 806',
  bairro: 'Tibery',
  cidade: 'Uberlândia',
  uf: 'MG',
  // Endereço de correspondência PJ
  correspondenciaMesmo: true,
  correspondenciaCep: '',
  correspondenciaLogradouro: '',
  correspondenciaNumero: '',
  correspondenciaComplemento: '',
  correspondenciaBairro: '',
  correspondenciaCidade: '',
  correspondenciaUf: '',
};
