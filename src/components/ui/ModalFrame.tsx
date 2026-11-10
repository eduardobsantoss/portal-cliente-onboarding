import React from 'react';
import { motion } from 'motion/react';

interface ModalFrameProps {
  overlayClassName: string;
  panelClassName: string;
  children: React.ReactNode;
}

/**
 * Overlay + painel animado (fade/scale/slide) dos modais centralizados do portal.
 * A montagem condicional e o `AnimatePresence` ficam com quem usa.
 */
export const ModalFrame = ({ overlayClassName, panelClassName, children }: ModalFrameProps) => (
  <div className={overlayClassName}>
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className={panelClassName}
    >
      {children}
    </motion.div>
  </div>
);
