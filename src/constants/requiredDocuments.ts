/** Trechos do tipo societário que indicam empresa regida por Estatuto Social. */
export const ESTATUTO_COMPANY_TYPE_KEYWORDS: string[] = [
  'anônima',
  's/a',
  'estatuto',
  'cooperativa',
  'associação',
];

export const CONSTITUTIVE_DOC_TITLE_ESTATUTO = 'Estatuto Social Vigente';
export const CONSTITUTIVE_DOC_TITLE_DEFAULT = 'Contrato / Estatuto Social';

export const DOCUMENT_ENTITY_COMPANY = 'Empresa';
export const DOCUMENT_ENTITY_PARTNER = 'Sócio';
export const DOCUMENT_ENTITY_LEGAL_REPRESENTATIVE = 'Representante legal';
export const DOCUMENT_ENTITY_HOLDER = 'Correntista';

export const LEGAL_REPRESENTATIVE_ROLE_LABEL = 'Representante Legal / Diretor Presidente';
export const DEFAULT_PARTNER_ROLE_LABEL = 'Sócio Diretor';
export const PF_HOLDER_ROLE_LABEL = 'Titular / Correntista';

export const PF_HOLDER_DOC_ID = 'pf-doc-identificacao';

export const IDENTITY_DOC_TYPE = 'Documento de Identificação';
export const IDENTITY_DOC_TITLE = 'Documento de Identificação Oficial (CNH, RG, RNE ou CIN)';
export const IDENTITY_DOC_DESCRIPTION_PF_HOLDER =
  'Aceitos: CNH, RG, RNE ou CIN (frente e verso ou versão digital). Formatos: JPG, JPEG, PNG ou PDF (base64) até 12MB.';
export const IDENTITY_DOC_DESCRIPTION_PF_PARTNER =
  'Aceitos: CNH, RG, RNE ou CIN (frente e verso ou versão digital). Formatos: JPG, JPEG, PNG ou PDF até 12MB.';
export const IDENTITY_DOC_DESCRIPTION_PJ = 'Aceitos: CNH, RG, RNE ou CIN. Formatos: JPG, JPEG, PNG ou PDF até 12MB.';

export const CONTRACT_DOC_ID = 'pj-contrato-estatuto';
export const CONTRACT_DOC_TYPE = 'Contrato/Estatuto Social';
export const CONTRACT_DOC_DESCRIPTION =
  'Contrato Social consolidado, Estatuto ou documento constitutivo registrado na Junta Comercial ou Cartório.';

export const ELECTION_MINUTES_DOC_ID = 'pj-ata-eleicao';
export const ELECTION_MINUTES_DOC_TYPE = 'Ata de Eleição de Diretoria';
export const ELECTION_MINUTES_DOC_TITLE = 'Ata de Eleição de Diretoria';
export const ELECTION_MINUTES_DOC_DESCRIPTION =
  'Documento societário de eleição e posse da diretoria atual registrada. Este documento só aparece quando a empresa for Sociedade Anônima (S/A).';

export const POWER_OF_ATTORNEY_DOC_ID = 'pj-procuracao';
export const POWER_OF_ATTORNEY_DOC_TYPE = 'Procuração';
export const POWER_OF_ATTORNEY_TITLE_REQUIRED = 'Procuração Vigente (Obrigatória)';
export const POWER_OF_ATTORNEY_TITLE_OPTIONAL = 'Procuração';
export const POWER_OF_ATTORNEY_DESCRIPTION_REQUIRED =
  'Instrumento público ou particular com outorga de poderes de representação (obrigatório para representantes do tipo Procurador).';
export const POWER_OF_ATTORNEY_DESCRIPTION_OPTIONAL =
  'Instrumento público ou particular com outorga de poderes de representação e movimentação financeira da empresa.';

export const MARRIAGE_CERTIFICATE_DOC_TYPE = 'Certidão de Casamento';
export const MARRIAGE_CERTIFICATE_DOC_DESCRIPTION =
  'Certidão de Casamento atualizada e legível. Formatos: JPG, JPEG, PNG ou PDF até 12MB.';
export const STABLE_UNION_DOC_TYPE = 'Contrato ou Escritura de União Estável';
export const STABLE_UNION_DOC_DESCRIPTION =
  'Contrato ou escritura pública de União Estável registrada. Formatos: JPG, JPEG, PNG ou PDF até 12MB.';

export const MARRIED_STATUSES: string[] = ['Casado(a)', 'Casado'];
export const STABLE_UNION_STATUSES: string[] = ['União Estável', 'Uniao Estavel'];
