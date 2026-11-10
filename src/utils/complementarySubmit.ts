import type { AccountType, ComplementaryFormSubmitPayload, PjCompanyFormData } from '@/types/dadosComplementares';
import type { NonPartnerRepresentative } from '@/types/representante';
import type { Socio } from '@/types/socio';

export const LEGAL_REPRESENTATIVE_REQUIRED_MESSAGE = 'Indique pelo menos um representante legal.';

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
  company: PjCompanyFormData
): ComplementaryFormSubmitPayload {
  const hasProcurador = nonPartnerReps.some((r) => r.vinculo === 'Procurador');

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
