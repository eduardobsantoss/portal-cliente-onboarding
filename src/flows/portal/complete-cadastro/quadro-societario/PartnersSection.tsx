import React from 'react';
import { Plus, Users } from 'lucide-react';
import { PARTNERS_TOPIC_TEXT, TOPIC_CONTENT_PARTNERS_CLASS } from '@/constants/checklistTopics';
import type { PartnerData, PartnerDocKey, PreviewDoc } from '@/types/documentChecklist';
import { ChecklistTopic } from '@/flows/portal/complete-cadastro/comum/ChecklistTopic';
import { TopicCountBadge } from '@/flows/portal/complete-cadastro/comum/TopicCountBadge';
import { PartnerAccordionItem } from './PartnerAccordionItem';

interface PartnersSectionProps {
  partners: PartnerData[];
  partnersValidCount: number;
  partnersDone: boolean;
  expandedPartnerId: string | null;
  onExpandedPartnerChange: (partnerId: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
  onUploadDoc: (partnerId: string, docKey: PartnerDocKey, file: File) => void;
  onPreview: (doc: PreviewDoc) => void;
  onAddPartner: () => void;
}

/** Seção 6: Quadro Societário (Partes Relacionadas) — sócios PF/PJ, cônjuges e representantes. */
export const PartnersSection: React.FC<PartnersSectionProps> = ({
  partners,
  partnersValidCount,
  partnersDone,
  expandedPartnerId,
  onExpandedPartnerChange,
  isOpen,
  onToggle,
  onUploadDoc,
  onPreview,
  onAddPartner,
}) => {
  return (
    <ChecklistTopic
      icon={<Users size={18} />}
      isDone={partnersDone}
      title={PARTNERS_TOPIC_TEXT.title}
      subtitle={PARTNERS_TOPIC_TEXT.subtitle}
      badge={
        <TopicCountBadge isDone={partnersDone}>
          {partnersValidCount} de {partners.length} partes validadas
        </TopicCountBadge>
      }
      isOpen={isOpen}
      onToggle={onToggle}
      contentClassName={TOPIC_CONTENT_PARTNERS_CLASS}
    >
      {/* Partners List (Discreet Collapsible for each partner) */}
      <div className="space-y-3">
        {partners.map((partner) => {
          const isExpanded = expandedPartnerId === partner.id;
          return (
            <PartnerAccordionItem
              key={partner.id}
              partner={partner}
              isExpanded={isExpanded}
              onToggle={() => onExpandedPartnerChange(isExpanded ? null : partner.id)}
              onUploadDoc={onUploadDoc}
              onPreview={onPreview}
            />
          );
        })}
      </div>

      {/* Add Partner Action */}
      <div className="flex justify-end pt-1">
        <button
          onClick={onAddPartner}
          className="text-xs font-bold text-gci hover:underline flex items-center gap-1"
        >
          <Plus size={14} />
          Adicionar Parte Relacionada
        </button>
      </div>
    </ChecklistTopic>
  );
};
