import { Upload } from 'lucide-react';

interface XmlDropzoneProps {
  onFileUpload: () => void;
}

export const XmlDropzone = ({ onFileUpload }: XmlDropzoneProps) => {
  return (
    <div 
      onClick={onFileUpload}
      className="group border-[3px] border-dashed border-slate-100 rounded-[32px] p-16 flex flex-col items-center justify-center gap-6 bg-slate-50/50 hover:bg-white hover:border-agro-orange/30 hover:shadow-2xl hover:shadow-agro-orange/5 transition-all cursor-pointer"
    >
      <div className="w-20 h-20 rounded-[24px] bg-white flex items-center justify-center text-slate-300 group-hover:text-agro-orange group-hover:bg-orange-50 transition-all shadow-sm">
        <Upload size={32} />
      </div>
      <div className="text-center">
        <p className="text-xl font-black text-gci">Arraste ou clique para enviar</p>
        <p className="text-sm font-bold text-slate-400 mt-2">Apenas arquivos .xml são aceitos nesta etapa</p>
      </div>
    </div>
  );
};
