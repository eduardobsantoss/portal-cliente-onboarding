export interface OnboardingProgressStepItem {
  number: number;
  label: string;
}

export const ONBOARDING_PROGRESS_STEPS: OnboardingProgressStepItem[] = [
  { number: 1, label: '1. Dados' },
  { number: 2, label: '2. Documentos' },
  { number: 3, label: '3. Assinatura' },
  { number: 4, label: '4. Análise' },
];
