import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ArrowDownRight, ArrowRight, ArrowUpRight, Banknote, Bell, Building2, Calendar, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock, Copy, CreditCard, Download, ExternalLink, FileText, Filter, Image, Info, Link, Lock, LogOut, Menu, Search, Shield, TrendingUp, Upload, Wallet, X, Zap } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/utils/cn';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DocumentVerification } from '@/flows/portal/complete-cadastro/DocumentVerification';
import { DASHBOARD_NAV_ITEMS } from '@/constants/dashboardNav';
import { DELINQUENCY_CHART_DATA, ACCOUNT_TRANSACTIONS, PORTFOLIO_DISTRIBUTION } from '@/mocks/dashboardChart';
import { CORPORATE_GROUPS, DEFAULT_CORPORATE_GROUP } from '@/mocks/economicGroups';
import { FIRST_PENDING_NOTIFICATION, PORTAL_NOTIFICATIONS } from '@/mocks/portalNotifications';
import { PORTAL_ACCOUNT_CLIPBOARD_TEXT } from '@/mocks/portalAccount';
import { INITIAL_OPERATIONS, INITIAL_TITULOS } from '@/mocks/portalCollections';
import type { DashboardTab } from '@/types/dashboard';
import type { PendingTask } from '@/types/notification';
import type { OperationCompletionData } from '@/types/operationRequest';
import type { PortalOperation } from '@/types/portalOperation';
import type { CanhotoFile, ConfirmacaoData, Titulo, TituloDetails } from '@/types/titulo';
import { createPortalOperation } from '@/utils/createPortalOperation';
import { toggleListItem } from '@/utils/toggleListItem';
import { useSacadoContacts } from '@/flows/portal/dashboard/hooks/useSacadoContacts';
import { AddXmlModal } from '@/flows/portal/dashboard/modais/AddXmlModal';
import { CanhotoUploadModal } from '@/flows/portal/dashboard/modais/CanhotoUploadModal/CanhotoUploadModal';
import { CarteiraFilterModal } from '@/flows/portal/dashboard/modais/FilterModal/CarteiraFilterModal';
import { ConfirmacaoModal } from '@/flows/portal/dashboard/modais/ConfirmacaoModal';
import { DocumentUploadModal } from '@/flows/portal/dashboard/modais/DocumentUploadModal';
import { LinkAssetsModal } from '@/flows/portal/dashboard/modais/LinkAssetsModal';
import { LinkSelectionModal } from '@/flows/portal/dashboard/modais/LinkSelectionModal/LinkSelectionModal';
import { OperationDetailsModal } from '@/flows/portal/dashboard/modais/OperationDetailsModal/OperationDetailsModal';
import { OperationRequestModal } from '@/flows/portal/dashboard/modais/OperationRequestModal';
import { PendingTaskModal } from '@/flows/portal/dashboard/modais/PendingTaskModal';
import { TitleDetailsModal } from '@/flows/portal/dashboard/modais/TitleDetailsModal/TitleDetailsModal';

interface DashboardProps {
  onLogout: () => void;
}


