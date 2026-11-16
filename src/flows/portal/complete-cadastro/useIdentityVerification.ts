import { ref } from 'vue';
import { INITIAL_PHONE_VERIFIED_AT } from '@/constants/documentChecklist';

/** Estado das validações por SMS (tópico 1) e biometria facial (tópico 2). */
export function useIdentityVerification() {
  // Phone verification state - starts as Concluído per Item 2
  const phoneVerified = ref(true);
  const phoneVerifiedAt = ref(INITIAL_PHONE_VERIFIED_AT);

  // Facial verification state
  const facialVerified = ref(false);

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
    facialVerified.value = false;
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
