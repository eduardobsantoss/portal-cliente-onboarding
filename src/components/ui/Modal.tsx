import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  overlayClassName?: string;
  panelClassName?: string;
}

const DEFAULT_OVERLAY_CLASS =
  'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto';
const DEFAULT_PANEL_CLASS =
  'bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto border border-slate-200';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  overlayClassName = DEFAULT_OVERLAY_CLASS,
  panelClassName = DEFAULT_PANEL_CLASS,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={overlayClassName}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={panelClassName}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
