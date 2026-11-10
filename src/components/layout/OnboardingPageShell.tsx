import React from 'react';
import { Logo } from '@/components/ui/Logo';

interface OnboardingPageShellProps {
  sectionLabel: string;
  mainClassName: string;
  headerAction?: React.ReactNode;
  /** Ação discreta renderizada no rodapé, ao lado do copyright. */
  footerAction?: React.ReactNode;
  beforeFooter?: React.ReactNode;
  afterFooter?: React.ReactNode;
  children: React.ReactNode;
}

export const OnboardingPageShell: React.FC<OnboardingPageShellProps> = ({
  sectionLabel,
  mainClassName,
  headerAction,
  footerAction,
  beforeFooter,
  afterFooter,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
      {/* Top Bar */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4 min-w-0">
          <Logo variant="horizontal" className="h-24 md:h-28 w-auto shrink-0" />
          <div className="hidden sm:block h-8 w-px bg-slate-200"></div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {sectionLabel}
          </span>
        </div>

        {headerAction}
      </header>

      {/* Main Content */}
      <main className={mainClassName}>
        {children}
      </main>

      {beforeFooter}

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto pt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-xs text-slate-400">
        <span>© 2026 Grupo Ceres Investimentos. Todos os direitos reservados.</span>
        {footerAction}
      </footer>

      {afterFooter}
    </div>
  );
};
