/** Limite de tamanho por arquivo enviado (12MB). */
export const UPLOAD_MAX_SIZE_BYTES = 12 * 1024 * 1024;

/** Extensões aceitas no envio (JPG, JPEG, PNG ou PDF). */
export const UPLOAD_ALLOWED_EXTENSIONS: string[] = ['jpg', 'jpeg', 'png', 'pdf'];

/** Valor do atributo `accept` do input de arquivo. */
export const UPLOAD_ACCEPT_ATTRIBUTE = '.jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf';

/** Tempo (ms) em que a mensagem de erro de upload fica visível. */
export const UPLOAD_ERROR_DISMISS_MS = 4000;

/** Atraso simulado (ms) entre ler o arquivo e marcá-lo como enviado. */
export const UPLOAD_SIMULATED_DELAY_MS = 500;

export const UPLOAD_SIZE_ERROR_MESSAGE = 'O arquivo selecionado excede o limite máximo permitido de 12MB.';
export const UPLOAD_FORMAT_ERROR_MESSAGE = 'Formato inválido. Os formatos aceitos são JPG, JPEG, PNG ou PDF.';

/** Rótulo de data usado para arquivos enviados/anexados na sessão atual. */
export const UPLOAD_DATE_NOW_LABEL = 'Agora';
