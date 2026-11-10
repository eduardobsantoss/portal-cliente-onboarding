import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  HelpCircle, 
  PhoneCall, 
  Headphones, 
  ChevronDown, 
  Check, 
  MessageSquare,
  BookOpen
} from 'lucide-react';

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

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

interface SupportFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'faq' | 'ligacao';
}

export const SupportFaqModal: React.FC<SupportFaqModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'faq'
}) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'ligacao'>(initialTab);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [phone, setPhone] = useState('(11) 98877-6655');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const filteredFaqs = FAQ_ITEMS.filter(item => 
    item.question.toLowerCase().includes(search.toLowerCase()) ||
    item.answer.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[88vh] border border-slate-200"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gci/5 text-gci flex items-center justify-center">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Ajuda e Suporte</h3>
              <p className="text-xs text-slate-500">Tire dúvidas sobre a documentação ou fale com um analista</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-6 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'faq'
                ? 'border-gci text-gci'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <BookOpen size={14} />
            Perguntas Frequentes (FAQ)
          </button>
          <button
            onClick={() => setActiveTab('ligacao')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'ligacao'
                ? 'border-gci text-gci'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <PhoneCall size={14} />
            Solicitar Ligação
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {activeTab === 'faq' ? (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar dúvida (ex: Balanço, IRPF, Recibo, Junta)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-gci transition-all"
                />
              </div>

              {/* FAQ Accordion List */}
              <div className="space-y-2.5 pt-1">
                {filteredFaqs.map((faq) => {
                  const isExpanded = expandedId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`border rounded-xl transition-all ${
                        isExpanded ? 'border-gci/30 bg-gci/[0.02]' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                        className="w-full p-3.5 text-left flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                            {faq.category}
                          </span>
                          <span className="text-xs font-bold text-slate-800">{faq.question}</span>
                        </div>
                        <ChevronDown
                          size={15}
                          className={`text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180 text-gci' : ''}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="px-3.5 pb-3.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              {callbackRequested ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check size={24} strokeWidth={3} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Solicitação Registrada</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Um analista da nossa equipe de crédito entrará em contato pelo telefone <span className="font-semibold text-slate-700">{phone}</span> em até 30 minutos.
                  </p>
                  <button
                    onClick={() => setCallbackRequested(false)}
                    className="mt-2 text-xs text-gci underline font-bold"
                  >
                    Fazer nova solicitação
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCallbackRequested(true);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Telefone para contato</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-gci"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Qual é a sua dúvida ou dificuldade?</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Ex: Preciso de ajuda para obter o recibo do IRPF ou o demonstrativo de endividamento..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-gci"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Solicitar Ligação de Suporte
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
