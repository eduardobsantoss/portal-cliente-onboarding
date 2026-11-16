import { toValue, type MaybeRefOrGetter } from 'vue';
import { buildRequiredDocuments } from '@/utils/requiredDocuments';
import type { RequiredDocumentsInput } from '@/utils/requiredDocuments';
import type { DocumentUploadItem } from '@/types/documentUpload';

/**
 * Cálculo dos documentos obrigatórios por tipo de conta/societário e condicionais
 * (Estatuto, Procurador, estado civil). Devolve a função que monta a lista atual.
 */
export function useRequiredDocuments(
  input: MaybeRefOrGetter<RequiredDocumentsInput>
): () => DocumentUploadItem[] {
  return () => buildRequiredDocuments(toValue(input));
}
