<script setup lang="ts">
import { ref } from 'vue';
import { motion, AnimatePresence } from 'motion-v';
import { ChevronDown, Compass, LogOut } from 'lucide-vue-next';
import { COPY_FEEDBACK_MS } from '@/constants/dashboardTimings';
import { PORTAL_ACCOUNT_CLIPBOARD_TEXT } from '@/mocks/portalAccount';
import AccountDetailsCard from './AccountDetailsCard.vue';
import GroupSwitcher from './GroupSwitcher.vue';

defineProps<{
  selectedGroup: string;
}>();

const emit = defineEmits<{
  groupChange: [group: string];
  startTour: [];
  logout: [];
}>();

/** Menu do usuário: identidade, dados da conta, troca de grupo e saída. */
const isOpen = ref(false);
const copiedAccountInfo = ref(false);

const handleCopyAccountInfo = () => {
  navigator.clipboard.writeText(PORTAL_ACCOUNT_CLIPBOARD_TEXT);
  copiedAccountInfo.value = true;
  setTimeout(() => (copiedAccountInfo.value = false), COPY_FEEDBACK_MS);
};

const handleStartTour = () => {
  isOpen.value = false;
  emit('startTour');
};

const handleSelectGroup = (group: string) => {
  emit('groupChange', group);
  isOpen.value = false;
};
</script>

<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-3 md:pl-6 md:border-l border-slate-100 hover:bg-slate-50 transition-all p-2 rounded-xl text-left"
    >
      <div class="text-right hidden sm:block">
        <p class="text-sm font-bold text-gci leading-none">Eduardo Santos</p>
        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
          Ag. 0001 • C/C 84920-3
        </p>
      </div>
      <div class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gci/5 flex items-center justify-center text-gci font-bold text-sm border border-gci/10 shadow-xs">
        ES
      </div>
      <ChevronDown :size="16" :class="`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`" />
    </button>

    <AnimatePresence>
      <div
        v-if="isOpen"
        key="user-menu-backdrop"
        class="fixed inset-0 z-40"
        @click="isOpen = false"
      />
      <motion.div
        v-if="isOpen"
        key="user-menu-panel"
        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: 10, scale: 0.95 }"
        class="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50"
      >
        <!-- User Identity Header -->
        <div class="px-5 py-3 border-b border-slate-50 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gci text-white flex items-center justify-center font-bold text-sm shrink-0">
            ES
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-gci truncate">Eduardo Santos</p>
            <p class="text-xs text-slate-400 truncate">eduardo.santos@ceresinvestimentos.com</p>
          </div>
        </div>

        <!-- Account Details Card -->
        <AccountDetailsCard
          :copied-account-info="copiedAccountInfo"
          :handle-copy-account-info="handleCopyAccountInfo"
        />

        <!-- Group Switching Section -->
        <GroupSwitcher :selected-group="selectedGroup" @select-group="handleSelectGroup" />

        <div class="border-t border-slate-50 pt-2 px-2 space-y-1">
          <button
            @click="handleStartTour"
            class="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors font-medium"
          >
            <Compass :size="16" />
            Refazer tutorial
          </button>
          <button
            @click="emit('logout')"
            class="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <LogOut :size="16" />
            Sair da conta
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
