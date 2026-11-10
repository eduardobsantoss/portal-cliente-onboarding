import React from 'react';
import { Building2 } from 'lucide-react';
import { COMPANY_DOCS_TOPIC_TEXT } from '@/constants/checklistTopics';
import { DocumentSectionTopic, type DocumentSectionProps } from '@/flows/portal/complete-cadastro/comum/DocumentSectionTopic';

/** Seção 3: Documentos Cadastrais da Empresa. */
export const CompanyDocumentsSection: React.FC<DocumentSectionProps> = (props) => {
  return (
    <DocumentSectionTopic
      {...props}
      icon={<Building2 size={18} />}
      title={COMPANY_DOCS_TOPIC_TEXT.title}
      subtitle={COMPANY_DOCS_TOPIC_TEXT.subtitle}
    />
  );
};
