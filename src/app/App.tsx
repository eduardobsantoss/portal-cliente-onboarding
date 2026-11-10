import React from 'react';
import { useOnboardingFlow } from '@/hooks/useOnboardingFlow';
import { OnboardingRouter } from '@/app/OnboardingRouter';

export type { OnboardingViewState } from '@/types/onboarding';

export default function App() {
  const flow = useOnboardingFlow();

  return <OnboardingRouter {...flow} />;
}
