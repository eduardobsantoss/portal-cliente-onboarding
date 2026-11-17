<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X } from 'lucide-vue-next';
import { cn } from '@/utils/cn';
import Logo from './Logo.vue';
import TcButton from '@/components/theme/TcButton.vue';

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
    aria-label="Principal"
    :class="cn(
      'fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--duration-slow)] motion-reduce:transition-none',
      isScrolled
        ? 'border-b border-[color:var(--border-subtle)] bg-[var(--surface-page)] px-[var(--section-pad-x)] py-[var(--space-3)] max-md:px-[var(--page-gutter)]'
        : 'bg-transparent px-[calc(var(--page-gutter)+var(--section-pad-x))] pt-[calc(var(--page-gutter)+var(--space-6))] max-md:px-[calc(var(--page-gutter)+var(--space-5))]'
    )"
  >
    <div class="relative flex w-full items-center justify-between">
      <div class="flex items-center">
        <button
          type="button"
          @click="scrollToTop"
          class="rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          aria-label="Voltar ao topo"
        >
          <Logo :variant="isScrolled ? 'light' : 'dark'" />
        </button>
      </div>

      <!-- Links: grupo "vidro" sobre a foto; azuis, sem moldura, na barra branca -->
      <div
        :class="cn(
          'absolute left-1/2 hidden -translate-x-1/2 items-center gap-[var(--space-1)] rounded-[var(--radius-full)] border p-[var(--space-1)] lg:flex',
          isScrolled
            ? 'border-transparent bg-transparent'
            : 'border-[color:var(--glass-border)] bg-[var(--glass-bg)]'
        )"
      >
        <button
          v-for="item in navItems"
          :key="item.sectionId"
          type="button"
          @click="scrollToSection(item.sectionId)"
          :class="cn(
            'h-[var(--control-nav)] cursor-pointer whitespace-nowrap rounded-[var(--radius-full)] px-[var(--space-6)] text-[length:var(--text-sm)] font-[number:var(--weight-semibold)] transition-colors duration-[var(--duration-base)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none',
            isScrolled
              ? 'text-[color:var(--text-strong)] hover:bg-[var(--surface-soft)]'
              : 'text-[color:var(--text-on-brand)] hover:bg-[var(--glass-bg)]'
          )"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- Ações (desktop) — destaque em Abra sua conta, que fica por último -->
      <div class="hidden items-center gap-[var(--space-3)] lg:flex">
        <TcButton
          size="nav"
          :variant="isScrolled ? 'secondary' : 'glass'"
          @click="props.onOpenLogin"
        >
          Acesse sua conta
        </TcButton>
        <TcButton
          size="nav"
          :variant="isScrolled ? 'primary' : 'inverse'"
          @click="props.onOpenRegistration"
        >
          Abra sua conta
        </TcButton>
      </div>

      <button
        type="button"
        :class="cn(
          'inline-flex size-[var(--control-nav)] cursor-pointer items-center justify-center rounded-[var(--radius-full)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] lg:hidden',
          isScrolled ? 'text-[color:var(--text-strong)]' : 'text-[color:var(--text-on-brand)]'
        )"
        :aria-label="isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
        :aria-expanded="isMobileMenuOpen"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <X v-if="isMobileMenuOpen" :size="24" aria-hidden="true" />
        <Menu v-else :size="24" aria-hidden="true" />
      </button>
    </div>

    <!-- Menu mobile: painel branco -->
    <div
      v-if="isMobileMenuOpen"
      class="mt-[var(--space-3)] flex flex-col gap-[var(--space-2)] rounded-[var(--radius-xl)] bg-[var(--surface-card)] p-[var(--space-6)] text-[color:var(--text-strong)] lg:hidden"
    >
      <button
        v-for="item in navItems"
        :key="item.sectionId"
        type="button"
        @click="() => {
          scrollToSection(item.sectionId);
          isMobileMenuOpen = false;
        }"
        class="h-[var(--control-nav)] cursor-pointer rounded-[var(--radius-sm)] border-b border-[color:var(--border-subtle)] text-left text-[length:var(--text-base)] font-[number:var(--weight-bold)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
      >
        {{ item.label }}
      </button>
      <TcButton
        variant="secondary"
        class="mt-[var(--space-4)] w-full"
        @click="() => {
          props.onOpenLogin();
          isMobileMenuOpen = false;
        }"
      >
        Acesse sua conta
      </TcButton>
      <TcButton
        variant="primary"
        class="w-full"
        @click="() => {
          props.onOpenRegistration();
          isMobileMenuOpen = false;
        }"
      >
        Abra sua conta
      </TcButton>
    </div>
  </nav>
</template>
