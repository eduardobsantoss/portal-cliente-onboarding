import { ref } from 'vue';
import { FACIAL_VERIFICATION_BASE_URL } from '@/constants/facial';

interface UseFacialVerificationParams {
  onVerified: () => void;
}

export function useFacialVerification({ onVerified }: UseFacialVerificationParams) {
  const copied = ref(false);
  const smsSent = ref(false);
  const isSimulating = ref(false);
  const sessionCode = `gci-bio-${Math.floor(100000 + Math.random() * 900000)}`;

  const verificationUrl = `${FACIAL_VERIFICATION_BASE_URL}${sessionCode}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(verificationUrl);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 3000);
  };

  const handleSendSms = () => {
    smsSent.value = true;
    setTimeout(() => {
      smsSent.value = false;
    }, 4000);
  };

  const handleSimulateScan = () => {
    isSimulating.value = true;
    setTimeout(() => {
      isSimulating.value = false;
      onVerified();
    }, 1200);
  };

  return { copied, smsSent, isSimulating, handleCopyLink, handleSendSms, handleSimulateScan };
}
