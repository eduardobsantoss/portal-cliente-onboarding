import { Search } from 'lucide-react';
import { StatusFilterTabs } from '@/components/ui/StatusFilterTabs';
import { OPERACOES_STATUS_TABS } from '@/constants/dashboardTabs';

interface OperationsToolbarProps {
  searchOperationId: string;
  onSearchChange: (value: string) => void;
}

export const OperationsToolbar = ({ searchOperationId, onSearchChange }: OperationsToolbarProps) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
    <StatusFilterTabs
      labels={OPERACOES_STATUS_TABS}
      containerClassName="flex gap-1.5 p-1 bg-white border border-slate-100 rounded-xl w-fit"
      activeClassName="bg-white text-gci px-4 py-2 rounded-lg text-xs font-bold shadow-sm border border-slate-100"
      inactiveClassName="text-slate-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors"
    />
    <div className="relative w-full md:w-64">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
      <input 
        type="text"
        placeholder="Buscar por ID..."
        value={searchOperationId}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-gci transition-all shadow-sm"
      />
    </div>
  </div>
);
