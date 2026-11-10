import type { AddressValues, PersonValues } from '@/types/forms';
import type { Socio } from '@/types/socio';

/** Formulário em branco de novo sócio, herdando o endereço da sede da empresa. */
export function buildBlankSocioForm(companyAddress: AddressValues): Partial<Socio> {
  return {
    nome: '',
    cpfCnpj: '',
    email: '',
    telefone: '',
    isRepresentanteLegal: false,
    cep: companyAddress.cep,
    logradouro: companyAddress.logradouro,
    numero: companyAddress.numero,
    bairro: companyAddress.bairro,
    cidade: companyAddress.cidade,
    uf: companyAddress.uf,
    dataNascimento: '',
    nomeMae: '',
    profissao: '',
    renda: '',
    estadoCivil: 'Solteiro(a)',
    genero: 'Masculino',
    nacionalidade: 'Brasileira',
    responsabilidade: 'Sócio',
    pep: false,
  };
}

export function buildSocioFromForm(form: Partial<Socio>): Socio {
  return {
    id: Date.now().toString(),
    nome: form.nome || '',
    cpfCnpj: form.cpfCnpj || '',
    email: form.email || '',
    telefone: form.telefone || '',
    isRepresentanteLegal: form.isRepresentanteLegal || false,
    cep: form.cep || '',
    logradouro: form.logradouro || '',
    numero: form.numero || '',
    complemento: form.complemento,
    bairro: form.bairro || '',
    cidade: form.cidade || '',
    uf: form.uf || '',
    dataNascimento: form.dataNascimento || '',
    nomeMae: form.nomeMae || '',
    profissao: form.profissao || '',
    renda: form.renda || '',
    estadoCivil: form.estadoCivil || 'Solteiro(a)',
    nomeConjuge: form.nomeConjuge,
    cpfConjuge: form.cpfConjuge,
    regimeBens: form.regimeBens,
    genero: form.genero || 'Masculino',
    nacionalidade: form.nacionalidade || 'Brasileira',
    responsabilidade: form.responsabilidade || 'Sócio',
    pep: form.pep || false,
    nomePai: form.nomePai,
    rgNumero: form.rgNumero,
    rgDataEmissao: form.rgDataEmissao,
    rgOrgao: form.rgOrgao,
  };
}

export function hasSocioOptionalData(socio: Socio): boolean {
  return Boolean(socio.nomePai || socio.rgNumero);
}

export function pickSocioAddress(form: Partial<Socio>): AddressValues {
  return {
    cep: form.cep || '',
    logradouro: form.logradouro || '',
    numero: form.numero || '',
    complemento: form.complemento || '',
    bairro: form.bairro || '',
    cidade: form.cidade || '',
    uf: form.uf || '',
  };
}

export function pickSocioPerson(form: Partial<Socio>): PersonValues {
  return {
    dataNascimento: form.dataNascimento || '',
    nomeMae: form.nomeMae || '',
    profissao: form.profissao || '',
    renda: form.renda || '',
    genero: form.genero || 'Masculino',
    nacionalidade: form.nacionalidade || 'Brasileira',
  };
}
