import { X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface OperationFlowHeaderProps {
  onClose: () => void;
}

export const OperationFlowHeader = ({ onClose }: OperationFlowHeaderProps) => {
  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden p-6 border-b border-slate-50 flex items-center justify-between shrink-0">
        <Logo variant="dark" className="h-6" />
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-gci">
          <X size={24} />
        </button>
      </div>

      <div className="absolute top-8 right-8 z-30 hidden lg:block">
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-gci transition-all group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>
    </>
  );
};
