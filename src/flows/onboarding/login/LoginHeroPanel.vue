<script setup lang="ts">
import { motion } from 'motion-v';
import { LOGIN_HERO_IMAGE_URL } from '@/constants/login';
</script>

<template>
  <div class="hidden lg:block flex-1 relative bg-gci overflow-hidden">
    <div class="absolute inset-0 z-10 bg-gradient-to-br from-gci/80 via-gci/40 to-transparent"></div>
    <img
      :src="LOGIN_HERO_IMAGE_URL"
      alt="Agro Business"
      class="absolute inset-0 w-full h-full object-cover scale-110"
      referrerpolicy="no-referrer"
    />

    <div class="absolute bottom-16 left-16 right-16 z-20">
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.5 }"
        class="max-w-lg"
      >
        <div class="w-12 h-1 bg-agro-orange mb-6"></div>
        <h2 class="text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
          Impulsionando o futuro do agronegócio brasileiro.
        </h2>
        <p class="text-white/70 text-lg font-medium leading-relaxed">
          Soluções financeiras sob medida para quem produz. Tecnologia e tradição unidas para o crescimento do seu negócio.
        </p>
      </motion.div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-agro-orange/10 rounded-full -mr-48 -mb-48 blur-3xl"></div>
  </div>
</template>
