import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, QrCode, Check } from 'lucide-react';
import { AppleLogo } from './AppleLogo';
import { GooglePlayLogo } from './GooglePlayLogo';
import { StoreButton } from './StoreButton';

interface AppDownloadModalProps {
  downloadFeedback: string | null;
  onClose: () => void;
  onStoreClick: (feedback: string) => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  downloadFeedback,
  onClose,
  onStoreClick,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-200 relative text-center"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold text-lg"
        >
          ✕
        </button>

        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-gci border border-emerald-200 mx-auto flex items-center justify-center shadow-inner">
          <Smartphone size={32} className="text-agro-orange" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">
            Baixar app Ceres Agrofinance
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Escaneie o QR Code abaixo com a câmera do celular ou selecione a sua loja de aplicativos:
          </p>
        </div>

        {/* QR Code Demo Box */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl inline-flex flex-col items-center justify-center mx-auto">
          <div className="w-36 h-36 bg-white border border-slate-200 rounded-xl p-2 flex items-center justify-center shadow-sm">
            <QrCode size={120} className="text-slate-800" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 mt-2.5">
            Aponte a câmera do seu celular
          </span>
        </div>

        {/* Feedback notification */}
        {downloadFeedback && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
            <Check size={14} className="text-emerald-600" />
            <span>{downloadFeedback}</span>
          </div>
        )}

        {/* App Store / Google Play Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <StoreButton
          logo={<AppleLogo />}
          availability="Disponível na"
          storeName="App Store"
          onClick={() => onStoreClick('Iniciando redirecionamento para a App Store...')}
        />

        <StoreButton
          logo={<GooglePlayLogo />}
          availability="Disponível no"
          storeName="Google Play"
          onClick={() => onStoreClick('Iniciando redirecionamento para o Google Play...')}
        />
      </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
        >
          Fechar
        </button>
      </motion.div>
    </div>
  );
};
