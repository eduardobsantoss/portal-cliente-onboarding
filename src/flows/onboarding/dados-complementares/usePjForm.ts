import { useState } from 'react';
import { INITIAL_PJ_COMPANY_DATA } from '@/mocks/complementaryCompany';
import type { PjCompanyFormData, PjStep } from '@/types/dadosComplementares';

export function usePjForm() {
  const [pjStep, setPjStep] = useState<PjStep>(1);
  const [pjCompanyData, setPjCompanyData] = useState<PjCompanyFormData>(INITIAL_PJ_COMPANY_DATA);

  return { pjStep, setPjStep, pjCompanyData, setPjCompanyData };
}
