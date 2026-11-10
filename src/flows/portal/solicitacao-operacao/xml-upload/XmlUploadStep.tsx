import type { OperationXmlFile } from '@/types/operationRequest';
import { OperationTimeline } from '../OperationTimeline';
import { XmlDropzone } from './XmlDropzone';
import { XmlFileList } from './XmlFileList';
import { XmlUploadIntro } from './XmlUploadIntro';

interface XmlUploadStepProps {
  files: OperationXmlFile[];
  onFileUpload: () => void;
}

export const XmlUploadStep = ({ files, onFileUpload }: XmlUploadStepProps) => {
  return (
    <>
      <OperationTimeline step="XML_UPLOAD" />
      <XmlUploadIntro />

      <div className="space-y-6 pt-4">
        <XmlDropzone onFileUpload={onFileUpload} />

        {files.length > 0 && (
          <XmlFileList files={files} />
        )}
      </div>
    </>
  );
};
