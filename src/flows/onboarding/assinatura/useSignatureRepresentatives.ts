import { useEffect, useState } from 'react';
import type { SignerRepresentative } from '@/types/signer';
import { formatSignedAtToday } from '@/utils/formatSignedAt';

export function useSignatureRepresentatives(initialRepresentatives: SignerRepresentative[]) {
  const [reps, setReps] = useState<SignerRepresentative[]>(() => {
    return initialRepresentatives.map((rep) => ({
      ...rep,
      status: rep.status || 'Pendente',
    }));
  });

  // Keep reps synchronized with actual form state
  useEffect(() => {
    setReps(
      initialRepresentatives.map((rep) => ({
        ...rep,
        status: rep.status || 'Pendente',
      }))
    );
  }, [initialRepresentatives]);

  const totalSigners = reps.length;
  const signedCount = reps.filter((r) => r.status === 'Assinado').length;
  const allSigned = totalSigners > 0 && signedCount === totalSigners;

  // Simulation: Sign single
  const handleToggleSignSingle = (id: string) => {
    setReps((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const isNowSigned = r.status !== 'Assinado';
          return {
            ...r,
            status: isNowSigned ? 'Assinado' : 'Pendente',
            signedAt: isNowSigned ? formatSignedAtToday() : undefined,
          };
        }
        return r;
      })
    );
  };

  // Simulation: Sign all (Required in Turn: "Simular assinaturas concluídas")
  const handleSimulateAllSigned = () => {
    const now = formatSignedAtToday();
    setReps((prev) =>
      prev.map((r) => ({
        ...r,
        status: 'Assinado',
        signedAt: r.signedAt || now,
      }))
    );
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
