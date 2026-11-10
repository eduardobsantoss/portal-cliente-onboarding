export const PORTAL_LOCKED_NOTICE = 'Conclua o preenchimento do seu cadastro para liberar o acesso ao portal.';

export const ANTICIPATION_LOCKED_NOTICE =
  'Documentação em análise. Novas solicitações de antecipação estarão disponíveis após liberação do limite.';

export const LOCKED_NAV_ITEM_TITLE = 'Disponível após completar o cadastro';

export const getServiceLockedNotice = (serviceName: string) =>
  `Solicitação de ${serviceName} estará disponível após aprovação cadastral e liberação do limite.`;
