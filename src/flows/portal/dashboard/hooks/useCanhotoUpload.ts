import { useState } from 'react';
import { CANHOTO_COMPLETE_DELAY_MS, CANHOTO_PROGRESS_TICK_MS } from '@/constants/dashboardTimings';
import type { CanhotoFile, Titulo } from '@/types/titulo';

interface UseCanhotoUploadParams {
  resolutionTitulo: Titulo | null;
  setResolutionTitulo: (titulo: Titulo | null) => void;
  titulosList: Titulo[];
  setTitulosList: (titulos: Titulo[]) => void;
}

/** Modal "Subir Canhoto": arquivo escolhido e envio simulado com barra de progresso. */
export function useCanhotoUpload({ resolutionTitulo, setResolutionTitulo, titulosList, setTitulosList }: UseCanhotoUploadParams) {
  const [showCanhotoModal, setShowCanhotoModal] = useState(false);
  const [canhotoFiles, setCanhotoFiles] = useState<CanhotoFile[]>([]);
  const [isUploadingCanhoto, setIsUploadingCanhoto] = useState(false);
  const [uploadCanhotoProgress, setUploadCanhotoProgress] = useState(0);

  const openCanhotoModal = (titulo: Titulo) => {
    setResolutionTitulo(titulo);
    setShowCanhotoModal(true);
    setCanhotoFiles([]);
    setIsUploadingCanhoto(false);
    setUploadCanhotoProgress(0);
  };

  const closeCanhotoModal = () => {
    setShowCanhotoModal(false);
    setResolutionTitulo(null);
  };

  const pickCanhotoFile = () => {
    setCanhotoFiles([{ name: "CANHOTO_NF_" + resolutionTitulo?.numero + ".png", size: "2.4 MB" }]);
  };

  const removeCanhotoFile = () => setCanhotoFiles([]);

  const handleCanhotoSubmit = () => {
    setIsUploadingCanhoto(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        setUploadCanhotoProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsUploadingCanhoto(false);
          setShowCanhotoModal(false);
          setResolutionTitulo(null);

          if (resolutionTitulo) {
            const updatedList = titulosList.map(t => t.id === resolutionTitulo.id ? {
              ...t,
              actionStatus: 'Pendente de Análise',
              status: 'Pendente de Análise',
              canhotoEnviado: true
            } : t);
            setTitulosList(updatedList);
          }
        }, CANHOTO_COMPLETE_DELAY_MS);
      } else {
        setUploadCanhotoProgress(progress);
      }
    }, CANHOTO_PROGRESS_TICK_MS);
  };

  return {
    showCanhotoModal,
    canhotoFiles,
    isUploadingCanhoto,
    uploadCanhotoProgress,
    openCanhotoModal,
    closeCanhotoModal,
    pickCanhotoFile,
    removeCanhotoFile,
    handleCanhotoSubmit,
  };
}

export type CanhotoUploadState = ReturnType<typeof useCanhotoUpload>;
