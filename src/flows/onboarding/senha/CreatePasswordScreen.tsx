import React from 'react';
import { CreatePasswordModal } from './CreatePasswordModal';

interface CreatePasswordScreenProps {
  onClose: () => void;
}

export const CreatePasswordScreen: React.FC<CreatePasswordScreenProps> = ({ onClose }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#083C4A_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
      <CreatePasswordModal
        isOpen={true}
        onClose={onClose}
      />
    </div>
  );
};
