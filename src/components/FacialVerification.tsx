import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  QrCode, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Camera, 
  Send,
  Sparkles,
  Info
} from 'lucide-react';

interface FacialVerificationProps {
  isVerified: boolean;
  onVerified: () => void;
}

export const FacialVerification: React.FC<FacialVerificationProps> = ({
  isVerified,
  onVerified
}) => {
  const [copied, setCopied] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [sessionCode] = useState(() => `gci-bio-${Math.floor(100000 + Math.random() * 900000)}`);

  const verificationUrl = `https://validacao.ceresinvestimentos.com.br/biometria/${sessionCode}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendSms = () => {
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 4000);
  };

  const handleSimulateScan = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      onVerified();
    }, 1200);
  };

  if (isVerified) {
    return (
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-emerald-950">Biometria Facial Validada com Sucesso</h4>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Prova de Vida Aprovada
                </span>
              </div>
              <p className="text-xs text-emerald-800 mt-0.5">
                Reconhecimento facial do sócio administrador autenticado e auditado digitalmente.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-emerald-200/60 text-emerald-900">
          <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
            <span className="text-[10px] text-emerald-700 block uppercase font-bold">Identificador</span>
            <span className="font-mono font-semibold text-slate-800 text-[11px]">BIO-7849-OK</span>
          </div>
          <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
            <span className="text-[10px] text-emerald-700 block uppercase font-bold">Liveness Score</span>
            <span className="font-semibold text-emerald-700 text-[11px]">99.8% (Excelente)</span>
          </div>
          <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
            <span className="text-[10px] text-emerald-700 block uppercase font-bold">Status de Auditoria</span>
            <span className="font-semibold text-emerald-700 text-[11px]">Auditado em conformidade ICP-Brasil</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row items-stretch gap-6">
        {/* Left: Interactive QR Code Box */}
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-slate-200 shadow-sm shrink-0 w-full md:w-64 text-center">
          <div className="relative p-3 bg-slate-50 rounded-xl border border-slate-200 group">
            {/* Styled Crisp Vector QR Code */}
            <svg
              viewBox="0 0 160 160"
              className="w-40 h-40 text-[#083C4A]"
              fill="currentColor"
            >
              {/* Outer boundary & corners */}
              {/* Top-Left Finder */}
              <rect x="10" y="10" width="40" height="40" rx="6" fill="#083C4A" />
              <rect x="18" y="18" width="24" height="24" rx="3" fill="#ffffff" />
              <rect x="24" y="24" width="12" height="12" rx="2" fill="#083C4A" />

              {/* Top-Right Finder */}
              <rect x="110" y="10" width="40" height="40" rx="6" fill="#083C4A" />
              <rect x="118" y="18" width="24" height="24" rx="3" fill="#ffffff" />
              <rect x="124" y="24" width="12" height="12" rx="2" fill="#083C4A" />

              {/* Bottom-Left Finder */}
              <rect x="10" y="110" width="40" height="40" rx="6" fill="#083C4A" />
              <rect x="18" y="118" width="24" height="24" rx="3" fill="#ffffff" />
              <rect x="24" y="124" width="12" height="12" rx="2" fill="#083C4A" />

              {/* Decorative Authentic Data Dots Matrix */}
              {/* Central brand dot */}
              <rect x="68" y="68" width="24" height="24" rx="4" fill="#F27D26" />
              <rect x="74" y="74" width="12" height="12" rx="2" fill="#ffffff" />

              {/* Data pattern squares */}
              <rect x="60" y="15" width="8" height="8" rx="1.5" />
              <rect x="80" y="15" width="8" height="8" rx="1.5" />
              <rect x="70" y="30" width="8" height="8" rx="1.5" />
              <rect x="90" y="30" width="8" height="8" rx="1.5" />
              <rect x="60" y="45" width="8" height="8" rx="1.5" />
              
              <rect x="15" y="60" width="8" height="8" rx="1.5" />
              <rect x="30" y="70" width="8" height="8" rx="1.5" />
              <rect x="45" y="60" width="8" height="8" rx="1.5" />
              <rect x="15" y="90" width="8" height="8" rx="1.5" />
              <rect x="35" y="90" width="8" height="8" rx="1.5" />

              <rect x="110" y="60" width="8" height="8" rx="1.5" />
              <rect x="130" y="60" width="8" height="8" rx="1.5" />
              <rect x="140" y="75" width="8" height="8" rx="1.5" />
              <rect x="105" y="85" width="8" height="8" rx="1.5" />
              <rect x="125" y="90" width="8" height="8" rx="1.5" />
              <rect x="140" y="100" width="8" height="8" rx="1.5" />

              <rect x="60" y="105" width="8" height="8" rx="1.5" />
              <rect x="80" y="105" width="8" height="8" rx="1.5" />
              <rect x="95" y="115" width="8" height="8" rx="1.5" />
              <rect x="65" y="130" width="8" height="8" rx="1.5" />
              <rect x="85" y="135" width="8" height="8" rx="1.5" />
              <rect x="105" y="130" width="8" height="8" rx="1.5" />
              <rect x="135" y="135" width="8" height="8" rx="1.5" />
            </svg>

            {/* Scanning line animation */}
            <div className="absolute inset-x-3 top-3 bottom-3 overflow-hidden pointer-events-none rounded-lg">
              <motion.div
                animate={{ y: [0, 140, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#F27D26] to-transparent shadow-[0_0_8px_rgba(242,125,38,0.8)]"
              />
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <span className="text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1.5">
              <Camera size={13} className="text-gci" /> Escaneie com seu celular
            </span>
            <p className="text-[10px] text-slate-400">
              Sessão segura criptografada
            </p>
          </div>
        </div>

        {/* Right: Instructions & Actions */}
        <div className="flex-1 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck size={16} className="text-gci" />
                Como funciona a verificação facial:
              </h4>
              <ol className="text-xs text-slate-600 space-y-2 pl-4 list-decimal">
                <li>
                  <span className="font-medium text-slate-800">Abra a câmera do smartphone</span> e aponte para o QR Code ao lado.
                </li>
                <li>
                  <span className="font-medium text-slate-800">Posicione seu rosto</span> na moldura circular em ambiente bem iluminado.
                </li>
                <li>
                  <span className="font-medium text-slate-800">Faça a prova de vida</span> (piscar os olhos ou sorrir) em poucos segundos.
                </li>
              </ol>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-slate-400" />}
                {copied ? 'Link copiado!' : 'Copiar link para celular'}
              </button>

              <button
                type="button"
                onClick={handleSendSms}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                {smsSent ? <Check size={14} className="text-emerald-600" /> : <Send size={14} className="text-slate-400" />}
                {smsSent ? 'SMS enviado!' : 'Enviar link por SMS'}
              </button>
            </div>
          </div>

          {/* Quick Simulation Button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Info size={13} />
              <span>Conclusão em tempo real após captura</span>
            </div>

            <button
              type="button"
              onClick={handleSimulateScan}
              disabled={isSimulating}
              className="px-4 py-2 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  Processando biometria...
                </>
              ) : (
                <>
                  <Sparkles size={13} className="text-agro-orange" />
                  Simular Validação Facial
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
