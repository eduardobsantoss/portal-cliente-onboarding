import { ref } from 'vue';
import { INITIAL_PHONE_VERIFIED_AT } from '@/constants/documentChecklist';

/**
 * Estado das validações por SMS (tópico 1) e biometria facial (tópico 2).
 * Ambas são feitas no início da jornada (depois do login), então chegam aqui já concluídas.
 */
export function useIdentityVerification() {
  const phoneVerified = ref(true);
  const phoneVerifiedAt = ref(INITIAL_PHONE_VERIFIED_AT);

  const facialVerified = ref(true);

  const handlePhoneVerified = () => {
    phoneVerified.value = true;
    const now = new Date();
    phoneVerifiedAt.value = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const handleFacialVerified = () => {
    facialVerified.value = true;
  };

  /** Simulação "preencher todos": marca SMS e biometria como concluídos (sem alterar a data do SMS). */
  const markAllVerified = () => {
    phoneVerified.value = true;
    facialVerified.value = true;
  };

  const resetIdentity = () => {
    phoneVerified.value = true;
    phoneVerifiedAt.value = INITIAL_PHONE_VERIFIED_AT;
    facialVerified.value = true;
  };

  return {
    phoneVerified,
    phoneVerifiedAt,
    facialVerified,
    handlePhoneVerified,
    handleFacialVerified,
    markAllVerified,
    resetIdentity,
  };
}
