import { AnimatePresence } from 'motion/react';
import { FileText, ShieldCheck } from 'lucide-react';
import { ModalActionFooter } from '@/components/ui/ModalActionFooter';
import { ModalFrame } from '@/components/ui/ModalFrame';
import { ModalTitleBar } from '@/components/ui/ModalTitleBar';
import { NoticeCard } from './comum/NoticeCard';
import { UploadDropzone } from './comum/UploadDropzone';
import { UploadedFileRow } from './comum/UploadedFileRow';

interface AddXmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddXmlModal = ({ isOpen, onClose }: AddXmlModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <ModalFrame
        overlayClassName="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
        panelClassName="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <ModalTitleBar
          title="Adicionar XMLs"
          subtitle="Extração de Ativos (Duplicatas)"
          onClose={onClose}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="space-y-8">
            <UploadDropzone
              title="Arraste ou clique para enviar duplicatas"
              hint="Você pode selecionar múltiplos arquivos (XML, PDF)"
              className="border border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 bg-slate-50/50 hover:bg-white hover:border-gci/30 transition-all cursor-pointer group shadow-sm"
              iconBoxClassName="w-20 h-20 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-gci group-hover:scale-110 transition-all shadow-md"
            />

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Arquivos selecionados</h4>
              <UploadedFileRow
                icon={<FileText size={24} />}
                name="NFE_VENC_MAIO_001.xml"
                details="1.2 MB • Pendente Validação"
                className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center justify-between group hover:border-gci/20 transition-all"
                iconBoxClassName="w-12 h-12 rounded-xl bg-gci/5 flex items-center justify-center text-gci"
              />
            </div>

            <NoticeCard
              icon={<ShieldCheck size={20} />}
              title="Validação Segura"
              text="Seus arquivos passarão por uma triagem automática de integridade e lastro antes de serem vinculados à operação."
              className="bg-agro-orange/5 border border-agro-orange/10 rounded-2xl p-5 flex items-start gap-4"
              iconBoxClassName="w-10 h-10 rounded-xl bg-agro-orange text-white flex items-center justify-center shrink-0"
              titleClassName="text-xs font-black text-gci uppercase tracking-widest mb-1"
              textClassName="text-[11px] text-slate-500 leading-relaxed font-medium"
            />
          </div>
        </div>

        <ModalActionFooter
          cancelLabel="Cancelar"
          onCancel={onClose}
          confirmLabel="Confirmar e Enviar para Validação"
          onConfirm={onClose}
          confirmClassName="flex-3 bg-gci hover:bg-gci-hover text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-gci/20 shadow-gci/20 active:scale-[0.98]"
        />
      </ModalFrame>
    )}
  </AnimatePresence>
);
