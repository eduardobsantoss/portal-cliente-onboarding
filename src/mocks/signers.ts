import type { SignerRepresentative } from '@/types/signer';
import { MOCK_USER_EMAIL, MOCK_USER_NAME } from '@/mocks/onboardingUser';

export const MOCK_SIGNER_EMAIL_DOMAIN = 'ceresinvestimentos.com';
export const MOCK_SIGNER_FALLBACK_CPF = '218.490.128-44';
export const MOCK_SIGNER_FALLBACK_ROLE = 'Sócio Administrador';

export const createMockPfSigners = (): SignerRepresentative[] => [
  {
    id: 'pf-titular-eduardo',
    name: MOCK_USER_NAME,
    role: 'Titular / Correntista',
    email: MOCK_USER_EMAIL,
    cpf: '123.456.789-00',
    type: 'socio',
    status: 'Pendente',
  },
];

export const createMockDefaultSigners = (): SignerRepresentative[] => [
  {
    id: 'rep-default-1',
    name: MOCK_USER_NAME,
    role: MOCK_SIGNER_FALLBACK_ROLE,
    email: MOCK_USER_EMAIL,
    cpf: MOCK_SIGNER_FALLBACK_CPF,
    type: 'socio',
    status: 'Pendente',
  },
];
