import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Building2, Calendar, FileText } from 'lucide-react';
import type { PortalOperation } from '@/types/portalOperation';

/** Cartão de operação da aba Operações. */
interface OperationCardProps {
  op: PortalOperation;
  onOpenDetails: (op: PortalOperation) => void;
}

export const OperationCard: React.FC<OperationCardProps> = ({ op, onOpenDetails }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-gci/5 rounded-bl-[64px] -mr-4 -mt-4"></div>

    <div className="flex items-center justify-between mb-8 relative z-10">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gci/5 flex items-center justify-center text-gci group-hover:bg-gci group-hover:text-white transition-all">
          <FileText size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#{op.id}</p>
          <h3 className="font-black text-gci text-lg leading-tight">{op.type}</h3>
        </div>
      </div>
    </div>

    <div className="space-y-6 relative z-10">
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">Grupo Empresarial</p>
          <p className="font-bold text-gci truncate">{op.title}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">Valor Estimado</p>
          <p className="text-lg font-black text-gci">{op.value}</p>
        </div>
      </div>

      {/* Progress Indicator inside card */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded-xl">
        {[
          { label: 'Envio', completed: true },
          { label: 'Análise', completed: op.status !== 'Rejeitado' },
          { label: 'Assinatura', completed: op.status === 'Finalizado' },
          { label: 'Liberação', completed: op.status === 'Finalizado' }
        ].map((s, idx) => (
          <div key={idx} className="flex-1 flex flex-col gap-1">
            <div className={`h-1 rounded-full transition-all ${
              s.completed ? 'bg-agro-orange' : 'bg-slate-200'
            }`} />
            <span className={`text-[7px] font-black uppercase tracking-tighter text-center ${
              s.completed ? 'text-agro-orange' : 'text-slate-300'
            }`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">Status</p>
          <span className={`text-[10px] font-black px-3 py-1 rounded-lg flex items-center gap-1.5 uppercase tracking-wider border ${
            op.status === 'Rejeitado' ? 'bg-red-50 text-red-500 border-red-100' :
            op.status === 'Finalizado' ? 'bg-green-50 text-green-600 border-green-100' :
            op.status === 'Em andamento' ? 'bg-blue-50 text-blue-600 border-blue-100' :
            'bg-orange-50 text-agro-orange border-orange-100 animate-pulse'
          }`}>
            {op.status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
          <Calendar size={12} className="text-slate-300" />
          {op.date}
        </div>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
        <Building2 size={14} />
        <span>{op.date}</span>
      </div>
      <button 
        onClick={() => onOpenDetails(op)}
        className="flex items-center gap-1 text-[10px] font-black text-gci hover:text-agro-orange transition-colors uppercase tracking-widest"
      >
        Detalhes
        <ArrowUpRight size={14} />
      </button>
    </div>
  </motion.div>
);
