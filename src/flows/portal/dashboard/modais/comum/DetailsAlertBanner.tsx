import React from 'react';
import type { LucideIcon } from 'lucide-react';

type AlertTone = 'danger' | 'warning';

interface DetailsAlertBannerProps {
  tone: AlertTone;
  withBottomMargin?: boolean;
  icon: LucideIcon;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const BANNER_CLASS: Record<AlertTone, string> = {
  danger: 'bg-red-50/50 border border-red-100 p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-8 shadow-sm',
  warning: 'bg-orange-50/50 border border-agro-orange/20 p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-8 shadow-sm',
};

const ICON_BOX_CLASS: Record<AlertTone, string> = {
  danger: 'w-16 h-16 rounded-3xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/20',
  warning: 'w-16 h-16 rounded-3xl bg-agro-orange text-white flex items-center justify-center shadow-lg shadow-agro-orange/20',
};

/** Faixa de alerta (recusa, pendência, validações) das telas de detalhes. */
export const DetailsAlertBanner = ({
  tone,
  withBottomMargin = false,
  icon: Icon,
  actions,
  children,
}: DetailsAlertBannerProps) => (
  <div className={withBottomMargin ? `mb-10 ${BANNER_CLASS[tone]}` : BANNER_CLASS[tone]}>
    <div className={ICON_BOX_CLASS[tone]}>
      <Icon size={32} />
    </div>
    <div className="flex-1 text-center md:text-left">{children}</div>
    {actions}
  </div>
);
