import React from 'react';
import type { TermsDocumentType } from '@/types/terms';

interface TermsConsentCheckboxProps {
  accepted: boolean;
  onAcceptedChange: (accepted: boolean) => void;
  onOpenDocument: (type: TermsDocumentType) => void;
}

export const TermsConsentCheckbox: React.FC<TermsConsentCheckboxProps> = ({
  accepted,
  onAcceptedChange,
  onOpenDocument,
}) => {
  return (
  <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50/70 transition-colors cursor-pointer select-none">
    <input
      type="checkbox"
      checked={accepted}
      onChange={(e) => onAcceptedChange(e.target.checked)}
      className="mt-0.5 w-5 h-5 rounded border-slate-300 text-gci focus:ring-gci cursor-pointer shrink-0"
    />
    <div className="text-xs leading-relaxed text-slate-700">
      <span className="font-bold text-slate-900">
        Declaro que li e concordo integralmente com os{' '}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onOpenDocument('terms');
        }}
        className="font-bold text-gci underline underline-offset-2 hover:text-agro-orange inline transition-colors"
      >
        Termos de Uso
      </button>
      <span className="font-bold text-slate-900"> e a </span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onOpenDocument('privacy');
        }}
        className="font-bold text-gci underline underline-offset-2 hover:text-agro-orange inline transition-colors"
      >
        Política de Privacidade
      </button>
      <span className="text-slate-900 font-bold"> da plataforma.</span>
      <p className="text-[11px] text-slate-400 mt-1.5">
        Ao avançar, você confirma a autorização para tratamento dos dados cadastrais e envio das informações necessárias para análise.
      </p>
    </div>
  </label>
  );
};
