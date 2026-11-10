import type { Titulo } from '@/types/titulo';
import { CarteiraPagination } from './CarteiraPagination';
import { CarteiraSummary } from './CarteiraSummary';
import { CarteiraTitlesTable } from './CarteiraTitlesTable';
import { CarteiraToolbar } from './CarteiraToolbar';

interface CarteiraTabProps {
  titulosList: Titulo[];
  selectedTitulos: number[];
  onSelectTitulo: (id: number) => void;
  onSelectAllTitulos: (ids: number[]) => void;
  onOpenDetails: (titulo: Titulo) => void;
  onOpenResolve: () => void;
  onOpenFilter: () => void;
  onOpenConfirmacao: () => void;
}

export const CarteiraTab = ({
  titulosList,
  selectedTitulos,
  onSelectTitulo,
  onSelectAllTitulos,
  onOpenDetails,
  onOpenResolve,
  onOpenFilter,
  onOpenConfirmacao,
}: CarteiraTabProps) => (
  <div className="space-y-6">
    {/* Carteira Summary & Chart */}
    <CarteiraSummary />

    {/* Carteira Table */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <CarteiraToolbar
        selectedCount={selectedTitulos.length}
        onOpenConfirmacao={onOpenConfirmacao}
        onOpenFilter={onOpenFilter}
      />
      <CarteiraTitlesTable
        titulosList={titulosList}
        selectedTitulos={selectedTitulos}
        onSelect={onSelectTitulo}
        onSelectAll={onSelectAllTitulos}
        onOpenDetails={onOpenDetails}
        onOpenResolve={onOpenResolve}
      />

      {/* Pagination Footer */}
      <CarteiraPagination total={titulosList.length} />
    </div>
  </div>
);
