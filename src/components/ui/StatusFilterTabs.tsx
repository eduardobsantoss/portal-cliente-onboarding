interface StatusFilterTabsProps {
  labels: string[];
  containerClassName: string;
  activeClassName: string;
  inactiveClassName: string;
}

/** Abas de filtro por status (visuais; a primeira aparece como ativa, como no original). */
export const StatusFilterTabs = ({ labels, containerClassName, activeClassName, inactiveClassName }: StatusFilterTabsProps) => (
  <div className={containerClassName}>
    {labels.map((label, index) => (
      <button key={label} className={index === 0 ? activeClassName : inactiveClassName}>{label}</button>
    ))}
  </div>
);
