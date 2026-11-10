import React from 'react';
import { motion } from 'motion/react';

interface CarteiraStatCardProps {
  label: string;
  value: string;
  valueClassName: string;
  /** Atraso (s) da animação de entrada; sem valor = sem `transition` (como o primeiro cartão original). */
  delay?: number;
  footer?: React.ReactNode;
}

/** Cartão de indicador da carteira (rótulo, valor e rodapé opcional). */
export const CarteiraStatCard = ({ label, value, valueClassName, delay, footer }: CarteiraStatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    {...(delay !== undefined ? { transition: { delay } } : {})}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
  >
    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{label}</p>
    <h3 className={valueClassName}>{value}</h3>
    {footer && (
      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-50 w-fit px-2 py-1 rounded-lg">
        {footer}
      </div>
    )}
  </motion.div>
);
