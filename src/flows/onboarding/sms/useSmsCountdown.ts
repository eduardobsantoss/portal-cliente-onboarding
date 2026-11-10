import { useEffect, useState } from 'react';

export function useSmsCountdown() {
  const [cooldown, setCooldown] = useState<number>(0);

  // Timer cooldown (60 seconds)
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return { cooldown, setCooldown };
}
