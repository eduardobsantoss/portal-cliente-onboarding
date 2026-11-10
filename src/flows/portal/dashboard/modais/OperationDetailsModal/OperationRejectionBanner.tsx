import { AlertTriangle, Clock } from 'lucide-react';
import {
  OPERATION_REJECTION_FALLBACK_DATE,
  OPERATION_REJECTION_FALLBACK_REASON,
} from '@/mocks/operationDetails';
import type { PortalOperation } from '@/types/portalOperation';
import { DetailsAlertBanner } from '../comum/DetailsAlertBanner';

interface OperationRejectionBannerProps {
  operation: PortalOperation;
}

export const OperationRejectionBanner = ({ operation }: OperationRejectionBannerProps) => (
  <DetailsAlertBanner
    tone="danger"
    withBottomMargin
    icon={AlertTriangle}
    actions={(
      <div className="flex gap-4">
        <button className="bg-white border-2 border-slate-100 text-slate-400 px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:border-gci hover:text-gci transition-all active:scale-95">
          Ver Motivo Detalhado
        </button>
        <button className="bg-gci text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gci-hover transition-all shadow-xl shadow-gci/10 active:scale-95">
          Falar com Consultor
        </button>
      </div>
    )}
  >
    <h4 className="text-lg font-black text-red-600 mb-1">Operação Recusada</h4>
    <p className="text-sm text-slate-600 leading-relaxed">
      {operation.rejectionReason || OPERATION_REJECTION_FALLBACK_REASON}
    </p>
    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
      <Clock size={12} />
      Processado em: {operation.rejectedAt || OPERATION_REJECTION_FALLBACK_DATE}
    </p>
  </DetailsAlertBanner>
);
