import type { PartnerDocKey } from '@/types/documentChecklist';

export interface PartnerDocField {
  docKey: PartnerDocKey;
  label: string;
  note?: string;
  previewTitle: string;
  /** Só exibido quando a parte tem cônjuge (casado/união estável ou documento já enviado). */
  requiresSpouse?: boolean;
}

/** Representantes não sócios (procurador / administrador): apenas identidade e residência. */
export const NON_PARTNER_DOC_FIELDS: PartnerDocField[] = [
  {
    docKey: 'cnhRg',
    label: 'Documento de Identidade (RG ou CNH)',
    note: 'Identificação oficial com foto do representante legal',
    previewTitle: 'Documento de Identidade (RG ou CNH)',
  },
  {
    docKey: 'residencia',
    label: 'Comprovante de Residência (até 90 dias)',
    note: 'Comprovante residencial em nome do representante',
    previewTitle: 'Comprovante de Residência',
  },
];

/** Sócios / avalistas Pessoa Jurídica. */
export const PJ_PARTNER_DOC_FIELDS: PartnerDocField[] = [
  {
    docKey: 'contratoEstatutoSocialPj',
    label: 'Contrato Social ou Estatuto Social atualizado',
    note: 'Registrado no órgão competente com as últimas alterações consolidado',
    previewTitle: 'Contrato Social ou Estatuto Social',
  },
  {
    docKey: 'beneficiariosFinaisPj',
    label: 'Documentação dos beneficiários finais (identificação + CPF/CNH)',
    note: 'Identificação oficial com foto e CPF/CNH de todos os beneficiários finais',
    previewTitle: 'Documentação dos Beneficiários Finais',
  },
];

/**
 * Sócios Pessoa Física: identidade, residência, IRPF e certidão de estado civil já são enviados no
 * "Envio de Documentos". Aqui resta apenas o documento do cônjuge (condicional).
 */
export const PF_PARTNER_DOC_FIELDS: PartnerDocField[] = [
  {
    docKey: 'documentoConjuge',
    label: 'Documento de Identidade do Cônjuge (RG ou CNH)',
    note: 'Identificação oficial com foto do(a) cônjuge ou companheiro(a)',
    previewTitle: 'Documento de Identidade do Cônjuge',
    requiresSpouse: true,
  },
];
