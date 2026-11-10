import React from 'react';
import { TOPIC_CONTENT_DOCS_CLASS } from '@/constants/checklistTopics';
import type { CompanyTier, DocumentItem, PreviewDoc } from '@/types/documentChecklist';
import type { SectionStats } from '@/utils/checklistProgress';
import { ChecklistTopic } from './ChecklistTopic';
import { DocumentRow } from './DocumentRow';
import { TopicCountBadge } from './TopicCountBadge';

/** Props comuns às seções de documentos oficiais da empresa (3, 4 e 5). */
export interface DocumentSectionProps {
  docs: DocumentItem[];
  stats: SectionStats;
  companyTier: CompanyTier;
  isOpen: boolean;
  onToggle: () => void;
  onUpload: (docId: string, file: File) => void;
  onPreview: (doc: PreviewDoc) => void;
}

interface DocumentSectionTopicProps extends DocumentSectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

/** Tópico do checklist com a lista de documentos de uma categoria e o contador "X de Y enviados". */
export const DocumentSectionTopic: React.FC<DocumentSectionTopicProps> = ({
  docs,
  stats,
  companyTier,
  isOpen,
  onToggle,
  onUpload,
  onPreview,
  icon,
  title,
  subtitle,
}) => {
  return (
    <ChecklistTopic
      icon={icon}
      isDone={stats.isDone}
      title={title}
      subtitle={subtitle}
      badge={
        <TopicCountBadge isDone={stats.isDone}>
          {stats.approved + stats.inAnalysis} de {stats.total} enviados
        </TopicCountBadge>
      }
      isOpen={isOpen}
      onToggle={onToggle}
      contentClassName={TOPIC_CONTENT_DOCS_CLASS}
    >
      {docs.map((item) => (
        <DocumentRow
          key={item.id}
          doc={item}
          companyTier={companyTier}
          onUpload={(file) => onUpload(item.id, file)}
          onPreview={() => item.fileName && onPreview({ title: item.title, fileName: item.fileName })}
        />
      ))}
    </ChecklistTopic>
  );
};
