import { Clock } from 'lucide-react';
import { DetailsSidebarCard } from '@/flows/portal/dashboard/modais/comum/DetailsSidebarCard';

interface TitleDetailsSidebarProps {
  status: string;
  valorNominal: string;
}

export const TitleDetailsSidebar = ({ status, valorNominal }: TitleDetailsSidebarProps) => (
  <>
    <DetailsSidebarCard label="Status do Título">
      <div className="flex items-center gap-2 text-agro-orange font-black">
        <Clock size={16} />
        {status}
      </div>
    </DetailsSidebarCard>
    <DetailsSidebarCard label="Valor Nominal">
      <div className="text-2xl font-black text-white">
        {valorNominal}
      </div>
    </DetailsSidebarCard>
  </>
);
