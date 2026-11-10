import { Building2 } from 'lucide-react';
import { CORPORATE_GROUPS } from '@/mocks/economicGroups';

/** Lista de grupos econômicos para troca de grupo. */
interface GroupSwitcherProps {
  selectedGroup: string;
  onSelectGroup: (group: string) => void;
}

export const GroupSwitcher = ({ selectedGroup, onSelectGroup }: GroupSwitcherProps) => (
  <div className="border-t border-slate-50 py-2">
    <div className="px-5 py-2">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grupo Selecionado</p>
    </div>
    {CORPORATE_GROUPS.map((group) => (
      <button
        key={group}
        onClick={() => onSelectGroup(group)}
        className="w-full flex items-center justify-between px-5 py-2 text-sm hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Building2 size={16} className={selectedGroup === group ? 'text-agro-orange' : 'text-slate-400'} />
          <span className={selectedGroup === group ? 'font-bold text-gci' : 'text-slate-600'}>{group}</span>
        </div>
        {selectedGroup === group && (
          <div className="w-1.5 h-1.5 rounded-full bg-agro-orange" />
        )}
      </button>
    ))}
  </div>
);
