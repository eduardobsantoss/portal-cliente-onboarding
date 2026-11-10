import React, { useState } from 'react';
import { MOCK_USER_EMAIL } from '@/mocks/onboardingUser';

interface UseLoginFormParams {
  onLogin: () => void;
}

export function useLoginForm({ onLogin }: UseLoginFormParams) {
  const [email, setEmail] = useState(MOCK_USER_EMAIL);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatePasswordOpen, setIsCreatePasswordOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleCreatePasswordClose = (createdPassword?: string) => {
    if (createdPassword) {
      setPassword(createdPassword);
    }
    setIsCreatePasswordOpen(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isCreatePasswordOpen,
    handleSubmit,
    handleCreatePasswordClose,
  };
}
