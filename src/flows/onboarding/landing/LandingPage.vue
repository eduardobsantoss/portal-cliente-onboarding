<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import HeroSection from './components/sections/HeroSection.vue';
import SolutionsSection from './components/sections/SolutionsSection.vue';
import BenefitsSection from './components/sections/BenefitsSection.vue';
import SocialProofSection from './components/sections/SocialProofSection.vue';
import HowItWorksSection from './components/sections/HowItWorksSection.vue';
import CallToActionSection from './components/sections/CallToActionSection.vue';
import NewsletterModal from './components/modals/NewsletterModal.vue';
import RegistrationModal from './components/modals/RegistrationModal.vue';
import LegalDocumentModal from './components/modals/LegalDocumentModal.vue';
import { NEWSLETTER_STORAGE_SUBSCRIBED } from './constants/newsletter';
import type { RegistrationLead } from '@/types/registration';
import type { TermsDocumentType } from '@/types/terms';
import { useLandingMotion } from './animations/useLandingMotion';
import { pauseSmoothScroll, resumeSmoothScroll } from './animations/useSmoothScroll';

/**
 * Passo 0 do onboarding: landing page do Grupo Ceres Investimentos.
 * Os CTAs de cadastro abrem o formulário "Abra sua conta"; ao concluir, o fluxo segue para a
 * confirmação do celular. "Acesse sua conta" leva ao login.
 * O modal de newsletter continua abrindo sozinho (uma vez) para quem ainda não se inscreveu.
 */
const emit = defineEmits<{
  register: [lead: RegistrationLead];
  login: [];
}>();

const pageRoot = ref<HTMLElement | null>(null);
useLandingMotion(pageRoot);

const isNewsletterModalOpen = ref(false);
const isRegistrationOpen = ref(false);
const legalDocument = ref<TermsDocumentType | null>(null);
let newsletterTimer: number | undefined;

const openRegistration = () => {
  isNewsletterModalOpen.value = false;
  isRegistrationOpen.value = true;
};
const handleRegistrationSubmit = (lead: RegistrationLead) => {
  isRegistrationOpen.value = false;
  emit('register', lead);
};
const openLogin = () => emit('login');

// Com um modal aberto, a rolagem suave da página é pausada (o modal rola sozinho).
watch([isRegistrationOpen, isNewsletterModalOpen, legalDocument], ([registration, newsletter, legal]) => {
  if (registration || newsletter || legal) pauseSmoothScroll();
  else resumeSmoothScroll();
});

onMounted(() => {
  window.scrollTo({ top: 0 });

  const subscribed = localStorage.getItem(NEWSLETTER_STORAGE_SUBSCRIBED);
  if (subscribed) return;

  newsletterTimer = window.setTimeout(() => {
    // Não sobrepõe o formulário de cadastro caso o visitante já o tenha aberto.
    if (isRegistrationOpen.value) return;
    isNewsletterModalOpen.value = true;
  }, 1500);
});

onBeforeUnmount(() => {
  window.clearTimeout(newsletterTimer);
});
</script>

<template>
  <div ref="pageRoot" class="min-h-screen bg-white font-sans">
    <!-- A página usa o theme-client; os modais (TcDialog) têm a própria raiz de tema. -->
    <div class="theme-client flex min-h-screen flex-col gap-[var(--page-gutter)] p-[var(--page-gutter)]">
      <Navbar :onOpenRegistration="openRegistration" :onOpenLogin="openLogin" />
      <main class="flex flex-col gap-[var(--page-gutter)]">
        <HeroSection :onOpenRegistration="openRegistration" :onOpenLogin="openLogin" />
        <SolutionsSection />
        <BenefitsSection />
        <SocialProofSection />
        <HowItWorksSection :onOpenRegistration="openRegistration" />
        <CallToActionSection :onOpenRegistration="openRegistration" :onOpenLogin="openLogin" />
      </main>
      <Footer
        @register="openRegistration"
        @login="openLogin"
        @open-legal="legalDocument = $event"
      />
    </div>

    <RegistrationModal
      v-if="isRegistrationOpen"
      @close="isRegistrationOpen = false"
      @submit="handleRegistrationSubmit"
    />

    <LegalDocumentModal
      v-if="legalDocument"
      :doc-type="legalDocument"
      @close="legalDocument = null"
    />

    <NewsletterModal
      :isOpen="isNewsletterModalOpen"
      :onClose="() => (isNewsletterModalOpen = false)"
    />
  </div>
</template>
