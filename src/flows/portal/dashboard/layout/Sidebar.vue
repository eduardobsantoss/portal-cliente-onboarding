<script setup lang="ts">
import { Building2, LogOut, X } from 'lucide-vue-next';
import Logo from '@/components/ui/Logo.vue';
import { DASHBOARD_NAV_ITEMS } from '@/constants/dashboardNav';
import type { DashboardNavItem, DashboardTab } from '@/types/dashboard';

/** Menu lateral de navegação do portal. */
defineProps<{
  isOpen: boolean;
  isVerified: boolean;
  activeTab: DashboardTab;
}>();

const emit = defineEmits<{
  selectItem: [item: DashboardNavItem];
  close: [];
  logout: [];
}>();

// Avaliado a cada renderização (como no original), sem reatividade ao redimensionar.
const isNarrowViewport = () => window.innerWidth < 1024;
</script>

<template>
  <aside
    :class="`${
      isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'
    } bg-gci transition-all duration-300 flex flex-col fixed h-full z-50`"
  >
    <div class="p-6 flex items-center justify-between">
      <Logo v-if="isOpen" variant="light" class-name="h-8 origin-left" />
      <div v-else class="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white mx-auto">
        <Building2 :size="20" />
      </div>
      <button
        @click="emit('close')"
        class="lg:hidden text-white/60 hover:text-white"
      >
        <X :size="20" />
      </button>
    </div>

    <nav class="flex-1 px-4 mt-8 space-y-1">
      <button
        v-for="item in DASHBOARD_NAV_ITEMS"
        :key="item.id"
        @click="emit('selectItem', item)"
        :class="`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
          activeTab === item.id
            ? 'bg-white/10 text-white'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`"
      >
        <div class="flex items-center gap-4">
          <component :is="item.icon" :size="20" :class="activeTab === item.id ? 'text-agro-orange' : 'shrink-0'" />
          <span v-if="isOpen || isNarrowViewport()" class="font-semibold text-sm">{{ item.label }}</span>
        </div>

        <span
          v-if="(isOpen || isNarrowViewport()) && Boolean(item.badge) && !isVerified"
          class="text-[9px] font-black uppercase tracking-wider bg-agro-orange text-white px-2 py-0.5 rounded-full"
        >
          {{ item.badge }}
        </span>
      </button>
    </nav>

    <div class="p-4 mt-auto space-y-2">
      <button
        @click="emit('logout')"
        class="w-full flex items-center gap-4 p-3 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
      >
        <LogOut :size="20" />
        <span v-if="isOpen" class="font-bold text-sm">Sair</span>
      </button>
    </div>
  </aside>
</template>
