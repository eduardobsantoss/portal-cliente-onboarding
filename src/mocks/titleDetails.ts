import { ArrowUpRight, FileCheck, Link, X } from 'lucide-react';
import type { DocumentFile } from '@/types/dashboard';
import type { TituloMovement } from '@/types/titulo';

export const TITLE_ATTACHMENTS: DocumentFile[] = [
  { name: 'GARANTIA_001.pdf', size: '3.1 MB', date: '10/01/2026', type: 'PDF', category: 'GARANTIA' },
  { name: 'BOLETO_PARCELA_1.pdf', size: '1.2 MB', date: '10/01/2026', type: 'PDF', category: 'BOLETO' },
];

export const TITLE_MOVEMENTS: TituloMovement[] = [
  { side: 'right', user: 'Marcos Sousa', date: '24/04/2026 às 10:35:04', desc: 'Vinculou o título à cessão SIAP_OP.1079_24042026', icon: Link, color: 'bg-gci', textColor: 'text-white' },
  { side: 'left', user: 'Sistema GCI', date: '24/04/2026 às 09:12:15', desc: 'Rejeitou o título automaticamente: Sacado sem contato válido', icon: X, color: 'bg-red-500', textColor: 'text-white' },
  { side: 'right', user: 'Sistema Automático', date: '10/01/2026 às 14:00:00', desc: 'Protocolo de recebimento XML gerado com sucesso', icon: FileCheck, color: 'bg-green-500', textColor: 'text-white' },
  { side: 'left', user: 'Usuário Portal', date: '10/01/2026 às 13:58:22', desc: 'Importação do título via integração webservice', icon: ArrowUpRight, color: 'bg-blue-500', textColor: 'text-white' },
];

export const TITLE_CEDENTE_NAME = 'SIAP COMERCIO DE PRODUTOS AGROPECUARIOS LTDA';
export const TITLE_CEDENTE_DOCUMENT = '07.561.436/0008-75';
export const TITLE_CESSION_CODE = 'SIAP_OP.1079_24042026';
export const TITLE_PAYMENT_STATUS = 'VINCENDO';
export const TITLE_CESSION_RATE = '2,03%';
export const TITLE_NOT_EXTENDED_LABEL = 'Não foi prorrogado';
export const TITLE_SACADO_DOCUMENT = '12.345.678/0001-90';
export const TITLE_VALIDATION_ERROR_CODE = 'ERR_SAC_CONTACT_INVALID';
