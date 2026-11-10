import { Banknote, Building2, Hourglass } from 'lucide-react';
import { OPERATION_NOMINAL_VALUE, OPERATION_VEHICLE } from '@/mocks/operationDetails';
import type { InfoItem } from '@/types/dashboard';
import type { OperationKpi, PortalOperation } from '@/types/portalOperation';

export function buildOperationKpis(operation: PortalOperation): OperationKpi[] {
  return [
    { label: 'Valor Nominal', value: OPERATION_NOMINAL_VALUE, icon: Banknote, color: 'text-gci' },
    { label: 'Veículo', value: OPERATION_VEHICLE, icon: Building2, color: 'text-agro-orange' },
    { label: 'Status', value: operation.status, icon: Hourglass, color: 'text-orange-500' },
  ];
}

export function buildOperationInfo(operation: PortalOperation): InfoItem[] {
  return [
    { label: 'Tipo de Operação', value: operation.type },
    { label: 'Documento / CNPJ', value: '00.000.000/0001-00' },
    { label: 'Instituição Bancária', value: 'Banco do Brasil (001)' },
    { label: 'Agência / Conta', value: '1234-5 / 98765-4' },
    { label: 'Tipo de Taxa', value: 'Pré-fixada (12.5% a.a.)' },
    { label: 'Frequência de Pagamento', value: 'Mensal' },
    { label: 'Data de Emissão', value: operation.date },
    { label: 'Vencimento Final', value: '09/04/2027' },
  ];
}
