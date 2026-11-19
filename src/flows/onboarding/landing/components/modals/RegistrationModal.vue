<script setup lang="ts">
import { reactive, ref } from 'vue';
import { AlertCircle, Lock, X } from 'lucide-vue-next';
import Logo from '../layout/Logo.vue';
import TcDialog from '@/components/theme/TcDialog.vue';
import TcPhotoSection from '@/components/theme/TcPhotoSection.vue';
import TcEyebrow from '@/components/theme/TcEyebrow.vue';
import TcDisplayHeading from '@/components/theme/TcDisplayHeading.vue';
import TcGlassCard from '@/components/theme/TcGlassCard.vue';
// import TcSegmentedRadio from '@/components/theme/TcSegmentedRadio.vue'; // toggle PJ/PF desativado por enquanto
import TcTextField from '@/components/theme/TcTextField.vue';
import TcCheckbox from '@/components/theme/TcCheckbox.vue';
import TcButton from '@/components/theme/TcButton.vue';
import LegalDocumentModal from './LegalDocumentModal.vue';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { isValidCnpj, isValidCpf } from '@/utils/documentValidation';
import { maskCnpj, maskCpf, maskPhone, onlyDigits } from '@/utils/registrationMasks';
import { publicAsset } from '@/utils/publicAsset';
import type { RegistrationDocumentType, RegistrationLead } from '@/types/registration';
import type { TermsDocumentType } from '@/types/terms';

/**
 * Formulário "Abra sua conta" (tela cheia) aberto pelos CTAs de cadastro da landing.
 * Ao concluir, entrega os dados para o fluxo, que segue para o login (a confirmação do celular por SMS
 * acontece depois de logar). O CNPJ informado aqui é levado ao Portal do Cliente para a consulta na Receita.
 */
const emit = defineEmits<{
  close: [];
  submit: [lead: RegistrationLead];
}>();

useBodyScrollLock();

const SUBMIT_DELAY_MS = 600;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Toggle PJ/PF desativado por enquanto: o cadastro é sempre de Pessoa Jurídica (CNPJ).
// Para reativar, volte `documentType` para um ref (com a prop `initialType`), descomente `selectType`,
// `documentTypeOptions` e o <TcSegmentedRadio> do template.
const documentType: RegistrationDocumentType = 'CNPJ';
// const documentType = ref<RegistrationDocumentType>(props.initialType);

const INTRO_TEXT =
  'Preencha os dados abaixo. Em seguida, vamos confirmar seu celular por SMS e você criará sua senha de acesso ao Portal do Cliente.';
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_HINT = 'Mín. 8 caracteres, com maiúscula, minúscula, número e símbolo.';

const isSubmitting = ref(false);
const form = reactive({
  document: '',
  cpf: '',
  name: '',
  email: '',
  emailConfirmation: '',
  phone: '',
  password: '',
  passwordConfirmation: '',
});
const termsAccepted = ref(false);
const legalDocument = ref<TermsDocumentType | null>(null);

type FormErrorKey = keyof typeof form | 'terms';
const errors = ref<Partial<Record<FormErrorKey, string>>>({});

// const documentTypeOptions = [
//   { value: 'CNPJ', label: 'Pessoa Jurídica (CNPJ)' },
//   { value: 'CPF', label: 'Pessoa Física (CPF)' },
// ];

// Véu vertical do painel de foto (valores do spec do Prompt 04).
const photoSrc = publicAsset('assets/refactor/campo-soja.jpeg');
const photoScrim =
  'linear-gradient(180deg, rgba(8, 60, 74, 0.72) 0%, rgba(8, 60, 74, 0.9) 60%, rgba(8, 60, 74, 0.95) 100%)';

// const selectType = (type: RegistrationDocumentType) => {
//   documentType.value = type;
//   form.document = '';
//   errors.value = {};
// };

const clearError = (field: FormErrorKey) => {
  if (errors.value[field]) errors.value = { ...errors.value, [field]: '' };
};

