import {
  AMENDMENT_DOC_DESCRIPTION,
  AMENDMENT_DOC_ID,
  AMENDMENT_DOC_TYPE,
  BALANCE_CLOSED_DESCRIPTION,
  BALANCE_CURRENT_DESCRIPTION,
  BALANCE_CURRENT_TITLE,
  BALANCE_DOC_TYPE,
  BALANCE_SECTION,
  DAS_CLOSED_DESCRIPTION,
  DAS_CURRENT_DESCRIPTION,
  DAS_CURRENT_TITLE,
  DAS_DOC_TYPE,
  DAS_SECTION,
  DEBT_STATEMENT_DOC_DESCRIPTION,
  DEBT_STATEMENT_DOC_ID,
  DEBT_STATEMENT_DOC_TITLE,
  DEBT_STATEMENT_DOC_TYPE,
  FINANCIAL_CLOSED_YEARS,
  FINANCIAL_CURRENT_YEAR,
  ORG_CHART_DOC_DESCRIPTION,
  ORG_CHART_DOC_ID,
  ORG_CHART_DOC_TYPE,
  PIPEFY_TYPE_BALANCO_DRE,
  PIPEFY_TYPE_CERTIDAO_SIMPLIFICADA,
  PIPEFY_TYPE_ENDIVIDAMENTO,
  PIPEFY_TYPE_FATURAMENTO,
  PIPEFY_TYPE_ORGANOGRAMA,
  REVENUE_CLOSED_DESCRIPTION,
  REVENUE_CURRENT_DESCRIPTION,
  REVENUE_CURRENT_TITLE,
  REVENUE_DOC_TYPE,
  REVENUE_SECTION,
} from '@/constants/financialDocuments';
import { DOCUMENT_ENTITY_COMPANY } from '@/constants/requiredDocuments';
import type { DocumentUploadItem } from '@/types/documentUpload';

interface YearlySeries {
  idPrefix: string;
  section: string;
  documentType: string;
  closedDescription: string;
  currentTitle: string;
  currentDescription: string;
  pipefyTypeId?: number;
}

/** Um item por exercício fechado + um para o período corrente, todos agrupados sob o mesmo título. */
function buildYearlySeries(companyName: string, series: YearlySeries): DocumentUploadItem[] {
  const base = {
    targetPersonOrEntity: companyName,
    entityType: DOCUMENT_ENTITY_COMPANY,
    documentType: series.documentType,
    section: series.section,
    isRequired: true,
    uploaded: false,
    pipefyTypeId: series.pipefyTypeId,
  };

  return [
    ...FINANCIAL_CLOSED_YEARS.map((year) => ({
      ...base,
      id: `${series.idPrefix}-${year}`,
      title: `${series.documentType} ${year}`,
      description: series.closedDescription,
      year,
    })),
    {
      ...base,
      id: `${series.idPrefix}-${FINANCIAL_CURRENT_YEAR}`,
      title: `${series.currentTitle} ${FINANCIAL_CURRENT_YEAR}`,
      description: series.currentDescription,
      year: 'corrente' as const,
    },
  ];
}

/** Documentos cadastrais e demonstrativos da empresa exigidos antes da análise de crédito. */
export function buildFinancialCompanyDocuments(
  companyName: string,
  isSimplesNacional: boolean
): DocumentUploadItem[] {
  const registration: DocumentUploadItem[] = [
    {
      id: AMENDMENT_DOC_ID,
      targetPersonOrEntity: companyName,
      entityType: DOCUMENT_ENTITY_COMPANY,
      documentType: AMENDMENT_DOC_TYPE,
      title: AMENDMENT_DOC_TYPE,
      description: AMENDMENT_DOC_DESCRIPTION,
      isRequired: true,
      uploaded: false,
      pipefyTypeId: PIPEFY_TYPE_CERTIDAO_SIMPLIFICADA,
    },
    {
      id: ORG_CHART_DOC_ID,
      targetPersonOrEntity: companyName,
      entityType: DOCUMENT_ENTITY_COMPANY,
      documentType: ORG_CHART_DOC_TYPE,
      title: ORG_CHART_DOC_TYPE,
      description: ORG_CHART_DOC_DESCRIPTION,
      isRequired: true,
      uploaded: false,
      pipefyTypeId: PIPEFY_TYPE_ORGANOGRAMA,
    },
    {
      id: DEBT_STATEMENT_DOC_ID,
      targetPersonOrEntity: companyName,
      entityType: DOCUMENT_ENTITY_COMPANY,
      documentType: DEBT_STATEMENT_DOC_TYPE,
      title: DEBT_STATEMENT_DOC_TITLE,
      description: DEBT_STATEMENT_DOC_DESCRIPTION,
      isRequired: true,
      uploaded: false,
      pipefyTypeId: PIPEFY_TYPE_ENDIVIDAMENTO,
    },
  ];

  // Simples Nacional (ME): os DAS comprovam o faturamento no lugar do Balanço/DRE/balancete.
  const proofOfRevenue = isSimplesNacional
    ? buildYearlySeries(companyName, {
        idPrefix: 'pj-das',
        section: DAS_SECTION,
        documentType: DAS_DOC_TYPE,
        closedDescription: DAS_CLOSED_DESCRIPTION,
        currentTitle: DAS_CURRENT_TITLE,
        currentDescription: DAS_CURRENT_DESCRIPTION,
      })
    : buildYearlySeries(companyName, {
        idPrefix: 'pj-balanco',
        section: BALANCE_SECTION,
        documentType: BALANCE_DOC_TYPE,
        closedDescription: BALANCE_CLOSED_DESCRIPTION,
        currentTitle: BALANCE_CURRENT_TITLE,
        currentDescription: BALANCE_CURRENT_DESCRIPTION,
        pipefyTypeId: PIPEFY_TYPE_BALANCO_DRE,
      });

  const revenue = buildYearlySeries(companyName, {
    idPrefix: 'pj-faturamento',
    section: REVENUE_SECTION,
    documentType: REVENUE_DOC_TYPE,
    closedDescription: REVENUE_CLOSED_DESCRIPTION,
    currentTitle: REVENUE_CURRENT_TITLE,
    currentDescription: REVENUE_CURRENT_DESCRIPTION,
    pipefyTypeId: PIPEFY_TYPE_FATURAMENTO,
  });

  return [...registration, ...proofOfRevenue, ...revenue];
}
