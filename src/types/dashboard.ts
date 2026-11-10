import type { LucideIcon } from 'lucide-react';

export type DashboardTab = 'home' | 'geral' | 'operacoes' | 'carteira' | 'documentos' | 'cadastro';

export type PendingToastSource = 'header' | 'hero';

export interface DashboardNavItem {
  id: DashboardTab;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export interface DashboardService {
  id: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}

export interface ChartPoint {
  name: string;
  value: number;
}

export interface PortfolioSlice {
  name: string;
  value: number;
  color: string;
}

export interface AccountTransaction {
  id: string | number;
  type: 'in' | 'out';
  name: string;
  date: string;
  amount: string;
}

export interface InfoItem {
  label: string;
  value: string;
}

export interface DocumentFile {
  name: string;
  size: string;
  date: string;
  type: string;
  category?: string;
}
