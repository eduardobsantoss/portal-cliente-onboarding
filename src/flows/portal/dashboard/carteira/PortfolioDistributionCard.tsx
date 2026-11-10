import { motion } from 'motion/react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PORTFOLIO_DISTRIBUTION } from '@/mocks/dashboardChart';

/** Gráfico de pizza "Distribuição da Carteira" com legenda. */
export const PortfolioDistributionCard = () => (
  <motion.div 
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col"
  >
    <h4 className="text-xs font-bold text-gci uppercase tracking-wider mb-6">Distribuição da Carteira</h4>
    <div className="flex-1 flex items-center justify-center min-h-[180px]">
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={PORTFOLIO_DISTRIBUTION}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {PORTFOLIO_DISTRIBUTION.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="grid grid-cols-2 gap-2 mt-4">
      {PORTFOLIO_DISTRIBUTION.map((item) => (
        <div key={item.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
          <span className="text-[10px] font-bold text-slate-500 truncate">{item.name}</span>
        </div>
      ))}
    </div>
  </motion.div>
);
