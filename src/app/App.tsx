import React from 'react';
import { useOnboardingFlow } from '@/hooks/useOnboardingFlow';
import { OnboardingRouter } from '@/app/OnboardingRouter';
import { DemoBackButton } from '@/components/layout/DemoBackButton';

export type { OnboardingViewState } from '@/types/onboarding';

export default function App() {
  const flow = useOnboardingFlow();

  return (
    <>
      <OnboardingRouter {...flow} />
      <DemoBackButton visible={flow.canGoBack} onBack={flow.goBack} />
    </>
  );
}
