<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X } from 'lucide-vue-next';
import { cn } from '@/utils/cn';
import Logo from './Logo.vue';
import TcButton from '@/components/theme/TcButton.vue';
import { smoothScrollTo } from '../../animations/useSmoothScroll';

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

const NAVBAR_OFFSET = 92;

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) return;
  smoothScrollTo(section, -NAVBAR_OFFSET);
};

const scrollToTop = () => {
  smoothScrollTo(0);
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <nav
    aria-label="Principal"
    :class="cn(
      'fixed inset-x-0 top-0 z-50 transition-[padding] duration-[var(--duration-base)] ease-[var(--ease-standard)] motion-reduce:transition-none',
      isScrolled
        ? 'px-[var(--section-pad-x)] py-[var(--space-3)] max-md:px-[var(--page-gutter)]'
        : 'px-[calc(var(--page-gutter)+var(--section-pad-x))] pb-[var(--space-3)] pt-[calc(var(--page-gutter)+var(--space-6))] max-md:px-[calc(var(--page-gutter)+var(--space-5))]'
    )"
  >
    <!-- Fundo branco da barra: aparece por opacidade, no mesmo tempo dos textos, sem "piscar" -->
    <div
      aria-hidden="true"
      :class="cn(
        'pointer-events-none absolute inset-0 -z-10 border-b border-[color:var(--border-subtle)] bg-[var(--surface-page)] transition-opacity duration-[var(--duration-base)] motion-reduce:transition-none',
        isScrolled ? 'opacity-100' : 'opacity-0'
      )"
    />
    <div class="flex w-full items-center justify-between gap-[var(--space-4)]">
      <div data-nav-item class="flex shrink-0 items-center">
        <button
          type="button"
          @click="scrollToTop"
          class="rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          aria-label="Voltar ao topo"
        >
          <!-- As duas versões ficam sempre no DOM (já carregadas) e trocam por opacidade -->
          <span class="grid items-center">
            <Logo
              variant="dark"
              :class-name="cn('col-start-1 row-start-1 transition-opacity duration-[var(--duration-base)] motion-reduce:transition-none', isScrolled && 'opacity-0')"
            />
            <Logo
              variant="light"
              aria-hidden="true"
              :class-name="cn('col-start-1 row-start-1 transition-opacity duration-[var(--duration-base)] motion-reduce:transition-none', !isScrolled && 'opacity-0')"
            />
          </span>
        </button>
      </div>

      <!-- Links: grupo "vidro" sobre a foto; azuis, sem moldura, na barra branca -->
      <div data-nav-item class="hidden min-w-0 flex-1 justify-center xl:flex">
      <div
        :class="cn(
          'flex items-center gap-[var(--space-1)] rounded-[var(--radius-full)] border p-[var(--space-1)] transition-colors duration-[var(--duration-base)] motion-reduce:transition-none',
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
      </div>

      <!-- Ações (desktop) — destaque em Abra sua conta, que fica por último -->
      <div data-nav-item class="hidden shrink-0 items-center gap-[var(--space-3)] xl:flex">
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
          'inline-flex size-[var(--control-nav)] cursor-pointer items-center justify-center rounded-[var(--radius-full)] transition-colors duration-[var(--duration-base)] motion-reduce:transition-none focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] xl:hidden',
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
      class="mt-[var(--space-3)] flex flex-col gap-[var(--space-2)] rounded-[var(--radius-xl)] bg-[var(--surface-card)] p-[var(--space-6)] text-[color:var(--text-strong)] xl:hidden"
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
