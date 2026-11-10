import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Mail,
  AlertCircle, 
  X, 
  ShieldCheck, 
  Building2, 
  User, 
  Users, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  FileCheck, 
  Info,
  Sparkles,
  HelpCircle,
  FilePlus,
  AlertTriangle,
  Check,
  RotateCcw
} from 'lucide-react';
import { Logo } from './Logo';
import { AccountType, Socio, NonPartnerRepresentative } from './ComplementaryDataForm';

export interface OnboardingDocumentUploadProps {
  accountType?: AccountType;
  socios?: Socio[];
  nonPartnerRepresentatives?: NonPartnerRepresentative[];
  companyName?: string;
  cnpj?: string;
  tipoEmpresa?: string;
  hasProcurador?: boolean;
  onSubmitDocs: (outcome?: 'approved' | 'rejected' | 'pending') => void;
  onBack: () => void;
  onCancelRequest?: () => void;
}

export interface DocumentUploadItem {
  id: string;
  targetPersonOrEntity: string;
  entityType: 'Correntista' | 'Sócio' | 'Representante legal' | 'Procurador' | 'Empresa' | string;
  documentType: string;
  title: string;
  description: string;
  isRequired: boolean;
  uploaded: boolean;
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
  base64Preview?: string;
  isRegularizationNeeded?: boolean;
  regularizationReason?: string;
  cargo?: string;
  documentNumber?: string;
  isPersonDoc?: boolean;
}

export const DEFAULT_ONBOARDING_SOCIOS: Socio[] = [
  {
    id: '1',
    nome: 'Eduardo Santos',
    cpfCnpj: '123.456.789-00',
    email: 'eduardo.santos@ceresinvestimentos.com',
    telefone: '(34) 99881-2233',
    isRepresentanteLegal: true,
    cep: '38400-100',
    logradouro: 'Avenida Rondon Pacheco',
    numero: '4500',
    bairro: 'Tibery',
    cidade: 'Uberlândia',
    uf: 'MG',
    dataNascimento: '1982-05-14',
    nomeMae: 'Maria Helena Santos',
    profissao: 'Administrador / Produtor Rural',
    renda: '65.000,00',
    estadoCivil: 'Casado(a)',
    genero: 'Masculino',
    nacionalidade: 'Brasileira',
    responsabilidade: 'Representante legal',
    pep: false,
    rgNumero: 'MG-14.892.301',
    rgDataEmissao: '2015-08-20',
    rgOrgao: 'SSP/MG',
    nomeConjuge: 'Juliana Costa Santos',
    cpfConjuge: '987.654.321-00',
    regimeBens: 'Comunhão parcial de bens',
  },
  {
    id: '2',
    nome: 'Marcos Damasceno',
    cpfCnpj: '234.567.890-12',
    email: 'marcos.damasceno@ceresinvestimentos.com',
    telefone: '(34) 99772-3344',
    isRepresentanteLegal: false,
    cep: '38400-100',
    logradouro: 'Avenida Rondon Pacheco',
    numero: '4500',
    bairro: 'Tibery',
    cidade: 'Uberlândia',
    uf: 'MG',
    dataNascimento: '1979-11-23',
    nomeMae: 'Teresa Damasceno',
    profissao: 'Diretor Comercial / Agrônomo',
    renda: '58.000,00',
    estadoCivil: 'Casado(a)',
    genero: 'Masculino',
    nacionalidade: 'Brasileira',
    responsabilidade: 'Sócio Diretor Comercial',
    pep: false,
    rgNumero: 'MG-12.784.551',
    rgDataEmissao: '2012-04-10',
    rgOrgao: 'SSP/MG',
    nomeConjuge: 'Renata Prado Damasceno',
    cpfConjuge: '876.543.210-99',
    regimeBens: 'Comunhão parcial de bens',
  },
  {
    id: '3',
    nome: 'Cristiano Drigo',
    cpfCnpj: '345.678.901-23',
    email: 'cristiano.drigo@ceresinvestimentos.com',
    telefone: '(34) 99663-4455',
    isRepresentanteLegal: false,
    cep: '38400-100',
    logradouro: 'Avenida Rondon Pacheco',
    numero: '4500',
    bairro: 'Tibery',
    cidade: 'Uberlândia',
    uf: 'MG',
    dataNascimento: '1984-08-30',
    nomeMae: 'Lúcia de Fátima Drigo',
    profissao: 'Diretor Financeiro / Contador',
    renda: '52.000,00',
    estadoCivil: 'Solteiro(a)',
    genero: 'Masculino',
    nacionalidade: 'Brasileira',
    responsabilidade: 'Sócio Diretor Financeiro',
    pep: false,
    rgNumero: 'MG-16.329.804',
    rgDataEmissao: '2016-09-18',
    rgOrgao: 'SSP/MG',
  },
];

