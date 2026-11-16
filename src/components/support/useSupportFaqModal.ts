import { computed, ref } from 'vue';
import { FAQ_DEFAULT_EXPANDED_ID, FAQ_ITEMS, SUPPORT_DEFAULT_PHONE } from '@/constants/faq';
import type { SupportTab } from '@/types/faq';

export function useSupportFaqModal(initialTab: SupportTab = 'faq') {
  const activeTab = ref<SupportTab>(initialTab);
  const search = ref('');
  const expandedId = ref<string | null>(FAQ_DEFAULT_EXPANDED_ID);
  const callbackRequested = ref(false);
  const phone = ref(SUPPORT_DEFAULT_PHONE);
  const notes = ref('');

  const setActiveTab = (value: SupportTab) => {
    activeTab.value = value;
  };
  const setSearch = (value: string) => {
    search.value = value;
  };
  const setExpandedId = (value: string | null) => {
    expandedId.value = value;
  };
  const setCallbackRequested = (value: boolean) => {
    callbackRequested.value = value;
  };
  const setPhone = (value: string) => {
    phone.value = value;
  };
  const setNotes = (value: string) => {
    notes.value = value;
  };

  const filteredFaqs = computed(() =>
    FAQ_ITEMS.filter(item =>
      item.question.toLowerCase().includes(search.value.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.value.toLowerCase()) ||
      item.category.toLowerCase().includes(search.value.toLowerCase())
    ),
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
