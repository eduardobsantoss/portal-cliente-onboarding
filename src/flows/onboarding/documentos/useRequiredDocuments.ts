import { buildRequiredDocuments } from '@/utils/requiredDocuments';
import type { RequiredDocumentsInput } from '@/utils/requiredDocuments';
import type { DocumentUploadItem } from '@/types/documentUpload';

/**
 * Cálculo dos documentos obrigatórios por tipo de conta/societário e condicionais
 * (Estatuto, Procurador, estado civil). Devolve a função que monta a lista atual.
 */
export function useRequiredDocuments(input: RequiredDocumentsInput): () => DocumentUploadItem[] {
  return () => buildRequiredDocuments(input);
}
