import React from 'react';
import { motion } from 'motion/react';
import { X, HelpCircle, PhoneCall, BookOpen } from 'lucide-react';
import type { SupportTab } from '@/types/faq';
import { useSupportFaqModal } from './useSupportFaqModal';
import { FaqPanel } from './FaqPanel';
import { CallbackRequestPanel } from './CallbackRequestPanel';

interface SupportFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: SupportTab;
}

export const SupportFaqModal: React.FC<SupportFaqModalProps> = ({
  isOpen,
  onClose,
  initialTab
}) => {
  const {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    expandedId,
    setExpandedId,
    callbackRequested,
    setCallbackRequested,
    phone,
    setPhone,
    notes,
    setNotes,
    filteredFaqs,
  } = useSupportFaqModal(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[88vh] border border-slate-200"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gci/5 text-gci flex items-center justify-center">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Ajuda e Suporte</h3>
              <p className="text-xs text-slate-500">Tire dúvidas sobre a documentação ou fale com um analista</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-6 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'faq'
                ? 'border-gci text-gci'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <BookOpen size={14} />
            Perguntas Frequentes (FAQ)
          </button>
          <button
            onClick={() => setActiveTab('ligacao')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'ligacao'
                ? 'border-gci text-gci'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <PhoneCall size={14} />
            Solicitar Ligação
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {activeTab === 'faq' ? (
            <FaqPanel
              search={search}
              onSearchChange={setSearch}
              faqs={filteredFaqs}
              expandedId={expandedId}
              onToggle={(id) => setExpandedId(expandedId === id ? null : id)}
            />
          ) : (
            <CallbackRequestPanel
              callbackRequested={callbackRequested}
              phone={phone}
              notes={notes}
              onPhoneChange={setPhone}
              onNotesChange={setNotes}
              onRequest={() => setCallbackRequested(true)}
              onReset={() => setCallbackRequested(false)}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};
