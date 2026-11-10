import { Info } from 'lucide-react';

interface ResolveFooterNoticeProps {
  onFinish: () => void;
}

export const ResolveFooterNotice = ({ onFinish }: ResolveFooterNoticeProps) => (
  <div className="bg-gci rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-gci/20">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange shrink-0">
        <Info size={24} />
      </div>
      <p className="text-sm font-bold text-white/80 leading-relaxed max-w-xl italic">
        Após finalizar o envio de canhotos ou links de todos os títulos, nossa equipe de backoffice iniciará a validação imediatamente. Você será notificado assim que o processo for concluído.
      </p>
    </div>
    <button 
      onClick={onFinish}
      className="bg-white text-gci px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-agro-orange hover:text-white transition-all active:scale-95 whitespace-nowrap"
    >
      ENTENDIDO, VOLTAR
    </button>
  </div>
);
