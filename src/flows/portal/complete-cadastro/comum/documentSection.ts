import type { CompanyTier, DocumentItem, PreviewDoc } from '@/types/documentChecklist';
import type { SectionStats } from '@/utils/checklistProgress';

/**
 * Props comuns às seções de documentos oficiais da empresa (3, 4 e 5).
 * (Callbacks `onToggle`/`onUpload`/`onPreview` viraram emits `toggle`/`upload`/`preview` nos componentes Vue.)
 */
export interface DocumentSectionProps {
  docs: DocumentItem[];
  stats: SectionStats;
  companyTier: CompanyTier;
  isOpen: boolean;
}

/** Emits comuns às seções de documentos oficiais da empresa (3, 4 e 5). */
export interface DocumentSectionEmits {
  (e: 'toggle'): void;
  (e: 'upload', docId: string, file: File): void;
  (e: 'preview', doc: PreviewDoc): void;
}
