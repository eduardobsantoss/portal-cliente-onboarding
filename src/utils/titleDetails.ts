import {
  TITLE_CEDENTE_DOCUMENT,
  TITLE_CEDENTE_NAME,
  TITLE_CESSION_CODE,
  TITLE_CESSION_RATE,
  TITLE_NOT_EXTENDED_LABEL,
  TITLE_PAYMENT_STATUS,
} from '@/mocks/titleDetails';
import type { InfoItem } from '@/types/dashboard';
import type { Titulo } from '@/types/titulo';

export function buildTituloRegistroInfo(titulo: Titulo): InfoItem[] {
  return [
    { label: 'Sacado', value: titulo.sacado },
    { label: 'Número do Título', value: titulo.numero + '-1' },
    { label: 'Lastro', value: titulo.lastro },
    { label: 'Nome da Cedente', value: TITLE_CEDENTE_NAME },
    { label: 'Documento', value: TITLE_CEDENTE_DOCUMENT },
    { label: 'Código da Cessão', value: TITLE_CESSION_CODE },
    { label: 'Situação do título', value: titulo.status },
    { label: 'Situação pagamento', value: TITLE_PAYMENT_STATUS },
  ];
}

export function buildTituloPrazosInfo(titulo: Titulo): InfoItem[] {
  return [
    { label: 'Vencimento', value: titulo.vencimento },
    { label: 'Data de Emissão', value: titulo.criacao },
    { label: 'Data de Envio', value: titulo.criacao },
    { label: 'Data de Aprovação', value: '-' },
    { label: 'Valor Emissão', value: titulo.valorNominal },
    { label: 'Valor de Compra', value: titulo.valorAquisicao },
    { label: 'Valor Presente', value: titulo.valorPresente },
    { label: 'Taxa da Cessão', value: TITLE_CESSION_RATE },
    { label: 'Data Termo Cessão', value: titulo.criacao },
    { label: 'Data Prorrogação', value: titulo.vencimento },
    { label: 'Valor Prorrogação', value: TITLE_NOT_EXTENDED_LABEL },
    { label: 'Taxa Juros Prorrogação', value: TITLE_NOT_EXTENDED_LABEL },
  ];
}
