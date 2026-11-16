import { computed, onMounted, ref, shallowRef, toValue, watch, type MaybeRefOrGetter } from 'vue';
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

/**
 * Estado da lista de documentos, números digitados, upload em andamento e erro de validação.
 * `input` e `options` devem ser getters/refs para manter a reatividade das props.
 */
export function useDocumentUploads(
  buildDocuments: () => DocumentUploadItem[],
  input: MaybeRefOrGetter<RequiredDocumentsInput>,
  options: MaybeRefOrGetter<DocumentUploadsOptions> = {}
) {
  const initialOptions = toValue(options);
  const shouldApplyAdjustment =
    (initialOptions.mode ?? 'initial') === 'adjustment' &&
    (initialOptions.adjustmentRequestId ?? 0) !== (initialOptions.appliedAdjustmentRequestId ?? 0);

  const initialBase = initialOptions.initialDocuments?.length
    ? initialOptions.initialDocuments
    : buildDocuments();

  const documentList = shallowRef<DocumentUploadItem[]>(
    shouldApplyAdjustment ? applyDocumentAdjustment(initialBase) : initialBase
  );
  const docNumbers = ref<Record<string, string>>(
    documentNumbersFrom(
      shouldApplyAdjustment
        ? applyDocumentAdjustment(
            initialOptions.initialDocuments?.length
              ? initialOptions.initialDocuments
              : buildDocuments()
          )
        : initialOptions.initialDocuments?.length
          ? initialOptions.initialDocuments
          : buildDocuments()
    )
  );
  const activeUploadingId = ref<string | null>(null);
  const uploadError = ref<string | null>(null);

  const inputKey = computed(() => inputKeyOf(toValue(input)));
  let seenInputKey = inputKey.value;

  // Rebuild only when the account/partners actually change, so a saved snapshot survives remounts.
  watch(inputKey, (key) => {
    if (seenInputKey === key) return;
    seenInputKey = key;
    documentList.value = buildRequiredDocuments(toValue(input));
  });

  const notifyDocumentsChange = () => {
    toValue(options).onDocumentsChange?.(documentList.value);
  };
  watch(documentList, notifyDocumentsChange, { flush: 'post' });

  const notifyAdjustmentApplied = () => {
    const { mode = 'initial', adjustmentRequestId = 0, appliedAdjustmentRequestId = 0, onAdjustmentApplied } =
      toValue(options);
    if (mode === 'adjustment' && adjustmentRequestId !== appliedAdjustmentRequestId) {
      onAdjustmentApplied?.(adjustmentRequestId);
    }
  };
  watch(
    () => {
      const { mode = 'initial', adjustmentRequestId = 0, appliedAdjustmentRequestId = 0 } =
        toValue(options);
      return `${mode}|${adjustmentRequestId}|${appliedAdjustmentRequestId}`;
    },
    notifyAdjustmentApplied,
    { flush: 'post' }
  );

  // Equivalente ao efeito inicial (executa uma vez após a montagem).
  onMounted(() => {
    notifyDocumentsChange();
    notifyAdjustmentApplied();
  });

  const hasRegularization = computed(() =>
    documentList.value.some((doc) => doc.isRegularizationNeeded)
  );

  // File upload handler with 12MB and JPG/JPEG/PNG/PDF base64 validation
  const handleFileUpload = (docId: string, file: File) => {
    const validationError = validateUploadFile(file);
    if (validationError) {
      uploadError.value = validationError;
      setTimeout(() => {
        uploadError.value = null;
      }, UPLOAD_ERROR_DISMISS_MS);
      return;
    }

    activeUploadingId.value = docId;
    uploadError.value = null;

    readFileAsDataUrl(file, (base64Data) => {
      setTimeout(() => {
        documentList.value = documentList.value.map((doc) =>
          doc.id === docId ? markDocumentUploaded(doc, file, base64Data) : doc
        );
        activeUploadingId.value = null;
      }, UPLOAD_SIMULATED_DELAY_MS);
    });
  };

  // Remove uploaded file
  const handleRemoveFile = (docId: string) => {
    documentList.value = documentList.value.map((doc) =>
      doc.id === docId ? clearDocumentUpload(doc) : doc
    );
  };

  // Fast-forward demo helper
  const handleAttachAllDemo = () => {
    documentList.value = documentList.value.map(attachDemoFile);
  };

  const handleDocumentNumberChange = (docId: string, value: string) => {
    docNumbers.value = { ...docNumbers.value, [docId]: value };
    documentList.value = documentList.value.map((d) =>
      d.id === docId ? { ...d, documentNumber: value } : d
    );
  };

  const dismissUploadError = () => {
    uploadError.value = null;
  };

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
