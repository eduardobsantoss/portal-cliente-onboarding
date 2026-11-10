import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X,
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Upload,
  Check,
  Lock,
  Plus,
  Trash2,
  AlertCircle,
  Clock,
  Download,
  ExternalLink,
  Shield,
  Banknote,
  Search,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/utils/cn';

interface OperationRequestFlowProps {
  serviceName: string;
  onClose: () => void;
  onComplete: (operationData: any) => void;
}

type Step = 'XML_UPLOAD' | 'ACCOUNT_SELECTION' | 'VALIDATING' | 'SUMMARY' | 'PROCESSING_DOCS' | 'FINAL_REVIEW' | 'SIGNATURE' | 'RELEASE' | 'COMPLETED';

const STEPS_CONFIG: { id: Step; label: string; icon: any }[] = [
  { id: 'XML_UPLOAD', label: 'Envio de XML', icon: Upload },
  { id: 'ACCOUNT_SELECTION', label: 'Conta Desembolso', icon: Banknote },
  { id: 'VALIDATING', label: 'Validação', icon: Search },
  { id: 'SUMMARY', label: 'Resumo', icon: FileText },
  { id: 'PROCESSING_DOCS', label: 'Processamento', icon: Clock },
  { id: 'FINAL_REVIEW', label: 'Revisão', icon: ShieldCheck },
  { id: 'SIGNATURE', label: 'Assinatura', icon: CheckCircle2 },
  { id: 'RELEASE', label: 'Liberação', icon: Zap },
  { id: 'COMPLETED', label: 'Concluído', icon: ShieldCheck },
];

