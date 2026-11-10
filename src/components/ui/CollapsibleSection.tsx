import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  buttonClassName: string;
  header: React.ReactNode;
  children: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  isOpen,
  onToggle,
  buttonClassName,
  header,
  children,
}) => {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
      <button type="button" onClick={onToggle} className={buttonClassName}>
        {header}
        {isOpen ? (
          <ChevronUp size={16} className="text-slate-500" />
        ) : (
          <ChevronDown size={16} className="text-slate-500" />
        )}
      </button>

      {isOpen && children}
    </div>
  );
};
