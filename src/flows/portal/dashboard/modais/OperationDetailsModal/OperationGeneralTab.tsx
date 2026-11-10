import { Info } from 'lucide-react';
import type { PortalOperation } from '@/types/portalOperation';
import { buildOperationInfo, buildOperationKpis } from '@/utils/operationDetails';
import { InfoSectionCard } from '@/flows/portal/dashboard/modais/comum/InfoSectionCard';

interface OperationGeneralTabProps {
  operation: PortalOperation;
}

export const OperationGeneralTab = ({ operation }: OperationGeneralTabProps) => (
  <div className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {buildOperationKpis(operation).map((kpi, i) => (
        <div key={i} className="bg-gray-50/50 border border-gray-100 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center ${kpi.color} shadow-sm`}>
              <kpi.icon size={16} />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black">{kpi.label}</p>
          </div>
          <p className="text-xl font-black text-gci">{kpi.value}</p>
        </div>
      ))}
    </div>

    <InfoSectionCard
      icon={Info}
      title="Informações Detalhadas"
      items={buildOperationInfo(operation)}
      className="bg-white rounded-[32px] border border-gray-100 overflow-hidden"
      headerClassName="p-6 border-b border-gray-100 bg-gray-50/30"
      labelClassName="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-black mb-1.5 group-hover:text-agro-orange transition-colors"
      valueClassName="text-lg font-bold text-gci"
    />
  </div>
);
