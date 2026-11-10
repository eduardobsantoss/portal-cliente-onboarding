import { useState } from 'react';
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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [valueAttends, setValueAttends] = useState<OperationValueAttends>(null);
  const [step, setStep] = useState<OperationStep>('XML_UPLOAD');
  const [files, setFiles] = useState<OperationXmlFile[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [skippingAccountStep, setSkippingAccountStep] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [signatures, setSignatures] = useState<OperationSignature[]>(INITIAL_OPERATION_SIGNATURES);

  const nextStep = () => {
    const target = getNextOperationStep(step, skippingAccountStep);
    if (target) {
      setStep(target);
    }
  };

  const prevStep = () => {
    const target = getPreviousOperationStep(step);
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
    setFiles(buildMockXmlFiles());
  };

  const handleRecusar = () => {
    if (confirm('Deseja realmente recusar esta operação? Todos os dados serão perdidos.')) {
      onClose();
    }
  };

  const handleSignFirst = () => {
    setSignatures(signatures.map(s => s.id === 1 ? { ...s, status: 'Assinado' } : s));
  };

  const handleContinueAfterSignatures = () => {
    setIsSigned(true);
    nextStep();
  };

  const handleUploadMoreTitles = () => {
    setSkippingAccountStep(true);
    setStep('XML_UPLOAD');
  };

  const canContinue = () => canContinueOperation(step, {
    filesCount: files.length,
    selectedAccount,
    termsAccepted,
    isSigned,
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
