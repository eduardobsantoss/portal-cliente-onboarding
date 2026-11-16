import { ref } from 'vue';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { buildMockXmlFiles, INITIAL_OPERATION_SIGNATURES } from '@/mocks/operationRequest';
import type {
  OperationSignature,
  OperationStep,
  OperationValueAttends,
  OperationXmlFile,
} from '@/types/operationRequest';
import {
  canContinueOperation,
  getNextOperationStep,
  getPreviousOperationStep,
} from '@/utils/operationFlow';
import { useLongWaitWarning } from './useLongWaitWarning';
import { useProcessingProgress } from './useProcessingProgress';
import { useReleaseCountdown } from './useReleaseCountdown';
import { useValidationProgress } from './useValidationProgress';

interface UseOperationRequestFlowParams {
  onClose: () => void;
}

export function useOperationRequestFlow({ onClose }: UseOperationRequestFlowParams) {
  const termsAccepted = ref(false);
  const valueAttends = ref<OperationValueAttends>(null);
  const step = ref<OperationStep>('XML_UPLOAD');
  const files = ref<OperationXmlFile[]>([]);
  const selectedAccount = ref('');
  const skippingAccountStep = ref(false);
  const isSigned = ref(false);
  const signatures = ref<OperationSignature[]>(INITIAL_OPERATION_SIGNATURES);

  const setStep = (value: OperationStep) => {
    step.value = value;
  };
  const setSelectedAccount = (value: string) => {
    selectedAccount.value = value;
  };
  const setValueAttends = (value: OperationValueAttends) => {
    valueAttends.value = value;
  };
  const setTermsAccepted = (value: boolean) => {
    termsAccepted.value = value;
  };

  const nextStep = () => {
    const target = getNextOperationStep(step.value, skippingAccountStep.value);
    if (target) {
      setStep(target);
    }
  };

  const prevStep = () => {
    const target = getPreviousOperationStep(step.value);
    if (target) {
      setStep(target);
    }
  };

  useBodyScrollLock();
  const { validationProgress, timer } = useValidationProgress(step, setStep);
  const processingIndex = useProcessingProgress(step, () => nextStep());
  useReleaseCountdown(step, () => nextStep());
  const showLongWaitWarning = useLongWaitWarning(timer);

  const handleFileUpload = () => {
    files.value = buildMockXmlFiles();
  };

  const handleRecusar = () => {
    if (confirm('Deseja realmente recusar esta operação? Todos os dados serão perdidos.')) {
      onClose();
    }
  };

  const handleSignFirst = () => {
    signatures.value = signatures.value.map(s => s.id === 1 ? { ...s, status: 'Assinado' } : s);
  };

  const handleContinueAfterSignatures = () => {
    isSigned.value = true;
    nextStep();
  };

  const handleUploadMoreTitles = () => {
    skippingAccountStep.value = true;
    setStep('XML_UPLOAD');
  };

  const canContinue = () => canContinueOperation(step.value, {
    filesCount: files.value.length,
    selectedAccount: selectedAccount.value,
    termsAccepted: termsAccepted.value,
    isSigned: isSigned.value,
  });

  return {
    step,
    files,
    selectedAccount,
    setSelectedAccount,
    valueAttends,
    setValueAttends,
    termsAccepted,
    setTermsAccepted,
    isSigned,
    signatures,
    validationProgress,
    showLongWaitWarning,
    processingIndex,
    nextStep,
    prevStep,
    canContinue,
    handleFileUpload,
    handleRecusar,
    handleSignFirst,
    handleContinueAfterSignatures,
    handleUploadMoreTitles,
  };
}

export type OperationRequestFlowState = ReturnType<typeof useOperationRequestFlow>;
