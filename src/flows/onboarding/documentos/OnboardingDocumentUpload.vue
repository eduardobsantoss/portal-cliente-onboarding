<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import OnboardingPageShell from '@/components/layout/OnboardingPageShell.vue';
import { MOCK_COMPANY_CNPJ, MOCK_COMPANY_NAME } from '@/mocks/onboardingCompany';
import { DEFAULT_ONBOARDING_SOCIOS } from '@/mocks/onboardingDocumentSocios';
import type { AccountType } from '@/types/dadosComplementares';
import type { DocumentsMode, DocumentUploadItem } from '@/types/documentUpload';
import type { NonPartnerRepresentative } from '@/types/representante';
import type { Socio } from '@/types/socio';
import { getDocumentStats } from '@/utils/documentStats';
import type { RequiredDocumentsInput } from '@/utils/requiredDocuments';
import AttachAllDemoButton from './AttachAllDemoButton.vue';
import DocumentGroupList from './DocumentGroupList.vue';
import DocumentUploadActionsBar from './DocumentUploadActionsBar.vue';
import DocumentUploadIntro from './DocumentUploadIntro.vue';
import MissingDocumentsNotice from './MissingDocumentsNotice.vue';
import RegularizationAlert from './RegularizationAlert.vue';
import SecureTransmissionNotice from './SecureTransmissionNotice.vue';
import UploadErrorBanner from './UploadErrorBanner.vue';
import UploadProgressHeader from './UploadProgressHeader.vue';
import { useDocumentUploads } from './useDocumentUploads';
import { useRequiredDocuments } from './useRequiredDocuments';

const props = withDefaults(
  defineProps<{
    accountType?: AccountType;
    socios?: Socio[];
    nonPartnerRepresentatives?: NonPartnerRepresentative[];
    companyName?: string;
    cnpj?: string;
    tipoEmpresa?: string;
    hasProcurador?: boolean;
    documentsMode?: DocumentsMode;
    initialDocuments?: DocumentUploadItem[] | null;
    adjustmentRequestId?: number;
    appliedAdjustmentRequestId?: number;
  }>(),
  {
    accountType: 'pj',
    socios: () => DEFAULT_ONBOARDING_SOCIOS,
    nonPartnerRepresentatives: () => [],
    companyName: MOCK_COMPANY_NAME,
    cnpj: MOCK_COMPANY_CNPJ,
    tipoEmpresa: 'Sociedade empresária limitada',
    hasProcurador: false,
    documentsMode: undefined,
    initialDocuments: null,
    adjustmentRequestId: 0,
    appliedAdjustmentRequestId: 0,
  }
);

const emit = defineEmits<{
  documentsChange: [documents: DocumentUploadItem[]];
  adjustmentApplied: [requestId: number];
  submitDocs: [outcome?: 'approved' | 'rejected' | 'pending'];
  back: [];
  cancelRequest: [];
}>();

const documentsMode = computed<DocumentsMode>(() => props.documentsMode ?? 'initial');
const requiredDocumentsInput = computed<RequiredDocumentsInput>(() => ({
  accountType: props.accountType,
  socios: props.socios,
  nonPartnerRepresentatives: props.nonPartnerRepresentatives,
  companyName: props.companyName,
  tipoEmpresa: props.tipoEmpresa,
  hasProcurador: props.hasProcurador,
}));

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
} = useDocumentUploads(buildDocuments, requiredDocumentsInput, () => ({
  initialDocuments: props.initialDocuments,
  onDocumentsChange: (documents) => emit('documentsChange', documents),
  mode: documentsMode.value,
  adjustmentRequestId: props.adjustmentRequestId,
  appliedAdjustmentRequestId: props.appliedAdjustmentRequestId,
  onAdjustmentApplied: (requestId) => emit('adjustmentApplied', requestId),
}));

const stats = computed(() => getDocumentStats(documentList.value));
</script>

<template>
  <OnboardingPageShell
    section-label="Portal do Cliente • Envio de Documentos"
    main-class-name="max-w-5xl w-full mx-auto my-auto py-8 space-y-6"
  >
    <template #footerAction>
      <AttachAllDemoButton @click="handleAttachAllDemo" />
    </template>

    <!-- Main Card -->
    <motion.div
      :initial="{ opacity: 0, y: 14 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3 }"
      class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
    >
      <DocumentUploadIntro :account-type="accountType" />

      <div class="p-6 sm:p-8 space-y-6">
        <UploadErrorBanner v-if="uploadError" :message="uploadError" @dismiss="dismissUploadError" />

        <RegularizationAlert v-if="hasRegularization" />

        <UploadProgressHeader
          :uploaded-mandatory="stats.uploadedMandatory"
          :total-mandatory="stats.totalMandatory"
        />

        <DocumentGroupList
          :entity-groups="stats.entityGroups"
          :document-list="documentList"
          :cnpj="cnpj"
          :doc-numbers="docNumbers"
          :active-uploading-id="activeUploadingId"
          @document-number-change="handleDocumentNumberChange"
          @file-upload="handleFileUpload"
          @remove-file="handleRemoveFile"
        />

        <SecureTransmissionNotice :account-type="accountType" />

        <MissingDocumentsNotice
          v-if="!stats.isAllMandatoryUploaded && stats.missingMandatoryDocs.length > 0"
          :missing-mandatory-docs="stats.missingMandatoryDocs"
        />

        <DocumentUploadActionsBar
          :is-all-mandatory-uploaded="stats.isAllMandatoryUploaded"
          :has-pending-regularization="stats.hasPendingRegularization"
          :has-regularization="hasRegularization || documentsMode === 'adjustment'"
          @back="emit('back')"
          @submit="emit('submitDocs', 'pending')"
        />
      </div>
    </motion.div>
  </OnboardingPageShell>
</template>
