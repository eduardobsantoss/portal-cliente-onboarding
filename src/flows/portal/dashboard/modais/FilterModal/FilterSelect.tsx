import { ChevronDown } from 'lucide-react';

interface FilterSelectProps {
  options: string[];
}

export const FilterSelect = ({ options }: FilterSelectProps) => (
  <div className="relative">
    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-gci focus:outline-none focus:border-gci transition-all appearance-none pr-12">
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
  </div>
);
