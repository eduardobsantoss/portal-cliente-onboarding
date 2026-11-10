import React from 'react';
import { ONBOARDING_PROGRESS_STEPS } from '@/constants/onboardingSteps';
import type { OnboardingProgressStepItem } from '@/constants/onboardingSteps';

interface OnboardingProgressStepsProps {
  currentStep: number;
}

interface OnboardingProgressStepProps {
  step: OnboardingProgressStepItem;
  currentStep: number;
}

const OnboardingProgressStep: React.FC<OnboardingProgressStepProps> = ({ step, currentStep }) => {
  if (step.number < currentStep) {
    return (
      <div className="flex items-center gap-1.5 text-emerald-700">
        <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">✓</span>
        <span className="hidden sm:inline">{step.label}</span>
      </div>
    );
  }

  if (step.number === currentStep) {
    return (
      <div className="flex items-center gap-1.5 text-gci font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60">
        <span className="w-5 h-5 rounded-full bg-gci text-white flex items-center justify-center text-[10px] font-bold">{step.number}</span>
        <span>{step.label}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-slate-400">
      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">{step.number}</span>
      <span className="hidden sm:inline">{step.label}</span>
    </div>
  );
};

export const OnboardingProgressSteps: React.FC<OnboardingProgressStepsProps> = ({ currentStep }) => {
  return (
    <div className="w-full bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-[11px] font-semibold text-slate-500">
      {ONBOARDING_PROGRESS_STEPS.map((step, index) => (
        <React.Fragment key={step.number}>
          {index > 0 && <span className="text-slate-300">→</span>}
          <OnboardingProgressStep step={step} currentStep={currentStep} />
        </React.Fragment>
      ))}
    </div>
  );
};
