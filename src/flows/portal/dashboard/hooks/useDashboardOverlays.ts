import { useState } from 'react';
import type { PendingToastSource } from '@/types/dashboard';
import type { PendingTask } from '@/types/notification';

/** Modais/avisos simples do portal (documentos, vínculo de ativos, XML, tarefa pendente, aviso de bloqueio). */
export function useDashboardOverlays() {
  // `showDocsModal` nunca é aberto no original (só é fechado).
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showLinkAssetsModal, setShowLinkAssetsModal] = useState(false);
  const [showAddXmlFlow, setShowAddXmlFlow] = useState(false);
  const [selectedPendingTask, setSelectedPendingTask] = useState<PendingTask | null>(null);
  // O original nunca ativa o aviso "Operação Indisponível" (só o fecha).
  const [activePendingToastSource, setActivePendingToastSource] = useState<PendingToastSource | null>(null);

  return {
    showDocsModal,
    setShowDocsModal,
    showLinkAssetsModal,
    setShowLinkAssetsModal,
    showAddXmlFlow,
    setShowAddXmlFlow,
    selectedPendingTask,
    setSelectedPendingTask,
    activePendingToastSource,
    setActivePendingToastSource,
  };
}

export type OverlaysState = ReturnType<typeof useDashboardOverlays>;
