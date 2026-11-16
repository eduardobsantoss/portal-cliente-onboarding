<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
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
import { NEWSLETTER_STORAGE_SUBSCRIBED } from './constants/newsletter';
import type { RegistrationLead } from '@/types/registration';

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

const isNewsletterModalOpen = ref(false);
const isRegistrationOpen = ref(false);
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
  <div class="min-h-screen bg-white font-sans selection:bg-gci/10 selection:text-gci">
    <Navbar :onOpenRegistration="openRegistration" :onOpenLogin="openLogin" />
    <main>
      <HeroSection :onOpenRegistration="openRegistration" :onOpenLogin="openLogin" />
      <SolutionsSection />
      <BenefitsSection />
      <SocialProofSection />
      <HowItWorksSection :onOpenRegistration="openRegistration" />
      <CallToActionSection :onOpenRegistration="openRegistration" :onOpenLogin="openLogin" />
    </main>
    <Footer />

    <RegistrationModal
      v-if="isRegistrationOpen"
      @close="isRegistrationOpen = false"
      @submit="handleRegistrationSubmit"
    />

    <NewsletterModal
      :isOpen="isNewsletterModalOpen"
      :onClose="() => (isNewsletterModalOpen = false)"
    />
  </div>
</template>
