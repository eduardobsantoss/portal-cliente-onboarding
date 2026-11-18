import type {
  AccountType,
  ComplementaryFormSubmitPayload,
  PfFormData,
  PjCompanyFormData,
} from '@/types/dadosComplementares';
import type { NonPartnerRepresentative } from '@/types/representante';
import type { Socio } from '@/types/socio';

export const LEGAL_REPRESENTATIVE_REQUIRED_MESSAGE = 'Indique pelo menos um representante legal.';
export const SOCIOS_REQUIRED_MESSAGE = 'Cadastre pelo menos um sócio.';
export const SOCIOS_PENDING_MESSAGE =
  'Complete os dados dos sócios marcados como "Dados pendentes" para continuar.';

/** PJ precisa de ao menos um sócio marcado como representante legal ou um representante não sócio. */
export function hasLegalRepresentative(
  socios: Socio[],
  nonPartnerReps: NonPartnerRepresentative[]
): boolean {
  const hasSocioRep = socios.some((s) => s.isRepresentanteLegal);
  const hasNonPartnerRep = nonPartnerReps.length > 0;
  return hasSocioRep || hasNonPartnerRep;
}

export function buildSubmitPayload(
  accountType: AccountType,
  socios: Socio[],
  nonPartnerReps: NonPartnerRepresentative[],
  company: PjCompanyFormData,
  pf?: PfFormData
): ComplementaryFormSubmitPayload {
  const hasProcurador = nonPartnerReps.some((r) => r.vinculo === 'Procurador');

  // PF: o titular ocupa o lugar de "empresa" nas telas seguintes (nome e documento).
  if (accountType === 'pf' && pf) {
    return {
      accountType,
      socios: [],
      nonPartnerRepresentatives: [],
      companyName: pf.nome,
      cnpj: pf.cpf,
      hasProcurador: false,
    };
  }

  return {
    accountType,
    socios,
    nonPartnerRepresentatives: nonPartnerReps,
    companyName: company.razaoSocial,
    cnpj: company.cnpj,
    tipoEmpresa: company.tipoEmpresa,
    capitalSocial: company.capitalSocial,
    hasProcurador,
  };
}
