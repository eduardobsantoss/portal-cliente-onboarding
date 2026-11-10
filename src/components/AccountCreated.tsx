import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  Building2, 
  CreditCard, 
  Sparkles, 
  ShieldCheck, 
  QrCode,
  Landmark,
  Smartphone,
  Download
} from 'lucide-react';
import { Logo } from './Logo';

interface AccountCreatedProps {
  onContinueToCompleteRegistration: () => void;
}

const AppleLogo = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.96-14.42-5.78-8.91-10.36-19.16-13.73-30.76-3.38-11.59-5.07-22.37-5.07-32.32 0-14.92 3.63-27.18 10.89-36.78 7.26-9.6 16.37-14.51 27.34-14.73 4.89 0 10.22 1.25 15.99 3.76 5.77 2.5 9.77 3.87 12.01 4.09 1.96-.22 6.13-1.63 12.52-4.23 6.38-2.6 11.93-3.79 16.63-3.56 12.83.65 23.01 5.34 30.54 14.07-11.09 6.74-16.52 16.19-16.29 28.36.22 9.57 3.92 17.61 11.09 24.13 7.18 6.52 15.76 10.22 25.76 11.09-2.18 6.53-4.9 13.04-8.15 19.53zM119.22 33.15c0-7.39 2.61-14.35 7.82-20.87 5.22-6.52 11.74-10.98 19.57-13.37.22 1.09.33 2.17.33 3.26 0 7.39-2.61 14.46-7.83 21.19-5.22 6.74-11.74 11.2-19.56 13.37-.11-1.08-.33-2.28-.33-3.58z" />
  </svg>
);

const GooglePlayLogo = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 512 512">
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 59.9.0.2zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
  </svg>
);

export const AccountCreated: React.FC<AccountCreatedProps> = ({
  onContinueToCompleteRegistration,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  const accountInfo = {
    institution: 'Grupo Ceres Investimentos',
    institutionCode: '000',
    agency: '0001',
    accountNumber: '482910-4',
    accountType: 'Conta Corrente Empresarial (PJ)',
    companyName: 'AGRO INDUSTRIAL SOJA & MILHO LTDA',
    cnpj: '12.345.678/0001-90',
  };

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Logo variant="dark" className="h-10 md:h-12 w-auto" />
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Portal do Cliente • Conta Ativa
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl w-full mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          {/* Header Banner - Celebratory */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10">
              <Landmark size={26} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-4">
              Sua Conta Digital GCI está aberta!
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed">
              Parabéns! Sua conta corrente empresarial junto ao Grupo Ceres Investimentos foi criada com sucesso e já está pronta para uso.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Bank Card / Account Pass */}
            <div className="bg-gradient-to-br from-slate-900 to-[#083C4A] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-slate-800">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-agro-orange/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-agro-orange/20 text-agro-orange flex items-center justify-center font-bold text-xs">
                    GCI
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white tracking-wide">
                      {accountInfo.institution}
                    </p>
                    <p className="text-[10px] text-white/60 font-medium">
                      {accountInfo.accountType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Agência</span>
                  <p className="text-sm font-bold text-white font-mono mt-0.5">{accountInfo.agency}</p>
                </div>

                <div>
                  <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Conta Corrente</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-sm font-bold text-white font-mono">{accountInfo.accountNumber}</p>
                    <button
                      type="button"
                      onClick={() => handleCopy('account', accountInfo.accountNumber)}
                      className="text-white/60 hover:text-white transition-colors"
                      title="Copiar conta"
                    >
                      {copiedField === 'account' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="col-span-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Titular / Razão Social</span>
                  <p className="text-xs font-bold text-white uppercase tracking-tight mt-0.5">{accountInfo.companyName}</p>
                  <p className="text-[11px] text-white/60 font-medium mt-0.5">CNPJ: {accountInfo.cnpj}</p>
                </div>
              </div>
            </div>

            {/* Download App Ceres Agrofinance - Muted & Discreet */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 shadow-sm">
                    <Smartphone size={20} className="text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">
                      App Ceres Agrofinance
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                      Acompanhe saldos, aprove transações e antecipe duplicatas pelo smartphone.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAppModalOpen(true)}
                  className="w-full sm:w-auto px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0 active:scale-95"
                >
                  <Download size={14} className="text-slate-500" />
                  <span>Baixar app Ceres Agrofinance</span>
                </button>
              </div>
            </div>

            {/* Next step notice box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5">
              <ShieldCheck size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 space-y-1 leading-relaxed">
                <p className="font-bold text-slate-900">
                  Próximo passo: Complete o seu cadastro
                </p>
                <p className="text-slate-600">
                  Sua conta já foi aberta. Para liberar a movimentação na sua conta, complete as etapas cadastrais e documentais.
                </p>
              </div>
            </div>

            {/* Unique CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onContinueToCompleteRegistration}
                className="w-full py-4 bg-gci hover:bg-gci-hover text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-gci/15 flex items-center justify-center gap-2 active:scale-95 group"
              >
                Continuar para completar meu cadastro
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Modal Baixar App Ceres Agrofinance */}
      {isAppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-200 relative text-center"
          >
            <button
              type="button"
              onClick={() => setIsAppModalOpen(false)}
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
              <button
                type="button"
                onClick={() => {
                  setDownloadFeedback('Iniciando redirecionamento para a App Store...');
                  setTimeout(() => setDownloadFeedback(null), 3500);
                }}
                className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
              >
                <AppleLogo />
                <div className="text-left">
                  <span className="text-[9px] block text-white/60 font-normal leading-tight">Disponível na</span>
                  <span className="text-xs font-bold leading-tight">App Store</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDownloadFeedback('Iniciando redirecionamento para o Google Play...');
                  setTimeout(() => setDownloadFeedback(null), 3500);
                }}
                className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
              >
                <GooglePlayLogo />
                <div className="text-left">
                  <span className="text-[9px] block text-white/60 font-normal leading-tight">Disponível no</span>
                  <span className="text-xs font-bold leading-tight">Google Play</span>
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsAppModalOpen(false)}
              className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Fechar
            </button>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto pt-6 text-center text-xs text-slate-400">
        © 2026 Grupo Ceres Investimentos. Todos os direitos reservados.
      </footer>
    </div>
  );
};
