import { ref } from 'vue';
import { PASSWORD_FALLBACK_VALUE } from '@/constants/password';

interface UseCreatePasswordParams {
  onClose: (createdPassword?: string) => void;
}

export function useCreatePassword({ onClose }: UseCreatePasswordParams) {
  const password = ref('');
  const confirmPassword = ref('');
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);
  const isSuccess = ref(false);

  const setPassword = (value: string) => {
    password.value = value;
  };
  const setConfirmPassword = (value: string) => {
    confirmPassword.value = value;
  };
  const setShowPassword = (value: boolean) => {
    showPassword.value = value;
  };
  const setShowConfirmPassword = (value: boolean) => {
    showConfirmPassword.value = value;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    isSuccess.value = true;
    setTimeout(() => {
      onClose(password.value || PASSWORD_FALLBACK_VALUE);
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
