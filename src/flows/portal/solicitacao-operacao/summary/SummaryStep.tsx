import { MOCK_OPERATION_SUMMARY, MOCK_REJECTED_TITLES } from '@/mocks/operationRequest';
import type { OperationValueAttends } from '@/types/operationRequest';
import { OperationTimeline } from '../OperationTimeline';
import { SummaryAgreementNotice } from './SummaryAgreementNotice';
import { SummaryFiguresCard } from './SummaryFiguresCard';
import { ValueAttendsPanel } from './ValueAttendsPanel';

interface SummaryStepProps {
  valueAttends: OperationValueAttends;
  setValueAttends: (value: OperationValueAttends) => void;
  onAgree: () => void;
  onRecusar: () => void;
  onUploadMore: () => void;
}

export const SummaryStep = ({ valueAttends, setValueAttends, onAgree, onRecusar, onUploadMore }: SummaryStepProps) => {
  return (
    <>
      <OperationTimeline step="SUMMARY" />
      <div className="text-center">
        <h2 className="text-3xl font-black text-gci tracking-tight uppercase">Resumo da Operação</h2>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-6">
        <SummaryFiguresCard summary={MOCK_OPERATION_SUMMARY} rejectedTitles={MOCK_REJECTED_TITLES} />

        <SummaryAgreementNotice />

        <ValueAttendsPanel
          valueAttends={valueAttends}
          setValueAttends={setValueAttends}
          onAgree={onAgree}
          onRecusar={onRecusar}
          onUploadMore={onUploadMore}
        />
      </div>
    </>
  );
};
