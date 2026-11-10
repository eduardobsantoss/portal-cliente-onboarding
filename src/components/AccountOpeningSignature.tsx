import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileCheck2, 
  Users, 
  Mail, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Info,
  Building2,
  FileSignature
} from 'lucide-react';
import { Logo } from './Logo';

export interface SignerRepresentative {
  id: string;
  name: string;
  role: string;
  email: string;
  cpf: string;
  type: 'socio' | 'nao_socio';
  vinculo?: string;
  status: 'Pendente' | 'Assinado';
  signedAt?: string;
}

interface AccountOpeningSignatureProps {
  representatives: SignerRepresentative[];
  companyName?: string;
  cnpj?: string;
  onAdvanceToAnalysis: () => void;
  onBack: () => void;
}

// PLACEHOLDER: mecanismo de assinatura a definir
export const AccountOpeningSignature: React.FC<AccountOpeningSignatureProps> = ({
  representatives: initialRepresentatives,
  companyName = 'AGRO INDUSTRIAL SOJA & MILHO LTDA',
  cnpj = '12.345.678/0001-90',
  onAdvanceToAnalysis,
  onBack,
}) => {
  const [reps, setReps] = useState<SignerRepresentative[]>(() => {
    return initialRepresentatives.map((rep) => ({
      ...rep,
      status: rep.status || 'Pendente',
    }));
  });

  // Keep reps synchronized with actual form state
  React.useEffect(() => {
    setReps(
      initialRepresentatives.map((rep) => ({
        ...rep,
        status: rep.status || 'Pendente',
      }))
    );
  }, [initialRepresentatives]);

  const totalSigners = reps.length;
  const signedCount = reps.filter((r) => r.status === 'Assinado').length;
  const allSigned = totalSigners > 0 && signedCount === totalSigners;

  // Mask email helper: eduardo.santos@ceresinvestimentos.com -> ed•••••••@ceresinvestimentos.com
  const maskEmail = (email: string) => {
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    const name = parts[0];
    const domain = parts[1];
    const visibleStart = name.slice(0, 2);
    return `${visibleStart}••••••••@${domain}`;
  };

  // Simulation: Sign single
  const handleToggleSignSingle = (id: string) => {
    setReps((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const isNowSigned = r.status !== 'Assinado';
          return {
            ...r,
            status: isNowSigned ? 'Assinado' : 'Pendente',
            signedAt: isNowSigned ? 'Hoje às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : undefined,
          };
        }
        return r;
      })
    );
  };

  // Simulation: Sign all (Required in Turn: "Simular assinaturas concluídas")
  const handleSimulateAllSigned = () => {
    const now = 'Hoje às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setReps((prev) =>
      prev.map((r) => ({
        ...r,
        status: 'Assinado',
        signedAt: r.signedAt || now,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Logo variant="dark" className="h-10 md:h-12 w-auto" />
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Portal do Cliente • Assinatura da Abertura de Conta
          </span>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={14} />
          Voltar para Documentos
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl w-full mx-auto my-auto py-6 space-y-4">
        {/* Stepper Indicator: Documentos -> Assinatura -> Análise */}
        <div className="w-full bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-[11px] font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">✓</span>
            <span className="hidden sm:inline">1. Dados</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">✓</span>
            <span className="hidden sm:inline">2. Documentos</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-1.5 text-gci font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60">
            <span className="w-5 h-5 rounded-full bg-gci text-white flex items-center justify-center text-[10px] font-bold">3</span>
            <span>3. Assinatura</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">4</span>
            <span className="hidden sm:inline">4. Análise</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-3 shadow-inner">
              <FileSignature size={26} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Assinatura da abertura de conta
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed">
              Enviamos o termo de abertura para assinatura dos representantes legais. A análise começa quando todos assinarem.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Company identification */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-gci shadow-sm">
                  <Building2 size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{companyName}</h4>
                  <p className="text-[11px] font-semibold text-slate-500">
                    CNPJ: {cnpj} • Termo de Abertura de Conta Digital GCI SCD
                  </p>
                </div>
              </div>

              <span
                className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                  allSigned
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {signedCount} de {totalSigners} assinados
              </span>
            </div>

            {/* List of Representatives */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Users size={15} className="text-gci" />
                  Representantes Legais Habilitados
                </h3>
                <span className="text-[11px] text-slate-400">
                  {allSigned ? 'Todas as assinaturas coletadas' : 'Aguardando formalização'}
                </span>
              </div>

              <div className="space-y-2.5">
                {reps.map((rep) => {
                  const isSigned = rep.status === 'Assinado';
                  return (
                    <div
                      key={rep.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSigned
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-slate-50/60 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSigned
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isSigned ? <CheckCircle2 size={18} /> : <Clock size={16} />}
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                              {rep.name}
                            </h4>
                            <span className="text-[10px] font-bold text-gci bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                              {rep.role || (rep.type === 'nao_socio' ? rep.vinculo || 'Procurador' : 'Representante Legal')}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-mono">
                            E-mail: {maskEmail(rep.email)} • CPF: {rep.cpf}
                          </p>
                          {isSigned && rep.signedAt && (
                            <p className="text-[10px] text-emerald-700 font-semibold">
                              Formalizado digitalmente ({rep.signedAt})
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5 ${
                            isSigned
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : 'bg-amber-100 text-amber-800 border-amber-200'
                          }`}
                        >
                          {isSigned ? (
                            <>
                              <CheckCircle2 size={13} className="text-emerald-700" />
                              Assinado
                            </>
                          ) : (
                            <>
                              <Clock size={13} className="text-amber-700" />
                              Pendente
                            </>
                          )}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleToggleSignSingle(rep.id)}
                          className="text-[11px] font-semibold text-slate-500 hover:text-gci underline px-2 py-1"
                        >
                          {isSigned ? 'Desmarcar' : 'Assinar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulation controls */}
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info size={13} />
                  Controle de Simulação (Ambiente de Testes)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleSimulateAllSigned}
                  className="flex-1 px-4 py-2.5 bg-white hover:bg-slate-100 text-gci border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles size={15} className="text-agro-orange" />
                  Simular assinaturas concluídas
                </button>
              </div>
            </div>

            {/* Advance Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                disabled={!allSigned}
                onClick={onAdvanceToAnalysis}
                className={`w-full sm:w-auto px-8 py-3.5 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                  allSigned
                    ? 'bg-gci hover:bg-gci-hover text-white shadow-gci/10 cursor-pointer active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <span>Continuar para análise</span>
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
