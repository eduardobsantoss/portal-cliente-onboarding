import React, { useState } from 'react';
import { SupportFaqModal } from '@/components/support/SupportFaqModal';
import { SMS_DEFAULT_MASKED_PHONE, SMS_DEFAULT_VERIFIED_AT } from '@/constants/sms';
import { useSmsVerification } from './useSmsVerification';
import { SmsSimulatedToast } from './SmsSimulatedToast';
import { SmsVerifiedCard } from './SmsVerifiedCard';
import { SmsPhoneCard } from './SmsPhoneCard';
import { SmsOtpPanel } from './SmsOtpPanel';
import { SmsModalSuccess } from './SmsModalSuccess';

interface SmsVerificationProps {
  onVerified?: (phone: string) => void;
  isVerified?: boolean;
  maskedPhone?: string;
  verifiedAt?: string;
  isModalVariant?: boolean;
  onCloseModal?: () => void;
}

export const SmsVerification: React.FC<SmsVerificationProps> = ({
  onVerified,
  isVerified = false,
  maskedPhone = SMS_DEFAULT_MASKED_PHONE,
  verifiedAt = SMS_DEFAULT_VERIFIED_AT,
  isModalVariant = false,
  onCloseModal,
}) => {
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const sms = useSmsVerification({
    isVerified,
    verifiedAt,
    maskedPhone,
    isModalVariant,
    onVerified,
    onCloseModal,
  });

  return (
    <div className="w-full">
      {/* Toast Simulated SMS */}
      <SmsSimulatedToast
        show={sms.showSimulatedSmsToast}
        maskedPhone={maskedPhone}
        onFillCode={sms.fillSimulatedCode}
      />

      {/* STATE 1: VERIFIED / CONCLUÍDO (Used in Checklist or after verification) */}
      {sms.status === 'verified' && !isModalVariant ? (
        <SmsVerifiedCard
          maskedPhone={maskedPhone}
          verifiedAt={sms.currentVerifiedAt}
          onRedo={sms.handleRefazerValidacao}
        />
      ) : (
        /* STATE 2: INTERACTIVE SMS SEND & OTP DIGITS */
        <div className="space-y-4">
          {/* Header Card with Masked Phone */}
          <SmsPhoneCard
            maskedPhone={maskedPhone}
            status={sms.status}
            onSend={sms.handleSendSms}
            onOpenSupport={() => setIsSupportOpen(true)}
          />

          {/* OTP 6 Digits Container */}
          {(sms.status === 'sent' || sms.status === 'sending') && (
            <SmsOtpPanel
              maskedPhone={maskedPhone}
              digits={sms.digits}
              errorMsg={sms.errorMsg}
              cooldown={sms.cooldown}
              inputRefs={sms.inputRefs}
              onDigitChange={sms.handleDigitChange}
              onKeyDown={sms.handleKeyDown}
              onPaste={sms.handlePaste}
              onResend={sms.handleSendSms}
              onValidate={sms.validateCode}
            />
          )}

          {/* Success message when verified in modal variant */}
          {sms.status === 'verified' && isModalVariant && <SmsModalSuccess />}
        </div>
      )}

      {/* Support FAQ Modal */}
      <SupportFaqModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
};
