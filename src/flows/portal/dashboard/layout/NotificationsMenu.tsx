import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Bell, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { PORTAL_NOTIFICATIONS } from '@/mocks/portalNotifications';
import type { PendingTask } from '@/types/notification';

interface NotificationsMenuProps {
  onSelectPending: (task: PendingTask) => void;
}

/** Sino de notificações com o balão de pendências e a lista de avisos. */
export const NotificationsMenu = ({ onSelectPending }: NotificationsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // Nunca é ativado no original (o balão "Você possui pendências!" fica oculto).
  const [showLoginToast] = useState(false);

  return (
  <div className="relative">
    <button 
      onClick={() => setIsOpen(!isOpen)}
      className="p-2.5 bg-slate-50 text-slate-400 hover:text-gci hover:bg-slate-100 rounded-xl transition-all relative"
    >
      <Bell size={20} />
      <span className="absolute top-2 right-2 w-2 h-2 bg-agro-orange rounded-full border-2 border-white"></span>
    </button>

    <AnimatePresence>
      {showLoginToast && (
        <motion.div
          initial={{ opacity: 0, y: -10, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -10, x: '-50%' }}
          className="absolute top-full left-1/2 mt-4 w-64 bg-gci text-white p-4 rounded-2xl shadow-2xl z-50 text-center"
        >
          <p className="text-xs font-bold">Você possui pendências!</p>
          <p className="text-[10px] text-white/70 mt-1">Clique no sino para visualizar.</p>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gci rotate-45"></div>
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-80 md:w-96 bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden z-50"
          >
            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-sm font-black text-gci uppercase tracking-widest">Notificações</h3>
              <span className="bg-agro-orange text-white text-[10px] font-black px-2 py-0.5 rounded-full">4 NOVAS</span>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {['Pendências', 'Notificações'].map((cat) => (
                <div key={cat} className="py-2">
                  <div className="px-6 py-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat}</p>
                  </div>
                  {PORTAL_NOTIFICATIONS.filter(n => n.category === cat).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                              if (n.category === 'Pendências') onSelectPending(n);
                              setIsOpen(false);
                            }}
                      className="w-full px-6 py-4 flex gap-4 hover:bg-slate-50 transition-colors text-left group"
                    >
                      <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                        n.category === 'Pendências' ? 'bg-orange-50 text-agro-orange' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {n.category === 'Pendências' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-xs font-bold text-gci group-hover:text-agro-orange transition-colors">{n.title}</p>
                          <span className="text-[10px] text-slate-400 font-medium">{n.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{n.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-slate-50 text-[10px] font-black text-gci uppercase tracking-widest hover:bg-slate-100 transition-colors border-t border-slate-100">
              Marcar todas como lidas
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </div>
  );
};
