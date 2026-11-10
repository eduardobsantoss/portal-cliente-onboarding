import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { SmsOtpInputs } from './SmsOtpInputs';

interface SmsOtpPanelProps {
  maskedPhone: string;
  digits: string[];
  errorMsg: string | null;
  cooldown: number;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  onDigitChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onResend: () => void;
  onValidate: (code: string) => void;
}

export const SmsOtpPanel: React.FC<SmsOtpPanelProps> = ({
  maskedPhone,
  digits,
  errorMsg,
  cooldown,
  inputRefs,
  onDigitChange,
  onKeyDown,
  onPaste,
  onResend,
  onValidate,
}) => {
  return (
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
      <SmsOtpInputs
        digits={digits}
        inputRefs={inputRefs}
        onDigitChange={onDigitChange}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
      />

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
          onClick={onResend}
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
          onClick={() => onValidate(digits.join(''))}
          disabled={digits.join('').length < 6}
          className="w-full sm:w-auto px-7 py-3 bg-gci hover:bg-gci-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
        >
          Confirmar Código
        </button>
      </div>
    </motion.div>
  );
};
