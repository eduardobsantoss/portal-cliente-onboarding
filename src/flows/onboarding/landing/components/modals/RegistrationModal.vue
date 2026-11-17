<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Info,
  KeyRound,
  Mail,
  ShieldCheck,
  User,
  X,
} from 'lucide-vue-next';
import Logo from '../layout/Logo.vue';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { cn } from '@/utils/cn';
import { maskDocument, maskPhone, onlyDigits } from '@/utils/registrationMasks';
import type { RegistrationDocumentType, RegistrationLead } from '@/types/registration';

/**
 * Formulário "Abra sua conta" (tela cheia) aberto pelos CTAs de cadastro da landing.
 * Ao concluir, entrega os dados para o fluxo, que segue para a confirmação do celular por SMS.
 */
const props = withDefaults(
  defineProps<{
    initialType?: RegistrationDocumentType;
  }>(),
  { initialType: 'CNPJ' },
);

const emit = defineEmits<{
  close: [];
  submit: [lead: RegistrationLead];
}>();

useBodyScrollLock();

const SUBMIT_DELAY_MS = 600;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const documentType = ref<RegistrationDocumentType>(props.initialType);
const isSubmitting = ref(false);
const form = reactive({ document: '', email: '', phone: '' });
const errors = ref<Partial<Record<keyof typeof form, string>>>({});

const selectType = (type: RegistrationDocumentType) => {
  documentType.value = type;
  form.document = '';
  errors.value = {};
};

const clearError = (field: keyof typeof form) => {
  if (errors.value[field]) errors.value = { ...errors.value, [field]: '' };
};

const onDocumentInput = (event: Event) => {
  form.document = maskDocument((event.target as HTMLInputElement).value, documentType.value);
  clearError('document');
};

const onPhoneInput = (event: Event) => {
  form.phone = maskPhone((event.target as HTMLInputElement).value);
  clearError('phone');
};

const validate = () => {
  const next: typeof errors.value = {};
  const documentDigits = onlyDigits(form.document);
  const expectedLength = documentType.value === 'CPF' ? 11 : 14;

  if (!form.document.trim()) {
    next.document = `Por favor, informe o ${documentType.value}.`;
  } else if (documentDigits.length !== expectedLength) {
    next.document = `O ${documentType.value} deve conter ${expectedLength} dígitos.`;
  }

  if (!EMAIL_PATTERN.test(form.email.trim())) {
    next.email = 'Informe um endereço de e-mail válido.';
  }

  if (onlyDigits(form.phone).length < 10) {
    next.phone = 'Informe um telefone/WhatsApp válido com DDD.';
  }

  return next;
};

const handleSubmit = () => {
  const next = validate();
  if (Object.keys(next).length > 0) {
    errors.value = next;
    return;
  }

  errors.value = {};
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    emit('submit', {
      documentType: documentType.value,
      document: form.document,
      email: form.email.trim(),
      phone: form.phone,
    });
  }, SUBMIT_DELAY_MS);
};

const inputClass = (field: keyof typeof form, tone = 'text-gray-800') =>
  cn(
    'w-full bg-gray-50/80 border-2 rounded-xl py-3.5 px-4 text-sm md:text-base font-semibold placeholder:text-gray-300 outline-none transition-all',
    tone,
    errors.value[field]
      ? 'border-red-400 focus:ring-4 focus:ring-red-100'
      : 'border-gray-200 focus:border-gci focus:bg-white focus:ring-4 focus:ring-gci/5',
  );

const benefits = [
  {
    icon: Mail,
    title: 'Confirmação por celular',
    description: 'Enviamos um código por SMS para validar seu número na hora.',
  },
  {
    icon: KeyRound,
    title: 'Senha do Portal do Cliente',
    description: 'Você define sua senha de acesso exclusiva logo após a confirmação.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacidade & Proteção',
    description: 'Seus dados protegidos de acordo com as normas da LGPD.',
  },
];
</script>

