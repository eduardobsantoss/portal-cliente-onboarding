import { useState } from 'react';
import { INITIAL_PHONE_VERIFIED_AT } from '@/constants/documentChecklist';

/** Estado das validações por SMS (tópico 1) e biometria facial (tópico 2). */
export function useIdentityVerification() {
  // Phone verification state - starts as Concluído per Item 2
  const [phoneVerified, setPhoneVerified] = useState(true);
  const [phoneVerifiedAt, setPhoneVerifiedAt] = useState(INITIAL_PHONE_VERIFIED_AT);

  // Facial verification state
  const [facialVerified, setFacialVerified] = useState(false);

  const handlePhoneVerified = () => {
    setPhoneVerified(true);
    const now = new Date();
    setPhoneVerifiedAt(
      `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
    );
  };

  const handleFacialVerified = () => setFacialVerified(true);

  /** Simulação "preencher todos": marca SMS e biometria como concluídos (sem alterar a data do SMS). */
  const markAllVerified = () => {
    setPhoneVerified(true);
    setFacialVerified(true);
  };

  const resetIdentity = () => {
    setPhoneVerified(true);
    setPhoneVerifiedAt(INITIAL_PHONE_VERIFIED_AT);
    setFacialVerified(false);
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
