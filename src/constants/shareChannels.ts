import { Mail, MessageSquare } from 'lucide-react';
import type { ShareChannel } from '@/types/titulo';

export const SHARE_CHANNELS: ShareChannel[] = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'text-green-600 bg-green-50' },
  { id: 'email', label: 'E-mail', icon: Mail, color: 'text-blue-600 bg-blue-50' },
];

export const DEFAULT_SHARE_CHANNELS: string[] = ['whatsapp'];
