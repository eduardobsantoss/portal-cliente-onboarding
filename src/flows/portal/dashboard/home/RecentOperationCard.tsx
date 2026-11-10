import React from 'react';
import { motion } from 'motion/react';
import { Calendar, FileText } from 'lucide-react';
import type { PortalOperation } from '@/types/portalOperation';

/** Cartão resumido de operação recente (Home). */
interface RecentOperationCardProps {
  op: PortalOperation;
  onOpen: (op: PortalOperation) => void;
}

export const RecentOperationCard: React.FC<RecentOperationCardProps> = ({ op, onOpen }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    onClick={() => onOpen(op)}
    className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        op.status === 'Finalizado' ? 'bg-green-50 text-green-600' : 
        op.status === 'Rejeitado' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-agro-orange'
      }`}>
        <FileText size={20} />
      </div>
      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border ${
         op.status === 'Rejeitado' ? 'border-red-100 text-red-500' :
         op.status === 'Finalizado' ? 'border-green-100 text-green-600' :
         'border-orange-100 text-agro-orange'
      }`}>
        {op.status}
      </span>
    </div>
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">#{op.id}</p>
    <h4 className="font-black text-gci text-sm mb-4 line-clamp-1">{op.title}</h4>
    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
      <span className="text-sm font-black text-gci">{op.value}</span>
      <span className="text-[10px] items-center gap-1 text-gray-400 font-bold flex">
        <Calendar size={12} />
        {op.date}
      </span>
    </div>
  </motion.div>
);
