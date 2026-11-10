import { Menu } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import type { PendingTask } from '@/types/notification';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';

interface TopHeaderProps {
  selectedGroup: string;
  onToggleSidebar: () => void;
  onSelectPending: (task: PendingTask) => void;
  onGroupChange: (group: string) => void;
  onLogout: () => void;
}

export const TopHeader = ({ selectedGroup, onToggleSidebar, onSelectPending, onGroupChange, onLogout }: TopHeaderProps) => (
  <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
    <div className="flex items-center gap-4">
      <button 
        onClick={onToggleSidebar}
        className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
      >
        <Menu size={20} />
      </button>
      <div className="lg:hidden">
        <Logo variant="dark" className="h-7" />
      </div>
    </div>

    <div className="flex items-center gap-4 md:gap-6">
      <NotificationsMenu onSelectPending={onSelectPending} />

      <UserMenu selectedGroup={selectedGroup} onGroupChange={onGroupChange} onLogout={onLogout} />
    </div>
  </header>
);
