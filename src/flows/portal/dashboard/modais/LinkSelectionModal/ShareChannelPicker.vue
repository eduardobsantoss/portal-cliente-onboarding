<script setup lang="ts">
import { SHARE_CHANNELS } from '@/constants/shareChannels';

defineProps<{
  selectedChannels: string[];
}>();

const emit = defineEmits<{ toggleChannel: [channelId: string] }>();
</script>

<template>
  <div class="space-y-4">
    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Canais de Envio</label>
    <div class="flex gap-4">
      <button
        v-for="channel in SHARE_CHANNELS"
        :key="channel.id"
        @click="emit('toggleChannel', channel.id)"
        :class="`flex-1 p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
          selectedChannels.includes(channel.id)
            ? 'border-gci bg-gci/5'
            : 'border-slate-50 bg-slate-50 opacity-60 hover:opacity-100'
        }`"
      >
        <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center ${channel.color}`">
          <component :is="channel.icon" :size="24" />
        </div>
        <span class="text-xs font-black text-gci uppercase tracking-widest">{{ channel.label }}</span>
      </button>
    </div>
  </div>
</template>
