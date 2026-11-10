import { AnimatePresence } from 'motion/react';
import { Image, Info } from 'lucide-react';
import { ModalActionFooter } from '@/components/ui/ModalActionFooter';
import { ModalFrame } from '@/components/ui/ModalFrame';
import { ModalTitleBar } from '@/components/ui/ModalTitleBar';
import type { CanhotoFile, Titulo } from '@/types/titulo';
import { cn } from '@/utils/cn';
import { NoticeCard } from '@/flows/portal/dashboard/modais/comum/NoticeCard';
import { UploadDropzone } from '@/flows/portal/dashboard/modais/comum/UploadDropzone';
import { UploadedFileRow } from '@/flows/portal/dashboard/modais/comum/UploadedFileRow';
import { CanhotoUploadProgress } from './CanhotoUploadProgress';

interface CanhotoUploadModalProps {
  isOpen: boolean;
  titulo: Titulo | null;
  files: CanhotoFile[];
  isUploading: boolean;
  progress: number;
  onPickFile: () => void;
  onRemoveFile: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const CanhotoUploadModal = ({
  isOpen,
  titulo,
  files,
  isUploading,
  progress,
  onPickFile,
  onRemoveFile,
  onClose,
  onSubmit,
}: CanhotoUploadModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <ModalFrame
        overlayClassName="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
        panelClassName="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <ModalTitleBar
          title="Subir Canhoto"
          subtitle={<>{titulo?.titulo} • {titulo?.numero}</>}
          titleClassName="text-2xl font-black text-gci tracking-tight uppercase italic"
          subtitleClassName="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1"
          onClose={onClose}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="space-y-8">
            {isUploading ? (
              <CanhotoUploadProgress progress={progress} />
            ) : (
              <>
                <UploadDropzone
                  onClick={onPickFile}
                  title="Clique ou arraste o canhoto assinado"
                  hint="Formatos aceitos: JPG, PNG ou PDF"
                  className="border border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 bg-slate-50/50 hover:bg-white hover:border-agro-orange/30 transition-all cursor-pointer group shadow-sm"
                  iconBoxClassName="w-20 h-20 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-agro-orange group-hover:scale-110 transition-all shadow-md"
                />

                {files.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Arquivo selecionado</h4>
                    <UploadedFileRow
                      icon={<Image size={24} />}
                      name={files[0].name}
                      details={<>{files[0].size} • Pronto para envio</>}
                      className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center justify-between group hover:border-agro-orange/20 transition-all"
                      iconBoxClassName="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-agro-orange"
                      onRemove={onRemoveFile}
                    />
                  </div>
                )}

                <NoticeCard
                  icon={<Info size={20} />}
                  title="Como deve ser o canhoto?"
                  text="O documento deve conter a assinatura legível do recebedor, data da entrega e, preferencialmente, o carimbo da empresa sacada."
                  className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4"
                  iconBoxClassName="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20"
                  titleClassName="text-xs font-black text-blue-900 uppercase tracking-widest mb-1"
                  textClassName="text-[11px] text-blue-800/70 leading-relaxed font-medium"
                />
              </>
            )}
          </div>
        </div>

        {!isUploading && (
          <ModalActionFooter
            cancelLabel="Cancelar"
            onCancel={onClose}
            confirmLabel="Confirmar Envio do Canhoto"
            onConfirm={onSubmit}
            confirmDisabled={files.length === 0}
            confirmClassName={cn(
              'flex-[2] py-4 rounded-2xl font-bold text-sm transition-all shadow-xl active:scale-[0.98]',
              files.length > 0
                ? 'bg-gci hover:bg-gci-hover text-white shadow-gci/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            )}
          />
        )}
      </ModalFrame>
    )}
  </AnimatePresence>
);
