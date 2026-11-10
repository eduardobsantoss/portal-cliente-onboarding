import type { PortalOperation } from '@/types/portalOperation';
import { OperationCard } from './OperationCard';
import { OperationsEmptyState } from './OperationsEmptyState';
import { OperationsPagination } from './OperationsPagination';
import { OperationsToolbar } from './OperationsToolbar';

interface OperacoesTabProps {
  operations: PortalOperation[];
  searchOperationId: string;
  onSearchChange: (value: string) => void;
  onOpenDetails: (op: PortalOperation) => void;
  onViewServices: () => void;
}

export const OperacoesTab = ({
  operations,
  searchOperationId,
  onSearchChange,
  onOpenDetails,
  onViewServices,
}: OperacoesTabProps) => (
  <div className="space-y-8">
    {operations.length > 0 ? (
      <>
        <OperationsToolbar searchOperationId={searchOperationId} onSearchChange={onSearchChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operations
            .filter(op => op.id.toLowerCase().includes(searchOperationId.toLowerCase()))
            .map((op) => (
              <OperationCard key={op.id} op={op} onOpenDetails={onOpenDetails} />
            ))}
        </div>

        {/* Pagination Footer for Operations */}
        <OperationsPagination count={operations.length} />
      </>
    ) : (
      <OperationsEmptyState onViewServices={onViewServices} />
    )}
  </div>
);
