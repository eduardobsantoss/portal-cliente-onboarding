import { AlertCircle } from 'lucide-react';
import { DetailsAlertBanner } from '../comum/DetailsAlertBanner';

interface OperationPendingBannerProps {
  onResolve: () => void;
}

export const OperationPendingBanner = ({ onResolve }: OperationPendingBannerProps) => (
  <DetailsAlertBanner
    tone="warning"
    withBottomMargin
    icon={AlertCircle}
    actions={(
      <button
        onClick={onResolve}
        className="bg-gci text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gci-hover transition-all shadow-xl shadow-gci/10 active:scale-95"
      >
        Resolver Pendência
      </button>
    )}
  >
    <h4 className="text-lg font-black text-gci mb-1">Ação Pendente Necessária</h4>
    <p className="text-sm text-slate-600 leading-relaxed">
      Esta operação possui pendências de assinatura e confirmação de títulos. Por favor, revise os termos para prosseguir com a liquidação.
    </p>
  </DetailsAlertBanner>
);
