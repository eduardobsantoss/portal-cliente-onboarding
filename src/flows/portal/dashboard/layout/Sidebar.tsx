import { Building2, Lock, LogOut, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { DASHBOARD_NAV_ITEMS } from '@/constants/dashboardNav';
import type { DashboardNavItem, DashboardTab } from '@/types/dashboard';
import { isNavItemLocked } from '@/utils/dashboardNav';

/** Menu lateral de navegação do portal. */
interface SidebarProps {
  isOpen: boolean;
  isVerified: boolean;
  activeTab: DashboardTab;
  onSelectItem: (item: DashboardNavItem) => void;
  onClose: () => void;
  onLogout: () => void;
}

export const Sidebar = ({ isOpen, isVerified, activeTab, onSelectItem, onClose, onLogout }: SidebarProps) => (
  <aside 
    className={`${
      isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'
    } bg-gci transition-all duration-300 flex flex-col fixed h-full z-50`}
  >
    <div className="p-6 flex items-center justify-between">
      {isOpen ? (
        <Logo variant="light" className="h-8 origin-left" />
      ) : (
        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white mx-auto">
          <Building2 size={20} />
        </div>
      )}
      <button 
        onClick={onClose}
        className="lg:hidden text-white/60 hover:text-white"
      >
        <X size={20} />
      </button>
    </div>

    <nav className="flex-1 px-4 mt-8 space-y-1">
      {DASHBOARD_NAV_ITEMS.map((item) => {
        const isLocked = isNavItemLocked(isVerified, item.id);
        return (
          <button
            key={item.id}
            onClick={() => onSelectItem(item)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
              isLocked
                ? 'opacity-45 hover:opacity-75 cursor-not-allowed text-white/50'
                : activeTab === item.id 
                ? 'bg-white/10 text-white' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            title={isLocked ? 'Disponível após completar o cadastro' : item.label}
          >
            <div className="flex items-center gap-4">
              <item.icon size={20} className={activeTab === item.id ? 'text-agro-orange' : 'shrink-0'} />
              {(isOpen || window.innerWidth < 1024) && <span className="font-semibold text-sm">{item.label}</span>}
            </div>

            {(isOpen || window.innerWidth < 1024) && (
              <div>
                {isLocked && (
                  <Lock size={14} className="text-white/30" />
                )}
              </div>
            )}
          </button>
        );
      })}
    </nav>

    <div className="p-4 mt-auto space-y-2">
      <button 
        onClick={onLogout}
        className="w-full flex items-center gap-4 p-3 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
      >
        <LogOut size={20} />
        {isOpen && <span className="font-bold text-sm">Sair</span>}
      </button>
    </div>
  </aside>
);
