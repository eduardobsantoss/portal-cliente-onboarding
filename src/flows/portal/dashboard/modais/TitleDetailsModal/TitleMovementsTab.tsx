import { TITLE_MOVEMENTS } from '@/mocks/titleDetails';

export const TitleMovementsTab = () => (
  <div className="bg-white rounded-[40px] border border-gray-100 p-10 overflow-hidden shadow-sm relative">
    <div className="relative pl-10 md:pl-0">
      {/* Vertical Timeline Track */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2" />

      <div className="space-y-12 relative">
        {TITLE_MOVEMENTS.map((mov, i) => (
          <div key={i} className={`flex items-start md:items-center gap-6 md:gap-12 relative ${mov.side === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            <div className="flex-1 hidden md:block" />

            {/* Icon Bubble */}
            <div className="absolute left-[-20px] md:left-1/2 md:-translate-x-1/2 z-10 top-0 md:top-auto">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 ${mov.color} ${mov.textColor} ring-4 ring-white`}>
                <mov.icon size={18} />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all group relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-gci uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-slate-100">{mov.user}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{mov.date}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{mov.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