export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showOperationRequest, setShowOperationRequest] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [operations, setOperations] = useState<PortalOperation[]>(INITIAL_OPERATIONS);
  const [isVerified, setIsVerified] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('documentos');
  const [lockedTabNotice, setLockedTabNotice] = useState<string | null>(null);
  const [portalUnlockedToast, setPortalUnlockedToast] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed for mobile
  const [selectedOpDetails, setSelectedOpDetails] = useState<PortalOperation | null>(null);
  const [selectedTituloDetails, setSelectedTituloDetails] = useState<TituloDetails | null>(null);
  const [selectedTituloDetailsForResolution, setSelectedTituloDetailsForResolution] = useState<Titulo | null>(null);
  const [showLinkAssetsModal, setShowLinkAssetsModal] = useState(false);
  const [showAddXmlFlow, setShowAddXmlFlow] = useState(false);
  const [searchOperationId, setSearchOperationId] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [copiedAccountInfo, setCopiedAccountInfo] = useState(false);

  const handleCopyAccountInfo = () => {
    navigator.clipboard.writeText(PORTAL_ACCOUNT_CLIPBOARD_TEXT);
    setCopiedAccountInfo(true);
    setTimeout(() => setCopiedAccountInfo(false), 2000);
  };
  const [selectedGroup, setSelectedGroup] = useState(DEFAULT_CORPORATE_GROUP);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [selectedPendingTask, setSelectedPendingTask] = useState<PendingTask | null>(null);
  const [showSuccessOperationToast, setShowSuccessOperationToast] = useState(false);
  const [selectedTitulos, setSelectedTitulos] = useState<number[]>([]);
  const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);
  const [confirmacaoData, setConfirmacaoData] = useState<ConfirmacaoData>({ date: '', time: '', evidence: null, observacoes: '' });
  const [hasPendingConfirmations, setHasPendingConfirmations] = useState(false);
  const [activePendingToastSource, setActivePendingToastSource] = useState<'header' | 'hero' | null>(null);
  const [isWaitingValidation, setIsWaitingValidation] = useState(false);
  const [showSuccessApprovalToast, setShowSuccessApprovalToast] = useState(false);
  const [showLinkSelectionModal, setShowLinkSelectionModal] = useState(false);
  const [selectedSacados, setSelectedSacados] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['whatsapp']);
  const [isShowingResolveScreen, setIsShowingResolveScreen] = useState(false);
  const [hasSeenResolveExplanation, setHasSeenResolveExplanation] = useState(false);
  const [showCanhotoModal, setShowCanhotoModal] = useState(false);
  const [canhotoFiles, setCanhotoFiles] = useState<CanhotoFile[]>([]);
  const [isUploadingCanhoto, setIsUploadingCanhoto] = useState(false);
  const [uploadCanhotoProgress, setUploadCanhotoProgress] = useState(0);
  const [titulosList, setTitulosList] = useState<Titulo[]>(INITIAL_TITULOS);
  const sacadoContactsState = useSacadoContacts();

  // Auto-open sidebar on desktop
  React.useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  const handleOpenOperationRequest = (serviceName: string) => {
    setLockedTabNotice(`Solicitação de ${serviceName} estará disponível após aprovação cadastral e liberação do limite.`);
    setTimeout(() => setLockedTabNotice(null), 4000);
  };

  const handleCompleteOperation = (data: OperationCompletionData) => {
    const newOperation = createPortalOperation(data, selectedService, selectedGroup);
    setOperations([newOperation, ...operations]);
    setActiveTab('home');
    setShowOperationRequest(false);
    setShowSuccessOperationToast(true);
    setTimeout(() => setShowSuccessOperationToast(false), 5000);
  };

  const handleGroupChange = (group: string) => {
    setIsLoadingGroup(true);
    // Simulate data fetching for the new group
    setTimeout(() => {
      setSelectedGroup(group);
      setTimeout(() => {
        setIsLoadingGroup(false);
      }, 800);
    }, 1200);
  };

  const handleSelectTitulo = (id: number) => {
    setSelectedTitulos(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllTitulos = (ids: number[]) => {
    if (selectedTitulos.length === ids.length) {
      setSelectedTitulos([]);
    } else {
      setSelectedTitulos(ids);
    }
  };

  const handleRegisterConfirmacao = () => {
    // Simular registro
    alert('Confirmação registrada com sucesso para ' + selectedTitulos.length + ' títulos.');
    setShowConfirmacaoModal(false);
    setSelectedTitulos([]);
    setConfirmacaoData({ date: '', time: '', evidence: null, observacoes: '' });
  };

  const handleCanhotoSubmit = () => {
    setIsUploadingCanhoto(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        setUploadCanhotoProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsUploadingCanhoto(false);
          setShowCanhotoModal(false);
          setSelectedTituloDetailsForResolution(null);
          
          if (selectedTituloDetailsForResolution) {
            const updatedList = titulosList.map(t => t.id === selectedTituloDetailsForResolution.id ? { 
              ...t, 
              actionStatus: 'Pendente de Análise', 
              status: 'Pendente de Análise',
              canhotoEnviado: true 
            } : t);
            setTitulosList(updatedList);
          }
        }, 1000);
      } else {
        setUploadCanhotoProgress(progress);
      }
    }, 400);
  };

  const onAnticipateClick = (source: 'header' | 'hero') => {
    setLockedTabNotice("Documentação em análise. Novas solicitações de antecipação estarão disponíveis após liberação do limite.");
    setTimeout(() => setLockedTabNotice(null), 4000);
  };

  const PendingBlockToast = ({ source }: { source: 'header' | 'hero' }) => (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className={cn(
        "absolute z-[200] w-80 md:w-96 shadow-2xl",
        source === 'header' ? "top-full right-0 mt-4" : "bottom-full left-1/2 -translate-x-1/2 mb-6"
      )}
    >
      <div className="bg-white border-l-4 border-l-agro-orange rounded-2xl p-6 shadow-2xl flex gap-4 items-start ring-1 ring-black/5 text-left">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-agro-orange shrink-0">
          <AlertCircle size={24} />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-gci uppercase tracking-tight">Operação Indisponível</h4>
            <button onClick={() => setActivePendingToastSource(null)} className="text-slate-300 hover:text-slate-500">
              <X size={14} />
            </button>
          </div>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            Para continuar operando, você precisa regularizar as <span className="font-bold text-agro-orange">Cessões de Títulos pendentes</span> na sua Carteira.
          </p>
          <button 
            onClick={() => {
              setActiveTab('carteira');
              setActivePendingToastSource(null);
            }}
            className="text-[10px] font-black text-agro-orange uppercase tracking-widest hover:underline pt-2 inline-block"
          >
            Ir para Carteira agora →
          </button>
        </div>
      </div>
      {source === 'hero' && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-black/5 rotate-45" />
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'
        } bg-gci transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <Logo variant="light" className="h-8 origin-left" />
          ) : (
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white mx-auto">
              <Building2 size={20} />
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-1">
          {DASHBOARD_NAV_ITEMS.map((item) => {
            const isLocked = !isVerified && item.id !== 'documentos';
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isLocked) {
                    setLockedTabNotice('Conclua o preenchimento do seu cadastro para liberar o acesso ao portal.');
                    setTimeout(() => setLockedTabNotice(null), 4000);
                    return;
                  }
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  isLocked
                    ? 'opacity-45 hover:opacity-75 cursor-not-allowed text-white/50'
                    : activeTab === item.id 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                title={isLocked ? 'Disponível após completar o cadastro' : item.label}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={20} className={activeTab === item.id ? 'text-agro-orange' : 'shrink-0'} />
                  {(isSidebarOpen || window.innerWidth < 1024) && <span className="font-semibold text-sm">{item.label}</span>}
                </div>

                {(isSidebarOpen || window.innerWidth < 1024) && (
                  <div>
                    {isLocked && (
                      <Lock size={14} className="text-white/30" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 mt-auto space-y-2">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 p-3 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-bold text-sm">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="lg:hidden">
              <Logo variant="dark" className="h-7" />
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 bg-slate-50 text-slate-400 hover:text-gci hover:bg-slate-100 rounded-xl transition-all relative"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-agro-orange rounded-full border-2 border-white"></span>
              </button>

              <AnimatePresence>
                {showLoginToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -10, x: '-50%' }}
                    className="absolute top-full left-1/2 mt-4 w-64 bg-gci text-white p-4 rounded-2xl shadow-2xl z-50 text-center"
                  >
                    <p className="text-xs font-bold">Você possui pendências!</p>
                    <p className="text-[10px] text-white/70 mt-1">Clique no sino para visualizar.</p>
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gci rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 md:w-96 bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden z-50"
                    >
                      <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                        <h3 className="text-sm font-black text-gci uppercase tracking-widest">Notificações</h3>
                        <span className="bg-agro-orange text-white text-[10px] font-black px-2 py-0.5 rounded-full">4 NOVAS</span>
                      </div>
                      
                      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                        {['Pendências', 'Notificações'].map((cat) => (
                          <div key={cat} className="py-2">
                            <div className="px-6 py-2">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat}</p>
                            </div>
                            {PORTAL_NOTIFICATIONS.filter(n => n.category === cat).map((n) => (
                              <button
                                key={n.id}
                                onClick={() => {
                                  if (n.category === 'Pendências') setSelectedPendingTask(n);
                                  setShowNotifications(false);
                                }}
                                className="w-full px-6 py-4 flex gap-4 hover:bg-slate-50 transition-colors text-left group"
                              >
                                <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                                  n.category === 'Pendências' ? 'bg-orange-50 text-agro-orange' : 'bg-blue-50 text-blue-600'
                                }`}>
                                  {n.category === 'Pendências' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-0.5">
                                    <p className="text-xs font-bold text-gci group-hover:text-agro-orange transition-colors">{n.title}</p>
                                    <span className="text-[10px] text-slate-400 font-medium">{n.date}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 leading-relaxed">{n.description}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full py-4 bg-slate-50 text-[10px] font-black text-gci uppercase tracking-widest hover:bg-slate-100 transition-colors border-t border-slate-100">
                        Marcar todas como lidas
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 md:pl-6 md:border-l border-slate-100 hover:bg-slate-50 transition-all p-2 rounded-xl text-left"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gci leading-none">Eduardo Santos</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                    Ag. 0001 • C/C 84920-3
                  </p>
                </div>
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gci/5 flex items-center justify-center text-gci font-bold text-sm border border-gci/10 shadow-xs">
                  ES
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50"
                    >
                      {/* User Identity Header */}
                      <div className="px-5 py-3 border-b border-slate-50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gci text-white flex items-center justify-center font-bold text-sm shrink-0">
                          ES
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gci truncate">Eduardo Santos</p>
                          <p className="text-xs text-slate-400 truncate">eduardo.santos@ceresinvestimentos.com</p>
                        </div>
                      </div>

                      {/* Account Details Card */}
                      <div className="p-4 mx-3 my-2 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-agro-orange" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                              Dados da Conta
                            </span>
                          </div>
                          <span className="text-[9px] font-bold text-gci bg-gci/5 px-2 py-0.5 rounded border border-gci/10">
                            GCI SCD
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Agência</span>
                            <span className="text-xs font-bold text-gci font-mono">0001</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Conta Corrente</span>
                            <span className="text-xs font-bold text-gci font-mono">84920-3</span>
                          </div>
                        </div>

                        <div className="space-y-1 mb-3 pt-1 border-t border-slate-200/60 text-[11px]">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-slate-400 font-medium">Titular:</span>
                            <span className="font-bold text-gci text-right truncate">AgroTech Soluções Agrícolas S.A.</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 font-medium">CNPJ:</span>
                            <span className="font-mono text-slate-600 font-semibold">12.345.678/0001-90</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleCopyAccountInfo}
                          className="w-full py-2 px-3 rounded-lg bg-white border border-slate-200 hover:border-agro-orange hover:text-agro-orange text-gci text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-2xs"
                        >
                          {copiedAccountInfo ? (
                            <>
                              <Check size={14} className="text-emerald-500" />
                              <span className="text-emerald-600">Dados da conta copiados!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>Copiar dados bancários</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Group Switching Section */}
                      <div className="border-t border-slate-50 py-2">
                        <div className="px-5 py-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grupo Selecionado</p>
                        </div>
                        {CORPORATE_GROUPS.map((group) => (
                          <button
                            key={group}
                            onClick={() => {
                              handleGroupChange(group);
                              setShowUserMenu(false);
                            }}
                            className="w-full flex items-center justify-between px-5 py-2 text-sm hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Building2 size={16} className={selectedGroup === group ? 'text-agro-orange' : 'text-slate-400'} />
                              <span className={selectedGroup === group ? 'font-bold text-gci' : 'text-slate-600'}>{group}</span>
                            </div>
                            {selectedGroup === group && (
                              <div className="w-1.5 h-1.5 rounded-full bg-agro-orange" />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-slate-50 pt-2 px-2">
                        <button 
                          onClick={onLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
                        >
                          <LogOut size={16} />
                          Sair da conta
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-8 max-w-[1400px] mx-auto w-full">
          {/* Unlocked Portal Toast */}
          <AnimatePresence>
            {portalUnlockedToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-emerald-500 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="shrink-0" />
                  <span className="text-sm font-bold">
                    Cadastro concluído com sucesso! Documentos enviados para análise da mesa de crédito. Acesso ao portal liberado.
                  </span>
                </div>
                <button
                  onClick={() => setPortalUnlockedToast(false)}
                  className="p-1 hover:bg-white/20 rounded-lg text-white/80 hover:text-white"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}

            {lockedTabNotice && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-slate-800 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4 border border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <Lock size={18} className="text-agro-orange shrink-0" />
                  <span className="text-xs md:text-sm font-medium">
                    {lockedTabNotice}
                  </span>
                </div>
                <button
                  onClick={() => setLockedTabNotice(null)}
                  className="p-1 hover:bg-white/20 rounded-lg text-white/60 hover:text-white"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Welcome Section */}
          <AnimatePresence>
            {/* Validation Waiting Toast - Global */}
            {isWaitingValidation && (
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                onClick={() => {
                  setIsWaitingValidation(false);
                  setTitulosList(prev => prev.map(t => (t.actionStatus === 'Pendente de Análise' || (t.canhotoEnviado || t.linkEnviado)) ? { 
                    ...t, 
                    actionStatus: 'Confirmado', 
                    status: 'Confirmado',
                    statusColor: 'text-green-600 bg-green-50 border-green-100' 
                  } : t));
                  setShowSuccessApprovalToast(true);
                  setTimeout(() => setShowSuccessApprovalToast(false), 6000);
                  setHasPendingConfirmations(titulosList.some(t => t.actionStatus === 'Pendência' && !t.canhotoEnviado && !t.linkEnviado));
                }}
                className="fixed bottom-8 right-8 z-[200] max-w-md cursor-pointer group"
              >
                <div className="bg-white border-2 border-blue-100 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(37,99,235,0.15)] flex flex-col gap-6 relative overflow-hidden ring-1 ring-blue-200/20 group-hover:border-blue-300 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16" />
                  
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Clock size={28} strokeWidth={2.5} className="animate-spin-slow" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-gci uppercase tracking-tight text-blue-900">Em Validação</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                        Seus títulos estão em validação de confirmação. Assim que o processo for concluído avisaremos você.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Success Approval Toast - Global */}
            {showSuccessApprovalToast && (
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="fixed bottom-8 right-8 z-[201] max-w-md"
              >
                <div className="bg-white border-2 border-green-100 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(22,163,74,0.15)] flex flex-col gap-5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-full blur-3xl -mr-16 -mt-16" />
                  
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-green-500/20">
                      <CheckCircle2 size={28} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-green-900 uppercase tracking-tight">Títulos Confirmados</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        A validação foi concluída com sucesso! Seus títulos estão liberados e você já pode operar novamente.
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowSuccessApprovalToast(false)}
                    className="w-full bg-gci text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    ENTENDIDO
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isShowingResolveScreen && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="bg-[#F8F9FA] rounded-[40px] shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-gci tracking-tighter uppercase italic">Resolução de Pendências</h1>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Regularize seus títulos para liberar novas operações</p>
                    </div>
                    <button 
                      onClick={() => setIsShowingResolveScreen(false)}
                      className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-gci hover:bg-slate-100 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {!hasSeenResolveExplanation ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between gap-8 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-full blur-3xl -mr-16 -mt-16" />
                          <div className="space-y-6">
                            <div className="w-16 h-16 rounded-[24px] bg-orange-50 text-agro-orange flex items-center justify-center shrink-0">
                              <Image size={32} />
                            </div>
                            <div className="space-y-4">
                              <h3 className="text-xl font-black text-gci uppercase tracking-tighter italic">Subir Canhoto</h3>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                                O canhoto da Nota Fiscal assinado é a prova física da entrega e recebimento da mercadoria. 
                                Suba o arquivo (foto ou PDF) para que nossa equipe valide a operação instantaneamente.
                              </p>
                            </div>
                          </div>

                          <div className="aspect-video bg-slate-50 rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center p-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1/3 h-full bg-white border-l border-slate-200 border-dashed p-3 shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
                              <div className="h-2 w-full bg-slate-100 rounded-full mb-2" />
                              <div className="h-2 w-2/3 bg-slate-100 rounded-full mb-6" />
                              <div className="mt-8">
                                <div className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Assinatura do Recebedor</div>
                                <div className="h-6 w-full border-b border-slate-200 mt-1 italic text-[10px] text-agro-orange font-medium flex items-end pb-1 px-1">
                                  Ricardo silva...
                                </div>
                              </div>
                            </div>
                            <div className="w-full h-full p-2 space-y-3 opacity-20">
                              <div className="h-2.5 w-1/2 bg-slate-300 rounded-full" />
                              <div className="h-2.5 w-full bg-slate-300 rounded-full" />
                              <div className="h-2.5 w-3/4 bg-slate-300 rounded-full" />
                              <div className="h-2.5 w-full bg-slate-300 rounded-full" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 to-transparent flex items-center justify-center">
                              <p className="relative z-10 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                                Exemplo de Canhoto
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between gap-8 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-full blur-3xl -mr-16 -mt-16" />
                          <div className="space-y-4">
                            <div className="w-16 h-16 rounded-[24px] bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                              <Link size={32} />
                            </div>
                            <div className="space-y-4">
                              <h3 className="text-xl font-black text-gci uppercase tracking-tighter italic">Evidência de Reconhecimento</h3>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                                A Evidência de Reconhecimento é um link disponibilizado para você, cliente, enviar diretamente ao sacado da Nota Fiscal.
                                <br /><br />
                                Ao acessar a próxima tela, você poderá escolher como deseja compartilhar esse link — seja por e-mail ou WhatsApp. Assim, o sacado receberá uma notificação com as informações necessárias para reconhecer o título.
                              </p>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => setHasSeenResolveExplanation(true)}
                            className="w-full bg-gci text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-gci/20 hover:bg-gci-hover transition-all active:scale-95 flex items-center justify-center gap-3"
                          >
                            ENTENDI, SEGUIR PARA RESOLUÇÃO
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                  <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Título</th>
                                  <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Lastro / Numero</th>
                                  <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Cessão</th>
                                  <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Ações para Resolução</th>
                                </tr>
                              </thead>
                              <tbody>
                                {titulosList.filter(t => t.actionStatus === 'Pendência' || t.canhotoEnviado || t.linkEnviado).map((titulo, idx) => (
                                  <tr key={titulo.id} className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors ${idx % 2 === 0 ? '' : 'bg-slate-50/10'}`}>
                                    <td className="px-8 py-6">
                                      <div className="flex flex-col">
                                        <span className="text-sm font-black text-gci uppercase tracking-tighter italic">{titulo.titulo}</span>
                                        <span className="text-[10px] text-slate-400 font-bold mt-0.5">{titulo.sacado}</span>
                                      </div>
                                    </td>
                                    <td className="px-8 py-6 text-xs font-black text-slate-600 uppercase italic">
                                      {titulo.lastro} / {titulo.numero}
                                    </td>
                                    <td className="px-8 py-6 text-xs font-black text-slate-400 uppercase italic">
                                      {titulo.cessao}
                                    </td>
                                    <td className="px-8 py-6">
                                      <div className="flex items-center justify-center gap-3">
                                        <button 
                                          disabled={titulo.canhotoEnviado}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTituloDetailsForResolution(titulo);
                                            setShowCanhotoModal(true);
                                            setCanhotoFiles([]);
                                            setIsUploadingCanhoto(false);
                                            setUploadCanhotoProgress(0);
                                          }}
                                          className={cn(
                                            "flex flex-col items-center gap-1 p-3 px-6 rounded-2xl transition-all border shrink-0",
                                            titulo.canhotoEnviado 
                                              ? "bg-green-50 border-green-100 text-green-600"
                                              : "bg-orange-50 border-orange-100 text-agro-orange hover:bg-orange-100"
                                          )}
                                        >
                                          {titulo.canhotoEnviado ? <CheckCircle2 size={16} /> : <Upload size={16} />}
                                          <span className="text-[9px] font-black uppercase tracking-widest">{titulo.canhotoEnviado ? 'Canhoto Enviado' : 'Subir Canhoto'}</span>
                                        </button>

                                        <button 
                                          disabled={titulo.linkEnviado}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTituloDetailsForResolution(titulo);
                                            setShowLinkSelectionModal(true);
                                          }}
                                          className={cn(
                                            "flex flex-col items-center gap-1 p-3 px-6 rounded-2xl transition-all border shrink-0",
                                            titulo.linkEnviado 
                                              ? "bg-green-50 border-green-100 text-green-600"
                                              : "bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100"
                                          )}
                                        >
                                          {titulo.linkEnviado ? <CheckCircle2 size={16} /> : <Link size={16} />}
                                          <span className="text-[9px] font-black uppercase tracking-widest">{titulo.linkEnviado ? 'Link Enviado' : 'Link de Confirmação'}</span>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="bg-gci rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-gci/20">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange shrink-0">
                              <Info size={24} />
                            </div>
                            <p className="text-sm font-bold text-white/80 leading-relaxed max-w-xl italic">
                              Após finalizar o envio de canhotos ou links de todos os títulos, nossa equipe de backoffice iniciará a validação imediatamente. Você será notificado assim que o processo for concluído.
                            </p>
                          </div>
                          <button 
                            onClick={() => {
                              const hasPending = titulosList.some(t => t.actionStatus === 'Pendência');
                              if (!hasPending) {
                                setIsWaitingValidation(true);
                              }
                              setIsShowingResolveScreen(false);
                            }}
                            className="bg-white text-gci px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-agro-orange hover:text-white transition-all active:scale-95 whitespace-nowrap"
                          >
                            ENTENDIDO, VOLTAR
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gci tracking-tight">
                {activeTab === 'home' ? 'Olá, Eduardo! Boas vindas.' : activeTab === 'geral' ? 'Minhas Informações' : activeTab === 'carteira' ? 'Minha Carteira' : activeTab === 'operacoes' ? 'Minhas Operações' : 'Complete o seu Cadastro'}
              </h1>
              <p className="text-slate-500 text-sm md:text-base font-medium mt-1">
                {activeTab === 'home'
                  ? 'Acelere seu fluxo de caixa agora mesmo.'
                  : activeTab === 'geral' 
                  ? `Aqui está o resumo financeiro da ${selectedGroup} hoje.` 
                  : activeTab === 'carteira'
                  ? 'Acompanhe o desempenho e os títulos da sua carteira ativa.'
                  : activeTab === 'operacoes'
                  ? 'Gerencie e acompanhe o status de suas solicitações.'
                  : 'Complete a sua jornada cadastral para liberação do seu limite de crédito.'}
              </p>
            </div>
            {(activeTab === 'operacoes' || activeTab === 'home') && (
              <div className="flex gap-3">
                <div className="relative group">
                  <button 
                    onClick={() => onAnticipateClick('header')}
                    className="bg-agro-orange text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-agro-orange/90 transition-all shadow-xl shadow-agro-orange/20 active:scale-[0.98] flex items-center gap-3 uppercase tracking-wider"
                  >
                    Fazer Antecipação
                    <Zap size={18} fill="currentColor" />
                  </button>
                  <AnimatePresence>
                    {activePendingToastSource === 'header' && <PendingBlockToast source="header" />}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {activeTab === 'home' ? (
            <div className="space-y-8">
              <AnimatePresence>
                {/* Fixed Clean Popup for Pending Actions */}
                {hasPendingConfirmations && !isWaitingValidation && (
                  <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="fixed bottom-8 right-8 z-[150] max-w-md"
                  >
                    <div className="bg-white border-2 border-orange-100 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(255,165,0,0.15)] flex flex-col gap-6 relative overflow-hidden group ring-1 ring-orange-200/20">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-full blur-3xl -mr-16 -mt-16" />
                      
                      <div className="flex items-start gap-5 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-agro-orange shrink-0 animate-pulse">
                          <AlertCircle size={28} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-base font-black text-gci uppercase tracking-tight">Ações pendentes na Carteira</h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Você tem pendência de títulos na sua carteira.
                          </p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setActiveTab('carteira')}
                        className="w-full bg-agro-orange text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-agro-orange/20 hover:bg-gci transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        CLIQUE AQUI PARA RESOLVER
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Aggressive Limit Hero */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gci rounded-[40px] p-8 md:p-12 overflow-hidden shadow-2xl shadow-gci/20 text-white"
              >
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-[-20deg] translate-x-20" />
                <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-agro-orange/10 rounded-full blur-[100px]" />
                
                <div className="relative z-10 max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
                    <Shield size={14} className="text-agro-orange" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Crédito Pré-Aprovado</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black leading-[1.1] mb-6">
                    Você tem <span className="text-agro-orange whitespace-nowrap">R$ 0,00</span> <br className="hidden md:block" /> disponível para antecipação de recebíveis.
                  </h2>
                  <p className="text-base text-white/70 mb-10 leading-relaxed font-medium">
                    Antecipe seus valores a receber. Sem burocracia, 100% digital e com taxas competitivas.
                  </p>
                  <div className="relative inline-block">
                    <button 
                      onClick={() => onAnticipateClick('hero')}
                      className="group bg-white text-gci px-10 py-5 rounded-[24px] font-black text-base transition-all hover:shadow-2xl hover:shadow-white/20 active:scale-95 flex items-center gap-4 uppercase tracking-widest"
                    >
                      Antecipar Agora
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <AnimatePresence>
                      {activePendingToastSource === 'hero' && <PendingBlockToast source="hero" />}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Limit Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-6 group-hover:bg-gci group-hover:text-white transition-all">
                      <Wallet size={24} />
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Limite para Desconto de Duplicata</p>
                    <h3 className="text-3xl font-black text-gci tracking-tight">R$ 0,00</h3>
                  </div>
                  <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Utilizado: R$ 0,00</span>
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-[0%] h-full bg-gci rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-agro-orange mb-6 group-hover:bg-agro-orange group-hover:text-white transition-all">
                      <TrendingUp size={24} />
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Disponível para Antecipação de Duplicata</p>
                    <h3 className="text-4xl font-black text-gci tracking-tight">R$ 0,00</h3>
                  </div>
                  <div className="mt-8 pt-8 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                      <Clock size={16} />
                      Sem limite disponível no momento
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Operations on Home */}
              <div>
                <div className="flex items-center justify-between mb-6 ml-1">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Operações Recentes</h4>
                  <button 
                    onClick={() => setActiveTab('operacoes')}
                    className="text-[10px] font-black text-gci hover:text-agro-orange uppercase tracking-widest transition-colors flex items-center gap-1"
                  >
                    Ver Tudo
                    <ChevronRight size={14} />
                  </button>
                </div>
                {operations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {operations.slice(0, 3).map((op) => (
                      <motion.div 
                        key={op.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => {
                          setSelectedOpDetails(op);
                          setActiveTab('operacoes');
                        }}
                        className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            op.status === 'Finalizado' ? 'bg-green-50 text-green-600' : 
                            op.status === 'Rejeitado' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-agro-orange'
                          }`}>
                            <FileText size={20} />
                          </div>
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                             op.status === 'Rejeitado' ? 'border-red-100 text-red-500' :
                             op.status === 'Finalizado' ? 'border-green-100 text-green-600' :
                             'border-orange-100 text-agro-orange'
                          }`}>
                            {op.status}
                          </span>
                        </div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">#{op.id}</p>
                        <h4 className="font-black text-gci text-sm mb-4 line-clamp-1">{op.title}</h4>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                          <span className="text-sm font-black text-gci">{op.value}</span>
                          <span className="text-[10px] items-center gap-1 text-gray-400 font-bold flex">
                            <Calendar size={12} />
                            {op.date}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-[24px] border border-slate-100 p-8 text-center text-slate-400 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mx-auto mb-3">
                      <FileText size={24} />
                    </div>
                    <p className="text-sm font-bold text-slate-700">Nenhuma operação realizada</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Suas solicitações de antecipação e desconto de duplicata aparecerão aqui.</p>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'geral' ? (
            <div className="space-y-8">
              {/* KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gci/5 flex items-center justify-center text-gci">
                      <Wallet size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                      <ArrowUpRight size={12} /> 0%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Limite Total</p>
                  <h3 className="text-2xl font-bold text-gci">R$ 0,00</h3>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gci p-6 rounded-2xl shadow-lg shadow-gci/10 text-white relative overflow-hidden group"
                >
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      <CreditCard size={20} />
                    </div>
                  </div>
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider mb-1 relative z-10">Risco</p>
                  <h3 className="text-2xl font-bold text-white relative z-10">R$ 0,00</h3>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group sm:col-span-2 lg:col-span-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-agro-orange/5 flex items-center justify-center text-agro-orange">
                      <TrendingUp size={20} />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Disponível</p>
                  <h3 className="text-2xl font-bold text-gci">R$ 0,00</h3>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'duplicata', label: 'Desconto de Duplicata', icon: ArrowDownRight, active: true },
                  { id: 'recebiveis', label: 'Contratos Fiduciários', icon: Banknote, active: false },
                ].map((service) => (
                  <button 
                    key={service.id}
                    onClick={() => service.active && handleOpenOperationRequest(service.label)}
                    disabled={!service.active}
                    className={`bg-white border border-slate-100 p-5 rounded-2xl flex flex-col items-center text-center gap-3 transition-all group relative ${
                      service.active 
                        ? 'hover:border-gci/20 hover:shadow-md active:scale-[0.98]' 
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {!service.active && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <span className="bg-gci text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl">Em breve</span>
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      service.active 
                        ? 'bg-slate-50 text-gci group-hover:bg-gci group-hover:text-white' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      <service.icon size={20} />
                    </div>
                    <span className={`text-[11px] font-bold leading-tight uppercase tracking-wide ${
                      service.active ? 'text-gci' : 'text-slate-400'
                    }`}>{service.label}</span>
                  </button>
                ))}
              </div>

              {/* Chart Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Chart */}
                <div className="lg:col-span-2 space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-lg font-black text-gci">Evolução da Inadimplência</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Valores a pagar / Pendentes</p>
                      </div>
                      <div className="flex gap-2">
                        {['1M', '3M', '6M', '1Y'].map((period) => (
                          <button key={period} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${period === '6M' ? 'bg-gci text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
                            {period}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={DELINQUENCY_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} 
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
                            tickFormatter={(value) => `R$ ${value / 1000}k`}
                          />
                          <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 800, color: '#083c4a' }}
                            labelStyle={{ fontSize: '10px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}
                            formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                          />
                          <Bar 
                            dataKey="value" 
                            fill="#083c4a" 
                            radius={[8, 8, 0, 0]} 
                            barSize={32}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </div>

                {/* Right: Transactions */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-gci">Extrato de Operação</h3>
                    <button className="text-[10px] font-black text-agro-orange uppercase tracking-widest hover:underline">Ver Tudo</button>
                  </div>
                  <div className="space-y-8 flex-1">
                    {ACCOUNT_TRANSACTIONS.length > 0 ? (
                      ACCOUNT_TRANSACTIONS.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                              tx.type === 'in' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            }`}>
                              {tx.type === 'in' ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                            </div>
                            <div>
                              <p className="font-black text-sm text-gci">{tx.name}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{tx.date}</p>
                            </div>
                          </div>
                          <span className={`font-black text-sm ${
                            tx.type === 'in' ? 'text-green-600' : 'text-gci'
                          }`}>
                            {tx.amount}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-slate-400">
                        <FileText size={28} className="mx-auto mb-2 text-slate-300" />
                        <p className="text-xs font-semibold text-slate-600">Nenhuma movimentação</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Seu extrato de operações aparecerá aqui.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          ) : activeTab === 'carteira' ? (
            <div className="space-y-6">
              {/* Carteira Summary & Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                  >
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Valor Total</p>
                    <h3 className="text-2xl font-bold text-gci">R$ 0,00</h3>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-50 w-fit px-2 py-1 rounded-lg">
                      <ArrowUpRight size={12} /> 0% este mês
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                  >
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Valor Vencido</p>
                    <h3 className="text-2xl font-bold text-slate-400">R$ 0,00</h3>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-50 w-fit px-2 py-1 rounded-lg">
                      <CheckCircle2 size={12} /> 0 títulos pendentes
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                  >
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">A Vencer (30d)</p>
                    <h3 className="text-2xl font-bold text-gci">R$ 0,00</h3>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                  >
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Títulos Ativos</p>
                    <h3 className="text-2xl font-bold text-gci">0</h3>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col"
                >
                  <h4 className="text-xs font-bold text-gci uppercase tracking-wider mb-6">Distribuição da Carteira</h4>
                  <div className="flex-1 flex items-center justify-center min-h-[180px]">
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={PORTFOLIO_DISTRIBUTION}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {PORTFOLIO_DISTRIBUTION.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {PORTFOLIO_DISTRIBUTION.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-[10px] font-bold text-slate-500 truncate">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Carteira Table */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-1.5 p-1 bg-slate-50 rounded-xl w-fit">
                    <button className="bg-white text-gci px-4 py-2 rounded-lg text-xs font-bold shadow-sm">Todos</button>
                    <button className="text-slate-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">Vencidos</button>
                    <button className="text-slate-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">A Vencer</button>
                  </div>
                  <div className="flex gap-2">
                    {selectedTitulos.length > 0 && (
                      <motion.button 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => setShowConfirmacaoModal(true)}
                        className="flex items-center justify-center gap-2 bg-agro-orange text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-agro-orange/90 transition-all shadow-lg shadow-agro-orange/20"
                      >
                        <Zap size={14} fill="currentColor" />
                        Atualizar Confirmação ({selectedTitulos.length})
                      </motion.button>
                    )}
                    <button 
                      onClick={() => setShowFilterModal(true)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-50 text-gci px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all border border-slate-100"
                    >
                      <Filter size={14} />
                      Filtros
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gci text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gci-hover transition-all">
                      <Download size={14} />
                      Exportar
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="pl-6 py-4 w-10">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-slate-300 text-agro-orange focus:ring-agro-orange cursor-pointer"
                            checked={selectedTitulos.length === titulosList.length}
                            onChange={() => handleSelectAllTitulos(titulosList.map(t => t.id))}
                          />
                        </th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">Situação do TÍTULO</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Título</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Lastro</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Número</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Cessão</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Criação</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Valor nominal</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Valor aquisição</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Valor presente</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Vencimento</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Sacado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {titulosList.length > 0 ? (
                        [...titulosList].sort((a, b) => {
                          if (a.actionStatus === 'Pendência' && b.actionStatus !== 'Pendência') return -1;
                          if (a.actionStatus !== 'Pendência' && b.actionStatus === 'Pendência') return 1;
                          return 0;
                        }).map((row) => (
                          <tr 
                            key={row.id} 
                            className={`hover:bg-slate-50/50 transition-colors group cursor-pointer ${selectedTitulos.includes(row.id) ? 'bg-orange-50/30' : ''}`}
                          >
                            <td className="pl-6 py-4" onClick={(e) => e.stopPropagation()}>
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-slate-300 text-agro-orange focus:ring-agro-orange cursor-pointer"
                                checked={selectedTitulos.includes(row.id)}
                                onChange={() => handleSelectTitulo(row.id)}
                              />
                            </td>
                            <td className="px-6 py-4 text-center">
                              {row.actionStatus === 'Pendência' ? (
                                <div className="flex flex-col items-center gap-1.5">
                                  <span className="flex items-center justify-center gap-1.5 bg-orange-100 text-agro-orange px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm shadow-agro-orange/10 whitespace-nowrap">
                                    <AlertCircle size={10} />
                                    PENDENTE DE CONFIRMAÇÃO
                                  </span>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setHasSeenResolveExplanation(false);
                                      setIsShowingResolveScreen(true);
                                    }}
                                    className="text-[9px] font-black text-gci uppercase tracking-widest bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-agro-orange hover:text-agro-orange transition-all active:scale-95 shadow-sm"
                                  >
                                    RESOLVA AQUI
                                  </button>
                                </div>
                              ) : (row.actionStatus === 'Pendente de Análise' || row.actionStatus === 'Confirmado') ? (
                                <div className="flex items-center justify-center">
                                  <span className={`flex items-center gap-1.5 ${row.actionStatus === 'Confirmado' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'} px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm ${row.actionStatus === 'Confirmado' ? 'shadow-green-600/20' : 'shadow-green-600/10'}`}>
                                    <CheckCircle2 size={10} />
                                    {row.actionStatus}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 min-w-[180px]" onClick={() => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}>
                              <p className="font-bold text-xs text-gci">{row.titulo}</p>
                              <p className="text-[10px] text-slate-400 font-medium">Grupo AgroTech</p>
                            </td>
                            <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" onClick={() => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}>{row.lastro}</td>
                            <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" onClick={() => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}>{row.numero}</td>
                            <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" onClick={() => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}>{row.cessao}</td>
                            <td className="px-6 py-4 text-center" onClick={() => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}>
                              <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border whitespace-nowrap block w-fit mx-auto ${row.statusColor}`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" onClick={() => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}>{row.criacao}</td>
                            <td className="px-6 py-4 font-bold text-xs text-gci whitespace-nowrap" onClick={() => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}>{row.valorNominal}</td>
                            <td className="px-6 py-4 text-xs text-slate-500 font-bold whitespace-nowrap" onClick={() => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}>{row.valorAquisicao}</td>
                            <td className="px-6 py-4 text-xs text-slate-500 font-bold whitespace-nowrap" onClick={() => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}>{row.valorPresente}</td>
                            <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" onClick={() => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}>{row.vencimento}</td>
                            <td className="px-6 py-4 text-xs text-slate-500 font-bold whitespace-nowrap" onClick={() => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}>{row.sacado}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={13} className="py-12 text-center text-slate-400">
                            <FileText size={28} className="mx-auto mb-2 text-slate-300" />
                            <p className="text-xs font-semibold text-slate-600">Nenhum título cadastrado</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">Seus títulos aparecerão aqui quando forem originados.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t border-slate-50 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-6">
                    <p className="text-xs text-slate-400 font-medium">
                      Mostrando <span className="font-bold text-gci">{titulosList.length > 0 ? `1-${titulosList.length}` : '0-0'}</span> de <span className="font-bold text-gci">{titulosList.length}</span> títulos
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Itens por página:</span>
                      <div className="relative">
                        <select className="bg-slate-50 border border-slate-100 rounded-lg pl-3 pr-8 py-1.5 text-[10px] font-bold text-gci focus:outline-none focus:border-gci appearance-none cursor-pointer min-w-[60px]">
                          <option>10</option>
                          <option>20</option>
                          <option>50</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
                      <ChevronLeft size={16} />
                    </button>
                    <div className="flex items-center gap-1">
                      {[1].map((page, i) => (
                        <button 
                          key={i}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                            page === 1 ? 'bg-slate-200 text-slate-400' : 'text-slate-400 hover:bg-slate-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'operacoes' ? (
            <div className="space-y-8">
              {operations.length > 0 ? (
                <>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex gap-1.5 p-1 bg-white border border-slate-100 rounded-xl w-fit">
                      <button className="bg-white text-gci px-4 py-2 rounded-lg text-xs font-bold shadow-sm border border-slate-100">Todos</button>
                      <button className="text-slate-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">Em andamento</button>
                      <button className="text-slate-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">Finalizado</button>
                      <button className="text-slate-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">Rejeitado</button>
                    </div>
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text"
                        placeholder="Buscar por ID..."
                        value={searchOperationId}
                        onChange={(e) => setSearchOperationId(e.target.value)}
                        className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-gci transition-all shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {operations
                    .filter(op => op.id.toLowerCase().includes(searchOperationId.toLowerCase()))
                    .map((op) => (
                    <motion.div 
                      key={op.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gci/5 rounded-bl-[64px] -mr-4 -mt-4"></div>
                      
                      <div className="flex items-center justify-between mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gci/5 flex items-center justify-center text-gci group-hover:bg-gci group-hover:text-white transition-all">
                            <FileText size={24} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#{op.id}</p>
                            <h3 className="font-black text-gci text-lg leading-tight">{op.type}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 relative z-10">
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">Grupo Empresarial</p>
                            <p className="font-bold text-gci truncate">{op.title}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">Valor Estimado</p>
                            <p className="text-lg font-black text-gci">{op.value}</p>
                          </div>
                        </div>

                        {/* Progress Indicator inside card */}
                        <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded-xl">
                          {[
                            { label: 'Envio', completed: true },
                            { label: 'Análise', completed: op.status !== 'Rejeitado' },
                            { label: 'Assinatura', completed: op.status === 'Finalizado' },
                            { label: 'Liberação', completed: op.status === 'Finalizado' }
                          ].map((s, idx) => (
                            <div key={idx} className="flex-1 flex flex-col gap-1">
                              <div className={`h-1 rounded-full transition-all ${
                                s.completed ? 'bg-agro-orange' : 'bg-slate-200'
                              }`} />
                              <span className={`text-[7px] font-black uppercase tracking-tighter text-center ${
                                s.completed ? 'text-agro-orange' : 'text-slate-300'
                              }`}>
                                {s.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">Status</p>
                            <span className={`text-[10px] font-black px-3 py-1 rounded-lg flex items-center gap-1.5 uppercase tracking-wider border ${
                              op.status === 'Rejeitado' ? 'bg-red-50 text-red-500 border-red-100' :
                              op.status === 'Finalizado' ? 'bg-green-50 text-green-600 border-green-100' :
                              op.status === 'Em andamento' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                              'bg-orange-50 text-agro-orange border-orange-100 animate-pulse'
                            }`}>
                              {op.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                            <Calendar size={12} className="text-slate-300" />
                            {op.date}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          <Building2 size={14} />
                          <span>{op.date}</span>
                        </div>
                        <button 
                          onClick={() => setSelectedOpDetails(op)}
                          className="flex items-center gap-1 text-[10px] font-black text-gci hover:text-agro-orange transition-colors uppercase tracking-widest"
                        >
                          Detalhes
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination Footer for Operations */}
                <div className="mt-8 flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-6">
                    <p className="text-xs text-slate-400 font-medium">
                      Mostrando <span className="font-bold text-gci">1-{operations.length}</span> de <span className="font-bold text-gci">{operations.length}</span> operações
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Itens por página:</span>
                      <select className="bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-[10px] font-bold text-gci focus:outline-none focus:border-gci appearance-none cursor-pointer">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
                      <ChevronLeft size={16} />
                    </button>
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 rounded-lg text-xs font-bold bg-gci text-white shadow-lg shadow-gci/10">1</button>
                    </div>
                    <button className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </>
              ) : (
              <div className="bg-white rounded-[40px] border border-gray-100 p-20 text-center flex flex-col items-center justify-center shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
                    <FileText size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-gci mb-3 tracking-tight">Nenhuma operação ativa</h3>
                  <p className="text-gray-500 mb-8 max-w-md font-medium">Você ainda não possui solicitações em andamento. Inicie uma nova operação agora mesmo.</p>
                  <button 
                    onClick={() => setActiveTab('geral')}
                    className="bg-gci text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-gci-hover transition-all shadow-xl shadow-gci/20 active:scale-[0.98]"
                  >
                    Ver Serviços Disponíveis
                  </button>
                </div>
              )}
            </div>
          ) : (
            <DocumentVerification 
              isVerified={isVerified}
              onCompleteVerification={() => {
                setIsVerified(true);
                setActiveTab('home');
                setPortalUnlockedToast(true);
                setTimeout(() => setPortalUnlockedToast(false), 6000);
              }}
              onResetVerification={() => {
                setIsVerified(false);
                setActiveTab('documentos');
              }}
            />
          )}
        </main>
      </div>

      {/* Operation Details Modal */}
      <OperationDetailsModal
        operation={selectedOpDetails}
        onClose={() => setSelectedOpDetails(null)}
        onTabChange={(tab) => setSelectedOpDetails({ ...selectedOpDetails, currentTab: tab })}
        onResolvePending={() => setSelectedPendingTask(FIRST_PENDING_NOTIFICATION)}
        onLinkAssets={() => setShowLinkAssetsModal(true)}
        onAddXml={() => setShowAddXmlFlow(true)}
      />

      {/* Title Details Modal */}
      <TitleDetailsModal
        titulo={selectedTituloDetails}
        contacts={sacadoContactsState}
        onClose={() => setSelectedTituloDetails(null)}
        onTabChange={(tab) => setSelectedTituloDetails({ ...selectedTituloDetails, currentTab: tab })}
      />

      {/* Pending Task Modal */}
      <PendingTaskModal task={selectedPendingTask} onClose={() => setSelectedPendingTask(null)} />

      {/* Document Upload Modal */}
      <DocumentUploadModal isOpen={showDocsModal} onClose={() => setShowDocsModal(false)} />

      {/* Operation Request Flow */}
      <OperationRequestModal
        isOpen={showOperationRequest}
        serviceName={selectedService}
        onClose={() => setShowOperationRequest(false)}
        onComplete={handleCompleteOperation}
      />

      {/* Link Assets Modal */}
      <LinkAssetsModal isOpen={showLinkAssetsModal} onClose={() => setShowLinkAssetsModal(false)} />

      {/* Add XML Modal (Simplified) */}
      <AddXmlModal isOpen={showAddXmlFlow} onClose={() => setShowAddXmlFlow(false)} />

      {/* Canhoto Upload Modal */}
      <CanhotoUploadModal
        isOpen={showCanhotoModal}
        titulo={selectedTituloDetailsForResolution}
        files={canhotoFiles}
        isUploading={isUploadingCanhoto}
        progress={uploadCanhotoProgress}
        onPickFile={() => {
          setCanhotoFiles([{ name: "CANHOTO_NF_" + selectedTituloDetailsForResolution?.numero + ".png", size: "2.4 MB" }]);
        }}
        onRemoveFile={() => setCanhotoFiles([])}
        onClose={() => {
          setShowCanhotoModal(false);
          setSelectedTituloDetailsForResolution(null);
        }}
        onSubmit={handleCanhotoSubmit}
      />

      {/* Filtros Carteira Modal */}
      <CarteiraFilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} />

      {/* Success Notification Toast */}
      <AnimatePresence>
        {showSuccessOperationToast && (
          <motion.div 
            initial={{ opacity: 0, y: 100, x: '-50%' }}
            animate={{ opacity: 1, y: -40, x: '-50%' }}
            exit={{ opacity: 0, y: 100, x: '-50%' }}
            className="fixed bottom-0 left-1/2 z-[200] bg-gci text-white px-8 py-5 rounded-[24px] shadow-2xl flex items-center gap-5 border border-white/10 min-w-[320px] md:min-w-[450px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-agro-orange flex items-center justify-center shrink-0 shadow-lg shadow-agro-orange/20">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-widest">Operação Criada com Sucesso</p>
              <p className="text-xs text-white/60 font-medium">Os e-mails de confirmação e o comprovante foram enviados para seu e-mail cadastrado.</p>
            </div>
            <button onClick={() => setShowSuccessOperationToast(false)} className="ml-4 p-2 text-white/30 hover:text-white">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay for Group Switch */}
      <AnimatePresence>
        {isLoadingGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-white/20 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <motion.div 
                  className="w-24 h-24 rounded-full border-4 border-gci/10 border-t-gci"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Logo variant="dark" className="h-4 opacity-50" />
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-2 text-center">
                <motion.h4 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-xl font-black text-gci tracking-tight"
                >
                  Sincronizando Dados
                </motion.h4>
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm text-slate-500 font-bold uppercase tracking-widest"
                >
                  Alternando para <span className="text-gci">{selectedGroup}</span>
                </motion.p>
              </div>

              {/* Progress Bar */}
              <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-gci"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <ConfirmacaoModal
        isOpen={showConfirmacaoModal}
        selectedCount={selectedTitulos.length}
        data={confirmacaoData}
        onDataChange={setConfirmacaoData}
        onClose={() => setShowConfirmacaoModal(false)}
        onSubmit={handleRegisterConfirmacao}
      />

      <LinkSelectionModal
        isOpen={showLinkSelectionModal}
        titulo={selectedTituloDetailsForResolution}
        contacts={sacadoContactsState.sacadoContacts}
        selectedChannels={selectedChannels}
        selectedSacados={selectedSacados}
        onToggleChannel={(channelId) => setSelectedChannels((prev) => toggleListItem(prev, channelId))}
        onToggleSacado={(contactId) => setSelectedSacados((prev) => toggleListItem(prev, contactId))}
        onToggleAllSacados={() => {
          const allIds = sacadoContactsState.sacadoContacts.map(c => c.id);
          if (selectedSacados.length === allIds.length) setSelectedSacados([]);
          else setSelectedSacados(allIds);
        }}
        onClose={() => {
          setShowLinkSelectionModal(false);
          setSelectedTituloDetailsForResolution(null);
        }}
        onSubmit={() => {
          const updatedList = titulosList.map(t => t.id === selectedTituloDetailsForResolution.id ? {
            ...t,
            actionStatus: 'Pendente de Análise',
            status: 'Pendente de Análise',
            linkEnviado: true
          } : t);

          setTitulosList(updatedList);

          const hasPending = updatedList.some(t => t.actionStatus === 'Pendência');
          if (!hasPending) {
            setHasPendingConfirmations(false);
          }

          setShowLinkSelectionModal(false);
          setSelectedTituloDetailsForResolution(null);
        }}
      />
    </div>
  );
};
