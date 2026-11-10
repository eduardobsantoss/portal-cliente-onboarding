import React from 'react';
import { Smartphone } from 'lucide-react';
import { SmsVerification } from '@/flows/onboarding/sms/SmsVerification';
import { CHECKLIST_MASKED_PHONE } from '@/constants/documentChecklist';
import { SMS_TOPIC_TEXT, TOPIC_CONTENT_BASE_CLASS } from '@/constants/checklistTopics';
import { ChecklistTopic } from '@/flows/portal/complete-cadastro/comum/ChecklistTopic';
import { ValidationBadge } from '@/flows/portal/complete-cadastro/comum/ValidationBadge';

interface SmsTopicProps {
  phoneVerified: boolean;
  phoneVerifiedAt: string;
  isOpen: boolean;
  onToggle: () => void;
  onVerified: () => void;
}

/** Seção 1: Confirmação do Telefone por SMS (reaproveita o SmsVerification do onboarding). */
export const SmsTopic: React.FC<SmsTopicProps> = ({
  phoneVerified,
  phoneVerifiedAt,
  isOpen,
  onToggle,
  onVerified,
}) => {
  return (
    <ChecklistTopic
      icon={<Smartphone size={18} />}
      isDone={phoneVerified}
      title={SMS_TOPIC_TEXT.title}
      subtitle={SMS_TOPIC_TEXT.subtitle}
      badge={<ValidationBadge isDone={phoneVerified} doneLabel="Concluído" variant="topic" />}
      isOpen={isOpen}
      onToggle={onToggle}
      contentClassName={TOPIC_CONTENT_BASE_CLASS}
    >
      <SmsVerification
        isVerified={phoneVerified}
        maskedPhone={CHECKLIST_MASKED_PHONE}
        verifiedAt={phoneVerifiedAt}
        onVerified={onVerified}
      />
    </ChecklistTopic>
  );
};