const onDocumentInput = (event: Event) => {
  form.document = maskCnpj((event.target as HTMLInputElement).value);
  clearError('document');
};

const onCpfInput = (event: Event) => {
  form.cpf = maskCpf((event.target as HTMLInputElement).value);
  clearError('cpf');
};

const onPhoneInput = (event: Event) => {
  form.phone = maskPhone((event.target as HTMLInputElement).value);
  clearError('phone');
};

const onTermsChange = (accepted: boolean) => {
  termsAccepted.value = accepted;
  clearError('terms');
};

// Com a leitura de um documento aberta, o Esc fecha só o documento (o formulário continua).
const handleClose = () => {
  if (legalDocument.value) return;
  emit('close');
};

const isStrongPassword = (value: string) =>
  value.length >= PASSWORD_MIN_LENGTH &&
  /[a-z]/.test(value) &&
  /[A-Z]/.test(value) &&
  /\d/.test(value) &&
  /[^A-Za-z0-9]/.test(value);

const validate = () => {
  const next: typeof errors.value = {};

  if (!form.document.trim()) {
    next.document = 'Por favor, informe o CNPJ.';
  } else if (onlyDigits(form.document).length !== 14) {
    next.document = 'O CNPJ deve conter 14 dígitos.';
  } else if (!isValidCnpj(form.document)) {
    next.document = 'CNPJ inválido. Confira os números digitados.';
  }

  if (!form.cpf.trim()) {
    next.cpf = 'Por favor, informe o CPF.';
  } else if (onlyDigits(form.cpf).length !== 11) {
    next.cpf = 'O CPF deve conter 11 dígitos.';
  } else if (!isValidCpf(form.cpf)) {
    next.cpf = 'CPF inválido. Confira os números digitados.';
  }

  if (form.name.trim().split(/\s+/).filter(Boolean).length < 2) {
    next.name = 'Informe seu nome completo.';
  }

  if (!EMAIL_PATTERN.test(form.email.trim())) {
    next.email = 'Informe um endereço de e-mail válido.';
  }

  if (!form.emailConfirmation.trim()) {
    next.emailConfirmation = 'Confirme o seu e-mail.';
  } else if (form.emailConfirmation.trim().toLowerCase() !== form.email.trim().toLowerCase()) {
    next.emailConfirmation = 'Os e-mails informados não são iguais.';
  }

  if (onlyDigits(form.phone).length < 10) {
    next.phone = 'Informe um telefone/WhatsApp válido com DDD.';
  }

  if (!isStrongPassword(form.password)) {
    next.password = PASSWORD_HINT;
  }

  if (!form.passwordConfirmation) {
    next.passwordConfirmation = 'Confirme a sua senha.';
  } else if (form.passwordConfirmation !== form.password) {
    next.passwordConfirmation = 'As senhas informadas não são iguais.';
  }

  if (!termsAccepted.value) {
    next.terms = 'É necessário aceitar os Termos de Uso e a Política de Privacidade.';
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
    // A senha não segue no lead: ela só existe para a criação do acesso (o login a pede novamente).
    emit('submit', {
      documentType,
      document: form.document,
      cpf: form.cpf,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone,
    });
  }, SUBMIT_DELAY_MS);
};
</script>

