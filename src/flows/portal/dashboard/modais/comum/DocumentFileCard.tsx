import React from 'react';
import { Download, FileText, Search } from 'lucide-react';
import type { DocumentFile } from '@/types/dashboard';

interface DocumentFileCardProps {
  file: DocumentFile;
  className: string;
  iconBoxClassName: string;
}

/** Cartão de documento anexado (visualizar/baixar) das abas "Anexos". */
export const DocumentFileCard: React.FC<DocumentFileCardProps> = ({ file, className, iconBoxClassName }) => (
  <div className={className}>
    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -mr-12 -mt-12 group-hover:bg-agro-orange/5 transition-colors" />

    <div className="flex items-center justify-between relative z-10">
      <div className={iconBoxClassName}>
        <FileText size={32} />
      </div>
      <div className="flex items-center gap-1">
        <button className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gci transition-all" title="Visualizar">
          <Search size={20} />
        </button>
        <button className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gci transition-all" title="Download">
          <Download size={20} />
        </button>
      </div>
    </div>

    <div className="relative z-10">
      {file.category && (
        <div className="mb-1">
          <span className="text-[8px] font-black bg-gci/5 text-gci px-2 py-0.5 rounded-full uppercase tracking-widest">
            {file.category}
          </span>
        </div>
      )}
      <p className="font-black text-base text-gci group-hover:text-agro-orange transition-colors truncate">{file.name}</p>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{file.size}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{file.date}</span>
      </div>
    </div>
  </div>
);
