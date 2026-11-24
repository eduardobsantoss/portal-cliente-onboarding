import type { FieldVariant } from '@/types/forms';

/*
 * Estilos compartilhados dos campos do onboarding e do portal.
 *
 * As classes legadas continuam valendo fora do theme-client. Dentro de uma tela com `.theme-client`,
 * as classes `tc:` (acrescentadas ao final de cada string) vencem as legadas e aplicam o visual do tema.
 * Importante: as classes `tc:` de um mesmo grupo (geometria x cor) não se repetem para a mesma propriedade,
 * porque entre duas classes `tc:` quem vence é a ordem do CSS gerado, não a ordem escrita aqui.
 */

// Geometria da caixa do campo (TcTextField): sem cor, para poder combinar com cada estado.
const TC_INPUT_BOX =
  'tc:h-[var(--control-input)] tc:rounded-[var(--radius-input)] tc:border tc:px-[var(--space-5)] tc:py-0 tc:text-[length:var(--text-base)] tc:font-[number:var(--weight-regular)] tc:shadow-none tc:transition-colors tc:placeholder:text-[color:var(--text-muted)] tc:focus:ring-0 tc:focus:shadow-[var(--focus-ring)]';

// Campo editável em repouso: borda padrão, foco com borda forte.
const TC_INPUT_COLORS =
  'tc:border-[color:var(--border-default)] tc:bg-[var(--surface-card)] tc:text-[color:var(--text-strong)] tc:focus:border-[color:var(--border-strong)]';

// Campo travado (preenchido pela consulta de documento): fundo suave, borda sutil e texto em 600.
const TC_READ_ONLY_INPUT =
  'tc:h-[var(--control-input)] tc:rounded-[var(--radius-input)] tc:border tc:border-[color:var(--border-subtle)] tc:bg-[var(--surface-soft)] tc:px-[var(--space-5)] tc:py-0 tc:text-[length:var(--text-base)] tc:font-[number:var(--weight-semibold)] tc:text-[color:var(--text-strong)] tc:shadow-none tc:focus:ring-0';

const TC_INPUT = `${TC_INPUT_BOX} ${TC_INPUT_COLORS}`;

export const FIELD_LABEL_CLASS =
  'block text-[11px] font-bold text-slate-700 mb-1 tc:mb-0 tc:text-[length:var(--text-sm)] tc:font-[number:var(--weight-semibold)] tc:text-[color:var(--text-strong)]';

export const CHECKBOX_INPUT_CLASS =
  'w-4 h-4 rounded text-gci focus:ring-gci border-slate-300 tc:size-[var(--space-5)] tc:shrink-0 tc:cursor-pointer tc:accent-[var(--gci-base)]';

interface FieldVariantStyles {
  /** classes do <input>/<select> padrão */
  input: string;
  /** classes dos campos travados (preenchidos pela consulta de documento) */
  readOnlyInput: string;
  /** classes dos campos "preenchidos" (cônjuge/regime de bens) */
  filledInput: string;
  /** grid do bloco de endereço */
  addressGrid: string;
}

// Grade do endereço: no tema o texto não é reduzido e o espaçamento é 20px / 16px.
const TC_ADDRESS_GRID =
  'tc:gap-x-[var(--space-4)] tc:gap-y-[var(--space-5)] tc:text-[length:var(--text-base)]';

export const FIELD_VARIANT_STYLES: Record<FieldVariant, FieldVariantStyles> = {
  page: {
    input: `w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci ${TC_INPUT}`,
    readOnlyInput: `w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold cursor-default focus:outline-none ${TC_READ_ONLY_INPUT}`,
    filledInput: `w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci ${TC_INPUT}`,
    addressGrid: `grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs ${TC_ADDRESS_GRID}`,
  },
  modal: {
    input: `w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci ${TC_INPUT}`,
    readOnlyInput: `w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold cursor-default focus:outline-none ${TC_READ_ONLY_INPUT}`,
    filledInput: `w-full px-3 py-2 rounded-xl border border-slate-200 bg-white ${TC_INPUT}`,
    addressGrid: `grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs ${TC_ADDRESS_GRID}`,
  },
};

export function getRendaInputClass(variant: FieldVariant, hasNotice: boolean): string {
  if (variant === 'modal') {
    return `w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gci/20 focus:border-gci ${TC_INPUT}`;
  }
  // Com aviso, a borda vira `--warning-base` e o fundo fica branco (sem o tom âmbar legado).
  const tcNotice = hasNotice
    ? 'tc:border-[color:var(--warning-base)] tc:bg-[var(--surface-card)] tc:text-[color:var(--text-strong)]'
    : TC_INPUT_COLORS;
  return `w-full px-3.5 py-2.5 rounded-xl border font-medium focus:outline-none focus:ring-2 focus:ring-gci/20 ${
    hasNotice ? 'border-amber-400 bg-amber-50/40 text-slate-900' : 'border-slate-200 bg-white'
  } ${TC_INPUT_BOX} ${tcNotice}`;
}
