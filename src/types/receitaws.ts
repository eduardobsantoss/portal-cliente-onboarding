/** Subconjunto da resposta de `GET https://receitaws.com.br/v1/cnpj/{cnpj}` usado pelo cadastro. */
export interface ReceitaWsActivity {
  code: string;
  text: string;
}

export interface ReceitaWsPartner {
  nome: string;
  /** Qualificação com código, ex.: "49-Sócio-Administrador". */
  qual: string;
}

export interface ReceitaWsResponse {
  status: 'OK' | 'ERROR';
  message?: string;
  nome?: string;
  abertura?: string;
  situacao?: string;
  natureza_juridica?: string;
  capital_social?: string;
  atividade_principal?: ReceitaWsActivity[];
  qsa?: ReceitaWsPartner[];
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
  simples?: { optante?: boolean };
  simei?: { optante?: boolean };
}

export type CnpjLookupErrorCode = 'invalid' | 'not_found' | 'inactive' | 'unavailable';
