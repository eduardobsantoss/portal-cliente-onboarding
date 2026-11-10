import { TITLE_ATTACHMENTS } from '@/mocks/titleDetails';
import { DocumentFileCard } from '@/flows/portal/dashboard/modais/comum/DocumentFileCard';

export const TitleAttachmentsTab = () => (
  <div className="space-y-12">
    <div className="space-y-6">
      <h4 className="text-sm font-black text-gci uppercase tracking-widest">Documentos Disponíveis</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TITLE_ATTACHMENTS.map((file, i) => (
          <DocumentFileCard
            key={i}
            file={file}
            className="bg-white rounded-[32px] border border-gray-100 p-6 flex flex-col gap-5 hover:border-agro-orange/30 hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden shadow-sm"
            iconBoxClassName="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
          />
        ))}
      </div>
    </div>
  </div>
);
