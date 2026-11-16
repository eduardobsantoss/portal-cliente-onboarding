<script setup lang="ts">
import { computed, toValue } from 'vue';
import { Plus } from 'lucide-vue-next';
import type { SacadoContactsState } from '@/flows/portal/dashboard/hooks/useSacadoContacts';
import SacadoContactForm from './SacadoContactForm.vue';
import SacadoContactList from './SacadoContactList.vue';

const props = defineProps<{
  contacts: SacadoContactsState;
}>();

// O estado pode chegar como refs (composable) ou valores simples: toValue cobre os dois casos.
const isAddingContact = computed(() => toValue(props.contacts.isAddingContact));
const newContactEmail = computed(() => toValue(props.contacts.newContactEmail));
const newContactPhone = computed(() => toValue(props.contacts.newContactPhone));
const sacadoContacts = computed(() => toValue(props.contacts.sacadoContacts));
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between mb-8">
      <h5 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Canais de Contato</h5>
      <button
        @click="contacts.startAddingContact()"
        class="flex items-center gap-2 text-agro-orange font-black text-[10px] uppercase tracking-widest hover:underline"
      >
        <Plus :size="14" />
        Adicionar Contato
      </button>
    </div>

    <SacadoContactForm
      v-if="isAddingContact"
      :email="newContactEmail"
      :phone="newContactPhone"
      @email-change="contacts.setNewContactEmail($event)"
      @phone-change="contacts.setNewContactPhone($event)"
      @cancel="contacts.cancelAddingContact()"
      @save="contacts.saveContact()"
    />

    <SacadoContactList
      :contacts="sacadoContacts"
      @make-principal="contacts.makePrincipal($event)"
      @remove="contacts.removeContact($event)"
    />
  </div>
</template>
