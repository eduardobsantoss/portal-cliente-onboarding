import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/types/faq';

interface FaqAccordionItemProps {
  faq: FaqItem;
  isExpanded: boolean;
  onToggle: () => void;
}

export const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({ faq, isExpanded, onToggle }) => {
  return (
    <div
      className={`border rounded-xl transition-all ${
        isExpanded ? 'border-gci/30 bg-gci/[0.02]' : 'border-slate-200 bg-white'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full p-3.5 text-left flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
            {faq.category}
          </span>
          <span className="text-xs font-bold text-slate-800">{faq.question}</span>
        </div>
        <ChevronDown
          size={15}
          className={`text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180 text-gci' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-3.5 pb-3.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
