import { onlyDigits } from '@/utils/registrationMasks';

function allDigitsEqual(digits: string): boolean {
  return /^(\d)\1+$/.test(digits);
}

/** Valida CPF pelos dígitos verificadores (aceita com ou sem máscara). */
export function isValidCpf(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 11 || allDigitsEqual(digits)) return false;

  const calcDigit = (length: number): number => {
    let sum = 0;
    for (let i = 0; i < length; i += 1) {
      sum += Number(digits[i]) * (length + 1 - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return calcDigit(9) === Number(digits[9]) && calcDigit(10) === Number(digits[10]);
}

/** Valida CNPJ pelos dígitos verificadores (aceita com ou sem máscara). */
export function isValidCnpj(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 14 || allDigitsEqual(digits)) return false;

  const calcDigit = (length: number): number => {
    let weight = length - 7;
    let sum = 0;
    for (let i = 0; i < length; i += 1) {
      sum += Number(digits[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  return calcDigit(12) === Number(digits[12]) && calcDigit(13) === Number(digits[13]);
}
