import React from 'react';
import { useFacialVerification } from './useFacialVerification';
import { FacialVerifiedCard } from './FacialVerifiedCard';
import { FacialQrCode } from './FacialQrCode';
import { FacialInstructions } from './FacialInstructions';
import { FacialLinkActions } from './FacialLinkActions';
import { FacialSimulationBar } from './FacialSimulationBar';

interface FacialVerificationProps {
  isVerified: boolean;
  onVerified: () => void;
}

export const FacialVerification: React.FC<FacialVerificationProps> = ({
  isVerified,
  onVerified
}) => {
  const { copied, smsSent, isSimulating, handleCopyLink, handleSendSms, handleSimulateScan } =
    useFacialVerification({ onVerified });

  if (isVerified) {
    return <FacialVerifiedCard />;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row items-stretch gap-6">
        {/* Left: Interactive QR Code Box */}
        <FacialQrCode />

        {/* Right: Instructions & Actions */}
        <div className="flex-1 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <FacialInstructions />

            <FacialLinkActions
              copied={copied}
              smsSent={smsSent}
              onCopyLink={handleCopyLink}
              onSendSms={handleSendSms}
            />
          </div>

          {/* Quick Simulation Button */}
          <FacialSimulationBar isSimulating={isSimulating} onSimulateScan={handleSimulateScan} />
        </div>
      </div>
    </div>
  );
};
