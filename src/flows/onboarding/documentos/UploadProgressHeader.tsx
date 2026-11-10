import React from 'react';
import { motion } from 'motion/react';
import { FileCheck } from 'lucide-react';

interface UploadProgressHeaderProps {
  uploadedMandatory: number;
  totalMandatory: number;
}

export const UploadProgressHeader: React.FC<UploadProgressHeaderProps> = ({
  uploadedMandatory,
  totalMandatory,
}) => {
  return (
    <div className="space-y-1.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700 flex items-center gap-2">
          <FileCheck size={16} className="text-gci" />
          Documentos Obrigatórios Validados
        </span>
        <span className="font-bold text-gci">
          {uploadedMandatory} de {totalMandatory}
        </span>
      </div>
      <div className="w-full h-2 bg-slate-200/70 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(uploadedMandatory / totalMandatory) * 100}%` }}
          transition={{ duration: 0.4 }}
          className="h-full bg-gci rounded-full"
        />
      </div>
    </div>
  );
};
