<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Lock, X } from 'lucide-vue-next';
import Logo from '../layout/Logo.vue';
import TcDialog from '@/components/theme/TcDialog.vue';
import TcPhotoSection from '@/components/theme/TcPhotoSection.vue';
import TcEyebrow from '@/components/theme/TcEyebrow.vue';
import TcDisplayHeading from '@/components/theme/TcDisplayHeading.vue';
import TcGlassCard from '@/components/theme/TcGlassCard.vue';
import TcSegmentedRadio from '@/components/theme/TcSegmentedRadio.vue';
import TcTextField from '@/components/theme/TcTextField.vue';
import TcButton from '@/components/theme/TcButton.vue';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { maskDocument, maskPhone, onlyDigits } from '@/utils/registrationMasks';
import { publicAsset } from '@/utils/publicAsset';
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

const documentTypeOptions = [
  { value: 'CNPJ', label: 'Pessoa Jurídica (CNPJ)' },
  { value: 'CPF', label: 'Pessoa Física (CPF)' },
];

// Véu vertical do painel de foto (valores do spec do Prompt 04).
const photoSrc = publicAsset('assets/refactor/campo-soja.jpeg');
const photoScrim =
  'linear-gradient(180deg, rgba(8, 60, 74, 0.72) 0%, rgba(8, 60, 74, 0.9) 60%, rgba(8, 60, 74, 0.95) 100%)';

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
</script>

<template>
  <TcDialog :open="true" variant="fullscreen" labelledby="registration-title" @close="emit('close')">
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
            as="h1"
            size="4xl"
            tone="onDark"
            class="mt-[var(--space-6)]"
          >
            Sua conta digital
            <template #second>em poucos passos.</template>
          </TcDisplayHeading>
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

      <!-- Formulário: compacto para caber na tela sem rolagem interna -->
      <div
        class="flex min-w-0 flex-col px-[var(--space-2)] pb-[var(--space-3)] pt-[var(--space-1)] lg:px-[calc(var(--space-10)+var(--space-1))] lg:pt-[var(--space-3)]"
      >
        <!-- Cabeçalho: eyebrow e botão de fechar na mesma linha, para poupar altura -->
        <div
          class="mx-auto flex w-full max-w-[480px] items-center justify-between gap-[var(--space-4)]"
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
            class="mx-auto flex w-full max-w-[480px] flex-col gap-[var(--space-4)] [@media(min-height:820px)]:gap-[var(--space-5)] [@media(max-height:760px)]:gap-[var(--space-3)]"
          >
            <!-- O texto de apoio sai em telas baixas para o formulário caber sem rolagem -->
            <TcDisplayHeading id="registration-title" as="h2" size="3xl">
              Abra
              <template #second>sua conta.</template>
            </TcDisplayHeading>
            <p
              class="m-0 hidden text-[length:var(--text-base)] leading-[var(--leading-body)] text-[color:var(--text-muted)] [@media(min-height:840px)]:block"
            >
              Preencha os dados abaixo. Em seguida, vamos confirmar seu celular por SMS e você
              criará sua senha de acesso ao Portal do Cliente.
            </p>

            <TcSegmentedRadio
              name="registration-document-type"
              aria-label="Tipo de pessoa"
              :options="documentTypeOptions"
              :model-value="documentType"
              @update:model-value="selectType($event as RegistrationDocumentType)"
            />

            <form
              class="flex flex-col gap-[var(--space-4)] [@media(max-height:760px)]:gap-[var(--space-3)]"
              novalidate @submit.prevent="handleSubmit">
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
                id="input-phone"
                :model-value="form.phone"
                label="Telefone / WhatsApp"
                type="tel"
                autocomplete="tel"
                placeholder="(00) 00000-0000"
                required
                :error="errors.phone"
                @input="onPhoneInput"
              />

              <TcTextField
                id="input-document"
                :model-value="form.document"
                :label="documentType"
                :hint="documentType === 'CPF' ? '11 dígitos' : '14 dígitos'"
                inputmode="numeric"
                :placeholder="documentType === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'"
                required
                :error="errors.document"
                @input="onDocumentInput"
              />

              <p class="m-0 text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
                * campo obrigatório
              </p>

              <TcButton
                id="btn-submit-registration"
                variant="primary"
                arrow
                type="submit"
                class="w-full"
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
  </TcDialog>
</template>
