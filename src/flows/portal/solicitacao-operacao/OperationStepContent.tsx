import type { OperationCompletionData } from '@/types/operationRequest';
import { AccountSelectionStep } from './account-selection/AccountSelectionStep';
import { CompletedStep } from './completed/CompletedStep';
import { FinalReviewStep } from './final-review/FinalReviewStep';
import type { OperationRequestFlowState } from './useOperationRequestFlow';
import { ProcessingDocsStep } from './processing-docs/ProcessingDocsStep';
import { ReleaseStep } from './release/ReleaseStep';
import { SignatureStep } from './signature/SignatureStep';
import { SummaryStep } from './summary/SummaryStep';
import { ValidatingStep } from './validating/ValidatingStep';
import { XmlUploadStep } from './xml-upload/XmlUploadStep';

interface OperationStepContentProps {
  flow: OperationRequestFlowState;
  onComplete: (operationData: OperationCompletionData) => void;
}

export const OperationStepContent = ({ flow, onComplete }: OperationStepContentProps) => {
  switch (flow.step) {
    case 'XML_UPLOAD':
      return <XmlUploadStep files={flow.files} onFileUpload={flow.handleFileUpload} />;

    case 'ACCOUNT_SELECTION':
      return (
        <AccountSelectionStep
          selectedAccount={flow.selectedAccount}
          onSelectAccount={flow.setSelectedAccount}
        />
      );

    case 'VALIDATING':
      return (
        <ValidatingStep
          validationProgress={flow.validationProgress}
          showLongWaitWarning={flow.showLongWaitWarning}
        />
      );

    case 'SUMMARY':
      return (
        <SummaryStep
          valueAttends={flow.valueAttends}
          setValueAttends={flow.setValueAttends}
          onAgree={flow.nextStep}
          onRecusar={flow.handleRecusar}
          onUploadMore={flow.handleUploadMoreTitles}
        />
      );

    case 'PROCESSING_DOCS':
      return <ProcessingDocsStep processingIndex={flow.processingIndex} />;

    case 'FINAL_REVIEW':
      return (
        <FinalReviewStep
          termsAccepted={flow.termsAccepted}
          onTermsAcceptedChange={flow.setTermsAccepted}
          onRecusar={flow.handleRecusar}
          onConfirm={flow.nextStep}
        />
      );

    case 'SIGNATURE':
      return (
        <SignatureStep
          isSigned={flow.isSigned}
          signatures={flow.signatures}
          onSignFirst={flow.handleSignFirst}
          onContinue={flow.handleContinueAfterSignatures}
        />
      );

    case 'RELEASE':
      return <ReleaseStep />;

    case 'COMPLETED':
      return <CompletedStep onComplete={onComplete} />;
  }
};
