import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  X, 
  Download, 
  ShieldCheck, 
  Building2, 
  User, 
  Users,
  ChevronDown, 
  Plus, 
  Check, 
  HelpCircle, 
  Smartphone, 
  Layers, 
  Trash2, 
  AlertTriangle,
  RotateCcw,
  Eye,
  FileCheck,
  Edit2,
  QrCode
} from 'lucide-react';
import { SmsVerification } from '@/flows/onboarding/sms/SmsVerification';
import { FacialVerification } from './FacialVerification';
import { SupportFaqModal } from '@/components/support/SupportFaqModal';

export type CompanyTier = 'middle_corporate' | 'simples_pme';
export type PartnerPersonType = 'PF' | 'PJ';

export interface PartnerDocState {
  uploaded: boolean;
  fileName?: string;
  status: 'aprovado' | 'em_analise' | 'pendente' | 'rejeitado';
  note?: string;
  rejectionReason?: string;
}

export interface PartnerData {
  id: string;
  name: string;
  role: string;
  type: PartnerPersonType;
  isNonPartner?: boolean;
  vinculo?: 'Administrador não sócio' | 'Procurador';
  cpf: string; // CPF (PF) ou CNPJ (PJ)
  email: string;
  phone: string;
  quotaPercentage: number;
  maritalStatus?: string;
  status: 'validado' | 'em_analise' | 'pendente_documentos';
  docs: {
    // Documentos para Pessoa Física (PF)
    cnhRg?: PartnerDocState;
    residencia?: PartnerDocState;
    certidaoCasamento?: PartnerDocState; // "Certidão de Casamento / Contrato de União Estável / Averbação de Divórcio"
    documentoConjuge?: PartnerDocState; // "Documento de Identidade do Cônjuge (RG ou CNH)"
    irpf?: PartnerDocState; // "Declaração de IRPF + recibo de entrega"

    // Documentos para sócio(s) e/ou avalista(s) Pessoa Jurídica (PJ)
    contratoEstatutoSocialPj?: PartnerDocState; // "Contrato Social ou Estatuto Social atualizado"
    beneficiariosFinaisPj?: PartnerDocState; // "Documentação dos beneficiários finais (documento de identificação + CPF/CNH)"
  };
}

export interface DocumentItem {
  id: string;
  category: 'pj' | 'financeiro' | 'credito';
  title: string;
  description: string;
  requiredFor: CompanyTier[];
  optionalFor?: CompanyTier[];
  optionalNote?: string;
  status: 'aprovado' | 'em_analise' | 'pendente' | 'rejeitado';
  rejectionReason?: string;
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
}

