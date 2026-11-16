import { ref, type UnwrapNestedRefs } from 'vue';
import type { PendingToastSource } from '@/types/dashboard';
import type { PendingTask } from '@/types/notification';

/** Modais/avisos simples do portal (documentos, vínculo de ativos, XML, tarefa pendente, aviso de bloqueio). */
export function useDashboardOverlays() {
  // `showDocsModal` nunca é aberto no original (só é fechado).
  const showDocsModal = ref(false);
  const showLinkAssetsModal = ref(false);
  const showAddXmlFlow = ref(false);
  const selectedPendingTask = ref<PendingTask | null>(null);
  // O original nunca ativa o aviso "Operação Indisponível" (só o fecha).
  const activePendingToastSource = ref<PendingToastSource | null>(null);

  return {
    showDocsModal,
    showLinkAssetsModal,
    showAddXmlFlow,
    selectedPendingTask,
    activePendingToastSource,
  };
}

/** Estado desembrulhado (use `reactive(useDashboardOverlays())` para repassar aos componentes filhos). */
export type OverlaysState = UnwrapNestedRefs<ReturnType<typeof useDashboardOverlays>>;
