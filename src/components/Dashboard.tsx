import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ArrowRight, Bell, Building2, Check, CheckCircle2, ChevronDown, Clock, Copy, Image, Info, Link, Lock, LogOut, Menu, Upload, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/utils/cn';
import { DocumentVerification } from '@/flows/portal/complete-cadastro/DocumentVerification';
import { DASHBOARD_NAV_ITEMS } from '@/constants/dashboardNav';
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
import { PageHeader } from '@/flows/portal/dashboard/layout/PageHeader';
import { HomeTab } from '@/flows/portal/dashboard/home/HomeTab';
import { GeralTab } from '@/flows/portal/dashboard/minhas-informacoes/GeralTab';
import { CarteiraTab } from '@/flows/portal/dashboard/carteira/CarteiraTab';
import { OperacoesTab } from '@/flows/portal/dashboard/operacoes/OperacoesTab';
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

          <PageHeader
            activeTab={activeTab}
            selectedGroup={selectedGroup}
            activePendingToastSource={activePendingToastSource}
            onAnticipate={onAnticipateClick}
            onDismissPendingToast={() => setActivePendingToastSource(null)}
            onGoToCarteira={() => {
              setActiveTab('carteira');
              setActivePendingToastSource(null);
            }}
          />

          {activeTab === 'home' ? (
            <HomeTab
              operations={operations}
              hasPendingConfirmations={hasPendingConfirmations}
              isWaitingValidation={isWaitingValidation}
              activePendingToastSource={activePendingToastSource}
              onNavigate={setActiveTab}
              onOpenOperation={(op) => {
                setSelectedOpDetails(op);
                setActiveTab('operacoes');
              }}
              onAnticipate={onAnticipateClick}
              onDismissPendingToast={() => setActivePendingToastSource(null)}
              onGoToCarteira={() => {
                setActiveTab('carteira');
                setActivePendingToastSource(null);
              }}
            />
          ) : activeTab === 'geral' ? (
            <GeralTab onSelectService={handleOpenOperationRequest} />
          ) : activeTab === 'carteira' ? (
            <CarteiraTab
              titulosList={titulosList}
              selectedTitulos={selectedTitulos}
              onSelectTitulo={handleSelectTitulo}
              onSelectAllTitulos={handleSelectAllTitulos}
              onOpenDetails={(row) => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}
              onOpenResolve={() => {
                setHasSeenResolveExplanation(false);
                setIsShowingResolveScreen(true);
              }}
              onOpenFilter={() => setShowFilterModal(true)}
              onOpenConfirmacao={() => setShowConfirmacaoModal(true)}
            />
          ) : activeTab === 'operacoes' ? (
            <OperacoesTab
              operations={operations}
              searchOperationId={searchOperationId}
              onSearchChange={setSearchOperationId}
              onOpenDetails={setSelectedOpDetails}
              onViewServices={() => setActiveTab('geral')}
            />
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
