export type TermsDocumentType = 'terms' | 'privacy';

export type LegalDocumentBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] };

export interface TermsDocument {
  modalFileName: string;
  pagesLabel: string;
  footerLabel: string;
  downloadFileName: string;
  downloadTitle: string;
  heading: string;
  subtitle: string;
  blocks: LegalDocumentBlock[];
}
