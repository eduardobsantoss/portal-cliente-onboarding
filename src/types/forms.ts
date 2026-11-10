export type FieldVariant = 'page' | 'modal';

export interface AddressValues {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export type AddressField = keyof AddressValues;

export type CorrespondenceAddressKey = `correspondencia${Capitalize<AddressField>}`;

export type CorrespondenceAddressData = Record<CorrespondenceAddressKey, string>;

export interface MaritalStatusValues {
  estadoCivil: string;
  nomeConjuge: string;
  cpfConjuge: string;
  regimeBens: string;
}

export type MaritalStatusField = 'nomeConjuge' | 'cpfConjuge' | 'regimeBens';

export type PersonField =
  | 'dataNascimento'
  | 'genero'
  | 'nacionalidade'
  | 'nomeMae'
  | 'profissao'
  | 'renda';

export type PersonValues = Record<PersonField, string>;
