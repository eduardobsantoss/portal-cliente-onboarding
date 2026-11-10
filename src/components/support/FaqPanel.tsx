import React from 'react';
import { Search } from 'lucide-react';
import type { FaqItem } from '@/types/faq';
import { FaqAccordionItem } from './FaqAccordionItem';

interface FaqPanelProps {
  search: string;
  onSearchChange: (value: string) => void;
  faqs: FaqItem[];
  expandedId: string | null;
  onToggle: (id: string) => void;
}

export const FaqPanel: React.FC<FaqPanelProps> = ({ search, onSearchChange, faqs, expandedId, onToggle }) => {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Pesquisar dúvida (ex: Balanço, IRPF, Recibo, Junta)..."
          className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-gci transition-all"
        />
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-2.5 pt-1">
          {faqs.map((faq) => (
            <FaqAccordionItem
              key={faq.id}
              faq={faq}
              isExpanded={expandedId === faq.id}
              onToggle={() => onToggle(faq.id)}
            />
          ))}
        </div>
    </div>
  );
};
