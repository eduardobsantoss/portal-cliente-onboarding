/**
 * Documentos da empresa e dos sócios exigidos no Envio de Documentos (antes ficavam em "Completar cadastro").
 * `PIPEFY_TYPE_*` são os `typeId` do webhook do Pipefy, para a integração futura.
 */

/** Exercícios fechados pedidos para Balanço/DRE, Faturamento e DAS. */
export const FINANCIAL_CLOSED_YEARS: number[] = [2023, 2024, 2025];
/** Ano do período corrente (balancete e faturamento até o mês anterior). */
export const FINANCIAL_CURRENT_YEAR = 2026;

export const PIPEFY_TYPE_CONTRATO = 22;
export const PIPEFY_TYPE_CERTIDAO_SIMPLIFICADA = 88;
export const PIPEFY_TYPE_ORGANOGRAMA = 94;
export const PIPEFY_TYPE_BALANCO_DRE = 25;
export const PIPEFY_TYPE_FATURAMENTO = 23;
export const PIPEFY_TYPE_ENDIVIDAMENTO = 24;
export const PIPEFY_TYPE_RESIDENCIA = 19;
export const PIPEFY_TYPE_IRPF = 20;

export const AMENDMENT_DOC_ID = 'pj-alteracao-contratual';
export const AMENDMENT_DOC_TYPE = 'Última Alteração Contratual / Certidão Simplificada';
export const AMENDMENT_DOC_DESCRIPTION =
  'Com nº do NIRE. Se a última alteração for superior a 3 anos, envie a certidão simplificada.';

export const ORG_CHART_DOC_ID = 'pj-organograma';
export const ORG_CHART_DOC_TYPE = 'Organograma Societário';
export const ORG_CHART_DOC_DESCRIPTION = 'Estrutura societária até o beneficiário final.';

export const DEBT_STATEMENT_DOC_ID = 'pj-endividamento';
export const DEBT_STATEMENT_DOC_TYPE = 'Demonstrativo de Endividamento';
export const DEBT_STATEMENT_DOC_TITLE = 'Demonstrativo de Endividamento Atualizado';
export const DEBT_STATEMENT_DOC_DESCRIPTION =
  'Instituição financeira, modalidade, saldo devedor, garantias, taxa de juros e prazo de vencimento. O SCR não substitui. Papel timbrado com Razão Social e CNPJ, emitido há no máximo 90 dias.';

export const BALANCE_SECTION = 'Balanço Patrimonial e DRE';
export const BALANCE_DOC_TYPE = 'Balanço Patrimonial e DRE';
export const BALANCE_CLOSED_DESCRIPTION =
  'Balanço Patrimonial e DRE do exercício, assinados pelo contador.';
export const BALANCE_CURRENT_TITLE = 'Balancete do período corrente';
export const BALANCE_CURRENT_DESCRIPTION =
  'Balancete do período corrente (2026) até o mês anterior, assinado pelo contador.';

export const REVENUE_SECTION = 'Declaração de Faturamento Mensal';
export const REVENUE_DOC_TYPE = 'Declaração de Faturamento Mensal';
export const REVENUE_CLOSED_DESCRIPTION =
  'Faturamento mês a mês do exercício, assinado pelo contador.';
export const REVENUE_CURRENT_TITLE = 'Faturamento Mensal do período corrente';
export const REVENUE_CURRENT_DESCRIPTION =
  'Faturamento mês a mês de 2026 até o mês anterior, assinado pelo contador.';

export const DAS_SECTION = 'DAS (Simples Nacional)';
export const DAS_DOC_TYPE = 'DAS - Simples Nacional';
export const DAS_CLOSED_DESCRIPTION =
  'Guias de pagamento do DAS (ou extrato do PGDAS-D) do exercício, comprovando o faturamento. Substituem o Balanço para empresas do Simples Nacional.';
export const DAS_CURRENT_TITLE = 'DAS do período corrente';
export const DAS_CURRENT_DESCRIPTION =
  'Guias do DAS (ou extrato do PGDAS-D) de 2026 até o mês anterior.';

export const RESIDENCE_PROOF_DOC_TYPE = 'Comprovante de Residência';
export const RESIDENCE_PROOF_DOC_TITLE = 'Comprovante de Residência (até 90 dias)';
export const RESIDENCE_PROOF_DOC_DESCRIPTION =
  'Conta de consumo ou documento em nome do sócio, emitido há no máximo 90 dias.';

export const IRPF_DOC_TYPE = 'Declaração de IRPF + recibo de entrega';
export const IRPF_DOC_DESCRIPTION =
  'Declaração completa do último exercício com o respectivo recibo de entrega da Receita Federal.';
