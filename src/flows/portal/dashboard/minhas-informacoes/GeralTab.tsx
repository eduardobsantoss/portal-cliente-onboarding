import { AccountStatement } from './AccountStatement';
import { DelinquencyChart } from './DelinquencyChart';
import { GeralKpiGrid } from './GeralKpiGrid';
import { ServiceQuickActions } from './ServiceQuickActions';

interface GeralTabProps {
  limitLabel: string;
  onSelectService: (serviceLabel: string) => void;
}

export const GeralTab = ({ limitLabel, onSelectService }: GeralTabProps) => (
  <div className="space-y-8">
    {/* KPI Grid */}
    <GeralKpiGrid limitLabel={limitLabel} />

    {/* Quick Actions */}
    <ServiceQuickActions onSelectService={onSelectService} />

    {/* Chart Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Chart */}
      <div className="lg:col-span-2 space-y-8">
        <DelinquencyChart />
      </div>

      {/* Right: Transactions */}
      <AccountStatement />
    </div>
  </div>
);
