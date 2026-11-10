import type { AccountTransaction, ChartPoint, PortfolioSlice } from '@/types/dashboard';

export const PORTFOLIO_DISTRIBUTION: PortfolioSlice[] = [
  { name: 'Duplicatas', value: 45, color: '#083C4A' },
  { name: 'Crédito Rural', value: 30, color: '#F27D26' },
  { name: 'Capital de Giro', value: 15, color: '#2D5A27' },
  { name: 'Outros', value: 10, color: '#94A3B8' },
];

export const DELINQUENCY_CHART_DATA: ChartPoint[] = [
  { name: 'Jan', value: 0 },
  { name: 'Fev', value: 0 },
  { name: 'Mar', value: 0 },
  { name: 'Abr', value: 0 },
  { name: 'Mai', value: 0 },
  { name: 'Jun', value: 0 },
  { name: 'Jul', value: 0 },
];

export const ACCOUNT_TRANSACTIONS: AccountTransaction[] = [];
