<script setup lang="ts">
import { Image } from 'lucide-vue-next';
</script>

<template>
  <div class="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between gap-8 relative overflow-hidden group">
    <div class="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-full blur-3xl -mr-16 -mt-16" />
    <div class="space-y-6">
      <div class="w-16 h-16 rounded-[24px] bg-orange-50 text-agro-orange flex items-center justify-center shrink-0">
        <Image :size="32" />
      </div>
      <div class="space-y-4">
        <h3 class="text-xl font-black text-gci uppercase tracking-tighter italic">Subir Canhoto</h3>
        <p class="text-sm text-slate-500 font-medium leading-relaxed italic">
          O canhoto da Nota Fiscal assinado é a prova física da entrega e recebimento da mercadoria.
          Suba o arquivo (foto ou PDF) para que nossa equipe valide a operação instantaneamente.
        </p>
      </div>
    </div>

    <div class="aspect-video bg-slate-50 rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-1/3 h-full bg-white border-l border-slate-200 border-dashed p-3 shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
        <div class="h-2 w-full bg-slate-100 rounded-full mb-2" />
        <div class="h-2 w-2/3 bg-slate-100 rounded-full mb-6" />
        <div class="mt-8">
          <div class="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Assinatura do Recebedor</div>
          <div class="h-6 w-full border-b border-slate-200 mt-1 italic text-[10px] text-agro-orange font-medium flex items-end pb-1 px-1">
            Ricardo silva...
          </div>
        </div>
      </div>
      <div class="w-full h-full p-2 space-y-3 opacity-20">
        <div class="h-2.5 w-1/2 bg-slate-300 rounded-full" />
        <div class="h-2.5 w-full bg-slate-300 rounded-full" />
        <div class="h-2.5 w-3/4 bg-slate-300 rounded-full" />
        <div class="h-2.5 w-full bg-slate-300 rounded-full" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-50/80 to-transparent flex items-center justify-center">
        <p class="relative z-10 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          Exemplo de Canhoto
        </p>
      </div>
    </div>
  </div>
</template>
