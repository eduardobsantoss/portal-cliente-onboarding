import type {
  AddressField,
  AddressValues,
  CorrespondenceAddressData,
  CorrespondenceAddressKey,
} from '@/types/forms';

export function toCorrespondenceKey(field: AddressField): CorrespondenceAddressKey {
  return `correspondencia${field.charAt(0).toUpperCase()}${field.slice(1)}` as CorrespondenceAddressKey;
}

export function pickCorrespondenceAddress(data: CorrespondenceAddressData): AddressValues {
  return {
    cep: data.correspondenciaCep,
    logradouro: data.correspondenciaLogradouro,
    numero: data.correspondenciaNumero,
    complemento: data.correspondenciaComplemento,
    bairro: data.correspondenciaBairro,
    cidade: data.correspondenciaCidade,
    uf: data.correspondenciaUf,
  };
}
