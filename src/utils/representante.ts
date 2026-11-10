import type { NonPartnerRepresentative } from '@/types/representante';

export function buildBlankNonPartnerForm(): Partial<NonPartnerRepresentative> {
  return {
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    cargo: 'Diretor / Procurador',
    vinculo: 'Administrador não sócio',
    estadoCivil: 'Solteiro(a)',
    pep: false,
  };
}

export function buildNonPartnerFromForm(form: Partial<NonPartnerRepresentative>): NonPartnerRepresentative {
  return {
    id: `np-${Date.now()}`,
    nome: form.nome || '',
    cpf: form.cpf || '',
    dataNascimento: form.dataNascimento || '',
    email: form.email || '',
    telefone: form.telefone || '',
    cargo: form.cargo || 'Diretor Executivo',
    vinculo: form.vinculo || 'Administrador não sócio',
    estadoCivil: form.estadoCivil || 'Solteiro(a)',
    nomeConjuge: form.nomeConjuge,
    cpfConjuge: form.cpfConjuge,
    regimeBens: form.regimeBens,
    pep: form.pep || false,
  };
}
