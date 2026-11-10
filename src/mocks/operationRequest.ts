import type {
  DisbursementAccount,
  OperationFinalReviewData,
  OperationRejectedTitle,
  OperationSignature,
  OperationSummaryData,
  OperationXmlFile,
} from '@/types/operationRequest';

export const MOCK_OPERATION_ID = '#9921-A';

export const MOCK_DISBURSEMENT_ACCOUNTS: DisbursementAccount[] = [
  { id: '1', bank: 'Banco do Brasil', branch: '1234', account: '55667-8', type: 'Corrente' },
  { id: '2', bank: 'Itaú Unibanco', branch: '0010', account: '44332-1', type: 'Garantida' },
];

export const buildMockXmlFiles = (): OperationXmlFile[] => [
  { name: 'NFE_BOVINO_9921.xml', size: '1.2 MB' },
  { name: 'NFE_INSUMOS_8824.xml', size: '2.4 MB' },
];

export const INITIAL_OPERATION_SIGNATURES: OperationSignature[] = [
  { id: 1, name: 'Eduardo Santos (Você)', status: 'Pendente', role: 'Representante Legal' },
  { id: 2, name: 'Mariana Costa', status: 'Assinado', role: 'Sócia Administradora' },
];

export const MOCK_OPERATION_SUMMARY: OperationSummaryData = {
  totalTitles: '12',
  totalTitlesValue: 'R$ 515.200,00',
  acceptedTitles: '10',
  validatedValue: 'R$ 502.450,00',
  rate: '2.45% a.m',
  averageTerm: '45 Dias',
  rejectedValue: '- R$ 12.750,00',
  netValue: 'R$ 483.750,00',
};

export const MOCK_REJECTED_TITLES: OperationRejectedTitle[] = [
  { reason: 'Sacado com restritivos graves', invoice: 'NF-9923', value: 'R$ 8.500,00' },
  { reason: 'XML com assinatura inválida', invoice: 'NF-8812', value: 'R$ 4.250,00' },
];

export const MOCK_OPERATION_FINAL_REVIEW: OperationFinalReviewData = {
  nominalSent: 'R$ 515.200,00',
  nominalAccepted: 'R$ 502.450,00',
  netValue: 'R$ 468.750,00',
  deduction: '- R$ 15.000,00 (Dedução)',
  rate: '2.45% a.m',
  averageTerm: '45 Dias',
  operationId: MOCK_OPERATION_ID,
};
