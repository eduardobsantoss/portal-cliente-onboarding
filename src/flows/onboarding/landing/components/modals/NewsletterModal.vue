<script setup lang="ts">
import { ref, watch } from "vue";
import { X, AlertCircle, CheckCircle2 } from "lucide-vue-next";
import TcDialog from "@/components/theme/TcDialog.vue";
import TcDisplayHeading from "@/components/theme/TcDisplayHeading.vue";
import TcTextField from "@/components/theme/TcTextField.vue";
import TcCheckbox from "@/components/theme/TcCheckbox.vue";
import TcButton from "@/components/theme/TcButton.vue";
import {
  NEWSLETTER_CONSENT_TEXT,
  NEWSLETTER_STORAGE_DISMISSED,
  NEWSLETTER_STORAGE_SUBSCRIBED,
} from "../../constants/newsletter";
import { submitNewsletterLead } from "../../services/newsletterLead";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const props = defineProps<NewsletterModalProps>();

const name = ref("");
const phone = ref("");
const consent = ref(false);
const honeypot = ref("");
const isSubmitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      errorMessage.value = "";
      successMessage.value = "";
    }
  }
);

function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function onPhoneInput(event: Event) {
  const target = event.target as HTMLInputElement;
  phone.value = formatPhoneInput(target.value);
}

function dismiss() {
  localStorage.setItem(NEWSLETTER_STORAGE_DISMISSED, "1");
  props.onClose();
}

async function onSubmit() {
  errorMessage.value = "";
  successMessage.value = "";

  if (!consent.value) {
    errorMessage.value = "Marque a autorização para continuar.";
    return;
  }

  isSubmitting.value = true;
  try {
    const result = await submitNewsletterLead({
      name: name.value.trim(),
      phone: phone.value,
      consent: true,
      website: honeypot.value,
    });

    if (!result.ok) {
      errorMessage.value = result.error ?? "Erro ao enviar. Tente novamente.";
      return;
    }

    localStorage.setItem(NEWSLETTER_STORAGE_SUBSCRIBED, "1");
    localStorage.removeItem(NEWSLETTER_STORAGE_DISMISSED);

    if (result.alreadyRegistered) {
      successMessage.value =
        result.message ??
        "Este telefone já está cadastrado para receber nossas novidades.";
    } else {
      successMessage.value =
        "Cadastro recebido! Em instantes você receberá nossas novidades no WhatsApp.";
    }

    setTimeout(() => props.onClose(), 2200);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <TcDialog
    :open="isOpen"
    variant="centered"
    labelledby="newsletter-modal-title"
    @close="dismiss"
  >
    <div v-if="successMessage" class="flex flex-col items-center gap-[var(--space-5)] text-center">
      <button
        type="button"
        class="inline-flex size-[var(--control-arrow)] shrink-0 cursor-pointer items-center justify-center self-end rounded-[var(--radius-full)] border-[1.5px] border-[color:var(--border-strong)] text-[color:var(--text-strong)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
        aria-label="Fechar"
        @click="dismiss"
      >
        <X :size="18" aria-hidden="true" />
      </button>
      <CheckCircle2
        :size="40"
        class="text-[color:var(--success-base)]"
        aria-hidden="true"
      />
      <p
        class="m-0 text-[length:var(--text-md)] leading-[var(--leading-body)] text-[color:var(--text-strong)]"
      >
        {{ successMessage }}
      </p>
    </div>

    <form
      v-else
      class="flex flex-col gap-[var(--space-4)] [@media(min-height:820px)]:gap-[var(--space-5)]"
      @submit.prevent="onSubmit"
    >
      <div class="flex items-start justify-between gap-[var(--space-4)]">
        <TcDisplayHeading
          id="newsletter-modal-title"
          as="h2"
          size="3xl"
        >
          Fique
          <template #second>por dentro.</template>
        </TcDisplayHeading>
        <button
          type="button"
          class="inline-flex size-[var(--control-arrow)] shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-full)] border-[1.5px] border-[color:var(--border-strong)] text-[color:var(--text-strong)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
          aria-label="Fechar"
          @click="dismiss"
        >
          <X :size="18" aria-hidden="true" />
        </button>
      </div>

      <p
        class="m-0 hidden text-[length:var(--text-base)] leading-[var(--leading-body)] text-[color:var(--text-muted)] [@media(min-height:700px)]:block"
      >
        Receba notícias do Grupo Ceres Investimentos e atualizações de
        mercado no seu WhatsApp.
      </p>

      <TcTextField
        id="newsletter-name"
        v-model="name"
        label="Nome"
        type="text"
        autocomplete="name"
        placeholder="Seu nome"
        required
        :maxlength="255"
      />
      <TcTextField
        id="newsletter-phone"
        :model-value="phone"
        label="Telefone"
        type="tel"
        autocomplete="tel"
        placeholder="(00) 00000-0000"
        inputmode="numeric"
        required
        @input="onPhoneInput"
      />

      <p class="m-0 text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
        * campo obrigatório
      </p>

      <TcCheckbox id="newsletter-consent" v-model="consent">
        {{ NEWSLETTER_CONSENT_TEXT }}
      </TcCheckbox>

      <!-- Honeypot anti-bot -->
      <input
        v-model="honeypot"
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
        class="absolute opacity-0 pointer-events-none h-0 w-0"
        aria-hidden="true"
      />

      <p
        v-if="errorMessage"
        role="alert"
        class="m-0 flex items-center gap-[var(--space-2)] text-[length:var(--text-xs)] text-[color:var(--danger-dark)]"
      >
        <AlertCircle class="size-[14px] shrink-0" aria-hidden="true" />
        {{ errorMessage }}
      </p>

      <TcButton
        variant="primary"
        arrow
        type="submit"
        class="w-full"
        :loading="isSubmitting"
        :disabled="isSubmitting || !consent"
      >
        {{ isSubmitting ? "Enviando..." : "Quero receber novidades" }}
      </TcButton>

      <button
        type="button"
        class="h-[var(--control-arrow)] cursor-pointer rounded-[var(--radius-full)] text-[length:var(--text-sm)] font-[number:var(--weight-bold)] text-[color:var(--text-link)] transition-colors duration-[var(--duration-base)] hover:text-[color:var(--text-link-hover)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
        @click="dismiss"
      >
        Agora não
      </button>
    </form>
  </TcDialog>
</template>
