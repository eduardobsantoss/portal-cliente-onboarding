import { Shield } from 'lucide-react';

export const XmlUploadIntro = () => {
  return (
    <div className="text-center space-y-3">
      <div className="inline-flex items-center gap-2 bg-gci/5 text-gci px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gci/10 mb-2">
        <Shield size={12} />
        Upload Seguro 256-bit
      </div>
      <h2 className="text-3xl font-black text-gci tracking-tight">Comece sua Antecipação</h2>
      <p className="text-slate-500 text-lg font-medium">Envie os arquivos XML das notas fiscais que deseja antecipar.</p>
      <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl max-w-xl mx-auto">
        <p className="text-xs text-orange-800 font-bold leading-relaxed">
          Observação: O somatório dos títulos abaixo de R$ 50.000,00 por CPF ou CNPJ não será necessário confirmação.
        </p>
      </div>
    </div>
  );
};
