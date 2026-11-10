import { ArrowDownRight, Banknote } from 'lucide-react';
import type { DashboardService } from '@/types/dashboard';

export const DASHBOARD_SERVICES: DashboardService[] = [
  { id: 'duplicata', label: 'Desconto de Duplicata', icon: ArrowDownRight, active: true },
  { id: 'recebiveis', label: 'Contratos Fiduciários', icon: Banknote, active: false },
];
