import { Briefcase, FileBarChart, Home, LayoutDashboard, ShieldCheck } from 'lucide-react';
import type { DashboardNavItem } from '@/types/dashboard';

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'geral', label: 'Minhas Informações', icon: LayoutDashboard },
  { id: 'carteira', label: 'Carteira', icon: Briefcase },
  { id: 'operacoes', label: 'Operações', icon: FileBarChart },
  { id: 'documentos', label: 'Análise de Crédito', icon: ShieldCheck, badge: 'Novo' },
];

/** Largura (px) a partir da qual a sidebar abre sozinha e o layout é "desktop". */
export const DESKTOP_BREAKPOINT_PX = 1024;
