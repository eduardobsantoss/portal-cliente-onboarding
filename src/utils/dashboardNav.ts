import type { DashboardTab } from '@/types/dashboard';

/** Todas as abas, exceto "Compl. Cadastro", ficam bloqueadas até o cadastro ser concluído. */
export const isNavItemLocked = (isVerified: boolean, tabId: DashboardTab) => !isVerified && tabId !== 'documentos';
