import { X } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { ModalFrame } from '@/components/ui/ModalFrame';
import type { Titulo } from '@/types/titulo';
import { ResolveExplanation } from './ResolveExplanation';
import { ResolveTitlesPanel } from './ResolveTitlesPanel';

interface ResolveScreenModalProps {
  isOpen: boolean;
  hasSeenExplanation: boolean;
  titulosList: Titulo[];
  onClose: () => void;
  onContinue: () => void;
  onUploadCanhoto: (titulo: Titulo) => void;
  onSendLink: (titulo: Titulo) => void;
  onFinish: () => void;
}

/** Tela "Resolução de Pendências": explicação das ações e lista de títulos a regularizar. */
export const ResolveScreenModal = ({
  isOpen,
  hasSeenExplanation,
  titulosList,
  onClose,
  onContinue,
  onUploadCanhoto,
  onSendLink,
  onFinish,
}: ResolveScreenModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <ModalFrame
        overlayClassName="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
        panelClassName="bg-[#F8F9FA] rounded-[40px] shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[90vh]"
      >
      <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-gci tracking-tighter uppercase italic">Resolução de Pendências</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Regularize seus títulos para liberar novas operações</p>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-gci hover:bg-slate-100 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {!hasSeenExplanation ? (
            <ResolveExplanation onContinue={onContinue} />
          ) : (
            <ResolveTitlesPanel
              titulosList={titulosList}
              onUploadCanhoto={onUploadCanhoto}
              onSendLink={onSendLink}
              onFinish={onFinish}
            />
          )}
        </div>
      </ModalFrame>
    )}
  </AnimatePresence>
);
