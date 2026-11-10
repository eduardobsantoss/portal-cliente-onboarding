import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, X } from 'lucide-react';

interface UploadErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export const UploadErrorBanner: React.FC<UploadErrorBannerProps> = ({ message, onDismiss }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-800 font-medium shadow-sm"
    >
      <div className="w-8 h-8 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
        <AlertCircle size={18} />
      </div>
      <div className="flex-1">{message}</div>
      <button
        type="button"
        onClick={onDismiss}
        className="p-1 text-red-500 hover:text-red-800 rounded-lg"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};
