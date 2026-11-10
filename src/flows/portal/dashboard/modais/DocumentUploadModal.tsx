import { AnimatePresence } from 'motion/react';
import { Upload } from 'lucide-react';
import { ModalFrame } from '@/components/ui/ModalFrame';
import { ModalTitleBar } from '@/components/ui/ModalTitleBar';
import { DOCUMENT_CENTER_ITEMS } from '@/constants/documentCenter';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentUploadModal = ({ isOpen, onClose }: DocumentUploadModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <ModalFrame
        overlayClassName="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gci/40 backdrop-blur-md"
        panelClassName="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <ModalTitleBar
          title="Central de Documentos"
          subtitle="Upload de arquivos para análise de crédito"
          onClose={onClose}
          className="p-8 md:p-10 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10"
          subtitleClassName="text-sm text-gray-500 font-medium mt-1"
          closeButtonClassName="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gci hover:bg-gray-100 transition-colors"
        />

        <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="space-y-8">
            {DOCUMENT_CENTER_ITEMS.map((docLabel) => (
              <div key={docLabel} className="space-y-3">
                <label className="text-[10px] font-black text-gci ml-1 uppercase tracking-[0.2em]">{docLabel}</label>
                <div className="border-2 border-dashed border-gray-200 rounded-[24px] p-8 flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-white hover:border-gci/30 hover:shadow-xl transition-all cursor-pointer group">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-gci group-hover:scale-110 transition-all shadow-sm">
                    <Upload size={28} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-black text-gci">Arraste ou clique para selecionar</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">PDF, JPG ou PNG (Máx 10MB)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-10 border-t border-gray-100 bg-gray-50">
          <button 
            onClick={onClose}
            className="w-full bg-gci hover:bg-gci-hover text-white py-5 rounded-[20px] font-bold text-base transition-all shadow-xl shadow-gci/20 active:scale-[0.98]"
          >
            Finalizar e Enviar
          </button>
        </div>
      </ModalFrame>
    )}
  </AnimatePresence>
);
