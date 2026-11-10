import { SHARE_CHANNELS } from '@/constants/shareChannels';

interface ShareChannelPickerProps {
  selectedChannels: string[];
  onToggleChannel: (channelId: string) => void;
}

export const ShareChannelPicker = ({ selectedChannels, onToggleChannel }: ShareChannelPickerProps) => (
  <div className="space-y-4">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Canais de Envio</label>
    <div className="flex gap-4">
      {SHARE_CHANNELS.map(channel => (
        <button
          key={channel.id}
          onClick={() => onToggleChannel(channel.id)}
          className={`flex-1 p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
            selectedChannels.includes(channel.id) 
              ? 'border-gci bg-gci/5' 
              : 'border-slate-50 bg-slate-50 opacity-60 hover:opacity-100'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${channel.color}`}>
            <channel.icon size={24} />
          </div>
          <span className="text-xs font-black text-gci uppercase tracking-widest">{channel.label}</span>
        </button>
      ))}
    </div>
  </div>
);
