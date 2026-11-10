import { AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';
import { ModalActionFooter } from '@/components/ui/ModalActionFooter';
import { ModalFrame } from '@/components/ui/ModalFrame';
import { ModalTitleBar } from '@/components/ui/ModalTitleBar';
import { LINKABLE_ASSETS } from '@/mocks/linkableAssets';

interface LinkAssetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinkAssetsModal = ({ isOpen, onClose }: LinkAssetsModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <ModalFrame
        overlayClassName="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
        panelClassName="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <ModalTitleBar
          title="Vincular Ativos"
          subtitle="Selecione títulos para vincular a esta operação"
          onClose={onClose}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="space-y-6">
            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                <Info size={20} />
              </div>
              <p className="text-sm text-blue-700 font-medium leading-relaxed">
                A listagem abaixo inclui títulos que estão em análise ou foram recusados anteriormente, permitindo nova tentativa de vinculação.
              </p>
            </div>

            <div className="border border-slate-100 rounded-3xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 w-12">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-gci focus:ring-gci" />
                    </th>
                    <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / Número</th>
                    <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</th>
                    <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sacado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {LINKABLE_ASSETS.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-gci focus:ring-gci" />
                      </td>
                      <td className="px-4 py-4 font-bold text-gci text-sm">{row.id} <span className="text-slate-400">/ {row.numero}</span></td>
                      <td className="px-4 py-4 font-black text-gci text-sm">{row.valor}</td>
                      <td className="px-4 py-4">
                        <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${row.color}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500 truncate max-w-[200px]">{row.sacado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <ModalActionFooter
          cancelLabel="Cancelar"
          onCancel={onClose}
          confirmLabel="Vincular 3 títulos selecionados"
          onConfirm={onClose}
          confirmClassName="flex-3 bg-gci hover:bg-gci-hover text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-gci/20"
        />
      </ModalFrame>
    )}
  </AnimatePresence>
);
