import type { RegistrationDocumentType } from '@/types/registration';

export const onlyDigits = (value: string) => value.replace(/\D/g, '');

export function maskCpf(value: string): string {
  return onlyDigits(value)
    .slice(0, 11)
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
}

export function maskCnpj(value: string): string {
  return onlyDigits(value)
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
}

export function maskDocument(value: string, type: RegistrationDocumentType): string {
  return type === 'CPF' ? maskCpf(value) : maskCnpj(value);
}

export function maskPhone(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  return digits.length <= 10
    ? digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    : digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

/** Oculta o miolo do telefone para exibição na etapa de SMS: (34) 9 ••••-1234. */
export function maskPhoneForDisplay(phone: string): string | null {
  const digits = onlyDigits(phone);
  if (digits.length < 10) return null;
  const ddd = digits.slice(0, 2);
  const last4 = digits.slice(-4);
  return digits.length === 11 ? `(${ddd}) ${digits[2]} ••••-${last4}` : `(${ddd}) ••••-${last4}`;
}
