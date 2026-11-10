import type { FieldVariant } from '@/types/forms';

export const FIELD_LABEL_CLASS = 'block text-[11px] font-bold text-slate-700 mb-1';

export const CHECKBOX_INPUT_CLASS = 'w-4 h-4 rounded text-gci focus:ring-gci border-slate-300';

interface FieldVariantStyles {
  /** classes do <input>/<select> padrão */
  input: string;
  /** classes dos campos "preenchidos" (cônjuge/regime de bens) */
  filledInput: string;
  /** grid do bloco de endereço */
  addressGrid: string;
}

export const FIELD_VARIANT_STYLES: Record<FieldVariant, FieldVariantStyles> = {
  page: {
    input:
      'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci',
    filledInput:
      'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci',
    addressGrid: 'grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs',
  },
  modal: {
    input:
      'w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci',
    filledInput: 'w-full px-3 py-2 rounded-xl border border-slate-200 bg-white',
    addressGrid: 'grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs',
  },
};

export function getRendaInputClass(variant: FieldVariant, hasNotice: boolean): string {
  if (variant === 'modal') {
    return 'w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci';
  }
  return `w-full px-3.5 py-2.5 rounded-xl border font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 ${
    hasNotice ? 'border-amber-400 bg-amber-50/40 text-slate-900' : 'border-slate-200 bg-white'
  }`;
}