export const OperationRequestFlow = ({ serviceName, onClose, onComplete }: OperationRequestFlowProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [valueAttends, setValueAttends] = useState<'SIM' | 'NAO' | null>(null);
  const [step, setStep] = useState<Step>('XML_UPLOAD');
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [skippingAccountStep, setSkippingAccountStep] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [isSigned, setIsSigned] = useState(false);
  const [showLongWaitWarning, setShowLongWaitWarning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [signatureTimer, setSignatureTimer] = useState(10);
  const [releaseTimer, setReleaseTimer] = useState(10);
  const [processingIndex, setProcessingIndex] = useState(0);
  const [signatures, setSignatures] = useState([
    { id: 1, name: 'Eduardo Santos (Você)', status: 'Pendente', role: 'Representante Legal' },
    { id: 2, name: 'Mariana Costa', status: 'Assinado', role: 'Sócia Administradora' },
  ]);

  const processingItems = [
    "Registrando títulos",
    "Validando valores",
    "Gerando termo de cessão",
    "Enviando para assinatura"
  ];

  // Mock disbursement accounts
  const accounts = [
    { id: '1', bank: 'Banco do Brasil', branch: '1234', account: '55667-8', type: 'Corrente' },
    { id: '2', bank: 'Itaú Unibanco', branch: '0010', account: '44332-1', type: 'Garantida' },
  ];

  // For the purpose of the demo, we assume the user has accounts. 
  // If they didn't, we would show a screen redirecting them.

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    let interval: any;
    if (step === 'VALIDATING') {
      interval = setInterval(() => {
        setValidationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('SUMMARY'), 1000);
            return 100;
          }
          return prev + 0.5; // Slower progress
        });
        setTimer(t => t + 1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    let interval: any;
    if (step === 'PROCESSING_DOCS') {
      interval = setInterval(() => {
        setProcessingIndex(prev => {
          if (prev < processingItems.length) return prev + 1;
          clearInterval(interval);
          setTimeout(() => nextStep(), 1500);
          return prev;
        });
      }, 4000); // Slower transition (4 seconds per step)
    }
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    let interval: any;
    if (step === 'SIGNATURE' && !isSigned) {
      // Auto-advance removed as requested. 
      // We will now simulate a manual signature detection check or just wait for the button.
    }
    return () => clearInterval(interval);
  }, [step, isSigned]);

  useEffect(() => {
    let interval: any;
    if (step === 'RELEASE') {
      interval = setInterval(() => {
        setReleaseTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            nextStep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (timer > 120) { // Simulating 20 minutes with a shorter time for demo
       setShowLongWaitWarning(true);
    }
  }, [timer]);

  const handleFileUpload = () => {
    setFiles([{ name: 'NFE_BOVINO_9921.xml', size: '1.2 MB' }, { name: 'NFE_INSUMOS_8824.xml', size: '2.4 MB' }]);
  };

  const nextStep = () => {
    const currentIndex = STEPS_CONFIG.findIndex(s => s.id === step);
    if (currentIndex < STEPS_CONFIG.length - 1) {
      let nextTarget = STEPS_CONFIG[currentIndex + 1].id;
      
      // Skip account selection if re-uploading titles
      if (nextTarget === 'ACCOUNT_SELECTION' && skippingAccountStep) {
        setStep('VALIDATING');
      } else {
        setStep(nextTarget);
      }
    }
  };

  const prevStep = () => {
    const currentIndex = STEPS_CONFIG.findIndex(s => s.id === step);
    if (currentIndex > 0) {
      setStep(STEPS_CONFIG[currentIndex - 1].id);
    }
  };

  const handleRecusar = () => {
    if (confirm('Deseja realmente recusar esta operação? Todos os dados serão perdidos.')) {
      onClose();
    }
  };

  const PHASE_1: Step[] = ['XML_UPLOAD', 'ACCOUNT_SELECTION', 'VALIDATING'];
  const PHASE_2: Step[] = ['SUMMARY', 'PROCESSING_DOCS', 'FINAL_REVIEW'];
  const PHASE_3: Step[] = ['SIGNATURE', 'RELEASE', 'COMPLETED'];

  const Timeline = () => {
    const currentPhase = PHASE_1.includes(step) ? PHASE_1 : (PHASE_2.includes(step) ? PHASE_2 : PHASE_3);
    const phaseSteps = STEPS_CONFIG.filter(s => currentPhase.includes(s.id));

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between relative px-4">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 z-0" />
          {phaseSteps.map((s, idx) => {
            const isActive = s.id === step;
            const currentIndexInPhase = phaseSteps.findIndex(step_config => step_config.id === step);
            const isPast = currentIndexInPhase > idx;
            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                  isActive ? "bg-agro-orange border-agro-orange text-white scale-110 shadow-lg shadow-agro-orange/20" : 
                  isPast ? "bg-gci border-gci text-white" : "bg-white border-slate-100 text-slate-300"
                )}>
                   {isPast ? <Check size={18} strokeWidth={4} /> : <s.icon size={18} />}
                </div>
                <span className={cn(
                  "absolute top-full mt-3 text-[10px] font-black uppercase tracking-widest whitespace-nowrap",
                  isActive ? "text-agro-orange" : isPast ? "text-gci" : "text-slate-300"
                )}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 'XML_UPLOAD':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <Timeline />
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 bg-gci/5 text-gci px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gci/10 mb-2">
                <Shield size={12} />
                Upload Seguro 256-bit
              </div>
              <h2 className="text-3xl font-black text-gci tracking-tight">Comece sua Antecipação</h2>
              <p className="text-slate-500 text-lg font-medium">Envie os arquivos XML das notas fiscais que deseja antecipar.</p>
              <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl max-w-xl mx-auto">
                <p className="text-xs text-orange-800 font-bold leading-relaxed">
                  Observação: O somatório dos títulos abaixo de R$ 50.000,00 por CPF ou CNPJ não será necessário confirmação.
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div 
                onClick={handleFileUpload}
                className="group border-[3px] border-dashed border-slate-100 rounded-[32px] p-16 flex flex-col items-center justify-center gap-6 bg-slate-50/50 hover:bg-white hover:border-agro-orange/30 hover:shadow-2xl hover:shadow-agro-orange/5 transition-all cursor-pointer"
              >
                <div className="w-20 h-20 rounded-[24px] bg-white flex items-center justify-center text-slate-300 group-hover:text-agro-orange group-hover:bg-orange-50 transition-all shadow-sm">
                  <Upload size={32} />
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-gci">Arraste ou clique para enviar</p>
                  <p className="text-sm font-bold text-slate-400 mt-2">Apenas arquivos .xml são aceitos nesta etapa</p>
                </div>
              </div>

              {files.length > 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{files.length} Arquivos Selecionados</p>
                  {files.map((file, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center justify-between shadow-sm group hover:border-gci/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gci/5 flex items-center justify-center text-gci group-hover:bg-gci group-hover:text-white transition-all">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gci">{file.name}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{file.size}</p>
                        </div>
                      </div>
                      <button className="text-slate-300 hover:text-red-500 transition-colors p-2">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case 'ACCOUNT_SELECTION':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <Timeline />
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-black text-gci tracking-tight">Conta para Desembolso</h2>
              <p className="text-slate-500 text-lg font-medium">Selecione para qual conta o valor será enviado.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-6">
              {accounts.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => setSelectedAccount(acc.id)}
                  className={`relative p-6 rounded-[24px] border-2 text-left transition-all group ${
                    selectedAccount === acc.id 
                      ? 'border-gci bg-gci/5 shadow-xl shadow-gci/10' 
                      : 'border-slate-100 hover:border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        selectedAccount === acc.id ? 'bg-gci text-white' : 'bg-slate-50 text-slate-400'
                      }`}>
                        <Banknote size={24} />
                      </div>
                      <div>
                        <p className="font-black text-gci text-base">{acc.bank}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ag {acc.branch} • CC {acc.account}</p>
                      </div>
                    </div>
                    {selectedAccount === acc.id && (
                      <div className="w-6 h-6 rounded-full bg-gci text-white flex items-center justify-center">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </button>
              ))}

              <div className="mt-6 p-6 rounded-[24px] bg-slate-50 border border-slate-200 border-dashed text-center">
                <p className="text-xs text-slate-400 font-bold mb-4">Precisa de outra conta?</p>
                <button 
                  className="inline-flex items-center gap-2 text-gci font-black text-xs uppercase tracking-widest hover:text-agro-orange transition-colors"
                  onClick={() => alert('Para cadastrar uma nova conta, acesse a área de Configurações do seu perfil.')}
                >
                  <Plus size={16} />
                  CADASTRAR NOVA CONTA
                </button>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed">
                    Lembrando que ao cadastrar uma nova conta, a titularidade tem que ser de seu CNPJ. Caso contrário o desembolso não será realizado
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'VALIDATING':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-10">
            <Timeline />
            
            <div className="space-y-4 max-w-sm mx-auto">
              <h2 className="text-3xl font-black text-gci tracking-tight">Validando Operação</h2>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-center leading-relaxed max-w-md mx-auto">
                Estamos extraindo e validando seus XMLs. Lembrando que você subiu 12 títulos e este processo pode demorar 24 minutos. Não se preocupe, pode tomar seu cafezinho. Você será avisado ao término das validações.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-black text-gci uppercase tracking-widest">Validando Processo</span>
                  <span className="text-[10px] font-black text-agro-orange tracking-widest">{Math.round(validationProgress)}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-agro-orange"
                    initial={{ width: 0 }}
                    animate={{ width: `${validationProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <div className="flex items-center gap-3 justify-center text-[10px] font-black text-agro-orange uppercase tracking-[0.2em] animate-pulse">
                <Clock size={14} />
                Tempo estimado: 00:24
              </div>
              
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-2 text-center max-w-xs mx-auto border border-slate-100">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Aviso Importante</p>
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                  Em caso de dúvidas ou demora excessiva, entre em contato com nossa equipe de suporte.
                </p>
              </div>
              
              {showLongWaitWarning && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="bg-orange-50 border border-orange-200 p-4 rounded-2xl flex items-center gap-4 text-left max-w-md mx-auto"
                >
                 <AlertCircle className="text-agro-orange shrink-0" size={24} />
                 <p className="text-xs text-orange-900 font-bold leading-relaxed">
                   A operação está demorando mais que o esperado devido ao alto volume de processamento. Estamos atuando no problema.
                 </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case 'SUMMARY':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <Timeline />
            <div className="text-center">
              <h2 className="text-3xl font-black text-gci tracking-tight uppercase">Resumo da Operação</h2>
            </div>

            <div className="max-w-2xl mx-auto w-full space-y-6">
              <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-100/50">
                <div className="p-10 space-y-8">
                  {/* DRE Body */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total de Títulos Extraídos</span>
                      <span className="text-sm font-black text-gci">12</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic">Valor total de Títulos Extraídos</span>
                      <span className="text-base font-black text-slate-400">R$ 515.200,00</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Total de Títulos Aceitos</span>
                      <span className="text-sm font-black text-green-600">10</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                      <span className="text-[11px] font-black text-gci uppercase tracking-widest">Valor Total de títulos validados</span>
                      <span className="text-lg font-black text-gci">R$ 502.450,00</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Taxa da Operação</span>
                      <span className="text-sm font-black text-slate-600">2.45% a.m</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Prazo Médio de Vencimento</span>
                      <span className="text-sm font-black text-slate-600">45 Dias</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-slate-200">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Títulos Rejeitados / Inconsistentes</span>
                      <span className="text-sm font-black text-slate-600">- R$ 12.750,00</span>
                    </div>
                    
                    {/* Final Result */}
                    <div className="flex items-center justify-between py-8 mt-4 bg-agro-orange/5 rounded-[32px] px-8 border border-agro-orange/10">
                      <div>
                        <p className="text-[10px] font-black text-agro-orange uppercase tracking-[0.2em] mb-1">Total Líquido a Desembolsar</p>
                        <p className="text-4xl font-black text-gci tracking-tighter">R$ 483.750,00</p>
                      </div>
                      <div className="w-14 h-14 bg-agro-orange text-white rounded-2xl flex items-center justify-center shadow-lg shadow-agro-orange/20">
                        <Banknote size={28} />
                      </div>
                    </div>
                  </div>

                  {/* Rejection Details if any */}
                  <div className="pt-2">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <AlertCircle size={14} />
                      Detalhes dos Títulos Rejeitados (2)
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-4 bg-red-50/50 rounded-2xl border border-red-100 flex flex-col gap-1">
                        <span className="text-[10px] font-black text-red-700 uppercase tracking-tighter">Sacado com restritivos graves</span>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-red-900/60">NF-9923</span>
                          <span className="text-[11px] font-black text-red-700">R$ 8.500,00</span>
                        </div>
                      </div>
                      <div className="p-4 bg-red-50/50 rounded-2xl border border-red-100 flex flex-col gap-1">
                        <span className="text-[10px] font-black text-red-700 uppercase tracking-tighter">XML com assinatura inválida</span>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-red-900/60">NF-8812</span>
                          <span className="text-[11px] font-black text-red-700">R$ 4.250,00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50/50 border border-agro-orange/10 p-5 rounded-2xl flex items-start gap-4">
                <CheckCircle2 size={20} className="text-agro-orange shrink-0 mt-0.5" />
                <p className="text-xs text-orange-900 leading-relaxed font-medium">
                  Ao clicar em concordar, você confirma a veracidade das notas apresentadas e com os termos da operação. <span className="font-bold underline underline-offset-2">O valor líquido ainda passará por validação final de duplicidade de crédito.</span>
                </p>
              </div>

              <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100/30 text-center space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gci">Este valor estimado te atende?</h3>
                  
                  <div className="flex items-center justify-center gap-4">
                    <button 
                      onClick={() => setValueAttends('NAO')}
                      className={cn(
                        "px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                        valueAttends === 'NAO' 
                          ? "bg-agro-orange text-white shadow-lg" 
                          : "bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100"
                      )}
                    >
                      Não
                    </button>
                    <button 
                      onClick={() => setValueAttends('SIM')}
                      className={cn(
                        "px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                        valueAttends === 'SIM' 
                          ? "bg-gci text-white shadow-lg" 
                          : "bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100"
                      )}
                    >
                      Sim
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {valueAttends === 'SIM' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6 pt-4 border-t border-slate-50"
                      >
                        <button 
                          onClick={() => {
                            nextStep();
                          }}
                          className={cn(
                            "w-full py-5 px-10 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg bg-gci text-white shadow-gci/20 hover:scale-[1.02]"
                          )}
                        >
                          Concordar e Gerar Documentos
                          <ArrowRight size={18} />
                        </button>
                      </motion.div>
                    )}

                    {valueAttends === 'NAO' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6 pt-4 border-t border-slate-50"
                      >
                        <div className="grid grid-cols-3 gap-4">
                          <button 
                            onClick={handleRecusar}
                            className="bg-white text-slate-400 border border-slate-100 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-100 flex items-center justify-center gap-2"
                          >
                            <X size={16} />
                            Recusar
                          </button>
                          <button 
                            onClick={() => {
                                setSkippingAccountStep(true);
                                setStep('XML_UPLOAD');
                            }}
                            className="col-span-2 bg-slate-50 text-gci border border-slate-200 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all hover:bg-white hover:border-agro-orange hover:text-agro-orange flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                          >
                            <Plus size={18} />
                            Subir mais títulos
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'PROCESSING_DOCS':
        const stages = [
          { label: "Registrando títulos na CERC", description: "Estamos registrando seus títulos na CERC. Não se preocupe, você será avisado quando estiver finalizado.", progress: 70 },
          { label: "Validando valores", description: "Estamos conferindo os cálculos finais da operação.", progress: 15 },
          { label: "Gerando termo de cessão e enviando pra assinatura", description: "Estamos preparando os documentos digitais para sua assinatura.", progress: 15 }
        ];
        
        const currentStageIdx = processingIndex < 2 ? 0 : processingIndex === 2 ? 1 : 2;
        const currentStage = stages[currentStageIdx];
        const overallProgress = (processingIndex / processingItems.length) * 100;

        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 py-12">
            <Timeline />
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-orange-50 text-agro-orange rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-agro-orange/5 animate-pulse" />
                <FileText size={40} className="relative z-10" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-gci uppercase tracking-tighter">
                  {currentStage.label}
                </h2>
                <p className="text-slate-500 text-base font-medium leading-relaxed">
                  {currentStage.description}
                </p>
              </div>

              <div className="space-y-4 pt-10">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progresso Total</span>
                  <span className="text-[10px] font-black text-agro-orange uppercase tracking-widest">{Math.round(overallProgress)}%</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-100 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-agro-orange rounded-full shadow-lg shadow-agro-orange/20"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'FINAL_REVIEW':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <Timeline />
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                <Check size={12} strokeWidth={3} />
                Processamento Concluído
              </div>
              <h2 className="text-3xl font-black text-gci uppercase tracking-tighter">Resumo Final da Operação</h2>
              <p className="text-slate-500 text-lg font-medium max-w-md mx-auto">Confira os valores finais antes de prosseguir para a assinatura digital.</p>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100/30 max-w-2xl mx-auto text-left relative overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Valor Nominal Enviado</p>
                  <p className="text-xl font-black text-slate-400">R$ 515.200,00</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Valor Nominal Aceito</p>
                  <p className="text-xl font-black text-gci">R$ 502.450,00</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-agro-orange uppercase tracking-widest leading-tight">Total Líquido a Desembolsar</p>
                  <div className="space-y-0.5">
                    <p className="text-xl font-black text-agro-orange">R$ 468.750,00</p>
                    <p className="text-[9px] text-red-500 font-black uppercase tracking-widest italic leading-none">- R$ 15.000,00 (Dedução)</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Taxa Operação</p>
                  <p className="text-xl font-black text-gci">2.45% a.m</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Prazo Médio</p>
                  <p className="text-xl font-black text-gci">45 Dias</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">ID Operação</p>
                  <p className="text-xl font-black text-gci">#9921-A</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <AlertCircle size={16} />
                </div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  Nota: <span className="font-bold text-red-500 italic">1 título (#NF-9921)</span> enviado nesta operação já estava registrado em outro desconto vigente. Por segurança, o valor foi retido para evitar duplicidade de crédito.
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex flex-col items-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id="final-terms-checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="peer sr-only" 
                    />
                    <div className={cn(
                      "w-6 h-6 border-2 rounded-lg transition-all flex items-center justify-center",
                      termsAccepted ? "bg-agro-orange border-agro-orange" : "border-slate-200 group-hover:border-agro-orange"
                    )}>
                      <Check size={14} className={cn("text-white transition-transform", termsAccepted ? "scale-100" : "scale-0")} />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 group-hover:text-gci transition-colors">
                    Eu concordo com o resumo acima e com os <button onClick={(e) => { e.stopPropagation(); alert('Termos da Operação: ...'); }} className="text-agro-orange hover:underline">Termos da Operação</button>
                  </span>
                </label>
              </div>

              <div className="flex justify-center gap-4">
                <button 
                  onClick={handleRecusar}
                  className="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
                >
                  Recusar
                </button>
                <button 
                  disabled={!termsAccepted}
                  onClick={nextStep}
                  className={cn(
                    "px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl",
                    termsAccepted 
                      ? "bg-gci text-white shadow-gci/20 hover:scale-105" 
                      : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
                  )}
                >
                  Confirmar e Assinar
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'SIGNATURE':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <Timeline />
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-black text-gci tracking-tight">Assinatura Digital</h2>
              <p className="text-slate-500 text-lg font-medium">Finalize o seu desconto de duplicata assinando o termo de cessão.</p>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100/50">
              {!isSigned ? (
                <div className="space-y-8">
                  <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-8">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gci shadow-sm">
                      <FileText size={28} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Principal</p>
                      <h4 className="text-base font-black text-gci">Termo de Cessão #9921-A</h4>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                       <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assinaturas do Cliente</h5>
                       <span className="text-[10px] font-black text-agro-orange uppercase tracking-widest">{signatures.filter(s => s.status === 'Assinado').length} de {signatures.length}</span>
                    </div>

                    <div className="space-y-3">
                      {signatures.map((sig) => (
                        <div key={sig.id} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl group hover:border-agro-orange transition-all">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                              sig.status === 'Assinado' ? "bg-green-50 text-green-600" : "bg-orange-50 text-agro-orange"
                            )}>
                              {sig.status === 'Assinado' ? <Check size={20} strokeWidth={3} /> : <Clock size={20} />}
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-black text-gci">{sig.name}</p>
                              <p className="text-[10px] font-bold text-slate-400">{sig.role}</p>
                            </div>
                          </div>
                          
                          {sig.status === 'Pendente' && sig.id === 1 ? (
                            <button 
                              onClick={() => {
                                setSignatures(signatures.map(s => s.id === 1 ? { ...s, status: 'Assinado' } : s));
                              }}
                              className="bg-orange-100 text-agro-orange px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-agro-orange hover:text-white transition-all shadow-sm"
                            >
                              Assinatura Pendente
                            </button>
                          ) : (
                            <span className={cn(
                              "text-[10px] font-black uppercase tracking-widest",
                              sig.status === 'Assinado' ? "text-green-600" : "text-slate-300"
                            )}>{sig.status}</span>
                          )}
                        </div>
                      ))}
                      
                      {/* Simulating "Assinando..." state change button */}
                      {signatures.every(s => s.status === 'Assinado') ? (
                         <motion.div 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-green-50 p-6 rounded-3xl border border-green-100 flex flex-col items-center gap-2 mt-4"
                         >
                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20">
                              <CheckCircle2 size={24} />
                            </div>
                            <p className="text-sm font-black text-green-700 uppercase tracking-widest">Todas as assinaturas coletadas!</p>
                            <button 
                              onClick={() => {
                                setIsSigned(true);
                                nextStep();
                              }}
                              className="mt-2 bg-gci text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-agro-orange transition-all shadow-xl shadow-gci/20"
                            >
                              Continuar Operação
                            </button>
                         </motion.div>
                      ) : (
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mt-4 text-center">
                          <p className="text-xs text-slate-400 font-medium">Aguardando as assinaturas dos representantes legais para prosseguir.</p>
                          <div className="flex items-center justify-center gap-1.5 mt-3">
                            {[0, 1, 2].map(i => (
                              <motion.div 
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3] }} 
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                className="w-1.5 h-1.5 rounded-full bg-slate-300"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 py-8">
                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-xl font-black text-gci">Assinatura Digital Concluída</h3>
                  <div className="flex items-center justify-center gap-3 text-slate-400">
                    <Zap size={16} className="text-agro-orange" />
                    <span className="text-xs font-bold uppercase tracking-widest">Estamos encaminhando para liberação.</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'RELEASE':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <Timeline />
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-black text-gci tracking-tight">Liberação de Recurso</h2>
              <p className="text-slate-500 text-lg font-medium">Sua assinatura foi confirmada. Estamos processando o desembolso.</p>
            </div>

            <div className="bg-white rounded-[40px] border-2 border-slate-100 p-10 text-center shadow-xl shadow-slate-100/50">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-8 text-agro-orange">
                <Shield size={40} />
              </div>
              <h3 className="text-xl font-black text-gci mb-8">Liberação de Recurso</h3>
              
              <div className="space-y-8">
                <div className="flex flex-col items-center gap-6">
                  <div className="flex flex-col items-center gap-4 text-slate-500 text-center">
                    <Zap size={40} className="text-agro-orange animate-pulse" />
                    <span className="text-lg font-black uppercase tracking-widest max-w-sm">
                      Aguarde, você será notificado por e-mail quando o dinheiro for creditado na sua conta.
                    </span>
                  </div>

                  <div className="w-full max-w-xs bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 15, ease: "linear" }}
                      className="bg-agro-orange h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'COMPLETED':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10 py-12">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner mb-6">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-gci uppercase tracking-tighter">Operação Realizada!</h2>
              <p className="text-slate-500 text-lg font-medium max-w-md mx-auto leading-relaxed">
                Sua antecipação foi processada com sucesso. O recurso estará disponível em sua conta em instantes.
              </p>
            </div>

            <div className="space-y-6 pt-10">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button 
                  className="text-gci font-black text-[10px] uppercase tracking-widest hover:text-agro-orange transition-colors flex items-center gap-2 px-8 py-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md"
                >
                  <FileText size={16} />
                  Termo de Cessão Assinado
                </button>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => onComplete({ grupoEmpresarial: null })}
                  className="w-full sm:w-auto bg-gci text-white px-16 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-gci-hover transition-all shadow-xl shadow-gci/20"
                >
                  Voltar para a Home
                </button>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  const currentIndex = STEPS_CONFIG.findIndex(s => s.id === step);
  const isFirstStep = currentIndex === 0;
  const isLastStep = step === 'COMPLETED';
  const progressPercent = (currentIndex / (STEPS_CONFIG.length - 1)) * 100;

  const canContinue = () => {
    if (step === 'XML_UPLOAD') return files.length > 0;
    if (step === 'ACCOUNT_SELECTION') return selectedAccount !== '';
    if (step === 'VALIDATING') return false; // Handled by auto-timer
    if (step === 'SUMMARY') return true;
    if (step === 'FINAL_REVIEW') return termsAccepted;
    if (step === 'SIGNATURE') return isSigned;
    if (step === 'RELEASE') return false; // Auto-timer
    return false;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-hidden flex flex-col lg:flex-row h-[100dvh]">
      {/* Left Context Side */}
      <div className="hidden lg:flex lg:w-[420px] bg-gci flex-col p-12 text-white relative overflow-hidden shrink-0">
        <div className="relative z-10 h-full flex flex-col">
          <Logo variant="light" className="mb-16 h-8 origin-left" />
          
          <div className="flex-1">
            <h2 className="text-4xl font-black leading-tight mb-8">
              Nova Solicitação de <span className="text-agro-orange">Antecipação</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-12 font-medium">
              Siga os passos ao lado para antecipar seus recebíveis de forma 100% digital e segura.
            </p>
            
            <div className="space-y-10">
              {STEPS_CONFIG.map((s, idx) => {
                const isActive = s.id === step;
                if (!isActive) return null;
                return (
                  <div key={s.id} className={cn("flex items-center gap-6 transition-all duration-500", isActive ? "translate-x-4" : "opacity-40 grayscale-[0.5]")}>
                    <div className={cn(
                      "w-12 h-12 rounded-[20px] flex items-center justify-center transition-all duration-500 border-2",
                      isActive ? "bg-agro-orange border-agro-orange text-white scale-110 shadow-2xl shadow-agro-orange/30" : "border-white/20 text-white/40"
                    )}>
                      <s.icon size={20} />
                    </div>
                    <div>
                      <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-0.5", isActive ? "text-agro-orange" : "text-white/40")}>Status da Operação</p>
                      <p className={cn("text-base font-black uppercase tracking-tight", isActive ? "text-white" : "text-white/60")}>{isActive ? 'Em ' + s.label : 'Aguardando'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 space-y-6 border-t border-white/5 pt-10">
            <div className="flex items-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={16} />
              Criptografia de Ponta a Ponta GCI
            </div>
            <div className="flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-widest">
              <Lock size={14} />
              Sua transação está segura.
            </div>
          </div>
        </div>

        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-agro-orange/10 rounded-full blur-[100px]" />
        <div className="absolute top-40 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />
      </div>

      {/* Right Interaction Side */}
      <div className="flex-1 flex flex-col bg-white relative h-full overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden p-6 border-b border-slate-50 flex items-center justify-between shrink-0">
          <Logo variant="dark" className="h-6" />
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-gci">
            <X size={24} />
          </button>
        </div>

        <div className="absolute top-8 right-8 z-30 hidden lg:block">
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-gci transition-all group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-2xl mx-auto px-6 py-12 md:py-20 lg:py-24">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Navigation */}
        {!isLastStep && step !== 'SUMMARY' && step !== 'FINAL_REVIEW' && (
          <div className="px-6 md:px-12 py-8 border-t border-slate-100 bg-white shrink-0">
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-6">
              <button
                disabled={isFirstStep || step === 'VALIDATING' || step === 'SUMMARY' || step === 'FINAL_REVIEW'}
                onClick={prevStep}
                className={cn(
                  "px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3",
                  isFirstStep || step === 'VALIDATING' || step === 'SUMMARY' || step === 'FINAL_REVIEW' ? "opacity-0 invisible" : "text-slate-400 hover:bg-slate-50 hover:text-gci"
                )}
              >
                <ArrowLeft size={16} />
                Voltar
              </button>
              
              <div className="flex-1 md:flex-none flex items-center gap-3">
                {step === 'SUMMARY' && (
                  <button 
                    onClick={handleRecusar}
                    className="flex-1 md:w-32 px-6 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
                  >
                    Recusar
                  </button>
                )}
                <button
                  disabled={!canContinue() || step === 'VALIDATING' || step === 'PROCESSING_DOCS'}
                  onClick={nextStep}
                  className={cn(
                    "flex-1 md:min-w-[240px] px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-2xl",
                    canContinue() && step !== 'PROCESSING_DOCS'
                      ? "bg-gci text-white shadow-gci/20 hover:scale-[1.02] active:scale-[0.98]" 
                      : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
                  )}
                >
                  {step === 'SIGNATURE' ? 'Ver Resumo' : step === 'SUMMARY' ? 'Concordar e Avançar' : 'Próximo Passo'}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
