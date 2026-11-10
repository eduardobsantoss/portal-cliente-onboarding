import React from 'react';
import { motion } from 'motion/react';
import { OnboardingPageShell } from '@/components/layout/OnboardingPageShell';
import { OnboardingProgressSteps } from '@/components/layout/OnboardingProgressSteps';
import { MOCK_COMPANY_CNPJ, MOCK_COMPANY_NAME } from '@/mocks/onboardingCompany';
import { DEFAULT_ONBOARDING_SOCIOS } from '@/mocks/onboardingDocumentSocios';
import type { AccountType } from '@/types/dadosComplementares';
import type { OnboardingDocumentUploadProps } from '@/types/documentUpload';
import { getDocumentStats } from '@/utils/documentStats';
import type { RequiredDocumentsInput } from '@/utils/requiredDocuments';
import { AttachAllDemoButton } from './AttachAllDemoButton';
import { DocumentGroupList } from './DocumentGroupList';
import { DocumentUploadActionsBar } from './DocumentUploadActionsBar';
import { DocumentUploadIntro } from './DocumentUploadIntro';
import { MissingDocumentsNotice } from './MissingDocumentsNotice';
import { RegularizationAlert } from './RegularizationAlert';
import { SecureTransmissionNotice } from './SecureTransmissionNotice';
import { UploadErrorBanner } from './UploadErrorBanner';
import { UploadProgressHeader } from './UploadProgressHeader';
import { useDocumentUploads } from './useDocumentUploads';
import { useRequiredDocuments } from './useRequiredDocuments';

const DEFAULT_ACCOUNT_TYPE: AccountType = 'pj';

export const OnboardingDocumentUpload: React.FC<OnboardingDocumentUploadProps> = ({
  accountType = DEFAULT_ACCOUNT_TYPE,
  socios = DEFAULT_ONBOARDING_SOCIOS,
  nonPartnerRepresentatives = [],
  companyName = MOCK_COMPANY_NAME,
  cnpj = MOCK_COMPANY_CNPJ,
  tipoEmpresa = 'Sociedade empresária limitada',
  hasProcurador = false,
  onSubmitDocs,
  onBack,
}) => {
  const requiredDocumentsInput: RequiredDocumentsInput = {
    accountType,
    socios,
    nonPartnerRepresentatives,
    companyName,
    tipoEmpresa,
    hasProcurador,
  };
  const buildDocuments = useRequiredDocuments(requiredDocumentsInput);
  const {
    documentList,
    docNumbers,
    activeUploadingId,
    uploadError,
    hasRegularization,
    handleFileUpload,
    handleRemoveFile,
    handleAttachAllDemo,
    handleDocumentNumberChange,
    dismissUploadError,
  } = useDocumentUploads(buildDocuments, requiredDocumentsInput);

  const {
    totalMandatory,
    uploadedMandatory,
    isAllMandatoryUploaded,
    hasPendingRegularization,
    missingMandatoryDocs,
    entityGroups,
  } = getDocumentStats(documentList);

  return (
    <OnboardingPageShell
      sectionLabel="Portal do Cliente • Envio de Documentos"
      mainClassName="max-w-3xl w-full mx-auto my-auto py-8 space-y-6"
      headerAction={<AttachAllDemoButton onClick={handleAttachAllDemo} />}
    >
      {/* Stepper Indicator: Dados -> Documentos -> Assinatura -> Análise */}
      <OnboardingProgressSteps currentStep={2} />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
      >
        <DocumentUploadIntro accountType={accountType} />

        <div className="p-6 sm:p-8 space-y-6">
          {uploadError && <UploadErrorBanner message={uploadError} onDismiss={dismissUploadError} />}

          {hasRegularization && <RegularizationAlert />}

          <UploadProgressHeader uploadedMandatory={uploadedMandatory} totalMandatory={totalMandatory} />

          <DocumentGroupList
            entityGroups={entityGroups}
            documentList={documentList}
            cnpj={cnpj}
            docNumbers={docNumbers}
            activeUploadingId={activeUploadingId}
            onDocumentNumberChange={handleDocumentNumberChange}
            onFileUpload={handleFileUpload}
            onRemoveFile={handleRemoveFile}
          />

          <SecureTransmissionNotice accountType={accountType} />

          {!isAllMandatoryUploaded && missingMandatoryDocs.length > 0 && (
            <MissingDocumentsNotice missingMandatoryDocs={missingMandatoryDocs} />
          )}

          <DocumentUploadActionsBar
            isAllMandatoryUploaded={isAllMandatoryUploaded}
            hasPendingRegularization={hasPendingRegularization}
            hasRegularization={hasRegularization}
            onBack={onBack}
            onSubmit={() => onSubmitDocs('pending')}
          />
        </div>
      </motion.div>
    </OnboardingPageShell>
  );
};
