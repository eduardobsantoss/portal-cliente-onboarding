import type { ComplementaryFormSubmitPayload } from '@/types/dadosComplementares';
import type { SignerRepresentative } from '@/types/signer';
import type { Socio } from '@/types/socio';
import {
  MOCK_SIGNER_EMAIL_DOMAIN,
  MOCK_SIGNER_FALLBACK_CPF,
  createMockDefaultSigners,
  createMockPfSigners,
} from '@/mocks/signers';
import { resolveEffectiveSocios } from '@/utils/requiredDocuments';

function isLegalPartner(socio: Socio): boolean {
  return Boolean(socio.isRepresentanteLegal) || socio.responsabilidade === 'Representante legal';
}

function partnerSignerRole(socio: Socio): string {
  if (socio.cargo) return socio.cargo;
  if (isLegalPartner(socio)) return 'Representante legal';
  return socio.responsabilidade || 'Sócio';
}

function toPartnerSigner(socio: Socio): SignerRepresentative {
  return {
    id: socio.id,
    name: socio.nome,
    role: partnerSignerRole(socio),
    email:
      socio.email ||
      `${socio.nome.toLowerCase().replace(/\s+/g, '.')}@${MOCK_SIGNER_EMAIL_DOMAIN}`,
    cpf: socio.cpfCnpj || MOCK_SIGNER_FALLBACK_CPF,
    type: 'socio',
    status: 'Pendente',
  };
}

export function buildSigners(formData: ComplementaryFormSubmitPayload | null): SignerRepresentative[] {
  if (formData?.accountType === 'pf') return createMockPfSigners();

  const partners = [...resolveEffectiveSocios(formData?.socios)].sort(
    (a, b) => Number(isLegalPartner(b)) - Number(isLegalPartner(a))
  );

  const partnerSigners = partners.map(toPartnerSigner);
  const nonPartnerSigners: SignerRepresentative[] = (formData?.nonPartnerRepresentatives || []).map((rep) => ({
    id: rep.id,
    name: rep.nome,
    role: rep.cargo || rep.vinculo,
    email: rep.email,
    cpf: rep.cpf,
    type: 'nao_socio' as const,
    vinculo: rep.vinculo,
    status: 'Pendente' as const,
  }));

  const allPjSigners = [...partnerSigners, ...nonPartnerSigners];
  return allPjSigners.length > 0 ? allPjSigners : createMockDefaultSigners();
}
