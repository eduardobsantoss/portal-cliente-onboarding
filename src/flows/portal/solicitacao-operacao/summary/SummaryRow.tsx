interface SummaryRowProps {
  rowClassName: string;
  labelClassName: string;
  valueClassName: string;
  label: string;
  value: string;
}

export const SummaryRow = ({ rowClassName, labelClassName, valueClassName, label, value }: SummaryRowProps) => {
  return (
    <div className={rowClassName}>
      <span className={labelClassName}>{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
};
