import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import { getProcessingOverallProgress, getProcessingStage } from '@/utils/operationProcessing';
import { OperationTimeline } from '../OperationTimeline';

interface ProcessingDocsStepProps {
  processingIndex: number;
}

export const ProcessingDocsStep = ({ processingIndex }: ProcessingDocsStepProps) => {
  const currentStage = getProcessingStage(processingIndex);
  const overallProgress = getProcessingOverallProgress(processingIndex);

  return (
    <>
      <OperationTimeline step="PROCESSING_DOCS" />
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-orange-50 text-agro-orange rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-agro-orange/5 animate-pulse" />
          <FileText size={40} className="relative z-10" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-gci uppercase tracking-tighter">
            {currentStage.label}
          </h2>
          <p className="text-slate-500 text-base font-medium leading-relaxed">
            {currentStage.description}
          </p>
        </div>

        <div className="space-y-4 pt-10">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progresso Total</span>
            <span className="text-[10px] font-black text-agro-orange uppercase tracking-widest">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-100 shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-agro-orange rounded-full shadow-lg shadow-agro-orange/20"
            />
          </div>
        </div>
      </div>
    </>
  );
};
