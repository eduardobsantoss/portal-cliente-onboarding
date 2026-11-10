import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const FacialInstructions: React.FC = () => {
  return (
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
  );
};
