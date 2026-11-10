interface FilterInputProps {
  type: 'text' | 'date';
  placeholder?: string;
}

const BASE_CLASS =
  'w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-gci focus:outline-none focus:border-gci transition-all';

export const FilterInput = ({ type, placeholder }: FilterInputProps) => (
  <input
    type={type}
    placeholder={placeholder}
    className={placeholder ? `${BASE_CLASS} placeholder:text-slate-300` : BASE_CLASS}
  />
);
