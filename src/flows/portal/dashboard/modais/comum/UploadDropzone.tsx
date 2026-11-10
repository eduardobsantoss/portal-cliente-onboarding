import { Upload } from 'lucide-react';

interface UploadDropzoneProps {
  title: string;
  hint: string;
  className: string;
  iconBoxClassName: string;
  onClick?: () => void;
}

/** Área tracejada "clique ou arraste" dos modais de envio de arquivos. */
export const UploadDropzone = ({ title, hint, className, iconBoxClassName, onClick }: UploadDropzoneProps) => (
  <div onClick={onClick} className={className}>
    <div className={iconBoxClassName}>
      <Upload size={32} />
    </div>
    <div className="text-center">
      <p className="text-xl font-bold text-gci">{title}</p>
      <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-widest">{hint}</p>
    </div>
  </div>
);