<template>
  <TcDialog :open="true" variant="fullscreen" labelledby="registration-title" @close="handleClose">
    <div class="grid flex-1 grid-cols-1 gap-[var(--page-gutter)] lg:grid-cols-2">
      <!-- Painel de foto: some em telas pequenas, deixando só o formulário -->
      <TcPhotoSection
        :src="photoSrc"
        :scrim="photoScrim"
        class="hidden flex-col justify-between gap-[var(--space-8)] px-[var(--space-9)] pb-[var(--space-9)] pt-[var(--space-8)] lg:flex"
      >
        <Logo variant="dark" class-name="h-[68px] self-start md:h-[68px]" />

        <div>
          <TcEyebrow tone="onDark">Abertura de Conta Digital</TcEyebrow>
          <TcDisplayHeading
            id="registration-title"
            as="h1"
            size="4xl"
            tone="onDark"
            class="mt-[var(--space-6)]"
          >
            Sua conta digital
            <template #second>em poucos passos.</template>
          </TcDisplayHeading>
          <p
            class="m-0 mt-[var(--space-6)] max-w-[44ch] text-[length:var(--text-md)] leading-[var(--leading-body)] text-[color:var(--text-on-brand-muted)]"
          >
            {{ INTRO_TEXT }}
          </p>
        </div>

        <TcGlassCard>
          <div class="flex items-start gap-[var(--space-4)]">
            <Lock class="mt-[2px] size-[22px] shrink-0" aria-hidden="true" />
            <div>
              <p
                class="m-0 text-[length:var(--text-base)] font-[number:var(--weight-bold)] text-[color:var(--text-on-brand)]"
              >
                Privacidade &amp; Proteção
              </p>
              <p
                class="m-0 mt-[var(--space-1)] text-[length:var(--text-sm)] text-[color:var(--text-on-brand-muted)]"
              >
                Seus dados protegidos de acordo com as normas da LGPD.
              </p>
            </div>
          </div>
        </TcGlassCard>
      </TcPhotoSection>

      <!-- Formulário -->
      <div
        class="flex min-w-0 flex-col px-[var(--space-2)] pb-[var(--space-3)] pt-[var(--space-1)] lg:px-[calc(var(--space-10)+var(--space-1))] lg:pt-[var(--space-3)]"
      >
        <!-- Cabeçalho: eyebrow e botão de fechar na mesma linha, para poupar altura -->
        <div
          class="mx-auto flex w-full max-w-[560px] items-center justify-between gap-[var(--space-4)]"
        >
          <TcEyebrow class="max-sm:hidden">Grupo Ceres Investimentos</TcEyebrow>
          <button
            type="button"
            id="btn-close-registration"
            class="ml-auto inline-flex size-[var(--control-nav)] shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-full)] border-[1.5px] border-[color:var(--border-strong)] text-[color:var(--text-strong)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
            aria-label="Fechar e voltar ao site"
            @click="emit('close')"
          >
            <X :size="20" aria-hidden="true" />
          </button>
        </div>

        <div class="flex flex-1 items-center py-[var(--space-3)]">
          <div
            class="mx-auto flex w-full max-w-[560px] flex-col gap-[var(--space-4)] [@media(max-height:760px)]:gap-[var(--space-3)]"
          >
            <!-- Em telas pequenas o painel de foto some; o texto de apoio passa a ficar aqui -->
            <p
              class="m-0 text-[length:var(--text-base)] leading-[var(--leading-body)] text-[color:var(--text-muted)] lg:hidden"
            >
              {{ INTRO_TEXT }}
            </p>

            <!-- Título "Abra sua conta" desativado por enquanto (o título da página fica no painel de foto)
            <TcDisplayHeading id="registration-title" as="h2" size="3xl">
              Abra
              <template #second>sua conta.</template>
            </TcDisplayHeading>
            -->

            <!-- Toggle PJ/PF desativado por enquanto
            <TcSegmentedRadio
              name="registration-document-type"
              aria-label="Tipo de pessoa"
              :options="documentTypeOptions"
              :model-value="documentType"
              @update:model-value="selectType($event as RegistrationDocumentType)"
            />
            -->

            <form
              class="grid grid-cols-1 gap-x-[var(--space-4)] gap-y-[var(--space-4)] sm:grid-cols-2 [@media(max-height:760px)]:gap-y-[var(--space-3)]"
              novalidate
              @submit.prevent="handleSubmit"
            >
              <TcTextField
                id="input-document"
                :model-value="form.document"
                label="CNPJ"
                hint="14 dígitos"
                inputmode="numeric"
                placeholder="00.000.000/0000-00"
                required
                :error="errors.document"
                @input="onDocumentInput"
              />

              <TcTextField
                id="input-cpf"
                :model-value="form.cpf"
                label="CPF"
                hint="11 dígitos"
                inputmode="numeric"
                autocomplete="off"
                placeholder="000.000.000-00"
                required
                :error="errors.cpf"
                @input="onCpfInput"
              />

              <TcTextField
                id="input-name"
                v-model="form.name"
                class="sm:col-span-2"
                label="Nome completo"
                autocomplete="name"
                placeholder="Seu nome completo"
                required
                :error="errors.name"
                @input="clearError('name')"
              />

              <TcTextField
                id="input-email"
                v-model="form.email"
                label="E-mail"
                type="email"
                autocomplete="email"
                placeholder="seuemail@empresa.com.br"
                required
                :error="errors.email"
                @input="clearError('email')"
              />

              <TcTextField
                id="input-email-confirmation"
                v-model="form.emailConfirmation"
                label="Confirme o e-mail"
                type="email"
                autocomplete="off"
                placeholder="Repita o e-mail"
                required
                :error="errors.emailConfirmation"
                @input="clearError('emailConfirmation')"
              />

              <TcTextField
                id="input-phone"
                :model-value="form.phone"
                class="sm:col-span-2"
                label="Telefone / WhatsApp"
                type="tel"
                autocomplete="tel"
                placeholder="(00) 00000-0000"
                required
                :error="errors.phone"
                @input="onPhoneInput"
              />

              <TcTextField
                id="input-password"
                v-model="form.password"
                label="Senha"
                type="password"
                autocomplete="new-password"
                placeholder="Crie uma senha segura"
                required
                :error="errors.password"
                @input="clearError('password')"
              />

              <TcTextField
                id="input-password-confirmation"
                v-model="form.passwordConfirmation"
                label="Confirme a senha"
                type="password"
                autocomplete="new-password"
                placeholder="Repita a senha"
                required
                :error="errors.passwordConfirmation"
                @input="clearError('passwordConfirmation')"
              />

              <p class="m-0 text-[length:var(--text-xs)] text-[color:var(--text-muted)] sm:col-span-2">
                {{ PASSWORD_HINT }}
              </p>

              <div class="flex flex-col gap-[var(--space-2)] sm:col-span-2">
                <TcCheckbox
                  id="input-terms"
                  :model-value="termsAccepted"
                  @update:model-value="onTermsChange"
                >
                  Li e concordo com os
                  <button
                    type="button"
                    class="cursor-pointer border-0 bg-transparent p-0 font-[number:var(--weight-semibold)] text-[color:var(--text-strong)] underline underline-offset-2 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                    @click.prevent="legalDocument = 'terms'"
                  >
                    Termos de Uso
                  </button>
                  e a
                  <button
                    type="button"
                    class="cursor-pointer border-0 bg-transparent p-0 font-[number:var(--weight-semibold)] text-[color:var(--text-strong)] underline underline-offset-2 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                    @click.prevent="legalDocument = 'privacy'"
                  >
                    Política de Privacidade
                  </button>
                  da plataforma. *
                </TcCheckbox>
                <p
                  v-if="errors.terms"
                  class="m-0 flex items-center gap-[var(--space-1)] text-[length:var(--text-xs)] text-[color:var(--danger-dark)]"
                  role="alert"
                >
                  <AlertCircle class="size-[14px] shrink-0" aria-hidden="true" />
                  {{ errors.terms }}
                </p>
              </div>

              <p class="m-0 text-[length:var(--text-xs)] text-[color:var(--text-muted)] sm:col-span-2">
                * campo obrigatório
              </p>

              <TcButton
                id="btn-submit-registration"
                variant="primary"
                arrow
                type="submit"
                class="w-full sm:col-span-2"
                :loading="isSubmitting"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Enviando cadastro...' : 'Concluir cadastro' }}
              </TcButton>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Leitura dos documentos legais por cima do formulário (dentro do diálogo, para o foco não escapar) -->
    <LegalDocumentModal v-if="legalDocument" :doc-type="legalDocument" @close="legalDocument = null" />
  </TcDialog>
</template>
