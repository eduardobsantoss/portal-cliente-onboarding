import { ref } from 'vue';
import { MOCK_USER_EMAIL } from '@/mocks/onboardingUser';

interface UseLoginFormParams {
  onLogin: () => void;
}

export function useLoginForm({ onLogin }: UseLoginFormParams) {
  const email = ref(MOCK_USER_EMAIL);
  const password = ref('');
  const showPassword = ref(false);
  const isCreatePasswordOpen = ref(false);

  const setEmail = (value: string) => {
    email.value = value;
  };
  const setPassword = (value: string) => {
    password.value = value;
  };
  const setShowPassword = (value: boolean) => {
    showPassword.value = value;
  };
  const setIsCreatePasswordOpen = (value: boolean) => {
    isCreatePasswordOpen.value = value;
  };

  const handleSubmit = (e: Event) => {
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
