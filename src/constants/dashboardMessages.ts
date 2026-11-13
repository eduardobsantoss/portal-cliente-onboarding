export const ANTICIPATION_LOCKED_NOTICE =
  'Documentação em análise. Novas solicitações de antecipação estarão disponíveis após liberação do limite.';

export const getServiceLockedNotice = (serviceName: string) =>
  `A solicitação de ${serviceName} fica disponível depois que a análise de crédito for concluída e o limite for liberado.`;
