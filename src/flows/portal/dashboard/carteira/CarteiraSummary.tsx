import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CarteiraStatCard } from './CarteiraStatCard';
import { PortfolioDistributionCard } from './PortfolioDistributionCard';

export const CarteiraSummary = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CarteiraStatCard
        label="Valor Total"
        value="R$ 0,00"
        valueClassName="text-2xl font-bold text-gci"
        footer={<><ArrowUpRight size={12} /> 0% este mês</>}
      />
      <CarteiraStatCard
        label="Valor Vencido"
        value="R$ 0,00"
        valueClassName="text-2xl font-bold text-slate-400"
        delay={0.1}
        footer={<><CheckCircle2 size={12} /> 0 títulos pendentes</>}
      />
      <CarteiraStatCard label="A Vencer (30d)" value="R$ 0,00" valueClassName="text-2xl font-bold text-gci" delay={0.2} />
      <CarteiraStatCard label="Títulos Ativos" value="0" valueClassName="text-2xl font-bold text-gci" delay={0.3} />
    </div>

    <PortfolioDistributionCard />
  </div>
);
