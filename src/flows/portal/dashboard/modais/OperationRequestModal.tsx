import { AnimatePresence } from 'motion/react';
import { OperationRequestFlow } from '@/flows/portal/solicitacao-operacao/OperationRequestFlow';
import type { OperationCompletionData } from '@/types/operationRequest';

interface OperationRequestModalProps {
  isOpen: boolean;
  serviceName: string;
  onClose: () => void;
  onComplete: (operationData: OperationCompletionData) => void;
}

export const OperationRequestModal = ({ isOpen, serviceName, onClose, onComplete }: OperationRequestModalProps) => (
  <AnimatePresence>
    {isOpen && <OperationRequestFlow serviceName={serviceName} onClose={onClose} onComplete={onComplete} />}
  </AnimatePresence>
);
