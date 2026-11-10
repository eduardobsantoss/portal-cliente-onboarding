import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface ChecklistTopicProps {
  icon: React.ReactNode;
  isDone: boolean;
  title: string;
  subtitle: string;
  /** Selo exibido à direita do cabeçalho (contador de documentos ou status). */
  badge: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  contentClassName: string;
  children: React.ReactNode;
}

/** Casca de um tópico do checklist: cabeçalho clicável (ícone, título, selo, chevron) + conteúdo expansível. */
export const ChecklistTopic: React.FC<ChecklistTopicProps> = ({
  icon,
  isDone,
  title,
  subtitle,
  badge,
  isOpen,
  onToggle,
  contentClassName,
  children,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all hover:border-slate-300">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
          }`}>
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {badge}
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-gci' : ''}`}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={contentClassName}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
