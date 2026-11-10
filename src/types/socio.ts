export interface Socio {
  id: string;
  nome: string;
  cpfCnpj: string;
  email: string;
  telefone: string;
  isRepresentanteLegal?: boolean;
  // Endereço do sócio
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  // Dados pessoais do sócio
  dataNascimento: string;
  nomeMae: string;
  profissao: string;
  renda: string;
  estadoCivil: string;
  nomeConjuge?: string;
  cpfConjuge?: string;
  regimeBens?: string;
  genero: string;
  nacionalidade: string;
  responsabilidade: 'Sócio' | 'Representante legal' | 'Procurador' | string;
  cargo?: string;
  pep: boolean;
  // Opcionais do sócio
  nomePai?: string;
  rgNumero?: string;
  rgDataEmissao?: string;
  rgOrgao?: string;
}
