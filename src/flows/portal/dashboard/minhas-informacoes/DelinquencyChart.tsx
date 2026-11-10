import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DELINQUENCY_CHART_DATA } from '@/mocks/dashboardChart';

/** Gráfico "Evolução da Inadimplência". */
export const DelinquencyChart = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm"
  >
    <div className="flex items-center justify-between mb-8">
      <div>
        <h3 className="text-lg font-black text-gci">Evolução da Inadimplência</h3>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Valores a pagar / Pendentes</p>
      </div>
      <div className="flex gap-2">
        {['1M', '3M', '6M', '1Y'].map((period) => (
          <button key={period} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${period === '6M' ? 'bg-gci text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
            {period}
          </button>
        ))}
      </div>
    </div>
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DELINQUENCY_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
            tickFormatter={(value) => `R$ ${value / 1000}k`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
            itemStyle={{ fontSize: '12px', fontWeight: 800, color: '#083c4a' }}
            labelStyle={{ fontSize: '10px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}
            formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
          />
          <Bar 
            dataKey="value" 
            fill="#083c4a" 
            radius={[8, 8, 0, 0]} 
            barSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);
