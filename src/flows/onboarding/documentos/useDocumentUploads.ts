import { useEffect, useRef, useState } from 'react';
import { UPLOAD_ERROR_DISMISS_MS, UPLOAD_SIMULATED_DELAY_MS } from '@/constants/documentUpload';
import type { DocumentUploadItem, DocumentsMode } from '@/types/documentUpload';
import {
  applyDocumentAdjustment,
  attachDemoFile,
  clearDocumentUpload,
  markDocumentUploaded,
} from '@/utils/documentUploadState';
import { readFileAsDataUrl, validateUploadFile } from '@/utils/fileUpload';
import { buildRequiredDocuments, type RequiredDocumentsInput } from '@/utils/requiredDocuments';

export interface DocumentUploadsOptions {
  initialDocuments?: DocumentUploadItem[] | null;
  onDocumentsChange?: (documents: DocumentUploadItem[]) => void;
  mode?: DocumentsMode;
  adjustmentRequestId?: number;
  appliedAdjustmentRequestId?: number;
  onAdjustmentApplied?: (requestId: number) => void;
}

function documentNumbersFrom(docs: DocumentUploadItem[]): Record<string, string> {
  const map: Record<string, string> = {};
  docs.forEach((doc) => {
    if (doc.documentNumber) map[doc.id] = doc.documentNumber;
  });
  return map;
}

function inputKeyOf(input: RequiredDocumentsInput): string {
  return [
    input.accountType,
    input.companyName,
    input.tipoEmpresa,
    String(input.hasProcurador),
    input.socios.map((socio) => socio.id).join(','),
    input.nonPartnerRepresentatives.map((rep) => rep.id).join(','),
  ].join('|');
}

/** Estado da lista de documentos, números digitados, upload em andamento e erro de validação. */
export function useDocumentUploads(
  buildDocuments: () => DocumentUploadItem[],
  input: RequiredDocumentsInput,
  options: DocumentUploadsOptions = {}
) {
  const {
    initialDocuments,
    onDocumentsChange,
    mode = 'initial',
    adjustmentRequestId = 0,
    appliedAdjustmentRequestId = 0,
    onAdjustmentApplied,
  } = options;

  const shouldApplyAdjustment =
    mode === 'adjustment' && adjustmentRequestId !== appliedAdjustmentRequestId;

  const [documentList, setDocumentList] = useState<DocumentUploadItem[]>(() => {
    const base = initialDocuments?.length ? initialDocuments : buildDocuments();
    return shouldApplyAdjustment ? applyDocumentAdjustment(base) : base;
  });
  const [docNumbers, setDocNumbers] = useState<Record<string, string>>(() =>
    documentNumbersFrom(
      shouldApplyAdjustment
        ? applyDocumentAdjustment(initialDocuments?.length ? initialDocuments : buildDocuments())
        : initialDocuments?.length
          ? initialDocuments
          : buildDocuments()
    )
  );
  const [activeUploadingId, setActiveUploadingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const inputKey = inputKeyOf(input);
  const seenInputKey = useRef(inputKey);
  const inputRef = useRef(input);
  inputRef.current = input;

  // Rebuild only when the account/partners actually change, so a saved snapshot survives remounts.
  useEffect(() => {
    if (seenInputKey.current === inputKey) return;
    seenInputKey.current = inputKey;
    setDocumentList(buildRequiredDocuments(inputRef.current));
  }, [inputKey]);

  useEffect(() => {
    onDocumentsChange?.(documentList);
  }, [documentList, onDocumentsChange]);

  useEffect(() => {
    if (mode === 'adjustment' && adjustmentRequestId !== appliedAdjustmentRequestId) {
      onAdjustmentApplied?.(adjustmentRequestId);
    }
  }, [mode, adjustmentRequestId, appliedAdjustmentRequestId, onAdjustmentApplied]);

  const hasRegularization = documentList.some((doc) => doc.isRegularizationNeeded);

  // File upload handler with 12MB and JPG/JPEG/PNG/PDF base64 validation
  const handleFileUpload = (docId: string, file: File) => {
    const validationError = validateUploadFile(file);
    if (validationError) {
      setUploadError(validationError);
      setTimeout(() => setUploadError(null), UPLOAD_ERROR_DISMISS_MS);
      return;
    }

    setActiveUploadingId(docId);
    setUploadError(null);

    readFileAsDataUrl(file, (base64Data) => {
      setTimeout(() => {
        setDocumentList((prev) =>
          prev.map((doc) => (doc.id === docId ? markDocumentUploaded(doc, file, base64Data) : doc))
        );
        setActiveUploadingId(null);
      }, UPLOAD_SIMULATED_DELAY_MS);
    });
  };

  // Remove uploaded file
  const handleRemoveFile = (docId: string) => {
    setDocumentList((prev) => prev.map((doc) => (doc.id === docId ? clearDocumentUpload(doc) : doc)));
  };

  // Fast-forward demo helper
  const handleAttachAllDemo = () => {
    setDocumentList((prev) => prev.map(attachDemoFile));
  };

  const handleDocumentNumberChange = (docId: string, value: string) => {
    setDocNumbers((prev) => ({ ...prev, [docId]: value }));
    setDocumentList((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, documentNumber: value } : d))
    );
  };

  const dismissUploadError = () => setUploadError(null);

  return {
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
  };
}
