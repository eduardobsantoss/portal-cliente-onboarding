export type SupportTab = 'faq' | 'ligacao';

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}
