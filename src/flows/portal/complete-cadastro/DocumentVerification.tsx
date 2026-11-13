import React, { useState } from 'react';
import { SupportFaqModal } from '@/components/support/SupportFaqModal';
import type { PreviewDoc } from '@/types/documentChecklist';
import { FacialTopic } from './biometria-facial/FacialTopic';
import { ChecklistFooter } from './ChecklistFooter';
import { ChecklistProgressBar } from './ChecklistProgressBar';
import { ChecklistToolbar } from './ChecklistToolbar';
import { CompanyDocumentsSection } from './documentos-empresa/CompanyDocumentsSection';
import { CreditRelationshipSection } from './credito-relacionamento/CreditRelationshipSection';
import { DocumentPreviewModal } from './DocumentPreviewModal';
import { FinancialStatementsSection } from './demonstrativos-financeiros/FinancialStatementsSection';
import { AddPartnerModal } from './quadro-societario/AddPartnerModal';
import { PartnersSection } from './quadro-societario/PartnersSection';
import { SmsTopic } from './sms-telefone/SmsTopic';
import { useAddPartnerForm } from './useAddPartnerForm';
import { useChecklistDocuments } from './useChecklistDocuments';
import { useChecklistProgress } from './useChecklistProgress';
import { useChecklistSimulation } from './useChecklistSimulation';
import { useChecklistTopics } from './useChecklistTopics';
import { useIdentityVerification } from './useIdentityVerification';
import { usePartnerDocs } from './usePartnerDocs';
import { ValidationErrorBanner } from './ValidationErrorBanner';
import { ValidationLoadingView } from './ValidationLoadingView';

interface DocumentVerificationProps {
  onCompleteVerification?: () => void;
  isVerified?: boolean;
  onResetVerification?: () => void;
}

/** Checklist da Análise de Crédito: orquestra as 6 seções, progresso, modais e simulações. */
export const DocumentVerification: React.FC<DocumentVerificationProps> = ({
  onCompleteVerification,
  onResetVerification
}) => {
  const { companyTier, setCompanyTier, setDocs, pjDocs, finDocs, credDocs, handleFileUpload } =
    useChecklistDocuments();
  const identity = useIdentityVerification();
  const { expandedTopics, toggleTopic, openTopics } = useChecklistTopics();
  const {
    partners,
    setPartners,
    expandedPartnerId,
    setExpandedPartnerId,
    handlePartnerDocUpload,
    addPartner,
  } = usePartnerDocs();
  const addPartnerForm = useAddPartnerForm(addPartner);

  // Modals state
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<PreviewDoc | null>(null);

  const simulation = useChecklistSimulation({
    setDocs,
    setPartners,
    setExpandedPartnerId,
    openTopics,
    markAllIdentityVerified: identity.markAllVerified,
    resetIdentity: identity.resetIdentity,
    onCompleteVerification,
    onResetVerification,
  });

  const progress = useChecklistProgress({
    companyTier,
    pjDocs,
    finDocs,
    credDocs,
    partners,
    phoneVerified: identity.phoneVerified,
    facialVerified: identity.facialVerified,
  });

  // Real-time document validation loading view
  if (simulation.isValidatingDocuments) {
    return (
      <ValidationLoadingView
        onApprove={simulation.handleApproveValidation}
        onAdjust={simulation.handleSimulateAdjustments}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">

      {/* Controls & Demo Switcher Bar */}
      <ChecklistToolbar
        companyTier={companyTier}
        onTierChange={setCompanyTier}
        onHelp={() => setShowSupportModal(true)}
      />

      {/* Rejection / Adjustments Warning Banner */}
      {simulation.hasValidationErrors && <ValidationErrorBanner />}

      {/* Progress Bar (Minimalist) */}
      <ChecklistProgressBar
        completedTopicsCount={progress.completedTopicsCount}
        totalTopics={progress.totalTopics}
      />

      {/* TÓPICOS ACCORDION LIST */}
      <div className="space-y-3">
        <SmsTopic
          phoneVerified={identity.phoneVerified}
          phoneVerifiedAt={identity.phoneVerifiedAt}
          isOpen={expandedTopics.sms}
          onToggle={() => toggleTopic('sms')}
          onVerified={identity.handlePhoneVerified}
        />

        <FacialTopic
          facialVerified={identity.facialVerified}
          isOpen={expandedTopics.biometria}
          onToggle={() => toggleTopic('biometria')}
          onVerified={identity.handleFacialVerified}
        />

        <CompanyDocumentsSection
          docs={pjDocs}
          stats={progress.pjStats}
          companyTier={companyTier}
          isOpen={expandedTopics.pj}
          onToggle={() => toggleTopic('pj')}
          onUpload={handleFileUpload}
          onPreview={setPreviewDoc}
        />

        <FinancialStatementsSection
          docs={finDocs}
          stats={progress.finStats}
          companyTier={companyTier}
          isOpen={expandedTopics.financeiro}
          onToggle={() => toggleTopic('financeiro')}
          onUpload={handleFileUpload}
          onPreview={setPreviewDoc}
        />

        <CreditRelationshipSection
          docs={credDocs}
          stats={progress.credStats}
          companyTier={companyTier}
          isOpen={expandedTopics.credito}
          onToggle={() => toggleTopic('credito')}
          onUpload={handleFileUpload}
          onPreview={setPreviewDoc}
        />

        <PartnersSection
          partners={partners}
          partnersValidCount={progress.partnersValidCount}
          partnersDone={progress.partnersDone}
          expandedPartnerId={expandedPartnerId}
          onExpandedPartnerChange={setExpandedPartnerId}
          isOpen={expandedTopics.socios}
          onToggle={() => toggleTopic('socios')}
          onUploadDoc={handlePartnerDocUpload}
          onPreview={setPreviewDoc}
          onAddPartner={() => addPartnerForm.setShowAddPartnerModal(true)}
        />
      </div>

      {/* Discreet Simulation / Prefill Footer (Subtle as requested) */}
      <ChecklistFooter
        isBulkUploading={simulation.isBulkUploading}
        onFillAll={simulation.handleQuickUploadAll}
        onReset={simulation.handleResetState}
      />

      {/* Support & FAQ Modal */}
      <SupportFaqModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />

      {/* Preview Modal */}
      <DocumentPreviewModal previewDoc={previewDoc} onClose={() => setPreviewDoc(null)} />

      {/* Add Partner Modal */}
      <AddPartnerModal
        isOpen={addPartnerForm.showAddPartnerModal}
        values={addPartnerForm.newPartner}
        onFieldChange={addPartnerForm.updateField}
        onSubmit={addPartnerForm.handleAddPartnerSubmit}
        onClose={() => addPartnerForm.setShowAddPartnerModal(false)}
      />

    </div>
  );
};
