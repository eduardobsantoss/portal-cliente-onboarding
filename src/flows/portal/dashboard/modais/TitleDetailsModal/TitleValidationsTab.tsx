import { AlertTriangle, Clock, Info } from 'lucide-react';
import { TITLE_VALIDATION_ERROR_CODE } from '@/mocks/titleDetails';
import type { Titulo } from '@/types/titulo';
import { DetailsAlertBanner } from '../comum/DetailsAlertBanner';

interface TitleValidationsTabProps {
  titulo: Titulo;
}

export const TitleValidationsTab = ({ titulo }: TitleValidationsTabProps) => (
  <div className="space-y-6">
    <DetailsAlertBanner tone="danger" icon={AlertTriangle}>
    <h4 className="text-lg font-black text-red-600 mb-1">Validação Crítica</h4>
    <p className="text-sm text-slate-600 leading-relaxed">
      O contato do sacado (<span className="font-bold">{titulo.sacado}</span>) cadastrado no XML é inválido ou inexistente.
    </p>
    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
      <Info size={12} />
      {`Código de Erro: ${TITLE_VALIDATION_ERROR_CODE}`}
    </p>
    </DetailsAlertBanner>

    <DetailsAlertBanner tone="warning" icon={Clock}>
    <h4 className="text-lg font-black text-gci mb-1">Aviso de Vencimento Proximo</h4>
    <p className="text-sm text-slate-600 leading-relaxed">
      Este título possui vencimento em <span className="font-bold">{titulo.vencimento}</span>. Certifique-se de que o termo de cessão foi assinado pelo sacado.
    </p>
    </DetailsAlertBanner>
  </div>
);