<template>
  <div
    class="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row h-screen w-screen overflow-hidden"
    role="dialog"
    aria-modal="true"
    aria-label="Abra sua conta"
  >
    <!-- Painel institucional (desktop) -->
    <div
      class="hidden md:flex md:w-[380px] lg:w-[440px] xl:w-[480px] bg-gci flex-col justify-between p-8 lg:p-12 text-white relative overflow-hidden shrink-0 h-full"
    >
      <div class="relative z-10 space-y-8">
        <Logo variant="dark" class-name="scale-95 origin-left" />

        <div class="space-y-3">
          <div
            class="inline-flex items-center px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-extrabold tracking-[0.2em] uppercase backdrop-blur-sm text-agro-orange"
          >
            Abertura de Conta Digital
          </div>
          <h1 class="text-3xl lg:text-4xl font-extrabold leading-tight text-white">
            Soluções financeiras estruturadas com a <span class="text-agro-orange">Ceres</span>.
          </h1>
          <p class="text-white/75 text-sm lg:text-base leading-relaxed">
            Faça seu cadastro de forma simples, rápida e 100% digital. Após o preenchimento, você
            confirmará seu celular e definirá a senha de acesso ao Portal do Cliente.
          </p>
        </div>

        <div class="space-y-4 pt-2">
          <div
            v-for="item in benefits"
            :key="item.title"
            class="flex items-start gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm"
          >
            <div
              class="w-10 h-10 rounded-xl bg-agro-orange/20 border border-agro-orange/30 flex items-center justify-center shrink-0 text-agro-orange"
            >
              <component :is="item.icon" :size="20" />
            </div>
            <div>
              <p class="font-bold text-sm text-white">{{ item.title }}</p>
              <p class="text-xs text-white/65 mt-0.5">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="relative z-10 pt-6 border-t border-white/10 text-xs text-white/60 flex items-center justify-between"
      >
        <span>Grupo Ceres Investimentos</span>
      </div>

      <div
        class="absolute -bottom-28 -left-28 w-80 h-80 bg-agro-orange/20 rounded-full blur-3xl pointer-events-none"
      ></div>
      <div
        class="absolute top-32 -right-24 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none"
      ></div>
    </div>

    <!-- Formulário -->
    <div class="flex-1 flex flex-col h-full overflow-y-auto bg-white relative">
      <div
        class="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 md:px-10 py-5 flex items-center justify-between"
      >
        <div class="md:hidden">
          <Logo variant="light" class-name="scale-85 origin-left" />
        </div>
        <button
          type="button"
          id="btn-close-registration"
          class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gci flex items-center justify-center transition-all cursor-pointer shadow-sm ml-auto"
          title="Fechar e voltar ao site"
          aria-label="Fechar"
          @click="emit('close')"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="flex-1 flex items-center justify-center px-6 md:px-12 py-6 max-w-xl mx-auto w-full">
        <div class="w-full space-y-6">
          <div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-gci tracking-tight">
              Abra sua conta
            </h2>
            <p class="text-gray-500 text-xs md:text-sm mt-1.5 leading-relaxed">
              Preencha os dados abaixo. Em seguida, vamos confirmar seu celular por SMS e você
              criará sua senha de acesso ao Portal do Cliente.
            </p>
          </div>

          <div class="flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200/80 relative">
            <button
              type="button"
              id="btn-select-cnpj"
              :class="
                cn(
                  'relative flex-1 py-3 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer z-10',
                  documentType === 'CNPJ' ? 'text-white shadow-sm' : 'text-gray-600 hover:text-gci',
                )
              "
              @click="selectType('CNPJ')"
            >
              <span
                v-if="documentType === 'CNPJ'"
                class="absolute inset-0 bg-gci rounded-xl -z-10 transition-all duration-300"
              ></span>
              <Building2 :size="16" />
              <span>Pessoa Jurídica (CNPJ)</span>
            </button>
            <button
              type="button"
              id="btn-select-cpf"
              :class="
                cn(
                  'relative flex-1 py-3 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer z-10',
                  documentType === 'CPF' ? 'text-white shadow-sm' : 'text-gray-600 hover:text-gci',
                )
              "
              @click="selectType('CPF')"
            >
              <span
                v-if="documentType === 'CPF'"
                class="absolute inset-0 bg-gci rounded-xl -z-10 transition-all duration-300"
              ></span>
              <User :size="16" />
              <span>Pessoa Física (CPF)</span>
            </button>
          </div>

          <form class="space-y-4" novalidate @submit.prevent="handleSubmit">
            <div class="space-y-1.5">
              <label
                for="input-email"
                class="text-xs font-black text-gray-700 uppercase tracking-wider ml-1"
              >
                E-mail *
              </label>
              <input
                id="input-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                placeholder="seuemail@empresa.com.br"
                :class="inputClass('email')"
                @input="clearError('email')"
              />
              <p v-if="errors.email" class="text-xs text-red-500 font-semibold flex items-center gap-1 ml-1">
                <AlertCircle :size="13" /> {{ errors.email }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label
                  for="input-document"
                  class="text-xs font-black text-gci uppercase tracking-wider ml-1 flex items-center justify-between"
                >
                  <span>{{ documentType }} *</span>
                  <span class="text-[11px] text-gray-400 font-medium normal-case">
                    {{ documentType === 'CPF' ? '11' : '14' }} dígitos
                  </span>
                </label>
                <input
                  id="input-document"
                  :value="form.document"
                  type="text"
                  inputmode="numeric"
                  :placeholder="documentType === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'"
                  :class="inputClass('document', 'text-gci')"
                  @input="onDocumentInput"
                />
                <p
                  v-if="errors.document"
                  class="text-xs text-red-500 font-semibold flex items-center gap-1 ml-1"
                >
                  <AlertCircle :size="13" /> {{ errors.document }}
                </p>
              </div>

              <div class="space-y-1.5">
                <label
                  for="input-phone"
                  class="text-xs font-black text-gray-700 uppercase tracking-wider ml-1"
                >
                  Telefone / WhatsApp *
                </label>
                <input
                  id="input-phone"
                  :value="form.phone"
                  type="tel"
                  autocomplete="tel"
                  placeholder="(00) 00000-0000"
                  :class="inputClass('phone')"
                  @input="onPhoneInput"
                />
                <p v-if="errors.phone" class="text-xs text-red-500 font-semibold flex items-center gap-1 ml-1">
                  <AlertCircle :size="13" /> {{ errors.phone }}
                </p>
              </div>
            </div>

            <div
              class="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-start gap-3 text-xs text-blue-950"
            >
              <Info :size="18" class="text-gci shrink-0 mt-0.5" />
              <p class="text-xs leading-relaxed text-blue-950/85">
                Após clicar em <strong>Concluir Cadastro</strong>, enviaremos um código por SMS
                para o telefone informado. Depois da confirmação, você define a senha do portal.
              </p>
            </div>

            <div class="pt-3">
              <button
                type="submit"
                id="btn-submit-registration"
                :disabled="isSubmitting"
                class="w-full bg-gci hover:bg-gci-hover disabled:opacity-75 text-white py-4 rounded-xl font-extrabold text-sm md:text-base uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-gci/20 cursor-pointer"
              >
                <template v-if="isSubmitting">
                  <div
                    class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  ></div>
                  <span>Enviando Cadastro...</span>
                </template>
                <template v-else>
                  <span>Concluir Cadastro</span>
                  <ArrowRight :size="19" />
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
