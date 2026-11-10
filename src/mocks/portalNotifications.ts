import type {
  InfoNotification,
  PendingNotification,
  PortalNotification,
} from '@/types/notification';

const SIGNATURE_PENDING_NOTIFICATION: PendingNotification = {
  id: 1,
  category: 'Pendências',
  title: 'Assinatura Pendente',
  description: 'Operação #8824 aguardando assinatura digital.',
  date: 'Há 10 min',
  details: { total: 10, approved: 8, opId: '8824' },
};

const REGISTRATION_TERM_NOTIFICATION: PendingNotification = {
  id: 2,
  category: 'Pendências',
  title: 'Termo de Registro',
  description: 'Novo termo disponível para aceite.',
  date: 'Há 1 hora',
  details: { total: 5, approved: 5, opId: '9012' },
};

const OPERATION_IN_PROGRESS_NOTIFICATION: InfoNotification = {
  id: 3,
  category: 'Notificações',
  title: 'Operação em Andamento',
  description: 'A operação #8750 saiu de análise para andamento.',
  date: 'Há 2 horas',
};

const LIMIT_UPDATED_NOTIFICATION: InfoNotification = {
  id: 4,
  category: 'Notificações',
  title: 'Limite Atualizado',
  description: 'Seu limite disponível foi aumentado em R$ 50k.',
  date: 'Ontem',
};

export const PORTAL_NOTIFICATIONS: PortalNotification[] = [
  SIGNATURE_PENDING_NOTIFICATION,
  REGISTRATION_TERM_NOTIFICATION,
  OPERATION_IN_PROGRESS_NOTIFICATION,
  LIMIT_UPDATED_NOTIFICATION,
];

/** Primeira pendência (`notifications[0]` original), usada por "Resolver Pendência" nos detalhes da operação. */
export const FIRST_PENDING_NOTIFICATION: PendingNotification = SIGNATURE_PENDING_NOTIFICATION;
