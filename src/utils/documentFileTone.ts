/** Cores do ícone do documento por tipo de arquivo. */
export function getDocumentTypeTone(type: string): string {
  return type === 'PDF' ? 'bg-red-50 text-red-500' : type === 'XML' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500';
}
