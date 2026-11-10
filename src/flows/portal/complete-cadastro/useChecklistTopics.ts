import { useState } from 'react';
import { INITIAL_EXPANDED_TOPICS } from '@/constants/documentChecklist';
import type { ChecklistTopicKey, ExpandedTopics } from '@/types/documentChecklist';

/** Quais tópicos do checklist estão expandidos (accordion). */
export function useChecklistTopics() {
  const [expandedTopics, setExpandedTopics] = useState<ExpandedTopics>(INITIAL_EXPANDED_TOPICS);

  // Toggle single topic
  const toggleTopic = (key: ChecklistTopicKey) => {
    setExpandedTopics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openTopics = (keys: ChecklistTopicKey[]) => {
    setExpandedTopics((prev) => {
      const next = { ...prev };
      keys.forEach((key) => {
        next[key] = true;
      });
      return next;
    });
  };

  return { expandedTopics, toggleTopic, openTopics };
}
