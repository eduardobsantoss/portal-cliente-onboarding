interface FinalReviewFigureProps {
  label: string;
  value: string;
  valueClassName: string;
}

export const FinalReviewFigure = ({ label, value, valueClassName }: FinalReviewFigureProps) => {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  );
};
