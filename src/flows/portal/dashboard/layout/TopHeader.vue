<script setup lang="ts">
import { Menu } from 'lucide-vue-next';
import Logo from '@/components/ui/Logo.vue';
import type { PendingTask } from '@/types/notification';
import NotificationsMenu from './NotificationsMenu.vue';
import UserMenu from './UserMenu.vue';

defineProps<{
  selectedGroup: string;
}>();

const emit = defineEmits<{
  toggleSidebar: [];
  selectPending: [task: PendingTask];
  groupChange: [group: string];
  logout: [];
}>();
</script>

<template>
  <header class="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
    <div class="flex items-center gap-4">
      <button
        @click="emit('toggleSidebar')"
        class="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
      >
        <Menu :size="20" />
      </button>
      <div class="lg:hidden">
        <Logo variant="dark" class-name="h-7" />
      </div>
    </div>

    <div class="flex items-center gap-4 md:gap-6">
      <NotificationsMenu @select-pending="emit('selectPending', $event)" />

      <UserMenu
        :selected-group="selectedGroup"
        @group-change="emit('groupChange', $event)"
        @logout="emit('logout')"
      />
    </div>
  </header>
</template>
