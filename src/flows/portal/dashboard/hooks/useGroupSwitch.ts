import { useState } from 'react';
import { GROUP_SWITCH_FETCH_MS, GROUP_SWITCH_SETTLE_MS } from '@/constants/dashboardTimings';
import { DEFAULT_CORPORATE_GROUP } from '@/mocks/economicGroups';

/** Grupo econômico selecionado e a troca simulada (busca + assentamento). */
export function useGroupSwitch() {
  const [selectedGroup, setSelectedGroup] = useState(DEFAULT_CORPORATE_GROUP);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);

  const handleGroupChange = (group: string) => {
    setIsLoadingGroup(true);
    // Simulate data fetching for the new group
    setTimeout(() => {
      setSelectedGroup(group);
      setTimeout(() => {
        setIsLoadingGroup(false);
      }, GROUP_SWITCH_SETTLE_MS);
    }, GROUP_SWITCH_FETCH_MS);
  };

  return { selectedGroup, isLoadingGroup, handleGroupChange };
}
