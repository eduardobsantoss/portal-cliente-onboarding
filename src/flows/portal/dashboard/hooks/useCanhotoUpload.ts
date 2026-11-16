import { ref, type Ref, type UnwrapNestedRefs } from 'vue';
import { CANHOTO_COMPLETE_DELAY_MS, CANHOTO_PROGRESS_TICK_MS } from '@/constants/dashboardTimings';
import type { CanhotoFile, Titulo } from '@/types/titulo';

interface UseCanhotoUploadParams {
  resolutionTitulo: Ref<Titulo | null>;
  titulosList: Ref<Titulo[]>;
}

/** Modal "Subir Canhoto": arquivo escolhido e envio simulado com barra de progresso. */
export function useCanhotoUpload({ resolutionTitulo, titulosList }: UseCanhotoUploadParams) {
  const showCanhotoModal = ref(false);
  const canhotoFiles = ref<CanhotoFile[]>([]);
  const isUploadingCanhoto = ref(false);
  const uploadCanhotoProgress = ref(0);

  const openCanhotoModal = (titulo: Titulo) => {
    resolutionTitulo.value = titulo;
    showCanhotoModal.value = true;
    canhotoFiles.value = [];
    isUploadingCanhoto.value = false;
    uploadCanhotoProgress.value = 0;
  };

  const closeCanhotoModal = () => {
    showCanhotoModal.value = false;
    resolutionTitulo.value = null;
  };

  const pickCanhotoFile = () => {
    canhotoFiles.value = [{ name: "CANHOTO_NF_" + resolutionTitulo.value?.numero + ".png", size: "2.4 MB" }];
  };

  const removeCanhotoFile = () => {
    canhotoFiles.value = [];
  };

  const handleCanhotoSubmit = () => {
    // Valores capturados no envio (o original os lê da renderização em que o envio foi disparado).
    const titulo = resolutionTitulo.value;
    const currentList = titulosList.value;
    isUploadingCanhoto.value = true;
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        uploadCanhotoProgress.value = 100;
        clearInterval(interval);
        setTimeout(() => {
          isUploadingCanhoto.value = false;
          showCanhotoModal.value = false;
          resolutionTitulo.value = null;

          if (titulo) {
            const updatedList = currentList.map(t => t.id === titulo.id ? {
              ...t,
              actionStatus: 'Pendente de Análise',
              status: 'Pendente de Análise',
              canhotoEnviado: true
            } : t);
            titulosList.value = updatedList;
          }
        }, CANHOTO_COMPLETE_DELAY_MS);
      } else {
        uploadCanhotoProgress.value = progress;
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

/** Estado desembrulhado (use `reactive(useCanhotoUpload(...))` para repassar aos componentes filhos). */
export type CanhotoUploadState = UnwrapNestedRefs<ReturnType<typeof useCanhotoUpload>>;
