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
import { NEWSLETTER_STORAGE_SUBSCRIBED } from './constants/newsletter';

/**
 * Passo 0 do onboarding: landing page do Grupo Ceres Investimentos.
 * Os CTAs de cadastro avançam para a confirmação do celular e "Acesse sua conta" leva ao login.
 * O modal de newsletter continua abrindo sozinho (uma vez) para quem ainda não se inscreveu.
 */
const emit = defineEmits<{
  register: [];
  login: [];
}>();

const isNewsletterModalOpen = ref(false);
let newsletterTimer: number | undefined;

const openRegistration = () => emit('register');
const openLogin = () => emit('login');

onMounted(() => {
  window.scrollTo({ top: 0 });

  const subscribed = localStorage.getItem(NEWSLETTER_STORAGE_SUBSCRIBED);
  if (subscribed) return;

  newsletterTimer = window.setTimeout(() => {
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

    <NewsletterModal
      :isOpen="isNewsletterModalOpen"
      :onClose="() => (isNewsletterModalOpen = false)"
    />
  </div>
</template>
