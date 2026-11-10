import React from 'react';
import { Send, RotateCw, CheckCircle2 } from 'lucide-react';
import type { SmsStatus } from '@/types/sms';

interface SmsSendActionProps {
  status: SmsStatus;
  onSend: () => void;
}

export const SmsSendAction: React.FC<SmsSendActionProps> = ({ status, onSend }) => {
  return (
    <div className="flex items-center gap-3 shrink-0">
      {status === 'idle' && (
        <button
          type="button"
          onClick={onSend}
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
  );
};
