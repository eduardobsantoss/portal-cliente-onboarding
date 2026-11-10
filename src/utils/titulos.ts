import type { Titulo } from '@/types/titulo';

/** Títulos com "Pendência" primeiro; demais mantêm a ordem (como no sort original). */
export function comparePendingFirst(a: Titulo, b: Titulo): number {
  if (a.actionStatus === 'Pendência' && b.actionStatus !== 'Pendência') return -1;
  if (a.actionStatus !== 'Pendência' && b.actionStatus === 'Pendência') return 1;
  return 0;
}

export const isPendingTitulo = (titulo: Titulo) => titulo.actionStatus === 'Pendência';

/** Títulos que aparecem na tela "Resolução de Pendências". */
export const isResolutionTitulo = (titulo: Titulo) =>
  titulo.actionStatus === 'Pendência' || Boolean(titulo.canhotoEnviado) || Boolean(titulo.linkEnviado);
