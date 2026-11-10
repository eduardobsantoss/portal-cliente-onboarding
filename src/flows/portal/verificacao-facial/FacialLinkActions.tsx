import React from 'react';
import { Copy, Check, Send } from 'lucide-react';

interface FacialLinkActionsProps {
  copied: boolean;
  smsSent: boolean;
  onCopyLink: () => void;
  onSendSms: () => void;
}

export const FacialLinkActions: React.FC<FacialLinkActionsProps> = ({
  copied,
  smsSent,
  onCopyLink,
  onSendSms,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onCopyLink}
        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
      >
        {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-slate-400" />}
        {copied ? 'Link copiado!' : 'Copiar link para celular'}
      </button>

      <button
        type="button"
        onClick={onSendSms}
        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
      >
        {smsSent ? <Check size={14} className="text-emerald-600" /> : <Send size={14} className="text-slate-400" />}
        {smsSent ? 'SMS enviado!' : 'Enviar link por SMS'}
      </button>
    </div>
  );
};
