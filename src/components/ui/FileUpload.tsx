import React from 'react';

interface FileUploadProps {
  id: string;
  accept: string;
  onFileSelect: (file: File) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

/**
 * Input de arquivo oculto. Pode ser acionado por um `FileUploadTrigger` (label com `htmlFor`)
 * ou programaticamente via `inputRef.current?.click()`. Não conhece regras de validação.
 */
export const FileUpload: React.FC<FileUploadProps> = ({ id, accept, onFileSelect, inputRef }) => {
  return (
    <input
      ref={inputRef}
      id={id}
      type="file"
      accept={accept}
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onFileSelect(file);
      }}
    />
  );
};
