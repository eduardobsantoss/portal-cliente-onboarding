import { ArrowRight, Link } from 'lucide-react';

interface RecognitionLinkExplanationCardProps {
  onContinue: () => void;
}

export const RecognitionLinkExplanationCard = ({ onContinue }: RecognitionLinkExplanationCardProps) => (
  <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between gap-8 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-full blur-3xl -mr-16 -mt-16" />
    <div className="space-y-4">
      <div className="w-16 h-16 rounded-[24px] bg-green-50 text-green-600 flex items-center justify-center shrink-0">
        <Link size={32} />
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-black text-gci uppercase tracking-tighter italic">Evidência de Reconhecimento</h3>
        <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
          A Evidência de Reconhecimento é um link disponibilizado para você, cliente, enviar diretamente ao sacado da Nota Fiscal.
          <br /><br />
          Ao acessar a próxima tela, você poderá escolher como deseja compartilhar esse link — seja por e-mail ou WhatsApp. Assim, o sacado receberá uma notificação com as informações necessárias para reconhecer o título.
        </p>
      </div>
    </div>

    <button 
      onClick={onContinue}
      className="w-full bg-gci text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-gci/20 hover:bg-gci-hover transition-all active:scale-95 flex items-center justify-center gap-3"
    >
      ENTENDI, SEGUIR PARA RESOLUÇÃO
      <ArrowRight size={18} />
    </button>
  </div>
);
