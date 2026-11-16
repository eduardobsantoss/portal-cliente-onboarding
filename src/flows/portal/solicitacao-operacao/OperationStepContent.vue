<script setup lang="ts">
import type { OperationCompletionData } from '@/types/operationRequest';
import AccountSelectionStep from './account-selection/AccountSelectionStep.vue';
import CompletedStep from './completed/CompletedStep.vue';
import FinalReviewStep from './final-review/FinalReviewStep.vue';
import type { OperationRequestFlowState } from './useOperationRequestFlow';
import ProcessingDocsStep from './processing-docs/ProcessingDocsStep.vue';
import ReleaseStep from './release/ReleaseStep.vue';
import SignatureStep from './signature/SignatureStep.vue';
import SummaryStep from './summary/SummaryStep.vue';
import ValidatingStep from './validating/ValidatingStep.vue';
import XmlUploadStep from './xml-upload/XmlUploadStep.vue';

// `flow` é um objeto simples de refs/funções (não reativo), então os refs
// são lidos com `.value` também no template.
defineProps<{
  flow: OperationRequestFlowState;
}>();

const emit = defineEmits<{
  complete: [operationData: OperationCompletionData];
}>();
</script>

<template>
  <XmlUploadStep
    v-if="flow.step.value === 'XML_UPLOAD'"
    :files="flow.files.value"
    @file-upload="flow.handleFileUpload"
  />

  <AccountSelectionStep
    v-else-if="flow.step.value === 'ACCOUNT_SELECTION'"
    :selected-account="flow.selectedAccount.value"
    @select-account="flow.setSelectedAccount"
  />

  <ValidatingStep
    v-else-if="flow.step.value === 'VALIDATING'"
    :validation-progress="flow.validationProgress.value"
    :show-long-wait-warning="flow.showLongWaitWarning.value"
  />

  <SummaryStep
    v-else-if="flow.step.value === 'SUMMARY'"
    :value-attends="flow.valueAttends.value"
    @set-value-attends="flow.setValueAttends"
    @agree="flow.nextStep"
    @recusar="flow.handleRecusar"
    @upload-more="flow.handleUploadMoreTitles"
  />

  <ProcessingDocsStep
    v-else-if="flow.step.value === 'PROCESSING_DOCS'"
    :processing-index="flow.processingIndex.value"
  />

  <FinalReviewStep
    v-else-if="flow.step.value === 'FINAL_REVIEW'"
    :terms-accepted="flow.termsAccepted.value"
    @terms-accepted-change="flow.setTermsAccepted"
    @recusar="flow.handleRecusar"
    @confirm="flow.nextStep"
  />

  <SignatureStep
    v-else-if="flow.step.value === 'SIGNATURE'"
    :is-signed="flow.isSigned.value"
    :signatures="flow.signatures.value"
    @sign-first="flow.handleSignFirst"
    @continue="flow.handleContinueAfterSignatures"
  />

  <ReleaseStep v-else-if="flow.step.value === 'RELEASE'" />

  <CompletedStep v-else-if="flow.step.value === 'COMPLETED'" @complete="emit('complete', $event)" />
</template>
