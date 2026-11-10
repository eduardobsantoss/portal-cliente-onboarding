import React from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';

export const FacialQrCode: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-slate-200 shadow-sm shrink-0 w-full md:w-64 text-center">
      <div className="relative p-3 bg-slate-50 rounded-xl border border-slate-200 group">
        {/* Styled Crisp Vector QR Code */}
        <svg
          viewBox="0 0 160 160"
          className="w-40 h-40 text-[#083C4A]"
          fill="currentColor"
        >
          {/* Outer boundary & corners */}
          {/* Top-Left Finder */}
          <rect x="10" y="10" width="40" height="40" rx="6" fill="#083C4A" />
          <rect x="18" y="18" width="24" height="24" rx="3" fill="#ffffff" />
          <rect x="24" y="24" width="12" height="12" rx="2" fill="#083C4A" />

          {/* Top-Right Finder */}
          <rect x="110" y="10" width="40" height="40" rx="6" fill="#083C4A" />
          <rect x="118" y="18" width="24" height="24" rx="3" fill="#ffffff" />
          <rect x="124" y="24" width="12" height="12" rx="2" fill="#083C4A" />

          {/* Bottom-Left Finder */}
          <rect x="10" y="110" width="40" height="40" rx="6" fill="#083C4A" />
          <rect x="18" y="118" width="24" height="24" rx="3" fill="#ffffff" />
          <rect x="24" y="124" width="12" height="12" rx="2" fill="#083C4A" />

          {/* Decorative Authentic Data Dots Matrix */}
          {/* Central brand dot */}
          <rect x="68" y="68" width="24" height="24" rx="4" fill="#F27D26" />
          <rect x="74" y="74" width="12" height="12" rx="2" fill="#ffffff" />

          {/* Data pattern squares */}
          <rect x="60" y="15" width="8" height="8" rx="1.5" />
          <rect x="80" y="15" width="8" height="8" rx="1.5" />
          <rect x="70" y="30" width="8" height="8" rx="1.5" />
          <rect x="90" y="30" width="8" height="8" rx="1.5" />
          <rect x="60" y="45" width="8" height="8" rx="1.5" />

          <rect x="15" y="60" width="8" height="8" rx="1.5" />
          <rect x="30" y="70" width="8" height="8" rx="1.5" />
          <rect x="45" y="60" width="8" height="8" rx="1.5" />
          <rect x="15" y="90" width="8" height="8" rx="1.5" />
          <rect x="35" y="90" width="8" height="8" rx="1.5" />

          <rect x="110" y="60" width="8" height="8" rx="1.5" />
          <rect x="130" y="60" width="8" height="8" rx="1.5" />
          <rect x="140" y="75" width="8" height="8" rx="1.5" />
          <rect x="105" y="85" width="8" height="8" rx="1.5" />
          <rect x="125" y="90" width="8" height="8" rx="1.5" />
          <rect x="140" y="100" width="8" height="8" rx="1.5" />

          <rect x="60" y="105" width="8" height="8" rx="1.5" />
          <rect x="80" y="105" width="8" height="8" rx="1.5" />
          <rect x="95" y="115" width="8" height="8" rx="1.5" />
          <rect x="65" y="130" width="8" height="8" rx="1.5" />
          <rect x="85" y="135" width="8" height="8" rx="1.5" />
          <rect x="105" y="130" width="8" height="8" rx="1.5" />
          <rect x="135" y="135" width="8" height="8" rx="1.5" />
        </svg>

        {/* Scanning line animation */}
        <div className="absolute inset-x-3 top-3 bottom-3 overflow-hidden pointer-events-none rounded-lg">
          <motion.div
            animate={{ y: [0, 140, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#F27D26] to-transparent shadow-[0_0_8px_rgba(242,125,38,0.8)]"
          />
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <span className="text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1.5">
          <Camera size={13} className="text-gci" /> Escaneie com seu celular
        </span>
        <p className="text-[10px] text-slate-400">
          Sessão segura criptografada
        </p>
      </div>
    </div>
  );
};
