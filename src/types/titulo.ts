import type { LucideIcon } from 'lucide-react';

export type TituloDetailsTab = 'DETALHES_TITULO' | 'ANEXOS' | 'VALIDACOES' | 'MOVIMENTACOES' | 'SACADO';

export interface Titulo {
  id: number;
  titulo: string;
  lastro: string;
  numero: string;
  cessao: string;
  status: string;
  statusColor: string;
  criacao: string;
  valorNominal: string;
  valorAquisicao: string;
  valorPresente: string;
  vencimento: string;
  sacado: string;
  actionStatus: string;
  canhotoEnviado?: boolean;
  linkEnviado?: boolean;
}

export interface TituloDetails extends Titulo {
  currentTab?: TituloDetailsTab;
}

export interface SacadoContact {
  id: string;
  email: string;
  phone: string;
  isPrincipal: boolean;
}

export interface CanhotoFile {
  name: string;
  size: string;
}

export interface ConfirmacaoData {
  date: string;
  time: string;
  evidence: File | null;
  observacoes: string;
}

export interface TituloMovement {
  side: 'left' | 'right';
  user: string;
  date: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  textColor: string;
}

export interface ShareChannel {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}