export const OnboardingDocumentUpload: React.FC<OnboardingDocumentUploadProps> = ({
  accountType = 'pj',
  socios = DEFAULT_ONBOARDING_SOCIOS,
  nonPartnerRepresentatives = [],
  companyName = 'AGRO INDUSTRIAL SOJA & MILHO LTDA',
  cnpj = '12.345.678/0001-90',
  tipoEmpresa = 'Sociedade empresária limitada',
  hasProcurador = false,
  onSubmitDocs,
  onBack,
  onCancelRequest,
}) => {
  // Ensure we always have Marcos Damasceno and Cristiano Drigo available
  const effectiveSocios = socios && socios.length >= 3 ? socios : DEFAULT_ONBOARDING_SOCIOS;

  // Check if company type uses Estatuto Social
  const isEstatuto = Boolean(
    tipoEmpresa.toLowerCase().includes('anônima') ||
    tipoEmpresa.toLowerCase().includes('s/a') ||
    tipoEmpresa.toLowerCase().includes('estatuto') ||
    tipoEmpresa.toLowerCase().includes('cooperativa') ||
    tipoEmpresa.toLowerCase().includes('associação')
  );

  // Determine constitutive doc name based on company type
  const getConstitutiveDocTitle = () => {
    if (isEstatuto) {
      return 'Estatuto Social Vigente';
    }
    return 'Contrato / Estatuto Social';
  };

  // Check if there is any Procurador representative (making Procuração mandatory)
  const isProcuradorRequired = Boolean(
    hasProcurador ||
    nonPartnerRepresentatives.some((r) => r.vinculo === 'Procurador') ||
    effectiveSocios.some((s) => s.responsabilidade === 'Procurador')
  );

  // Build document list according to rules:
  // - PJ: Contrato/Estatuto Social; Ata de Eleição de Diretoria (quando for Estatuto); Procuração (quando houver);
  //       + 1 doc de identificação do titular + 1 doc de identificação de CADA sócio cadastrado (incluindo Marcos Damasceno e Cristiano Drigo com cargos e campo para digitar documento).
  // - PF: 1 doc do titular (CNH, RG, RNE ou CIN) + sócios/co-titulares relacionados (Marcos Damasceno e Cristiano Drigo com cargos e campo para digitar documento).
  // - Formatos: JPG, JPEG, PNG ou PDF (base64), até 12MB.
  const buildDocsList = (): DocumentUploadItem[] => {
    if (accountType === 'pf') {
      const docs: DocumentUploadItem[] = [
        {
          id: 'pf-doc-identificacao',
          targetPersonOrEntity: 'Eduardo Santos',
          cargo: 'Titular / Correntista',
          entityType: 'Correntista',
          documentType: 'Documento de Identificação',
          title: 'Documento de Identificação Oficial (CNH, RG, RNE ou CIN)',
          description: 'Aceitos: CNH, RG, RNE ou CIN (frente e verso ou versão digital). Formatos: JPG, JPEG, PNG ou PDF (base64) até 12MB.',
          isRequired: true,
          uploaded: true,
          fileName: 'CNH_Digital_Eduardo_Santos.pdf',
          fileSize: '1.4 MB',
          uploadDate: 'Hoje',
          documentNumber: '123.456.789-00',
          isPersonDoc: true,
        },
      ];

      // Trazer os sócios também conforme solicitado: Marcos Damasceno e Cristiano Drigo sem estarem preenchidos nem enviados
      effectiveSocios
        .filter((s) => s.nome !== 'Eduardo Santos')
        .forEach((socio, idx) => {
          docs.push({
            id: `pf-socio-${socio.id || idx}`,
            targetPersonOrEntity: socio.nome,
            cargo: socio.responsabilidade || 'Sócio Diretor',
            entityType: 'Sócio',
            documentType: 'Documento de Identificação',
            title: `Documento de Identificação Oficial (CNH, RG, RNE ou CIN)`,
            description: 'Aceitos: CNH, RG, RNE ou CIN (frente e verso ou versão digital). Formatos: JPG, JPEG, PNG ou PDF até 12MB.',
            isRequired: true,
            uploaded: false,
            fileName: undefined,
            fileSize: undefined,
            uploadDate: undefined,
            documentNumber: '',
            isPersonDoc: true,
          });
        });

      return docs;
    }

    // PJ Documents
    const docs: DocumentUploadItem[] = [
      // 1. Contrato/Estatuto Social
      {
        id: 'pj-contrato-estatuto',
        targetPersonOrEntity: companyName,
        entityType: 'Empresa',
        documentType: 'Contrato/Estatuto Social',
        title: getConstitutiveDocTitle(),
        description: 'Contrato Social consolidado, Estatuto ou documento constitutivo registrado na Junta Comercial ou Cartório.',
        isRequired: true,
        uploaded: true,
        fileName: 'Contrato_Social_Consolidado_2025.pdf',
        fileSize: '3.8 MB',
        uploadDate: 'Hoje',
      },
      // 2. Ata de Eleição de Diretoria (quando for Estatuto)
      {
        id: 'pj-ata-eleicao',
        targetPersonOrEntity: companyName,
        entityType: 'Empresa',
        documentType: 'Ata de Eleição de Diretoria',
        title: 'Ata de Eleição de Diretoria (quando for Estatuto)',
        description: 'Documento societário de eleição e posse da diretoria atual registrada (obrigatório para sociedades anônimas ou regidas por estatuto).',
        isRequired: isEstatuto,
        uploaded: isEstatuto,
        fileName: isEstatuto ? 'Ata_Eleicao_Diretoria_2024.pdf' : undefined,
        fileSize: isEstatuto ? '1.8 MB' : undefined,
        uploadDate: isEstatuto ? 'Hoje' : undefined,
      },
      // 3. Procuração (obrigatória se houver representante do tipo Procurador, senão quando houver)
      {
        id: 'pj-procuracao',
        targetPersonOrEntity: companyName,
        entityType: 'Empresa',
        documentType: 'Procuração',
        title: isProcuradorRequired
          ? 'Procuração Vigente (Obrigatória)'
          : 'Procuração (quando houver)',
        description: isProcuradorRequired
          ? 'Instrumento público ou particular com outorga de poderes de representação (obrigatório para representantes do tipo Procurador).'
          : 'Instrumento público ou particular com outorga de poderes de representação e movimentação financeira da empresa.',
        isRequired: isProcuradorRequired,
        uploaded: false,
      },
    ];

    // Documentos de Identificação dos Sócios e Representantes:
    // Traz Eduardo Santos (preenchido/enviado) e Marcos Damasceno / Cristiano Drigo sem estarem preenchidos nem enviados
    effectiveSocios.forEach((socio, idx) => {
      const isRepresentante =
        socio.isRepresentanteLegal ||
        socio.responsabilidade === 'Representante legal' ||
        (idx === 0 && !effectiveSocios.some((s) => s.isRepresentanteLegal || s.responsabilidade === 'Representante legal'));
      const roleLabel = isRepresentante
        ? 'Representante Legal / Diretor Presidente'
        : socio.responsabilidade || 'Sócio Diretor';

      const isUnfilled = socio.nome.includes('Marcos') || socio.nome.includes('Cristiano') || socio.nome !== 'Eduardo Santos';

      docs.push({
        id: `socio-id-${socio.id || idx}`,
        targetPersonOrEntity: socio.nome,
        cargo: roleLabel,
        entityType: isRepresentante ? 'Representante legal' : ((socio.responsabilidade as any) || 'Sócio'),
        documentType: 'Documento de Identificação',
        title: `Documento de Identificação Oficial (CNH, RG, RNE ou CIN)`,
        description: 'Aceitos: CNH, RG, RNE ou CIN. Formatos: JPG, JPEG, PNG ou PDF até 12MB.',
        isRequired: true,
        uploaded: !isUnfilled,
        fileName: !isUnfilled ? `Identificacao_${socio.nome.split(' ')[0]}_${socio.nome.split(' ')[1] || 'Socio'}.pdf` : undefined,
        fileSize: !isUnfilled ? '1.2 MB' : undefined,
        uploadDate: !isUnfilled ? 'Hoje' : undefined,
        documentNumber: !isUnfilled ? (socio.cpfCnpj || socio.rgNumero || '') : '',
        isPersonDoc: true,
      });

      // Item 2: Documento de estado civil condicional (Casado -> Certidão de Casamento; União Estável -> Contrato ou Escritura de União Estável)
      const isCasado = socio.estadoCivil === 'Casado(a)' || socio.estadoCivil === 'Casado';
      const isUniaoEstavel = socio.estadoCivil === 'União Estável' || socio.estadoCivil === 'Uniao Estavel';

      if (isCasado) {
        docs.push({
          id: `socio-civil-${socio.id || idx}`,
          targetPersonOrEntity: socio.nome,
          cargo: roleLabel,
          entityType: isRepresentante ? 'Representante legal' : ((socio.responsabilidade as any) || 'Sócio'),
          documentType: 'Certidão de Casamento',
          title: 'Certidão de Casamento',
          description: 'Certidão de Casamento atualizada e legível. Formatos: JPG, JPEG, PNG ou PDF até 12MB.',
          isRequired: true,
          uploaded: false, // No mock, começa sem arquivo enviado
          isPersonDoc: false,
        });
      } else if (isUniaoEstavel) {
        docs.push({
          id: `socio-civil-${socio.id || idx}`,
          targetPersonOrEntity: socio.nome,
          cargo: roleLabel,
          entityType: isRepresentante ? 'Representante legal' : ((socio.responsabilidade as any) || 'Sócio'),
          documentType: 'Contrato ou Escritura de União Estável',
          title: 'Contrato ou Escritura de União Estável',
          description: 'Contrato ou escritura pública de União Estável registrada. Formatos: JPG, JPEG, PNG ou PDF até 12MB.',
          isRequired: true,
          uploaded: false,
          isPersonDoc: false,
        });
      }
    });

    // Representantes não sócios (Item 3: começam em branco, mesmo padrão dos sócios)
    nonPartnerRepresentatives.forEach((rep, idx) => {
      docs.push({
        id: `non-partner-doc-${rep.id || idx}`,
        targetPersonOrEntity: rep.nome,
        cargo: `${rep.vinculo} • ${rep.cargo}`,
        entityType: rep.vinculo,
        documentType: 'Documento de Identificação',
        title: `Documento de Identificação Oficial (CNH, RG, RNE ou CIN)`,
        description: 'Aceitos: CNH, RG, RNE ou CIN. Formatos: JPG, JPEG, PNG ou PDF até 12MB.',
        isRequired: true,
        uploaded: false,
        fileName: undefined,
        fileSize: undefined,
        uploadDate: undefined,
        documentNumber: '',
        isPersonDoc: true,
      });

      // Item 2: Documento de estado civil para representante não sócio
      const isRepCasado = rep.estadoCivil === 'Casado(a)' || rep.estadoCivil === 'Casado';
      const isRepUniaoEstavel = rep.estadoCivil === 'União Estável' || rep.estadoCivil === 'Uniao Estavel';

      if (isRepCasado) {
        docs.push({
          id: `non-partner-civil-${rep.id || idx}`,
          targetPersonOrEntity: rep.nome,
          cargo: `${rep.vinculo} • ${rep.cargo}`,
          entityType: rep.vinculo,
          documentType: 'Certidão de Casamento',
          title: 'Certidão de Casamento',
          description: 'Certidão de Casamento atualizada e legível. Formatos: JPG, JPEG, PNG ou PDF até 12MB.',
          isRequired: true,
          uploaded: false,
          isPersonDoc: false,
        });
      } else if (isRepUniaoEstavel) {
        docs.push({
          id: `non-partner-civil-${rep.id || idx}`,
          targetPersonOrEntity: rep.nome,
          cargo: `${rep.vinculo} • ${rep.cargo}`,
          entityType: rep.vinculo,
          documentType: 'Contrato ou Escritura de União Estável',
          title: 'Contrato ou Escritura de União Estável',
          description: 'Contrato ou escritura pública de União Estável registrada. Formatos: JPG, JPEG, PNG ou PDF até 12MB.',
          isRequired: true,
          uploaded: false,
          isPersonDoc: false,
        });
      }
    });

    return docs;
  };

  const [documentList, setDocumentList] = useState<DocumentUploadItem[]>(buildDocsList);
  const [docNumbers, setDocNumbers] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    buildDocsList().forEach((d) => {
      if (d.documentNumber) {
        map[d.id] = d.documentNumber;
      }
    });
    return map;
  });
  const [activeUploadingId, setActiveUploadingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Synchronize documentList if dependencies update
  useEffect(() => {
    setDocumentList(buildDocsList());
  }, [accountType, socios, nonPartnerRepresentatives, companyName, tipoEmpresa, hasProcurador]);

  // Validation States
  const [isValidatingDocuments, setIsValidatingDocuments] = useState(false);
  const [hasRegularization, setHasRegularization] = useState(false);

  // Stats
  const totalMandatory = documentList.filter((d) => d.isRequired).length;
  const uploadedMandatory = documentList.filter(
    (d) => d.isRequired && d.uploaded && !d.isRegularizationNeeded
  ).length;
  const isAllMandatoryUploaded = uploadedMandatory === totalMandatory;
  const hasPendingRegularization = documentList.some((d) => d.isRegularizationNeeded);
  const missingMandatoryDocs = documentList.filter(
    (d) => d.isRequired && (!d.uploaded || d.isRegularizationNeeded)
  );

  // Group docs by entity for rendering
  const entityGroups = Array.from(new Set(documentList.map((d) => d.targetPersonOrEntity)));

  // File upload handler with 12MB and JPG/JPEG/PNG/PDF base64 validation
  const handleFileUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeBytes = 12 * 1024 * 1024; // 12MB
    if (file.size > maxSizeBytes) {
      setUploadError('O arquivo selecionado excede o limite máximo permitido de 12MB.');
      setTimeout(() => setUploadError(null), 4000);
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const allowedExts = ['jpg', 'jpeg', 'png', 'pdf'];
    if (!fileExt || !allowedExts.includes(fileExt)) {
      setUploadError('Formato inválido. Os formatos aceitos são JPG, JPEG, PNG ou PDF.');
      setTimeout(() => setUploadError(null), 4000);
      return;
    }

    setActiveUploadingId(docId);
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      setTimeout(() => {
        setDocumentList((prev) =>
          prev.map((doc) =>
            doc.id === docId
              ? {
                  ...doc,
                  uploaded: true,
                  isRegularizationNeeded: false,
                  regularizationReason: undefined,
                  fileName: file.name,
                  fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                  uploadDate: 'Agora',
                  base64Preview: base64Data,
                }
              : doc
          )
        );
        setActiveUploadingId(null);
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  // Remove uploaded file
  const handleRemoveFile = (docId: string) => {
    setDocumentList((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              uploaded: false,
              isRegularizationNeeded: false,
              regularizationReason: undefined,
              fileName: undefined,
              fileSize: undefined,
              uploadDate: undefined,
              base64Preview: undefined,
            }
          : doc
      )
    );
  };

  // Fast-forward demo helper
  const handleAttachAllDemo = () => {
    setDocumentList((prev) =>
      prev.map((doc) => ({
        ...doc,
        uploaded: true,
        isRegularizationNeeded: false,
        regularizationReason: undefined,
        fileName: doc.fileName || `${doc.title.slice(0, 24).replace(/[^a-zA-Z0-9]/g, '_')}_Anexo.pdf`,
        fileSize: doc.fileSize || '1.3 MB',
        uploadDate: 'Agora',
        documentNumber: doc.documentNumber || (doc.isPersonDoc ? 'MG-14.892.301' : undefined),
      }))
    );
    setHasRegularization(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Logo variant="dark" className="h-10 md:h-12 w-auto" />
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Portal do Cliente • Envio de Documentos
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAttachAllDemo}
            className="text-[11px] font-bold text-gci bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            title="Anexar todos os documentos pendentes (Demo)"
          >
            <Sparkles size={13} className="text-emerald-600" />
            <span className="hidden sm:inline">Anexar Todos (Demo)</span>
            <span className="sm:hidden">Demo</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl w-full mx-auto my-auto py-8 space-y-6">
        {/* Stepper Indicator: Dados -> Documentos -> Assinatura -> Análise */}
        <div className="w-full bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-[11px] font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">✓</span>
            <span className="hidden sm:inline">1. Dados</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-1.5 text-gci font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60">
            <span className="w-5 h-5 rounded-full bg-gci text-white flex items-center justify-center text-[10px] font-bold">2</span>
            <span>2. Documentos</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">3</span>
            <span className="hidden sm:inline">3. Assinatura</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">4</span>
            <span className="hidden sm:inline">4. Análise</span>
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-3">
              <Upload size={26} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Envio de Documentos
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed max-w-2xl">
              {accountType === 'pf' 
                ? 'Envie o documento de identificação oficial do titular (CNH, RG, RNE ou CIN) nos formatos JPG, JPEG, PNG ou PDF até 12MB.' 
                : 'Envie os documentos da empresa (Contrato/Estatuto Social, Ata de Eleição se aplicável e Procuração se houver) e o documento de identificação (CNH, RG, RNE ou CIN) de cada sócio/representante cadastrado.'}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Upload Error Banner if triggered */}
            {uploadError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-800 font-medium shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
                  <AlertCircle size={18} />
                </div>
                <div className="flex-1">{uploadError}</div>
                <button
                  type="button"
                  onClick={() => setUploadError(null)}
                  className="p-1 text-red-500 hover:text-red-800 rounded-lg"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}

            {/* Regularization Alert Banner if triggered */}
            {hasRegularization && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 sm:p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3.5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-amber-950">
                    Regularização necessária na documentação
                  </h4>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    Identificamos que alguns arquivos anexados necessitam de substituição para validação cadastral. Por favor, anexe novas versões nítidas e reenvie para aprovação.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Progress Bar Header */}
            <div className="space-y-1.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-2">
                  <FileCheck size={16} className="text-gci" />
                  Documentos Obrigatórios Validados
                </span>
                <span className="font-bold text-gci">
                  {uploadedMandatory} de {totalMandatory}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200/70 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(uploadedMandatory / totalMandatory) * 100}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-gci rounded-full"
                />
              </div>
            </div>

            {/* Entity Block Groups */}
            <div className="space-y-6">
              {entityGroups.map((groupTitle) => {
                const groupDocs = documentList.filter((d) => d.targetPersonOrEntity === groupTitle);
                const groupUploaded = groupDocs.filter((d) => d.uploaded && !d.isRegularizationNeeded).length;
                const isGroupCompany = groupDocs.some((d) => d.entityType === 'Empresa');

                return (
                  <div
                    key={groupTitle}
                    className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-sm"
                  >
                    {/* Group Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-gci">
                          {isGroupCompany ? <Building2 size={18} /> : <User size={18} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                              {groupTitle}
                            </h3>
                            {!isGroupCompany && groupDocs[0]?.cargo && (
                              <span className="text-[10px] font-bold text-gci bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                                {groupDocs[0].cargo}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {isGroupCompany
                              ? `CNPJ: ${cnpj}`
                              : `Cargo: ${groupDocs[0]?.cargo || 'Sócio'} • Documentação de Identificação`}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full border ${
                          groupUploaded === groupDocs.length
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {groupUploaded} de {groupDocs.length} enviados
                      </span>
                    </div>

                    {/* Group Items */}
                    <div className="space-y-3">
                      {groupDocs.map((doc) => (
                        <div
                          key={doc.id}
                          className={`p-4 rounded-xl border transition-all ${
                            doc.isRegularizationNeeded
                              ? 'bg-amber-50/40 border-amber-300'
                              : doc.uploaded
                              ? 'bg-slate-50/50 border-slate-200/90'
                              : 'bg-white border-dashed border-slate-300 hover:border-gci/50'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1 flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-xs font-bold text-slate-900">
                                  {doc.title}
                                </h4>
                                {doc.cargo && (
                                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.2 rounded-full">
                                    {doc.cargo}
                                  </span>
                                )}
                                {doc.isRegularizationNeeded ? (
                                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                                    <AlertTriangle size={11} /> Regularização Solicitada
                                  </span>
                                ) : doc.isRequired ? (
                                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.2 rounded-full border border-red-100">
                                    Obrigatório
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.2 rounded-full">
                                    Opcional
                                  </span>
                                )}
                              </div>

                              <p className="text-[11px] text-slate-500 leading-relaxed">
                                {doc.description}
                              </p>

                              {/* Campo para digitar o documento */}
                              {doc.isPersonDoc && (
                                <div className="mt-2.5 pt-2 border-t border-slate-200/60 max-w-md">
                                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                    Número do Documento (CPF / RG / CNH) *
                                  </label>
                                  <input
                                    type="text"
                                    value={docNumbers[doc.id] ?? doc.documentNumber ?? ''}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setDocNumbers((prev) => ({ ...prev, [doc.id]: val }));
                                      setDocumentList((prev) =>
                                        prev.map((d) =>
                                          d.id === doc.id ? { ...d, documentNumber: val } : d
                                        )
                                      );
                                    }}
                                    placeholder="Digite o CPF ou RG..."
                                    className="w-full px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci transition-all shadow-sm"
                                  />
                                </div>
                              )}

                              {/* Regularization Note */}
                              {doc.isRegularizationNeeded && doc.regularizationReason && (
                                <div className="mt-2 p-2.5 bg-amber-100/70 border border-amber-300 rounded-lg text-amber-900 text-xs font-medium">
                                  <strong>Motivo:</strong> {doc.regularizationReason}
                                </div>
                              )}

                              {/* Uploaded metadata */}
                              {doc.uploaded && !doc.isRegularizationNeeded && (
                                <div className="flex items-center gap-2 pt-1 text-[11px] font-medium text-emerald-800">
                                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                                  <span className="truncate font-semibold">{doc.fileName}</span>
                                  <span className="text-slate-400">• {doc.fileSize}</span>
                                </div>
                              )}
                            </div>

                            {/* Upload Action / State */}
                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                              {activeUploadingId === doc.id ? (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-gci font-semibold">
                                  <div className="w-3.5 h-3.5 border-2 border-gci border-t-transparent rounded-full animate-spin" />
                                  <span>Enviando...</span>
                                </div>
                              ) : doc.isRegularizationNeeded ? (
                                <label
                                  htmlFor={`file-input-${doc.id}`}
                                  className="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                                >
                                  <Upload size={14} />
                                  <span>Substituir Arquivo</span>
                                </label>
                              ) : doc.uploaded ? (
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor={`file-input-${doc.id}`}
                                    className="cursor-pointer text-xs font-semibold text-slate-600 hover:text-gci px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                                  >
                                    Substituir
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFile(doc.id)}
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Remover anexo"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              ) : (
                                <label
                                  htmlFor={`file-input-${doc.id}`}
                                  className="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow"
                                >
                                  <Upload size={14} />
                                  <span>Anexar Arquivo</span>
                                </label>
                              )}

                              <input
                                id={`file-input-${doc.id}`}
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                                className="hidden"
                                onChange={(e) => handleFileUpload(doc.id, e)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Informative Security Notice */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
              <ShieldCheck size={18} className="text-gci shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-slate-800">Transmissão Segura de Documentos</span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Formatos aceitos: <strong>JPG, JPEG, PNG ou PDF (base64)</strong> até <strong>12MB</strong> por arquivo.
                  {accountType === 'pf' ? (
                    <span> Documento oficial de identificação aceito: <strong>CNH, RG, RNE ou CIN</strong>.</span>
                  ) : (
                    <span> Documentos de identificação dos sócios/titular aceitos: <strong>CNH, RG, RNE ou CIN</strong>.</span>
                  )}
                </p>
              </div>
            </div>

            {/* Missing Mandatory Documents Notice */}
            {!isAllMandatoryUploaded && missingMandatoryDocs.length > 0 && (
              <div className="p-4 sm:p-5 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3.5 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <AlertCircle size={18} />
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                    Documentos obrigatórios pendentes de envio ({missingMandatoryDocs.length}):
                  </h4>
                  <ul className="text-xs text-amber-900 space-y-1 list-disc list-inside">
                    {missingMandatoryDocs.map((doc) => (
                      <li key={doc.id}>
                        <span className="font-semibold">{doc.targetPersonOrEntity}:</span> {doc.title}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-amber-800 pt-1">
                    Anexe os arquivos pendentes acima ou utilize o botão <strong>&quot;Anexar Todos (Demo)&quot;</strong> no topo da página para avançar à Assinatura.
                  </p>
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} />
                Voltar aos Dados Complementares
              </button>

              <button
                type="button"
                disabled={!isAllMandatoryUploaded || hasPendingRegularization}
                onClick={() => onSubmitDocs('pending')}
                className={`w-full sm:w-auto px-8 py-3.5 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isAllMandatoryUploaded && !hasPendingRegularization
                    ? 'bg-gci hover:bg-gci-hover text-white shadow-gci/10 cursor-pointer active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <span>
                  {hasRegularization ? 'Reenviar Documentos e Avançar' : 'Avançar para Assinatura da Abertura'}
                </span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto pt-6 text-center text-xs text-slate-400">
        © 2026 Grupo Ceres Investimentos. Todos os direitos reservados.
      </footer>
    </div>
  );
};
