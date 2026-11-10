import { OPERATION_ATTACHMENTS } from '@/mocks/operationDetails';
import { getDocumentTypeTone } from '@/utils/documentFileTone';
import { DocumentFileCard } from '../comum/DocumentFileCard';

export const OperationAttachmentsTab = () => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-black text-gci uppercase tracking-widest">Documentos da Operação</h4>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {OPERATION_ATTACHMENTS.map((file, i) => (
        <DocumentFileCard
          key={i}
          file={file}
          className="bg-white rounded-[32px] border border-gray-100 p-6 flex flex-col gap-5 hover:border-agro-orange/30 hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden"
          iconBoxClassName={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${getDocumentTypeTone(file.type)}`}
        />
      ))}
    </div>
  </div>
);
