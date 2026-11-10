import { motion } from 'motion/react';

export const SignaturesWaiting = () => {
  return (
    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mt-4 text-center">
      <p className="text-xs text-slate-400 font-medium">Aguardando as assinaturas dos representantes legais para prosseguir.</p>
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {[0, 1, 2].map(i => (
          <motion.div 
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }} 
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-slate-300"
          />
        ))}
      </div>
    </div>
  );
};
