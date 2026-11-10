import type { DocumentItem } from '@/types/documentChecklist';

export const OFFICIAL_DOCS: DocumentItem[] = [
  // Seção 3: Documentos Cadastrais da Empresa
  {
    id: 'pj-1',
    category: 'pj',
    title: 'Contrato Social ou Estatuto Social Vigente',
    description: 'Registrado na Junta Comercial ou órgão competente',
    requiredFor: ['middle_corporate', 'simples_pme'],
    status: 'aprovado',
    fileName: 'Contrato_Social_Consolidado.pdf',
    fileSize: '4.2 MB',
    uploadDate: '12/04/2026'
  },
  {
    id: 'pj-2',
    category: 'pj',
    title: 'Cópia da Ata de Eleição da Diretoria Vigente (só S/A)',
    description: 'Registrada no órgão competente (aplicável para Sociedades Anônimas - S/A)',
    requiredFor: ['middle_corporate'],
    status: 'em_analise',
    fileName: 'Ata_Eleicao_Diretoria.pdf',
    fileSize: '950 KB',
    uploadDate: 'Ontem'
  },
  {
    id: 'pj-3',
    category: 'pj',
    title: 'Última Alteração Contratual / Certidão Simplificada',
    description: 'Com nº do NIRE; se a alteração for superior a 3 anos, enviar certidão simplificada',
    requiredFor: ['middle_corporate', 'simples_pme'],
    status: 'aprovado',
    fileName: 'Ultima_Alteracao_NIRE.pdf',
    fileSize: '1.8 MB',
    uploadDate: '12/04/2026'
  },
  {
    id: 'pj-4',
    category: 'pj',
    title: 'Procuração Vigente (Obrigatória - procurador cadastrado)',
    description: 'Instrumento com outorga de poderes vigentes para representação legal da empresa',
    requiredFor: ['middle_corporate', 'simples_pme'],
    status: 'pendente'
  },
  {
    id: 'pj-5',
    category: 'pj',
    title: 'Organograma Societário',
    description: 'Estrutura até o beneficiário final',
    requiredFor: ['middle_corporate', 'simples_pme'],
    status: 'aprovado',
    fileName: 'Organograma_Societario.pdf',
    fileSize: '1.2 MB',
    uploadDate: '11/04/2026'
  },

  // Seção 4: Demonstrativos Financeiros & Contábeis
  {
    id: 'fin-1',
    category: 'financeiro',
    title: 'Balanço Patrimonial e DRE (últimos 4 exercícios) + balancete do período corrente',
    description: 'Últimos 4 exercícios + balancete do período corrente',
    requiredFor: ['middle_corporate', 'simples_pme'],
    optionalFor: ['simples_pme'],
    optionalNote: 'Não será obrigatório para empresas cadastradas pelo Simples Nacional.',
    status: 'em_analise',
    fileName: 'Balanco_DRE_4_Exercicios.pdf',
    fileSize: '8.4 MB',
    uploadDate: 'Ontem'
  },
  {
    id: 'fin-2',
    category: 'financeiro',
    title: 'Declaração de Faturamento Mensal',
    description: 'Últimos 4 exercícios + corrente até o mês anterior, assinada pelo contador',
    requiredFor: ['middle_corporate', 'simples_pme'],
    status: 'pendente'
  },
  {
    id: 'fin-3',
    category: 'financeiro',
    title: 'Demonstrativo de Endividamento Atualizado',
    description: 'Instituição financeira, modalidade, saldo devedor, garantias, taxa de juros, prazo de vencimento — SCR não substitui, papel timbrado com Razão Social/CNPJ, emissão dentro de 90 dias',
    requiredFor: ['middle_corporate', 'simples_pme'],
    status: 'pendente'
  },

  // Seção 5: Crédito & Relacionamento Bancário
  {
    id: 'cred-1',
    category: 'credito',
    title: 'Declaração de Relacionamento Bancário de Crédito',
    description: 'Em papel timbrado, indicando instituição (bancos), contato do gerente comercial, agência e número da conta; datada e assinada, dentro de 90 dias',
    requiredFor: ['middle_corporate', 'simples_pme'],
    status: 'em_analise',
    fileName: 'Declaracao_Relacionamento_Bancario.pdf',
    fileSize: '620 KB',
    uploadDate: 'Hoje'
  }
];