const INITIAL_PARTNERS: PartnerData[] = [
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
      cnhRg: { uploaded: true, fileName: 'CNH_Eduardo_Santos.pdf', status: 'aprovado' },
      residencia: { uploaded: true, fileName: 'Comprovante_Residencia_Eduardo_Santos.pdf', status: 'aprovado' },
      certidaoCasamento: { uploaded: true, fileName: 'Certidao_Casamento_Eduardo_Santos.pdf', status: 'aprovado' },
      documentoConjuge: { uploaded: true, fileName: 'CNH_Conjuge_Juliana_Santos.pdf', status: 'aprovado' },
      irpf: { uploaded: true, fileName: 'IRPF_2025_Eduardo_Santos_Recibo.pdf', status: 'aprovado', note: 'Recibo RFB validado' },
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
    status: 'em_analise',
    docs: {
      cnhRg: { uploaded: true, fileName: 'RG_Mariana_Costa.pdf', status: 'aprovado' },
      residencia: { uploaded: true, fileName: 'Fatura_Residencial_Mariana.pdf', status: 'em_analise' },
      irpf: { uploaded: true, fileName: 'IRPF_Mariana_2025.pdf', status: 'em_analise', note: 'Checagem de recibo em andamento' },
    }
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
      cnhRg: { uploaded: true, fileName: 'CNH_Roberto_Mendes.pdf', status: 'aprovado' },
      residencia: { uploaded: false, status: 'pendente' },
      certidaoCasamento: { uploaded: false, status: 'pendente' },
      documentoConjuge: { uploaded: false, status: 'pendente' },
      irpf: { uploaded: false, status: 'pendente', note: 'Declaração e recibo RFB obrigatórios' },
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

const OFFICIAL_DOCS: DocumentItem[] = [
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

interface DocumentVerificationProps {
  onCompleteVerification?: () => void;
  isVerified?: boolean;
  onResetVerification?: () => void;
}

export const DocumentVerification: React.FC<DocumentVerificationProps> = ({
  onCompleteVerification,
  isVerified = false,
  onResetVerification
}) => {
  // Segment Tier (Discreet toggle)
  const [companyTier, setCompanyTier] = useState<CompanyTier>('middle_corporate');
  
  // Phone verification state - starts as Concluído per Item 2
  const [phoneVerified, setPhoneVerified] = useState(true);
  const [phoneVerifiedAt, setPhoneVerifiedAt] = useState('10/05/2026 às 14:32');
  
  // Facial verification state
  const [facialVerified, setFacialVerified] = useState(false);

  // Expanded topics state
  const [expandedTopics, setExpandedTopics] = useState<{ [key: string]: boolean }>({
    sms: true,
    biometria: false,
    pj: false,
    financeiro: false,
    credito: false,
    socios: false
  });

  // Expanded partner ID inside the socios topic
  const [expandedPartnerId, setExpandedPartnerId] = useState<string | null>('partner-3');

  // Documents & Partners state
  const [docs, setDocs] = useState<DocumentItem[]>(OFFICIAL_DOCS);
  const [partners, setPartners] = useState<PartnerData[]>(INITIAL_PARTNERS);

  // Document validation loading state
  const [isValidatingDocuments, setIsValidatingDocuments] = useState(false);
  const [hasValidationErrors, setHasValidationErrors] = useState(false);

  // Modals state
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<{ title: string; fileName: string } | null>(null);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);
  const [newPartner, setNewPartner] = useState<{
    name: string;
    type: PartnerPersonType;
    role: string;
    cpf: string;
    email: string;
    phone: string;
    quotaPercentage: number;
    maritalStatus: string;
  }>({
    name: '',
    type: 'PF',
    role: 'Sócio Cotista',
    cpf: '',
    email: '',
    phone: '',
    quotaPercentage: 10,
    maritalStatus: 'Casado'
  });

  // Filter docs for active tier
  const activeDocs = docs.filter(d => d.requiredFor.includes(companyTier));
  const pjDocs = activeDocs.filter(d => d.category === 'pj');
  const finDocs = activeDocs.filter(d => d.category === 'financeiro');
  const credDocs = activeDocs.filter(d => d.category === 'credito');

  // Toggle single topic
  const toggleTopic = (key: string) => {
    setExpandedTopics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper for topic progress calculation
  const getSectionStats = (items: DocumentItem[], tier: CompanyTier) => {
    const total = items.length;
    const approved = items.filter(i => i.status === 'aprovado').length;
    const inAnalysis = items.filter(i => i.status === 'em_analise').length;
    const requiredItems = items.filter(i => !i.optionalFor?.includes(tier));
    const isDone = requiredItems.length > 0 && requiredItems.every(i => i.status === 'aprovado' || i.status === 'em_analise');
    return { total, approved, inAnalysis, isDone };
  };

  // Helper to check if a partner is fully validated
  const isPartnerValidCheck = (partner: PartnerData): boolean => {
    if (partner.isNonPartner) {
      // Non-partner legal representatives require ONLY Identity Document and Residence Proof
      const cnhOk = Boolean(partner.docs.cnhRg?.uploaded && partner.docs.cnhRg.status !== 'rejeitado');
      const resOk = Boolean(partner.docs.residencia?.uploaded && partner.docs.residencia.status !== 'rejeitado');
      return cnhOk && resOk;
    }

    if (partner.type === 'PJ') {
      return Boolean(
        partner.docs.contratoEstatutoSocialPj?.uploaded &&
        partner.docs.contratoEstatutoSocialPj.status !== 'rejeitado' &&
        partner.docs.beneficiariosFinaisPj?.uploaded &&
        partner.docs.beneficiariosFinaisPj.status !== 'rejeitado'
      );
    }

    // PF:
    const cnhOk = Boolean(partner.docs.cnhRg?.uploaded && partner.docs.cnhRg.status !== 'rejeitado');
    const resOk = Boolean(partner.docs.residencia?.uploaded && partner.docs.residencia.status !== 'rejeitado');
    const irpfOk = Boolean(partner.docs.irpf?.uploaded && partner.docs.irpf.status !== 'rejeitado');

    const isMarriedOrHasSpouse = 
      partner.maritalStatus?.toLowerCase().includes('casad') ||
      partner.maritalStatus?.toLowerCase().includes('união') ||
      partner.maritalStatus?.toLowerCase().includes('uniao') ||
      Boolean(partner.docs.certidaoCasamento?.uploaded) ||
      Boolean(partner.docs.documentoConjuge?.uploaded);

    if (isMarriedOrHasSpouse) {
      const certOk = Boolean(partner.docs.certidaoCasamento?.uploaded && partner.docs.certidaoCasamento.status !== 'rejeitado');
      const conjOk = Boolean(partner.docs.documentoConjuge?.uploaded && partner.docs.documentoConjuge.status !== 'rejeitado');
      return cnhOk && resOk && irpfOk && certOk && conjOk;
    }

    return cnhOk && resOk && irpfOk;
  };

  const pjStats = getSectionStats(pjDocs, companyTier);
  const finStats = getSectionStats(finDocs, companyTier);
  const credStats = getSectionStats(credDocs, companyTier);
  const partnersValidCount = partners.filter(p => p.status === 'validado').length;
  const partnersDone = partners.length > 0 && partnersValidCount === partners.length;

  // Global completed count (6 topics)
  const completedTopicsCount = [
    phoneVerified,
    facialVerified,
    pjStats.isDone,
    finStats.isDone,
    credStats.isDone,
    partnersDone
  ].filter(Boolean).length;

  const totalTopics = 6;

  // Check if any rejected document exists
  const hasRejectedDocs = docs.some(d => d.status === 'rejeitado') ||
    partners.some(p => {
      const docValues = Object.values(p.docs || {}) as (PartnerDocState | undefined)[];
      return docValues.some(d => d?.status === 'rejeitado');
    });

  // Single file upload handler
  const handleFileUpload = (docId: string, file: File) => {
    setDocs(current => current.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status: 'aprovado',
          rejectionReason: undefined,
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024) || 1.5).toFixed(1)} MB`,
          uploadDate: 'Agora mesmo'
        };
      }
      return doc;
    }));
  };

  // Partner file upload handler
  const handlePartnerDocUpload = (
    partnerId: string,
    docType: 
      | 'cnhRg'
      | 'residencia'
      | 'certidaoCasamento'
      | 'documentoConjuge'
      | 'irpf'
      | 'contratoEstatutoSocialPj'
      | 'beneficiariosFinaisPj',
    file: File
  ) => {
    setPartners(current => current.map(p => {
      if (p.id === partnerId) {
        const updatedDocs = {
          ...p.docs,
          [docType]: {
            uploaded: true,
            fileName: file.name,
            status: 'aprovado' as const,
            rejectionReason: undefined,
            note: docType === 'irpf' ? 'Recibo RFB validado' : undefined
          }
        };

        const updatedPartner: PartnerData = {
          ...p,
          docs: updatedDocs
        };

        const valid = isPartnerValidCheck(updatedPartner);

        return {
          ...updatedPartner,
          status: valid ? ('validado' as const) : ('em_analise' as const)
        };
      }
      return p;
    }));
  };

  // Approve validation action
  const handleApproveValidation = () => {
    setIsValidatingDocuments(false);
    setHasValidationErrors(false);
    onCompleteVerification?.();
  };

  // Simulate adjustments needed action (with realistic issues like no sharpness / unreadable data)
  const handleSimulateAdjustments = () => {
    setIsValidatingDocuments(false);
    setHasValidationErrors(true);

    // Set Contrato Social as rejected due to sharpness/edges issue
    setDocs(current => current.map(doc => {
      if (doc.id === 'pj-1') {
        return {
          ...doc,
          status: 'rejeitado',
          rejectionReason: 'Imagem sem nitidez / margens cortadas. Por favor, anexe o documento digitalizado legível com todas as páginas e assinaturas.'
        };
      }
      return doc;
    }));

    // Set Partner 3 IRPF as rejected due to unextracted data / missing RFB receipt
    setPartners(current => current.map(p => {
      if (p.id === 'partner-3') {
        return {
          ...p,
          status: 'pendente_documentos',
          docs: {
            ...p.docs,
            irpf: {
              uploaded: true,
              fileName: 'IRPF_Roberto_Mendes.pdf',
              status: 'rejeitado',
              rejectionReason: 'Não foi possível validar os dados do arquivo. Certifique-se de anexar o documento completo e legível com o respectivo comprovante de entrega.'
            }
          }
        };
      }
      return p;
    }));

    // Open the relevant accordions
    setExpandedTopics(prev => ({
      ...prev,
      pj: true,
      socios: true
    }));
    setExpandedPartnerId('partner-3');
  };

  // Quick action: Upload All (Simulação) -> Triggers real-time document validation
  const handleQuickUploadAll = () => {
    setIsBulkUploading(true);
    setTimeout(() => {
      setPhoneVerified(true);
      setFacialVerified(true);
      setHasValidationErrors(false);

      setDocs(current => current.map(d => ({
        ...d,
        status: 'aprovado',
        rejectionReason: undefined,
        fileName: d.fileName || `${d.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20)}_Assinado.pdf`,
        fileSize: d.fileSize || '2.4 MB',
        uploadDate: 'Agora mesmo'
      })));

      setPartners(current => current.map(p => {
        const firstName = p.name.split(' ')[0];
        if (p.type === 'PJ') {
          return {
            ...p,
            status: 'validado',
            docs: {
              contratoEstatutoSocialPj: { uploaded: true, fileName: `Contrato_Social_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined },
              beneficiariosFinaisPj: { uploaded: true, fileName: `Beneficiarios_Finais_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined }
            }
          };
        }

        if (p.isNonPartner) {
          return {
            ...p,
            status: 'validado',
            docs: {
              cnhRg: { uploaded: true, fileName: `Documento_Identidade_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined },
              residencia: { uploaded: true, fileName: `Comprovante_Residencia_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined }
            }
          };
        }

        const isMarried = p.maritalStatus?.toLowerCase().includes('casad') || p.maritalStatus?.toLowerCase().includes('união');
        return {
          ...p,
          status: 'validado',
          docs: {
            cnhRg: { uploaded: true, fileName: `CNH_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined },
            residencia: { uploaded: true, fileName: `Residencia_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined },
            certidaoCasamento: isMarried ? { uploaded: true, fileName: `Certidao_Casamento_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined } : undefined,
            documentoConjuge: isMarried ? { uploaded: true, fileName: `Documento_Conjuge_${firstName}.pdf`, status: 'aprovado', rejectionReason: undefined } : undefined,
            irpf: { uploaded: true, fileName: `IRPF_Recibo_RFB_${firstName}.pdf`, status: 'aprovado', note: 'Recibo RFB conferido', rejectionReason: undefined }
          }
        };
      }));

      setIsBulkUploading(false);
      setIsValidatingDocuments(true);
    }, 400);
  };

  // Reset to initial state
  const handleResetState = () => {
    setPhoneVerified(true);
    setPhoneVerifiedAt('10/05/2026 às 14:32');
    setFacialVerified(false);
    setIsValidatingDocuments(false);
    setHasValidationErrors(false);
    setDocs(OFFICIAL_DOCS);
    setPartners(INITIAL_PARTNERS);
    onResetVerification?.();
  };

  // Add new partner
  const handleAddPartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartner.name || !newPartner.cpf) return;

    const isPJ = newPartner.type === 'PJ';
    const isMarried = !isPJ && (newPartner.maritalStatus === 'Casado' || newPartner.maritalStatus === 'União Estável');

    const partner: PartnerData = {
      id: `partner-${Date.now()}`,
      name: newPartner.name,
      type: newPartner.type,
      role: newPartner.role,
      cpf: newPartner.cpf,
      email: newPartner.email || (isPJ ? 'contato@empresa.com.br' : 'socio@empresa.com.br'),
      phone: newPartner.phone || '(11) 99999-0000',
      quotaPercentage: Number(newPartner.quotaPercentage) || 10,
      maritalStatus: isPJ ? undefined : newPartner.maritalStatus,
      status: 'pendente_documentos',
      docs: isPJ ? {
        contratoEstatutoSocialPj: { uploaded: false, status: 'pendente' },
        beneficiariosFinaisPj: { uploaded: false, status: 'pendente' }
      } : {
        cnhRg: { uploaded: false, status: 'pendente' },
        residencia: { uploaded: false, status: 'pendente' },
        certidaoCasamento: isMarried ? { uploaded: false, status: 'pendente' } : undefined,
        documentoConjuge: isMarried ? { uploaded: false, status: 'pendente' } : undefined,
        irpf: { uploaded: false, status: 'pendente' }
      }
    };

    setPartners(prev => [...prev, partner]);
    setExpandedPartnerId(partner.id);
    setShowAddPartnerModal(false);
    setNewPartner({
      name: '',
      type: 'PF',
      role: 'Sócio Cotista',
      cpf: '',
      email: '',
      phone: '',
      quotaPercentage: 10,
      maritalStatus: 'Casado'
    });
  };

  // Real-time document validation loading view
  if (isValidatingDocuments) {
    return (
      <div className="max-w-2xl mx-auto py-6 animate-in fade-in duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 text-center space-y-6"
        >
          <div className="text-center py-6 md:py-10 space-y-8">
            {/* 1. Anel Giratório com Pulso Central */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              {/* Brilho externo pulsante */}
              <div className="absolute inset-0 rounded-full bg-[#004A2F]/10 animate-ping opacity-75" />
              
              {/* Anel giratório bicolor (Verde GCI e Laranja Agro) */}
              <div className="absolute inset-0 rounded-full border-4 border-gray-100 border-t-[#004A2F] border-r-[#FF7300] animate-spin" />
              
              {/* Círculo central com escudo pulsante */}
              <div className="w-20 h-20 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#004A2F] relative z-10">
                <ShieldCheck size={36} className="text-[#FF7300] animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Validando documentação
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
                Estamos conferindo a nitidez, integridade e conformidade de todos os dados e anexos enviados.
              </p>
            </div>

            {/* Simulation controls */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Controles de Simulação
              </span>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handleApproveValidation}
                  className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-gci/15 flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <CheckCircle2 size={15} />
                  Aprovar Validação
                </button>

                <button
                  type="button"
                  onClick={handleSimulateAdjustments}
                  className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/15 flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <AlertTriangle size={15} />
                  Ajustes Necessários
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Controls & Demo Switcher Bar */}
      <div className="flex items-center justify-end gap-3 pb-1">
        {/* Discreet segment toggle for internal presentation */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-[11px] font-bold" title="Alternar visão para apresentação interna">
          <button
            onClick={() => setCompanyTier('middle_corporate')}
            className={`px-3 py-1 rounded-lg transition-all ${
              companyTier === 'middle_corporate'
                ? 'bg-white text-gci shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Middle Corporate
          </button>
          <button
            onClick={() => setCompanyTier('simples_pme')}
            className={`px-3 py-1 rounded-lg transition-all ${
              companyTier === 'simples_pme'
                ? 'bg-white text-gci shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Simples / PME
          </button>
        </div>

        {/* Help / FAQ */}
        <button
          onClick={() => setShowSupportModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-gci hover:bg-slate-100 transition-colors border border-slate-200 bg-white"
          title="Dúvidas e Suporte"
        >
          <HelpCircle size={16} />
          <span>Ajuda</span>
        </button>
      </div>

      {/* Rejection / Adjustments Warning Banner */}
      {hasValidationErrors && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3.5 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <AlertTriangle size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-rose-950">
              Ajustes necessários na documentação
            </h4>
            <p className="text-xs text-rose-800 mt-1 leading-relaxed">
              Identificamos arquivos que precisam de correção (por exemplo, imagem sem nitidez ou dados ilegíveis). Verifique os tópicos destacados abaixo e substitua os arquivos indicados para concluir a validação.
            </p>
          </div>
        </motion.div>
      )}

      {/* Progress Bar (Minimalist) */}
      <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">Progresso do cadastro</span>
          <span className="font-bold text-gci">{completedTopicsCount} de {totalTopics} tópicos concluídos</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedTopicsCount / totalTopics) * 100}%` }}
            transition={{ duration: 0.4 }}
            className="h-full bg-gci rounded-full"
          />
        </div>
      </div>

      {/* TÓPICOS ACCORDION LIST */}
      <div className="space-y-3">
        
        {/* TÓPICO 1: Confirmação do Telefone por SMS */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all hover:border-slate-300">
          <button
            onClick={() => toggleTopic('sms')}
            className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                phoneVerified ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                <Smartphone size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">1. Confirmação do Telefone por SMS</h3>
                <p className="text-xs text-slate-400">Validação do número de celular para segurança e notificações</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {phoneVerified ? (
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Check size={12} strokeWidth={3} /> Concluído
                </span>
              ) : (
                <span className="text-[11px] font-bold text-agro-orange bg-orange-50 px-2.5 py-1 rounded-full">
                  Pendente
                </span>
              )}
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${expandedTopics.sms ? 'rotate-180 text-gci' : ''}`}
              />
            </div>
          </button>

          <AnimatePresence>
            {expandedTopics.sms && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40"
              >
                <SmsVerification
                  isVerified={phoneVerified}
                  maskedPhone="(34) 9 ••••-1234"
                  verifiedAt={phoneVerifiedAt}
                  onVerified={() => {
                    setPhoneVerified(true);
                    const now = new Date();
                    setPhoneVerifiedAt(`${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TÓPICO 2: Reconhecimento & Biometria Facial (QR Code) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all hover:border-slate-300">
          <button
            onClick={() => toggleTopic('biometria')}
            className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                facialVerified ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                <QrCode size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">2. Reconhecimento & Biometria Facial</h3>
                <p className="text-xs text-slate-400">Autenticação biométrica e prova de vida via QR Code no celular</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {facialVerified ? (
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Check size={12} strokeWidth={3} /> Validada
                </span>
              ) : (
                <span className="text-[11px] font-bold text-agro-orange bg-orange-50 px-2.5 py-1 rounded-full">
                  Pendente
                </span>
              )}
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${expandedTopics.biometria ? 'rotate-180 text-gci' : ''}`}
              />
            </div>
          </button>

          <AnimatePresence>
            {expandedTopics.biometria && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40"
              >
                <FacialVerification
                  isVerified={facialVerified}
                  onVerified={() => setFacialVerified(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TÓPICO 3: Documentos da Empresa (PJ) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all hover:border-slate-300">
          <button
            onClick={() => toggleTopic('pj')}
            className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                pjStats.isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                <Building2 size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">3. Documentos Cadastrais da Empresa</h3>
                <p className="text-xs text-slate-400">Contrato Social, Alterações Contratuais, Atas e Organograma Societário</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                pjStats.isDone ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 bg-slate-100'
              }`}>
                {pjStats.approved + pjStats.inAnalysis} de {pjStats.total} enviados
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${expandedTopics.pj ? 'rotate-180 text-gci' : ''}`}
              />
            </div>
          </button>

          <AnimatePresence>
            {expandedTopics.pj && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40 space-y-3"
              >
                {pjDocs.map((item) => (
                  <DocumentRow
                    key={item.id}
                    doc={item}
                    companyTier={companyTier}
                    onUpload={(file) => handleFileUpload(item.id, file)}
                    onPreview={() => item.fileName && setPreviewDoc({ title: item.title, fileName: item.fileName })}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TÓPICO 4: Demonstrativos Financeiros & Contábeis */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all hover:border-slate-300">
          <button
            onClick={() => toggleTopic('financeiro')}
            className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                finStats.isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                <FileText size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">4. Demonstrativos Financeiros & Contábeis</h3>
                <p className="text-xs text-slate-400">
                  {companyTier === 'middle_corporate' 
                    ? 'Balanço 4 exercícios, Faturamento e Endividamento' 
                    : 'Faturamento, Endividamento e Balanço (não obrigatório)'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                finStats.isDone ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 bg-slate-100'
              }`}>
                {finStats.approved + finStats.inAnalysis} de {finStats.total} enviados
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${expandedTopics.financeiro ? 'rotate-180 text-gci' : ''}`}
              />
            </div>
          </button>

          <AnimatePresence>
            {expandedTopics.financeiro && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40 space-y-3"
              >
                {finDocs.map((item) => (
                  <DocumentRow
                    key={item.id}
                    doc={item}
                    companyTier={companyTier}
                    onUpload={(file) => handleFileUpload(item.id, file)}
                    onPreview={() => item.fileName && setPreviewDoc({ title: item.title, fileName: item.fileName })}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TÓPICO 5: Crédito & Relacionamento Bancário */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all hover:border-slate-300">
          <button
            onClick={() => toggleTopic('credito')}
            className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                credStats.isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">5. Crédito & Relacionamento Bancário</h3>
                <p className="text-xs text-slate-400">Declaração de relacionamento bancário de crédito em papel timbrado</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                credStats.isDone ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 bg-slate-100'
              }`}>
                {credStats.approved + credStats.inAnalysis} de {credStats.total} enviados
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${expandedTopics.credito ? 'rotate-180 text-gci' : ''}`}
              />
            </div>
          </button>

          <AnimatePresence>
            {expandedTopics.credito && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40 space-y-3"
              >
                {credDocs.map((item) => (
                  <DocumentRow
                    key={item.id}
                    doc={item}
                    companyTier={companyTier}
                    onUpload={(file) => handleFileUpload(item.id, file)}
                    onPreview={() => item.fileName && setPreviewDoc({ title: item.title, fileName: item.fileName })}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TÓPICO 6: Quadro Societário (Partes Relacionadas) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all hover:border-slate-300">
          <button
            onClick={() => toggleTopic('socios')}
            className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                partnersDone ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                <Users size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">6. Quadro Societário (Partes Relacionadas)</h3>
                <p className="text-xs text-slate-400">Sócios, representantes, avalistas e cônjuges (Pessoa Física e Jurídica)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                partnersDone ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 bg-slate-100'
              }`}>
                {partnersValidCount} de {partners.length} partes validadas
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${expandedTopics.socios ? 'rotate-180 text-gci' : ''}`}
              />
            </div>
          </button>

          <AnimatePresence>
            {expandedTopics.socios && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40 space-y-4"
              >
                {/* Partners List (Discreet Collapsible for each partner) */}
                <div className="space-y-3">
                  {partners.map((partner) => {
                    const isExpanded = expandedPartnerId === partner.id;
                    const isPartnerValid = partner.status === 'validado';
                    const isPJ = partner.type === 'PJ';
                    const isMarriedOrHasSpouse = !isPJ && (
                      partner.maritalStatus?.toLowerCase().includes('casad') ||
                      partner.maritalStatus?.toLowerCase().includes('união') ||
                      partner.maritalStatus?.toLowerCase().includes('uniao') ||
                      Boolean(partner.docs.certidaoCasamento?.uploaded) ||
                      Boolean(partner.docs.documentoConjuge?.uploaded)
                    );

                    return (
                      <div
                        key={partner.id}
                        className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs"
                      >
                        <button
                          onClick={() => setExpandedPartnerId(isExpanded ? null : partner.id)}
                          className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                              isPJ ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {isPJ ? <Building2 size={16} /> : partner.name.charAt(0)}
                            </div>
                            <div className="truncate">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-slate-800 truncate">{partner.name}</span>
                                <span className="text-[10px] text-slate-400">({partner.cpf})</span>
                                {partner.isNonPartner ? (
                                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded">
                                    {partner.vinculo || 'Representante Não Sócio'}
                                  </span>
                                ) : isPJ ? (
                                  <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-1.5 py-0.5 rounded">
                                    Pessoa Jurídica
                                  </span>
                                ) : null}
                              </div>
                              <p className="text-[11px] text-slate-400">
                                {partner.role}
                                {!partner.isNonPartner && ` • ${partner.quotaPercentage}% de participação`}
                                {!isPJ && partner.maritalStatus && ` • ${partner.maritalStatus}`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0">
                            {isPartnerValid ? (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Check size={11} strokeWidth={3} /> Validado
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-agro-orange bg-orange-50 px-2 py-0.5 rounded-full">
                                Pendente
                              </span>
                            )}
                            <ChevronDown
                              size={14}
                              className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-gci' : ''}`}
                            />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-slate-100 p-3.5 bg-slate-50/30 grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                            >
                              {partner.isNonPartner ? (
                                <>
                                  {/* Non-partner PF Doc 1: Identidade */}
                                  <PartnerDocItem
                                    label="Documento de Identidade (RG ou CNH)"
                                    docState={partner.docs.cnhRg || { uploaded: false, status: 'pendente' }}
                                    note="Identificação oficial com foto do representante legal"
                                    onUpload={(file) => handlePartnerDocUpload(partner.id, 'cnhRg', file)}
                                    onPreview={() => partner.docs.cnhRg?.fileName && setPreviewDoc({ title: 'Documento de Identidade (RG ou CNH)', fileName: partner.docs.cnhRg.fileName })}
                                  />

                                  {/* Non-partner PF Doc 2: Residência */}
                                  <PartnerDocItem
                                    label="Comprovante de Residência (até 90 dias)"
                                    docState={partner.docs.residencia || { uploaded: false, status: 'pendente' }}
                                    note="Comprovante residencial em nome do representante"
                                    onUpload={(file) => handlePartnerDocUpload(partner.id, 'residencia', file)}
                                    onPreview={() => partner.docs.residencia?.fileName && setPreviewDoc({ title: 'Comprovante de Residência', fileName: partner.docs.residencia.fileName })}
                                  />
                                </>
                              ) : isPJ ? (
                                <>
                                  {/* PJ Doc 1: Contrato Social ou Estatuto Social atualizado */}
                                  <PartnerDocItem
                                    label="Contrato Social ou Estatuto Social atualizado"
                                    docState={partner.docs.contratoEstatutoSocialPj || { uploaded: false, status: 'pendente' }}
                                    note="Registrado no órgão competente com as últimas alterações consolidado"
                                    onUpload={(file) => handlePartnerDocUpload(partner.id, 'contratoEstatutoSocialPj', file)}
                                    onPreview={() => partner.docs.contratoEstatutoSocialPj?.fileName && setPreviewDoc({ title: 'Contrato Social ou Estatuto Social', fileName: partner.docs.contratoEstatutoSocialPj.fileName })}
                                  />

                                  {/* PJ Doc 2: Documentação dos beneficiários finais */}
                                  <PartnerDocItem
                                    label="Documentação dos beneficiários finais (identificação + CPF/CNH)"
                                    docState={partner.docs.beneficiariosFinaisPj || { uploaded: false, status: 'pendente' }}
                                    note="Identificação oficial com foto e CPF/CNH de todos os beneficiários finais"
                                    onUpload={(file) => handlePartnerDocUpload(partner.id, 'beneficiariosFinaisPj', file)}
                                    onPreview={() => partner.docs.beneficiariosFinaisPj?.fileName && setPreviewDoc({ title: 'Documentação dos Beneficiários Finais', fileName: partner.docs.beneficiariosFinaisPj.fileName })}
                                  />
                                </>
                              ) : (
                                <>
                                  {/* PF Doc 1: CNH / RG */}
                                  <PartnerDocItem
                                    label="Documento de Identidade (RG ou CNH)"
                                    docState={partner.docs.cnhRg || { uploaded: false, status: 'pendente' }}
                                    onUpload={(file) => handlePartnerDocUpload(partner.id, 'cnhRg', file)}
                                    onPreview={() => partner.docs.cnhRg?.fileName && setPreviewDoc({ title: 'Documento de Identidade (RG ou CNH)', fileName: partner.docs.cnhRg.fileName })}
                                  />

                                  {/* PF Doc 2: Residência */}
                                  <PartnerDocItem
                                    label="Comprovante de Residência (até 90 dias)"
                                    docState={partner.docs.residencia || { uploaded: false, status: 'pendente' }}
                                    onUpload={(file) => handlePartnerDocUpload(partner.id, 'residencia', file)}
                                    onPreview={() => partner.docs.residencia?.fileName && setPreviewDoc({ title: 'Comprovante de Residência', fileName: partner.docs.residencia.fileName })}
                                  />

                                  {/* PF Doc 3: Certidão Casamento / União Estável / Averbação Divórcio */}
                                  <PartnerDocItem
                                    label="Certidão de Casamento / Contrato de União Estável / Averbação de Divórcio"
                                    docState={partner.docs.certidaoCasamento || { uploaded: false, status: 'pendente' }}
                                    note="Conforme o estado civil declarado"
                                    onUpload={(file) => handlePartnerDocUpload(partner.id, 'certidaoCasamento', file)}
                                    onPreview={() => partner.docs.certidaoCasamento?.fileName && setPreviewDoc({ title: 'Certidão de Casamento / União Estável / Averbação de Divórcio', fileName: partner.docs.certidaoCasamento.fileName })}
                                  />

                                  {/* PF Doc 4: Documento do Cônjuge (se houver) */}
                                  {isMarriedOrHasSpouse && (
                                    <PartnerDocItem
                                      label="Documento de Identidade do Cônjuge (RG ou CNH)"
                                      docState={partner.docs.documentoConjuge || { uploaded: false, status: 'pendente' }}
                                      note="Identificação oficial com foto do(a) cônjuge ou companheiro(a)"
                                      onUpload={(file) => handlePartnerDocUpload(partner.id, 'documentoConjuge', file)}
                                      onPreview={() => partner.docs.documentoConjuge?.fileName && setPreviewDoc({ title: 'Documento de Identidade do Cônjuge', fileName: partner.docs.documentoConjuge.fileName })}
                                    />
                                  )}

                                  {/* PF Doc 5: IRPF + Recibo */}
                                  <PartnerDocItem
                                    label="Declaração de IRPF + recibo de entrega"
                                    docState={partner.docs.irpf || { uploaded: false, status: 'pendente' }}
                                    note="Declaração completa do último exercício com respectivo recibo de entrega RFB"
                                    onUpload={(file) => handlePartnerDocUpload(partner.id, 'irpf', file)}
                                    onPreview={() => partner.docs.irpf?.fileName && setPreviewDoc({ title: 'Declaração de IRPF + Recibo', fileName: partner.docs.irpf.fileName })}
                                  />
                                </>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Add Partner Action */}
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setShowAddPartnerModal(true)}
                    className="text-xs font-bold text-gci hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Adicionar Parte Relacionada
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Discreet Simulation / Prefill Footer (Subtle as requested) */}
      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <span className="text-[11px]">Ambiente seguro e criptografado GCI</span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleQuickUploadAll}
            disabled={isBulkUploading}
            className="text-slate-500 hover:text-gci font-semibold underline text-xs transition-colors disabled:opacity-50"
          >
            {isBulkUploading ? 'Preenchendo...' : 'Preencher todos os documentos (Simulação)'}
          </button>
          <span>•</span>
          <button
            onClick={handleResetState}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            Restaurar estado inicial
          </button>
        </div>
      </div>

      {/* Support & FAQ Modal */}
      <SupportFaqModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />

      {/* Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-gci" />
                  <h4 className="text-sm font-bold text-slate-800">{previewDoc.title}</h4>
                </div>
                <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-slate-700">
                  <X size={18} />
                </button>
              </div>

              <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
                <FileCheck size={36} className="text-emerald-500 mx-auto" />
                <p className="text-xs font-bold text-slate-800">{previewDoc.fileName}</p>
                <p className="text-[11px] text-slate-400">Arquivo criptografado e validado pela mesa de crédito.</p>
              </div>

              <button
                onClick={() => setPreviewDoc(null)}
                className="w-full py-2.5 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-colors"
              >
                Fechar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Partner Modal */}
      <AnimatePresence>
        {showAddPartnerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Adicionar Parte Relacionada</h3>
                <button onClick={() => setShowAddPartnerModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddPartnerSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Tipo de Parte Relacionada</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewPartner({ ...newPartner, type: 'PF' })}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        newPartner.type === 'PF'
                          ? 'border-gci bg-emerald-50 text-gci ring-1 ring-gci/30'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <User size={14} /> Pessoa Física (PF)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewPartner({ ...newPartner, type: 'PJ' })}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        newPartner.type === 'PJ'
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-400/30'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Building2 size={14} /> Pessoa Jurídica (PJ)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    {newPartner.type === 'PJ' ? 'Razão Social / Nome da Empresa' : 'Nome Completo'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newPartner.name}
                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-gci"
                    placeholder={newPartner.type === 'PJ' ? 'Ex: Agro Holding Participações S/A' : 'Nome completo da parte'}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      {newPartner.type === 'PJ' ? 'CNPJ' : 'CPF'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newPartner.cpf}
                      onChange={(e) => setNewPartner({ ...newPartner, cpf: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-gci"
                      placeholder={newPartner.type === 'PJ' ? '00.000.000/0001-00' : '000.000.000-00'}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Participação (%)</label>
                    <input
                      type="number"
                      value={newPartner.quotaPercentage}
                      onChange={(e) => setNewPartner({ ...newPartner, quotaPercentage: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-gci"
                    />
                  </div>
                </div>

                <div className={`grid ${newPartner.type === 'PJ' ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Cargo / Função</label>
                    <select
                      value={newPartner.role}
                      onChange={(e) => setNewPartner({ ...newPartner, role: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-gci"
                    >
                      {newPartner.type === 'PJ' ? (
                        <>
                          <option>Sócio Pessoa Jurídica</option>
                          <option>Holding / Controladora</option>
                          <option>Avalista Pessoa Jurídica</option>
                        </>
                      ) : (
                        <>
                          <option>Sócio Administrador</option>
                          <option>Sócia Administradora</option>
                          <option>Sócio Cotista</option>
                          <option>Diretor</option>
                          <option>Procurador</option>
                          <option>Avalista</option>
                        </>
                      )}
                    </select>
                  </div>

                  {newPartner.type === 'PF' && (
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Estado Civil</label>
                      <select
                        value={newPartner.maritalStatus}
                        onChange={(e) => setNewPartner({ ...newPartner, maritalStatus: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-gci"
                      >
                        <option>Casado</option>
                        <option>Solteiro</option>
                        <option>Divorciado</option>
                        <option>União Estável</option>
                        <option>Viúvo</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-500">
                  {newPartner.type === 'PJ' ? (
                    <span><strong>Documentos exigidos pelo checklist:</strong> Contrato Social/Estatuto Social atualizado consolidado e Documentação dos beneficiários finais (identificação + CPF/CNH).</span>
                  ) : (
                    <span><strong>Documentos exigidos pelo checklist:</strong> RG ou CNH, Comprovante de Residência (90 dias), Certidão de Casamento/União Estável/Divórcio e IRPF com recibo de entrega RFB.</span>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddPartnerModal(false)}
                    className="px-4 py-2 text-xs text-slate-500 hover:text-slate-700 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Salvar Parte Relacionada
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

// Sub-component: Clean row for a document item
interface DocumentRowProps {
  doc: DocumentItem;
  companyTier: CompanyTier;
  onUpload: (file: File) => void;
  onPreview: () => void;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ doc, companyTier, onUpload, onPreview }) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const isUploaded = doc.status === 'aprovado' || doc.status === 'em_analise';
  const isRejected = doc.status === 'rejeitado';
  const isOptional = doc.optionalFor?.includes(companyTier);

  return (
    <div className={`p-3.5 bg-white rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
      isRejected ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200/80'
    }`}>
      <div className="space-y-1 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-xs font-bold truncate ${isRejected ? 'text-rose-950' : 'text-slate-800'}`}>{doc.title}</p>
          
          {isOptional && (
            <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full shrink-0">
              Não obrigatório
            </span>
          )}

          {doc.status === 'aprovado' && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.2 rounded-full shrink-0 flex items-center gap-0.5">
              <Check size={10} strokeWidth={3} /> Anexado
            </span>
          )}
          {doc.status === 'em_analise' && (
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.2 rounded-full shrink-0 flex items-center gap-0.5">
              <Clock size={10} /> Em análise
            </span>
          )}
          {isRejected && (
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-0.5">
              <AlertCircle size={10} /> Ajuste necessário
            </span>
          )}
        </div>
        <p className={`text-[11px] leading-tight ${isOptional ? 'text-amber-800 font-medium' : 'text-slate-400'}`}>
          {isOptional && doc.optionalNote ? doc.optionalNote : doc.description}
        </p>
        
        {isRejected && doc.rejectionReason && (
          <div className="mt-1.5 flex items-start gap-1.5 p-2 bg-rose-50/90 border border-rose-200/80 rounded-lg text-rose-800 text-[11px]">
            <AlertCircle size={13} className="shrink-0 mt-0.5 text-rose-600" />
            <span><strong>Motivo:</strong> {doc.rejectionReason}</span>
          </div>
        )}

        {doc.fileName && !isRejected && (
          <p className="text-[10px] text-slate-500 pt-0.5">{doc.fileName} • {doc.fileSize}</p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
          }}
        />

        {isRejected ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <Upload size={12} />
            Substituir Arquivo
          </button>
        ) : isUploaded ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={onPreview}
              className="px-2.5 py-1.5 text-slate-500 hover:text-gci text-[11px] font-semibold bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors flex items-center gap-1"
            >
              <Eye size={12} /> Ver
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 text-slate-500 hover:text-gci text-[11px] font-semibold bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors flex items-center gap-1"
            >
              <Upload size={12} /> Substituir
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-gci hover:bg-gci-hover text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <Upload size={12} />
            {isOptional ? 'Anexar (Opcional)' : 'Anexar Arquivo'}
          </button>
        )}
      </div>
    </div>
  );
};

// Sub-component: Clean row for partner document
interface PartnerDocItemProps {
  label: string;
  docState: { uploaded: boolean; fileName?: string; status: 'aprovado' | 'em_analise' | 'pendente' | 'rejeitado'; note?: string; rejectionReason?: string };
  note?: string;
  onUpload: (file: File) => void;
  onPreview?: () => void;
}

const PartnerDocItem: React.FC<PartnerDocItemProps> = ({ label, docState, note, onUpload, onPreview }) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const isRejected = docState.status === 'rejeitado';

  return (
    <div className={`p-3 bg-white rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
      isRejected ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200/80'
    }`}>
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center gap-2">
          <p className={`text-[11px] font-bold truncate ${isRejected ? 'text-rose-950' : 'text-slate-700'}`}>{label}</p>
          {isRejected && (
            <span className="text-[9px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded-full shrink-0">
              Ajuste necessário
            </span>
          )}
        </div>
        {note && <p className="text-[10px] text-slate-400">{note}</p>}
        {docState.uploaded && docState.fileName && !isRejected && (
          <button
            type="button"
            onClick={onPreview}
            className="text-[10px] text-emerald-600 hover:text-emerald-700 font-medium truncate flex items-center gap-1 hover:underline text-left"
          >
            <Eye size={10} className="shrink-0" />
            <span className="truncate">{docState.fileName}</span>
          </button>
        )}
        {isRejected && docState.rejectionReason && (
          <p className="text-[10px] text-rose-700 font-medium">{docState.rejectionReason}</p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors shrink-0 flex items-center gap-1 self-end sm:self-center ${
          isRejected
            ? 'bg-rose-600 hover:bg-rose-700 text-white'
            : docState.uploaded
            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
        }`}
      >
        {isRejected ? (
          <>
            <Upload size={11} /> Substituir
          </>
        ) : docState.uploaded ? (
          <>
            <Check size={11} strokeWidth={3} /> Anexado
          </>
        ) : (
          <>
            <Upload size={11} /> Anexar
          </>
        )}
      </button>
    </div>
  );
};
