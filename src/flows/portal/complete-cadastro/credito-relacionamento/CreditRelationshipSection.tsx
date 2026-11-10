import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { CREDIT_TOPIC_TEXT } from '@/constants/checklistTopics';
import { DocumentSectionTopic, type DocumentSectionProps } from '@/flows/portal/complete-cadastro/comum/DocumentSectionTopic';

/** Seção 5: Crédito & Relacionamento Bancário. */
export const CreditRelationshipSection: React.FC<DocumentSectionProps> = (props) => {
  return (
    <DocumentSectionTopic
      {...props}
      icon={<ShieldCheck size={18} />}
      title={CREDIT_TOPIC_TEXT.title}
      subtitle={CREDIT_TOPIC_TEXT.subtitle}
    />
  );
};
