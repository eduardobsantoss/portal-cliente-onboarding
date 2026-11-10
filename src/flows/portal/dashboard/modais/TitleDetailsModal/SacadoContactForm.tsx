import { motion } from 'motion/react';

interface SacadoContactFormProps {
  email: string;
  phone: string;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export const SacadoContactForm = ({
  email,
  phone,
  onEmailChange,
  onPhoneChange,
  onCancel,
  onSave,
}: SacadoContactFormProps) => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-orange-50/50 border border-orange-100 p-8 rounded-3xl space-y-6 mb-8"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail do Contato</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="ex: financeiro@email.com"
          className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-gci focus:outline-none focus:border-agro-orange transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
        <input 
          type="text" 
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="(00) 00000-0000"
          className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-gci focus:outline-none focus:border-agro-orange transition-all"
        />
      </div>
    </div>
    <div className="flex items-center justify-end gap-3">
      <button 
        onClick={onCancel}
        className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
      >
        Cancelar
      </button>
      <button 
        onClick={onSave}
        className="bg-agro-orange text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-agro-orange/20 hover:bg-agro-orange/90 transition-all"
      >
        Salvar Contato
      </button>
    </div>
  </motion.div>
);
