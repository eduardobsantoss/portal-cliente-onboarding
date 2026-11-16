<script setup lang="ts">
import Logo from '@/components/ui/Logo.vue';

defineProps<{
  sectionLabel: string;
  mainClassName: string;
}>();

/*
 * Slots: headerAction, footerAction (ação discreta no rodapé, ao lado do copyright),
 * beforeFooter, afterFooter e o slot padrão (conteúdo principal).
 */
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
    <!-- Top Bar -->
    <header class="max-w-5xl w-full mx-auto flex items-center justify-between gap-4 pb-6 border-b border-slate-200">
      <div class="flex items-center gap-4 min-w-0">
        <Logo variant="horizontal" class-name="h-24 md:h-28 w-auto shrink-0" />
        <div class="hidden sm:block h-8 w-px bg-slate-200"></div>
        <span class="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {{ sectionLabel }}
        </span>
      </div>

      <slot name="headerAction" />
    </header>

    <!-- Main Content -->
    <main :class="mainClassName">
      <slot />
    </main>

    <slot name="beforeFooter" />

    <!-- Footer -->
    <footer class="max-w-5xl w-full mx-auto pt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-xs text-slate-400">
      <span>© 2026 Grupo Ceres Investimentos. Todos os direitos reservados.</span>
      <slot name="footerAction" />
    </footer>

    <slot name="afterFooter" />
  </div>
</template>
