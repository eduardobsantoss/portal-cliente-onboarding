import { ref } from 'vue';
import { INITIAL_EXPANDED_TOPICS } from '@/constants/documentChecklist';
import type { ChecklistTopicKey, ExpandedTopics } from '@/types/documentChecklist';

/** Quais tópicos do checklist estão expandidos (accordion). */
export function useChecklistTopics() {
  const expandedTopics = ref<ExpandedTopics>(INITIAL_EXPANDED_TOPICS);

  // Toggle single topic
  const toggleTopic = (key: ChecklistTopicKey) => {
    expandedTopics.value = { ...expandedTopics.value, [key]: !expandedTopics.value[key] };
  };

  const openTopics = (keys: ChecklistTopicKey[]) => {
    const next = { ...expandedTopics.value };
    keys.forEach((key) => {
      next[key] = true;
    });
    expandedTopics.value = next;
  };

  return { expandedTopics, toggleTopic, openTopics };
}
