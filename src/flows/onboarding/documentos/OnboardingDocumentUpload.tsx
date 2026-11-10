import React from 'react';
import { motion } from 'motion/react';
import { OnboardingPageShell } from '@/components/layout/OnboardingPageShell';
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
  documentsMode: documentsModeProp,
  initialDocuments = null,
  adjustmentRequestId = 0,
  appliedAdjustmentRequestId = 0,
  onDocumentsChange,
  onAdjustmentApplied,
  onSubmitDocs,
  onBack,
}) => {
  const documentsMode = documentsModeProp ?? 'initial';
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
  } = useDocumentUploads(buildDocuments, requiredDocumentsInput, {
    initialDocuments,
    onDocumentsChange,
    mode: documentsMode,
    adjustmentRequestId,
    appliedAdjustmentRequestId,
    onAdjustmentApplied,
  });

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
      mainClassName="max-w-5xl w-full mx-auto my-auto py-8 space-y-6"
      footerAction={<AttachAllDemoButton onClick={handleAttachAllDemo} />}
    >
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
            hasRegularization={hasRegularization || documentsMode === 'adjustment'}
            onBack={onBack}
            onSubmit={() => onSubmitDocs('pending')}
          />
        </div>
      </motion.div>
    </OnboardingPageShell>
  );
};
