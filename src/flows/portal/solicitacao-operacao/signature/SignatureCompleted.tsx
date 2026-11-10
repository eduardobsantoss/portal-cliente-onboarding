import { CheckCircle2, Zap } from 'lucide-react';

export const SignatureCompleted = () => {
  return (
    <div className="space-y-6 py-8">
      <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
        <CheckCircle2 size={40} />
      </div>
      <h3 className="text-xl font-black text-gci">Assinatura Digital Concluída</h3>
      <div className="flex items-center justify-center gap-3 text-slate-400">
        <Zap size={16} className="text-agro-orange" />
        <span className="text-xs font-bold uppercase tracking-widest">Estamos encaminhando para liberação.</span>
      </div>
    </div>
  );
};
