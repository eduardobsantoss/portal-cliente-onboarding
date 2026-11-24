<script setup lang="ts">
import { ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';
import TcButton from '@/components/theme/TcButton.vue';
import TcCheckbox from '@/components/theme/TcCheckbox.vue';
import TcIconButton from '@/components/theme/TcIconButton.vue';
import TcTextField from '@/components/theme/TcTextField.vue';

defineProps<{
  email: string;
  password: string;
  showPassword: boolean;
}>();

const emit = defineEmits<{
  emailChange: [value: string];
  passwordChange: [value: string];
  toggleShowPassword: [];
  submit: [e: Event];
}>();

// "Lembrar neste dispositivo" continua sem efeito no protótipo (como antes); só deixa de ser um input solto.
const remember = ref(false);
</script>

<template>
  <!-- `novalidate`: o campo de e-mail agora é type="email", mas o envio não deve passar a ser barrado pelo navegador. -->
  <form class="flex flex-col gap-[var(--space-5)]" novalidate @submit="emit('submit', $event)">
    <TcTextField
      id="login-email"
      label="E-mail corporativo"
      type="email"
      autocomplete="username"
      placeholder="exemplo@empresa.com.br"
      :model-value="email"
      @update:model-value="emit('emailChange', $event)"
    />

    <TcTextField
      id="login-password"
      label="Senha"
      :type="showPassword ? 'text' : 'password'"
      autocomplete="current-password"
      placeholder="••••••••"
      :model-value="password"
      @update:model-value="emit('passwordChange', $event)"
    >
      <template #label-aside>
        <a
          href="#"
          class="rounded-[var(--radius-sm)] text-[length:var(--text-sm)] font-[number:var(--weight-semibold)] text-[color:var(--text-link)] hover:text-[color:var(--text-link-hover)] hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        >Esqueci a senha</a>
      </template>

      <template #trailing>
        <TcIconButton
          :label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
          :icon="showPassword ? EyeOff : Eye"
          :aria-pressed="showPassword"
          @click="emit('toggleShowPassword')"
        />
      </template>
    </TcTextField>

    <div class="flex min-h-[var(--control-arrow)] items-center">
      <TcCheckbox id="login-remember" v-model="remember">Lembrar neste dispositivo</TcCheckbox>
    </div>

    <TcButton type="submit" variant="primary" arrow class="w-full">Acessar portal</TcButton>
  </form>
</template>
