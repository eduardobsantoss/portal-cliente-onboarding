<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X } from 'lucide-vue-next';
import { cn } from '@/utils/cn';
import Logo from './Logo.vue';
import BaseButton from '../ui/BaseButton.vue';

interface NavbarProps {
  onOpenRegistration: () => void;
  onOpenLogin: () => void;
}

const props = defineProps<NavbarProps>();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const navItems = [
  { label: 'Soluções', sectionId: 'solucoes' },
  { label: 'Benefícios', sectionId: 'beneficios' },
  { label: 'Como Funciona', sectionId: 'como-funciona' },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const navbarOffset = 92;
  const top = section.getBoundingClientRect().top + window.scrollY - navbarOffset;
  window.scrollTo({ top, behavior: 'smooth' });
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <nav
    :class="cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3',
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    )"
  >
    <div class="max-w-7xl mx-auto w-full px-5 md:px-6 relative flex items-center justify-between">
      <div class="flex items-center">
        <button
          type="button"
          @click="scrollToTop"
          class="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gci/40 focus-visible:ring-offset-2"
          aria-label="Voltar ao topo"
        >
          <Logo :variant="isScrolled ? 'light' : 'dark'" />
        </button>
      </div>

      <div class="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        <button
          v-for="item in navItems"
          :key="item.sectionId"
          @click="scrollToSection(item.sectionId)"
          :class="cn(
            'text-[14px] font-semibold hover:opacity-70 transition-opacity',
            isScrolled ? 'text-gray-700' : 'text-white'
          )"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- Action Buttons (Desktop) — destaque em Registre-se -->
      <div class="hidden lg:flex items-center gap-4">
        <BaseButton
          variant="plain"
          :class="cn(
            'text-[14px] font-semibold px-5 py-2.5 rounded-full border transition-colors block text-center',
            isScrolled
              ? 'text-gci border-gci/30 bg-white hover:bg-gci-light'
              : 'text-white border-white/40 bg-white/10 hover:bg-white/20'
          )"
          @click="props.onOpenLogin"
        >
          Acesse sua conta
        </BaseButton>
        <BaseButton
          variant="solid-dark"
          class="text-[14px] font-bold px-7 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg"
          @click="props.onOpenRegistration"
        >
          Registre-se
        </BaseButton>
      </div>

      <button
        class="lg:hidden p-2 rounded-lg transition-colors"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <X v-if="isMobileMenuOpen" :class="isScrolled ? 'text-gray-900' : 'text-white'" :size="24" />
        <Menu v-else :class="isScrolled ? 'text-gray-900' : 'text-white'" :size="24" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="absolute top-full left-0 right-0 bg-white shadow-2xl p-6 lg:hidden flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <button
        v-for="item in navItems"
        :key="item.sectionId"
        @click="() => {
          scrollToSection(item.sectionId);
          isMobileMenuOpen = false;
        }"
        class="text-left py-3 text-gray-800 font-bold text-lg border-b border-gray-50"
      >
        {{ item.label }}
      </button>
      <BaseButton
        variant="plain"
        class="border border-gci/25 text-gci py-4 rounded-full font-semibold text-lg text-center block"
        @click="() => {
          props.onOpenLogin();
          isMobileMenuOpen = false;
        }"
      >
        Acesse sua conta
      </BaseButton>
      <BaseButton
        variant="plain"
        class="bg-gci text-white py-4 rounded-full font-bold text-lg shadow-xl text-center block mt-4"
        @click="() => {
          props.onOpenRegistration();
          isMobileMenuOpen = false;
        }"
      >
        Registre-se
      </BaseButton>
    </div>
  </nav>
</template>
