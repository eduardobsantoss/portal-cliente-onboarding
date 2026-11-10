import { useEffect, useState } from 'react';

export function useLongWaitWarning(timer: number) {
  const [showLongWaitWarning, setShowLongWaitWarning] = useState(false);

  useEffect(() => {
    if (timer > 120) { // Simulating 20 minutes with a shorter time for demo
      setShowLongWaitWarning(true);
    }
  }, [timer]);

  return showLongWaitWarning;
}
