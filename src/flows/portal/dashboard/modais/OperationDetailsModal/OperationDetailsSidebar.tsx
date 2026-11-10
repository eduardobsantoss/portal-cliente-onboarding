import { Hourglass } from 'lucide-react';
import { DetailsSidebarCard } from '@/flows/portal/dashboard/modais/comum/DetailsSidebarCard';
import { OperationJourney } from './OperationJourney';

interface OperationDetailsSidebarProps {
  status: string;
}

export const OperationDetailsSidebar = ({ status }: OperationDetailsSidebarProps) => (
  <>
    <DetailsSidebarCard label="Status Atual">
      <div className="flex items-center gap-2 text-agro-orange font-black text-xl uppercase tracking-tight">
        <Hourglass size={20} />
        {status}
      </div>
    </DetailsSidebarCard>

    <OperationJourney />
  </>
);
