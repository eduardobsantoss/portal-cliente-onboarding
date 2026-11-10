import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { COPY_FEEDBACK_MS } from '@/constants/dashboardTimings';
import { PORTAL_ACCOUNT_CLIPBOARD_TEXT } from '@/mocks/portalAccount';
import { AccountDetailsCard } from './AccountDetailsCard';
import { GroupSwitcher } from './GroupSwitcher';

interface UserMenuProps {
  selectedGroup: string;
  onGroupChange: (group: string) => void;
  onLogout: () => void;
}

/** Menu do usuário: identidade, dados da conta, troca de grupo e saída. */
export const UserMenu = ({ selectedGroup, onGroupChange, onLogout }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedAccountInfo, setCopiedAccountInfo] = useState(false);

  const handleCopyAccountInfo = () => {
    navigator.clipboard.writeText(PORTAL_ACCOUNT_CLIPBOARD_TEXT);
    setCopiedAccountInfo(true);
    setTimeout(() => setCopiedAccountInfo(false), COPY_FEEDBACK_MS);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 md:pl-6 md:border-l border-slate-100 hover:bg-slate-50 transition-all p-2 rounded-xl text-left"
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gci leading-none">Eduardo Santos</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
            Ag. 0001 • C/C 84920-3
          </p>
        </div>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gci/5 flex items-center justify-center text-gci font-bold text-sm border border-gci/10 shadow-xs">
          ES
        </div>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50"
            >
              {/* User Identity Header */}
              <div className="px-5 py-3 border-b border-slate-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gci text-white flex items-center justify-center font-bold text-sm shrink-0">
                  ES
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gci truncate">Eduardo Santos</p>
                  <p className="text-xs text-slate-400 truncate">eduardo.santos@ceresinvestimentos.com</p>
                </div>
              </div>

              {/* Account Details Card */}
              <AccountDetailsCard copiedAccountInfo={copiedAccountInfo} handleCopyAccountInfo={handleCopyAccountInfo} />


              {/* Group Switching Section */}
              <GroupSwitcher
                selectedGroup={selectedGroup}
                onSelectGroup={(group) => {
                  onGroupChange(group);
                  setIsOpen(false);
                }}
              />


              <div className="border-t border-slate-50 pt-2 px-2">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
                >
                  <LogOut size={16} />
                  Sair da conta
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
