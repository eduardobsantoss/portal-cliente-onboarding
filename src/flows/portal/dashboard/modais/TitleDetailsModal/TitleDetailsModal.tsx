import { AnimatePresence } from 'motion/react';
import { DEFAULT_TITLE_DETAILS_TAB, TITLE_DETAILS_TABS } from '@/constants/titleDetails';
import type { SacadoContactsState } from '@/flows/portal/dashboard/hooks/useSacadoContacts';
import type { TituloDetails, TituloDetailsTab } from '@/types/titulo';
import { DetailsTabBar } from '@/flows/portal/dashboard/modais/comum/DetailsTabBar';
import { FullscreenDetailsModal } from '@/flows/portal/dashboard/modais/comum/FullscreenDetailsModal';
import { TitleAttachmentsTab } from './TitleAttachmentsTab';
import { TitleDetailsSidebar } from './TitleDetailsSidebar';
import { TitleInfoTab } from './TitleInfoTab';
import { TitleMovementsTab } from './TitleMovementsTab';
import { TitleSacadoTab } from './TitleSacadoTab';
import { TitleValidationsTab } from './TitleValidationsTab';

interface TitleDetailsModalProps {
  titulo: TituloDetails | null;
  contacts: SacadoContactsState;
  onClose: () => void;
  onTabChange: (tab: TituloDetailsTab) => void;
}

export const TitleDetailsModal = ({ titulo, contacts, onClose, onTabChange }: TitleDetailsModalProps) => (
  <AnimatePresence>
    {titulo && (
      <FullscreenDetailsModal
        title={<>Detalhes do <span className="text-agro-orange">Título</span>.</>}
        description="Visualize todas as informações, anexos e movimentações deste título específico."
        sidebar={<TitleDetailsSidebar status={titulo.status} valorNominal={titulo.valorNominal} />}
        onClose={onClose}
      >
        {/* Tabs for Details */}
        <DetailsTabBar
          tabs={TITLE_DETAILS_TABS}
          activeTab={titulo.currentTab || DEFAULT_TITLE_DETAILS_TAB}
          onChange={onTabChange}
          indicatorLayoutId="tabUnderlineTitulo"
          containerClassName="flex gap-8 border-b border-gray-100 mb-10 overflow-x-auto no-scrollbar"
          buttonClassName="pb-4 text-xs font-black uppercase tracking-widest transition-all relative shrink-0"
        />

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {(titulo.currentTab || DEFAULT_TITLE_DETAILS_TAB) === 'DETALHES_TITULO' && <TitleInfoTab titulo={titulo} />}
          {titulo.currentTab === 'ANEXOS' && <TitleAttachmentsTab />}
          {titulo.currentTab === 'VALIDACOES' && <TitleValidationsTab titulo={titulo} />}
          {titulo.currentTab === 'MOVIMENTACOES' && <TitleMovementsTab />}
          {titulo.currentTab === 'SACADO' && <TitleSacadoTab titulo={titulo} contacts={contacts} />}
        </div>
      </FullscreenDetailsModal>
    )}
  </AnimatePresence>
);
