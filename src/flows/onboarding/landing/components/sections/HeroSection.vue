<script setup lang="ts">
import { ref, onMounted } from "vue";
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

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <TcPhotoSection
    :src="heroPhoto"
    position="center 45%"
    min-height="calc(100vh - 40px)"
    top-scrim
    class="flex items-center px-[var(--section-pad-x)] pb-[var(--section-pad-y)] pt-[calc(var(--section-pad-y)+var(--control-nav)+var(--space-8))] max-md:px-[var(--space-6)]"
  >
    <div
      :class="[
        'w-full max-w-[760px] transition-all duration-800 ease-out motion-reduce:transition-none',
        isMounted
          ? 'translate-y-0 opacity-100'
          : 'translate-y-[30px] opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
      ]"
    >
      <TcEyebrow tone="onDark">Portal do Cliente GCI</TcEyebrow>

      <TcDisplayHeading
        as="h1"
        size="display"
        tone="onDark"
        class="mt-[var(--space-6)]"
      >
        Antecipe seus recebíveis,
        <template #second>100% digital.</template>
      </TcDisplayHeading>

      <p
        class="mt-[var(--space-6)] max-w-[52ch] text-[length:var(--text-md)] leading-[var(--leading-body)] text-[color:var(--text-on-brand-muted)]"
      >
        Envie suas notas em XML, acompanhe cada etapa da operação e assine
        digitalmente, tudo na sua Conta Digital GCI.
      </p>

      <div class="mt-[var(--space-10)] flex flex-wrap items-center gap-[var(--space-4)]">
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
