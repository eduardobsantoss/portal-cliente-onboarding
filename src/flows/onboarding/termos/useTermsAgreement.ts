import React, { useState } from 'react';
import { TERMS_DOCUMENTS } from '@/constants/termsDocuments';
import type { TermsDocumentType } from '@/types/terms';
import { downloadTextFile } from '@/utils/downloadTextFile';

interface UseTermsAgreementParams {
  onAccept: () => void;
}

export function useTermsAgreement({ onAccept }: UseTermsAgreementParams) {
  const [accepted, setAccepted] = useState(false);
  const [activeDocModal, setActiveDocModal] = useState<TermsDocumentType | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accepted) {
      onAccept();
    }
  };

  const handleDownload = (type: TermsDocumentType) => {
    const { downloadFileName, downloadTitle } = TERMS_DOCUMENTS[type];
    downloadTextFile(
      downloadFileName,
      `${downloadTitle}\n\nVersão Registrada 2026.1\n\n1. OBJETO E ESCOPO...\n`
    );
  };

  const handleAgreeAndClose = () => {
    setAccepted(true);
    setActiveDocModal(null);
  };

  return {
    accepted,
    setAccepted,
    activeDocModal,
    setActiveDocModal,
    handleSubmit,
    handleDownload,
    handleAgreeAndClose,
  };
}
