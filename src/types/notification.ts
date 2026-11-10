export interface PendingTaskDetails {
  total: number;
  approved: number;
  opId: string;
}

export interface PendingNotification {
  id: number;
  category: 'Pendências';
  title: string;
  description: string;
  date: string;
  details: PendingTaskDetails;
}

export interface InfoNotification {
  id: number;
  category: 'Notificações';
  title: string;
  description: string;
  date: string;
}

export type PortalNotification = PendingNotification | InfoNotification;

export type PendingTask = PendingNotification;
