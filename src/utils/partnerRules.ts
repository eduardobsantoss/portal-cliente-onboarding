import {
  NON_PARTNER_DOC_FIELDS,
  PF_PARTNER_DOC_FIELDS,
  PJ_PARTNER_DOC_FIELDS,
  type PartnerDocField,
} from '@/constants/partnerDocFields';
import type { PartnerData, PartnerDocState } from '@/types/documentChecklist';

const isDocOk = (doc: PartnerDocState | undefined): boolean =>
  Boolean(doc?.uploaded && doc.status !== 'rejeitado');

/**
 * Indícios de cônjuge: estado civil casado/união estável OU já existe certidão/documento do cônjuge enviado.
 * (Regra usada tanto na validação do sócio PF quanto na exibição do documento do cônjuge.)
 */
export function hasSpouseIndicators(partner: PartnerData): boolean {
  return Boolean(
    partner.maritalStatus?.toLowerCase().includes('casad') ||
      partner.maritalStatus?.toLowerCase().includes('união') ||
      partner.maritalStatus?.toLowerCase().includes('uniao') ||
      partner.docs.certidaoCasamento?.uploaded ||
      partner.docs.documentoConjuge?.uploaded
  );
}

/** Estado civil "casado/união" pela busca parcial (usada no preenchimento em lote da simulação). */
export function isMarriedByLooseStatus(maritalStatus: string | undefined): boolean {
  return Boolean(
    maritalStatus?.toLowerCase().includes('casad') || maritalStatus?.toLowerCase().includes('união')
  );
}

/** Estado civil que exige documentos de cônjuge ao cadastrar nova parte (comparação exata). */
export function isMarriedByExactStatus(maritalStatus: string): boolean {
  return maritalStatus === 'Casado' || maritalStatus === 'União Estável';
}

/** Verifica se a parte relacionada está totalmente validada (documentos obrigatórios enviados e não rejeitados). */
export function isPartnerValidCheck(partner: PartnerData): boolean {
  if (partner.isNonPartner) {
    // Representantes não sócios exigem APENAS documento de identidade e comprovante de residência
    return isDocOk(partner.docs.cnhRg) && isDocOk(partner.docs.residencia);
  }

  if (partner.type === 'PJ') {
    return (
      isDocOk(partner.docs.contratoEstatutoSocialPj) && isDocOk(partner.docs.beneficiariosFinaisPj)
    );
  }

  // PF:
  const cnhOk = isDocOk(partner.docs.cnhRg);
  const resOk = isDocOk(partner.docs.residencia);
  const irpfOk = isDocOk(partner.docs.irpf);

  if (hasSpouseIndicators(partner)) {
    const certOk = isDocOk(partner.docs.certidaoCasamento);
    const conjOk = isDocOk(partner.docs.documentoConjuge);
    return cnhOk && resOk && irpfOk && certOk && conjOk;
  }

  return cnhOk && resOk && irpfOk;
}

/** Documentos exigidos da parte conforme o tipo (não sócio / PJ / PF) e a regra condicional do cônjuge. */
export function getPartnerDocFields(partner: PartnerData): PartnerDocField[] {
  if (partner.isNonPartner) return NON_PARTNER_DOC_FIELDS;
  if (partner.type === 'PJ') return PJ_PARTNER_DOC_FIELDS;
  const hasSpouse = hasSpouseIndicators(partner);
  return PF_PARTNER_DOC_FIELDS.filter((field) => !field.requiresSpouse || hasSpouse);
}
