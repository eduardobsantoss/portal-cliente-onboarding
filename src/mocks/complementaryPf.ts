import type { PfFormData } from '@/types/dadosComplementares';

export const INITIAL_PF_DATA: PfFormData = {
  // Obrigatórios
  cep: '38400-100',
  logradouro: 'Avenida Rondon Pacheco',
  numero: '4500',
  complemento: 'Sala 804',
  bairro: 'Tibery',
  cidade: 'Uberlândia',
  uf: 'MG',
  // Endereço de Correspondência PF
  correspondenciaMesmo: true,
  correspondenciaCep: '',
  correspondenciaLogradouro: '',
  correspondenciaNumero: '',
  correspondenciaComplemento: '',
  correspondenciaBairro: '',
  correspondenciaCidade: '',
  correspondenciaUf: '',

  dataNascimento: '1982-05-14',
  genero: 'Masculino',
  nacionalidade: 'Brasileira',
  nomeMae: 'Maria Helena Santos',
  profissao: 'Produtor Rural / Engenheiro Agrônomo',
  renda: '45.000,00',
  estadoCivil: 'Casado(a)',
  nomeConjuge: 'Juliana Costa Santos',
  cpfConjuge: '987.654.321-00',
  regimeBens: 'Comunhão parcial de bens',
  // Opcionais
  nomePai: 'Antônio dos Santos',
  pep: false,
  docTipo: 'RG',
  docNumero: 'MG-14.892.301',
  docDataExpedicao: '2015-08-20',
  docOrgao: 'SSP/MG',
};
