import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  RotateCw, 
  Send,
  HelpCircle,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { SupportFaqModal } from './SupportFaqModal';

interface SmsVerificationProps {
  onVerified?: (phone: string) => void;
  isVerified?: boolean;
  maskedPhone?: string;
  verifiedAt?: string;
  isModalVariant?: boolean;
  onCloseModal?: () => void;
}

export const SmsVerification: React.FC<SmsVerificationProps> = ({ 
  onVerified, 
  isVerified = false,
  maskedPhone = '(34) 9 ••••-1234',
  verifiedAt = '10/05/2026 às 14:32',
  isModalVariant = false,
  onCloseModal
}) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'verified'>(
    isVerified ? 'verified' : 'idle'
  );
  
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState<number>(0);
  const [showSimulatedSmsToast, setShowSimulatedSmsToast] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [currentVerifiedAt, setCurrentVerifiedAt] = useState<string>(verifiedAt);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update status if prop changes
  useEffect(() => {
    if (isVerified) {
      setStatus('verified');
    }
  }, [isVerified]);

  // Timer cooldown (60 seconds)
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Trigger SMS sending
  const handleSendSms = () => {
    setStatus('sending');
    setErrorMsg(null);
    setDigits(['', '', '', '', '', '']);

    setTimeout(() => {
      setStatus('sent');
      setCooldown(60);
      setShowSimulatedSmsToast(true);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);

      setTimeout(() => {
        setShowSimulatedSmsToast(false);
      }, 12000);
    }, 500);
  };

  // Handle digit input with auto-advance
  const handleDigitChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    
    if (!cleanValue) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    const digit = cleanValue.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    setErrorMsg(null);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = newDigits.join('');
    if (fullCode.length === 6) {
      validateCode(fullCode);
    }
  };

  // Handle key down (Backspace)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste full 6-digit code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length > 0) {
      const newDigits = ['', '', '', '', '', ''];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pastedData[i] || '';
      }
      setDigits(newDigits);
      
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();

      if (pastedData.length === 6) {
        validateCode(pastedData);
      }
    }
  };

  // Validate Code: 123456 is valid
  const validateCode = (inputCode: string) => {
    if (inputCode === '123456') {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
      setCurrentVerifiedAt(formattedDate);
      setStatus('verified');
      setErrorMsg(null);
      setShowSimulatedSmsToast(false);
      onVerified?.(maskedPhone);
      if (isModalVariant && onCloseModal) {
        setTimeout(() => {
          onCloseModal();
        }, 1200);
      }
    } else {
      setErrorMsg('Código inválido. Digite 123456 ou solicite novo envio.');
    }
  };

  const handleRefazerValidacao = () => {
    setStatus('idle');
    setDigits(['', '', '', '', '', '']);
    setErrorMsg(null);
    setCooldown(0);
    handleSendSms();
  };

  return (
    <div className="w-full">
      {/* Toast Simulated SMS */}
      <AnimatePresence>
        {showSimulatedSmsToast && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            className="mb-4 p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-700 shadow-xl flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-agro-orange shrink-0">
                <Smartphone size={16} />
              </div>
              <div>
                <p className="font-bold text-slate-200">SMS recebido em {maskedPhone}:</p>
                <p className="text-slate-400 text-[11px]">
                  Seu código de confirmação GCI é: <strong className="font-mono text-agro-orange text-xs tracking-widest">123456</strong>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const codeArr = ['1', '2', '3', '4', '5', '6'];
                setDigits(codeArr);
                validateCode('123456');
              }}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[11px] font-bold rounded-xl text-white transition-colors shrink-0"
            >
              Preencher Código
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATE 1: VERIFIED / CONCLUÍDO (Used in Checklist or after verification) */}
      {status === 'verified' && !isModalVariant ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-emerald-50/70 border border-emerald-200/90 rounded-2xl">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-bold text-slate-900">Telefone validado com sucesso</h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full shrink-0">
                  Concluído
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 flex items-center gap-2 flex-wrap">
                <span>Número: <strong className="text-slate-800 font-mono">{maskedPhone}</strong></span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span>Confirmado em: <strong className="font-semibold text-slate-700">{currentVerifiedAt}</strong></span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefazerValidacao}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 self-start sm:self-center shrink-0 whitespace-nowrap active:scale-95"
          >
            <RotateCcw size={14} className="text-slate-500" />
            <span>Refazer validação</span>
          </button>
        </div>
      ) : (
        /* STATE 2: INTERACTIVE SMS SEND & OTP DIGITS */
        <div className="space-y-4">
          {/* Header Card with Masked Phone */}
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-gci shrink-0 shadow-sm">
                  <Smartphone size={20} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Celular Cadastrado
                  </span>
                  <span className="text-base sm:text-lg font-bold text-slate-900 font-mono tracking-wider">
                    {maskedPhone}
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="flex items-center gap-3 shrink-0">
                {status === 'idle' && (
                  <button
                    type="button"
                    onClick={handleSendSms}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-gci/10 flex items-center justify-center gap-2 active:scale-95 shrink-0 whitespace-nowrap cursor-pointer"
                  >
                    <Send size={14} />
                    <span>Enviar código por SMS</span>
                  </button>
                )}

                {status === 'sending' && (
                  <button
                    type="button"
                    disabled
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-200 text-slate-500 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed shrink-0 whitespace-nowrap"
                  >
                    <RotateCw size={14} className="animate-spin" />
                    <span>Enviando código...</span>
                  </button>
                )}

                {status === 'sent' && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    <span>Código enviado</span>
                  </span>
                )}
              </div>
            </div>

            {/* Separator with Support link and Test helper */}
            <div className="pt-2.5 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsSupportOpen(true)}
                className="text-[11px] font-medium text-slate-500 hover:text-gci underline transition-colors self-start sm:self-auto"
              >
                Não é o seu número? Fale com o suporte
              </button>

              <span className="text-[11px] text-slate-400 self-start sm:self-auto">
                Código para teste: <strong className="font-mono text-slate-600 font-bold">123456</strong>
              </span>
            </div>
          </div>

          {/* OTP 6 Digits Container */}
          {(status === 'sent' || status === 'sending') && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl space-y-5 shadow-sm text-center"
            >
              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  Digite o código de 6 dígitos enviado por SMS
                </h4>
                <p className="text-xs text-slate-500">
                  Enviamos o código para <span className="font-bold text-slate-700 font-mono">{maskedPhone}</span>
                </p>
              </div>

              {/* 6 Inputs */}
              <div className="flex items-center justify-center gap-2 sm:gap-3.5 py-2">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digits[idx]}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    className={`w-12 sm:w-14 h-14 sm:h-16 text-center text-xl sm:text-2xl font-mono font-bold rounded-xl border-2 transition-all focus:outline-none ${
                      digits[idx] 
                        ? 'border-gci bg-emerald-50/30 text-gci' 
                        : 'border-slate-200 bg-white text-slate-800 focus:border-gci focus:ring-4 focus:ring-gci/10'
                    }`}
                  />
                ))}
              </div>

              {/* Error Message */}
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-1.5 text-xs text-rose-600 font-bold"
                >
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </motion.div>
              )}

              {/* Cooldown & Resend Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                <button
                  type="button"
                  disabled={cooldown > 0}
                  onClick={handleSendSms}
                  className={`font-semibold transition-colors ${
                    cooldown > 0 
                      ? 'text-slate-400 cursor-not-allowed' 
                      : 'text-gci hover:underline'
                  }`}
                >
                  {cooldown > 0 ? `Reenviar código em ${cooldown}s` : 'Reenviar código'}
                </button>

                <button
                  type="button"
                  onClick={() => validateCode(digits.join(''))}
                  disabled={digits.join('').length < 6}
                  className="w-full sm:w-auto px-7 py-3 bg-gci hover:bg-gci-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  Confirmar Código
                </button>
              </div>
            </motion.div>
          )}

          {/* Success message when verified in modal variant */}
          {status === 'verified' && isModalVariant && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-sm font-bold text-emerald-950">Celular confirmado com sucesso!</h4>
              <p className="text-xs text-emerald-800">
                A validação foi atualizada no seu checklist cadastral.
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Support FAQ Modal */}
      <SupportFaqModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
};
