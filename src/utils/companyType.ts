import { ESTATUTO_COMPANY_TYPE_KEYWORDS } from '@/constants/requiredDocuments';

/** Indica se o tipo societário é regido por Estatuto Social (S/A, cooperativa, associação...). */
export function isEstatutoCompanyType(tipoEmpresa: string): boolean {
  const normalized = tipoEmpresa.toLowerCase();
  return ESTATUTO_COMPANY_TYPE_KEYWORDS.some((keyword) => normalized.includes(keyword));
}
