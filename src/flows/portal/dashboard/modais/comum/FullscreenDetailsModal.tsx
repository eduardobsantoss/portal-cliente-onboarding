import React from 'react';
import { X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface FullscreenDetailsModalProps {
  title: React.ReactNode;
  description: string;
  sidebar: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}

/** Casca de tela cheia dos detalhes (operação/título): painel de marca à esquerda e conteúdo à direita. */
export const FullscreenDetailsModal = ({ title, description, sidebar, onClose, children }: FullscreenDetailsModalProps) => (
  <div className="fixed inset-0 z-[100] bg-white overflow-hidden flex flex-col lg:flex-row h-[100dvh]">
    {/* Left Side: Info & Branding */}
    <div className="hidden lg:flex lg:w-[380px] bg-gci flex-col p-10 text-white relative overflow-hidden shrink-0">
      <div className="relative z-10">
        <Logo variant="dark" className="mb-10 scale-90 origin-left" />
        <h2 className="text-3xl font-extrabold leading-tight mb-5">{title}</h2>
        <p className="text-white/70 text-base leading-relaxed mb-10">{description}</p>

        <div className="space-y-6">{sidebar}</div>
      </div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-agro-orange/10 rounded-full blur-3xl" />
    </div>

    {/* Right Side: Content */}
    <div className="flex-1 flex flex-col bg-white relative h-full overflow-hidden">
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30">
        <button
          onClick={() => onClose()}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gci transition-all shadow-sm"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-12 md:pt-20">{children}</div>
      </div>

      <div className="px-6 md:px-12 lg:px-16 py-8 border-t border-gray-100 bg-white">
        <div className="max-w-[1400px] mx-auto flex justify-end">
          <button
            onClick={() => onClose()}
            className="bg-gci text-white px-12 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl shadow-gci/20 active:scale-95 hover:bg-gci-hover"
          >
            Fechar Detalhes
          </button>
        </div>
      </div>
    </div>
  </div>
);
