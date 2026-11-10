import type { OperationValueAttends } from '@/types/operationRequest';
import { ValueAttendsActions } from './ValueAttendsActions';
import { ValueAttendsChoice } from './ValueAttendsChoice';

interface ValueAttendsPanelProps {
  valueAttends: OperationValueAttends;
  setValueAttends: (value: OperationValueAttends) => void;
  onAgree: () => void;
  onRecusar: () => void;
  onUploadMore: () => void;
}

export const ValueAttendsPanel = ({ valueAttends, setValueAttends, onAgree, onRecusar, onUploadMore }: ValueAttendsPanelProps) => {
  return (
    <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100/30 text-center space-y-8">
      <div className="space-y-6">
        <h3 className="text-xl font-black text-gci">Este valor estimado te atende?</h3>

        <ValueAttendsChoice valueAttends={valueAttends} setValueAttends={setValueAttends} />

        <ValueAttendsActions
          valueAttends={valueAttends}
          onAgree={onAgree}
          onRecusar={onRecusar}
          onUploadMore={onUploadMore}
        />
      </div>
    </div>
  );
};
