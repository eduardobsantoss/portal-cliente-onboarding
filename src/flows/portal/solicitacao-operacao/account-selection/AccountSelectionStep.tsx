import { MOCK_DISBURSEMENT_ACCOUNTS } from '@/mocks/operationRequest';
import { OperationTimeline } from '@/flows/portal/solicitacao-operacao/OperationTimeline';
import { AccountOption } from './AccountOption';
import { NewAccountNotice } from './NewAccountNotice';

interface AccountSelectionStepProps {
  selectedAccount: string;
  onSelectAccount: (accountId: string) => void;
}

export const AccountSelectionStep = ({ selectedAccount, onSelectAccount }: AccountSelectionStepProps) => {
  return (
    <>
      <OperationTimeline step="ACCOUNT_SELECTION" />
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black text-gci tracking-tight">Conta para Desembolso</h2>
        <p className="text-slate-500 text-lg font-medium">Selecione para qual conta o valor será enviado.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-6">
        {MOCK_DISBURSEMENT_ACCOUNTS.map((acc) => (
          <AccountOption
            key={acc.id}
            acc={acc}
            selectedAccount={selectedAccount}
            onSelect={onSelectAccount}
          />
        ))}

        <NewAccountNotice />
      </div>
    </>
  );
};
