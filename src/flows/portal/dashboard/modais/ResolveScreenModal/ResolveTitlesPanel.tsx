import type { Titulo } from '@/types/titulo';
import { isResolutionTitulo } from '@/utils/titulos';
import { ResolveFooterNotice } from './ResolveFooterNotice';
import { ResolveTitleRow } from './ResolveTitleRow';

interface ResolveTitlesPanelProps {
  titulosList: Titulo[];
  onUploadCanhoto: (titulo: Titulo) => void;
  onSendLink: (titulo: Titulo) => void;
  onFinish: () => void;
}

export const ResolveTitlesPanel = ({ titulosList, onUploadCanhoto, onSendLink, onFinish }: ResolveTitlesPanelProps) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Título</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Lastro / Numero</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Cessão</th>
              <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Ações para Resolução</th>
            </tr>
          </thead>
          <tbody>
        {titulosList.filter(isResolutionTitulo).map((titulo, idx) => (
          <ResolveTitleRow
            key={titulo.id}
            titulo={titulo}
            index={idx}
            onUploadCanhoto={onUploadCanhoto}
            onSendLink={onSendLink}
          />
        ))}
    </tbody>
    </table>
    </div>
    </div>

    <ResolveFooterNotice onFinish={onFinish} />
  </div>
);
