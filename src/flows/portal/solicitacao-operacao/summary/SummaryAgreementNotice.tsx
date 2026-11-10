import { CheckCircle2 } from 'lucide-react';

export const SummaryAgreementNotice = () => {
  return (
    <div className="bg-orange-50/50 border border-agro-orange/10 p-5 rounded-2xl flex items-start gap-4">
      <CheckCircle2 size={20} className="text-agro-orange shrink-0 mt-0.5" />
      <p className="text-xs text-orange-900 leading-relaxed font-medium">
        Ao clicar em concordar, você confirma a veracidade das notas apresentadas e com os termos da operação. <span className="font-bold underline underline-offset-2">O valor líquido ainda passará por validação final de duplicidade de crédito.</span>
      </p>
    </div>
  );
};
