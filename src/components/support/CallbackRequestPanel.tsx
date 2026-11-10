import React from 'react';
import { Check } from 'lucide-react';

interface CallbackRequestPanelProps {
  callbackRequested: boolean;
  phone: string;
  notes: string;
  onPhoneChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onRequest: () => void;
  onReset: () => void;
}

export const CallbackRequestPanel: React.FC<CallbackRequestPanelProps> = ({
  callbackRequested,
  phone,
  notes,
  onPhoneChange,
  onNotesChange,
  onRequest,
  onReset,
}) => {
  return (
    <div>
      {callbackRequested ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Check size={24} strokeWidth={3} />
          </div>
          <h4 className="text-sm font-bold text-slate-800">Solicitação Registrada</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Um analista da nossa equipe de crédito entrará em contato pelo telefone <span className="font-semibold text-slate-700">{phone}</span> em até 30 minutos.
          </p>
          <button
            onClick={() => onReset()}
            className="mt-2 text-xs text-gci underline font-bold"
          >
            Fazer nova solicitação
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onRequest();
          }}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Telefone para contato</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-gci"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Qual é a sua dúvida ou dificuldade?</label>
            <textarea
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              rows={3}
              placeholder="Ex: Preciso de ajuda para obter o recibo do IRPF ou o demonstrativo de endividamento..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-gci"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            Solicitar Ligação de Suporte
          </button>
        </form>
      )}
    </div>
  );
};
