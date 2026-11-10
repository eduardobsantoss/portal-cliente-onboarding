import { AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ModalFrame } from '@/components/ui/ModalFrame';
import { ModalTitleBar } from '@/components/ui/ModalTitleBar';
import type { SacadoContact, Titulo } from '@/types/titulo';
import { SacadoContactPicker } from './SacadoContactPicker';
import { ShareChannelPicker } from './ShareChannelPicker';

interface LinkSelectionModalProps {
  isOpen: boolean;
  titulo: Titulo | null;
  contacts: SacadoContact[];
  selectedChannels: string[];
  selectedSacados: string[];
  onToggleChannel: (channelId: string) => void;
  onToggleSacado: (contactId: string) => void;
  onToggleAllSacados: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const LinkSelectionModal = ({
  isOpen,
  titulo,
  contacts,
  selectedChannels,
  selectedSacados,
  onToggleChannel,
  onToggleSacado,
  onToggleAllSacados,
  onClose,
  onSubmit,
}: LinkSelectionModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <ModalFrame
        overlayClassName="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
        panelClassName="bg-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <ModalTitleBar
          title="Enviar Link de Confirmação"
          subtitle={<>Título {titulo?.numero}</>}
          className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 text-left"
          subtitleClassName="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1"
          onClose={onClose}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 text-left">
          <div className="space-y-8">
            {/* Canais de Envio */}
            <ShareChannelPicker selectedChannels={selectedChannels} onToggleChannel={onToggleChannel} />

            {/* Seleção de Destinatários */}
            <SacadoContactPicker
              sacado={titulo?.sacado}
              contacts={contacts}
              selectedSacados={selectedSacados}
              onToggleSacado={onToggleSacado}
              onToggleAll={onToggleAllSacados}
            />
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50">
          <button
            disabled={selectedSacados.length === 0 || selectedChannels.length === 0}
            onClick={onSubmit}
            className="w-full bg-gci hover:bg-gci-hover disabled:opacity-30 disabled:cursor-not-allowed text-white py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-gci/20 flex items-center justify-center gap-3"
          >
            Disparar Confirmação ({selectedSacados.length})
            <ArrowRight size={18} />
          </button>
        </div>
      </ModalFrame>
    )}
  </AnimatePresence>
);
