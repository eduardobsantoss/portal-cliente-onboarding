<script setup lang="ts">
import { ref } from 'vue';
import SupportFaqModal from '@/components/support/SupportFaqModal.vue';
import type { PreviewDoc } from '@/types/documentChecklist';
import FacialTopic from './biometria-facial/FacialTopic.vue';
import ChecklistFooter from './ChecklistFooter.vue';
import ChecklistProgressBar from './ChecklistProgressBar.vue';
import ChecklistToolbar from './ChecklistToolbar.vue';
import CompanyDocumentsSection from './documentos-empresa/CompanyDocumentsSection.vue';
import CreditRelationshipSection from './credito-relacionamento/CreditRelationshipSection.vue';
import DocumentPreviewModal from './DocumentPreviewModal.vue';
import FinancialStatementsSection from './demonstrativos-financeiros/FinancialStatementsSection.vue';
import AddPartnerModal from './quadro-societario/AddPartnerModal.vue';
import PartnersSection from './quadro-societario/PartnersSection.vue';
import SmsTopic from './sms-telefone/SmsTopic.vue';
import { useAddPartnerForm } from './useAddPartnerForm';
import { useChecklistDocuments } from './useChecklistDocuments';
import { useChecklistProgress } from './useChecklistProgress';
import { useChecklistSimulation } from './useChecklistSimulation';
import { useChecklistTopics } from './useChecklistTopics';
import { useIdentityVerification } from './useIdentityVerification';
import { usePartnerDocs } from './usePartnerDocs';
import ValidationErrorBanner from './ValidationErrorBanner.vue';
import ValidationLoadingView from './ValidationLoadingView.vue';

defineProps<{
  isVerified?: boolean;
}>();

const emit = defineEmits<{
  completeVerification: [];
  resetVerification: [];
}>();

const { companyTier, setCompanyTier, setDocs, pjDocs, finDocs, credDocs, handleFileUpload } =
  useChecklistDocuments();
const {
  phoneVerified,
  phoneVerifiedAt,
  facialVerified,
  handlePhoneVerified,
  handleFacialVerified,
  markAllVerified,
  resetIdentity,
} = useIdentityVerification();
const { expandedTopics, toggleTopic, openTopics } = useChecklistTopics();
const {
  partners,
  setPartners,
  expandedPartnerId,
  setExpandedPartnerId,
  handlePartnerDocUpload,
  addPartner,
} = usePartnerDocs();
const {
  showAddPartnerModal,
  setShowAddPartnerModal,
  newPartner,
  updateField,
  handleAddPartnerSubmit,
} = useAddPartnerForm(addPartner);

// Modals state
const showSupportModal = ref(false);
const previewDoc = ref<PreviewDoc | null>(null);

const {
  isValidatingDocuments,
  hasValidationErrors,
  isBulkUploading,
  handleApproveValidation,
  handleSimulateAdjustments,
  handleQuickUploadAll,
  handleResetState,
} = useChecklistSimulation({
  setDocs,
  setPartners,
  setExpandedPartnerId,
  openTopics,
  markAllIdentityVerified: markAllVerified,
  resetIdentity,
  onCompleteVerification: () => emit('completeVerification'),
  onResetVerification: () => emit('resetVerification'),
});

const {
  pjStats,
  finStats,
  credStats,
  partnersValidCount,
  partnersDone,
  completedTopicsCount,
  totalTopics,
} = useChecklistProgress({
  companyTier,
  pjDocs,
  finDocs,
  credDocs,
  partners,
  phoneVerified,
  facialVerified,
});

/** Checklist da Análise de Crédito: orquestra as 6 seções, progresso, modais e simulações. */
</script>

<template>
  <!-- Real-time document validation loading view -->
  <ValidationLoadingView
    v-if="isValidatingDocuments"
    @approve="handleApproveValidation"
    @adjust="handleSimulateAdjustments"
  />

  <div v-else class="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">

    <!-- Controls & Demo Switcher Bar -->
    <ChecklistToolbar
      :company-tier="companyTier"
      @tier-change="setCompanyTier"
      @help="showSupportModal = true"
    />

    <!-- Rejection / Adjustments Warning Banner -->
    <ValidationErrorBanner v-if="hasValidationErrors" />

    <!-- Progress Bar (Minimalist) -->
    <ChecklistProgressBar
      :completed-topics-count="completedTopicsCount"
      :total-topics="totalTopics"
    />

    <!-- TÓPICOS ACCORDION LIST -->
    <div class="space-y-3">
      <SmsTopic
        :phone-verified="phoneVerified"
        :phone-verified-at="phoneVerifiedAt"
        :is-open="expandedTopics.sms"
        @toggle="toggleTopic('sms')"
        @verified="handlePhoneVerified"
      />

      <FacialTopic
        :facial-verified="facialVerified"
        :is-open="expandedTopics.biometria"
        @toggle="toggleTopic('biometria')"
        @verified="handleFacialVerified"
      />

      <CompanyDocumentsSection
        :docs="pjDocs"
        :stats="pjStats"
        :company-tier="companyTier"
        :is-open="expandedTopics.pj"
        @toggle="toggleTopic('pj')"
        @upload="handleFileUpload"
        @preview="(doc) => (previewDoc = doc)"
      />

      <FinancialStatementsSection
        :docs="finDocs"
        :stats="finStats"
        :company-tier="companyTier"
        :is-open="expandedTopics.financeiro"
        @toggle="toggleTopic('financeiro')"
        @upload="handleFileUpload"
        @preview="(doc) => (previewDoc = doc)"
      />

      <CreditRelationshipSection
        :docs="credDocs"
        :stats="credStats"
        :company-tier="companyTier"
        :is-open="expandedTopics.credito"
        @toggle="toggleTopic('credito')"
        @upload="handleFileUpload"
        @preview="(doc) => (previewDoc = doc)"
      />

      <PartnersSection
        :partners="partners"
        :partners-valid-count="partnersValidCount"
        :partners-done="partnersDone"
        :expanded-partner-id="expandedPartnerId"
        :is-open="expandedTopics.socios"
        @expanded-partner-change="setExpandedPartnerId"
        @toggle="toggleTopic('socios')"
        @upload-doc="handlePartnerDocUpload"
        @preview="(doc) => (previewDoc = doc)"
        @add-partner="setShowAddPartnerModal(true)"
      />
    </div>

    <!-- Discreet Simulation / Prefill Footer (Subtle as requested) -->
    <ChecklistFooter
      :is-bulk-uploading="isBulkUploading"
      @fill-all="handleQuickUploadAll"
      @reset="handleResetState"
    />

    <!-- Support & FAQ Modal -->
    <SupportFaqModal
      :is-open="showSupportModal"
      @close="showSupportModal = false"
    />

    <!-- Preview Modal -->
    <DocumentPreviewModal :preview-doc="previewDoc" @close="previewDoc = null" />

    <!-- Add Partner Modal -->
    <AddPartnerModal
      :is-open="showAddPartnerModal"
      :values="newPartner"
      @field-change="updateField"
      @submit="handleAddPartnerSubmit"
      @close="setShowAddPartnerModal(false)"
    />

  </div>
</template>
