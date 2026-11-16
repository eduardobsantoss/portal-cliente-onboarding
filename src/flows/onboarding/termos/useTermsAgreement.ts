import { ref } from 'vue';
import { TERMS_DOCUMENTS } from '@/constants/termsDocuments';
import type { TermsDocumentType } from '@/types/terms';
import { downloadTextFile } from '@/utils/downloadTextFile';

interface UseTermsAgreementParams {
  onAccept: () => void;
}

export function useTermsAgreement({ onAccept }: UseTermsAgreementParams) {
  const accepted = ref(false);
  const activeDocModal = ref<TermsDocumentType | null>(null);

  const setAccepted = (value: boolean) => {
    accepted.value = value;
  };

  const setActiveDocModal = (value: TermsDocumentType | null) => {
    activeDocModal.value = value;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (accepted.value) {
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
