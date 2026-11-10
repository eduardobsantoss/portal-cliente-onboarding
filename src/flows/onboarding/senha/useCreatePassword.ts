import React, { useState } from 'react';
import { PASSWORD_FALLBACK_VALUE } from '@/constants/password';

interface UseCreatePasswordParams {
  onClose: (createdPassword?: string) => void;
}

export function useCreatePassword({ onClose }: UseCreatePasswordParams) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onClose(password || PASSWORD_FALLBACK_VALUE);
    }, 900);
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isSuccess,
    handleSubmit,
  };
}

export type CreatePasswordState = ReturnType<typeof useCreatePassword>;
