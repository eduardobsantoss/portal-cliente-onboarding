import {
  CONSTITUTIVE_DOC_TITLE_DEFAULT,
  CONSTITUTIVE_DOC_TITLE_ESTATUTO,
  CONTRACT_DOC_DESCRIPTION,
  CONTRACT_DOC_ID,
  CONTRACT_DOC_TYPE,
  DOCUMENT_ENTITY_COMPANY,
  ELECTION_MINUTES_DOC_DESCRIPTION,
  ELECTION_MINUTES_DOC_ID,
  ELECTION_MINUTES_DOC_TITLE,
  ELECTION_MINUTES_DOC_TYPE,
  POWER_OF_ATTORNEY_DESCRIPTION_OPTIONAL,
  POWER_OF_ATTORNEY_DESCRIPTION_REQUIRED,
  POWER_OF_ATTORNEY_DOC_ID,
  POWER_OF_ATTORNEY_DOC_TYPE,
  POWER_OF_ATTORNEY_TITLE_OPTIONAL,
  POWER_OF_ATTORNEY_TITLE_REQUIRED,
} from '@/constants/requiredDocuments';
import { MOCK_CONTRACT_UPLOADED_FILE } from '@/mocks/onboardingDocumentFiles';
import { DEFAULT_ONBOARDING_SOCIOS } from '@/mocks/onboardingDocumentSocios';
import type { AccountType } from '@/types/dadosComplementares';
import type { DocumentUploadItem } from '@/types/documentUpload';
import type { NonPartnerRepresentative } from '@/types/representante';
import type { Socio } from '@/types/socio';
import { isEstatutoCompanyType } from '@/utils/companyType';
import {
  buildNonPartnerDocuments,
  buildPartnerDocuments,
  buildPfDocuments,
} from '@/utils/requiredPersonDocuments';

export interface RequiredDocumentsInput {
  accountType: AccountType;
  socios: Socio[];
  nonPartnerRepresentatives: NonPartnerRepresentative[];
  companyName: string;
  tipoEmpresa: string;
  hasProcurador: boolean;
}

/** Garante sempre um quadro de sócios completo: com menos de 3, usa o mock padrão. */
export function resolveEffectiveSocios(socios: Socio[] | undefined): Socio[] {
  return socios && socios.length >= 3 ? socios : DEFAULT_ONBOARDING_SOCIOS;
}

/** Procuração é obrigatória quando há qualquer representante do tipo Procurador. */
export function isPowerOfAttorneyRequired(
  hasProcurador: boolean,
  nonPartnerRepresentatives: NonPartnerRepresentative[],
  socios: Socio[]
): boolean {
  return Boolean(
    hasProcurador ||
      nonPartnerRepresentatives.some((r) => r.vinculo === 'Procurador') ||
      socios.some((s) => s.responsabilidade === 'Procurador')
  );
}

function buildCompanyDocuments(
  companyName: string,
  isEstatuto: boolean,
  isProcuradorRequired: boolean
): DocumentUploadItem[] {
  return [
    {
      id: CONTRACT_DOC_ID,
      targetPersonOrEntity: companyName,
      entityType: DOCUMENT_ENTITY_COMPANY,
      documentType: CONTRACT_DOC_TYPE,
      title: isEstatuto ? CONSTITUTIVE_DOC_TITLE_ESTATUTO : CONSTITUTIVE_DOC_TITLE_DEFAULT,
      description: CONTRACT_DOC_DESCRIPTION,
      isRequired: true,
      uploaded: true,
      ...MOCK_CONTRACT_UPLOADED_FILE,
    },
    {
      id: ELECTION_MINUTES_DOC_ID,
      targetPersonOrEntity: companyName,
      entityType: DOCUMENT_ENTITY_COMPANY,
      documentType: ELECTION_MINUTES_DOC_TYPE,
      title: ELECTION_MINUTES_DOC_TITLE,
      description: ELECTION_MINUTES_DOC_DESCRIPTION,
      isRequired: true,
      uploaded: false,
    },
    {
      id: POWER_OF_ATTORNEY_DOC_ID,
      targetPersonOrEntity: companyName,
      entityType: DOCUMENT_ENTITY_COMPANY,
      documentType: POWER_OF_ATTORNEY_DOC_TYPE,
      title: isProcuradorRequired ? POWER_OF_ATTORNEY_TITLE_REQUIRED : POWER_OF_ATTORNEY_TITLE_OPTIONAL,
      description: isProcuradorRequired
        ? POWER_OF_ATTORNEY_DESCRIPTION_REQUIRED
        : POWER_OF_ATTORNEY_DESCRIPTION_OPTIONAL,
      isRequired: isProcuradorRequired,
      uploaded: false,
    },
  ];
}

/**
 * Monta a lista de documentos da etapa conforme o tipo de conta:
 * - PJ: Contrato/Estatuto; Ata de Eleição (sempre visível no protótipo; na regra, só S/A); Procuração (se houver Procurador);
 *   + identificação (e estado civil) de cada sócio e de cada representante não sócio.
 * - PF: identificação do titular + sócios/co-titulares relacionados.
 */
export function buildRequiredDocuments(input: RequiredDocumentsInput): DocumentUploadItem[] {
  const effectiveSocios = resolveEffectiveSocios(input.socios);

  if (input.accountType === 'pf') {
    return buildPfDocuments(effectiveSocios);
  }

  const isEstatuto = isEstatutoCompanyType(input.tipoEmpresa);
  const isProcuradorRequired = isPowerOfAttorneyRequired(
    input.hasProcurador,
    input.nonPartnerRepresentatives,
    effectiveSocios
  );

  return [
    ...buildCompanyDocuments(input.companyName, isEstatuto, isProcuradorRequired),
    ...buildPartnerDocuments(effectiveSocios),
    ...buildNonPartnerDocuments(input.nonPartnerRepresentatives),
  ];
}
