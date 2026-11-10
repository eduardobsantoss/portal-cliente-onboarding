import { useState } from 'react';
import { FACIAL_VERIFICATION_BASE_URL } from '@/constants/facial';

interface UseFacialVerificationParams {
  onVerified: () => void;
}

export function useFacialVerification({ onVerified }: UseFacialVerificationParams) {
  const [copied, setCopied] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [sessionCode] = useState(() => `gci-bio-${Math.floor(100000 + Math.random() * 900000)}`);

  const verificationUrl = `${FACIAL_VERIFICATION_BASE_URL}${sessionCode}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendSms = () => {
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 4000);
  };

  const handleSimulateScan = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      onVerified();
    }, 1200);
  };

  return { copied, smsSent, isSimulating, handleCopyLink, handleSendSms, handleSimulateScan };
}
