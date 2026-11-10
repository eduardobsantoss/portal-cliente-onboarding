import React from 'react';
import { QrCode } from 'lucide-react';
import { FacialVerification } from '@/flows/portal/verificacao-facial/FacialVerification';
import { FACIAL_TOPIC_TEXT, TOPIC_CONTENT_BASE_CLASS } from '@/constants/checklistTopics';
import { ChecklistTopic } from '../comum/ChecklistTopic';
import { ValidationBadge } from '../comum/ValidationBadge';

interface FacialTopicProps {
  facialVerified: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onVerified: () => void;
}

/** Seção 2: Reconhecimento & Biometria Facial (QR Code). */
export const FacialTopic: React.FC<FacialTopicProps> = ({ facialVerified, isOpen, onToggle, onVerified }) => {
  return (
    <ChecklistTopic
      icon={<QrCode size={18} />}
      isDone={facialVerified}
      title={FACIAL_TOPIC_TEXT.title}
      subtitle={FACIAL_TOPIC_TEXT.subtitle}
      badge={<ValidationBadge isDone={facialVerified} doneLabel="Validada" variant="topic" />}
      isOpen={isOpen}
      onToggle={onToggle}
      contentClassName={TOPIC_CONTENT_BASE_CLASS}
    >
      <FacialVerification isVerified={facialVerified} onVerified={onVerified} />
    </ChecklistTopic>
  );
};
