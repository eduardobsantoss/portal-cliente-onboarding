import type { CnpjLookupErrorCode, ReceitaWsResponse } from '@/types/receitaws';
import { isValidCnpj } from '@/utils/documentValidation';
import { onlyDigits } from '@/utils/registrationMasks';

const RECEITAWS_CNPJ_URL = 'https://receitaws.com.br/v1/cnpj';
const REQUEST_TIMEOUT_MS = 15_000;

/** Mensagens exibidas ao usuário para cada tipo de falha da consulta. */
export const CNPJ_LOOKUP_MESSAGES: Record<CnpjLookupErrorCode, string> = {
  invalid: 'CNPJ inválido. Confira os números digitados.',
  not_found: 'CNPJ não encontrado na Receita Federal.',
  inactive: 'Este CNPJ não está ativo na Receita Federal, por isso não é possível prosseguir.',
  unavailable:
    'Não foi possível consultar a Receita Federal agora. Aguarde um minuto e tente novamente.',
};

export class CnpjLookupError extends Error {
  readonly code: CnpjLookupErrorCode;

  constructor(code: CnpjLookupErrorCode, message?: string) {
    super(message ?? CNPJ_LOOKUP_MESSAGES[code]);
    this.name = 'CnpjLookupError';
    this.code = code;
  }
}

// A ReceitaWS (plano gratuito) não envia cabeçalhos CORS, mas aceita JSONP via `?callback=`.
// O cache em memória evita gastar o limite de 3 consultas por minuto com o mesmo CNPJ.
const cache = new Map<string, ReceitaWsResponse>();
let callbackCounter = 0;

function requestJsonp(url: string): Promise<ReceitaWsResponse> {
  return new Promise((resolve, reject) => {
    callbackCounter += 1;
    const callbackName = `__receitaWsCallback${callbackCounter}`;
    const script = document.createElement('script');
    const target = window as unknown as Record<string, unknown>;

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      delete target[callbackName];
      script.remove();
    };

    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new CnpjLookupError('unavailable'));
    }, REQUEST_TIMEOUT_MS);

    target[callbackName] = (payload: ReceitaWsResponse) => {
      cleanup();
      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new CnpjLookupError('unavailable'));
    };

    script.src = `${url}?callback=${callbackName}`;
    document.head.appendChild(script);
  });
}

/** Consulta o CNPJ na ReceitaWS. Lança `CnpjLookupError` quando não é possível usar o resultado. */
export async function fetchCnpj(cnpj: string): Promise<ReceitaWsResponse> {
  const digits = onlyDigits(cnpj);
  if (!isValidCnpj(digits)) throw new CnpjLookupError('invalid');

  let data = cache.get(digits);
  if (!data) {
    data = await requestJsonp(`${RECEITAWS_CNPJ_URL}/${digits}`);

    if (data.status === 'ERROR') {
      if (/too many|limite|rate/i.test(data.message ?? '')) {
        throw new CnpjLookupError('unavailable');
      }
      throw new CnpjLookupError('not_found');
    }
    cache.set(digits, data);
  }

  const situacao = (data.situacao ?? '').trim().toUpperCase();
  if (situacao !== 'ATIVA') {
    throw new CnpjLookupError(
      'inactive',
      situacao
        ? `Este CNPJ está com situação "${situacao}" na Receita Federal, por isso não é possível prosseguir.`
        : undefined,
    );
  }

  return data;
}
