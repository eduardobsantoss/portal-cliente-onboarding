import { motion } from 'motion/react';
import { ArrowUpRight, CreditCard, TrendingUp, Wallet } from 'lucide-react';

/** Cartões de Limite Total, Risco e Disponível. */
export const GeralKpiGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gci/5 flex items-center justify-center text-gci">
          <Wallet size={20} />
        </div>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
          <ArrowUpRight size={12} /> 0%
        </span>
      </div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Limite Total</p>
      <h3 className="text-2xl font-bold text-gci">R$ 0,00</h3>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gci p-6 rounded-2xl shadow-lg shadow-gci/10 text-white relative overflow-hidden group"
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
          <CreditCard size={20} />
        </div>
      </div>
      <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider mb-1 relative z-10">Risco</p>
      <h3 className="text-2xl font-bold text-white relative z-10">R$ 0,00</h3>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group sm:col-span-2 lg:col-span-1"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-agro-orange/5 flex items-center justify-center text-agro-orange">
          <TrendingUp size={20} />
        </div>
      </div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Disponível</p>
      <h3 className="text-2xl font-bold text-gci">R$ 0,00</h3>
    </motion.div>
  </div>
);
