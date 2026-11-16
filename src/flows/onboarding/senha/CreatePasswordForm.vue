<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import type { CreatePasswordState } from './useCreatePassword';
import PasswordField from './PasswordField.vue';
import PasswordRecommendations from './PasswordRecommendations.vue';

defineProps<{
  form: CreatePasswordState;
}>();
</script>

<template>
  <form @submit="form.handleSubmit" class="space-y-4">
    <!-- Nova Senha -->
    <PasswordField
      label="Nova Senha"
      placeholder="Crie uma senha segura"
      :value="form.password.value"
      :show="form.showPassword.value"
      @change="form.setPassword"
      @toggle-show="form.setShowPassword(!form.showPassword.value)"
    />

    <!-- Confirmar Senha -->
    <PasswordField
      label="Confirmar Nova Senha"
      placeholder="Repita a nova senha"
      :value="form.confirmPassword.value"
      :show="form.showConfirmPassword.value"
      @change="form.setConfirmPassword"
      @toggle-show="form.setShowConfirmPassword(!form.showConfirmPassword.value)"
    />

    <!-- Password Criteria Checklist -->
    <PasswordRecommendations />

    <!-- Submit Action -->
    <div class="pt-2">
      <button
        type="submit"
        class="w-full bg-gci hover:bg-gci-hover text-white h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group transition-all shadow-lg shadow-gci/10 active:scale-[0.99] cursor-pointer"
      >
        <span>Criar Senha e Prosseguir</span>
        <ArrowRight :size="17" class="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  </form>
</template>
