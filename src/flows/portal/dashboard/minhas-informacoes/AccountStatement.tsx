import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react';
import { ACCOUNT_TRANSACTIONS } from '@/mocks/dashboardChart';

/** Extrato de operação (estado vazio quando não há movimentações). */
export const AccountStatement = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 }}
    className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col"
  >
    <div className="flex items-center justify-between mb-8">
      <h3 className="text-lg font-black text-gci">Extrato de Operação</h3>
      <button className="text-[10px] font-black text-agro-orange uppercase tracking-widest hover:underline">Ver Tudo</button>
    </div>
    <div className="space-y-8 flex-1">
      {ACCOUNT_TRANSACTIONS.length > 0 ? (
        ACCOUNT_TRANSACTIONS.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                tx.type === 'in' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {tx.type === 'in' ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
              </div>
              <div>
                <p className="font-black text-sm text-gci">{tx.name}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{tx.date}</p>
              </div>
            </div>
            <span className={`font-black text-sm ${
              tx.type === 'in' ? 'text-green-600' : 'text-gci'
            }`}>
              {tx.amount}
            </span>
          </div>
        ))
      ) : (
        <div className="text-center py-12 text-slate-400">
          <FileText size={28} className="mx-auto mb-2 text-slate-300" />
          <p className="text-xs font-semibold text-slate-600">Nenhuma movimentação</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Seu extrato de operações aparecerá aqui.</p>
        </div>
      )}
    </div>
  </motion.div>
);
