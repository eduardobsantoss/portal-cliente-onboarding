import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Building2, 
  MapPin, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Info, 
  DollarSign, 
  Calendar, 
  Briefcase,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertCircle,
  AlertTriangle,
  Check
} from 'lucide-react';
import { Logo } from './Logo';

export interface NonPartnerRepresentative {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  telefone: string;
  cargo: string;
  vinculo: 'Administrador não sócio' | 'Procurador';
  estadoCivil: string;
  nomeConjuge?: string;
  cpfConjuge?: string;
  regimeBens?: string;
  pep: boolean;
}

export interface ComplementaryFormSubmitPayload {
  accountType: AccountType;
  socios: Socio[];
  nonPartnerRepresentatives?: NonPartnerRepresentative[];
  companyName?: string;
  cnpj?: string;
  tipoEmpresa?: string;
  capitalSocial?: string;
  hasProcurador?: boolean;
}

interface ComplementaryDataFormProps {
  onSubmit: (payload?: ComplementaryFormSubmitPayload) => void;
  onBack: () => void;
}

export type AccountType = 'pf' | 'pj';

export const REGIMES_DE_BENS = [
  'Comunhão parcial de bens',
  'Comunhão universal de bens',
  'Separação total de bens',
  'Separação obrigatória de bens',
  'Participação final nos aquestos',
];

export interface Socio {
  id: string;
  nome: string;
  cpfCnpj: string;
  email: string;
  telefone: string;
  isRepresentanteLegal?: boolean;
  // Endereço do sócio
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  // Dados pessoais do sócio
  dataNascimento: string;
  nomeMae: string;
  profissao: string;
  renda: string;
  estadoCivil: string;
  nomeConjuge?: string;
  cpfConjuge?: string;
  regimeBens?: string;
  genero: string;
  nacionalidade: string;
  responsabilidade: 'Sócio' | 'Representante legal' | 'Procurador' | string;
  cargo?: string;
  pep: boolean;
  // Opcionais do sócio
  nomePai?: string;
  rgNumero?: string;
  rgDataEmissao?: string;
  rgOrgao?: string;
}

const EMPRESA_TIPOS = [
  'Sociedade empresária limitada',
  'Sociedade limitada unipessoal',
  'Sociedade anônima',
  'Empresário individual',
  'MEI',
  'Sociedade simples',
  'Sociedade cooperativa',
  'Sociedade de associação privada',
  'Condomínio edifício',
];

