export interface CarteiraColumn {
  label: string;
  center?: boolean;
}

/** Colunas do cabeçalho da tabela da carteira (a coluna de seleção é renderizada à parte). */
export const CARTEIRA_TABLE_COLUMNS: CarteiraColumn[] = [
  { label: 'Situação do TÍTULO', center: true },
  { label: 'Título' },
  { label: 'Lastro' },
  { label: 'Número' },
  { label: 'Cessão' },
  { label: 'Status', center: true },
  { label: 'Criação' },
  { label: 'Valor nominal' },
  { label: 'Valor aquisição' },
  { label: 'Valor presente' },
  { label: 'Vencimento' },
  { label: 'Sacado' },
];
