<script setup lang="ts">
import { motion } from 'motion-v';
import Logo from '@/components/ui/Logo.vue';
import TcDisplayHeading from '@/components/theme/TcDisplayHeading.vue';
import TcEyebrow from '@/components/theme/TcEyebrow.vue';
import CreatePasswordModal from '@/flows/onboarding/senha/CreatePasswordModal.vue';
import { useLoginForm } from './useLoginForm';
import LoginForm from './LoginForm.vue';
import LoginHeroPanel from './LoginHeroPanel.vue';

const props = defineProps<{
  /** E-mail informado no cadastro da landing; preenche o campo de login. */
  initialEmail?: string;
}>();

const emit = defineEmits<{
  login: [];
  startActivation: [];
}>();

const {
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isCreatePasswordOpen,
  handleSubmit,
  handleCreatePasswordClose,
} = useLoginForm({ onLogin: () => emit('login'), initialEmail: props.initialEmail });
</script>

<template>
  <div class="theme-client flex min-h-[100dvh] flex-wrap gap-[var(--space-5)] p-[var(--page-gutter)]">
    <!-- Modal para criar senha no primeiro acesso / protótipo -->
    <CreatePasswordModal
      :is-open="isCreatePasswordOpen"
      @close="handleCreatePasswordClose"
    />

    <!-- Coluna esquerda: logo, formulário e rodapé -->
    <div
      class="flex flex-[1_1_100%] flex-col justify-between gap-[var(--space-8)] px-[var(--space-2)] pb-[var(--space-6)] pt-[var(--space-5)] sm:px-[calc(var(--space-9)+var(--space-2))] lg:flex-[35_1_0%] lg:px-[var(--space-6)]"
    >
      <!-- Logo horizontal (texto maior); a altura vem do próprio `Logo` (96px, 112px a partir de md). -->
      <Logo variant="horizontal" class-name="self-start" />

      <motion.div
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.2 }"
        class="mx-auto flex w-full max-w-[560px] flex-col gap-[var(--space-5)]"
      >
        <TcEyebrow>Portal do Cliente</TcEyebrow>

        <TcDisplayHeading as="h1" size="4xl">
          Bem-vindo
          <template #second>de volta.</template>
        </TcDisplayHeading>

        <p class="m-0 text-[length:var(--text-md)] leading-[var(--leading-body)] text-[color:var(--text-muted)]">
          Acesse sua conta para gerenciar suas operações com segurança.
        </p>

        <LoginForm
          :email="email"
          :password="password"
          :show-password="showPassword"
          @email-change="setEmail"
          @password-change="setPassword"
          @toggle-show-password="setShowPassword(!showPassword)"
          @submit="handleSubmit"
        />
      </motion.div>

      <div class="text-[length:var(--text-xs)] leading-[var(--leading-body)] text-[color:var(--text-muted)]">
        <!-- Removido a pedido: "Ainda não tem acesso? Fale com a equipe de atendimento: {{ LOGIN_SUPPORT_PHONE }}" -->
        <p class="m-0">© 2025–2026 Grupo Ceres Investimentos</p>
      </div>
    </div>

    <LoginHeroPanel />
  </div>
</template>
