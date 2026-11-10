import React from 'react';
import { SMS_DIGIT_INDEXES } from '@/constants/sms';

interface SmsOtpInputsProps {
  digits: string[];
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  onDigitChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

export const SmsOtpInputs: React.FC<SmsOtpInputsProps> = ({
  digits,
  inputRefs,
  onDigitChange,
  onKeyDown,
  onPaste,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3.5 py-2">
      {SMS_DIGIT_INDEXES.map((idx) => (
        <input
          key={idx}
          ref={(el) => (inputRefs.current[idx] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digits[idx]}
          onChange={(e) => onDigitChange(idx, e.target.value)}
          onKeyDown={(e) => onKeyDown(idx, e)}
          onPaste={onPaste}
          className={`w-12 sm:w-14 h-14 sm:h-16 text-center text-xl sm:text-2xl font-mono font-bold rounded-xl border-2 transition-all focus:outline-none ${
            digits[idx] 
              ? 'border-gci bg-emerald-50/30 text-gci' 
              : 'border-slate-200 bg-white text-slate-800 focus:border-gci focus:ring-4 focus:ring-gci/10'
          }`}
        />
      ))}
    </div>
  );
};
