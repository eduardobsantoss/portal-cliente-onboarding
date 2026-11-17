<script setup lang="ts">
import TcPhotoSection from "@/components/theme/TcPhotoSection.vue";
import TcEyebrow from "@/components/theme/TcEyebrow.vue";
import TcDisplayHeading from "@/components/theme/TcDisplayHeading.vue";
import TcButton from "@/components/theme/TcButton.vue";
import { publicAsset } from "@/utils/publicAsset";

const heroPhoto = publicAsset("assets/refactor/tractor-right-copy.jpg");

interface HeroSectionProps {
  onOpenRegistration: () => void;
  onOpenLogin: () => void;
}

const props = defineProps<HeroSectionProps>();
</script>

<template>
  <TcPhotoSection
    :src="heroPhoto"
    position="center 45%"
    min-height="calc(100vh - 40px)"
    top-scrim
    data-hero
    class="flex items-center px-[var(--section-pad-x)] pb-[var(--section-pad-y)] pt-[calc(var(--section-pad-y)+var(--control-nav)+var(--space-8))] max-md:px-[var(--space-5)]"
  >
    <div data-hero-content class="w-full max-w-[760px]">
      <TcEyebrow tone="onDark" data-hero-fade>Portal do Cliente GCI</TcEyebrow>

      <TcDisplayHeading
        as="h1"
        size="display"
        tone="onDark"
        data-hero-split
        class="mt-[var(--space-6)]"
      >
        Antecipe seus recebíveis,
        <template #second>100% digital.</template>
      </TcDisplayHeading>

      <p
        data-hero-fade
        class="mt-[var(--space-6)] max-w-[52ch] text-[length:var(--text-md)] leading-[var(--leading-body)] text-[color:var(--text-on-brand-muted)]"
      >
        Envie suas notas em XML, acompanhe cada etapa da operação e assine
        digitalmente, tudo na sua Conta Digital GCI.
      </p>

      <div
        data-hero-fade
        class="mt-[var(--space-10)] flex flex-wrap items-center gap-[var(--space-4)]"
      >
        <TcButton
          variant="inverse"
          size="hero"
          arrow
          @click="props.onOpenRegistration"
        >
          Abra sua conta
        </TcButton>
        <TcButton variant="glass" size="hero" @click="props.onOpenLogin">
          Acesse sua conta
        </TcButton>
      </div>
    </div>
  </TcPhotoSection>
</template>
