import type { LucideIcon } from 'lucide-react';
import type { InfoItem } from '@/types/dashboard';

interface InfoSectionCardProps {
  icon: LucideIcon;
  title: string;
  items: InfoItem[];
  className: string;
  headerClassName: string;
  labelClassName: string;
  valueClassName: string;
}

/** Bloco "título + grade de rótulo/valor" das abas de detalhes. */
export const InfoSectionCard = ({
  icon: Icon,
  title,
  items,
  className,
  headerClassName,
  labelClassName,
  valueClassName,
}: InfoSectionCardProps) => (
  <div className={className}>
    <div className={headerClassName}>
      <h4 className="text-xs font-black text-gci uppercase tracking-widest flex items-center gap-2">
        <Icon size={14} className="text-agro-orange" />
        {title}
      </h4>
    </div>
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-10">
      {items.map((info, i) => (
        <div key={i} className="group">
          <p className={labelClassName}>{info.label}</p>
          <p className={valueClassName}>{info.value}</p>
        </div>
      ))}
    </div>
  </div>
);
