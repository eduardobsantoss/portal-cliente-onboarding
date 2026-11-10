import { AnimatePresence } from 'motion/react';
import { ModalActionFooter } from '@/components/ui/ModalActionFooter';
import { ModalFrame } from '@/components/ui/ModalFrame';
import { ModalTitleBar } from '@/components/ui/ModalTitleBar';
import { FILTER_STATUS_OPTIONS, FILTER_TITLE_TYPE_OPTIONS } from '@/constants/carteiraFilters';
import { FilterField } from './FilterField';
import { FilterInput } from './FilterInput';
import { FilterSelect } from './FilterSelect';

interface CarteiraFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CarteiraFilterModal = ({ isOpen, onClose }: CarteiraFilterModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <ModalFrame
        overlayClassName="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/60 backdrop-blur-md"
        panelClassName="bg-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <ModalTitleBar
          title="Filtros da Carteira"
          subtitle="Refine a busca por títulos em sua carteira"
          onClose={onClose}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FilterField label="Tipo de Título">
                <FilterSelect options={FILTER_TITLE_TYPE_OPTIONS} />
              </FilterField>
              <FilterField label="Número">
                <FilterInput type="text" placeholder="Ex: NF-1234" />
              </FilterField>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FilterField label="Vencimento Inicial">
                <FilterInput type="date" />
              </FilterField>
              <FilterField label="Vencimento Final">
                <FilterInput type="date" />
              </FilterField>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FilterField label="Criação Inicial">
                <FilterInput type="date" />
              </FilterField>
              <FilterField label="Criação Final">
                <FilterInput type="date" />
              </FilterField>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FilterField label="Status">
                <FilterSelect options={FILTER_STATUS_OPTIONS} />
              </FilterField>
              <FilterField label="Sacado">
                <FilterInput type="text" placeholder="Nome do sacado..." />
              </FilterField>
            </div>

            <FilterField label="Lastro">
              <FilterInput type="text" placeholder="Número do lastro..." />
            </FilterField>
          </div>
        </div>

        <ModalActionFooter
          className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4 text-center"
          cancelLabel="Limpar Filtros"
          onCancel={onClose}
          confirmLabel="Aplicar Filtros"
          onConfirm={onClose}
          confirmClassName="flex-3 bg-gci hover:bg-gci-hover text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-gci/20 active:scale-[0.98]"
        />
      </ModalFrame>
    )}
  </AnimatePresence>
);
