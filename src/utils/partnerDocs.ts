import {
  REJECTED_PARTNER_IRPF_FILE_NAME,
  REJECTED_PARTNER_IRPF_REASON,
} from '@/constants/documentChecklist';
import type { NewPartnerForm, PartnerData, PartnerDocKey } from '@/types/documentChecklist';
import { isMarriedByExactStatus, isMarriedByLooseStatus, isPartnerValidCheck } from '@/utils/partnerRules';

/** Registra o upload de um documento do sócio e recalcula o status (validado / em análise). */
export function applyPartnerDocUpload(partner: PartnerData, docType: PartnerDocKey, file: File): PartnerData {
  const updatedDocs = {
    ...partner.docs,
    [docType]: {
      uploaded: true,
      fileName: file.name,
      status: 'aprovado' as const,
      rejectionReason: undefined,
      note: docType === 'irpf' ? 'Recibo RFB validado' : undefined,
    },
  };

  const updatedPartner: PartnerData = {
    ...partner,
    docs: updatedDocs,
  };

  const valid = isPartnerValidCheck(updatedPartner);

  return {
    ...updatedPartner,
    status: valid ? ('validado' as const) : ('em_analise' as const),
  };
}

/** Monta uma nova parte relacionada (PF/PJ) com os documentos exigidos ainda pendentes. */
export function buildPartnerFromForm(form: NewPartnerForm, id: string): PartnerData {
  const isPJ = form.type === 'PJ';
  const isMarried = !isPJ && isMarriedByExactStatus(form.maritalStatus);

  return {
    id,
    name: form.name,
    type: form.type,
    role: form.role,
    cpf: form.cpf,
    email: form.email || (isPJ ? 'contato@empresa.com.br' : 'socio@empresa.com.br'),
    phone: form.phone || '(11) 99999-0000',
    quotaPercentage: Number(form.quotaPercentage) || 10,
    maritalStatus: isPJ ? undefined : form.maritalStatus,
    status: 'pendente_documentos',
    docs: isPJ
      ? {
          contratoEstatutoSocialPj: { uploaded: false, status: 'pendente' },
          beneficiariosFinaisPj: { uploaded: false, status: 'pendente' },
        }
      : {
          cnhRg: { uploaded: false, status: 'pendente' },
          residencia: { uploaded: false, status: 'pendente' },
          certidaoCasamento: isMarried ? { uploaded: false, status: 'pendente' } : undefined,
          documentoConjuge: isMarried ? { uploaded: false, status: 'pendente' } : undefined,
          irpf: { uploaded: false, status: 'pendente' },
        },
  };
}

/** Preenchimento em lote (simulação): anexa e aprova todos os documentos do tipo de parte. */
export function fillPartnerForBulk(partner: PartnerData): PartnerData {
  const firstName = partner.name.split(' ')[0];
  if (partner.type === 'PJ') {
    return {
      ...partner,
      status: 'validado',
      docs: {
        contratoEstatutoSocialPj: { uploaded: true, fileName: `Contrato_Social_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined },
        beneficiariosFinaisPj: { uploaded: true, fileName: `Beneficiarios_Finais_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined },
      },
    };
  }

  if (partner.isNonPartner) {
    return {
      ...partner,
      status: 'validado',
      docs: {
        cnhRg: { uploaded: true, fileName: `Documento_Identidade_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined },
        residencia: { uploaded: true, fileName: `Comprovante_Residencia_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined },
      },
    };
  }

  const isMarried = isMarriedByLooseStatus(partner.maritalStatus);
  return {
    ...partner,
    status: 'validado',
    docs: {
      cnhRg: { uploaded: true, fileName: `CNH_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined },
      residencia: { uploaded: true, fileName: `Residencia_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined },
      certidaoCasamento: isMarried ? { uploaded: true, fileName: `Certidao_Casamento_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined } : undefined,
      documentoConjuge: isMarried ? { uploaded: true, fileName: `Documento_Conjuge_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined } : undefined,
      irpf: { uploaded: true, fileName: `IRPF_Recibo_RFB_${firstName}.pdf`, status: 'aprovado', note: 'Recibo RFB conferido', rejectionReason: undefined },
    },
  };
}

/** Simulação de ajustes: rejeita o IRPF do sócio indicado (dados não extraídos / recibo ausente). */
export function rejectPartnerIrpf(partner: PartnerData, partnerId: string): PartnerData {
  if (partner.id === partnerId) {
    return {
      ...partner,
      status: 'pendente_documentos',
      docs: {
        ...partner.docs,
        irpf: {
          uploaded: true,
          fileName: REJECTED_PARTNER_IRPF_FILE_NAME,
          status: 'rejeitado',
          rejectionReason: REJECTED_PARTNER_IRPF_REASON,
        },
      },
    };
  }
  return partner;
}
