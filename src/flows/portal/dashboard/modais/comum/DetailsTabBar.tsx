import { motion } from 'motion/react';

interface DetailsTab<TTab extends string> {
  id: TTab;
  label: string;
}

interface DetailsTabBarProps<TTab extends string> {
  tabs: DetailsTab<TTab>[];
  activeTab: TTab;
  onChange: (tab: TTab) => void;
  indicatorLayoutId: string;
  containerClassName: string;
  buttonClassName: string;
}

/** Abas dos detalhes (operação/título) com indicador animado. */
export const DetailsTabBar = <TTab extends string>({
  tabs,
  activeTab,
  onChange,
  indicatorLayoutId,
  containerClassName,
  buttonClassName,
}: DetailsTabBarProps<TTab>) => (
  <div className={containerClassName}>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`${buttonClassName} ${
          activeTab === tab.id
            ? 'text-gci'
            : 'text-gray-300 hover:text-gray-400'
        }`}
      >
        {tab.label}
        {activeTab === tab.id && (
          <motion.div layoutId={indicatorLayoutId} className="absolute bottom-0 left-0 right-0 h-1 bg-gci rounded-full" />
        )}
      </button>
    ))}
  </div>
);
