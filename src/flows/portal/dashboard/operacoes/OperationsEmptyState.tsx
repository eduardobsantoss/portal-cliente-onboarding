import { FileText } from 'lucide-react';

/** Estado vazio "Nenhuma operação ativa". */
interface OperationsEmptyStateProps {
  onViewServices: () => void;
}

export const OperationsEmptyState = ({ onViewServices }: OperationsEmptyStateProps) => (
  <div className="bg-white rounded-[40px] border border-gray-100 p-20 text-center flex flex-col items-center justify-center shadow-sm">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
        <FileText size={40} />
      </div>
      <h3 className="text-2xl font-black text-gci mb-3 tracking-tight">Nenhuma operação ativa</h3>
      <p className="text-gray-500 mb-8 max-w-md font-medium">Você ainda não possui solicitações em andamento. Inicie uma nova operação agora mesmo.</p>
      <button 
        onClick={onViewServices}
        className="bg-gci text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-gci-hover transition-all shadow-xl shadow-gci/20 active:scale-[0.98]"
      >
        Ver Serviços Disponíveis
      </button>
    </div>
);
