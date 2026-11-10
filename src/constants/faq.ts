import type { FaqItem } from '@/types/faq';

export const FAQ_DEFAULT_EXPANDED_ID = 'faq-1';
export const SUPPORT_DEFAULT_PHONE = '(11) 98877-6655';

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Financeiro',
    question: 'Por que são solicitados 4 exercícios de Balanço Patrimonial e DRE?',
    answer: 'Para o segmento Middle Corporate, a análise de 4 exercícios consecutivos permite à mesa de crédito compreender a evolução histórica de liquidez, margens operacionais e consistência de faturamento ao longo dos ciclos. Não será obrigatório para empresas cadastradas pelo Simples Nacional.'
  },
  {
    id: 'faq-2',
    category: 'Endividamento',
    question: 'O extrato do SCR (Bacen) substitui o Demonstrativo de Endividamento?',
    answer: 'Não. O Demonstrativo de Endividamento deve ser emitido obrigatoriamente em papel timbrado da própria empresa (com até 90 dias de emissão), assinado pelo representante legal ou contador com CRC, detalhando credores bancários, saldos devedores, taxas e garantias prestadas.'
  },
  {
    id: 'faq-3',
    category: 'Sócios & IRPF',
    question: 'O que é obrigatório na declaração de IRPF dos sócios?',
    answer: 'A declaração de IRPF completa do último exercício fiscal deve ser enviada acompanhada obrigatoriamente do seu respectivo recibo de entrega. O envio sem o comprovante impede a validação da capacidade patrimonial dos avalistas.'
  },
  {
    id: 'faq-4',
    category: 'Cadastral PJ',
    question: 'Qual certidão da Junta Comercial devo enviar se a alteração for antiga?',
    answer: 'Se a última alteração contratual consolidada possuir mais de 3 anos de registro na Junta Comercial, é necessário anexar a Certidão Simplificada da Junta Comercial emitida nos últimos 90 dias para atestar a vigência dos administradores.'
  },
  {
    id: 'faq-5',
    category: 'Faturamento',
    question: 'Como deve ser elaborada a Declaração de Faturamento Mensal?',
    answer: 'Deve discriminar mês a mês o faturamento bruto dos últimos 12 meses, redigida em papel timbrado e com assinatura obrigatória do contador responsável (com número de registro CRC ativo).'
  },
  {
    id: 'faq-6',
    category: 'Prazos & Limite',
    question: 'Qual o prazo de análise e liberação após o envio dos arquivos?',
    answer: 'A leitura e pré-conferência via OCR ocorrem em poucos segundos. A validação final pela equipe de compliance e liberação do limite operacional para antecipação de recebíveis ocorre em até 5 dias úteis.'
  }
];
