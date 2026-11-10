import React from 'react';
import { Login } from '@/flows/onboarding/login/Login';
import { CreatePasswordModal } from './CreatePasswordModal';

interface CreatePasswordScreenProps {
  onClose: () => void;
}

export const CreatePasswordScreen: React.FC<CreatePasswordScreenProps> = ({ onClose }) => {
  return (
    <>
      <Login onLogin={() => undefined} />
      <CreatePasswordModal isOpen={true} onClose={onClose} />
    </>
  );
};
