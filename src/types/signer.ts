export interface SignerRepresentative {
  id: string;
  name: string;
  role: string;
  email: string;
  cpf: string;
  type: 'socio' | 'nao_socio';
  vinculo?: string;
  status: 'Pendente' | 'Assinado';
  signedAt?: string;
}
