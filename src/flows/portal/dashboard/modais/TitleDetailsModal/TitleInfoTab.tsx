import { Calendar, Info } from 'lucide-react';
import type { Titulo } from '@/types/titulo';
import { buildTituloPrazosInfo, buildTituloRegistroInfo } from '@/utils/titleDetails';
import { InfoSectionCard } from '../comum/InfoSectionCard';

interface TitleInfoTabProps {
  titulo: Titulo;
}

const INFO_LABEL_CLASS = 'text-[10px] uppercase tracking-[0.15em] text-gray-400 font-black mb-1 group-hover:text-agro-orange transition-colors';
const INFO_VALUE_CLASS = 'text-base font-bold text-gci leading-tight';
const INFO_CARD_CLASS = 'bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm';

export const TitleInfoTab = ({ titulo }: TitleInfoTabProps) => (
  <div className="space-y-8">
    {/* Bloco 1: Dados do Título e Sacado */}
    <InfoSectionCard
      icon={Info}
      title="Dados do Registro & Sacado"
      items={buildTituloRegistroInfo(titulo)}
      className={INFO_CARD_CLASS}
      headerClassName="p-6 border-b border-gray-100 bg-gray-50/30"
      labelClassName={INFO_LABEL_CLASS}
      valueClassName={INFO_VALUE_CLASS}
    />

    {/* Bloco 2: Datas e Valores */}
    <InfoSectionCard
      icon={Calendar}
      title="Prazos & Valores Financeiros"
      items={buildTituloPrazosInfo(titulo)}
      className={INFO_CARD_CLASS}
      headerClassName="p-6 border-b border-gray-100 bg-gray-50/30 font-black text-gci"
      labelClassName={INFO_LABEL_CLASS}
      valueClassName={INFO_VALUE_CLASS}
    />
  </div>
);
