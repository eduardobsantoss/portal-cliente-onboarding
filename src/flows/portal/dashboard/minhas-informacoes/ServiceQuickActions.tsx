import { DASHBOARD_SERVICES } from '@/constants/dashboardServices';

/** Atalhos de serviços (desconto de duplicata / contratos fiduciários). */
interface ServiceQuickActionsProps {
  onSelectService: (serviceLabel: string) => void;
}

export const ServiceQuickActions = ({ onSelectService }: ServiceQuickActionsProps) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {DASHBOARD_SERVICES.map((service) => (
      <button 
        key={service.id}
        onClick={() => service.active && onSelectService(service.label)}
        disabled={!service.active}
        className={`bg-white border border-slate-100 p-5 rounded-2xl flex flex-col items-center text-center gap-3 transition-all group relative ${
          service.active 
            ? 'hover:border-gci/20 hover:shadow-md active:scale-[0.98]' 
            : 'opacity-60 cursor-not-allowed'
        }`}
      >
        {!service.active && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <span className="bg-gci text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl">Em breve</span>
          </div>
        )}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          service.active 
            ? 'bg-slate-50 text-gci group-hover:bg-gci group-hover:text-white' 
            : 'bg-slate-100 text-slate-400'
        }`}>
          <service.icon size={20} />
        </div>
        <span className={`text-[11px] font-bold leading-tight uppercase tracking-wide ${
          service.active ? 'text-gci' : 'text-slate-400'
        }`}>{service.label}</span>
      </button>
    ))}
  </div>
);
