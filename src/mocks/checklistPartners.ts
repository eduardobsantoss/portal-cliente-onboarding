import type { PartnerData } from '@/types/documentChecklist';

export const INITIAL_PARTNERS: PartnerData[] = [
  {
    id: 'partner-1',
    name: 'Eduardo Santos',
    type: 'PF',
    role: 'Sócio Administrador (Representante Legal)',
    cpf: '218.490.128-44',
    email: 'eduardo.santos@ceresinvestimentos.com',
    phone: '(11) 98765-4321',
    quotaPercentage: 45,
    maritalStatus: 'Casado (Comunhão Parcial)',
    status: 'validado',
    docs: {
      documentoConjuge: { uploaded: true, fileName: 'CNH_Conjuge_Juliana_Santos.pdf', status: 'aprovado' },
    }
  },
  {
    id: 'partner-2',
    name: 'Mariana Costa Albuquerque',
    type: 'PF',
    role: 'Sócia Administradora',
    cpf: '345.892.678-11',
    email: 'mariana.costa@agrotech.com.br',
    phone: '(11) 97654-3210',
    quotaPercentage: 25,
    maritalStatus: 'Solteira',
    status: 'validado',
    docs: {}
  },
  {
    id: 'partner-3',
    name: 'Roberto Mendes Fagundes',
    type: 'PF',
    role: 'Sócio Cotista',
    cpf: '109.338.450-89',
    email: 'roberto.fagundes@agrotech.com.br',
    phone: '(19) 99123-8899',
    quotaPercentage: 15,
    maritalStatus: 'Casado',
    status: 'pendente_documentos',
    docs: {
      documentoConjuge: { uploaded: false, status: 'pendente' },
    }
  },
  {
    id: 'partner-4',
    name: 'Agro Holding Participações S/A',
    type: 'PJ',
    role: 'Sócio Pessoa Jurídica',
    cpf: '45.890.123/0001-77',
    email: 'juridico@agroholding.com.br',
    phone: '(11) 3234-5678',
    quotaPercentage: 15,
    status: 'validado',
    docs: {
      contratoEstatutoSocialPj: { uploaded: true, fileName: 'Estatuto_Social_Consolidado_AgroHolding.pdf', status: 'aprovado' },
      beneficiariosFinaisPj: { uploaded: true, fileName: 'Identificacao_Beneficiarios_Finais_AgroHolding.pdf', status: 'aprovado' }
    }
  },
  {
    id: 'partner-rep-1',
    name: 'Carlos Henrique Lima',
    type: 'PF',
    role: 'Procurador Constituído',
    isNonPartner: true,
    vinculo: 'Procurador',
    cpf: '541.289.012-77',
    email: 'carlos.lima@agrotech.com.br',
    phone: '(34) 99876-5432',
    quotaPercentage: 0,
    status: 'pendente_documentos',
    docs: {
      cnhRg: { uploaded: false, status: 'pendente' },
      residencia: { uploaded: false, status: 'pendente' },
    }
  }
];
