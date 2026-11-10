import {
  UPLOAD_ALLOWED_EXTENSIONS,
  UPLOAD_FORMAT_ERROR_MESSAGE,
  UPLOAD_MAX_SIZE_BYTES,
  UPLOAD_SIZE_ERROR_MESSAGE,
} from '@/constants/documentUpload';

/** Valida tamanho (até 12MB) e extensão (JPG/JPEG/PNG/PDF). Retorna a mensagem de erro ou `null`. */
export function validateUploadFile(file: File): string | null {
  if (file.size > UPLOAD_MAX_SIZE_BYTES) {
    return UPLOAD_SIZE_ERROR_MESSAGE;
  }

  const fileExt = file.name.split('.').pop()?.toLowerCase();
  if (!fileExt || !UPLOAD_ALLOWED_EXTENSIONS.includes(fileExt)) {
    return UPLOAD_FORMAT_ERROR_MESSAGE;
  }

  return null;
}

/** Lê o arquivo como data URL (base64) e entrega o resultado em `onLoad`. */
export function readFileAsDataUrl(file: File, onLoad: (dataUrl: string) => void): void {
  const reader = new FileReader();
  reader.onload = () => {
    onLoad(reader.result as string);
  };
  reader.readAsDataURL(file);
}

/** Formata o tamanho do arquivo em MB com uma casa decimal (ex.: "1.4 MB"). */
export function formatFileSizeInMb(sizeInBytes: number): string {
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
}
