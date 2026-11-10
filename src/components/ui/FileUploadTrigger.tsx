import React from 'react';

interface FileUploadTriggerProps {
  inputId: string;
  className: string;
  children: React.ReactNode;
}

/** Label que abre o seletor de arquivos do `FileUpload` com o mesmo `id`. */
export const FileUploadTrigger: React.FC<FileUploadTriggerProps> = ({ inputId, className, children }) => {
  return (
    <label htmlFor={inputId} className={className}>
      {children}
    </label>
  );
};
