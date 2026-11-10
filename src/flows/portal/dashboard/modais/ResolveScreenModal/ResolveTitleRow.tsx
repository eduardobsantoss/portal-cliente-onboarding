import React from 'react';
import { Link, Upload } from 'lucide-react';
import type { Titulo } from '@/types/titulo';
import { ResolveActionButton } from './ResolveActionButton';

interface ResolveTitleRowProps {
  titulo: Titulo;
  index: number;
  onUploadCanhoto: (titulo: Titulo) => void;
  onSendLink: (titulo: Titulo) => void;
}

export const ResolveTitleRow: React.FC<ResolveTitleRowProps> = ({ titulo, index, onUploadCanhoto, onSendLink }) => (
  <tr className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors ${index % 2 === 0 ? '' : 'bg-slate-50/10'}`}>
    <td className="px-8 py-6">
      <div className="flex flex-col">
        <span className="text-sm font-black text-gci uppercase tracking-tighter italic">{titulo.titulo}</span>
        <span className="text-[10px] text-slate-400 font-bold mt-0.5">{titulo.sacado}</span>
      </div>
    </td>
    <td className="px-8 py-6 text-xs font-black text-slate-600 uppercase italic">
      {titulo.lastro} / {titulo.numero}
    </td>
    <td className="px-8 py-6 text-xs font-black text-slate-400 uppercase italic">
      {titulo.cessao}
    </td>
    <td className="px-8 py-6">
      <div className="flex items-center justify-center gap-3">
        <ResolveActionButton
          done={titulo.canhotoEnviado}
          label="Subir Canhoto"
          doneLabel="Canhoto Enviado"
          icon={Upload}
          todoClassName="bg-orange-50 border-orange-100 text-agro-orange hover:bg-orange-100"
          onClick={() => onUploadCanhoto(titulo)}
        />

        <ResolveActionButton
          done={titulo.linkEnviado}
          label="Link de Confirmação"
          doneLabel="Link Enviado"
          icon={Link}
          todoClassName="bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100"
          onClick={() => onSendLink(titulo)}
        />
      </div>
    </td>
  </tr>
);
