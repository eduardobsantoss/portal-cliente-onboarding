import { computed, shallowRef, toValue, watch, type MaybeRefOrGetter } from 'vue';
import type { SignerRepresentative } from '@/types/signer';
import { formatSignedAtToday } from '@/utils/formatSignedAt';

function withDefaultStatus(representatives: SignerRepresentative[]): SignerRepresentative[] {
  return representatives.map((rep) => ({
    ...rep,
    status: rep.status || 'Pendente',
  }));
}

export function useSignatureRepresentatives(
  initialRepresentatives: MaybeRefOrGetter<SignerRepresentative[]>
) {
  const reps = shallowRef<SignerRepresentative[]>(withDefaultStatus(toValue(initialRepresentatives)));

  // Keep reps synchronized with actual form state
  watch(
    () => toValue(initialRepresentatives),
    (representatives) => {
      reps.value = withDefaultStatus(representatives);
    }
  );

  const totalSigners = computed(() => reps.value.length);
  const signedCount = computed(() => reps.value.filter((r) => r.status === 'Assinado').length);
  const allSigned = computed(
    () => totalSigners.value > 0 && signedCount.value === totalSigners.value
  );

  // Simulation: Sign single
  const handleToggleSignSingle = (id: string) => {
    reps.value = reps.value.map((r) => {
      if (r.id === id) {
        const isNowSigned = r.status !== 'Assinado';
        return {
          ...r,
          status: isNowSigned ? 'Assinado' : 'Pendente',
          signedAt: isNowSigned ? formatSignedAtToday() : undefined,
        };
      }
      return r;
    });
  };

  // Simulation: Sign all (Required in Turn: "Simular assinaturas concluídas")
  const handleSimulateAllSigned = () => {
    const now = formatSignedAtToday();
    reps.value = reps.value.map((r) => ({
      ...r,
      status: 'Assinado',
      signedAt: r.signedAt || now,
    }));
  };

  return {
    reps,
    totalSigners,
    signedCount,
    allSigned,
    handleToggleSignSingle,
    handleSimulateAllSigned,
  };
}
