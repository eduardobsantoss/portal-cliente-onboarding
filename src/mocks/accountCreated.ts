import type { AccountInfo } from '@/types/account';
import { MOCK_COMPANY_CNPJ, MOCK_COMPANY_NAME } from '@/mocks/onboardingCompany';

export const MOCK_ACCOUNT_INFO: AccountInfo = {
  institution: 'Grupo Ceres Investimentos',
  institutionCode: '000',
  agency: '0001',
  accountNumber: '482910-4',
  accountType: 'Conta Corrente Empresarial (PJ)',
  companyName: MOCK_COMPANY_NAME,
  cnpj: MOCK_COMPANY_CNPJ,
};
