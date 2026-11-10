import { CanhotoExplanationCard } from './CanhotoExplanationCard';
import { RecognitionLinkExplanationCard } from './RecognitionLinkExplanationCard';

interface ResolveExplanationProps {
  onContinue: () => void;
}

export const ResolveExplanation = ({ onContinue }: ResolveExplanationProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <CanhotoExplanationCard />

    <RecognitionLinkExplanationCard onContinue={onContinue} />
  </div>
);
