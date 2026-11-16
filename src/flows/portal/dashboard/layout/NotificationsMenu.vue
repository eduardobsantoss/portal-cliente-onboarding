<script setup lang="ts">
import { ref } from 'vue';
import { motion, AnimatePresence } from 'motion-v';
import { AlertCircle, Bell, CheckCircle2 } from 'lucide-vue-next';
import { PORTAL_NOTIFICATIONS } from '@/mocks/portalNotifications';
import type { PendingTask, PortalNotification } from '@/types/notification';

const emit = defineEmits<{
  selectPending: [task: PendingTask];
}>();

/** Sino de notificações com o balão de pendências e a lista de avisos. */
const isOpen = ref(false);
// Nunca é ativado no original (o balão "Você possui pendências!" fica oculto).
const showLoginToast = ref(false);

const categories = ['Pendências', 'Notificações'];

const handleSelect = (n: PortalNotification) => {
  if (n.category === 'Pendências') emit('selectPending', n);
  isOpen.value = false;
};
</script>

<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="p-2.5 bg-slate-50 text-slate-400 hover:text-gci hover:bg-slate-100 rounded-xl transition-all relative"
    >
      <Bell :size="20" />
      <span class="absolute top-2 right-2 w-2 h-2 bg-agro-orange rounded-full border-2 border-white"></span>
    </button>

    <AnimatePresence>
      <motion.div
        v-if="showLoginToast"
        :initial="{ opacity: 0, y: -10, x: '-50%' }"
        :animate="{ opacity: 1, y: 0, x: '-50%' }"
        :exit="{ opacity: 0, y: -10, x: '-50%' }"
        class="absolute top-full left-1/2 mt-4 w-64 bg-gci text-white p-4 rounded-2xl shadow-2xl z-50 text-center"
      >
        <p class="text-xs font-bold">Você possui pendências!</p>
        <p class="text-[10px] text-white/70 mt-1">Clique no sino para visualizar.</p>
        <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gci rotate-45"></div>
      </motion.div>
    </AnimatePresence>

    <AnimatePresence>
      <div v-if="isOpen" key="notifications-backdrop" class="fixed inset-0 z-40" @click="isOpen = false" />
      <motion.div
        v-if="isOpen"
        key="notifications-panel"
        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: 10, scale: 0.95 }"
        class="absolute right-0 mt-4 w-80 md:w-96 bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden z-50"
      >
        <div class="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h3 class="text-sm font-black text-gci uppercase tracking-widest">Notificações</h3>
          <span class="bg-agro-orange text-white text-[10px] font-black px-2 py-0.5 rounded-full">4 NOVAS</span>
        </div>

        <div class="max-h-[400px] overflow-y-auto custom-scrollbar">
          <div v-for="cat in categories" :key="cat" class="py-2">
            <div class="px-6 py-2">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ cat }}</p>
            </div>
            <button
              v-for="n in PORTAL_NOTIFICATIONS.filter(n => n.category === cat)"
              :key="n.id"
              @click="handleSelect(n)"
              class="w-full px-6 py-4 flex gap-4 hover:bg-slate-50 transition-colors text-left group"
            >
              <div
                :class="`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                  n.category === 'Pendências' ? 'bg-orange-50 text-agro-orange' : 'bg-blue-50 text-blue-600'
                }`"
              >
                <AlertCircle v-if="n.category === 'Pendências'" :size="18" />
                <CheckCircle2 v-else :size="18" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between mb-0.5">
                  <p class="text-xs font-bold text-gci group-hover:text-agro-orange transition-colors">{{ n.title }}</p>
                  <span class="text-[10px] text-slate-400 font-medium">{{ n.date }}</span>
                </div>
                <p class="text-[11px] text-slate-500 leading-relaxed">{{ n.description }}</p>
              </div>
            </button>
          </div>
        </div>

        <button class="w-full py-4 bg-slate-50 text-[10px] font-black text-gci uppercase tracking-widest hover:bg-slate-100 transition-colors border-t border-slate-100">
          Marcar todas como lidas
        </button>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
