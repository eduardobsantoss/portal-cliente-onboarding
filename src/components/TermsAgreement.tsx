import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  ArrowLeft,
  X,
  Download
} from 'lucide-react';
import { Logo } from './Logo';

interface TermsAgreementProps {
  onAccept: () => void;
  onBackToLogin: () => void;
}

type DocumentType = 'terms' | 'privacy' | null;

export const TermsAgreement: React.FC<TermsAgreementProps> = ({
  onAccept,
  onBackToLogin
}) => {
  const [accepted, setAccepted] = useState(false);
  const [activeDocModal, setActiveDocModal] = useState<DocumentType>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accepted) {
      onAccept();
    }
  };

  const handleDownload = (type: DocumentType) => {
    const isTerms = type === 'terms';
    const filename = isTerms ? "Termos_de_Uso_Grupo_Ceres.pdf" : "Politica_de_Privacidade_Grupo_Ceres.pdf";
    const title = isTerms ? "TERMOS DE USO E CONDIÇÕES GERAIS DE ACESSO - GRUPO CERES INVESTIMENTOS" : "POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS (LGPD) - GRUPO CERES INVESTIMENTOS";
    const element = document.createElement('a');
    const file = new Blob([
      `${title}\n\nVersão Registrada 2026.1\n\n1. OBJETO E ESCOPO...\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Logo variant="dark" className="h-10 md:h-12 w-auto" />
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Portal do Cliente • Onboarding
          </span>
        </div>

        <button
          onClick={onBackToLogin}
          className="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={14} />
          Voltar ao Login
        </button>
      </header>

      {/* Main Content Area */}
      <main className="max-w-2xl w-full mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-agro-orange border border-white/10">
              <ShieldCheck size={26} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Termos de Uso e Privacidade
            </h1>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Body Welcome Text */}
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
              Bem-vindo ao portal do Grupo Ceres Investimentos. Antes de iniciar o envio de documentos para liberação do seu limite operacional, solicitamos a concordância com os termos e condições da plataforma.
            </div>

            {/* Clean Single Checkbox */}
            <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50/70 transition-colors cursor-pointer select-none">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-slate-300 text-gci focus:ring-gci cursor-pointer shrink-0"
              />
              <div className="text-xs leading-relaxed text-slate-700">
                <span className="font-bold text-slate-900">
                  Declaro que li e concordo integralmente com os{' '}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDocModal('terms');
                  }}
                  className="font-bold text-gci underline underline-offset-2 hover:text-agro-orange inline transition-colors"
                >
                  Termos de Uso
                </button>
                <span className="font-bold text-slate-900"> e a </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDocModal('privacy');
                  }}
                  className="font-bold text-gci underline underline-offset-2 hover:text-agro-orange inline transition-colors"
                >
                  Política de Privacidade
                </button>
                <span className="text-slate-900 font-bold"> da plataforma.</span>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Ao avançar, você confirma a autorização para tratamento dos dados cadastrais e envio das informações necessárias para análise.
                </p>
              </div>
            </label>

            {/* Actions */}
            <div className="flex items-center justify-end pt-2 border-t border-slate-100">
              <button
                type="submit"
                disabled={!accepted}
                className="w-full sm:w-auto px-8 py-3.5 bg-gci hover:bg-gci-hover disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-gci/10 flex items-center justify-center gap-2 active:scale-95"
              >
                Concordar e Continuar
                <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto pt-6 text-center text-xs text-slate-400">
        © 2026 Grupo Ceres Investimentos. Todos os direitos reservados.
      </footer>

      {/* Modal Document Viewer (PDF Preview Simulation for 2 Different Docs) */}
      <AnimatePresence>
        {activeDocModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gci text-white flex items-center justify-center shadow-sm">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {activeDocModal === 'terms' 
                        ? 'Termos_de_Uso_e_Condicoes_Gerais.pdf' 
                        : 'Politica_de_Privacidade_e_Protecao_de_Dados.pdf'}
                    </h3>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">
                      Grupo Ceres Investimentos • {activeDocModal === 'terms' ? '8 páginas' : '6 páginas'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(activeDocModal)}
                    className="p-2 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors"
                    title="Baixar cópia do documento"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => setActiveDocModal(null)}
                    className="p-2 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Body - PDF Document Simulated Reader */}
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar text-xs text-slate-600 leading-relaxed space-y-5 bg-slate-100/60 font-serif">
                {activeDocModal === 'terms' ? (
                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4 font-sans">
                    <div className="border-b border-slate-100 pb-4 text-center">
                      <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                        Termos de Uso e Condições Gerais de Acesso à Plataforma Digital
                      </h2>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Grupo Ceres Investimentos • Versão 2026.1
                      </p>
                    </div>

                    <div className="space-y-3 text-xs text-slate-700">
                      <h4 className="font-bold text-slate-900">1. OBJETO E FINALIDADE</h4>
                      <p>
                        O presente instrumento estabelece as regras e condições gerais para acesso, credenciamento, envio de documentos e utilização das funcionalidades digitais do Grupo Ceres Investimentos destinadas a produtores rurais, revendas agrícolas e pessoas jurídicas.
                      </p>

                      <h4 className="font-bold text-slate-900">2. CADASTRO E VERACIDADE DAS INFORMAÇÕES</h4>
                      <p>
                        O usuário e os representantes legais outorgados declaram sob as penas da lei a exatidão, integralidade e autenticidade de todos os documentos (Contrato Social, Balanços, DRE, Extratos e Comprovantes) submetidos à esteira de aprovação.
                      </p>

                      <h4 className="font-bold text-slate-900">3. SEGURANÇA DAS CREDENCIAIS E ACESSO</h4>
                      <p>
                        As credenciais de acesso, assinaturas eletrônicas e validações biométricas faciais são de uso exclusivo e intransferível, sendo de responsabilidade do cliente a confidencialidade de seus acessos.
                      </p>

                      <h4 className="font-bold text-slate-900">4. ANÁLISE DE CRÉDITO E LIMITES</h4>
                      <p>
                        A submissão de cadastro não vincula a concessão compulsória de limites, ficando condicionada à avaliação técnica e aprovação dos comitês de risco e compliance do Grupo Ceres Investimentos.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4 font-sans">
                    <div className="border-b border-slate-100 pb-4 text-center">
                      <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                        Política de Privacidade e Proteção de Dados Pessoais (LGPD)
                      </h2>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Grupo Ceres Investimentos • Em Conformidade com a Lei nº 13.709/2018
                      </p>
                    </div>

                    <div className="space-y-3 text-xs text-slate-700">
                      <h4 className="font-bold text-slate-900">1. ESCOPO E COMPROMISSO COM A PRIVACIDADE</h4>
                      <p>
                        Esta Política de Privacidade esclarece como o Grupo Ceres Investimentos coleta, armazena, trata e protege os dados pessoais e sensíveis dos sócios, avalistas e representantes legais no âmbito de suas atividades financeiras e cadastrais.
                      </p>

                      <h4 className="font-bold text-slate-900">2. DADOS COLETADOS E FINALIDADES ESPECÍFICAS</h4>
                      <p>
                        Os dados cadastrais, documentos societários, demonstrativos fiscais e biometria facial são coletados para fins legítimos de:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 my-1">
                        <li>Identificação inequívoca e prevenção a fraudes (KYC / PLD-FT);</li>
                        <li>Análise de risco de crédito e formalização de garantias e contratos;</li>
                        <li>Cumprimento de exigências legais e regulatórias do Banco Central do Brasil e CVM.</li>
                      </ul>

                      <h4 className="font-bold text-slate-900">3. SEGURANÇA E RETENÇÃO DE DADOS</h4>
                      <p>
                        Todos os dados trafegam e permanecem armazenados em ambiente protegido com criptografia de ponta a ponta, com controles restritos de privilégios de acesso e retenção apenas pelo período estritamente necessário à execução dos serviços e obrigações legais.
                      </p>

                      <h4 className="font-bold text-slate-900">4. DIREITOS DOS TITULARES</h4>
                      <p>
                        Os titulares dos dados têm garantidos os direitos de confirmação de tratamento, acesso, correção de dados incompletos e revogação de consentimentos nos termos previstos na LGPD.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {activeDocModal === 'terms' ? 'Documento de Termos de Uso' : 'Documento de Política de Privacidade'}
                </span>
                <button
                  onClick={() => {
                    setAccepted(true);
                    setActiveDocModal(null);
                  }}
                  className="px-5 py-2 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  Concordar e Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
