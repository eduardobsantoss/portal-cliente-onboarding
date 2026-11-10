import type { CompanyTier, DocumentCategory, DocumentItem } from '@/types/documentChecklist';

export interface SectionStats {
  total: number;
  approved: number;
  inAnalysis: number;
  isDone: boolean;
}

/** Documentos exigidos para o segmento (Middle Corporate / Simples-PME) ativo. */
export function filterDocsByTier(docs: DocumentItem[], tier: CompanyTier): DocumentItem[] {
  return docs.filter((d) => d.requiredFor.includes(tier));
}

export function filterDocsByCategory(docs: DocumentItem[], category: DocumentCategory): DocumentItem[] {
  return docs.filter((d) => d.category === category);
}

/** Contadores de uma seção; documentos opcionais para o segmento não bloqueiam a conclusão. */
export function getSectionStats(items: DocumentItem[], tier: CompanyTier): SectionStats {
  const total = items.length;
  const approved = items.filter((i) => i.status === 'aprovado').length;
  const inAnalysis = items.filter((i) => i.status === 'em_analise').length;
  const requiredItems = items.filter((i) => !i.optionalFor?.includes(tier));
  const isDone =
    requiredItems.length > 0 &&
    requiredItems.every((i) => i.status === 'aprovado' || i.status === 'em_analise');
  return { total, approved, inAnalysis, isDone };
}
