<script setup lang="ts">
import { motion } from 'motion-v';
import Logo from '@/components/ui/Logo.vue';
import { LOGIN_SUPPORT_PHONE } from '@/constants/login';
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
  <div class="min-h-screen bg-white flex overflow-hidden relative">
    <!-- Modal para criar senha no primeiro acesso / protótipo -->
    <CreatePasswordModal
      :is-open="isCreatePasswordOpen"
      @close="handleCreatePasswordClose"
    />

    <!-- Left Side: Form -->
    <div class="w-full lg:w-[480px] flex flex-col p-8 md:p-12 lg:p-16 relative z-10 bg-white">
      <div class="mb-auto">
        <Logo variant="dark" class-name="h-[100px] md:h-[120px] -m-[10px] block" />
      </div>

      <motion.div
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.2 }"
        class="max-w-sm w-full mx-auto lg:mx-0"
      >
        <div class="mb-10">
          <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-3">Portal do Cliente</h1>
          <p class="text-slate-500 text-sm leading-relaxed">Bem-vindo de volta. Acesse sua conta para gerenciar suas operações com segurança.</p>
        </div>

        <LoginForm
          :email="email"
          :password="password"
          :show-password="showPassword"
          @email-change="setEmail"
          @password-change="setPassword"
          @toggle-show-password="setShowPassword(!showPassword)"
          @submit="handleSubmit"
        />

        <div class="mt-10 pt-8 border-t border-slate-100">
          <p class="text-xs text-slate-400 leading-relaxed">
            Ainda não tem acesso? Entre em contato com a equipe de atendimento ou ligue para <span class="text-gci font-semibold">{{ LOGIN_SUPPORT_PHONE }}</span>.
          </p>
        </div>
      </motion.div>

      <div class="mt-auto pt-8">
        <p class="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
          © 2025 - 2026 Grupo Ceres Investimentos.
        </p>
      </div>
    </div>

    <LoginHeroPanel />
  </div>
</template>
