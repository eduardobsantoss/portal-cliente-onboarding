import React, { useRef, useState } from 'react';
import { SMS_CODE_LENGTH } from '@/constants/sms';

const createEmptyDigits = (): string[] => ['', '', '', '', '', ''];

interface UseSmsCodeParams {
  onClearError: () => void;
}

export function useSmsCode({ onClearError }: UseSmsCodeParams) {
  const [digits, setDigits] = useState<string[]>(createEmptyDigits());
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const resetDigits = () => setDigits(createEmptyDigits());

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  // Handle digit input with auto-advance
  const handleDigitChange = (index: number, value: string, onComplete: (code: string) => void) => {
    const cleanValue = value.replace(/\D/g, '');

    if (!cleanValue) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    const digit = cleanValue.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    onClearError();

    if (index < SMS_CODE_LENGTH - 1) {
      focusInput(index + 1);
    }

    const fullCode = newDigits.join('');
    if (fullCode.length === SMS_CODE_LENGTH) {
      onComplete(fullCode);
    }
  };

  // Handle key down (Backspace)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  // Handle paste full 6-digit code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, onComplete: (code: string) => void) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, SMS_CODE_LENGTH);
    if (pastedData.length > 0) {
      const newDigits = createEmptyDigits();
      for (let i = 0; i < SMS_CODE_LENGTH; i++) {
        newDigits[i] = pastedData[i] || '';
      }
      setDigits(newDigits);

      const lastIndex = Math.min(pastedData.length - 1, SMS_CODE_LENGTH - 1);
      focusInput(lastIndex);

      if (pastedData.length === SMS_CODE_LENGTH) {
        onComplete(pastedData);
      }
    }
  };

  return {
    digits,
    setDigits,
    inputRefs,
    resetDigits,
    focusInput,
    handleDigitChange,
    handleKeyDown,
    handlePaste,
  };
}
