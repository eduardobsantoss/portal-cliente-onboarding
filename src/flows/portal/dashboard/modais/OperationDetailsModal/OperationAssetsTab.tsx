import { AssetsPagination } from './AssetsPagination';
import { OperationAssetsTable } from './OperationAssetsTable';
import { OperationAssetsToolbar } from './OperationAssetsToolbar';

interface OperationAssetsTabProps {
  onLinkAssets: () => void;
  onAddXml: () => void;
}

export const OperationAssetsTab = ({ onLinkAssets, onAddXml }: OperationAssetsTabProps) => (
  <div className="space-y-8">
    {/* Header with Total and Actions */}
    <OperationAssetsToolbar onLinkAssets={onLinkAssets} onAddXml={onAddXml} />

    {/* Table from Screenshot */}
    <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/50">
      <OperationAssetsTable />
      {/* Pagination Footer for Ativos */}
      <AssetsPagination />
    </div>
  </div>
);
