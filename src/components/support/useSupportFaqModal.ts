import { useState } from 'react';
import { FAQ_DEFAULT_EXPANDED_ID, FAQ_ITEMS, SUPPORT_DEFAULT_PHONE } from '@/constants/faq';
import type { SupportTab } from '@/types/faq';

export function useSupportFaqModal(initialTab: SupportTab = 'faq') {
  const [activeTab, setActiveTab] = useState<SupportTab>(initialTab);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(FAQ_DEFAULT_EXPANDED_ID);
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [phone, setPhone] = useState(SUPPORT_DEFAULT_PHONE);
  const [notes, setNotes] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter(item =>
    item.question.toLowerCase().includes(search.toLowerCase()) ||
    item.answer.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    expandedId,
    setExpandedId,
    callbackRequested,
    setCallbackRequested,
    phone,
    setPhone,
    notes,
    setNotes,
    filteredFaqs,
  };
}
