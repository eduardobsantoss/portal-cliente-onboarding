import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound } from 'lucide-react';
import { useCreatePassword } from './useCreatePassword';
import { CreatePasswordForm } from './CreatePasswordForm';
import { CreatePasswordSuccess } from './CreatePasswordSuccess';

interface CreatePasswordModalProps {
  isOpen: boolean;
  onClose: (createdPassword?: string) => void;
}

export const CreatePasswordModal: React.FC<CreatePasswordModalProps> = ({ isOpen, onClose }) => {
  const form = useCreatePassword({ onClose });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/20 backdrop-blur-[2px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-md w-full overflow-hidden relative"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-[#083C4A] to-[#0d5366] p-6 sm:p-7 text-white relative">
            <div className="mb-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-agro-orange shadow-inner">
                <KeyRound size={24} />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Criar Senha de Acesso
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
              Defina sua senha de segurança para habilitar o acesso ao Portal do Cliente GCI.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-7 space-y-5">
            {form.isSuccess ? (
              <CreatePasswordSuccess />
            ) : (
              <CreatePasswordForm form={form} />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
