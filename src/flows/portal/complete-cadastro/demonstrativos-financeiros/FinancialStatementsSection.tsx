import React from 'react';
import { FileText } from 'lucide-react';
import { FINANCIAL_TOPIC_TITLE, getFinancialTopicSubtitle } from '@/constants/checklistTopics';
import { DocumentSectionTopic, type DocumentSectionProps } from '../comum/DocumentSectionTopic';

/** Seção 4: Demonstrativos Financeiros & Contábeis (balanço não obrigatório para Simples Nacional). */
export const FinancialStatementsSection: React.FC<DocumentSectionProps> = (props) => {
  return (
    <DocumentSectionTopic
      {...props}
      icon={<FileText size={18} />}
      title={FINANCIAL_TOPIC_TITLE}
      subtitle={getFinancialTopicSubtitle(props.companyTier)}
    />
  );
};
