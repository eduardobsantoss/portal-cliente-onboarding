export interface NonPartnerRepresentative {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  telefone: string;
  cargo: string;
  vinculo: 'Administrador não sócio' | 'Procurador';
  estadoCivil: string;
  nomeConjuge?: string;
  cpfConjuge?: string;
  regimeBens?: string;
  pep: boolean;
}
