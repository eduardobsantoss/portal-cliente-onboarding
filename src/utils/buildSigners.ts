import type { ComplementaryFormSubmitPayload } from '@/components/ComplementaryDataForm';
import type { SignerRepresentative } from '@/types/signer';
import {
  MOCK_SIGNER_EMAIL_DOMAIN,
  MOCK_SIGNER_FALLBACK_CPF,
  MOCK_SIGNER_FALLBACK_ROLE,
  createMockDefaultSigners,
  createMockPfSigners,
} from '@/mocks/signers';

export function buildSigners(formData: ComplementaryFormSubmitPayload | null): SignerRepresentative[] {
  const isPf = formData?.accountType === 'pf';

  const pfSigner: SignerRepresentative[] = createMockPfSigners();

  const legalPartnerSigners: SignerRepresentative[] = (formData?.socios || [])
    .filter((s) => s.isRepresentanteLegal)
    .map((s) => ({
      id: s.id,
      name: s.nome,
      role: s.cargo || MOCK_SIGNER_FALLBACK_ROLE,
      email: s.email || `${s.nome.toLowerCase().replace(/\s+/g, '.')}@${MOCK_SIGNER_EMAIL_DOMAIN}`,
      cpf: s.cpfCnpj || MOCK_SIGNER_FALLBACK_CPF,
      type: 'socio' as const,
      status: 'Pendente' as const,
    }));

  const nonPartnerSigners: SignerRepresentative[] = (formData?.nonPartnerRepresentatives || []).map((r) => ({
    id: r.id,
    name: r.nome,
    role: r.cargo || r.vinculo,
    email: r.email,
    cpf: r.cpf,
    type: 'nao_socio' as const,
    vinculo: r.vinculo,
    status: 'Pendente' as const,
  }));

  const allPjSigners = [...legalPartnerSigners, ...nonPartnerSigners];

  if (isPf) return pfSigner;
  return allPjSigners.length > 0 ? allPjSigners : createMockDefaultSigners();
}
