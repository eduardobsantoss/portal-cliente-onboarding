import {
  DEFAULT_PARTNER_ROLE_LABEL,
  DOCUMENT_ENTITY_HOLDER,
  DOCUMENT_ENTITY_LEGAL_REPRESENTATIVE,
  DOCUMENT_ENTITY_PARTNER,
  IDENTITY_DOC_DESCRIPTION_PF_HOLDER,
  IDENTITY_DOC_DESCRIPTION_PF_PARTNER,
  IDENTITY_DOC_DESCRIPTION_PJ,
  IDENTITY_DOC_TITLE,
  IDENTITY_DOC_TYPE,
  LEGAL_REPRESENTATIVE_ROLE_LABEL,
  PF_HOLDER_DOC_ID,
  PF_HOLDER_ROLE_LABEL,
} from '@/constants/requiredDocuments';
import {
  MOCK_HOLDER_DOCUMENT_NUMBER,
  MOCK_HOLDER_NAME,
  MOCK_HOLDER_UPLOADED_FILE,
  MOCK_PARTNER_UPLOADED_FILE_SIZE,
  MOCK_PARTNER_UPLOAD_DATE,
} from '@/mocks/onboardingDocumentFiles';
import type { DocumentUploadItem } from '@/types/documentUpload';
import type { NonPartnerRepresentative } from '@/types/representante';
import type { Socio } from '@/types/socio';
import { buildCivilStatusDocument } from '@/utils/civilStatusDocument';

/** PF: 1 doc do titular (já enviado no mock) + 1 doc por sócio/co-titular relacionado (sem envio). */
export function buildPfDocuments(socios: Socio[]): DocumentUploadItem[] {
  const docs: DocumentUploadItem[] = [
    {
      id: PF_HOLDER_DOC_ID,
      targetPersonOrEntity: MOCK_HOLDER_NAME,
      cargo: PF_HOLDER_ROLE_LABEL,
      entityType: DOCUMENT_ENTITY_HOLDER,
      documentType: IDENTITY_DOC_TYPE,
      title: IDENTITY_DOC_TITLE,
      description: IDENTITY_DOC_DESCRIPTION_PF_HOLDER,
      isRequired: true,
      uploaded: true,
      ...MOCK_HOLDER_UPLOADED_FILE,
      documentNumber: MOCK_HOLDER_DOCUMENT_NUMBER,
      isPersonDoc: true,
    },
  ];

  socios
    .filter((s) => s.nome !== MOCK_HOLDER_NAME)
    .forEach((socio, idx) => {
      docs.push({
        id: `pf-socio-${socio.id || idx}`,
        targetPersonOrEntity: socio.nome,
        cargo: socio.responsabilidade || DEFAULT_PARTNER_ROLE_LABEL,
        entityType: DOCUMENT_ENTITY_PARTNER,
        documentType: IDENTITY_DOC_TYPE,
        title: IDENTITY_DOC_TITLE,
        description: IDENTITY_DOC_DESCRIPTION_PF_PARTNER,
        isRequired: true,
        uploaded: false,
        fileName: undefined,
        fileSize: undefined,
        uploadDate: undefined,
        documentNumber: '',
        isPersonDoc: true,
      });
    });

  return docs;
}

/** PJ: documento de identificação (+ estado civil condicional) de cada sócio cadastrado. */
export function buildPartnerDocuments(socios: Socio[]): DocumentUploadItem[] {
  const docs: DocumentUploadItem[] = [];

  socios.forEach((socio, idx) => {
    const isRepresentante =
      socio.isRepresentanteLegal ||
      socio.responsabilidade === 'Representante legal' ||
      (idx === 0 &&
        !socios.some((s) => s.isRepresentanteLegal || s.responsabilidade === 'Representante legal'));
    const roleLabel = isRepresentante
      ? LEGAL_REPRESENTATIVE_ROLE_LABEL
      : socio.responsabilidade || DEFAULT_PARTNER_ROLE_LABEL;
    const entityType = isRepresentante
      ? DOCUMENT_ENTITY_LEGAL_REPRESENTATIVE
      : socio.responsabilidade || DOCUMENT_ENTITY_PARTNER;

    // No mock, só o titular (Eduardo Santos) começa com o documento enviado.
    const isUnfilled = socio.nome !== MOCK_HOLDER_NAME;

    docs.push({
      id: `socio-id-${socio.id || idx}`,
      targetPersonOrEntity: socio.nome,
      cargo: roleLabel,
      entityType,
      documentType: IDENTITY_DOC_TYPE,
      title: IDENTITY_DOC_TITLE,
      description: IDENTITY_DOC_DESCRIPTION_PJ,
      isRequired: true,
      uploaded: !isUnfilled,
      fileName: !isUnfilled
        ? `Identificacao_${socio.nome.split(' ')[0]}_${socio.nome.split(' ')[1] || 'Socio'}.pdf`
        : undefined,
      fileSize: !isUnfilled ? MOCK_PARTNER_UPLOADED_FILE_SIZE : undefined,
      uploadDate: !isUnfilled ? MOCK_PARTNER_UPLOAD_DATE : undefined,
      documentNumber: !isUnfilled ? socio.cpfCnpj || socio.rgNumero || '' : '',
      isPersonDoc: true,
    });

    const civilDoc = buildCivilStatusDocument(socio.estadoCivil, {
      id: `socio-civil-${socio.id || idx}`,
      targetPersonOrEntity: socio.nome,
      cargo: roleLabel,
      entityType,
    });
    if (civilDoc) docs.push(civilDoc);
  });

  return docs;
}

/** PJ: representantes não sócios começam em branco, no mesmo padrão dos sócios. */
export function buildNonPartnerDocuments(
  representatives: NonPartnerRepresentative[]
): DocumentUploadItem[] {
  const docs: DocumentUploadItem[] = [];

  representatives.forEach((rep, idx) => {
    const cargo = `${rep.vinculo} • ${rep.cargo}`;

    docs.push({
      id: `non-partner-doc-${rep.id || idx}`,
      targetPersonOrEntity: rep.nome,
      cargo,
      entityType: rep.vinculo,
      documentType: IDENTITY_DOC_TYPE,
      title: IDENTITY_DOC_TITLE,
      description: IDENTITY_DOC_DESCRIPTION_PJ,
      isRequired: true,
      uploaded: false,
      fileName: undefined,
      fileSize: undefined,
      uploadDate: undefined,
      documentNumber: '',
      isPersonDoc: true,
    });

    const civilDoc = buildCivilStatusDocument(rep.estadoCivil, {
      id: `non-partner-civil-${rep.id || idx}`,
      targetPersonOrEntity: rep.nome,
      cargo,
      entityType: rep.vinculo,
    });
    if (civilDoc) docs.push(civilDoc);
  });

  return docs;
}
