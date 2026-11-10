import React from 'react';
import { TextField } from '@/components/ui/TextField';
import type { PfFormData } from '@/types/dadosComplementares';

interface PfAlternativeDocumentProps {
  pfData: PfFormData;
  setPfData: React.Dispatch<React.SetStateAction<PfFormData>>;
}

const LABEL_CLASS = 'block text-[10px] text-slate-500 mb-0.5';
const INPUT_CLASS = 'w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs';

export const PfAlternativeDocument: React.FC<PfAlternativeDocumentProps> = ({
  pfData,
  setPfData,
}) => {
  return (
    <div className="sm:col-span-2 pt-2 border-t border-slate-200/50">
      <span className="block text-[11px] font-bold text-slate-700 mb-2">Documento de Identificação Alternativo</span>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <TextField
          label="Tipo"
          labelClassName={LABEL_CLASS}
          inputClassName={INPUT_CLASS}
          value={pfData.docTipo}
          onChange={(value) => setPfData({ ...pfData, docTipo: value })}
        />
        <TextField
          label="Número"
          labelClassName={LABEL_CLASS}
          inputClassName={INPUT_CLASS}
          value={pfData.docNumero}
          onChange={(value) => setPfData({ ...pfData, docNumero: value })}
        />
        <TextField
          type="date"
          label="Expedição"
          labelClassName={LABEL_CLASS}
          inputClassName={INPUT_CLASS}
          value={pfData.docDataExpedicao}
          onChange={(value) => setPfData({ ...pfData, docDataExpedicao: value })}
        />
        <TextField
          label="Órgão Emissor"
          labelClassName={LABEL_CLASS}
          inputClassName={INPUT_CLASS}
          value={pfData.docOrgao}
          onChange={(value) => setPfData({ ...pfData, docOrgao: value })}
        />
      </div>
    </div>
  );
};