export const ComplementaryDataForm: React.FC<ComplementaryDataFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const [accountType, setAccountType] = useState<AccountType>('pj');
  
  // Validation state
  const [isValidatingData, setIsValidatingData] = useState(false);
  const [hasDataErrors, setHasDataErrors] = useState(false);
  const [dataErrorMessage, setDataErrorMessage] = useState('');

  // PF Form State
  const [pfData, setPfData] = useState({
    // Obrigatórios
    cep: '38400-100',
    logradouro: 'Avenida Rondon Pacheco',
    numero: '4500',
    complemento: 'Sala 804',
    bairro: 'Tibery',
    cidade: 'Uberlândia',
    uf: 'MG',
    // Endereço de Correspondência PF
    correspondenciaMesmo: true,
    correspondenciaCep: '',
    correspondenciaLogradouro: '',
    correspondenciaNumero: '',
    correspondenciaComplemento: '',
    correspondenciaBairro: '',
    correspondenciaCidade: '',
    correspondenciaUf: '',

    dataNascimento: '1982-05-14',
    genero: 'Masculino',
    nacionalidade: 'Brasileira',
    nomeMae: 'Maria Helena Santos',
    profissao: 'Produtor Rural / Engenheiro Agrônomo',
    renda: '45.000,00',
    estadoCivil: 'Casado(a)',
    nomeConjuge: 'Juliana Costa Santos',
    cpfConjuge: '987.654.321-00',
    regimeBens: 'Comunhão parcial de bens',
    // Opcionais
    nomePai: 'Antônio dos Santos',
    pep: false,
    docTipo: 'RG',
    docNumero: 'MG-14.892.301',
    docDataExpedicao: '2015-08-20',
    docOrgao: 'SSP/MG',
  });

  const [showPfOptionals, setShowPfOptionals] = useState(false);

  // PJ Form State
  const [pjStep, setPjStep] = useState<1 | 2 | 3>(1);
  const [pjCompanyData, setPjCompanyData] = useState({
    // Passo 1: Dados da Empresa
    razaoSocial: 'AGRO INDUSTRIAL SOJA & MILHO LTDA',
    cnpj: '12.345.678/0001-90',
    dataAbertura: '2014-03-12',
    capitalSocial: '1.500.000,00',
    faturamentoAnual: '18.500.000,00',
    tipoEmpresa: 'Sociedade empresária limitada',
    cnae: '01.15-6/00 - Cultivo de soja',
    // Passo 2: Endereço da Empresa
    cep: '38400-100',
    logradouro: 'Avenida Rondon Pacheco',
    numero: '4500',
    complemento: 'Bloco A, Sala 801 a 806',
    bairro: 'Tibery',
    cidade: 'Uberlândia',
    uf: 'MG',
    // Endereço de correspondência PJ
    correspondenciaMesmo: true,
    correspondenciaCep: '',
    correspondenciaLogradouro: '',
    correspondenciaNumero: '',
    correspondenciaComplemento: '',
    correspondenciaBairro: '',
    correspondenciaCidade: '',
    correspondenciaUf: '',
  });

  // Passo 3: Sócios
  const [socios, setSocios] = useState<Socio[]>([
    {
      id: '1',
      nome: 'Eduardo Santos',
      cpfCnpj: '123.456.789-00',
      email: 'eduardo.santos@ceresinvestimentos.com',
      telefone: '(34) 99881-2233',
      isRepresentanteLegal: true, // Eduardo Santos vem marcado como representante legal
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
      nomeConjuge: 'Juliana Costa Santos',
      cpfConjuge: '987.654.321-00',
      regimeBens: 'Comunhão parcial de bens',
      genero: 'Masculino',
      nacionalidade: 'Brasileira',
      responsabilidade: 'Representante legal',
      pep: false,
      nomePai: 'Antônio dos Santos',
      rgNumero: 'MG-14.892.301',
      rgDataEmissao: '2015-08-20',
      rgOrgao: 'SSP/MG',
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
      nomeConjuge: 'Renata Prado Damasceno',
      cpfConjuge: '876.543.210-99',
      regimeBens: 'Comunhão parcial de bens',
      genero: 'Masculino',
      nacionalidade: 'Brasileira',
      responsabilidade: 'Sócio',
      pep: false,
      nomePai: 'João Damasceno',
      rgNumero: 'MG-12.784.551',
      rgDataEmissao: '2012-04-10',
      rgOrgao: 'SSP/MG',
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
      responsabilidade: 'Sócio',
      pep: false,
      nomePai: 'Roberto Drigo',
      rgNumero: 'MG-16.329.804',
      rgDataEmissao: '2016-09-18',
      rgOrgao: 'SSP/MG',
    },
  ]);

  // Representantes legais não sócios (item 3)
  const [nonPartnerReps, setNonPartnerReps] = useState<NonPartnerRepresentative[]>([]);
  const [isNonPartnerModalOpen, setIsNonPartnerModalOpen] = useState(false);
  const [editingNonPartnerId, setEditingNonPartnerId] = useState<string | null>(null);
  const [nonPartnerForm, setNonPartnerForm] = useState<Partial<NonPartnerRepresentative>>({
    vinculo: 'Administrador não sócio',
    cargo: 'Diretor Executivo',
    estadoCivil: 'Solteiro(a)',
    pep: false,
  });
  const [validationErrorNotice, setValidationErrorNotice] = useState<string | null>(null);

  const [isSocioModalOpen, setIsSocioModalOpen] = useState(false);
  const [editingSocioId, setEditingSocioId] = useState<string | null>(null);
  const [socioForm, setSocioForm] = useState<Partial<Socio>>({
    responsabilidade: 'Sócio',
    pep: false,
    nacionalidade: 'Brasileira',
    genero: 'Masculino',
    estadoCivil: 'Casado(a)',
  });
  const [showSocioOptionals, setShowSocioOptionals] = useState(false);

  // Open modal for new socio
  const handleOpenAddSocio = () => {
    setEditingSocioId(null);
    setSocioForm({
      nome: '',
      cpfCnpj: '',
      email: '',
      telefone: '',
      isRepresentanteLegal: false,
      cep: pjCompanyData.cep,
      logradouro: pjCompanyData.logradouro,
      numero: pjCompanyData.numero,
      bairro: pjCompanyData.bairro,
      cidade: pjCompanyData.cidade,
      uf: pjCompanyData.uf,
      dataNascimento: '',
      nomeMae: '',
      profissao: '',
      renda: '',
      estadoCivil: 'Solteiro(a)',
      genero: 'Masculino',
      nacionalidade: 'Brasileira',
      responsabilidade: 'Sócio',
      pep: false,
    });
    setShowSocioOptionals(false);
    setIsSocioModalOpen(true);
  };

  // Open modal to edit socio
  const handleOpenEditSocio = (socio: Socio) => {
    setEditingSocioId(socio.id);
    setSocioForm({ ...socio });
    setShowSocioOptionals(Boolean(socio.nomePai || socio.rgNumero));
    setIsSocioModalOpen(true);
  };

  // Save socio
  const handleSaveSocio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socioForm.nome || !socioForm.cpfCnpj) return;

    if (editingSocioId) {
      setSocios((prev) =>
        prev.map((s) => (s.id === editingSocioId ? ({ ...s, ...socioForm } as Socio) : s))
      );
    } else {
      const newSocio: Socio = {
        id: Date.now().toString(),
        nome: socioForm.nome || '',
        cpfCnpj: socioForm.cpfCnpj || '',
        email: socioForm.email || '',
        telefone: socioForm.telefone || '',
        isRepresentanteLegal: socioForm.isRepresentanteLegal || false,
        cep: socioForm.cep || '',
        logradouro: socioForm.logradouro || '',
        numero: socioForm.numero || '',
        complemento: socioForm.complemento,
        bairro: socioForm.bairro || '',
        cidade: socioForm.cidade || '',
        uf: socioForm.uf || '',
        dataNascimento: socioForm.dataNascimento || '',
        nomeMae: socioForm.nomeMae || '',
        profissao: socioForm.profissao || '',
        renda: socioForm.renda || '',
        estadoCivil: socioForm.estadoCivil || 'Solteiro(a)',
        nomeConjuge: socioForm.nomeConjuge,
        cpfConjuge: socioForm.cpfConjuge,
        regimeBens: socioForm.regimeBens,
        genero: socioForm.genero || 'Masculino',
        nacionalidade: socioForm.nacionalidade || 'Brasileira',
        responsabilidade: socioForm.responsabilidade || 'Sócio',
        pep: socioForm.pep || false,
        nomePai: socioForm.nomePai,
        rgNumero: socioForm.rgNumero,
        rgDataEmissao: socioForm.rgDataEmissao,
        rgOrgao: socioForm.rgOrgao,
      };
      setSocios((prev) => [...prev, newSocio]);
    }

    setIsSocioModalOpen(false);
  };

  // Toggle Representante Legal directly on socio card
  const handleToggleSocioRepresentante = (socioId: string) => {
    setSocios((prev) =>
      prev.map((s) => (s.id === socioId ? { ...s, isRepresentanteLegal: !s.isRepresentanteLegal } : s))
    );
    setValidationErrorNotice(null);
  };

  // Delete socio
  const handleDeleteSocio = (id: string) => {
    if (socios.length <= 1) {
      alert('É obrigatório manter pelo menos 1 sócio cadastrado.');
      return;
    }
    setSocios((prev) => prev.filter((s) => s.id !== id));
  };

  // Non-Partner Representatives Handlers (Item 3)
  const handleOpenAddNonPartner = () => {
    setEditingNonPartnerId(null);
    setNonPartnerForm({
      nome: '',
      cpf: '',
      dataNascimento: '',
      email: '',
      telefone: '',
      cargo: 'Diretor / Procurador',
      vinculo: 'Administrador não sócio',
      estadoCivil: 'Solteiro(a)',
      pep: false,
    });
    setIsNonPartnerModalOpen(true);
  };

  const handleOpenEditNonPartner = (rep: NonPartnerRepresentative) => {
    setEditingNonPartnerId(rep.id);
    setNonPartnerForm({ ...rep });
    setIsNonPartnerModalOpen(true);
  };

  const handleSaveNonPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nonPartnerForm.nome || !nonPartnerForm.cpf) return;

    if (editingNonPartnerId) {
      setNonPartnerReps((prev) =>
        prev.map((r) =>
          r.id === editingNonPartnerId ? ({ ...r, ...nonPartnerForm } as NonPartnerRepresentative) : r
        )
      );
    } else {
      const newRep: NonPartnerRepresentative = {
        id: `np-${Date.now()}`,
        nome: nonPartnerForm.nome || '',
        cpf: nonPartnerForm.cpf || '',
        dataNascimento: nonPartnerForm.dataNascimento || '',
        email: nonPartnerForm.email || '',
        telefone: nonPartnerForm.telefone || '',
        cargo: nonPartnerForm.cargo || 'Diretor Executivo',
        vinculo: nonPartnerForm.vinculo || 'Administrador não sócio',
        estadoCivil: nonPartnerForm.estadoCivil || 'Solteiro(a)',
        nomeConjuge: nonPartnerForm.nomeConjuge,
        cpfConjuge: nonPartnerForm.cpfConjuge,
        regimeBens: nonPartnerForm.regimeBens,
        pep: nonPartnerForm.pep || false,
      };
      setNonPartnerReps((prev) => [...prev, newRep]);
    }
    setIsNonPartnerModalOpen(false);
    setValidationErrorNotice(null);
  };

  const handleDeleteNonPartner = (id: string) => {
    setNonPartnerReps((prev) => prev.filter((r) => r.id !== id));
  };

  // Trigger submission to advance directly to Document Upload
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validação Item 3: não permitir avançar sem pelo menos um representante legal
    if (accountType === 'pj') {
      const hasSocioRep = socios.some((s) => s.isRepresentanteLegal);
      const hasNonPartnerRep = nonPartnerReps.length > 0;
      if (!hasSocioRep && !hasNonPartnerRep) {
        setValidationErrorNotice('Indique pelo menos um representante legal.');
        return;
      }
    }

    setValidationErrorNotice(null);

    const hasProcurador = nonPartnerReps.some((r) => r.vinculo === 'Procurador');

    onSubmit({
      accountType,
      socios,
      nonPartnerRepresentatives: nonPartnerReps,
      companyName: pjCompanyData.razaoSocial,
      cnpj: pjCompanyData.cnpj,
      tipoEmpresa: pjCompanyData.tipoEmpresa,
      capitalSocial: pjCompanyData.capitalSocial,
      hasProcurador,
    });
  };

  /* 
  // Simulation 1: Approve data and advance to Document Upload
  const handleApproveData = () => {
    setIsValidatingData(false);
    setHasDataErrors(false);
    onSubmit({
      accountType,
      socios,
      companyName: pjCompanyData.razaoSocial,
      cnpj: pjCompanyData.cnpj,
      tipoEmpresa: pjCompanyData.tipoEmpresa,
    });
  };

  // Simulation 2: Data has errors / need adjustments
  const handleSimulateDataErrors = () => {
    setIsValidatingData(false);
    setHasDataErrors(true);
    setDataErrorMessage(
      accountType === 'pj'
        ? 'Identificamos divergência nos dados cadastrais informados. Por favor, revise as informações destacadas.'
        : 'Identificamos inconsistência nos dados declarados. Por favor, revise as informações antes de prosseguir.'
    );
    if (accountType === 'pj') {
      setPjStep(1);
    }
  };

  // Validation Loading Screen (Data verification) - Mantido comentado conforme solicitado
  if (isValidatingData) {
    return (
      <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
        <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <Logo variant="dark" className="h-10 md:h-12 w-auto" />
            <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Portal do Cliente • Validação Cadastral
            </span>
          </div>
        </header>

        <main className="max-w-2xl w-full mx-auto my-auto py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 text-center space-y-6"
          >
            <div className="text-center py-6 md:py-8 space-y-8">
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#004A2F]/10 animate-ping opacity-75" />
                <div className="absolute inset-0 rounded-full border-4 border-gray-100 border-t-[#004A2F] border-r-[#FF7300] animate-spin" />
                <div className="w-20 h-20 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#004A2F] relative z-10">
                  <ShieldCheck size={36} className="text-[#FF7300] animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Validando dados cadastrais
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
                  Estamos conferindo a consistência das informações fornecidas para prosseguir com a abertura da sua conta.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  Controles de Simulação (Dados Cadastrais)
                </span>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={handleApproveData}
                    className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-gci/15 flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <CheckCircle2 size={15} />
                    Aprovar Dados (Sucesso)
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulateDataErrors}
                    className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/15 flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <AlertTriangle size={15} />
                    Ajustar Dados (Divergência)
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <footer className="max-w-4xl w-full mx-auto pt-6 text-center text-xs text-slate-400">
          © 2026 Grupo Ceres Investimentos. Todos os direitos reservados.
        </footer>
      </div>
    );
  }
  */

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Logo variant="dark" className="h-10 md:h-12 w-auto" />
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Portal do Cliente • Abertura de Conta
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-3">
              <FileText size={26} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Dados complementares para abertura de conta
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed max-w-2xl">
              Preencha as informações cadastrais necessárias para formalizar a abertura da sua conta junto ao Grupo Ceres Investimentos.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Seletor discreto de simulação de tipo de conta (PF / PJ) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs">
              <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                <Info size={14} className="text-slate-400" />
                Simular preenchimento como:
              </span>
              <div className="inline-flex p-1 bg-slate-200/60 rounded-lg self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setAccountType('pf');
                    setHasDataErrors(false);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    accountType === 'pf'
                      ? 'bg-white text-gci shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Pessoa Física
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccountType('pj');
                    setHasDataErrors(false);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    accountType === 'pj'
                      ? 'bg-white text-gci shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Pessoa Jurídica
                </button>
              </div>
            </div>

            {/* Error Banner when simulation flagged data inconsistencies */}
            {hasDataErrors && (
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
                    Ajuste necessário nos dados cadastrais
                  </h4>
                  <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                    {dataErrorMessage || 'Identificamos inconsistência nas informações declaradas. Por favor, revise os dados destacados e reenvie para validação.'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* FORM: PESSOA FÍSICA */}
            {accountType === 'pf' && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Bloco 1: Dados Pessoais */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <User size={18} className="text-gci" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      1. Dados Pessoais (Obrigatórios)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Data de Nascimento *
                      </label>
                      <input
                        type="date"
                        required
                        value={pfData.dataNascimento}
                        onChange={(e) => setPfData({ ...pfData, dataNascimento: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Gênero *
                      </label>
                      <select
                        required
                        value={pfData.genero}
                        onChange={(e) => setPfData({ ...pfData, genero: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      >
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                        <option value="Prefiro não informar">Prefiro não informar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Nacionalidade *
                      </label>
                      <input
                        type="text"
                        required
                        value={pfData.nacionalidade}
                        onChange={(e) => setPfData({ ...pfData, nacionalidade: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Nome da Mãe *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nome completo da mãe"
                        value={pfData.nomeMae}
                        onChange={(e) => setPfData({ ...pfData, nomeMae: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Profissão / Ocupação *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Produtor Rural / Administrador"
                        value={pfData.profissao}
                        onChange={(e) => setPfData({ ...pfData, profissao: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Renda Mensal Estimada (R$) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: 25.000,00"
                        value={pfData.renda}
                        onChange={(e) => setPfData({ ...pfData, renda: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 ${
                          hasDataErrors ? 'border-amber-400 bg-amber-50/40 text-slate-900' : 'border-slate-200 bg-white'
                        }`}
                      />
                      {hasDataErrors && (
                        <span className="text-[10px] text-amber-700 font-semibold mt-1 block">
                          Comprovação de renda compatível será solicitada na próxima etapa
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Estado Civil *
                      </label>
                      <select
                        required
                        value={pfData.estadoCivil}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPfData((prev) => ({
                            ...prev,
                            estadoCivil: val,
                            nomeConjuge: val === 'Casado(a)' || val === 'União Estável' ? prev.nomeConjuge : '',
                            cpfConjuge: val === 'Casado(a)' || val === 'União Estável' ? prev.cpfConjuge : '',
                            regimeBens: val === 'Casado(a)' || val === 'União Estável' ? prev.regimeBens || REGIMES_DE_BENS[0] : '',
                          }));
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      >
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="União Estável">União Estável</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                        <option value="Viúvo(a)">Viúvo(a)</option>
                      </select>
                    </div>

                    {(pfData.estadoCivil === 'Casado(a)' || pfData.estadoCivil === 'União Estável') && (
                      <>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Nome do Cônjuge *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nome completo do cônjuge"
                            value={pfData.nomeConjuge}
                            onChange={(e) => setPfData({ ...pfData, nomeConjuge: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            CPF do Cônjuge *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="000.000.000-00"
                            value={pfData.cpfConjuge}
                            onChange={(e) => setPfData({ ...pfData, cpfConjuge: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Regime de Bens *
                          </label>
                          <select
                            required
                            value={pfData.regimeBens || REGIMES_DE_BENS[0]}
                            onChange={(e) => setPfData({ ...pfData, regimeBens: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                          >
                            {REGIMES_DE_BENS.map((regime) => (
                              <option key={regime} value={regime}>
                                {regime}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bloco 2: Endereço Residencial */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <MapPin size={18} className="text-gci" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      2. Endereço Residencial (Obrigatório)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">CEP *</label>
                      <input
                        type="text"
                        required
                        value={pfData.cep}
                        onChange={(e) => setPfData({ ...pfData, cep: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Logradouro / Rua *</label>
                      <input
                        type="text"
                        required
                        value={pfData.logradouro}
                        onChange={(e) => setPfData({ ...pfData, logradouro: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Número *</label>
                      <input
                        type="text"
                        required
                        value={pfData.numero}
                        onChange={(e) => setPfData({ ...pfData, numero: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Complemento</label>
                      <input
                        type="text"
                        placeholder="Apto, Sala, Bloco"
                        value={pfData.complemento}
                        onChange={(e) => setPfData({ ...pfData, complemento: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Bairro *</label>
                      <input
                        type="text"
                        required
                        value={pfData.bairro}
                        onChange={(e) => setPfData({ ...pfData, bairro: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Cidade *</label>
                      <input
                        type="text"
                        required
                        value={pfData.cidade}
                        onChange={(e) => setPfData({ ...pfData, cidade: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Estado (UF) *</label>
                      <input
                        type="text"
                        maxLength={2}
                        required
                        value={pfData.uf}
                        onChange={(e) => setPfData({ ...pfData, uf: e.target.value.toUpperCase() })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>
                  </div>

                  {/* Item 5: Endereço de Correspondência PF */}
                  <div className="pt-2">
                    <label className="flex items-center gap-2.5 cursor-pointer p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                      <input
                        type="checkbox"
                        checked={pfData.correspondenciaMesmo}
                        onChange={(e) => setPfData({ ...pfData, correspondenciaMesmo: e.target.checked })}
                        className="w-4 h-4 rounded text-gci focus:ring-gci border-slate-300"
                      />
                      <span className="text-xs font-semibold text-slate-800">
                        O endereço de correspondência é o mesmo
                      </span>
                    </label>

                    {!pfData.correspondenciaMesmo && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-4"
                      >
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Endereço de Correspondência *
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">CEP *</label>
                            <input
                              type="text"
                              required={!pfData.correspondenciaMesmo}
                              value={pfData.correspondenciaCep}
                              onChange={(e) => setPfData({ ...pfData, correspondenciaCep: e.target.value })}
                              placeholder="00000-000"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Logradouro / Rua *</label>
                            <input
                              type="text"
                              required={!pfData.correspondenciaMesmo}
                              value={pfData.correspondenciaLogradouro}
                              onChange={(e) => setPfData({ ...pfData, correspondenciaLogradouro: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Número *</label>
                            <input
                              type="text"
                              required={!pfData.correspondenciaMesmo}
                              value={pfData.correspondenciaNumero}
                              onChange={(e) => setPfData({ ...pfData, correspondenciaNumero: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Complemento</label>
                            <input
                              type="text"
                              placeholder="Apto, Sala, Bloco"
                              value={pfData.correspondenciaComplemento}
                              onChange={(e) => setPfData({ ...pfData, correspondenciaComplemento: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Bairro *</label>
                            <input
                              type="text"
                              required={!pfData.correspondenciaMesmo}
                              value={pfData.correspondenciaBairro}
                              onChange={(e) => setPfData({ ...pfData, correspondenciaBairro: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Cidade *</label>
                            <input
                              type="text"
                              required={!pfData.correspondenciaMesmo}
                              value={pfData.correspondenciaCidade}
                              onChange={(e) => setPfData({ ...pfData, correspondenciaCidade: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Estado (UF) *</label>
                            <input
                              type="text"
                              maxLength={2}
                              required={!pfData.correspondenciaMesmo}
                              value={pfData.correspondenciaUf}
                              onChange={(e) => setPfData({ ...pfData, correspondenciaUf: e.target.value.toUpperCase() })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Seção Opcional Colapsável */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setShowPfOptionals(!showPfOptionals)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">
                        Informações adicionais e complementares
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-200/80 px-2 py-0.5 rounded-full uppercase">
                        Opcional
                      </span>
                    </div>
                    {showPfOptionals ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                  </button>

                  {showPfOptionals && (
                    <div className="p-4 pt-2 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Nome do Pai</label>
                        <input
                          type="text"
                          value={pfData.nomePai}
                          onChange={(e) => setPfData({ ...pfData, nomePai: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        />
                      </div>

                      <div className="sm:col-span-2 pt-2 border-t border-slate-200/50">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pfData.pep}
                            onChange={(e) => setPfData({ ...pfData, pep: e.target.checked })}
                            className="w-4 h-4 rounded text-gci focus:ring-gci border-slate-300"
                          />
                          <span className="text-xs font-medium text-slate-700">
                            Sou ou possuo relação com Pessoa Politicamente Exposta (PEP)
                          </span>
                        </label>
                      </div>

                      <div className="sm:col-span-2 pt-2 border-t border-slate-200/50">
                        <span className="block text-[11px] font-bold text-slate-700 mb-2">Documento de Identificação Alternativo</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">Tipo</label>
                            <input
                              type="text"
                              value={pfData.docTipo}
                              onChange={(e) => setPfData({ ...pfData, docTipo: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">Número</label>
                            <input
                              type="text"
                              value={pfData.docNumero}
                              onChange={(e) => setPfData({ ...pfData, docNumero: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">Expedição</label>
                            <input
                              type="date"
                              value={pfData.docDataExpedicao}
                              onChange={(e) => setPfData({ ...pfData, docDataExpedicao: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">Órgão Emissor</label>
                            <input
                              type="text"
                              value={pfData.docOrgao}
                              onChange={(e) => setPfData({ ...pfData, docOrgao: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-gci hover:bg-gci-hover text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-gci/10 flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
                  >
                    <span>Avançar pro Envio de Documentos</span>
                    <ArrowRight size={17} />
                  </button>
                </div>
              </form>
            )}

            {/* FORM: PESSOA JURÍDICA */}
            {accountType === 'pj' && (
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      {pjStep === 1 && '1. Dados da Empresa'}
                      {pjStep === 2 && '2. Endereço da Empresa'}
                      {pjStep === 3 && '3. Quadro de Sócios'}
                    </span>
                    <span className="font-bold text-gci">Passo {pjStep} de 3</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(pjStep / 3) * 100}%` }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-gci rounded-full"
                    />
                  </div>
                </div>

                {/* PASSO 1: DADOS DA EMPRESA */}
                {pjStep === 1 && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPjStep(2);
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Razão Social / Nome Empresarial
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={pjCompanyData.razaoSocial}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          CNPJ
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={pjCompanyData.cnpj}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Data de Abertura da Empresa *
                        </label>
                        <input
                          type="date"
                          required
                          value={pjCompanyData.dataAbertura}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, dataAbertura: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Capital Social (R$) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: 500.000,00"
                          value={pjCompanyData.capitalSocial}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, capitalSocial: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Faturamento Anual Estimado (R$) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: 5.000.000,00"
                          value={pjCompanyData.faturamentoAnual}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, faturamentoAnual: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Tipo de Empresa (Natureza Jurídica) *
                        </label>
                        <select
                          required
                          value={pjCompanyData.tipoEmpresa}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, tipoEmpresa: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        >
                          {EMPRESA_TIPOS.map((tipo) => (
                            <option key={tipo} value={tipo}>
                              {tipo}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] font-bold text-slate-700">
                            CNAE Principal *
                          </label>
                          {hasDataErrors && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <AlertCircle size={11} /> Divergência cadastral
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Ex: 01.15-6/00 - Cultivo de soja"
                          value={pjCompanyData.cnae}
                          onChange={(e) => {
                            setPjCompanyData({ ...pjCompanyData, cnae: e.target.value });
                          }}
                          className={`w-full px-3.5 py-2.5 rounded-xl border font-medium focus:outline-none focus:ring-2 ${
                            hasDataErrors
                              ? 'border-amber-400 bg-amber-50/40 text-slate-900 focus:ring-amber-500/20'
                              : 'border-slate-200 bg-white focus:ring-gci/20 focus:border-gci'
                          }`}
                        />
                        {hasDataErrors && (
                          <p className="text-[11px] text-amber-700 mt-1 font-medium">
                            Por favor, confirme se o CNAE informado coincide com a atividade principal da sua empresa.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gci hover:bg-gci-hover text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-gci/10 flex items-center gap-2 active:scale-95"
                      >
                        Avançar para Endereço
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}

                {/* PASSO 2: ENDEREÇO DA EMPRESA */}
                {pjStep === 2 && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPjStep(3);
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">CEP *</label>
                        <input
                          type="text"
                          required
                          value={pjCompanyData.cep}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, cep: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Logradouro / Avenida *</label>
                        <input
                          type="text"
                          required
                          value={pjCompanyData.logradouro}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, logradouro: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Número *</label>
                        <input
                          type="text"
                          required
                          value={pjCompanyData.numero}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, numero: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Complemento</label>
                        <input
                          type="text"
                          placeholder="Bloco, Sala"
                          value={pjCompanyData.complemento}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, complemento: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Bairro *</label>
                        <input
                          type="text"
                          required
                          value={pjCompanyData.bairro}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, bairro: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Cidade *</label>
                        <input
                          type="text"
                          required
                          value={pjCompanyData.cidade}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, cidade: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Estado (UF) *</label>
                        <input
                          type="text"
                          maxLength={2}
                          required
                          value={pjCompanyData.uf}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, uf: e.target.value.toUpperCase() })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                        />
                      </div>
                    </div>

                    {/* Item 5: Endereço de Correspondência PJ */}
                    <div className="pt-2">
                      <label className="flex items-center gap-2.5 cursor-pointer p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                        <input
                          type="checkbox"
                          checked={pjCompanyData.correspondenciaMesmo}
                          onChange={(e) =>
                            setPjCompanyData({ ...pjCompanyData, correspondenciaMesmo: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-gci focus:ring-gci border-slate-300"
                        />
                        <span className="text-xs font-semibold text-slate-800">
                          O endereço de correspondência é o mesmo
                        </span>
                      </label>

                      {!pjCompanyData.correspondenciaMesmo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 p-4 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-4"
                        >
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Endereço de Correspondência da Empresa *
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">CEP *</label>
                              <input
                                type="text"
                                required={!pjCompanyData.correspondenciaMesmo}
                                value={pjCompanyData.correspondenciaCep}
                                onChange={(e) =>
                                  setPjCompanyData({ ...pjCompanyData, correspondenciaCep: e.target.value })
                                }
                                placeholder="00000-000"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Logradouro / Avenida *</label>
                              <input
                                type="text"
                                required={!pjCompanyData.correspondenciaMesmo}
                                value={pjCompanyData.correspondenciaLogradouro}
                                onChange={(e) =>
                                  setPjCompanyData({ ...pjCompanyData, correspondenciaLogradouro: e.target.value })
                                }
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Número *</label>
                              <input
                                type="text"
                                required={!pjCompanyData.correspondenciaMesmo}
                                value={pjCompanyData.correspondenciaNumero}
                                onChange={(e) =>
                                  setPjCompanyData({ ...pjCompanyData, correspondenciaNumero: e.target.value })
                                }
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Complemento</label>
                              <input
                                type="text"
                                placeholder="Bloco, Sala"
                                value={pjCompanyData.correspondenciaComplemento}
                                onChange={(e) =>
                                  setPjCompanyData({ ...pjCompanyData, correspondenciaComplemento: e.target.value })
                                }
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Bairro *</label>
                              <input
                                type="text"
                                required={!pjCompanyData.correspondenciaMesmo}
                                value={pjCompanyData.correspondenciaBairro}
                                onChange={(e) =>
                                  setPjCompanyData({ ...pjCompanyData, correspondenciaBairro: e.target.value })
                                }
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Cidade *</label>
                              <input
                                type="text"
                                required={!pjCompanyData.correspondenciaMesmo}
                                value={pjCompanyData.correspondenciaCidade}
                                onChange={(e) =>
                                  setPjCompanyData({ ...pjCompanyData, correspondenciaCidade: e.target.value })
                                }
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Estado (UF) *</label>
                              <input
                                type="text"
                                maxLength={2}
                                required={!pjCompanyData.correspondenciaMesmo}
                                value={pjCompanyData.correspondenciaUf}
                                onChange={(e) =>
                                  setPjCompanyData({ ...pjCompanyData, correspondenciaUf: e.target.value.toUpperCase() })
                                }
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setPjStep(1)}
                        className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all"
                      >
                        Voltar para Dados
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-3 bg-gci hover:bg-gci-hover text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-gci/10 flex items-center gap-2 active:scale-95"
                      >
                        Avançar para Quadro Societário
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}

                {/* PASSO 3: SÓCIOS */}
                {pjStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                          Sócios e Administradores Cadastrados
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Mantenha as informações conforme o Contrato Social da empresa.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleOpenAddSocio}
                        className="px-3.5 py-2 bg-white hover:bg-slate-100 text-gci border border-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
                      >
                        <Plus size={14} />
                        Adicionar Outro Sócio
                      </button>
                    </div>

                    {/* Validation error notice if no representative is selected */}
                    {validationErrorNotice && (
                      <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-2xl flex items-center gap-2">
                        <AlertCircle size={16} className="text-rose-600 shrink-0" />
                        <span>{validationErrorNotice}</span>
                      </div>
                    )}

                    {/* Lista de Sócios */}
                    <div className="space-y-3">
                      {socios.map((socio, idx) => (
                        <div
                          key={socio.id}
                          className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 text-gci flex items-center justify-center font-bold text-xs shrink-0">
                              {idx + 1}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-xs font-bold text-slate-900">{socio.nome}</h4>
                                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                                  {socio.responsabilidade}
                                </span>
                                {socio.isRepresentanteLegal && (
                                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Check size={11} strokeWidth={3} /> Representante Legal
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500">
                                CPF/CNPJ: {socio.cpfCnpj} • {socio.email} • {socio.telefone}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {socio.cidade}/{socio.uf} • {socio.profissao} • {socio.estadoCivil}
                                {socio.regimeBens && ` (${socio.regimeBens})`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            {/* Checkbox Representante Legal no card do sócio */}
                            <label className="flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 transition-colors">
                              <input
                                type="checkbox"
                                checked={Boolean(socio.isRepresentanteLegal)}
                                onChange={() => handleToggleSocioRepresentante(socio.id)}
                                className="w-4 h-4 rounded text-gci focus:ring-gci border-slate-300"
                              />
                              <span>Representante legal</span>
                            </label>

                            <button
                              type="button"
                              onClick={() => handleOpenEditSocio(socio)}
                              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-gci hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Edit3 size={13} />
                              Editar
                            </button>
                            {socios.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteSocio(socio.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remover Sócio"
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* SEÇÃO PRÓPRIA: Representantes Legais Não Sócios (Item 3) */}
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                            Representantes Legais Não Sócios
                          </h3>
                          <p className="text-[11px] text-slate-500">
                            Cadastre administradores não sócios ou procuradores com poderes de representação.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleOpenAddNonPartner}
                          className="px-3.5 py-2 bg-white hover:bg-slate-100 text-gci border border-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
                        >
                          <Plus size={14} />
                          Adicionar representante que não é sócio
                        </button>
                      </div>

                      {nonPartnerReps.length === 0 ? (
                        <div className="p-4 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400">
                          Nenhum representante não sócio cadastrado. Se houver administrador ou procurador externo, clique acima.
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {nonPartnerReps.map((rep) => (
                            <div
                              key={rep.id}
                              className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold text-xs shrink-0">
                                  RL
                                </div>
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-xs font-bold text-slate-900">{rep.nome}</h4>
                                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full">
                                      {rep.vinculo}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                      Cargo: {rep.cargo}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500">
                                    CPF: {rep.cpf} • {rep.email} • {rep.telefone}
                                  </p>
                                  <p className="text-[10px] text-slate-400">
                                    Estado civil: {rep.estadoCivil}
                                    {rep.nomeConjuge && ` • Cônjuge: ${rep.nomeConjuge} (${rep.regimeBens || 'Comunhão parcial'})`}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-center">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditNonPartner(rep)}
                                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-gci hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
                                >
                                  <Edit3 size={13} />
                                  Editar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteNonPartner(rep.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Remover Representante"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setPjStep(2)}
                        className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all"
                      >
                        Voltar para Endereço
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSubmit()}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-gci hover:bg-gci-hover text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-gci/10 flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
                      >
                        <span>Avançar pro Envio de Documentos</span>
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* SÓCIO MODAL */}
      <AnimatePresence>
        {isSocioModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto border border-slate-200"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <Users size={20} className="text-gci" />
                  <h3 className="text-base font-bold text-slate-900">
                    {editingSocioId ? 'Editar Sócio' : 'Adicionar Sócio / Administrador'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSocioModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveSocio} className="space-y-6">
                {/* Obrigatórios Sócio */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Dados Pessoais e de Contato (Obrigatórios)
                    </h4>
                    {/* Toggle de Representante Legal no modal */}
                    <label className="flex items-center gap-2 cursor-pointer px-3 py-1 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
                      <input
                        type="checkbox"
                        checked={Boolean(socioForm.isRepresentanteLegal)}
                        onChange={(e) =>
                          setSocioForm({ ...socioForm, isRepresentanteLegal: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-gci focus:ring-gci border-emerald-300"
                      />
                      <span>Representante legal</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={socioForm.nome || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, nome: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        CPF ou CNPJ *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="000.000.000-00"
                        value={socioForm.cpfCnpj || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, cpfCnpj: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Responsabilidade / Cargo *
                      </label>
                      <select
                        value={socioForm.responsabilidade || 'Sócio'}
                        onChange={(e) =>
                          setSocioForm({
                            ...socioForm,
                            responsabilidade: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      >
                        <option value="Sócio">Sócio</option>
                        <option value="Representante legal">Representante legal</option>
                        <option value="Procurador">Procurador</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">E-mail *</label>
                      <input
                        type="email"
                        required
                        placeholder="socio@email.com"
                        value={socioForm.email || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Telefone / Celular *</label>
                      <input
                        type="text"
                        required
                        placeholder="(00) 00000-0000"
                        value={socioForm.telefone || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, telefone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Data de Nascimento *</label>
                      <input
                        type="date"
                        required
                        value={socioForm.dataNascimento || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, dataNascimento: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome da Mãe *</label>
                      <input
                        type="text"
                        required
                        value={socioForm.nomeMae || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, nomeMae: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Profissão *</label>
                      <input
                        type="text"
                        required
                        value={socioForm.profissao || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, profissao: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Renda Mensal (R$) *</label>
                      <input
                        type="text"
                        required
                        value={socioForm.renda || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, renda: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Gênero *</label>
                      <select
                        value={socioForm.genero || 'Masculino'}
                        onChange={(e) => setSocioForm({ ...socioForm, genero: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      >
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Nacionalidade *</label>
                      <input
                        type="text"
                        required
                        value={socioForm.nacionalidade || 'Brasileira'}
                        onChange={(e) => setSocioForm({ ...socioForm, nacionalidade: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    {/* Estado Civil e Cônjuge nos Dados Pessoais do Sócio (Item 6) */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Estado Civil *</label>
                      <select
                        required
                        value={socioForm.estadoCivil || 'Solteiro(a)'}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSocioForm((prev) => ({
                            ...prev,
                            estadoCivil: val,
                            nomeConjuge: val === 'Casado(a)' || val === 'União Estável' ? prev.nomeConjuge : '',
                            cpfConjuge: val === 'Casado(a)' || val === 'União Estável' ? prev.cpfConjuge : '',
                            regimeBens: val === 'Casado(a)' || val === 'União Estável' ? prev.regimeBens || REGIMES_DE_BENS[0] : '',
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      >
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="União Estável">União Estável</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                        <option value="Viúvo(a)">Viúvo(a)</option>
                      </select>
                    </div>

                    {(socioForm.estadoCivil === 'Casado(a)' || socioForm.estadoCivil === 'União Estável') && (
                      <>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome do Cônjuge *</label>
                          <input
                            type="text"
                            required
                            placeholder="Nome completo do cônjuge"
                            value={socioForm.nomeConjuge || ''}
                            onChange={(e) => setSocioForm({ ...socioForm, nomeConjuge: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">CPF do Cônjuge *</label>
                          <input
                            type="text"
                            required
                            placeholder="000.000.000-00"
                            value={socioForm.cpfConjuge || ''}
                            onChange={(e) => setSocioForm({ ...socioForm, cpfConjuge: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Regime de Bens *</label>
                          <select
                            required
                            value={socioForm.regimeBens || REGIMES_DE_BENS[0]}
                            onChange={(e) => setSocioForm({ ...socioForm, regimeBens: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                          >
                            {REGIMES_DE_BENS.map((regime) => (
                              <option key={regime} value={regime}>
                                {regime}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Endereço do Sócio */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Endereço do Sócio (Obrigatório)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">CEP *</label>
                      <input
                        type="text"
                        required
                        value={socioForm.cep || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, cep: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Logradouro *</label>
                      <input
                        type="text"
                        required
                        value={socioForm.logradouro || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, logradouro: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Número *</label>
                      <input
                        type="text"
                        required
                        value={socioForm.numero || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, numero: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Complemento</label>
                      <input
                        type="text"
                        value={socioForm.complemento || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, complemento: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Bairro *</label>
                      <input
                        type="text"
                        required
                        value={socioForm.bairro || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, bairro: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Cidade *</label>
                      <input
                        type="text"
                        required
                        value={socioForm.cidade || ''}
                        onChange={(e) => setSocioForm({ ...socioForm, cidade: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">UF *</label>
                      <input
                        type="text"
                        maxLength={2}
                        required
                        value={socioForm.uf || ''}
                        onChange={(e) =>
                          setSocioForm({ ...socioForm, uf: e.target.value.toUpperCase() })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>
                  </div>
                </div>

                {/* Opcionais Sócio */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setShowSocioOptionals(!showSocioOptionals)}
                    className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-700">
                      Informações adicionais do sócio (Opcional)
                    </span>
                    {showSocioOptionals ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                  </button>

                  {showSocioOptionals && (
                    <div className="p-4 pt-2 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Nome do Pai</label>
                        <input
                          type="text"
                          value={socioForm.nomePai || ''}
                          onChange={(e) => setSocioForm({ ...socioForm, nomePai: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2 pt-2 border-t border-slate-200/50">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={socioForm.pep || false}
                            onChange={(e) => setSocioForm({ ...socioForm, pep: e.target.checked })}
                            className="w-4 h-4 rounded text-gci focus:ring-gci border-slate-300"
                          />
                          <span className="text-xs font-medium text-slate-700">
                            Pessoa Politicamente Exposta (PEP)
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSocioModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gci hover:bg-gci-hover text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    {editingSocioId ? 'Atualizar Sócio' : 'Salvar Sócio'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REPRESENTANTE NÃO SÓCIO MODAL (Item 3) */}
      <AnimatePresence>
        {isNonPartnerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto border border-slate-200"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={20} className="text-gci" />
                  <h3 className="text-base font-bold text-slate-900">
                    {editingNonPartnerId ? 'Editar Representante Não Sócio' : 'Adicionar Representante Que Não É Sócio'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNonPartnerModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveNonPartner} className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Dados do Administrador Não Sócio ou Procurador
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nome completo do representante"
                        value={nonPartnerForm.nome || ''}
                        onChange={(e) => setNonPartnerForm({ ...nonPartnerForm, nome: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        CPF *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="000.000.000-00"
                        value={nonPartnerForm.cpf || ''}
                        onChange={(e) => setNonPartnerForm({ ...nonPartnerForm, cpf: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Tipo de Vínculo *
                      </label>
                      <select
                        required
                        value={nonPartnerForm.vinculo || 'Administrador não sócio'}
                        onChange={(e) =>
                          setNonPartnerForm({
                            ...nonPartnerForm,
                            vinculo: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      >
                        <option value="Administrador não sócio">Administrador não sócio</option>
                        <option value="Procurador">Procurador</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Cargo / Função *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Diretor Financeiro, Procurador Legal"
                        value={nonPartnerForm.cargo || ''}
                        onChange={(e) => setNonPartnerForm({ ...nonPartnerForm, cargo: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Data de Nascimento *</label>
                      <input
                        type="date"
                        required
                        value={nonPartnerForm.dataNascimento || ''}
                        onChange={(e) => setNonPartnerForm({ ...nonPartnerForm, dataNascimento: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">E-mail *</label>
                      <input
                        type="email"
                        required
                        placeholder="representante@email.com"
                        value={nonPartnerForm.email || ''}
                        onChange={(e) => setNonPartnerForm({ ...nonPartnerForm, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Celular / Telefone *</label>
                      <input
                        type="text"
                        required
                        placeholder="(00) 00000-0000"
                        value={nonPartnerForm.telefone || ''}
                        onChange={(e) => setNonPartnerForm({ ...nonPartnerForm, telefone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      />
                    </div>

                    {/* Estado Civil e Cônjuge (Item 6) */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Estado Civil *</label>
                      <select
                        required
                        value={nonPartnerForm.estadoCivil || 'Solteiro(a)'}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNonPartnerForm((prev) => ({
                            ...prev,
                            estadoCivil: val,
                            nomeConjuge: val === 'Casado(a)' || val === 'União Estável' ? prev.nomeConjuge : '',
                            cpfConjuge: val === 'Casado(a)' || val === 'União Estável' ? prev.cpfConjuge : '',
                            regimeBens: val === 'Casado(a)' || val === 'União Estável' ? prev.regimeBens || REGIMES_DE_BENS[0] : '',
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci"
                      >
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="União Estável">União Estável</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                        <option value="Viúvo(a)">Viúvo(a)</option>
                      </select>
                    </div>

                    {(nonPartnerForm.estadoCivil === 'Casado(a)' || nonPartnerForm.estadoCivil === 'União Estável') && (
                      <>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome do Cônjuge *</label>
                          <input
                            type="text"
                            required
                            placeholder="Nome completo do cônjuge"
                            value={nonPartnerForm.nomeConjuge || ''}
                            onChange={(e) => setNonPartnerForm({ ...nonPartnerForm, nomeConjuge: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">CPF do Cônjuge *</label>
                          <input
                            type="text"
                            required
                            placeholder="000.000.000-00"
                            value={nonPartnerForm.cpfConjuge || ''}
                            onChange={(e) => setNonPartnerForm({ ...nonPartnerForm, cpfConjuge: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Regime de Bens *</label>
                          <select
                            required
                            value={nonPartnerForm.regimeBens || REGIMES_DE_BENS[0]}
                            onChange={(e) => setNonPartnerForm({ ...nonPartnerForm, regimeBens: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                          >
                            {REGIMES_DE_BENS.map((regime) => (
                              <option key={regime} value={regime}>
                                {regime}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}

                    <div className="sm:col-span-2 pt-2 border-t border-slate-200/50">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={nonPartnerForm.pep || false}
                          onChange={(e) => setNonPartnerForm({ ...nonPartnerForm, pep: e.target.checked })}
                          className="w-4 h-4 rounded text-gci focus:ring-gci border-slate-300"
                        />
                        <span className="text-xs font-medium text-slate-700">
                          Pessoa Politicamente Exposta (PEP)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNonPartnerModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gci hover:bg-gci-hover text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    {editingNonPartnerId ? 'Atualizar Representante' : 'Salvar Representante'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto pt-6 text-center text-xs text-slate-400">
        © 2026 Grupo Ceres Investimentos. Todos os direitos reservados.
      </footer>
    </div>
  );
};
