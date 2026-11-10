import { motion, AnimatePresence } from 'motion/react';

/** Fundo escurecido que fecha a sidebar no mobile. */
interface SidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarOverlay = ({ isOpen, onClose }: SidebarOverlayProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
      />
    )}
  </AnimatePresence>
);
