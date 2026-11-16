import { ref, type UnwrapNestedRefs } from 'vue';
import { GROUP_SWITCH_FETCH_MS, GROUP_SWITCH_SETTLE_MS } from '@/constants/dashboardTimings';
import { DEFAULT_CORPORATE_GROUP } from '@/mocks/economicGroups';

/** Grupo econômico selecionado e a troca simulada (busca + assentamento). */
export function useGroupSwitch() {
  const selectedGroup = ref(DEFAULT_CORPORATE_GROUP);
  const isLoadingGroup = ref(false);

  const handleGroupChange = (group: string) => {
    isLoadingGroup.value = true;
    // Simulate data fetching for the new group
    setTimeout(() => {
      selectedGroup.value = group;
      setTimeout(() => {
        isLoadingGroup.value = false;
      }, GROUP_SWITCH_SETTLE_MS);
    }, GROUP_SWITCH_FETCH_MS);
  };

  return { selectedGroup, isLoadingGroup, handleGroupChange };
}

/** Estado desembrulhado (use `reactive(useGroupSwitch())` para repassar aos componentes filhos). */
export type GroupSwitchState = UnwrapNestedRefs<ReturnType<typeof useGroupSwitch>>;
